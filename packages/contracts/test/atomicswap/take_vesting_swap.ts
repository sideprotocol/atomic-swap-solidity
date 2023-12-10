import { ethers } from "hardhat";
import {
  calcSwapAmount,
  createDefaultVestingAtomicOrder,
  testVestingTakeSwap,
} from "../../utils/utils";
import { expect } from "chai";
import { keccak256 } from "ethers";
import { time } from "@nomicfoundation/hardhat-network-helpers";

describe("TakeSwap With Vesting", () => {
  beforeEach(async () => {});

  it("should take order(native token) with vesting plan", async () =>
    testVestingTakeSwap(true, false));
  it("should take order(erc20 token) with vesting plan", async () =>
    testVestingTakeSwap(false, true));

  it("should take order(native token) with vesting plan after transfer", async () => {
    // const { takerReceiver, vestingManager, orderID } =
    //   await testVestingTakeSwap(true, false);
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
      false,
    );

    const order = await atomicSwap.swapOrder(orderID);
    const buyToken = (await atomicSwap.swapOrder(orderID)).buyToken;
    const atomicSwapAddress = await atomicSwap.getAddress();
    await expect(
      usdt.connect(taker).approve(atomicSwapAddress, buyToken.amount),
    ).not.to.reverted;

    // Run takeSwap message
    if (order.buyToken.token == ethers.ZeroAddress) {
      const tx = atomicSwap.connect(taker).takeSwap(
        {
          orderID,
          takerReceiver: takerReceiver.address,
        },
        { value: order.buyToken.amount },
      );
      expect(await tx).not.to.reverted;
    } else {
      const tx = atomicSwap.connect(taker).takeSwap({
        orderID,
        takerReceiver: takerReceiver.address,
      });
      await expect(tx).not.to.reverted;
    }
    const vestingId = await vestingManager.vestingIds(orderID);
    const [, , , , vestingBuyer] = await ethers.getSigners();
    await vestingManager
      .connect(takerReceiver)
      .approve(vestingBuyer.address, vestingId);
    await vestingManager
      .connect(takerReceiver)
      .transferFrom(takerReceiver.address, vestingBuyer.address, vestingId);
    expect(await vestingManager.balanceOf(vestingBuyer.address)).to.equal(
      BigInt(1),
    );

    // Release from vesting contract
    // After cliff time, it's possible to get started releasing
    await time.increase(3600 * 1);
    const totalReleaseAmount = calcSwapAmount(
      order.sellToken.amount,
      buyTokenFeeRate,
    );

    const releaseAmount = totalReleaseAmount.amountAfterFee / BigInt(2);
    if (order.sellToken.token == ethers.ZeroAddress) {
      expect(
        await vestingManager.connect(vestingBuyer).release(vestingId),
      ).to.changeEtherBalance(vestingBuyer, releaseAmount);
    } else {
      expect(
        await vestingManager.connect(vestingBuyer).release(vestingId),
      ).to.changeTokenBalance(usdc, vestingBuyer, releaseAmount);
    }
    // after 1 hours, release again
    await time.increase(3600 * 1);
    if (order.sellToken.token == ethers.ZeroAddress) {
      expect(
        await vestingManager.connect(vestingBuyer).release(vestingId),
      ).to.changeEtherBalance(vestingBuyer, releaseAmount);
    } else {
      expect(
        await vestingManager.connect(vestingBuyer).release(vestingId),
      ).to.changeTokenBalance(usdc, vestingBuyer, releaseAmount);
    }

    // // after 1 hours, release again
    await time.increase(3600 * 1);
    if (order.sellToken.token == ethers.ZeroAddress) {
      await expect(
        vestingManager.connect(vestingBuyer).release(vestingId),
      ).to.revertedWithCustomError(vestingManager, "ERC721NonexistentToken");
    } else {
      await expect(
        vestingManager.connect(vestingBuyer).release(vestingId),
      ).to.revertedWithCustomError(vestingManager, "ERC721NonexistentToken");
    }
    expect((await atomicSwap.swapOrder(orderID)).status).to.equal(2);
  });

  it("should revert to take order(native token) with vesting plan without vestingID", async () => {
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
    const { orderID, atomicSwap, taker, usdt, vestingManager } =
      await createDefaultVestingAtomicOrder(
        vestingParams,
        true,
        false,
        false,
        false,
      );

    const order = await atomicSwap.swapOrder(orderID);
    const buyToken = (await atomicSwap.swapOrder(orderID)).buyToken;
    const atomicSwapAddress = await atomicSwap.getAddress();
    await expect(
      usdt.connect(taker).approve(atomicSwapAddress, buyToken.amount),
    ).not.to.reverted;

    // Run takeSwap message
    if (order.buyToken.token == ethers.ZeroAddress) {
      const tx = atomicSwap.connect(taker).takeSwap(
        {
          orderID,
          takerReceiver: takerReceiver.address,
        },
        { value: order.buyToken.amount },
      );
      expect(await tx).not.to.reverted;
    } else {
      const tx = atomicSwap.connect(taker).takeSwap({
        orderID,
        takerReceiver: takerReceiver.address,
      });
      await expect(tx).not.to.reverted;
    }
    const vestingId = await vestingManager.vestingIds(orderID);
    const [, , , , vestingBuyer] = await ethers.getSigners();
    await vestingManager
      .connect(takerReceiver)
      .approve(vestingBuyer.address, vestingId);
    await vestingManager
      .connect(takerReceiver)
      .transferFrom(takerReceiver.address, vestingBuyer.address, vestingId);
    expect(await vestingManager.balanceOf(vestingBuyer.address)).to.equal(
      BigInt(1),
    );

    // Release from vesting contract
    // After cliff time, it's possible to get started releasing
    await time.increase(3600 * 1);
    if (order.sellToken.token == ethers.ZeroAddress) {
      await expect(
        vestingManager.connect(takerReceiver).release(vestingId),
      ).to.revertedWithCustomError(vestingManager, "NoPermissionToRelease");
    } else {
      await expect(
        vestingManager.connect(takerReceiver).release(vestingId),
      ).to.revertedWithCustomError(vestingManager, "NoPermissionToRelease");
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
      false,
    );

    const order = await atomicSwap.swapOrder(orderID);
    const buyToken = (await atomicSwap.swapOrder(orderID)).buyToken;
    const atomicSwapAddress = await atomicSwap.getAddress();
    await expect(
      usdt.connect(taker).approve(atomicSwapAddress, buyToken.amount),
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
      buyTokenFeeRate,
    );
    const vestingId = await vestingManager.vestingIds(orderID);
    if (order.sellToken.token == ethers.ZeroAddress) {
      await expect(
        vestingManager.connect(takerReceiver).release(vestingId),
      ).to.revertedWithCustomError(vestingManager, "NoVestedTokensForRelease");
    } else {
      await expect(
        vestingManager.connect(takerReceiver).release(vestingId),
      ).to.revertedWithCustomError(vestingManager, "NoVestedTokensForRelease");
    }
  });

  it("should revert to release from vesting with completed releases", async () => {
    const { orderID, atomicSwap, vestingManager, taker, vestingId } =
      await testVestingTakeSwap(true, false);
    const order = await atomicSwap.swapOrder(orderID);
    // Release from vesting contract

    if (order.sellToken.token == ethers.ZeroAddress) {
      await expect(
        vestingManager.release(vestingId),
      ).to.revertedWithCustomError(vestingManager, "ERC721NonexistentToken");
    } else {
      await expect(
        vestingManager.release(vestingId),
      ).to.revertedWithCustomError(vestingManager, "ERC721NonexistentToken");
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
      false,
    );

    const order = await atomicSwap.swapOrder(orderID);
    const buyToken = (await atomicSwap.swapOrder(orderID)).buyToken;
    const atomicSwapAddress = await atomicSwap.getAddress();
    await expect(
      usdt.connect(taker).approve(atomicSwapAddress, buyToken.amount),
    ).not.to.reverted;

    // Run takeSwap message

    const tx = atomicSwap.connect(taker).takeSwap({
      orderID,
      takerReceiver: takerReceiver.address,
    });
    await expect(tx).to.revertedWithCustomError(atomicSwap, "NotEnoughFund");
  });
});
