import { ethers } from "hardhat";
import {
  calcSwapAmount,
  generateAgreement,
  generateOrderID,
  generateRandomTestAddress,
  newAtomicSwapOrderID,
  setupSwapPermitPayload,
} from "../../utils/utils";
import { Utils } from "../../utils/utils";
import { BlockTime } from "../../utils/time";
import { expect } from "chai";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import {
  InchainAtomicSwap,
  VaultPermit,
  ecdsa,
} from "@sideprotocol/contracts-typechain";
import { IAtomicSwapBase } from "@sideprotocol/contracts-typechain/typechain/contracts/inchain_atomicswap/InchainAtomicSwap";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { randomBytes } from "crypto";
describe("AtomicSwap: Gasless Swap", () => {
  describe.only("happy path", () => {
    const tests = [
      {
        name: "Swap ERC20 tokens without vesting and without any withdrawals",
        mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {},
        shouldThrow: false,
      },
      // {
      //   name: "Swap ERC20 tokens without vesting, allowing maker to withdraw",
      //   mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {
      //     swapPermitPayload.isMakerWithdraw = true;
      //   },
      // },
      // {
      //   name: "Swap ERC20 tokens without vesting, allowing taker to withdraw",
      //   mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {
      //     swapPermitPayload.isTakerWithdraw = true;
      //   },
      // },
      // {
      //   name: "Swap ERC20 tokens without vesting, allowing both maker and taker to withdraw",
      //   mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {
      //     swapPermitPayload.isTakerWithdraw = true;
      //     swapPermitPayload.isTakerWithdraw = true;
      //   },
      // },
      // {
      //   name: "Swap ERC20 tokens with vesting but no withdrawals",
      //   mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {},
      //   isVesting: true,
      // },
      // {
      //   name: "Swap ERC20 tokens with vesting, allowing maker to withdraw",
      //   mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {
      //     swapPermitPayload.isMakerWithdraw = true;
      //   },
      //   isVesting: true,
      // },
      // {
      //   name: "Swap ERC20 tokens with vesting, allowing taker to withdraw",
      //   mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {
      //     swapPermitPayload.isTakerWithdraw = true;
      //   },
      //   isVesting: true,
      // },
      // {
      //   name: "Swap ERC20 tokens with vesting, allowing both maker and taker to withdraw",
      //   mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {
      //     swapPermitPayload.isMakerWithdraw = true;
      //     swapPermitPayload.isTakerWithdraw = true;
      //   },
      //   isVesting: true,
      // },
    ];

    tests.forEach(async (test) => {
      it(test.name, async () => {
        const {
          atomicSwap,
          usdc,
          usdt,
          usdcAddress,
          usdtAddress,
          vault,
          vaultName,
          sellTokenFeeRate,
          buyTokenFeeRate,
          treasury,
          vestingManager,
        } = await loadFixture(Utils.prepareInChainAtomicTest);
        const accounts = await ethers.getSigners();
        const [maker, taker] = accounts;
        const swapPermitPayload = setupSwapPermitPayload(
          usdcAddress,
          usdtAddress,
          taker.address,
        );
        test.mallet(swapPermitPayload);
        // Approve
        await usdc
          .connect(maker)
          .approve(
            await vault.getAddress(),
            swapPermitPayload.sellToken.amount,
          );

        await usdt
          .connect(taker)
          .approve(await vault.getAddress(), swapPermitPayload.buyToken.amount);

        // Deposit
        await vault
          .connect(maker)
          .deposit(usdcAddress, swapPermitPayload.sellToken.amount);
        await vault
          .connect(taker)
          .deposit(usdtAddress, swapPermitPayload.buyToken.amount);

        const atomicSwapAddress = await atomicSwap.getAddress();
        const { chainId } = await ethers.provider.getNetwork();
        const deadline = BigInt(await BlockTime.AfterSeconds(100000));
        const makerNonce = await vault.nonces(maker.address);
        const agreement = generateAgreement(swapPermitPayload);
        const { signature: makerSignature } = await ecdsa.createPermitSignature(
          {
            tokenName: vaultName,
            contractAddress: await vault.getAddress(),
            chainId: chainId,
            author: maker,
            spender: atomicSwapAddress,
            value: swapPermitPayload.sellToken.amount,
            agreement,
            nonce: makerNonce,
            deadline,
          },
        );

        const makerSig = ethers.Signature.from(makerSignature);
        swapPermitPayload.makerSignature = {
          deadline,
          v: makerSig.v,
          r: makerSig.r,
          s: makerSig.s,
          owner: maker.address,
        };

        const takerNonce = await vault.nonces(taker.address);
        const { signature: takerSignature } = await ecdsa.createPermitSignature(
          {
            tokenName: vaultName,
            contractAddress: await vault.getAddress(),
            chainId: chainId,
            author: taker,
            spender: atomicSwapAddress,
            value: swapPermitPayload.buyToken.amount,
            agreement,
            nonce: takerNonce,
            deadline,
          },
        );
        const takerSig = ethers.Signature.from(takerSignature);
        swapPermitPayload.takerSignature = {
          deadline,
          v: takerSig.v,
          r: takerSig.r,
          s: takerSig.s,
          owner: taker.address,
        };

        const release = test.isVesting
          ? [
              {
                durationInHours: BigInt(1),
                percentage: BigInt(5000),
              },
              {
                durationInHours: BigInt(1),
                percentage: BigInt(5000),
              },
            ]
          : [];

        if (test.shouldThrow) {
          await expect(
            atomicSwap.executeSwapWithPermit(swapPermitPayload, release),
          ).to.reverted;
        } else {
          // await expect(
          //   atomicSwap.executeSwapWithPermit(swapPermitPayload, release),
          // ).not.to.reverted;
          await atomicSwap.executeSwapWithPermit(swapPermitPayload, release);
          const makerSwapAmount = calcSwapAmount(
            swapPermitPayload.buyToken.amount,
            sellTokenFeeRate,
          );
          const takerSwapAmount = calcSwapAmount(
            swapPermitPayload.sellToken.amount,
            buyTokenFeeRate,
          );
          const treasuryUSDTAmount = await usdt.balanceOf(treasury);
          const treasuryUSDCAmount = await usdc.balanceOf(treasury);

          let makerUSTAmount = await usdt.balanceOf(maker.address);

          if (!swapPermitPayload.isMakerWithdraw) {
            makerUSTAmount = await vault.balanceOf(maker.address, usdtAddress);
          }
          expect(makerUSTAmount).to.equal(makerSwapAmount.amountAfterFee);

          if (test.isVesting) {
            const id = newAtomicSwapOrderID(
              atomicSwapAddress,
              swapPermitPayload.uuid,
            );
            // 1 hour later, release first release from vesting contract.
            const vestingId = await vestingManager.vestingIds(id);
            await time.increase(3600);
            await vestingManager.connect(taker).release(vestingId);
            // 1 hour later, release second release from vesting contract.
            await time.increase(3600);
            await vestingManager.connect(taker).release(vestingId);
          }

          let takerUSCAmount = await usdc.balanceOf(taker.address);
          if (!swapPermitPayload.isTakerWithdraw) {
            takerUSCAmount = await vault.balanceOf(taker.address, usdcAddress);
          }
          expect(takerUSCAmount).to.equal(takerSwapAmount.amountAfterFee);
          expect(treasuryUSDTAmount).to.equal(makerSwapAmount.feeAmount);
          expect(treasuryUSDCAmount).to.equal(takerSwapAmount.feeAmount);
        }
      });
    });
  });
  describe("attack", () => {
    const attackTests = [
      {
        name: "should revert if taker changes the buy token amount",
        mallet: async (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
        ) => {},
        expectedRevertError: "VaultInvalidSigner",
        from: "vault",
        isManipulateTakerSignature: true,
        malletTakerSignature: async (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
          atomicSwapAddress?: string,
          vaultAddress?: string,
          vaultName?: string,
          taker?: HardhatEthersSigner,
          agreement?: string,
          nonce?: bigint,
        ) => {
          const { chainId } = await ethers.provider.getNetwork();
          const attackAmount = ethers.parseEther("15");
          const deadline = await BlockTime.AfterSeconds(1000);
          const { signature: takerSignature } =
            await ecdsa.createPermitSignature({
              tokenName: vaultName!,
              contractAddress: vaultAddress!,
              chainId: chainId,
              author: taker!,
              spender: atomicSwapAddress!,
              value: attackAmount,
              agreement: agreement!,
              nonce: nonce!,
              deadline,
            });
          const takerSig = ethers.Signature.from(takerSignature);
          swapPermitPayload.takerSignature = {
            deadline,
            v: takerSig.v,
            r: takerSig.r,
            s: takerSig.s,
            owner: taker!.address,
          };
        },
      },
      {
        name: "should revert if taker changes the agreement hash",
        mallet: async (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
        ) => {},
        expectedRevertError: "VaultInvalidSigner",
        from: "vault",
        isManipulateTakerSignature: true,
        malletTakerSignature: async (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
          atomicSwapAddress?: string,
          vaultAddress?: string,
          vaultName?: string,
          taker?: HardhatEthersSigner,
          agreement?: string,
          nonce?: bigint,
        ) => {
          const { chainId } = await ethers.provider.getNetwork();
          const attackAmount = ethers.parseEther("15");
          const deadline = await BlockTime.AfterSeconds(1000);
          swapPermitPayload.buyToken.amount = attackAmount;

          const { signature: takerSignature } =
            await ecdsa.createPermitSignature({
              tokenName: vaultName!,
              contractAddress: vaultAddress!,
              chainId: chainId,
              author: taker!,
              spender: atomicSwapAddress!,
              value: attackAmount,
              agreement: ethers.keccak256(randomBytes(32)),
              nonce: nonce!,
              deadline,
            });
          const takerSig = ethers.Signature.from(takerSignature);
          swapPermitPayload.takerSignature = {
            deadline,
            v: takerSig.v,
            r: takerSig.r,
            s: takerSig.s,
            owner: taker!.address,
          };
        },
      },
      {
        name: "should revert if taker changes maker's swap amount",
        mallet: (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
        ) => {
          swapPermitPayload.sellToken.amount = ethers.parseEther("16");
        },
        expectedRevertError: "VaultInvalidSigner",
        from: "vault",
      },
      {
        name: "shout revert if taker changes maker's token address",
        mallet: (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
        ) => {
          swapPermitPayload.sellToken.token = generateRandomTestAddress();
        },
        expectedRevertError: "VaultInvalidSigner",
        from: "vault",
      },
      {
        name: "should revert if taker changes maker's signature deadline",
        mallet: (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
        ) => {
          swapPermitPayload.makerSignature.deadline = BigInt(1000);
        },
        expectedRevertError: "InvalidExpirationTime",
        from: "",
      },
      {
        name: "should revert if taker changes maker's signature owner address",
        mallet: (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
        ) => {
          swapPermitPayload.makerSignature.owner = generateRandomTestAddress();
        },
        expectedRevertError: "VaultInvalidSigner",
        from: "vault",
      },
      {
        name: "should revert if taker changes maker's withdraw option",
        mallet: (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
        ) => {
          swapPermitPayload.isMakerWithdraw =
            !swapPermitPayload.isMakerWithdraw;
        },
        expectedRevertError: "VaultInvalidSigner",
        from: "vault",
      },
      {
        name: "should revert if taker changes maker's accept bid option",
        mallet: (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
        ) => {
          swapPermitPayload.acceptBid = !swapPermitPayload.acceptBid;
        },
        expectedRevertError: "VaultInvalidSigner",
        from: "vault",
      },
      {
        name: "should revert if taker changes maker's minimum bid amount",
        mallet: (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
        ) => {
          swapPermitPayload.minBidAmount = ethers.parseEther("10");
        },
        expectedRevertError: "VaultInvalidSigner",
        from: "vault",
      },
    ];

    attackTests.forEach(
      ({
        name,
        mallet,
        malletTakerSignature,
        expectedRevertError,
        from,
        isManipulateTakerSignature,
      }) => {
        it(name, async () => {
          const {
            atomicSwap,
            usdc,
            usdt,
            usdcAddress,
            usdtAddress,
            vault,
            vaultName,
          } = await loadFixture(Utils.prepareInChainAtomicTest);
          const vaultAddress = await vault.getAddress();
          const accounts = await ethers.getSigners();
          const [maker, taker] = accounts;
          const swapPermitPayload = setupSwapPermitPayload(
            usdcAddress,
            usdtAddress,
            taker.address,
          );

          // Common setup for all attack tests
          await usdc
            .connect(maker)
            .approve(
              await vault.getAddress(),
              swapPermitPayload.sellToken.amount,
            );
          await usdt
            .connect(taker)
            .approve(
              await vault.getAddress(),
              swapPermitPayload.buyToken.amount,
            );
          await vault
            .connect(maker)
            .deposit(usdcAddress, swapPermitPayload.sellToken.amount);
          await vault
            .connect(taker)
            .deposit(usdtAddress, swapPermitPayload.buyToken.amount);

          const atomicSwapAddress = await atomicSwap.getAddress();
          const { chainId } = await ethers.provider.getNetwork();
          const deadline = BigInt(await BlockTime.AfterSeconds(100000));
          const makerNonce = await vault.nonces(maker.address);
          const agreement = generateAgreement(swapPermitPayload);

          // Maker signature setup
          const { signature: makerSignature } =
            await ecdsa.createPermitSignature({
              tokenName: vaultName,
              contractAddress: vaultAddress,
              chainId: chainId,
              author: maker,
              spender: atomicSwapAddress,
              value: swapPermitPayload.sellToken.amount,
              agreement,
              nonce: makerNonce,
              deadline,
            });
          const makerSig = ethers.Signature.from(makerSignature);
          swapPermitPayload.makerSignature = {
            deadline,
            v: makerSig.v,
            r: makerSig.r,
            s: makerSig.s,
            owner: maker.address,
          };

          const takerNonce = await vault.nonces(taker.address);
          //const attackAmount = ethers.parseEther("15");
          if (isManipulateTakerSignature) {
            await malletTakerSignature(
              swapPermitPayload,
              atomicSwapAddress,
              vaultAddress,
              vaultName,
              taker,
              agreement,
              takerNonce,
            );
          } else {
            const { signature: takerSignature } =
              await ecdsa.createPermitSignature({
                tokenName: vaultName,
                contractAddress: vaultAddress,
                chainId: chainId,
                author: taker,
                spender: atomicSwapAddress,
                value: swapPermitPayload.buyToken.amount, // Different amount of maker suggestion.
                agreement,
                nonce: takerNonce,
                deadline,
              });

            const takerSig = ethers.Signature.from(takerSignature);
            swapPermitPayload.takerSignature = {
              deadline,
              v: takerSig.v,
              r: takerSig.r,
              s: takerSig.s,
              owner: taker.address,
            };
          }

          // Apply specific setup for each test case
          mallet(swapPermitPayload);

          // Execute the test and check for expected revert error
          await expect(
            atomicSwap.executeSwapWithPermit(swapPermitPayload, []),
          ).to.revertedWithCustomError(
            from === "vault" ? vault : atomicSwap,
            expectedRevertError,
          );
        });
      },
    );
  });
});
