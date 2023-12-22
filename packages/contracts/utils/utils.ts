import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";

import { ethers, network, upgrades } from "hardhat";
import {
  Vesting,
  IAtomicSwapBase,
  InchainAtomicSwap as ICAtomicSwap,
  IVesting,
  Vault,
  MockToken,
  VaultPermit,
  ecdsa,
} from "@sideprotocol/contracts-typechain";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { Signer, keccak256 } from "ethers";
import { BlockTime } from "./time";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { IAtomicSwapBase as AtomicSwapBaseData } from "@sideprotocol/contracts-typechain/typechain/contracts/inchain_atomicswap/InchainAtomicSwap";
export const ERC20_MINT_AMOUNT = 100000000;
// stable coins
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const ETH_USDC = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";

export const WHALES: string[] = [];

export const Utils = {
  prepareInChainAtomicTest: async function (
    sellTokenFeeRate?: number,
    buyTokenFeeRate?: number,
    treasury?: string,
  ) {
    //import users
    const accounts = await ethers.getSigners();
    const [owner] = accounts;

    // deploy libraries

    const AnteHandlerFactory = await ethers.getContractFactory("AnteHandler");
    const anteHandler = await AnteHandlerFactory.deploy();

    const atomicSwapStateLogicFactory = await ethers.getContractFactory(
      "AtomicSwapStateLogic",
      {
        libraries: {
          AnteHandler: await anteHandler.getAddress(),
        },
      },
    );
    const atomicSwapStateLogic = await atomicSwapStateLogicFactory.deploy();

    const vestingHelperFactory =
      await ethers.getContractFactory("VestingHelper");
    const vestingHelper = await vestingHelperFactory.deploy();

    if (!sellTokenFeeRate) {
      sellTokenFeeRate = 100;
    }
    if (!buyTokenFeeRate) {
      buyTokenFeeRate = 120;
    }
    if (!treasury) {
      treasury = generateRandomTestAddress();
    }

    // Deploy Vault contract
    const vaultName = "Side_Vault";
    const vaultFactory = await ethers.getContractFactory("VaultPermit");
    const vault = await upgrades.deployProxy(vaultFactory, [
      owner.address,
      vaultName,
    ]);
    //await vaultFactory.deploy(vaultName);
    const vaultAddress = await vault.getAddress();

    // Deploy vesting contract.
    const vestingManagerFactory = await ethers.getContractFactory("Vesting", {
      libraries: {
        VestingHelper: await vestingHelper.getAddress(),
      },
    });
    const vestingManager = await upgrades.deployProxy(
      vestingManagerFactory,
      [
        owner.address,
        vaultAddress,
        "vSide",
        "vSide",
        "https://nft.side.market/metadata/",
      ],
      {
        initializer: "initialize",
        unsafeAllowLinkedLibraries: true,
      },
    );

    const vestingManagerAddress = await vestingManager.getAddress();

    // AtomicSwap contract deploy
    const atomicSwapFactory = await ethers.getContractFactory(
      "InchainAtomicSwap",
      {
        libraries: {
          AtomicSwapStateLogic: await atomicSwapStateLogic.getAddress(),
        },
      },
    );

    // deploy contract
    const atomicSwap = await upgrades.deployProxy(
      atomicSwapFactory,
      [
        owner.address,
        vaultAddress,
        vestingManagerAddress,
        treasury,
        sellTokenFeeRate,
        buyTokenFeeRate,
      ],
      {
        initializer: "initialize",
        unsafeAllowLinkedLibraries: true,
      },
    );

    await vestingManager.addAdmin(await atomicSwap.getAddress());

    // Deploy Mock Contracts
    const mockERC20TokenFactory = await ethers.getContractFactory("MockToken");
    const mockUSDC = await mockERC20TokenFactory.deploy("USDC", "USDC");
    const mockUSDT = await mockERC20TokenFactory.deploy("USDT", "USDT");
    const mockDAI = await mockERC20TokenFactory.deploy("DAI", "DAI");

    const MINT_AMOUNT = ethers.parseEther("100000");

    await Promise.all(
      accounts.map(async (account, index) => {
        if (account.address == treasury) {
          return;
        }
        if (index !== 0) {
          await mockUSDT.mint(account.address, MINT_AMOUNT);
        }
        if (index !== 1) {
          await mockUSDC.mint(account.address, MINT_AMOUNT);
        }

        await mockUSDC.approve(await atomicSwap.getAddress(), MINT_AMOUNT);
        await mockUSDT.approve(await atomicSwap.getAddress(), MINT_AMOUNT);
      }),
    );

    return {
      atomicSwap: atomicSwap as unknown as ICAtomicSwap,
      usdc: mockUSDC as unknown as MockToken,
      usdcAddress: await mockUSDC.getAddress(),
      usdt: mockUSDT as unknown as MockToken,
      usdtAddress: await mockUSDT.getAddress(),
      dai: mockDAI as unknown as MockToken,
      vestingManager: vestingManager as unknown as Vesting,
      sellTokenFeeRate,
      buyTokenFeeRate,
      treasury,
      vault: vault as unknown as VaultPermit,
      vaultName,
    };
  },
};

// Utility methods
export const encodePayload = (types: string[], values: any[]): string => {
  return new ethers.AbiCoder().encode(types, values);
};

export function newAtomicSwapOrderID(contract: string, uuid: string): string {
  const encoder = new ethers.AbiCoder();
  const id = keccak256(
    encoder.encode(["address", "bytes32"], [contract, uuid]),
  );
  return id;
}

export function generateOrderID(): string {
  const uuidStr = ethers.randomBytes(32);
  const encoder = new ethers.AbiCoder();
  const id = keccak256(encoder.encode(["bytes"], [uuidStr]));
  return id;
}

export const saveDeployedAddress = async (
  atomicswap: string,
  usdc?: string,
  usdt?: string,
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
  settingInfo.mockUSDC = usdc ?? "";
  settingInfo.mockUSDT = usdt ?? "";
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
  const feeAmount = (amount * feeRateBigInt) / BigInt(10000);

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

export const getCustomSigner = async (
  customAddress: string,
  initialFund?: bigint,
) => {
  await ethers.provider.send("hardhat_impersonateAccount", [customAddress]);
  const signer = await ethers.provider.getSigner(customAddress);
  const balance = ethers.parseEther(initialFund?.toString() ?? "20"); // 20 Ether as a BigNumber
  const hexBalance = "0x" + balance.toString(16); //
  await network.provider.send("hardhat_setBalance", [
    customAddress,
    hexBalance,
  ]);
  return signer;
};

export function generateAgreement(
  swap: AtomicSwapBaseData.SwapWithPermitMsgStruct,
): string {
  const abiCoder = new ethers.AbiCoder();

  const encoded = abiCoder.encode(
    [
      "bytes32",
      "tuple(address, uint256)",
      "tuple(address, uint256)",
      "address",
      "uint256",
      "bool",
      "bool",
    ],
    [
      swap.uuid, // Convert string uuid to bytes32 array
      [swap.sellToken.token, swap.sellToken.amount],
      [swap.buyToken.token, swap.buyToken.amount],
      swap.desiredTaker,
      swap.minBidAmount,
      swap.acceptBid,
      swap.isSellerWithdraw,
    ],
  );

  return ethers.keccak256(encoded);
}

export function setupSwapPermitPayload(
  sellToken: string,
  buyToken: string,
  desiredTaker: string,
) {
  const uuid = generateOrderID();
  const swapParams: AtomicSwapBaseData.SwapWithPermitMsgStruct = {
    uuid: uuid,
    sellToken: {
      token: sellToken,
      amount: ethers.parseEther("20"),
    },
    buyToken: {
      token: buyToken,
      amount: ethers.parseEther("20"),
    },
    minBidAmount: ethers.parseEther("15"),
    desiredTaker,
    acceptBid: true,
    isSellerWithdraw: false,
    isBuyerWithdraw: false,
    sellerSignature: {
      v: 27 | 28,
      r: "",
      s: "",
      owner: "",
      deadline: BigInt(0),
    },
    buyerSignature: {
      v: 27 | 28,
      r: "",
      s: "",
      owner: "",
      deadline: BigInt(0),
    },
  };
  return swapParams;
}

export const setupSignature = async (
  swapPermitPayload: AtomicSwapBaseData.SwapWithPermitMsgStruct,
  atomicSwapAddress: string,
  vaultName: string,
  chainId: string,
  taker: HardhatEthersSigner,
  deadline: bigint,
  vault: VaultPermit,
) => {
  const attackAmount = ethers.parseEther("15");
  swapPermitPayload.buyToken.amount = attackAmount;
  // Recreate taker signature with the attack amount
  const takerNonce = await vault.nonces(taker.address);
  const { signature: buyerSignature } = await ecdsa.createPermitSignature({
    tokenName: vaultName,
    contractAddress: await vault.getAddress(),
    chainId: chainId,
    author: taker,
    spender: atomicSwapAddress,
    value: attackAmount,
    agreement: generateAgreement(swapPermitPayload),
    nonce: takerNonce,
    deadline,
  });
  const takerSig = ethers.Signature.from(buyerSignature);
  swapPermitPayload.buyerSignature = {
    deadline,
    v: takerSig.v,
    r: takerSig.r,
    s: takerSig.s,
    owner: taker.address,
  };
};

export function generateRandomTestAddress() {
  // Generate a random hex string
  const randomHexString = ethers.hexlify(ethers.randomBytes(20));

  // Ensure the string is formatted as an Ethereum address
  const randomAddress = ethers.getAddress(randomHexString);

  return randomAddress;
}
