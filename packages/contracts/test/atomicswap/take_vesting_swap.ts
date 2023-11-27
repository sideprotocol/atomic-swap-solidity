import { ethers } from "hardhat";
import {
  calcSwapAmount,
  createDefaultVestingAtomicOrder,
  testVestingTakeSwap,
} from "../../utils/utils";
import { expect } from "chai";

describe("TakeSwap With Vesting", () => {
  beforeEach(async () => {});

  it("should take order with native token", async () =>
    testVestingTakeSwap(true, false));
  it("should take order with erc20 token", async () =>
    testVestingTakeSwap(false, true));

  it("should revert to release from vesting with no release tokens", async () => {
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
      true,
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
    //await time.increase(3600 * 1);
    const totalReleaseAmount = calcSwapAmount(
      order.sellToken.amount,
      buyTokenFeeRate
    );

    if (order.sellToken.token == ethers.ZeroAddress) {
      await expect(
        vestingManager.release(takerReceiver, orderID)
      ).to.revertedWithCustomError(vestingManager, "NoVestedTokensForRelease");
    } else {
      await expect(
        vestingManager.release(takerReceiver, orderID)
      ).to.revertedWithCustomError(vestingManager, "NoVestedTokensForRelease");
    }
  });

  it("should revert to release from vesting with no release tokens", async () => {
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
      true,
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
    //await time.increase(3600 * 1);
    const totalReleaseAmount = calcSwapAmount(
      order.sellToken.amount,
      buyTokenFeeRate
    );

    if (order.sellToken.token == ethers.ZeroAddress) {
      await expect(
        vestingManager.release(takerReceiver, orderID)
      ).to.revertedWithCustomError(vestingManager, "NoVestedTokensForRelease");
    } else {
      await expect(
        vestingManager.release(takerReceiver, orderID)
      ).to.revertedWithCustomError(vestingManager, "NoVestedTokensForRelease");
    }
  });

  it("should revert to release from vesting with completed releases", async () => {
    const { orderID, atomicSwap, vestingManager, taker } =
      await testVestingTakeSwap(true, false);
    const order = await atomicSwap.swapOrder(orderID);
    // Release from vesting contract

    if (order.sellToken.token == ethers.ZeroAddress) {
      await expect(
        vestingManager.release(taker.address, orderID)
      ).to.revertedWithCustomError(vestingManager, "InvalidVesting");
    } else {
      await expect(
        vestingManager.release(taker.address, orderID)
      ).to.revertedWithCustomError(vestingManager, "InvalidVesting");
    }
  });

  it("should revert to take order with not enough native token of taker.", async () => {
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
      false,
      true,
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

    const tx = atomicSwap.connect(taker).takeSwap({
      orderID,
      takerReceiver: takerReceiver.address,
    });
    await expect(tx).to.revertedWithCustomError(atomicSwap, "NotEnoughFund");
  });
});
