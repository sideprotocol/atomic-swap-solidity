import { ethers } from "hardhat";
import { createDefaultAtomicOrder } from "../../utils/utils";
import { BlockTime } from "../../utils/time";
import { expect } from "chai";
import { randomBytes } from "crypto";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { ZeroAddress } from "ethers";

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
    ).to.revertedWithCustomError(atomicSwap, "UnauthorizedTakeAction");

    const bidPayload = {
      bidder: taker.address,
      bidAmount: ethers.parseEther("19"),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    // make bid
    await expect(
      atomicSwap.connect(taker).placeBid(bidPayload, {
        value: bidPayload.bidAmount,
      })
    ).to.changeEtherBalance(
      await atomicSwap.getAddress(),
      bidPayload.bidAmount
    );
    // Add updates.
    const updatePayload2 = {
      orderID: orderID,
      bidder: taker.address,
      addition: ethers.parseEther("1"),
    };
    await expect(
      atomicSwap.connect(taker).updateBid(updatePayload2, {
        value: updatePayload2.addition,
      })
    ).to.changeEtherBalance(
      await atomicSwap.getAddress(),
      updatePayload2.addition
    );
  });

  it("should update bid with erc20 token", async () => {
    const { atomicSwap, taker, orderID, usdt } = await createDefaultAtomicOrder(
      true
    );

    const bidPayload = {
      bidder: taker.address,
      bidAmount: ethers.parseEther("18"),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    await usdt
      .connect(taker)
      .approve(await atomicSwap.getAddress(), bidPayload.bidAmount);

    // make bid
    await expect(
      atomicSwap.connect(taker).placeBid(bidPayload)
    ).to.changeTokenBalance(
      usdt,
      await atomicSwap.getAddress(),
      bidPayload.bidAmount
    );

    // Add updates.
    const updatePayload2 = {
      orderID: orderID,
      bidder: taker.address,
      addition: ethers.parseEther("1"),
    };
    await usdt
      .connect(taker)
      .approve(await atomicSwap.getAddress(), updatePayload2.addition);

    await expect(
      atomicSwap.connect(taker).updateBid(updatePayload2)
    ).to.changeTokenBalance(
      usdt,
      await atomicSwap.getAddress(),
      updatePayload2.addition
    );
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
    ).to.revertedWithCustomError(atomicSwap, "UnauthorizedTakeAction");

    const bidPayload = {
      bidder: taker.address,
      bidAmount: ethers.parseEther("19"),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    // make bid
    await expect(
      atomicSwap.connect(taker).placeBid(bidPayload, {
        value: bidPayload.bidAmount,
      })
    ).to.changeEtherBalance(
      await atomicSwap.getAddress(),
      bidPayload.bidAmount
    );

    // Add updates.
    const updatePayload2 = {
      orderID: orderID,
      bidder: taker.address,
      addition: ethers.parseEther("2"),
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
      bidAmount: ethers.parseEther("18"),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    await usdt
      .connect(taker)
      .approve(await atomicSwap.getAddress(), bidPayload.bidAmount);

    // make bid
    await expect(
      atomicSwap.connect(taker).placeBid(bidPayload)
    ).to.changeTokenBalance(
      usdt,
      await atomicSwap.getAddress(),
      bidPayload.bidAmount
    );

    // Add updates.
    const bidPayload2 = {
      bidder: taker.address,
      bidAmount: ethers.parseEther("50"),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    await usdt
      .connect(taker)
      .approve(await atomicSwap.getAddress(), bidPayload2.bidAmount);

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
      bidAmount: ethers.parseEther("18"),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    await usdt
      .connect(taker)
      .approve(await atomicSwap.getAddress(), bidPayload.bidAmount);

    // make bid
    await expect(
      atomicSwap.connect(taker).placeBid(bidPayload)
    ).to.changeTokenBalance(
      usdt,
      await atomicSwap.getAddress(),
      bidPayload.bidAmount
    );

    // Add updates.
    const updatePayload2 = {
      orderID: orderID,
      bidder: taker.address,
      addition: ethers.parseEther("6"),
    };
    await usdt
      .connect(taker)
      .approve(await atomicSwap.getAddress(), updatePayload2.addition);

    await expect(
      atomicSwap.connect(taker).updateBid(updatePayload2)
    ).to.revertedWithCustomError(atomicSwap, "MismatchedBidAmount");
  });

  it("should revert to update bid with non existed order", async () => {
    const { atomicSwap, taker, orderID, maker, usdt } =
      await createDefaultAtomicOrder(false, true);
    // try to take swap
    await expect(
      atomicSwap.connect(maker).takeSwap({
        orderID,
        takerReceiver: maker.address,
      })
    ).to.revertedWithCustomError(atomicSwap, "UnauthorizedTakeAction");

    const bidPayload = {
      bidder: taker.address,
      bidAmount: ethers.parseEther("19"),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    // make bid
    await expect(
      atomicSwap.connect(taker).placeBid(bidPayload, {
        value: bidPayload.bidAmount,
      })
    ).to.changeEtherBalance(
      await atomicSwap.getAddress(),
      bidPayload.bidAmount
    );

    // Add updates.
    const updatePayload2 = {
      orderID: randomBytes(32),
      bidder: taker.address,
      addition: ethers.parseEther("2"),
    };

    // make bid
    await expect(
      atomicSwap.connect(taker).updateBid(updatePayload2, {
        value: updatePayload2.addition,
      })
    ).to.revertedWithCustomError(atomicSwap, "OrderDoesNotExist");
  });

  it("should revert to update bid with expired bid", async () => {
    const { atomicSwap, taker, orderID, maker, usdt } =
      await createDefaultAtomicOrder(false, true);
    // try to take swap
    await expect(
      atomicSwap.connect(maker).takeSwap({
        orderID,
        takerReceiver: taker.address,
      })
    ).to.revertedWithCustomError(atomicSwap, "UnauthorizedTakeAction");

    const bidPayload = {
      bidder: taker.address,
      bidAmount: ethers.parseEther("19"),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    // make bid
    await expect(
      atomicSwap.connect(taker).placeBid(bidPayload, {
        value: bidPayload.bidAmount,
      })
    ).to.changeEtherBalance(
      await atomicSwap.getAddress(),
      bidPayload.bidAmount
    );
    const bid = await atomicSwap.bids(orderID, bidPayload.bidder);
    const timeDiffer = bid.expireTimestamp - BigInt(await BlockTime.Now());
    await time.increase(timeDiffer + BigInt(20));
    // Add updates.
    const updatePayload2 = {
      orderID: orderID,
      bidder: taker.address,
      addition: ethers.parseEther("2"),
    };

    // make bid
    await expect(
      atomicSwap.connect(taker).updateBid(updatePayload2, {
        value: updatePayload2.addition,
      })
    ).to.revertedWithCustomError(atomicSwap, "BidAlreadyExpired");
  });
  it("should revert to update bid with zero addition amount", async () => {
    const { atomicSwap, taker, orderID, maker, usdt } =
      await createDefaultAtomicOrder(false, true);
    // try to take swap
    await expect(
      atomicSwap.connect(maker).takeSwap({
        orderID,
        takerReceiver: taker.address,
      })
    ).to.revertedWithCustomError(atomicSwap, "UnauthorizedTakeAction");

    const bidPayload = {
      bidder: taker.address,
      bidAmount: ethers.parseEther("16"),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    // make bid
    await expect(
      atomicSwap.connect(taker).placeBid(bidPayload, {
        value: bidPayload.bidAmount,
      })
    ).to.changeEtherBalance(
      await atomicSwap.getAddress(),
      bidPayload.bidAmount
    );
    // Add updates.
    const updatePayload2 = {
      orderID: orderID,
      bidder: ZeroAddress,
      addition: ethers.parseEther("0"),
    };

    // make bid
    await expect(
      atomicSwap.connect(taker).updateBid(updatePayload2, {
        value: BigInt(0),
      })
    ).to.revertedWithCustomError(atomicSwap, "MismatchedBidAmount");
  });
  it("should revert to update bid with mismatched addition amount", async () => {
    const { atomicSwap, taker, orderID, maker, usdt } =
      await createDefaultAtomicOrder(false, true);
    // try to take swap
    await expect(
      atomicSwap.connect(maker).takeSwap({
        orderID,
        takerReceiver: taker.address,
      })
    ).to.revertedWithCustomError(atomicSwap, "UnauthorizedTakeAction");

    const bidPayload = {
      bidder: taker.address,
      bidAmount: ethers.parseEther("16"),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    // make bid
    await expect(
      atomicSwap.connect(taker).placeBid(bidPayload, {
        value: bidPayload.bidAmount,
      })
    ).to.changeEtherBalance(
      await atomicSwap.getAddress(),
      bidPayload.bidAmount
    );
    // Add updates.
    const updatePayload2 = {
      orderID: orderID,
      bidder: taker.address,
      addition: ethers.parseEther("2"),
    };

    // make bid
    await expect(
      atomicSwap.connect(taker).updateBid(updatePayload2, {
        value: BigInt(1),
      })
    ).to.revertedWithCustomError(atomicSwap, "MismatchedBidAmount");
  });
});
