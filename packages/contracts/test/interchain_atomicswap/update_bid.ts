import { ethers } from "hardhat";
import {
  createDefaultITCAtomicOrder,
  encodePayload,
  safeFactor,
} from "../../utils/utils";
import { BlockTime } from "../../utils/time";
import { expect } from "chai";

describe("ITCAtomicSwap: UpdateBid", () => {
  it("should update bid with native token", async () => {
    const { atomicSwapB, taker, orderID, maker, usdt, bridgeB, chainID } =
      await createDefaultITCAtomicOrder(true, true);
    // try to take swap
    await expect(
      atomicSwapB.connect(maker).takeSwap({
        orderID,
        takerReceiver: maker.address,
      })
    ).to.revertedWithCustomError(atomicSwapB, "OrderNotAllowTake");

    const bidPayload = {
      bidder: taker.address,
      bidAmount: ethers.parseEther("19"),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    const bidPayloadBytes = encodePayload(
      ["address", "uint256", "bytes32", "address", "uint256"],
      [
        taker.address,
        bidPayload.bidAmount,
        bidPayload.orderID,
        bidPayload.bidderReceiver,
        bidPayload.expireTimestamp,
      ]
    );

    const fee = await bridgeB.estimateFee(
      chainID,
      false,
      "0x",
      bidPayloadBytes
    );

    // make bid
    await expect(
      atomicSwapB.connect(taker).placeBid(bidPayload, {
        value: safeFactor(fee.nativeFee, 1.1) + bidPayload.bidAmount,
      })
    ).to.changeEtherBalance(
      await atomicSwapB.getAddress(),
      bidPayload.bidAmount
    );

    // Add updates.
    const updatePayload2 = {
      orderID: orderID,
      bidder: taker.address,
      addition: ethers.parseEther("0.5"),
    };

    const updatePayload2Bytes = encodePayload(
      ["bytes32", "address", "uint"],
      [orderID, taker.address, updatePayload2.addition]
    );

    const updateBidFee = await bridgeB.estimateFee(
      chainID,
      false,
      "0x",
      updatePayload2Bytes
    );
    await expect(
      atomicSwapB.connect(taker).updateBid(updatePayload2, {
        value:
          updatePayload2.addition + safeFactor(updateBidFee.nativeFee, 1.1),
      })
    ).to.changeEtherBalance(
      await atomicSwapB.getAddress(),
      updatePayload2.addition
    );
  });

  it("should update bid with erc20 token", async () => {
    const { atomicSwapB, taker, orderID, usdt, bridgeB, chainID } =
      await createDefaultITCAtomicOrder(false);

    const bidPayload = {
      bidder: taker.address,
      bidAmount: ethers.parseEther("18"),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    await usdt
      .connect(taker)
      .approve(await atomicSwapB.getAddress(), bidPayload.bidAmount);

    const bidPayloadBytes = encodePayload(
      ["address", "uint256", "bytes32", "address", "uint256"],
      [
        taker.address,
        bidPayload.bidAmount,
        bidPayload.orderID,
        bidPayload.bidderReceiver,
        bidPayload.expireTimestamp,
      ]
    );

    const fee = await bridgeB.estimateFee(
      chainID,
      false,
      "0x",
      bidPayloadBytes
    );

    // make bid
    await expect(
      atomicSwapB
        .connect(taker)
        .placeBid(bidPayload, { value: safeFactor(fee.nativeFee, 1.1) })
    ).to.changeTokenBalance(
      usdt,
      await atomicSwapB.getAddress(),
      bidPayload.bidAmount
    );

    // Add updates.
    const updatePayload2 = {
      orderID: orderID,
      bidder: taker.address,
      addition: ethers.parseEther("1"),
    };

    const bidPayload2Bytes = encodePayload(
      ["bytes32", "address", "uint256"],
      [orderID, taker.address, ethers.parseEther("1")]
    );

    const bidPayload2BytesFee = await bridgeB.estimateFee(
      chainID,
      false,
      "0x",
      bidPayload2Bytes
    );

    await usdt
      .connect(taker)
      .approve(await atomicSwapB.getAddress(), updatePayload2.addition);

    await expect(
      atomicSwapB.connect(taker).updateBid(updatePayload2, {
        value: safeFactor(bidPayload2BytesFee.nativeFee, 1.1),
      })
    ).to.changeTokenBalance(
      usdt,
      await atomicSwapB.getAddress(),
      updatePayload2.addition
    );
  });

  it("should revert to place bid with native token with over amount", async () => {
    const { atomicSwapB, taker, orderID, chainID, maker, usdt, bridgeB } =
      await createDefaultITCAtomicOrder(true, true);
    // try to take swap
    await expect(
      atomicSwapB.connect(maker).takeSwap({
        orderID,
        takerReceiver: maker.address,
      })
    ).to.revertedWithCustomError(atomicSwapB, "OrderNotAllowTake");

    const bidPayload = {
      bidder: taker.address,
      bidAmount: ethers.parseEther("19"),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    const bidPayloadBytes = encodePayload(
      ["address", "uint256", "bytes32", "address", "uint256"],
      [
        taker.address,
        bidPayload.bidAmount,
        bidPayload.orderID,
        bidPayload.bidderReceiver,
        bidPayload.expireTimestamp,
      ]
    );

    const fee = await bridgeB.estimateFee(
      chainID,
      false,
      "0x",
      bidPayloadBytes
    );

    // make bid
    await expect(
      atomicSwapB.connect(taker).placeBid(bidPayload, {
        value: safeFactor(fee.nativeFee, 1.1) + bidPayload.bidAmount,
      })
    ).not.to.reverted;

    // Add updates.
    const updatePayload2 = {
      orderID: orderID,
      bidder: taker.address,
      addition: ethers.parseEther("2"),
    };
    const updatePayload2Bytes = encodePayload(
      ["bytes32", "address", "uint256"],
      [bidPayload.orderID, bidPayload.bidderReceiver, bidPayload.bidAmount]
    );

    const estimatedFee = await bridgeB.estimateFee(
      chainID,
      false,
      "0x",
      updatePayload2Bytes
    );

    // make bid
    await expect(
      atomicSwapB.connect(taker).updateBid(updatePayload2, {
        value:
          safeFactor(estimatedFee.nativeFee, 1.1) + updatePayload2.addition,
      })
    ).to.revertedWithCustomError(atomicSwapB, "MismatchedBidAmount");
  });

  it("should revert to update bid with erc20 token", async () => {
    const { atomicSwapB, taker, orderID, chainID, usdt, bridgeB } =
      await createDefaultITCAtomicOrder(false);

    const bidPayload = {
      bidder: taker.address,
      bidAmount: ethers.parseEther("18"),
      orderID: orderID,
      bidderReceiver: taker.address,
      expireTimestamp: await BlockTime.AfterSeconds(30),
    };

    const bidPayloadBytes = encodePayload(
      ["address", "uint256", "bytes32", "address", "uint256"],
      [
        taker.address,
        bidPayload.bidAmount,
        bidPayload.orderID,
        bidPayload.bidderReceiver,
        bidPayload.expireTimestamp,
      ]
    );

    const fee = await bridgeB.estimateFee(
      chainID,
      false,
      "0x",
      bidPayloadBytes
    );

    await usdt
      .connect(taker)
      .approve(await atomicSwapB.getAddress(), bidPayload.bidAmount);

    // make bid
    await expect(
      atomicSwapB.connect(taker).placeBid(bidPayload, {
        value: safeFactor(fee.nativeFee, 1.1),
      })
    ).to.changeTokenBalance(
      usdt,
      await atomicSwapB.getAddress(),
      bidPayload.bidAmount
    );

    // Add updates.
    const updatePayload2 = {
      orderID: orderID,
      bidder: taker.address,
      addition: ethers.parseEther("6"),
    };

    const bidPayload2Bytes = encodePayload(
      ["bytes32", "address", "uint256"],
      [updatePayload2.orderID, updatePayload2.bidder, updatePayload2.addition]
    );

    const estimatedFee = await bridgeB.estimateFee(
      chainID,
      false,
      "0x",
      bidPayload2Bytes
    );

    await usdt
      .connect(taker)
      .approve(await atomicSwapB.getAddress(), updatePayload2.addition);

    await expect(
      atomicSwapB.connect(taker).updateBid(updatePayload2, {
        value: safeFactor(estimatedFee.nativeFee, 1.1),
      })
    ).to.revertedWithCustomError(atomicSwapB, "MismatchedBidAmount");
  });
});
