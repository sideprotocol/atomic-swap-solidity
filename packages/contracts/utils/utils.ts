import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";

import { ethers, upgrades } from "hardhat";
import {
  InchainAtomicSwap as ICAtomicSwap,
  InterchainAtomicSwap as ITCAtomicSwap,
  LZEndpointMock,
  MockToken,
  SideLzAppUpgradable,
} from "@sideprotocol/contracts-typechain";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { keccak256 } from "ethers";
import { BlockTime } from "./time";
import { BigNumberish } from "ethers";

export const ERC20_MINT_AMOUNT = 100000000;
// stable coins
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const ETH_USDC = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";

export const WHALES: string[] = [];

export const Utils = {
  prepareInChainAtomicTest: async function () {
    //import users
    const accounts = await ethers.getSigners();
    const [owner] = accounts;

    // AtomicSwap contract deploy
    const atomicSwapFactory = await ethers.getContractFactory(
      "InchainAtomicSwap"
    );
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

    const MINT_AMOUNT = ethers.parseEther("100000");

    await Promise.all(
      accounts.map(async (account) => {
        await mockUSDC.mint(account.address, MINT_AMOUNT);
        await mockUSDT.mint(account.address, MINT_AMOUNT);
        await mockDAI.mint(account.address, MINT_AMOUNT);

        await mockUSDC.approve(await atomicSwap.getAddress(), MINT_AMOUNT);
        await mockUSDT.approve(await atomicSwap.getAddress(), MINT_AMOUNT);
        await mockDAI.approve(await atomicSwap.getAddress(), MINT_AMOUNT);
      })
    );

    return {
      atomicSwap: atomicSwap as unknown as ICAtomicSwap,
      usdc: mockUSDC as unknown as MockToken,
      usdt: mockUSDT as unknown as MockToken,
      dai: mockDAI as unknown as MockToken,
      sellTokenFeeRate,
      buyTokenFeeRate,
      treasury,
    };
  },

  prepareITCAtomicSwapTest: async function () {
    //import users
    const accounts = await ethers.getSigners();
    const [owner] = accounts;
    //deploy contracts
    // create a LayerZero Endpoint mock for testing
    const chainID = 123;
    const LayerZeroEndpointMock = await ethers.getContractFactory(
      "LZEndpointMock"
    );
    const lzEndpointMock = await LayerZeroEndpointMock.deploy(chainID);
    const lzEndpointMockAddress = await lzEndpointMock.getAddress();

    // bridge contract deployment
    const sideBridgeFactory = await ethers.getContractFactory(
      "SideLzAppUpgradable"
    );

    const sideBridgeAtChainA = await upgrades.deployProxy(
      sideBridgeFactory,
      [owner.address, lzEndpointMockAddress],
      {
        initializer: "initialize",
      }
    );

    const sideBridgeAtChainB = await upgrades.deployProxy(
      sideBridgeFactory,
      [owner.address, lzEndpointMockAddress],
      {
        initializer: "initialize",
      }
    );

    const sideBridgeAtAAddress = await sideBridgeAtChainA.getAddress();
    const sideBridgeAtBAddress = await sideBridgeAtChainB.getAddress();

    // AtomicSwap contract deploy
    const atomicSwapFactory = await ethers.getContractFactory(
      "InterchainAtomicSwap"
    );

    const sellTokenFeeRate = 10;
    const buyTokenFeeRate = 12;
    const treasury = accounts[10].address;

    const initialAParams = {
      admin: accounts[0].address,
      chainID: chainID,
      bridge: sideBridgeAtAAddress,
      treasury: treasury,
      sellerFee: sellTokenFeeRate,
      buyerFee: buyTokenFeeRate,
    };

    const atomicSwapA = await upgrades.deployProxy(
      atomicSwapFactory,
      [initialAParams],
      {
        initializer: "initialize",
      }
    );

    const initialBParams = {
      admin: accounts[0].address,
      chainID: chainID,
      bridge: sideBridgeAtBAddress,
      treasury: treasury,
      sellerFee: sellTokenFeeRate,
      buyerFee: buyTokenFeeRate,
    };
    const atomicSwapB = await upgrades.deployProxy(
      atomicSwapFactory,
      [initialBParams],
      {
        initializer: "initialize",
      }
    );

    // Setup layer zero endpoint
    await lzEndpointMock.setDestLzEndpoint(
      sideBridgeAtAAddress,
      lzEndpointMockAddress
    );
    await lzEndpointMock.setDestLzEndpoint(
      sideBridgeAtBAddress,
      lzEndpointMockAddress
    );

    // set each contracts source address so it can send to each other
    await sideBridgeAtChainA.setTrustedRemote(
      chainID,
      ethers.solidityPacked(
        ["address", "address"],
        [sideBridgeAtBAddress, sideBridgeAtAAddress]
      )
    );

    await sideBridgeAtChainB.setTrustedRemote(
      chainID,
      ethers.solidityPacked(
        ["address", "address"],
        [sideBridgeAtAAddress, sideBridgeAtBAddress]
      )
    );

    const atomicSwapAAddress = await atomicSwapA.getAddress();
    const atomicSwapBAddress = await atomicSwapB.getAddress();

    await sideBridgeAtChainA.setPacketReceivers(
      atomicSwapAAddress,
      ethers.ZeroAddress
    );

    await sideBridgeAtChainB.setPacketReceivers(
      atomicSwapBAddress,
      ethers.ZeroAddress
    );

    // Deploy Mock Token
    const mockERC20TokenFactory = await ethers.getContractFactory("MockToken");
    const mockUSDC = await mockERC20TokenFactory.deploy("USDC", "USDC");
    const mockUSDT = await mockERC20TokenFactory.deploy("USDT", "USDT");
    const mockDAI = await mockERC20TokenFactory.deploy("DAI", "DAI");
    const MINT_AMOUNT = ethers.parseEther("100000");

    await Promise.all(
      accounts.map(async (account) => {
        await mockUSDC.mint(account.address, MINT_AMOUNT);
        await mockUSDT.mint(account.address, MINT_AMOUNT);
        await mockDAI.mint(account.address, MINT_AMOUNT);

        await mockUSDC.approve(atomicSwapAAddress, MINT_AMOUNT);
        await mockUSDC.approve(atomicSwapBAddress, MINT_AMOUNT);
        await mockUSDT.approve(atomicSwapAAddress, MINT_AMOUNT);
        await mockUSDT.approve(atomicSwapBAddress, MINT_AMOUNT);
        await mockDAI.approve(atomicSwapAAddress, MINT_AMOUNT);
        await mockDAI.approve(atomicSwapBAddress, MINT_AMOUNT);
      })
    );

    return {
      chainID: chainID,
      bridgeA: sideBridgeAtChainA as unknown as SideLzAppUpgradable,
      bridgeB: sideBridgeAtChainB as unknown as SideLzAppUpgradable,
      lzEndpointMock: lzEndpointMock as unknown as LZEndpointMock,
      atomicSwapA: atomicSwapA as unknown as ITCAtomicSwap,
      atomicSwapB: atomicSwapB as unknown as ITCAtomicSwap,
      usdc: mockUSDC as unknown as MockToken,
      usdt: mockUSDT as unknown as MockToken,
      dai: mockDAI as unknown as MockToken,
      atomicSwapAAddress,
      atomicSwapBAddress,
      usdcAddress: await mockUSDC.getAddress(),
      usdtAddress: await mockUSDT.getAddress(),
      sellTokenFeeRate,
      buyTokenFeeRate,
      treasury,
    };
  },
};

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
  } = await loadFixture(Utils.prepareInChainAtomicTest);
  const accounts = await ethers.getSigners();
  const [maker, taker] = accounts;
  const expireAt = await BlockTime.AfterSeconds(10000);
  const payload = {
    sellToken: {
      token: withNativeSellToken ? ethers.ZeroAddress : await usdc.getAddress(),
      amount: ethers.parseEther("20"),
    },
    buyToken: {
      token: withNativeBuyToken ? ethers.ZeroAddress : await usdt.getAddress(),
      amount: ethers.parseEther("20"),
    },
    maker: maker.address,
    minBidAmount: ethers.parseEther("15"),
    desiredTaker: noTaker ? ethers.ZeroAddress : taker.address,
    expireAt: expireAt,
    acceptBid: acceptBid ?? true,
  };

  if (!withNativeSellToken) {
    const amount = await usdc.allowance(
      accounts[0].address,
      await atomicSwap.getAddress()
    );
    await expect(
      usdc.approve(
        await atomicSwap.getAddress(),
        amount + payload.sellToken.amount
      )
    ).not.to.reverted;
  }

  if (!withNativeBuyToken) {
    const amount = (await usdt.allowance(
      accounts[0].address,
      await atomicSwap.getAddress()
    )) as bigint;
    await expect(
      usdt.approve(
        await atomicSwap.getAddress(),
        amount + payload.buyToken.amount
      )
    ).not.to.reverted;
  }

  let nativeTokenAmount = BigInt(0);
  if (withNativeSellToken) {
    nativeTokenAmount = nativeTokenAmount + payload.sellToken.amount;
    const tx = atomicSwap.makeSwap(payload, {
      value: nativeTokenAmount,
    });
    await expect(tx).to.changeEtherBalance(
      await atomicSwap.getAddress(),
      nativeTokenAmount
    );
    await expect(tx).to.emit(atomicSwap, "AtomicSwapOrderCreated");
  } else {
    await expect(atomicSwap.makeSwap(payload)).to.changeTokenBalance(
      usdc,
      await atomicSwap.getAddress(),
      payload.sellToken.amount
    );
    //.emit(atomicSwap, "AtomicSwapOrderCreated");
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
    ).to.changeEtherBalance(await atomicSwap.getAddress(), buyToken.amount);
  } else {
    await usdt
      .connect(taker)
      .approve(await atomicSwap.getAddress(), buyToken.amount);
    await expect(
      atomicSwap.connect(taker).placeBid(bidPayload)
    ).to.changeTokenBalance(
      usdt,
      await atomicSwap.getAddress(),
      buyToken.amount
    );
  }

  return { ...orderParams, ...bidPayload };
};

// Inter-chain Sw

export const createDefaultITCAtomicOrder = async (
  withNativeToken?: boolean,
  acceptBid?: boolean,
  noTaker?: boolean
) => {
  const {
    atomicSwapA,
    atomicSwapB,
    chainID,
    usdc,
    usdt,
    bridgeA,
    bridgeB,
    buyTokenFeeRate,
    sellTokenFeeRate,
    treasury,
  } = await loadFixture(Utils.prepareITCAtomicSwapTest);
  const accounts = await ethers.getSigners();
  const [maker, taker, makerReceiver, takerReceiver] = accounts;
  const payload = {
    sellToken: {
      token: withNativeToken ? ethers.ZeroAddress : await usdc.getAddress(),
      amount: ethers.parseEther("20"),
    },
    buyToken: {
      token: withNativeToken ? ethers.ZeroAddress : await usdt.getAddress(),
      amount: ethers.parseEther("20"),
    },
    maker: maker.address,
    minBidAmount: ethers.parseEther("15"),
    desiredTaker: noTaker ? ethers.ZeroAddress : taker.address,
    expireAt: await BlockTime.AfterSeconds(100),
    acceptBid: acceptBid ?? true,
  };
  const encoder = new ethers.AbiCoder();
  const payloadBytes = encoder.encode(
    [
      "tuple(address, uint256)",
      "tuple(address, uint256)",
      "address",
      "address",
      "address",
      "uint256",
      "uint16",
    ],
    [
      [ethers.ZeroAddress, 20],
      [ethers.ZeroAddress, 20],
      maker.address,
      maker.address,
      taker.address,
      payload.expireAt,
      chainID,
    ]
  );

  const estimateFee = await bridgeA.estimateFee(
    chainID,
    false,
    "0x",
    payloadBytes
  );
  if (!withNativeToken) {
    const amount = await usdc.allowance(
      accounts[0].address,
      await atomicSwapA.getAddress()
    );
    await expect(
      usdc.approve(
        await atomicSwapA.getAddress(),
        amount + payload.sellToken.amount
      )
    ).not.to.reverted;
  }

  let nativeTokenAmount = safeFactor(estimateFee.nativeFee, 1.2);
  if (withNativeToken) {
    nativeTokenAmount = nativeTokenAmount + payload.sellToken.amount;
  }

  await expect(
    atomicSwapA.makeSwap(
      {
        base: payload,
        dstChainID: chainID,

        makerReceiver: makerReceiver.address,
        desiredTaker: taker.address,
      },
      {
        value: nativeTokenAmount,
      }
    )
  ).to.emit(atomicSwapA, "AtomicSwapOrderCreated");

  // check token balance.
  if (!withNativeToken) {
    const balanceOfUSDC = await usdc.balanceOf(await atomicSwapA.getAddress());
    expect(balanceOfUSDC.toString()).to.equal(payload.sellToken.amount);
  }

  const id = newAtomicSwapOrderID(accounts[0].address, 0);
  const orderIDAtContractA = await atomicSwapA.swapOrder(id);
  expect(orderIDAtContractA.id).to.equal(id);

  const orderIDAtContractB = await atomicSwapB.swapOrder(id);
  expect(orderIDAtContractB.buyToken).to.deep.equal(
    orderIDAtContractA.buyToken
  );

  return {
    orderID: id,
    chainID: chainID,
    maker,
    makerReceiver,
    taker,
    takerReceiver,

    atomicSwapA,
    atomicSwapB,
    bridgeA,
    bridgeB,
    payload: payload,
    usdt,
    usdc,
    sellTokenFeeRate,
    buyTokenFeeRate,
    treasury,
  };
};

export const bidToDefaultITCAtomicOrder = async (
  withNativeToken?: boolean,
  noTaker?: boolean
) => {
  const orderParams = await createDefaultITCAtomicOrder(
    withNativeToken,
    noTaker
  );
  const {
    atomicSwapA,
    atomicSwapB,
    maker,
    taker,
    orderID,
    chainID,
    usdc,
    usdt,
    bridgeA,
    bridgeB,
  } = orderParams;
  // // try to take swap
  const bridge = bridgeB;
  const atomicSwap = atomicSwapB;
  const payloadBytes = encodePayload(
    ["bytes32", "address", "address"],
    [orderID, taker.address, taker.address]
  );

  const estimateFee = await bridge.estimateFee(
    chainID,
    false,
    "0x",
    payloadBytes
  );

  const buyToken = (await atomicSwap.swapOrder(orderID)).buyToken;
  let nativeTokenAmount = (estimateFee.nativeFee * BigInt(11)) / BigInt(10);
  if (withNativeToken) {
    nativeTokenAmount = nativeTokenAmount + buyToken.amount;
  } else {
    await usdt
      .connect(taker)
      .approve(await atomicSwap.getAddress(), buyToken.amount);
  }

  await expect(
    atomicSwap.connect(taker).takeSwap(
      {
        orderID,
        takerReceiver: maker.address,
      },
      {
        value: nativeTokenAmount,
      }
    )
  ).to.revertedWith("NoPermissionToTake");

  const bidPayload = {
    bidder: taker.address,
    bidAmount: buyToken.amount,
    orderID: orderID,
    bidderReceiver: taker.address,
    expireTimestamp: await BlockTime.AfterSeconds(30),
  };

  const bidPayloadBytes = encodePayload(
    ["address", "uint256", "bytes32", "address", "uint256"],
    [
      taker.address,
      bidPayload.bidAmount,
      bidPayload.orderID,
      bidPayload.bidderReceiver,
      bidPayload.expireTimestamp,
    ]
  );
  const estimateBidFee = await bridge.estimateFee(
    chainID,
    false,
    "0x",
    bidPayloadBytes
  );

  let txAmount =
    (estimateBidFee.nativeFee * BigInt(11)) / BigInt(10) + buyToken.amount;

  // make bid

  if (withNativeToken) {
    await expect(
      atomicSwap.connect(taker).placeBid(bidPayload, {
        value: txAmount,
      })
    ).to.changeEtherBalance(await atomicSwap.getAddress(), buyToken.amount);
  } else {
    await expect(
      atomicSwap.connect(taker).placeBid(bidPayload, {
        value: txAmount,
      })
    ).to.changeTokenBalance(
      usdt,
      await atomicSwap.getAddress(),
      buyToken.amount
    );
  }
  const bidAtA = await atomicSwapA.bids(orderID, taker.address);
  const bidAtB = await atomicSwapB.bids(orderID, taker.address);
  expect(bidAtA).to.deep.equal(bidAtB);
  return { ...orderParams, ...bidPayload };
};

// Utility methods
export const encodePayload = (types: string[], values: any[]): string => {
  return new ethers.AbiCoder().encode(types, values);
};

export function newAtomicSwapOrderID(
  sender: string,
  swapOrderCounter: number
): string {
  const encoder = new ethers.AbiCoder();
  const id = keccak256(
    encoder.encode(["address", "uint256"], [sender, swapOrderCounter])
  );
  return id;
}
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

export function generateRandomString(length: number) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function calcSwapAmount(amount: bigint, feeRate: number) {
  // Convert the feeRate to a bigint with a scaling factor (in this case, 1000 for precision)
  const feeRateBigInt = BigInt(Math.round(feeRate));
  // Calculate the feeAmount in bigint
  const feeAmount = (amount * feeRateBigInt) / BigInt(1000);

  // Subtract the feeAmount from the initial amount to get the amount after fee
  const amountAfterFee = amount - feeAmount;

  return {
    amountAfterFee,
    feeAmount,
  };
}

// factor has to be positive value always.
export function safeFactor(amount: bigint, factor: number): bigint {
  const roundedFactor = Math.floor(factor * 10000);
  return (amount * BigInt(roundedFactor)) / BigInt(10000);
}
