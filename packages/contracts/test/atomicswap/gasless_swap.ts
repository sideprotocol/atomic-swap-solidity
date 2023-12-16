import { ethers } from "hardhat";
import {
  generateAgreement,
  generateOrderID,
  getCustomSigner,
  newAtomicSwapOrderID,
} from "../../utils/utils";
import { Utils } from "../../utils/utils";
import { BlockTime } from "../../utils/time";
import { expect } from "chai";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { ecdsa } from "@sideprotocol/contracts-typechain";
import { randomBytes } from "crypto";

describe("AtomicSwap: Gasless Swap", () => {
  it("should swap token with signatures (no vesting)", async () => {
    const { atomicSwap, usdc, usdt, vault, vaultName } = await loadFixture(
      Utils.prepareInChainAtomicTest,
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(100);

    const usdcAddress = await usdc.getAddress();
    const usdtAddress = await usdt.getAddress();
    const uuid = generateOrderID();
    const initialSig = {
      v: 27 | 28,
      r: "",
      s: "",
      owner: "",
      deadline: BigInt(0),
    };
    const swapPermitPayload = {
      uuid: uuid,
      sellToken: {
        token: usdcAddress,
        amount: ethers.parseEther("20"),
      },
      buyToken: {
        token: usdtAddress,
        amount: ethers.parseEther("20"),
      },
      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: expireAt,
      acceptBid: true,
      makerSignature: initialSig,
      takerSignature: initialSig,
    };

    // Approve
    await usdc
      .connect(maker)
      .approve(await vault.getAddress(), swapPermitPayload.sellToken.amount);

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
    const { signature: makerSignature } = await ecdsa.createPermitSignature({
      tokenName: vaultName,
      contractAddress: await vault.getAddress(),
      chainId: chainId,
      author: maker,
      spender: atomicSwapAddress,
      value: swapPermitPayload.sellToken.amount,
      agreement,
      nonce: makerNonce,
      deadline,
    });
    // console.log("signature:" + makerSignature);
    const makerSig = ethers.Signature.from(makerSignature);
    swapPermitPayload.makerSignature = {
      deadline,
      v: makerSig.v,
      r: makerSig.r,
      s: makerSig.s,
      owner: maker.address,
    };

    const takerNonce = await vault.nonces(taker.address);
    const { signature: takerSignature } = await ecdsa.createPermitSignature({
      tokenName: vaultName,
      contractAddress: await vault.getAddress(),
      chainId: chainId,
      author: taker,
      spender: atomicSwapAddress,
      value: swapPermitPayload.buyToken.amount,
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

    await atomicSwap.executeSwapWithPermit(swapPermitPayload, []);
    const makerUSTAmount = await vault.balanceOf(maker.address, usdtAddress);
    const takerUSTAmount = await vault.balanceOf(taker.address, usdcAddress);
    console.log("makerUST amount:", makerUSTAmount);
    console.log("takerUSC amount:", takerUSTAmount);
  });
  it("should swap token with signatures (vesting)", async () => {
    const { atomicSwap, usdc, usdt, vault, vaultName, vestingManager } =
      await loadFixture(Utils.prepareInChainAtomicTest);
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(100);

    const usdcAddress = await usdc.getAddress();
    const usdtAddress = await usdt.getAddress();
    const uuid = generateOrderID();
    const initialSig = {
      v: 27 | 28,
      r: "",
      s: "",
      owner: "",
      deadline: BigInt(0),
    };
    const swapPermitPayload = {
      uuid: uuid,
      sellToken: {
        token: usdcAddress,
        amount: ethers.parseEther("20"),
      },
      buyToken: {
        token: usdtAddress,
        amount: ethers.parseEther("20"),
      },
      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: expireAt,
      acceptBid: true,
      makerSignature: initialSig,
      takerSignature: initialSig,
    };

    // Approve
    await usdc
      .connect(maker)
      .approve(await vault.getAddress(), swapPermitPayload.sellToken.amount);

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
    const { signature: makerSignature } = await ecdsa.createPermitSignature({
      tokenName: vaultName,
      contractAddress: await vault.getAddress(),
      chainId: chainId,
      author: maker,
      spender: atomicSwapAddress,
      value: swapPermitPayload.sellToken.amount,
      agreement,
      nonce: makerNonce,
      deadline,
    });
    // console.log("signature:" + makerSignature);
    const makerSig = ethers.Signature.from(makerSignature);
    swapPermitPayload.makerSignature = {
      deadline,
      v: makerSig.v,
      r: makerSig.r,
      s: makerSig.s,
      owner: maker.address,
    };

    const takerNonce = await vault.nonces(taker.address);
    const { signature: takerSignature } = await ecdsa.createPermitSignature({
      tokenName: vaultName,
      contractAddress: await vault.getAddress(),
      chainId: chainId,
      author: taker,
      spender: atomicSwapAddress,
      value: swapPermitPayload.buyToken.amount,
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

    await atomicSwap.executeSwapWithPermit(swapPermitPayload, [
      {
        durationInHours: BigInt(1),
        percentage: BigInt(5000),
      },
      {
        durationInHours: BigInt(1),
        percentage: BigInt(5000),
      },
    ]);

    const id = newAtomicSwapOrderID(atomicSwapAddress, swapPermitPayload.uuid);

    // 1 hour later, release first release from vesting contract.
    const vestingId = await vestingManager.vestingIds(id);
    await time.increase(3600);
    await vestingManager.connect(taker).release(vestingId);
    // 1 hour later, release second release from vesting contract.
    await time.increase(3600);
    await vestingManager.connect(taker).release(vestingId);
    const makerUSTAmount = await vault.balanceOf(maker.address, usdtAddress);
    const takerUSCAmount = await vault.balanceOf(taker.address, usdcAddress);
    console.log("makerUST amount:", makerUSTAmount);
    console.log("takerUST amount:", takerUSCAmount);
  });
  it("should revert to swap token when taker comprise <buyTokenAmount>", async () => {
    const { atomicSwap, usdc, usdt, vault, vaultName } = await loadFixture(
      Utils.prepareInChainAtomicTest,
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(100);

    const usdcAddress = await usdc.getAddress();
    const usdtAddress = await usdt.getAddress();
    const uuid = generateOrderID();
    const initialSig = {
      v: 27 | 28,
      r: "",
      s: "",
      owner: "",
      deadline: BigInt(0),
    };
    const swapPermitPayload = {
      uuid: uuid,
      sellToken: {
        token: usdcAddress,
        amount: ethers.parseEther("20"),
      },
      buyToken: {
        token: usdtAddress,
        amount: ethers.parseEther("20"),
      },
      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: expireAt,
      acceptBid: true,
      makerSignature: initialSig,
      takerSignature: initialSig,
    };

    // Approve
    await usdc
      .connect(maker)
      .approve(await vault.getAddress(), swapPermitPayload.sellToken.amount);

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
    const { signature: makerSignature } = await ecdsa.createPermitSignature({
      tokenName: vaultName,
      contractAddress: await vault.getAddress(),
      chainId: chainId,
      author: maker,
      spender: atomicSwapAddress,
      value: swapPermitPayload.sellToken.amount,
      agreement,
      nonce: makerNonce,
      deadline,
    });
    // console.log("signature:" + makerSignature);
    const makerSig = ethers.Signature.from(makerSignature);
    swapPermitPayload.makerSignature = {
      deadline,
      v: makerSig.v,
      r: makerSig.r,
      s: makerSig.s,
      owner: maker.address,
    };

    const takerNonce = await vault.nonces(taker.address);
    const { signature: takerSignature } = await ecdsa.createPermitSignature({
      tokenName: vaultName,
      contractAddress: await vault.getAddress(),
      chainId: chainId,
      author: taker,
      spender: atomicSwapAddress,
      value: ethers.parseEther("16"),
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
    // change swap payload by taker.
    swapPermitPayload.buyToken.amount = ethers.parseEther("16");
    await expect(
      atomicSwap.executeSwapWithPermit(swapPermitPayload, []),
    ).revertedWithCustomError(vault, "VaultInvalidSigner");
  });
  it("should revert to swap token when taker comprise <sellTokenAmount>", async () => {
    const { atomicSwap, usdc, usdt, vault, vaultName } = await loadFixture(
      Utils.prepareInChainAtomicTest,
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(100);

    const usdcAddress = await usdc.getAddress();
    const usdtAddress = await usdt.getAddress();
    const uuid = generateOrderID();
    const initialSig = {
      v: 27 | 28,
      r: "",
      s: "",
      owner: "",
      deadline: BigInt(0),
    };
    const swapPermitPayload = {
      uuid: uuid,
      sellToken: {
        token: usdcAddress,
        amount: ethers.parseEther("20"),
      },
      buyToken: {
        token: usdtAddress,
        amount: ethers.parseEther("20"),
      },
      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: expireAt,
      acceptBid: true,
      makerSignature: initialSig,
      takerSignature: initialSig,
    };

    // Approve
    await usdc
      .connect(maker)
      .approve(await vault.getAddress(), swapPermitPayload.sellToken.amount);

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
    const { signature: makerSignature } = await ecdsa.createPermitSignature({
      tokenName: vaultName,
      contractAddress: await vault.getAddress(),
      chainId: chainId,
      author: maker,
      spender: atomicSwapAddress,
      value: swapPermitPayload.sellToken.amount,
      agreement,
      nonce: makerNonce,
      deadline,
    });
    // console.log("signature:" + makerSignature);
    const makerSig = ethers.Signature.from(makerSignature);
    swapPermitPayload.makerSignature = {
      deadline,
      v: makerSig.v,
      r: makerSig.r,
      s: makerSig.s,
      owner: maker.address,
    };

    const takerNonce = await vault.nonces(taker.address);
    const { signature: takerSignature } = await ecdsa.createPermitSignature({
      tokenName: vaultName,
      contractAddress: await vault.getAddress(),
      chainId: chainId,
      author: taker,
      spender: atomicSwapAddress,
      value: ethers.parseEther("16"),
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

    swapPermitPayload.sellToken.amount = ethers.parseEther("18");

    await expect(
      atomicSwap.executeSwapWithPermit(swapPermitPayload, []),
    ).revertedWithCustomError(vault, "VaultInvalidSigner");
  });
  it("should revert to swap token when taker comprise <buyTokenAddress>", async () => {
    const { atomicSwap, usdc, usdt, vault, vaultName } = await loadFixture(
      Utils.prepareInChainAtomicTest,
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(100);

    const usdcAddress = await usdc.getAddress();
    const usdtAddress = await usdt.getAddress();
    const uuid = generateOrderID();
    const initialSig = {
      v: 27 | 28,
      r: "",
      s: "",
      owner: "",
      deadline: BigInt(0),
    };
    const swapPermitPayload = {
      uuid: uuid,
      sellToken: {
        token: usdcAddress,
        amount: ethers.parseEther("20"),
      },
      buyToken: {
        token: usdtAddress,
        amount: ethers.parseEther("20"),
      },
      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: expireAt,
      acceptBid: true,
      makerSignature: initialSig,
      takerSignature: initialSig,
    };

    // Approve
    await usdc
      .connect(maker)
      .approve(await vault.getAddress(), swapPermitPayload.sellToken.amount);

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
    const { signature: makerSignature } = await ecdsa.createPermitSignature({
      tokenName: vaultName,
      contractAddress: await vault.getAddress(),
      chainId: chainId,
      author: maker,
      spender: atomicSwapAddress,
      value: swapPermitPayload.sellToken.amount,
      agreement,
      nonce: makerNonce,
      deadline,
    });
    // console.log("signature:" + makerSignature);
    const makerSig = ethers.Signature.from(makerSignature);
    swapPermitPayload.makerSignature = {
      deadline,
      v: makerSig.v,
      r: makerSig.r,
      s: makerSig.s,
      owner: maker.address,
    };

    const takerNonce = await vault.nonces(taker.address);
    const { signature: takerSignature } = await ecdsa.createPermitSignature({
      tokenName: vaultName,
      contractAddress: await vault.getAddress(),
      chainId: chainId,
      author: taker,
      spender: atomicSwapAddress,
      value: ethers.parseEther("16"),
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

    swapPermitPayload.buyToken.token = taker.address;

    await expect(
      atomicSwap.executeSwapWithPermit(swapPermitPayload, []),
    ).revertedWithCustomError(vault, "VaultInvalidSigner");
  });
  it("should revert to swap token when taker comprise <sellTokenAddress>", async () => {
    const { atomicSwap, usdc, usdt, vault, vaultName } = await loadFixture(
      Utils.prepareInChainAtomicTest,
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(100);

    const usdcAddress = await usdc.getAddress();
    const usdtAddress = await usdt.getAddress();
    const uuid = generateOrderID();
    const initialSig = {
      v: 27 | 28,
      r: "",
      s: "",
      owner: "",
      deadline: BigInt(0),
    };
    const swapPermitPayload = {
      uuid: uuid,
      sellToken: {
        token: usdcAddress,
        amount: ethers.parseEther("20"),
      },
      buyToken: {
        token: usdtAddress,
        amount: ethers.parseEther("20"),
      },
      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: expireAt,
      acceptBid: true,
      makerSignature: initialSig,
      takerSignature: initialSig,
    };

    // Approve
    await usdc
      .connect(maker)
      .approve(await vault.getAddress(), swapPermitPayload.sellToken.amount);

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
    const { signature: makerSignature } = await ecdsa.createPermitSignature({
      tokenName: vaultName,
      contractAddress: await vault.getAddress(),
      chainId: chainId,
      author: maker,
      spender: atomicSwapAddress,
      value: swapPermitPayload.sellToken.amount,
      agreement,
      nonce: makerNonce,
      deadline,
    });
    // console.log("signature:" + makerSignature);
    const makerSig = ethers.Signature.from(makerSignature);
    swapPermitPayload.makerSignature = {
      deadline,
      v: makerSig.v,
      r: makerSig.r,
      s: makerSig.s,
      owner: maker.address,
    };

    const takerNonce = await vault.nonces(taker.address);
    const { signature: takerSignature } = await ecdsa.createPermitSignature({
      tokenName: vaultName,
      contractAddress: await vault.getAddress(),
      chainId: chainId,
      author: taker,
      spender: atomicSwapAddress,
      value: ethers.parseEther("16"),
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

    swapPermitPayload.sellToken.token = taker.address;

    await expect(
      atomicSwap.executeSwapWithPermit(swapPermitPayload, []),
    ).revertedWithCustomError(vault, "VaultInvalidSigner");
  });
});
