import dotenv from "dotenv";
import { saveItemsToSetting } from "../utils/utils";
import { task } from "hardhat/config";
import { Settings, Vesting__factory } from "@sideprotocol/contracts-typechain";
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

    const AnteHandlerFactory = await ethers.getContractFactory(`AnteHandler`);
    const AnteHandler = await AnteHandlerFactory.deploy();
    const AnteHandlerAddress = await AnteHandler.getAddress();

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
          title: `AnteHandler_${network.name}`,
          value: AnteHandlerAddress,
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

    console.log(`AnteHandler_${network.name}`, AnteHandlerAddress);
    console.log(
      `atomicSwapMsgValidator_${network.name}`,
      atomicSwapMsgValidatorAddress
    );
  });

task("deploy:in-chain:contract", "deploy in chain ").setAction(
  async ({}, { ethers, upgrades, network }) => {
    //deploy contracts
    const admin = process.env.ADMIN;
    const privatekey = process.env.PRIVATE_KEY;
    const treasury = process.env.TREASURY;
    const sellTokenFeeRate = process.env.SELL_TOKEN_FEE_RATE;
    const buyTokenFeeRate = process.env.BUY_TOKEN_FEE_RATE;
    const deployer = new ethers.Wallet(privatekey!, ethers.provider);

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

    let AnteHandlerAddress =
      Settings[`AnteHandler_${network.name}` as keyof typeof Settings];

    if (!ethers.isAddress(AnteHandlerAddress)) {
      const AnteHandlerFactory = await ethers.getContractFactory(`AnteHandler`);
      const AnteHandler = await AnteHandlerFactory.deploy();
      AnteHandlerAddress = await AnteHandler.getAddress();
      saveItemsToSetting([
        {
          title: `AnteHandler_${network.name}`,
          value: AnteHandlerAddress,
        },
      ]);
    }

    let atomicSwapMsgValidatorAddress =
      Settings[
        `atomicSwapMsgValidator_${network.name}` as keyof typeof Settings
      ];

    if (!ethers.isAddress(AnteHandlerAddress)) {
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
          AnteHandler: AnteHandlerAddress,
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

    // atomicsSwap contract ad admin of vesting contract.
    await Vesting__factory.connect(vestingAddress, deployer).setAdmin(
      await atomicSwap.getAddress()
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
