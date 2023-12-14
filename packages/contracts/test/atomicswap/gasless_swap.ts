import { ethers } from "hardhat";
import {
  createDefaultAtomicOrder,
  generateOrderID,
  getCustomSigner,
} from "../../utils/utils";
import { Utils } from "../../utils/utils";
import { BlockTime } from "../../utils/time";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ecdsa } from "@sideprotocol/contracts-typechain";
import { randomBytes } from "crypto";
import { ZeroAddress } from "ethers";

describe("AtomicSwap: Gasless Swap", () => {
  it("should swap token with signatures (no vesting)", async () => {
    const { atomicSwap, usdc, usdt } = await loadFixture(
      Utils.prepareInChainAtomicTest,
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(100);

    const usdcAddress = await usdc.getAddress();
    const usdtAddress = await usdt.getAddress();
    const uuid = generateOrderID();
    const initialSig = {
      deadline: BigInt(0),
      v: 27 | 28,
      r: "",
      s: "",
      sender: "",
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

    const atomicSwapAddress = await atomicSwap.getAddress();
    const { chainId } = await ethers.provider.getNetwork();
    const deadline = BigInt(await BlockTime.AfterSeconds(100000));
    const makerNonce = await usdc.nonces(maker.address);
    const { signature: makerSignature } = await ecdsa.createPermitSignature({
      tokenName: await usdc.name(),
      contractAddress: usdcAddress,
      chainId: chainId,
      author: maker,
      spender: atomicSwapAddress,
      value: swapPermitPayload.sellToken.amount,
      nonce: makerNonce,
      deadline,
    });
    console.log("signature:" + makerSignature);
    const makerSig = ethers.Signature.from(makerSignature);
    swapPermitPayload.makerSignature = {
      deadline,
      v: makerSig.v,
      r: makerSig.r,
      s: makerSig.s,
      sender: maker.address,
    };

    const takerNonce = await usdc.nonces(maker.address);
    const { signature: takerSignature } = await ecdsa.createPermitSignature({
      tokenName: await usdt.name(),
      contractAddress: usdtAddress,
      chainId: chainId,
      author: taker,
      spender: atomicSwapAddress,
      value: swapPermitPayload.buyToken.amount,
      nonce: takerNonce,
      deadline,
    });
    const takerSig = ethers.Signature.from(takerSignature);
    swapPermitPayload.takerSignature = {
      deadline,
      v: takerSig.v,
      r: takerSig.r,
      s: takerSig.s,
      sender: taker.address,
    };
    await atomicSwap.executeSwapWithPermit(swapPermitPayload, []);
  });
  it("should swap token with signatures (vesting)", async () => {
    const { atomicSwap, usdc, usdt } = await loadFixture(
      Utils.prepareInChainAtomicTest,
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(100);

    const usdcAddress = await usdc.getAddress();
    const usdtAddress = await usdt.getAddress();
    const uuid = generateOrderID();
    const initialSig = {
      deadline: BigInt(0),
      v: 27 | 28,
      r: "",
      s: "",
      sender: "",
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

    const atomicSwapAddress = await atomicSwap.getAddress();
    const { chainId } = await ethers.provider.getNetwork();
    const deadline = BigInt(await BlockTime.AfterSeconds(100000));
    const makerNonce = await usdc.nonces(maker.address);
    const { signature: makerSignature } = await ecdsa.createPermitSignature({
      tokenName: await usdc.name(),
      contractAddress: usdcAddress,
      chainId: chainId,
      author: maker,
      spender: atomicSwapAddress,
      value: swapPermitPayload.sellToken.amount,
      nonce: makerNonce,
      deadline,
    });
    console.log("signature:" + makerSignature);
    const makerSig = ethers.Signature.from(makerSignature);
    swapPermitPayload.makerSignature = {
      deadline,
      v: makerSig.v,
      r: makerSig.r,
      s: makerSig.s,
      sender: maker.address,
    };

    const takerNonce = await usdc.nonces(maker.address);
    const { signature: takerSignature } = await ecdsa.createPermitSignature({
      tokenName: await usdt.name(),
      contractAddress: usdtAddress,
      chainId: chainId,
      author: taker,
      spender: atomicSwapAddress,
      value: swapPermitPayload.buyToken.amount,
      nonce: takerNonce,
      deadline,
    });
    const takerSig = ethers.Signature.from(takerSignature);
    swapPermitPayload.takerSignature = {
      deadline,
      v: takerSig.v,
      r: takerSig.r,
      s: takerSig.s,
      sender: taker.address,
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
  });
  it("should revert to swap token when comprise seller amount by broadcaster", async () => {
    const { atomicSwap, usdc, usdt } = await loadFixture(
      Utils.prepareInChainAtomicTest,
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(100);

    const usdcAddress = await usdc.getAddress();
    const usdtAddress = await usdt.getAddress();
    const uuid = generateOrderID();
    const initialSig = {
      deadline: BigInt(0),
      v: 27 | 28,
      r: "",
      s: "",
      sender: "",
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

    const atomicSwapAddress = await atomicSwap.getAddress();
    const { chainId } = await ethers.provider.getNetwork();
    const deadline = BigInt(await BlockTime.AfterSeconds(100000));
    const makerNonce = await usdc.nonces(maker.address);
    const { signature: makerSignature } = await ecdsa.createPermitSignature({
      tokenName: await usdc.name(),
      contractAddress: usdcAddress,
      chainId: chainId,
      author: maker,
      spender: atomicSwapAddress,
      value: ethers.parseEther("18"), // maker wanna send 18*10^18 amount tokens only
      nonce: makerNonce,
      deadline,
    });

    const makerSig = ethers.Signature.from(makerSignature);
    swapPermitPayload.makerSignature = {
      deadline,
      v: makerSig.v,
      r: makerSig.r,
      s: makerSig.s,
      sender: maker.address,
    };

    const takerNonce = await usdc.nonces(maker.address);
    const { signature: takerSignature } = await ecdsa.createPermitSignature({
      tokenName: await usdt.name(),
      contractAddress: usdtAddress,
      chainId: chainId,
      author: taker,
      spender: atomicSwapAddress,
      value: swapPermitPayload.buyToken.amount,
      nonce: takerNonce,
      deadline,
    });
    const takerSig = ethers.Signature.from(takerSignature);
    swapPermitPayload.takerSignature = {
      deadline,
      v: takerSig.v,
      r: takerSig.r,
      s: takerSig.s,
      sender: taker.address,
    };

    // broadcaster comprise amount and broadcast
    await expect(
      atomicSwap.executeSwapWithPermit(swapPermitPayload, [
        {
          durationInHours: BigInt(1),
          percentage: BigInt(5000),
        },
        {
          durationInHours: BigInt(1),
          percentage: BigInt(5000),
        },
      ]),
    ).to.revertedWithCustomError(usdc, "ERC2612InvalidSigner");
  });
  it("should revert to swap token when invalid token pair", async () => {
    const { atomicSwap, usdc, usdt } = await loadFixture(
      Utils.prepareInChainAtomicTest,
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(100);

    const usdcAddress = await usdc.getAddress();
    const usdtAddress = await usdt.getAddress();
    const uuid = generateOrderID();
    const initialSig = {
      deadline: BigInt(0),
      v: 27 | 28,
      r: "",
      s: "",
      sender: "",
    };
    const swapPermitPayload = {
      uuid: uuid,
      sellToken: {
        token: usdcAddress,
        amount: ethers.parseEther("20"),
      },
      buyToken: {
        token: usdcAddress,
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

    const atomicSwapAddress = await atomicSwap.getAddress();
    const { chainId } = await ethers.provider.getNetwork();
    const deadline = BigInt(await BlockTime.AfterSeconds(100000));
    const makerNonce = await usdc.nonces(maker.address);
    const { signature: makerSignature } = await ecdsa.createPermitSignature({
      tokenName: await usdc.name(),
      contractAddress: usdcAddress,
      chainId: chainId,
      author: maker,
      spender: atomicSwapAddress,
      value: ethers.parseEther("18"), // maker wanna send 18*10^18 amount tokens only
      nonce: makerNonce,
      deadline,
    });

    const makerSig = ethers.Signature.from(makerSignature);
    swapPermitPayload.makerSignature = {
      deadline,
      v: makerSig.v,
      r: makerSig.r,
      s: makerSig.s,
      sender: maker.address,
    };

    const takerNonce = await usdc.nonces(maker.address);
    const { signature: takerSignature } = await ecdsa.createPermitSignature({
      tokenName: await usdt.name(),
      contractAddress: usdtAddress,
      chainId: chainId,
      author: taker,
      spender: atomicSwapAddress,
      value: swapPermitPayload.buyToken.amount,
      nonce: takerNonce,
      deadline,
    });
    const takerSig = ethers.Signature.from(takerSignature);
    swapPermitPayload.takerSignature = {
      deadline,
      v: takerSig.v,
      r: takerSig.r,
      s: takerSig.s,
      sender: taker.address,
    };

    // broadcaster comprise amount and broadcast
    await expect(
      atomicSwap.executeSwapWithPermit(swapPermitPayload, [
        {
          durationInHours: BigInt(1),
          percentage: BigInt(5000),
        },
        {
          durationInHours: BigInt(1),
          percentage: BigInt(5000),
        },
      ]),
    ).to.revertedWithCustomError(atomicSwap, "UnsupportedTokenPair");
  });
});
