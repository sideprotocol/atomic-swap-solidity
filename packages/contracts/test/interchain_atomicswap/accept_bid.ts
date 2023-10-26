import { ethers } from "hardhat";
import {
  bidToDefaultITCAtomicOrder,
  calcSwapAmount,
  encodePayload,
  safeFactor,
} from "../../utils/utils";
import { expect } from "chai";

describe("ITCAtomicSwap: AcceptBid", () => {
  it("should accept bid with native token", async () => {
    const {
      atomicSwapA,
      bridgeA,
      maker,
      makerReceiver,
      takerReceiver,
      chainID,
      orderID,
      bidAmount,
      bidder,
      bidderReceiver,
      payload,
      sellTokenFeeRate,
      buyTokenFeeRate,
      treasury,
      usdt,
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

    const { amountAfterFee: amountAfterFeeAtA, feeAmount: feeAmountAtA } =
      calcSwapAmount(payload.sellToken.amount, buyTokenFeeRate);

    const { amountAfterFee: afterAfterFeeAtB, feeAmount: feeAmountAtB } =
      calcSwapAmount(payload.sellToken.amount, sellTokenFeeRate);

    const tx = atomicSwapA.connect(maker).acceptBid(
      { orderID, bidder },
      {
        value: safeFactor(fee.nativeFee, 1.1),
      }
    );
    await expect(tx).to.changeEtherBalances(
      [takerReceiver.address, makerReceiver.address, treasury],
      [amountAfterFeeAtA, afterAfterFeeAtB, feeAmountAtA + feeAmountAtB]
    );

    // await expect(
    //   atomicSwapA.connect(maker).acceptBid(
    //     { orderID, bidder },
    //     {
    //       value: safeFactor(fee.nativeFee, 1.1),
    //     }
    //   )
    // ).to.be.changeEtherBalance(makerReceiver.address, bidAmount);

    // // check balance after accept bid
    // const balanceAfterAcceptOfBidder = await ethers.provider.getBalance(
    //   bidderReceiver
    // );
    // expect(balanceAfterAcceptOfBidder - balanceBeforeAcceptOfBidder).to.equal(
    //   payload.sellToken.amount
    // );

    // const balanceAfterAcceptOfMaker = await ethers.provider.getBalance(
    //   makerReceiver.address
    // );
    // expect(balanceAfterAcceptOfMaker - balanceBeforeAcceptOfMaker).to.equal(
    //   bidAmount
    // );
  });
  it("should accept bid with erc20 token", async () => {
    const {
      atomicSwapA,
      bridgeA,
      chainID,
      maker,
      makerReceiver,
      takerReceiver,
      orderID,
      usdc,
      usdt,
      bidAmount,
      bidder,
      bidderReceiver,
      payload,
      buyTokenFeeRate,
      sellTokenFeeRate,
      treasury,
    } = await bidToDefaultITCAtomicOrder(false, true);

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

    const { amountAfterFee: usdtAmountAfterFee, feeAmount: usdtFeeAmount } =
      calcSwapAmount(bidAmount, sellTokenFeeRate);

    const { amountAfterFee: usdcAmountAfterFee, feeAmount: usdcFeeAmount } =
      calcSwapAmount(payload.sellToken.amount, buyTokenFeeRate);

    const tx = atomicSwapA.connect(maker).acceptBid(
      { orderID, bidder },
      {
        value: safeFactor(fee.nativeFee, 1.1),
      }
    );
    await expect(tx).to.be.changeTokenBalances(
      usdt,
      [makerReceiver.address, treasury],
      [usdtAmountAfterFee, usdtFeeAmount]
    );

    await expect(tx).to.be.changeTokenBalances(
      usdc,
      [bidderReceiver, treasury],
      [usdcAmountAfterFee, usdcFeeAmount]
    );
  });
});
