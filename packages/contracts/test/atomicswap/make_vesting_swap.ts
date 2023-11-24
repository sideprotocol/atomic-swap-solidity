import { ethers } from "hardhat";
import {
  createDefaultAtomicOrder,
  createDefaultVestingAtomicOrder,
  generateOrderID,
} from "../../utils/utils";
import { Utils } from "../../utils/utils";
import { BlockTime } from "../../utils/time";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("AtomicSwap: MakeVestingSwap", () => {
  it("create in-chain vesting swap with native token", async () =>
    createDefaultVestingAtomicOrder(
      [
        {
          durationInHours: BigInt(2),
          percentage: BigInt(1000),
        },
        {
          durationInHours: BigInt(1),
          percentage: BigInt(9000),
        },
      ],
      true
    ));
  it("create in-chain swap with ERC20 token", async () =>
    createDefaultVestingAtomicOrder([
      {
        durationInHours: BigInt(1),
        percentage: BigInt(1000),
      },
      {
        durationInHours: BigInt(1),
        percentage: BigInt(9000),
      },
    ]));

  it("should revert to create in-chain vesting swap with same token address", async () => {
    const { atomicSwap, usdc, usdt } = await loadFixture(
      Utils.prepareInChainAtomicTest
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(100);
    const usdcAddress = await usdc.getAddress();
    const usdtAddress = await usdt.getAddress();
    const uuid = generateOrderID();
    const payload = {
      uuid: uuid,
      sellToken: {
        token: usdcAddress,
        amount: "20",
      },
      buyToken: {
        token: usdtAddress,
        amount: "20",
      },

      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: expireAt,
      acceptBid: true,
    };

    await expect(
      atomicSwap.makeSwapWithVesting(payload, [
        {
          durationInHours: BigInt(1),
          percentage: BigInt(10),
        },
        {
          durationInHours: BigInt(1),
          percentage: BigInt(10),
        },
      ])
    ).to.revertedWithCustomError(atomicSwap, "InvalidTotalPercentage");
  });

  it("should revert to create in-chain vesting swap with zero release schedule", async () => {
    const { atomicSwap, usdc, usdt } = await loadFixture(
      Utils.prepareInChainAtomicTest
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(100);
    const usdcAddress = await usdc.getAddress();
    const usdtAddress = await usdt.getAddress();
    const uuid = generateOrderID();
    const payload = {
      uuid: uuid,
      sellToken: {
        token: usdcAddress,
        amount: "20",
      },
      buyToken: {
        token: usdtAddress,
        amount: "20",
      },

      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: expireAt,
      acceptBid: true,
    };

    await expect(
      atomicSwap.makeSwapWithVesting(payload, [])
    ).to.revertedWithCustomError(atomicSwap, "ZeroReleaseSchedule");
  });

  it("should revert to create in-chain vesting swap with invalid release plans", async () => {
    const { atomicSwap, usdc, usdt } = await loadFixture(
      Utils.prepareInChainAtomicTest
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const expireAt = await BlockTime.AfterSeconds(100);
    const usdcAddress = await usdc.getAddress();
    const usdtAddress = await usdt.getAddress();
    const uuid = generateOrderID();
    const payload = {
      uuid: uuid,
      sellToken: {
        token: usdcAddress,
        amount: "20",
      },
      buyToken: {
        token: usdtAddress,
        amount: "20",
      },

      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: expireAt,
      acceptBid: true,
    };

    const releases: {
      durationInHours: bigint;
      percentage: bigint;
    }[] = [];
    for (let index = 0; index < 200; index++) {
      releases.push({
        durationInHours: BigInt(1),
        percentage: BigInt(50),
      });
    }
    await expect(
      atomicSwap.makeSwapWithVesting(payload, releases)
    ).to.revertedWithCustomError(atomicSwap, "OverMaximumReleaseStep");
  });
});
