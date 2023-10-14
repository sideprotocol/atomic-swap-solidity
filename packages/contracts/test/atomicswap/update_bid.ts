import { ethers } from "hardhat";
import { createDefaultAtomicOrder } from "../../utils/utils";
import { BlockTime } from "../../utils/time";
import { expect } from "chai";

describe("AtomicSwap: UpdateBid", () => {
  it("should update bid with native token", async () => {
    const { atomicSwap, taker, orderID, maker, usdt } =
      await createDefaultAtomicOrder(false, true);
    // try to take swap
    await expect(
      atomicSwap.connect(maker).takeSwap({
        orderID,
        takerReceiver: maker.address,
      })
    ).to.revertedWithCustomError(atomicSwap, "OrderNotAllowTake");

    const bidPayload = {
      bidder: taker.address,
      bidAmount: ethers.utils.parseEther("19"),
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
    const updatePayload2 = {
      orderID: orderID,
      addition: ethers.utils.parseEther("1"),
    };
    await expect(
      atomicSwap.connect(taker).updateBid(updatePayload2, {
        value: updatePayload2.addition,
      })
    ).to.changeEtherBalance(atomicSwap.address, updatePayload2.addition);
  });

  it("should update bid with erc20 token", async () => {
    const { atomicSwap, taker, orderID, usdt } = await createDefaultAtomicOrder(
      true
    );

    const bidPayload = {
      bidder: taker.address,
      bidAmount: ethers.utils.parseEther("18"),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    await usdt.connect(taker).approve(atomicSwap.address, bidPayload.bidAmount);

    // make bid
    await expect(
      atomicSwap.connect(taker).placeBid(bidPayload)
    ).to.changeTokenBalance(usdt, atomicSwap.address, bidPayload.bidAmount);

    // Add updates.
    const updatePayload2 = {
      orderID: orderID,
      addition: ethers.utils.parseEther("1"),
    };
    await usdt
      .connect(taker)
      .approve(atomicSwap.address, updatePayload2.addition);

    await expect(
      atomicSwap.connect(taker).updateBid(updatePayload2)
    ).to.changeTokenBalance(usdt, atomicSwap.address, updatePayload2.addition);
  });

  it("should revert to place bid with native token with over amount", async () => {
    const { atomicSwap, taker, orderID, maker, usdt } =
      await createDefaultAtomicOrder(false, true);
    // try to take swap
    await expect(
      atomicSwap.connect(maker).takeSwap({
        orderID,
        takerReceiver: maker.address,
      })
    ).to.revertedWithCustomError(atomicSwap, "OrderNotAllowTake");

    const bidPayload = {
      bidder: taker.address,
      bidAmount: ethers.utils.parseEther("19"),
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
    const updatePayload2 = {
      orderID: orderID,
      addition: ethers.utils.parseEther("2"),
    };

    // make bid
    await expect(
      atomicSwap.connect(taker).updateBid(updatePayload2, {
        value: updatePayload2.addition,
      })
    ).to.revertedWithCustomError(atomicSwap, "MismatchedBidAmount");
  });

  it("should revert to update bid again to the same order with erc20 token", async () => {
    const { atomicSwap, taker, orderID, maker, usdt } =
      await createDefaultAtomicOrder(true);

    const bidPayload = {
      bidder: taker.address,
      bidAmount: ethers.utils.parseEther("18"),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    await usdt.connect(taker).approve(atomicSwap.address, bidPayload.bidAmount);

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
    ).to.revertedWithCustomError(atomicSwap, "BidAlreadyPlaced");
  });

  it("should revert to update bid with erc20 token", async () => {
    const { atomicSwap, taker, orderID, usdt } = await createDefaultAtomicOrder(
      true
    );

    const bidPayload = {
      bidder: taker.address,
      bidAmount: ethers.utils.parseEther("18"),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    await usdt.connect(taker).approve(atomicSwap.address, bidPayload.bidAmount);

    // make bid
    await expect(
      atomicSwap.connect(taker).placeBid(bidPayload)
    ).to.changeTokenBalance(usdt, atomicSwap.address, bidPayload.bidAmount);

    // Add updates.
    const updatePayload2 = {
      orderID: orderID,
      addition: ethers.utils.parseEther("6"),
    };
    await usdt
      .connect(taker)
      .approve(atomicSwap.address, updatePayload2.addition);

    await expect(
      atomicSwap.connect(taker).updateBid(updatePayload2)
    ).to.revertedWithCustomError(atomicSwap, "MismatchedBidAmount");
  });
});
