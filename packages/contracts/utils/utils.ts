import {
  appendFileSync,
  existsSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
} from "fs";

import { ethers, upgrades } from "hardhat";
import { AtomicSwap, MockToken } from "@sideprotocol/contracts-typechain";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

export const ERC20_MINT_AMOUNT = 100000000;
// stable coins
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const ETH_USDC = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";

export const WHALES: string[] = [];
export const saveDeployedAddress = async (
  atomicswap: string,
  usdc: string,
  usdt: string
) => {
  const settingInfo: {
    atomicswap: string;
    mockUSDC: string;
    mockUSDT: string;
  } = {
    atomicswap: "",
    mockUSDC: "",
    mockUSDT: "",
  };
  settingInfo.atomicswap = atomicswap;
  settingInfo.mockUSDC = usdc;
  settingInfo.mockUSDT = usdt;
  const settingsPath = "../contracts-typechain/settings";
  if (!existsSync(settingsPath)) {
    mkdirSync(settingsPath, { recursive: true });
  } else {
    const rawData = readFileSync(`${settingsPath}/settings.json`);
    const data = JSON.parse(rawData.toString());
  }
  const json = JSON.stringify(settingInfo);
  writeFileSync(`${settingsPath}/settings.json`, json, "utf-8");
};

export const Utils = {
  prepareTest: async function () {
    //import users
    const accounts = await ethers.getSigners();
    const [owner] = accounts;

    // AtomicSwap contract deploy
    const atomicSwapFactory = await ethers.getContractFactory("AtomicSwap");
    const sellTokenFeeRate = 10;
    const buyTokenFeeRate = 12;
    const treasury = accounts[10].address;
    const atomicSwap = await upgrades.deployProxy(
      atomicSwapFactory,
      [owner.address, treasury, sellTokenFeeRate, buyTokenFeeRate],
      {
        initializer: "initialize",
      }
    );

    // Deploy Mock Token
    const mockERC20TokenFactory = await ethers.getContractFactory("MockToken");
    const mockUSDC = await mockERC20TokenFactory.deploy("USDC", "USDC");
    const mockUSDT = await mockERC20TokenFactory.deploy("USDT", "USDT");
    const mockDAI = await mockERC20TokenFactory.deploy("DAI", "DAI");
    const MINT_AMOUNT = ethers.utils.parseEther("100000");

    await Promise.all(
      accounts.map(async (account) => {
        await mockUSDC.mint(account.address, MINT_AMOUNT);
        await mockUSDT.mint(account.address, MINT_AMOUNT);
        await mockDAI.mint(account.address, MINT_AMOUNT);

        await mockUSDC.approve(atomicSwap.address, MINT_AMOUNT);
        await mockUSDT.approve(atomicSwap.address, MINT_AMOUNT);
        await mockDAI.approve(atomicSwap.address, MINT_AMOUNT);
      })
    );

    return {
      atomicSwap: atomicSwap as AtomicSwap,
      usdc: mockUSDC as MockToken,
      usdt: mockUSDT as MockToken,
      dai: mockDAI as MockToken,
      sellTokenFeeRate,
      buyTokenFeeRate,
      treasury,
    };
  },
};

export function generateRandomString(length: number) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

import { keccak256 } from "ethers/lib/utils";
import { BlockTime } from "./time";
import { BigNumber } from "ethers";

export function newAtomicSwapOrderID(
  sender: string,
  swapOrderCounter: number
): string {
  const id = keccak256(
    ethers.utils.defaultAbiCoder.encode(
      ["address", "uint256"],
      [sender, swapOrderCounter]
    )
  );
  return id;
}

export const createDefaultAtomicOrder = async (
  withNativeSellToken?: boolean,
  withNativeBuyToken?: boolean,
  noTaker?: boolean,
  acceptBid?: boolean
) => {
  const {
    atomicSwap,
    usdc,
    usdt,
    sellTokenFeeRate,
    buyTokenFeeRate,
    treasury,
  } = await loadFixture(Utils.prepareTest);
  const accounts = await ethers.getSigners();
  const [maker, taker] = accounts;
  const expireAt = await BlockTime.AfterSeconds(10000);
  const payload = {
    sellToken: {
      token: withNativeSellToken ? ethers.constants.AddressZero : usdc.address,
      amount: ethers.utils.parseEther("20"),
    },
    buyToken: {
      token: withNativeBuyToken ? ethers.constants.AddressZero : usdt.address,
      amount: ethers.utils.parseEther("20"),
    },
    maker: maker.address,
    minBidAmount: ethers.utils.parseEther("15"),
    desiredTaker: noTaker ? ethers.constants.AddressZero : taker.address,
    expireAt: expireAt,
    acceptBid: acceptBid ?? true,
  };

  if (!withNativeSellToken) {
    const amount = await usdc.allowance(
      accounts[0].address,
      atomicSwap.address
    );
    await expect(
      usdc.increaseAllowance(
        atomicSwap.address,
        amount.add(payload.sellToken.amount)
      )
    ).not.to.reverted;
  }

  if (!withNativeBuyToken) {
    const amount = await usdt.allowance(
      accounts[0].address,
      atomicSwap.address
    );
    await expect(
      usdt.increaseAllowance(
        atomicSwap.address,
        amount.add(payload.buyToken.amount)
      )
    ).not.to.reverted;
  }

  let nativeTokenAmount = BigNumber.from(0);
  if (withNativeSellToken) {
    nativeTokenAmount = nativeTokenAmount.add(payload.sellToken.amount);
    await expect(
      atomicSwap.makeSwap(payload, {
        value: nativeTokenAmount,
      })
    )
      .to.changeEtherBalance(atomicSwap.address, nativeTokenAmount)
      .emit(atomicSwap, "AtomicSwapOrderCreated");
  } else {
    await expect(atomicSwap.makeSwap(payload))
      .to.changeTokenBalance(usdc, atomicSwap.address, payload.sellToken.amount)
      .emit(atomicSwap, "AtomicSwapOrderCreated");
  }
  await expect(
    atomicSwap.makeSwap(payload, {
      value: nativeTokenAmount,
    })
  ).to.emit(atomicSwap, "AtomicSwapOrderCreated");

  const id = newAtomicSwapOrderID(accounts[0].address, 0);
  const orderIDAtContractA = await atomicSwap.swapOrder(id);
  expect(orderIDAtContractA.id).to.equal(id);

  return {
    orderID: id,
    maker,
    taker,

    atomicSwap,

    payload: payload,
    usdt,
    usdc,
    sellTokenFeeRate,
    buyTokenFeeRate,
    treasury,
  };
};

export const bidToDefaultAtomicOrder = async (
  withSellNativeToken?: boolean,
  withBuyNativeToken?: boolean,
  noTaker?: boolean
) => {
  const orderParams = await createDefaultAtomicOrder(
    withSellNativeToken,
    withBuyNativeToken,
    noTaker
  );
  const { atomicSwap, maker, taker, orderID, usdc, usdt } = orderParams;

  // try to take swap
  const buyToken = (await atomicSwap.swapOrder(orderID)).buyToken;

  const bidPayload = {
    bidder: taker.address,
    bidAmount: buyToken.amount,
    orderID: orderID,
    expireTimestamp: await BlockTime.AfterSeconds(30),
  };

  if (withBuyNativeToken) {
    await expect(
      atomicSwap.connect(taker).placeBid(bidPayload, {
        value: buyToken.amount,
      })
    ).to.changeEtherBalance(atomicSwap.address, buyToken.amount);
  } else {
    await usdt.connect(taker).approve(atomicSwap.address, buyToken.amount);
    await expect(
      atomicSwap.connect(taker).placeBid(bidPayload)
    ).to.changeTokenBalance(usdt, atomicSwap.address, buyToken.amount);
  }

  return { ...orderParams, ...bidPayload };
};

export const encodePayload = (types: string[], values: any[]): string => {
  return new ethers.utils.AbiCoder().encode(types, values);
};
