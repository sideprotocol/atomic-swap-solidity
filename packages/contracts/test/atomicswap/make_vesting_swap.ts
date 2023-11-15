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
      {
        cliffDurationInHours: BigInt(0),
        releases: [
          {
            durationInHours: BigInt(2),
            percentage: BigInt(1000),
          },
          {
            durationInHours: BigInt(1),
            percentage: BigInt(9000),
          },
        ],
      },
      true
    ));
  it("create in-chain swap with ERC20 token", async () =>
    createDefaultVestingAtomicOrder({
      cliffDurationInHours: BigInt(0),
      releases: [
        {
          durationInHours: BigInt(1),
          percentage: BigInt(10),
        },
        {
          durationInHours: BigInt(1),
          percentage: BigInt(90),
        },
      ],
    }));

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
      atomicSwap.makeSwapWithVesting(payload, {
        cliffDurationInHours: BigInt(0),
        releases: [
          {
            durationInHours: BigInt(1),
            percentage: BigInt(10),
          },
          {
            durationInHours: BigInt(1),
            percentage: BigInt(10),
          },
        ],
      })
    ).to.revertedWithCustomError(atomicSwap, "InvalidTotalPercentage");
  });

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
      atomicSwap.makeSwapWithVesting(payload, {
        cliffDurationInHours: BigInt(0),
        releases: [],
      })
    ).to.revertedWithCustomError(atomicSwap, "ZeroReleaseSchedule");
  });

  //   it("should revert to create in-chain pool with transfer failed", async () => {
  //     const { atomicSwap, usdc, usdt } = await loadFixture(
  //       Utils.prepareInChainAtomicTest
  //     );
  //     const accounts = await ethers.getSigners();
  //     const [maker, taker] = accounts;
  //     const expireAt = await BlockTime.AfterSeconds(30);
  //     const uuid = generateOrderID();
  //     const payload = {
  //       uuid,
  //       sellToken: {
  //         token: await usdc.getAddress(),
  //         amount: "90",
  //       },
  //       buyToken: {
  //         token: await usdt.getAddress(),
  //         amount: "20",
  //       },
  //       maker: maker.address,
  //       minBidAmount: ethers.parseEther("15"),
  //       desiredTaker: taker.address,
  //       expireAt: expireAt,
  //       acceptBid: true,
  //     };

  //     await usdc.setFailTransferFrom(true);

  //     await expect(atomicSwap.makeSwap(payload)).to.revertedWith(
  //       "TransferFrom failed."
  //     );
  //   });

  //   it("should revert to create in-chain pool with not enough native token", async () => {
  //     const { atomicSwap, usdc } = await loadFixture(
  //       Utils.prepareInChainAtomicTest
  //     );
  //     const accounts = await ethers.getSigners();
  //     const [maker, taker, makerReceiver, takerReceiver] = accounts;
  //     const expireAt = await BlockTime.AfterSeconds(10);
  //     const uuid = generateOrderID();
  //     const payload = {
  //       uuid,
  //       sellToken: {
  //         token: ethers.ZeroAddress,
  //         amount: ethers.parseEther("20"),
  //       },
  //       buyToken: {
  //         token: await usdc.getAddress(),
  //         amount: ethers.parseEther("20"),
  //       },
  //       maker: maker.address,
  //       minBidAmount: ethers.parseEther("15"),
  //       desiredTaker: taker.address,
  //       expireAt: expireAt,
  //       acceptBid: true,
  //     };

  //     await expect(atomicSwap.makeSwap(payload)).to.revertedWith(
  //       "Not enough ether"
  //     );
  //   });
});
