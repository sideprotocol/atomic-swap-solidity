import { ethers } from "hardhat";
import { createDefaultAtomicOrder } from "../../utils/utils";
import { BlockTime } from "../../utils/time";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("AtomicSwap: PlaceBid", () => {
  let accounts: SignerWithAddress[];
  beforeEach(async () => {
    accounts = await ethers.getSigners();
  });

  describe("In-chain", () => {
    it("should place bid with native token", async () => {
      const { atomicSwap, taker, orderID, usdt } =
        await createDefaultAtomicOrder(false, true);

      const bidPayload = {
        bidder: taker.address,
        bidAmount: ethers.utils.parseEther("30"),
        orderID: orderID,
        bidderReceiver: taker.address,
        expireTimestamp: await BlockTime.AfterSeconds(30),
      };
      // make bid
      await expect(
        atomicSwap.connect(taker).placeBid(bidPayload, {
          value: bidPayload.bidAmount,
        })
      ).to.changeEtherBalance(atomicSwap.address, bidPayload.bidAmount);
    });
    it("should update bid with more native token than original one", async () => {
      const { atomicSwap, taker, orderID, maker, usdt } =
        await createDefaultAtomicOrder(false, true);
      // try to take swap
      await expect(
        atomicSwap.connect(maker).takeSwap({
          orderID,
          takerReceiver: maker.address,
        })
      ).to.revertedWithCustomError(atomicSwap, "NoPermissionToTake");

      const bidPayload = {
        bidder: taker.address,
        bidAmount: ethers.utils.parseEther("30"),
        orderID: orderID,
        bidderReceiver: taker.address,
        expireTimestamp: await BlockTime.AfterSeconds(30),
      };

      // make bid
      await expect(
        atomicSwap.connect(taker).placeBid(bidPayload, {
          value: bidPayload.bidAmount,
        })
      ).to.changeEtherBalance(atomicSwap.address, bidPayload.bidAmount);

      // Add updates.
      const bidPayload2 = {
        bidder: taker.address,
        bidAmount: ethers.utils.parseEther("50"),
        orderID: orderID,
        bidderReceiver: taker.address,
        expireTimestamp: await BlockTime.AfterSeconds(30),
      };

      // make bid
      await expect(
        atomicSwap.connect(taker).placeBid(bidPayload2, {
          value: bidPayload2.bidAmount.sub(bidPayload.bidAmount),
        })
      ).to.changeEtherBalance(
        atomicSwap.address,
        bidPayload2.bidAmount.sub(bidPayload.bidAmount)
      );
    });

    it("should place bid with erc20 token", async () => {
      const { atomicSwap, taker, orderID, usdt } =
        await createDefaultAtomicOrder(true);

      // try to take swap
      await expect(
        atomicSwap.connect(taker).takeSwap({
          orderID,
          takerReceiver: taker.address,
        })
      ).to.revertedWithCustomError(atomicSwap, "NotAllowedAmount");

      const bidPayload = {
        bidder: taker.address,
        bidAmount: ethers.utils.parseEther("30"),
        orderID: orderID,
        bidderReceiver: taker.address,
        expireTimestamp: await BlockTime.AfterSeconds(30),
      };

      await usdt
        .connect(taker)
        .approve(atomicSwap.address, bidPayload.bidAmount);

      // make bid
      await expect(
        atomicSwap.connect(taker).placeBid(bidPayload, {
          value: bidPayload.bidAmount,
        })
      ).to.changeEtherBalance(atomicSwap.address, bidPayload.bidAmount);
    });
    it("should update bid with more erc20 token than original one", async () => {
      const { atomicSwap, taker, orderID, maker, usdt } =
        await createDefaultAtomicOrder(true);

      // try to take swap

      await expect(
        atomicSwap.connect(maker).takeSwap({
          orderID,
          takerReceiver: maker.address,
        })
      ).to.revertedWithCustomError(atomicSwap, "NoPermissionToTake");

      const bidPayload = {
        bidder: taker.address,
        bidAmount: ethers.utils.parseEther("30"),
        orderID: orderID,
        bidderReceiver: taker.address,
        expireTimestamp: await BlockTime.AfterSeconds(30),
      };

      await usdt
        .connect(taker)
        .approve(atomicSwap.address, bidPayload.bidAmount);

      // make bid
      await expect(
        atomicSwap.connect(taker).placeBid(bidPayload)
      ).to.changeTokenBalance(usdt, atomicSwap.address, bidPayload.bidAmount);

      // Add updates.
      const bidPayload2 = {
        bidder: taker.address,
        bidAmount: ethers.utils.parseEther("50"),
        orderID: orderID,
        bidderReceiver: taker.address,
        expireTimestamp: await BlockTime.AfterSeconds(30),
      };

      await usdt
        .connect(taker)
        .approve(atomicSwap.address, bidPayload2.bidAmount);

      // make bid
      await expect(
        atomicSwap.connect(taker).placeBid(bidPayload2)
      ).to.changeTokenBalance(
        usdt,
        atomicSwap.address,
        bidPayload2.bidAmount.sub(bidPayload.bidAmount)
      );
    });
    it("should revert to place bid with not enough native token", async () => {
      const { atomicSwap, taker, orderID } = await createDefaultAtomicOrder(
        true,
        false,
        true
      );

      const bidPayload = {
        bidder: taker.address,
        bidAmount: ethers.utils.parseEther("5"),
        orderID: orderID,
        bidderReceiver: taker.address,
        expireTimestamp: await BlockTime.AfterSeconds(30),
      };

      // make bid
      await expect(
        atomicSwap.connect(taker).placeBid(bidPayload)
      ).to.revertedWithCustomError(atomicSwap, "InvalidBidAmount");
    });
    it("should revert to place bid with not allowed amount erc20 token", async () => {
      const { atomicSwap, taker, orderID, usdt } =
        await createDefaultAtomicOrder(false, false, true);
      // try to take swap
      const buyToken = (await atomicSwap.swapOrder(orderID)).buyToken;
      const bidPayload = {
        bidder: taker.address,
        bidAmount: buyToken.amount,
        orderID: orderID,
        bidderReceiver: taker.address,
        expireTimestamp: await BlockTime.AfterSeconds(30),
      };

      // make bid
      await expect(
        atomicSwap.connect(taker).placeBid(bidPayload)
      ).to.revertedWithCustomError(atomicSwap, "NotAllowedAmount");
    });
    it("should revert to place bid with not enough erc20 token", async () => {
      const { atomicSwap, taker, orderID, usdt } =
        await createDefaultAtomicOrder(false, false, true);
      // try to take swap
      const minBidCap = (await atomicSwap.swapOrder(orderID)).minBidCap;
      const bidPayload = {
        bidder: taker.address,
        bidAmount: minBidCap.sub(10),
        orderID: orderID,
        bidderReceiver: taker.address,
        expireTimestamp: await BlockTime.AfterSeconds(30),
      };

      // make bid
      await usdt.connect(taker).approve(atomicSwap.address, minBidCap);
      await expect(
        atomicSwap.connect(taker).placeBid(bidPayload)
      ).to.revertedWithCustomError(atomicSwap, "InvalidBidAmount");
    });
  });

  describe("Inter-chain", () => {});
});
