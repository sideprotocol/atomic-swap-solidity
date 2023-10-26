import { ethers } from "hardhat";
import {
  bidToDefaultITCAtomicOrder,
  encodePayload,
  safeFactor,
} from "../../utils/utils";
import { expect } from "chai";

describe("InterchainAtomicSwap: CancelBid", () => {
  it("should cancel bid with native token", async () => {
    const {
      atomicSwapB,
      taker,
      orderID,
      chainID,
      bidAmount,
      bidder,
      payload,
      usdt,
      bridgeB,
    } = await bidToDefaultITCAtomicOrder(true, true);
    const cancelBidPayloadBytes = encodePayload(["bytes32"], [orderID]);
    const fee = await bridgeB.estimateFee(
      chainID,
      false,
      "0x",
      cancelBidPayloadBytes
    );
    const etherBalanceBeforeTx = await ethers.provider.getBalance(
      taker.address
    );
    await expect(
      atomicSwapB
        .connect(taker)
        .cancelBid(orderID, { value: safeFactor(fee.nativeFee, 1.1) })
    ).not.to.reverted;
    const etherBalanceAfterTx = await ethers.provider.getBalance(taker.address);
    expect(etherBalanceAfterTx - etherBalanceBeforeTx).gte(BigInt(0));
  });

  it("should cancel bid with erc20 token", async () => {
    const {
      atomicSwapB,
      taker,
      orderID,
      bidAmount,
      bridgeB,
      bidder,
      chainID,
      payload,
      usdt,
    } = await bidToDefaultITCAtomicOrder(false, false);
    const cancelBidPayloadBytes = encodePayload(["bytes32"], [orderID]);
    const fee = await bridgeB.estimateFee(
      chainID,
      false,
      "0x",
      cancelBidPayloadBytes
    );
    await expect(
      atomicSwapB
        .connect(taker)
        .cancelBid(orderID, { value: safeFactor(fee.nativeFee, 1.1) })
    ).to.changeTokenBalance(usdt, bidder, bidAmount);
  });

  it("should revert to cancel bid by not bidder", async () => {
    const { atomicSwapB, maker, orderID } = await bidToDefaultITCAtomicOrder(
      false,
      true
    );
    await expect(
      atomicSwapB.connect(maker).cancelBid(orderID)
    ).to.revertedWithCustomError(atomicSwapB, "BidDoesNotExist");
  });

  it("should revert to cancel bid with already took bid", async () => {
    const {
      atomicSwapB,
      atomicSwapA,
      bridgeA,
      chainID,
      maker,
      taker,
      orderID,
      bidder,
    } = await bidToDefaultITCAtomicOrder(true, true);
    const acceptPayloadBytes = encodePayload(
      ["bytes32", "address"],
      [orderID, bidder]
    );
    const fee = await bridgeA.estimateFee(
      chainID,
      false,
      "0x",
      acceptPayloadBytes
    );
    await expect(
      atomicSwapA
        .connect(maker)
        .acceptBid(
          { orderID, bidder },
          { value: safeFactor(fee.nativeFee, 1.1) }
        )
    ).not.to.reverted;

    await expect(
      atomicSwapB.connect(taker).cancelBid(orderID)
    ).to.revertedWithCustomError(atomicSwapB, "BidNotInPlacedStatus");
  });
});
