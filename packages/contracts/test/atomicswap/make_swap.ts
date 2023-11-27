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
import { randomBytes } from "crypto";
import { ZeroAddress } from "ethers";

describe("AtomicSwap: MakeSwap", () => {
  it("create in-chain swap with native token", async () =>
    createDefaultAtomicOrder(true));
  it("create in-chain swap with ERC20 token", async () =>
    createDefaultAtomicOrder());
  it("should revert to create in-chain order with same orderId", async () => {
    const { uuid, usdc, usdt, maker, atomicSwap } =
      await createDefaultAtomicOrder();
    const payload = {
      uuid,
      sellToken: {
        token: await usdc.getAddress(),
        amount: ethers.parseEther("20"),
      },
      buyToken: {
        token: await usdt.getAddress(),
        amount: ethers.parseEther("20"),
      },
      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: ethers.ZeroAddress,
      expireAt: await BlockTime.AfterSeconds(30),
      acceptBid: true,
    };

    const amount = await usdc.allowance(maker, await atomicSwap.getAddress());
    await expect(
      usdc.approve(
        await atomicSwap.getAddress(),
        amount + payload.sellToken.amount
      )
    ).not.to.reverted;
    const tx = atomicSwap.makeSwap(payload, {
      value: payload.sellToken.amount,
    });
    await expect(tx).to.revertedWithCustomError(
      atomicSwap,
      "OrderAlreadyExists"
    );
  });

  it("should revert to create in-chain order with same token address", async () => {
    const { atomicSwap, usdc } = await loadFixture(
      Utils.prepareInChainAtomicTest
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(100);
    const usdcAddress = await usdc.getAddress();

    const uuid = generateOrderID();
    const payload = {
      uuid: uuid,
      sellToken: {
        token: usdcAddress,
        amount: "20",
      },
      buyToken: {
        token: usdcAddress,
        amount: "20",
      },

      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: expireAt,
      acceptBid: true,
    };

    await expect(atomicSwap.makeSwap(payload)).to.revertedWithCustomError(
      atomicSwap,
      "UnsupportedTokenPair"
    );
  });

  it("should revert to create in-chain order with not allowed amount", async () => {
    const { atomicSwap, usdc, usdt } = await loadFixture(
      Utils.prepareInChainAtomicTest
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(100);
    const uuid = generateOrderID();
    const payload = {
      uuid,
      sellToken: {
        token: await usdc.getAddress(),
        amount: "90",
      },
      buyToken: {
        token: await usdt.getAddress(),
        amount: "20",
      },
      maker: taker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: expireAt,
      acceptBid: true,
    };

    await expect(atomicSwap.connect(taker).makeSwap(payload)).to.revertedWith(
      "TransferHelper::transferFrom: transferFrom failed"
    );
  });

  it("should revert to create in-chain pool with transfer failed", async () => {
    const { atomicSwap, usdc, usdt } = await loadFixture(
      Utils.prepareInChainAtomicTest
    );
    const accounts = await ethers.getSigners();
    const [maker, taker] = accounts;
    const expireAt = await BlockTime.AfterSeconds(30);
    const uuid = generateOrderID();
    const payload = {
      uuid,
      sellToken: {
        token: await usdc.getAddress(),
        amount: "90",
      },
      buyToken: {
        token: await usdt.getAddress(),
        amount: "20",
      },
      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: expireAt,
      acceptBid: true,
    };

    await usdc.setFailTransferFrom(true);

    await expect(atomicSwap.makeSwap(payload)).to.revertedWith(
      "TransferHelper::transferFrom: transferFrom failed"
    );
  });

  it("should revert to create in-chain pool with not enough native token", async () => {
    const { atomicSwap, usdc } = await loadFixture(
      Utils.prepareInChainAtomicTest
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(10);
    const uuid = generateOrderID();
    const payload = {
      uuid,
      sellToken: {
        token: ethers.ZeroAddress,
        amount: ethers.parseEther("20"),
      },
      buyToken: {
        token: await usdc.getAddress(),
        amount: ethers.parseEther("20"),
      },
      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: expireAt,
      acceptBid: true,
    };

    await expect(atomicSwap.makeSwap(payload)).to.revertedWithCustomError(
      atomicSwap,
      "NotEnoughFund"
    );
  });
  it("should revert to create in-chain pool with invalid sell token address", async () => {
    const { atomicSwap, usdc } = await loadFixture(
      Utils.prepareInChainAtomicTest
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(10);
    const uuid = generateOrderID();
    const payload = {
      uuid,
      sellToken: {
        token: taker.address,
        amount: ethers.parseEther("20"),
      },
      buyToken: {
        token: await usdc.getAddress(),
        amount: ethers.parseEther("20"),
      },
      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: expireAt,
      acceptBid: true,
    };

    await expect(atomicSwap.makeSwap(payload)).to.revertedWithCustomError(
      atomicSwap,
      "InvalidContractAddress"
    );
  });
  it("should revert to create in-chain pool with invalid buy token address", async () => {
    const { atomicSwap, usdc } = await loadFixture(
      Utils.prepareInChainAtomicTest
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(10);
    const uuid = generateOrderID();
    const payload = {
      uuid,
      sellToken: {
        token: await usdc.getAddress(),
        amount: ethers.parseEther("20"),
      },
      buyToken: {
        token: taker.address,
        amount: ethers.parseEther("20"),
      },
      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: expireAt,
      acceptBid: true,
    };

    await expect(atomicSwap.makeSwap(payload)).to.revertedWithCustomError(
      atomicSwap,
      "InvalidContractAddress"
    );
  });
  it("should revert to create in-chain pool with invalid min amount", async () => {
    const { atomicSwap, usdc, usdt } = await loadFixture(
      Utils.prepareInChainAtomicTest
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(10);
    const uuid = generateOrderID();
    const payload = {
      uuid,
      sellToken: {
        token: await usdc.getAddress(),
        amount: ethers.parseEther("20"),
      },
      buyToken: {
        token: await usdt.getAddress(),
        amount: ethers.parseEther("20"),
      },
      maker: maker.address,
      minBidAmount: ethers.parseEther("0"),
      desiredTaker: taker.address,
      expireAt: expireAt,
      acceptBid: true,
    };

    await expect(atomicSwap.makeSwap(payload)).to.revertedWithCustomError(
      atomicSwap,
      "InvalidMinimumBidLimit"
    );
  });
  it("should revert to create in-chain pool with different maker", async () => {
    const { atomicSwap, usdc, usdt } = await loadFixture(
      Utils.prepareInChainAtomicTest
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(10);
    const uuid = generateOrderID();
    const payload = {
      uuid,
      sellToken: {
        token: await usdc.getAddress(),
        amount: ethers.parseEther("20"),
      },
      buyToken: {
        token: await usdt.getAddress(),
        amount: ethers.parseEther("20"),
      },
      maker: taker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: expireAt,
      acceptBid: true,
    };

    await expect(atomicSwap.makeSwap(payload)).to.revertedWithCustomError(
      atomicSwap,
      "UnauthorizedSender"
    );
  });
  it("should revert to create in-chain pool with invalid expire time", async () => {
    const { atomicSwap, usdc, usdt } = await loadFixture(
      Utils.prepareInChainAtomicTest
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = 10;
    const uuid = generateOrderID();
    const payload = {
      uuid,
      sellToken: {
        token: await usdc.getAddress(),
        amount: ethers.parseEther("20"),
      },
      buyToken: {
        token: await usdt.getAddress(),
        amount: ethers.parseEther("20"),
      },
      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: expireAt,
      acceptBid: true,
    };

    await expect(atomicSwap.makeSwap(payload)).to.revertedWithCustomError(
      atomicSwap,
      "InvalidExpirationTime"
    );
  });

  it("should revert to create in-chain pool with zero address", async () => {
    const { atomicSwap, usdc, usdt } = await loadFixture(
      Utils.prepareInChainAtomicTest
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = 10;
    const uuid = generateOrderID();
    const payload = {
      uuid,
      sellToken: {
        token: await usdc.getAddress(),
        amount: ethers.parseEther("20"),
      },
      buyToken: {
        token: await usdt.getAddress(),
        amount: ethers.parseEther("20"),
      },
      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: expireAt,
      acceptBid: true,
    };

    const signer = await getCustomSigner(ZeroAddress);
    await expect(
      atomicSwap.connect(signer).makeSwap(payload)
    ).to.revertedWithCustomError(atomicSwap, "UnauthorizedSender");
  });
});
