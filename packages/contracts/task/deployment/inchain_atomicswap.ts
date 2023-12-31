import dotenv from "dotenv";
import { saveItemsToSetting } from "../utils/utils";
import { task } from "hardhat/config";
import { Settings } from "@sideprotocol/contracts-typechain";
dotenv.config();
task("deploy:in-chain:lib", "deploy libraries")
  .addOptionalParam("f", "force write")
  .setAction(async ({ f }, { ethers, upgrades, network }) => {
    // deploy libraries
    const atomicSwapStateLogicFactory = await ethers.getContractFactory(
      "AtomicSwapStateLogic"
    );
    const atomicSwapStateLogic = await atomicSwapStateLogicFactory.deploy();
    const atomicSwapStateLogicAddress = await atomicSwapStateLogic.getAddress();

    const tokenTransferHelperFactory = await ethers.getContractFactory(
      `TokenTransferHelper`
    );
    const tokenTransferHelper = await tokenTransferHelperFactory.deploy();
    const tokenTransferHelperAddress = await tokenTransferHelper.getAddress();

    const atomicSwapMsgValidatorFactory = await ethers.getContractFactory(
      "AtomicSwapMsgValidator"
    );
    const atomicSwapMsgValidator = await atomicSwapMsgValidatorFactory.deploy();
    const atomicSwapMsgValidatorAddress =
      await atomicSwapMsgValidator.getAddress();
    await saveItemsToSetting(
      [
        {
          title: `atomicSwapStateLogic_${network.name}`,
          value: atomicSwapStateLogicAddress,
        },
        {
          title: `tokenTransferHelper_${network.name}`,
          value: tokenTransferHelperAddress,
        },
        {
          title: `atomicSwapMsgValidator_${network.name}`,
          value: atomicSwapMsgValidatorAddress,
        },
      ],
      f
    );
    console.log(
      `atomicSwapStateLogic_${network.name}`,
      atomicSwapStateLogicAddress
    );

    console.log(
      `tokenTransferHelper_${network.name}`,
      tokenTransferHelperAddress
    );
    console.log(
      `atomicSwapMsgValidator_${network.name}`,
      atomicSwapMsgValidatorAddress
    );
  });

task("deploy:in-chain:contract", "deploy in chain ").setAction(
  async ({}, { ethers, upgrades, network }) => {
    //deploy contracts
    const admin = process.env.ADMIN;
    const treasury = process.env.TREASURY;
    const sellTokenFeeRate = process.env.SELL_TOKEN_FEE_RATE;
    const buyTokenFeeRate = process.env.BUY_TOKEN_FEE_RATE;

    let atomicSwapStateLogicAddress =
      Settings[`atomicSwapStateLogic_${network.name}` as keyof typeof Settings];
    if (!ethers.isAddress(atomicSwapStateLogicAddress)) {
      const atomicSwapStateLogicFactory = await ethers.getContractFactory(
        `AtomicSwapStateLogic`
      );
      const atomicSwapStateLogic = await atomicSwapStateLogicFactory.deploy();
      atomicSwapStateLogicAddress = await atomicSwapStateLogic.getAddress();
      saveItemsToSetting([
        {
          title: `atomicSwapStateLogic_${network.name}`,
          value: atomicSwapStateLogicAddress,
        },
      ]);
    }

    let tokenTransferHelperAddress =
      Settings[`tokenTransferHelper_${network.name}` as keyof typeof Settings];

    if (!ethers.isAddress(tokenTransferHelperAddress)) {
      const tokenTransferHelperFactory = await ethers.getContractFactory(
        `TokenTransferHelper`
      );
      const tokenTransferHelper = await tokenTransferHelperFactory.deploy();
      tokenTransferHelperAddress = await tokenTransferHelper.getAddress();
      saveItemsToSetting([
        {
          title: `tokenTransferHelper_${network.name}`,
          value: tokenTransferHelperAddress,
        },
      ]);
    }

    let atomicSwapMsgValidatorAddress =
      Settings[
        `atomicSwapMsgValidator_${network.name}` as keyof typeof Settings
      ];

    if (!ethers.isAddress(tokenTransferHelperAddress)) {
      const atomicSwapMsgValidatorFactory = await ethers.getContractFactory(
        "AtomicSwapMsgValidator"
      );
      const atomicSwapMsgValidator =
        await atomicSwapMsgValidatorFactory.deploy();
      atomicSwapMsgValidatorAddress = await atomicSwapMsgValidator.getAddress();
      saveItemsToSetting([
        {
          title: `atomicSwapMsgValidator_${network.name}`,
          value: atomicSwapMsgValidatorAddress,
        },
      ]);
    }

    let vestingAddress =
      Settings[`vesting_${network.name}` as keyof typeof Settings];

    if (!ethers.isAddress(vestingAddress)) {
      console.error("Please deploy vesting contract first of all");
      return;
    }

    // AtomicSwap contract deploy
    const atomicSwapFactory = await ethers.getContractFactory(
      `InchainAtomicSwap`,
      {
        libraries: {
          AtomicSwapStateLogic: atomicSwapStateLogicAddress,
          TokenTransferHelper: tokenTransferHelperAddress,
          AtomicSwapMsgValidator: atomicSwapMsgValidatorAddress,
        },
      }
    );

    // deploy contract
    const atomicSwap = await upgrades.deployProxy(
      atomicSwapFactory,
      [admin, vestingAddress, treasury, sellTokenFeeRate, buyTokenFeeRate],
      {
        initializer: "initialize",
        unsafeAllowLinkedLibraries: true,
      }
    );

    // Deploy mock token contracts. This will be used for testing purposes.
    const mockERC20TokenFactory = await ethers.getContractFactory("MockToken");
    const mockUSDC = await mockERC20TokenFactory.deploy("USDC", "USDC");
    const mockUSDT = await mockERC20TokenFactory.deploy("USDT", "USDT");
    const ownerPriv = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(ownerPriv!);
    const MINT_AMOUNT = ethers.parseEther("1000");
    await mockUSDC.mint(wallet.address, MINT_AMOUNT);
    await mockUSDT.mint(wallet.address, MINT_AMOUNT);
    const contractAddress = await atomicSwap.getAddress();
    const mockUSDCAddress = await mockUSDC.getAddress();
    const mockUSDTAddress = await mockUSDT.getAddress();
    await saveItemsToSetting([
      {
        title: `inChainAtomicSwap_${network.name}`,
        value: contractAddress,
      },
      {
        title: `mockUSDC_${network.name}`,
        value: mockUSDCAddress,
      },
      {
        title: `mockUSDT_${network.name}`,
        value: mockUSDTAddress,
      },
    ]);
    console.log("Deployed in-chain address:", contractAddress);
    console.log("Deployed mock usdc address:", mockUSDCAddress);
    console.log("Deployed mock usdt address:", mockUSDTAddress);
  }
);
