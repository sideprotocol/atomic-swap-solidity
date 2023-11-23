import { ethers } from "hardhat";
import {
  calcSwapAmount,
  createDefaultVestingAtomicOrder,
} from "../../utils/utils";
import { expect } from "chai";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("TakeSwap With Vesting", () => {
  beforeEach(async () => {});
  const testTakeSwap = async (withNativeToken?: boolean) => {
    const [, , takerReceiver] = await ethers.getSigners();
    const vestingParams = [
      {
        durationInHours: BigInt(1),
        percentage: BigInt(5000),
      },
      {
        durationInHours: BigInt(1),
        percentage: BigInt(5000),
      },
    ];
    const {
      orderID,
      atomicSwap,
      taker,
      usdc,
      usdt,
      treasury,
      sellTokenFeeRate,
      buyTokenFeeRate,
      vestingManager,
    } = await createDefaultVestingAtomicOrder(
      vestingParams,
      withNativeToken,
      false,
      false,
      false
    );

    const order = await atomicSwap.swapOrder(orderID);
    const buyToken = (await atomicSwap.swapOrder(orderID)).buyToken;
    const atomicSwapAddress = await atomicSwap.getAddress();
    await expect(
      usdt.connect(taker).approve(atomicSwapAddress, buyToken.amount)
    ).not.to.reverted;

    // Run takeSwap message
    if (order.sellToken.token == ethers.ZeroAddress) {
      const tx = atomicSwap.connect(taker).takeSwap({
        orderID,
        takerReceiver: takerReceiver.address,
      });

      await expect(tx).not.to.reverted;
    } else {
      const tx = atomicSwap.connect(taker).takeSwap({
        orderID,
        takerReceiver: takerReceiver.address,
      });
      await expect(tx).not.to.reverted;
    }

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
        await vestingManager.release(takerReceiver, orderID)
      ).to.changeEtherBalance(takerReceiver, releaseAmount);
    } else {
      expect(
        await vestingManager.release(takerReceiver, orderID)
      ).to.changeTokenBalance(usdc, takerReceiver, releaseAmount);
    }
    // after 1 hours, release again
    await time.increase(3600);
    if (order.sellToken.token == ethers.ZeroAddress) {
      expect(
        await vestingManager.release(takerReceiver, orderID)
      ).to.changeEtherBalance(takerReceiver, releaseAmount);
    } else {
      expect(
        await vestingManager.release(takerReceiver, orderID)
      ).to.changeTokenBalance(usdc, takerReceiver, releaseAmount);
    }
    expect((await atomicSwap.swapOrder(orderID)).status).to.equal(2);
    return {
      orderID,
      atomicSwap,
      taker,
    };
  };

  it("should take order with native token", async () => testTakeSwap(true));
  it("should take order with erc20 token", async () => testTakeSwap());
});
