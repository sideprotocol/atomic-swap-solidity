import { ethers } from "hardhat";

import {
  calcSwapAmount,
  generateAgreement,
  generateRandomTestAddress,
  newAtomicSwapOrderID,
  setupSwapPermitPayload,
} from "../../utils/utils";
import { Utils } from "../../utils/utils";
import { BlockTime } from "../../utils/time";
import { expect } from "chai";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { MockToken__factory, ecdsa } from "@sideprotocol/contracts-typechain";
import { IAtomicSwapBase } from "@sideprotocol/contracts-typechain/typechain/contracts/inchain_atomicswap/InchainAtomicSwap";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { randomBytes } from "crypto";
import { ZeroAddress } from "ethers";
describe("AtomicSwap: Gasless Swap", () => {
  describe("happy path", () => {
    const swapCases = [
      {
        name: "Swap ERC20 tokens without vesting and without any withdrawals",
        mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {},
        shouldThrow: false,
      },
      {
        name: "Swap ERC20 tokens without vesting and without any withdrawals",
        mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {},
        shouldThrow: false,
      },
      {
        name: "Swap ERC20 tokens without vesting and disable bid",
        mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {
          swapPermitPayload.acceptBid = false;
        },
        shouldThrow: false,
      },
      {
        name: "Swap ether-ERC20 token without vesting",
        mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {
          swapPermitPayload.sellToken.token = ZeroAddress;
          swapPermitPayload.withdrawToSellerAccount = true;
        },
        shouldThrow: false,
      },
      {
        name: "Swap ether-ERC20 token without vesting  and with buyer withdraw ",
        mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {
          swapPermitPayload.sellToken.token = ZeroAddress;
          swapPermitPayload.withdrawToBuyerAccount = true;
        },
        shouldThrow: false,
        isVesting: true,
      },
      {
        name: "Swap ERC20 tokens without vesting, allowing maker to withdraw",
        mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {
          swapPermitPayload.withdrawToSellerAccount = true;
        },
      },
      {
        name: "Swap ERC20 tokens without vesting, allowing taker to withdraw",
        mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {
          swapPermitPayload.withdrawToBuyerAccount = true;
        },
      },
      {
        name: "Swap ERC20 tokens without vesting, allowing both maker and taker to withdraw",
        mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {
          swapPermitPayload.withdrawToBuyerAccount = true;
          swapPermitPayload.withdrawToBuyerAccount = true;
        },
      },
      {
        name: "Swap ERC20 tokens with vesting but no withdrawals",
        mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {},
        isVesting: true,
      },
      {
        name: "Swap ERC20 tokens with vesting, allowing maker to withdraw",
        mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {
          swapPermitPayload.withdrawToSellerAccount = true;
        },
        isVesting: true,
      },
      {
        name: "Swap ERC20 tokens with vesting, allowing taker to withdraw",
        mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {
          swapPermitPayload.withdrawToBuyerAccount = true;
        },
        isVesting: true,
      },
      {
        name: "Swap ERC20 tokens with vesting, allowing both maker and taker to withdraw",
        mallet(swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct) {
          swapPermitPayload.withdrawToSellerAccount = true;
          swapPermitPayload.withdrawToBuyerAccount = true;
        },
        isVesting: true,
      },
    ];
    swapCases.forEach(async (test) => {
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
        const [seller, buyer, executor] = accounts;
        const swapPermitPayload = setupSwapPermitPayload(
          usdcAddress,
          usdtAddress,
          buyer.address,
        );
        test.mallet(swapPermitPayload);

        const release = test.isVesting
          ? [
              {
                durationInHours: 1,
                percentage: 5000,
              },
              {
                durationInHours: 1,
                percentage: 5000,
              },
            ]
          : [];
        swapPermitPayload.releases = release;
        // Approve
        await usdc
          .connect(seller)
          .approve(
            await vault.getAddress(),
            swapPermitPayload.sellToken.amount,
          );

        await usdt
          .connect(buyer)
          .approve(await vault.getAddress(), swapPermitPayload.buyToken.amount);

        // Deposit
        await vault
          .connect(seller)
          .deposit(
            swapPermitPayload.sellToken.token,
            swapPermitPayload.sellToken.amount,
            {
              value:
                swapPermitPayload.sellToken.token == ZeroAddress
                  ? swapPermitPayload.sellToken.amount
                  : 0,
            },
          );
        await vault
          .connect(buyer)
          .deposit(
            swapPermitPayload.buyToken.token,
            swapPermitPayload.buyToken.amount,
          );

        const atomicSwapAddress = await atomicSwap.getAddress();
        const { chainId } = await ethers.provider.getNetwork();
        const deadline = BigInt(await BlockTime.AfterSeconds(100000));

        const { sellerAgreement, buyerAgreement } = generateAgreement(
          swapPermitPayload,
          seller.address,
          buyer.address,
        );
        const { signature: sellerSignature } =
          await ecdsa.createPermitSignature({
            tokenName: vaultName,
            contractAddress: await vault.getAddress(),
            chainId: chainId,
            author: seller,
            spender: atomicSwapAddress,
            value: swapPermitPayload.sellToken.amount,
            agreement: sellerAgreement,
            deadline,
          });

        const sellerSig = ethers.Signature.from(sellerSignature);
        swapPermitPayload.sellerSignature = {
          deadline,
          v: sellerSig.v,
          r: sellerSig.r,
          s: sellerSig.s,
          owner: seller.address,
        };

        const { signature: buyerSignature } = await ecdsa.createPermitSignature(
          {
            tokenName: vaultName,
            contractAddress: await vault.getAddress(),
            chainId: chainId,
            author: buyer,
            spender: atomicSwapAddress,
            value: swapPermitPayload.buyToken.amount,
            agreement: buyerAgreement,
            deadline,
          },
        );
        const buyerSig = ethers.Signature.from(buyerSignature);
        swapPermitPayload.buyerSignature = {
          deadline,
          v: buyerSig.v,
          r: buyerSig.r,
          s: buyerSig.s,
          owner: buyer.address,
        };

        const buyerOriginalBalance = await ethers.provider.getBalance(
          buyer.address,
        );

        if (test.shouldThrow) {
          await expect(
            atomicSwap
              .connect(executor)
              .executeSwapWithPermit(swapPermitPayload),
          ).to.reverted;
        } else {
          await expect(
            await atomicSwap
              .connect(executor)
              .executeSwapWithPermit(swapPermitPayload),
          ).not.to.reverted;

          const sellerSwapAmount = calcSwapAmount(
            BigInt(swapPermitPayload.buyToken.amount),
            sellTokenFeeRate,
          );
          const buyerSwapAmount = calcSwapAmount(
            BigInt(swapPermitPayload.sellToken.amount),
            buyTokenFeeRate,
          );
          //

          const treasurySellTokenAmount =
            swapPermitPayload.sellToken.token == ZeroAddress
              ? await ethers.provider.getBalance(treasury)
              : await MockToken__factory.connect(
                  swapPermitPayload.sellToken.token.toString(),
                  ethers.provider,
                ).balanceOf(treasury);

          const treasuryBuyTokenAmount =
            swapPermitPayload.buyToken.token == ZeroAddress
              ? await ethers.provider.getBalance(treasury)
              : await MockToken__factory.connect(
                  swapPermitPayload.buyToken.token.toString(),
                  ethers.provider,
                ).balanceOf(treasury);

          let sellerBuyTokenAmount =
            swapPermitPayload.buyToken.token == ZeroAddress
              ? (await ethers.provider.getBalance(seller.address)) -
                buyerOriginalBalance
              : await MockToken__factory.connect(
                  swapPermitPayload.buyToken.token.toString(),
                  ethers.provider,
                ).balanceOf(seller.address);

          if (!swapPermitPayload.withdrawToSellerAccount) {
            sellerBuyTokenAmount = await vault.balanceOf(
              seller.address,
              usdtAddress,
            );
          }

          if (test.isVesting) {
            const id = newAtomicSwapOrderID(
              atomicSwapAddress,
              swapPermitPayload.uuid.toString(),
            );

            // 1 hour later, release first release from vesting contract.
            const vestingId = await vestingManager.vestingIds(id);
            const tokenUrl = await vestingManager.tokenURI(vestingId);
            const isERC721 =
              await vestingManager.supportsInterface("0x80ac58cd");
            expect(isERC721).to.equal(true);
            expect(tokenUrl).to.contain(vestingId);
            await time.increase(3600);

            await vestingManager.connect(buyer).release(vestingId);
            // 1 hour later, release second release from vesting contract.
            await time.increase(3600);
            await vestingManager.connect(buyer).release(vestingId);
          }

          let buyerSellTokenAmount =
            swapPermitPayload.sellToken.token == ZeroAddress
              ? (await ethers.provider.getBalance(buyer.address)) -
                buyerOriginalBalance
              : await MockToken__factory.connect(
                  swapPermitPayload.sellToken.token.toString(),
                  ethers.provider,
                ).balanceOf(buyer.address);

          if (!swapPermitPayload.withdrawToBuyerAccount) {
            buyerSellTokenAmount = await vault.balanceOf(
              buyer.address,
              swapPermitPayload.sellToken.token,
            );
          }
          expect(
            buyerSwapAmount.amountAfterFee - buyerSellTokenAmount,
          ).to.to.below(ethers.parseEther("0.001"));
          expect(sellerSwapAmount.amountAfterFee).to.equal(
            sellerBuyTokenAmount,
          );
          expect(treasuryBuyTokenAmount).to.equal(sellerSwapAmount.feeAmount);
          expect(treasurySellTokenAmount).to.equal(buyerSwapAmount.feeAmount);
        }
      });
    });
  });

  describe("signature manipulation", () => {
    const revertCases = [
      {
        name: "should revert if taker re-execute swap",
        mallet: async (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
        ) => {},
        expectedRevertError: "OrderAlreadyExists",
        reExecuteSwap: true,
        from: "",
      },
      {
        name: "should revert if taker changes the buy token amount",
        mallet: async (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
        ) => {},
        expectedRevertError: "VaultInvalidSigner",
        from: "vault",
        malletBuyerSignature: async (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
          atomicSwapAddress?: string,
          vaultAddress?: string,
          vaultName?: string,
          taker?: HardhatEthersSigner,
          agreement?: string,
        ) => {
          const { chainId } = await ethers.provider.getNetwork();
          const attackAmount = ethers.parseEther("15");
          const deadline = await BlockTime.AfterSeconds(1000);
          const { signature: buyerSignature } =
            await ecdsa.createPermitSignature({
              tokenName: vaultName!,
              contractAddress: vaultAddress!,
              chainId: chainId,
              author: taker!,
              spender: atomicSwapAddress!,
              value: attackAmount,
              agreement: agreement!,
              deadline,
            });
          const takerSig = ethers.Signature.from(buyerSignature);
          swapPermitPayload.buyerSignature = {
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

        malletBuyerSignature: async (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
          atomicSwapAddress?: string,
          vaultAddress?: string,
          vaultName?: string,
          taker?: HardhatEthersSigner,
          agreement?: string,
        ) => {
          const { chainId } = await ethers.provider.getNetwork();
          const attackAmount = ethers.parseEther("15");
          const deadline = await BlockTime.AfterSeconds(1000);
          swapPermitPayload.buyToken.amount = attackAmount;

          const { signature: buyerSignature } =
            await ecdsa.createPermitSignature({
              tokenName: vaultName!,
              contractAddress: vaultAddress!,
              chainId: chainId,
              author: taker!,
              spender: atomicSwapAddress!,
              value: attackAmount,
              agreement: ethers.keccak256(randomBytes(32)),
              deadline,
            });
          const takerSig = ethers.Signature.from(buyerSignature);
          swapPermitPayload.buyerSignature = {
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
          swapPermitPayload.sellerSignature.deadline = BigInt(1000);
        },
        expectedRevertError: "InvalidExpirationTime",
        from: "",
      },
      {
        name: "should revert if taker use wrong deadline in signature",
        mallet: (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
        ) => {
          swapPermitPayload.buyerSignature.deadline = BigInt(1000);
        },
        expectedRevertError: "InvalidExpirationTime",
        from: "",
      },
      {
        name: "should revert if taker changes maker's signature owner address",
        mallet: (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
        ) => {
          swapPermitPayload.sellerSignature.owner = generateRandomTestAddress();
        },
        expectedRevertError: "VaultInvalidSigner",
        from: "vault",
      },
      {
        name: "should revert if taker changes maker's withdraw option",
        mallet: (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
        ) => {
          swapPermitPayload.withdrawToSellerAccount =
            !swapPermitPayload.withdrawToSellerAccount;
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
    revertCases.forEach(
      ({
        name,
        mallet,
        malletBuyerSignature,
        expectedRevertError,
        from,
        reExecuteSwap,
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
          const [seller, buyer] = accounts;
          const swapPermitPayload = setupSwapPermitPayload(
            usdcAddress,
            usdtAddress,
            buyer.address,
          );

          // Common setup for all attack tests
          await usdc
            .connect(seller)
            .approve(
              await vault.getAddress(),
              swapPermitPayload.sellToken.amount,
            );
          await usdt
            .connect(buyer)
            .approve(
              await vault.getAddress(),
              swapPermitPayload.buyToken.amount,
            );
          await vault
            .connect(seller)
            .deposit(usdcAddress, swapPermitPayload.sellToken.amount);
          await vault
            .connect(buyer)
            .deposit(usdtAddress, swapPermitPayload.buyToken.amount);

          const atomicSwapAddress = await atomicSwap.getAddress();
          const { chainId } = await ethers.provider.getNetwork();
          const deadline = BigInt(await BlockTime.AfterSeconds(100000));
          swapPermitPayload.sellerSignature.owner = seller.address;
          swapPermitPayload.buyerSignature.owner = buyer.address;
          const { sellerAgreement, buyerAgreement } = generateAgreement(
            swapPermitPayload,
            seller.address,
            buyer.address,
          );

          // Maker signature setup
          const { signature: sellerSignature } =
            await ecdsa.createPermitSignature({
              tokenName: vaultName,
              contractAddress: vaultAddress,
              chainId: chainId,
              author: seller,
              spender: atomicSwapAddress,
              value: swapPermitPayload.sellToken.amount,
              agreement: sellerAgreement,
              deadline,
            });
          const makerSig = ethers.Signature.from(sellerSignature);
          swapPermitPayload.sellerSignature = {
            deadline,
            v: makerSig.v,
            r: makerSig.r,
            s: makerSig.s,
            owner: seller.address,
          };

          if (malletBuyerSignature) {
            await malletBuyerSignature(
              swapPermitPayload,
              atomicSwapAddress,
              vaultAddress,
              vaultName,
              buyer,
              buyerAgreement,
            );
          } else {
            const { signature: buyerSignature } =
              await ecdsa.createPermitSignature({
                tokenName: vaultName,
                contractAddress: vaultAddress,
                chainId: chainId,
                author: buyer,
                spender: atomicSwapAddress,
                value: swapPermitPayload.buyToken.amount, // Different amount of maker suggestion.
                agreement: buyerAgreement,
                deadline,
              });
            const buyerSig = ethers.Signature.from(buyerSignature);
            swapPermitPayload.buyerSignature = {
              deadline,
              v: buyerSig.v,
              r: buyerSig.r,
              s: buyerSig.s,
              owner: buyer.address,
            };
          }

          // Apply specific setup for each test case
          mallet(swapPermitPayload);

          // Execute the test and check for expected revert error
          if (reExecuteSwap) {
            await atomicSwap.executeSwapWithPermit(swapPermitPayload);
            await expect(
              atomicSwap.executeSwapWithPermit(swapPermitPayload),
            ).to.revertedWithCustomError(
              from === "vault" ? vault : atomicSwap,
              expectedRevertError,
            );
          } else {
            await expect(
              atomicSwap.executeSwapWithPermit(swapPermitPayload),
            ).to.revertedWithCustomError(
              from === "vault" ? vault : atomicSwap,
              expectedRevertError,
            );
          }
        });
      },
    );
  });

  describe("invalid parameters", () => {
    const invalidParameterTests = [
      {
        name: "should revert if seller token is same with buyer token",
        mallet: async (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
        ) => {
          swapPermitPayload.sellToken.token = swapPermitPayload.buyToken.token;
        },
        expectedRevertError: "UnsupportedTokenPair",
        from: "",
      },
      {
        name: "should revert if seller and buyer is same",
        mallet: async (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
        ) => {
          swapPermitPayload.sellerSignature.owner =
            swapPermitPayload.buyerSignature.owner;
        },
        expectedRevertError: "InvalidSigners",
      },
      {
        name: "should revert if mint bid amount is bigger than maker amount",
        mallet: async (
          swapPermitPayload: IAtomicSwapBase.SwapWithPermitMsgStruct,
        ) => {
          swapPermitPayload.minBidAmount =
            BigInt(swapPermitPayload.sellToken.amount) + BigInt(1);
        },
        expectedRevertError: "InvalidMinBidAmount",
      },
    ];
    invalidParameterTests.forEach(
      ({ name, mallet, expectedRevertError, from }) => {
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
          const [seller, buyer] = accounts;
          const swapPermitPayload = setupSwapPermitPayload(
            usdcAddress,
            usdtAddress,
            buyer.address,
          );

          // Common setup for all attack tests
          await usdc
            .connect(seller)
            .approve(
              await vault.getAddress(),
              swapPermitPayload.sellToken.amount,
            );
          await usdt
            .connect(buyer)
            .approve(
              await vault.getAddress(),
              swapPermitPayload.buyToken.amount,
            );
          await vault
            .connect(seller)
            .deposit(usdcAddress, swapPermitPayload.sellToken.amount);
          await vault
            .connect(buyer)
            .deposit(usdtAddress, swapPermitPayload.buyToken.amount);

          const atomicSwapAddress = await atomicSwap.getAddress();
          const { chainId } = await ethers.provider.getNetwork();
          const deadline = BigInt(await BlockTime.AfterSeconds(100000));
          const { sellerAgreement, buyerAgreement } = generateAgreement(
            swapPermitPayload,
            seller.address,
            buyer.address,
          );

          // Maker signature setup
          const { signature: sellerSignature } =
            await ecdsa.createPermitSignature({
              tokenName: vaultName,
              contractAddress: vaultAddress,
              chainId: chainId,
              author: seller,
              spender: atomicSwapAddress,
              value: swapPermitPayload.sellToken.amount,
              agreement: sellerAgreement,
              deadline,
            });
          const makerSig = ethers.Signature.from(sellerSignature);
          swapPermitPayload.sellerSignature = {
            deadline,
            v: makerSig.v,
            r: makerSig.r,
            s: makerSig.s,
            owner: seller.address,
          };

          const { signature: buyerSignature } =
            await ecdsa.createPermitSignature({
              tokenName: vaultName,
              contractAddress: vaultAddress,
              chainId: chainId,
              author: buyer,
              spender: atomicSwapAddress,
              value: swapPermitPayload.buyToken.amount, // Different amount of maker suggestion.
              agreement: buyerAgreement,
              deadline,
            });

          const takerSig = ethers.Signature.from(buyerSignature);
          swapPermitPayload.buyerSignature = {
            deadline,
            v: takerSig.v,
            r: takerSig.r,
            s: takerSig.s,
            owner: buyer.address,
          };

          // Apply specific setup for each test case
          mallet(swapPermitPayload);
          // Execute the test and check for expected revert error
          await expect(
            atomicSwap.executeSwapWithPermit(swapPermitPayload),
          ).to.revertedWithCustomError(
            from === "vault" ? vault : atomicSwap,
            expectedRevertError,
          );
          //await atomicSwap.executeSwapWithPermit(swapPermitPayload, []);
        });
      },
    );
  });
});
