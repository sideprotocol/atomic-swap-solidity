import { ethers } from "hardhat";
import { createDefaultAtomicOrder } from "../../utils/utils";
import { BlockTime } from "../../utils/time";
import { expect } from "chai";

describe("AtomicSwap: PlaceBid", () => {
  it("should place bid with native token", async () => {
    const { atomicSwap, taker, orderID, usdt } = await createDefaultAtomicOrder(
      false,
      true
    );

    const bidPayload = {
      bidder: taker.address,
      bidAmount: ethers.parseEther("18"),
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
  });
  it("should revert to  bid again", async () => {
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
    const bidPayload2 = {
      bidder: taker.address,
      bidAmount: ethers.parseEther("50"),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    // make bid
    await expect(
      atomicSwap.connect(taker).placeBid(bidPayload2, {
        value: bidPayload2.bidAmount - bidPayload.bidAmount,
      })
    ).to.revertedWithCustomError(atomicSwap, "BidAlreadyPlaced");
  });

  it("should place bid with erc20 token", async () => {
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
      atomicSwap.connect(taker).placeBid(bidPayload, {
        value: bidPayload.bidAmount,
      })
    ).to.changeEtherBalance(
      await atomicSwap.getAddress(),
      bidPayload.bidAmount
    );
  });
  it("should revert to bid again to the same order with erc20 token", async () => {
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
  it("should revert to place bid with not enough native token", async () => {
    const { atomicSwap, taker, orderID } = await createDefaultAtomicOrder(
      true,
      false,
      true
    );

    const bidPayload = {
      bidder: taker.address,
      bidAmount: ethers.parseEther("5"),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    // make bid
    await expect(
      atomicSwap.connect(taker).placeBid(bidPayload)
    ).to.revertedWithCustomError(atomicSwap, "MismatchedBidAmount");
  });
  it("should revert to place bid with not allowed amount erc20 token", async () => {
    const { atomicSwap, taker, orderID, usdt } = await createDefaultAtomicOrder(
      false,
      false,
      true
    );
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
    ).to.revertedWithCustomError(atomicSwap, "NotAllowedTransferAmount");
  });
  it("should revert to place bid with not enough erc20 token", async () => {
    const { atomicSwap, taker, orderID, usdt } = await createDefaultAtomicOrder(
      false,
      false,
      true
    );
    // try to take swap
    const minBidCap = (await atomicSwap.swapOrder(orderID)).minBidAmount;
    const bidPayload = {
      bidder: taker.address,
      bidAmount: minBidCap - BigInt(10),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    // make bid
    await usdt.connect(taker).approve(await atomicSwap.getAddress(), minBidCap);
    await expect(
      atomicSwap.connect(taker).placeBid(bidPayload)
    ).to.revertedWithCustomError(atomicSwap, "MismatchedBidAmount");
  });
});
