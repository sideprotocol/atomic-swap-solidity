import { ethers } from "hardhat";
import {
  createDefaultAtomicOrder,
  createDefaultVestingAtomicOrder,
  generateOrderID,
  getCustomSigner,
  testTakeSwap,
  testVestingTakeSwap,
} from "../../utils/utils";
import { Utils } from "../../utils/utils";
import { BlockTime } from "../../utils/time";
import { expect } from "chai";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { ZeroAddress } from "ethers";
import { randomBytes } from "crypto";

describe("AtomicSwap: Vesting", () => {
  it("should revert to set admin by non-owner", async () => {
    const { orderID, taker, vestingManager, takerReceiver, atomicSwap } =
      await testVestingTakeSwap(true, false);
    await expect(
      vestingManager.connect(taker).addAdmin(taker.address)
    ).to.revertedWithCustomError(
      vestingManager,
      "AccessControlUnauthorizedAccount"
    );
  });
  it("should revert to start vesting with invalid fund", async () => {
    const { atomicSwap, treasury, vestingManager } = await loadFixture(
      Utils.prepareInChainAtomicTest
    );
    const orderId = randomBytes(32);
    const customSigner = await getCustomSigner(await atomicSwap.getAddress());
    await expect(
      vestingManager
        .connect(customSigner)
        .startVesting(orderId, treasury, ZeroAddress, BigInt(10), [
          {
            durationInHours: BigInt(1),
            percentage: 10000,
          },
        ])
    ).to.revertedWithCustomError(vestingManager, "NotEnoughFund");
  });
  it("should revert to start vesting with non-inchainAtomicSwap contract", async () => {
    const { treasury, vestingManager } = await loadFixture(
      Utils.prepareInChainAtomicTest
    );
    const orderId = randomBytes(32);
    const [, , taker] = await ethers.getSigners();
    await expect(
      vestingManager
        .connect(taker)
        .startVesting(orderId, treasury, ZeroAddress, BigInt(10), [
          {
            durationInHours: BigInt(1),
            percentage: 10000,
          },
        ])
    ).to.revertedWith("OwnablePausable: access denied");
  });
  it("should revert to release fund with invalid start time", async () => {
    const { orderID, taker, vestingManager, takerReceiver, atomicSwap } =
      await testVestingTakeSwap(true, false);
    await expect(
      vestingManager.release(takerReceiver, orderID)
    ).to.revertedWithCustomError(vestingManager, "InvalidVesting");
  });
});
