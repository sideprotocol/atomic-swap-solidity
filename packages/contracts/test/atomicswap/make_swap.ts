import { ethers } from "hardhat";
import { createDefaultAtomicOrder } from "../../utils/utils";
import { Utils } from "../../utils/utils";
import { BlockTime } from "../../utils/time";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("AtomicSwap: MakeSwap", () => {
  it("create in-chain swap with native token", async () =>
    createDefaultAtomicOrder(true));
  it("create in-chain swap with ERC20 token", async () =>
    createDefaultAtomicOrder());

  it("should revert to create in-chain pool with same token address", async () => {
    const { atomicSwap, usdc } = await loadFixture(
      Utils.prepareInChainAtomicTest
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(100);
    const usdcAddress = await usdc.getAddress();
    const payload = {
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

  it("should revert to create in-chain pool with not allowed amount", async () => {
    const { atomicSwap, usdc, usdt } = await loadFixture(
      Utils.prepareInChainAtomicTest
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(100);
    const payload = {
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

    await expect(
      atomicSwap.connect(taker).makeSwap(payload)
    ).to.revertedWithCustomError(atomicSwap, "NotAllowedTransferAmount");
  });

  it("should revert to create in-chain pool with transfer failed", async () => {
    const { atomicSwap, usdc, usdt } = await loadFixture(
      Utils.prepareInChainAtomicTest
    );
    const accounts = await ethers.getSigners();
    const [maker, taker] = accounts;
    const expireAt = await BlockTime.AfterSeconds(30);
    const payload = {
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
      "Failed in Lock token"
    );
  });

  it("should revert to create in-chain pool with not enough native token", async () => {
    const { atomicSwap, usdc } = await loadFixture(
      Utils.prepareInChainAtomicTest
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(10);
    const payload = {
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

    await expect(atomicSwap.makeSwap(payload)).to.revertedWith(
      "Not enough ether"
    );
  });
});
