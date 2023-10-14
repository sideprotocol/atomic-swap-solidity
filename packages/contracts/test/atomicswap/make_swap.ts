import { ethers } from "hardhat";
import { Utils, createDefaultAtomicOrder } from "../../utils/utils";
import { BlockTime } from "../../utils/time";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("AtomicSwap: MakeSwap", () => {
  describe("In-chain", () => {
    it("create in-chain swap with native token", async () =>
      createDefaultAtomicOrder(true));
    it("create in-chain swap with ERC20 token", async () =>
      createDefaultAtomicOrder());

    it("should revert to create in-chain pool with same token address", async () => {
      const { atomicSwap, usdc } = await loadFixture(Utils.prepareTest);
      const accounts = await ethers.getSigners();
      const [maker, taker, makerReceiver, takerReceiver] = accounts;
      const expireAt = await BlockTime.AfterSeconds(100);
      const payload = {
        sellToken: {
          token: usdc.address,
          amount: "20",
        },
        buyToken: {
          token: usdc.address,
          amount: "20",
        },

        maker: maker.address,
        minBidAmount: ethers.utils.parseEther("15"),
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
      const { atomicSwap, usdc, usdt } = await loadFixture(Utils.prepareTest);
      const accounts = await ethers.getSigners();
      const [maker, taker, makerReceiver, takerReceiver] = accounts;
      const expireAt = await BlockTime.AfterSeconds(100);
      const payload = {
        sellToken: {
          token: usdc.address,
          amount: "90",
        },
        buyToken: {
          token: usdt.address,
          amount: "20",
        },
        makerSender: taker.address,
        minBidAmount: ethers.utils.parseEther("15"),
        desiredTaker: taker.address,
        expireAt: expireAt,
        acceptBid: true,
      };

      await expect(
        atomicSwap.connect(taker).makeSwap(payload)
      ).to.revertedWithCustomError(atomicSwap, "NotAllowedTransferAmount");
    });

    it("should revert to create in-chain pool with transfer failed", async () => {
      const { atomicSwap, usdc, usdt } = await loadFixture(Utils.prepareTest);
      const accounts = await ethers.getSigners();
      const [maker, taker] = accounts;
      const expireAt = await BlockTime.AfterSeconds(30);
      const payload = {
        sellToken: {
          token: usdc.address,
          amount: "90",
        },
        buyToken: {
          token: usdt.address,
          amount: "20",
        },
        makerSender: maker.address,
        minBidAmount: ethers.utils.parseEther("15"),
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
      const { atomicSwap, usdc } = await loadFixture(Utils.prepareTest);
      const accounts = await ethers.getSigners();
      const [maker, taker, makerReceiver, takerReceiver] = accounts;
      const expireAt = await BlockTime.AfterSeconds(10);
      const payload = {
        sellToken: {
          token: ethers.constants.AddressZero,
          amount: ethers.utils.parseEther("20"),
        },
        buyToken: {
          token: usdc.address,
          amount: ethers.utils.parseEther("20"),
        },
        makerSender: maker.address,
        minBidAmount: ethers.utils.parseEther("15"),
        desiredTaker: taker.address,
        expireAt: expireAt,
        acceptBid: true,
      };

      await expect(atomicSwap.makeSwap(payload)).to.revertedWith(
        "Not enough ether"
      );
    });
  });

  describe("Inter-chain", () => {});
});
