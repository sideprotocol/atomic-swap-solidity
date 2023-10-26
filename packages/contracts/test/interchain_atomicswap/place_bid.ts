import { ethers } from "hardhat";
import {
  createDefaultAtomicOrder,
  createDefaultITCAtomicOrder,
  encodePayload,
  newAtomicSwapOrderID,
  safeFactor,
} from "../../utils/utils";
import { BlockTime } from "../../utils/time";
import { expect } from "chai";
describe("ITCAtomicSwap: PlaceBid", () => {
  it("should place bid with native token", async () => {
    const {
      atomicSwapA,
      atomicSwapB,
      taker,
      takerReceiver,
      orderID,
      chainID,
      usdc,
      usdt,
      bridgeA,
      bridgeB,
    } = await createDefaultITCAtomicOrder(true);
    // try to take swap

    const payloadBytes = encodePayload(
      ["bytes32", "address", "address"],
      [orderID, taker.address, taker.address]
    );

    const estimateFee = await bridgeA.estimateFee(
      chainID,
      false,
      "0x",
      payloadBytes
    );

    const buyToken = (await atomicSwapA.swapOrder(orderID)).buyToken;
    let nativeTokenAmount = safeFactor(estimateFee.nativeFee, 1.1);
    nativeTokenAmount = nativeTokenAmount + buyToken.amount;

    await expect(
      atomicSwapB.connect(taker).takeSwap(
        {
          orderID,
          takerReceiver: takerReceiver.address,
        },
        {
          value: nativeTokenAmount,
        }
      )
    ).to.revertedWithCustomError(atomicSwapB, "OrderNotAllowTake");

    const bidPayload = {
      bidder: taker.address,
      bidAmount: buyToken.amount,
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

    const estimateBidFee = await bridgeA.estimateFee(
      chainID,
      false,
      "0x",
      bidPayloadBytes
    );

    const txAmount =
      safeFactor(estimateBidFee.nativeFee, 1.1) + buyToken.amount;

    // make bid
    await expect(
      atomicSwapB.connect(taker).placeBid(bidPayload, {
        value: txAmount,
      })
    ).to.changeEtherBalance(await atomicSwapB.getAddress(), buyToken.amount);

    const bidAtA = await atomicSwapA.bids(orderID, taker.address);
    const bidAtB = await atomicSwapB.bids(orderID, taker.address);
    expect(bidAtA).to.deep.equal(bidAtB);
  });
  it("should place bid with erc20 token", async () => {
    const {
      atomicSwapA,
      atomicSwapB,
      taker,
      orderID,
      chainID,
      usdt,
      bridgeA,
      takerReceiver,
    } = await createDefaultITCAtomicOrder(false, true);

    // try to take swap
    const payloadBytes = encodePayload(
      ["bytes32", "address", "address"],
      [orderID, taker.address, taker.address]
    );

    const estimateFee = await bridgeA.estimateFee(
      chainID,
      false,
      "0x",
      payloadBytes
    );

    const buyToken = (await atomicSwapA.swapOrder(orderID)).buyToken;
    let nativeTokenAmount = safeFactor(estimateFee.nativeFee, 1.1);

    await usdt
      .connect(taker)
      .approve(atomicSwapB.getAddress(), buyToken.amount);

    await expect(
      atomicSwapB.connect(taker).takeSwap(
        {
          orderID,
          takerReceiver: takerReceiver.address,
        },
        {
          value: nativeTokenAmount,
        }
      )
    ).to.revertedWithCustomError(atomicSwapB, "OrderNotAllowTake");

    const bidPayload = {
      bidder: taker.address,
      bidAmount: buyToken.amount,
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
    const estimateBidFee = await bridgeA.estimateFee(
      chainID,
      false,
      "0x",
      bidPayloadBytes
    );

    const txAmount =
      safeFactor(estimateBidFee.nativeFee, 1.1) + buyToken.amount;
    // make bid
    await expect(
      atomicSwapB.connect(taker).placeBid(bidPayload, {
        value: txAmount,
      })
    ).to.changeTokenBalance(
      usdt,
      await atomicSwapB.getAddress(),
      buyToken.amount
    );

    const bidAtA = await atomicSwapA.bids(orderID, taker.address);
    const bidAtB = await atomicSwapB.bids(orderID, taker.address);
    expect(bidAtA).to.deep.equal(bidAtB);
  });

  it("should revert to place bid with not enough native token", async () => {
    const {
      atomicSwapA,
      atomicSwapB,
      taker,
      takerReceiver,
      orderID,
      chainID,
      bridgeA,
      bridgeB,
    } = await createDefaultITCAtomicOrder(true, true);
    // try to take swap

    const payloadBytes = encodePayload(
      ["bytes32", "address", "address"],
      [orderID, taker.address, taker.address]
    );

    const estimateFee = await bridgeA.estimateFee(
      chainID,
      false,
      "0x",
      payloadBytes
    );

    let nativeTokenAmount = safeFactor(estimateFee.nativeFee, 1.1);
    await expect(
      atomicSwapB.connect(taker).takeSwap(
        {
          orderID,
          takerReceiver: takerReceiver.address,
        },
        {
          value: nativeTokenAmount,
        }
      )
    ).to.revertedWithCustomError(atomicSwapB, "OrderNotAllowTake");

    const bidPayload = {
      bidder: taker.address,
      bidAmount: ethers.parseEther("10"),
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
    const estimateBidFee = await bridgeB.estimateFee(
      chainID,
      false,
      "0x",
      bidPayloadBytes
    );

    // make bid
    await expect(
      atomicSwapB.connect(taker).placeBid(bidPayload, {
        value: estimateBidFee.nativeFee,
      })
    ).to.revertedWithCustomError(atomicSwapB, "MismatchedBidAmount");
  });
  it("should revert to place bid with not allowed amount erc20 token", async () => {
    const {
      atomicSwapA,
      atomicSwapB,
      taker,
      orderID,
      chainID,
      bridgeA,
      bridgeB,
      usdt,
    } = await createDefaultITCAtomicOrder(false, true);
    // try to take swap
    const buyToken = (await atomicSwapA.swapOrder(orderID)).buyToken;
    const bidPayload = {
      bidder: taker.address,
      bidAmount: buyToken.amount,
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
    const estimateBidFee = await bridgeB.estimateFee(
      chainID,
      false,
      "0x",
      bidPayloadBytes
    );
    // make bid

    await expect(
      atomicSwapB.connect(taker).placeBid(bidPayload, {
        value: estimateBidFee.nativeFee,
      })
    ).to.revertedWithCustomError(atomicSwapB, "NotAllowedTransferAmount");
  });
  it("should revert to place bid with not enough erc20 token", async () => {
    const { atomicSwapA, atomicSwapB, taker, orderID, chainID, bridgeB, usdt } =
      await createDefaultITCAtomicOrder(false, true);
    // try to take swap
    const buyToken = (await atomicSwapA.swapOrder(orderID)).buyToken;
    const bidPayload = {
      bidder: taker.address,
      bidAmount: buyToken.amount - BigInt(20),
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
    const estimateBidFee = await bridgeB.estimateFee(
      chainID,
      false,
      "0x",
      bidPayloadBytes
    );
    // make bid
    await usdt
      .connect(taker)
      .approve(await atomicSwapA.getAddress(), buyToken.amount);
    await expect(
      atomicSwapB.connect(taker).placeBid(bidPayload, {
        value: estimateBidFee.nativeFee,
      })
    ).to.revertedWithCustomError(atomicSwapB, "NotAllowedTransferAmount");
  });
});
