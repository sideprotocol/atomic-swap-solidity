import { time } from "@nomicfoundation/hardhat-network-helpers";
import {
  bidToDefaultAtomicOrder,
  bidToDefaultVestingAtomicOrder,
  calcSwapAmount,
} from "../../utils/utils";
import { expect } from "chai";
import { ethers } from "hardhat";
describe("AtomicSwap: AcceptBid with Vesting", () => {
  const acceptBid = async (isNativeSellToken: boolean) => {
    const {
      atomicSwap,
      maker,
      orderID,
      bidAmount,
      bidder,
      payload,
      usdc,
      usdt,
      sellTokenFeeRate,
      buyTokenFeeRate,
      vestingManager,
      treasury,
    } = await bidToDefaultVestingAtomicOrder(isNativeSellToken, false);

    const sellTokenAmount = calcSwapAmount(
      payload.sellToken.amount,
      buyTokenFeeRate
    );

    const buyTokenAmount = calcSwapAmount(bidAmount, sellTokenFeeRate);

    const tx = atomicSwap.connect(maker).acceptBid({ orderID, bidder });

    await expect(tx).to.changeTokenBalance(
      usdt,
      maker.address,
      buyTokenAmount.amountAfterFee
    );

    const order = await atomicSwap.swapOrder(orderID);
    // Release from vesting contract
    // After cliff time, it's possible to get started releasing
    await time.increase(3600 * 1);
    const totalReleaseAmount = calcSwapAmount(
      order.sellToken.amount,
      buyTokenFeeRate
    );

    const releaseAmount = totalReleaseAmount.amountAfterFee / BigInt(2);
    if (order.sellToken.token == ethers.ZeroAddress) {
      expect(
        await vestingManager.release(bidder, orderID)
      ).to.changeEtherBalance(bidder, releaseAmount);
    } else {
      expect(
        await vestingManager.release(bidder, orderID)
      ).to.changeTokenBalance(usdc, bidder, releaseAmount);
    }
    // after 1 hours, release again
    await time.increase(3600 * 1);
    if (order.sellToken.token == ethers.ZeroAddress) {
      expect(
        await vestingManager.release(bidder, orderID)
      ).to.changeEtherBalance(bidder, releaseAmount);
    } else {
      expect(
        await vestingManager.release(bidder, orderID)
      ).to.changeTokenBalance(usdc, bidder, releaseAmount);
    }
  };
  it("should accept bid(native token) with vesting plan", async () =>
    acceptBid(true));

  it("should accept bid with erc20 token", async () => acceptBid(false));
});
