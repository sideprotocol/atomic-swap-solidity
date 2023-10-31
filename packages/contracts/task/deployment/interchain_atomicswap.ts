import dotenv from "dotenv";
import { saveItemsToSetting } from "../utils/utils";
import { task } from "hardhat/config";
import { Settings } from "@sideprotocol/contracts-typechain";
import { getChainInfo } from "../utils/const";

task("deploy:inter-chain:lib", "deploy libraries")
  .addOptionalParam("f", "force write")
  .setAction(async ({ f }, { ethers, upgrades, network }) => {
    // AtomicSwap contract deploy
    // deploy libraries
    let atomicSwapHelperAddress = Settings.atomicSwapHelper;
    let atomicSwapMsgValidatorAddress = Settings.atomicSwapMsgValidator;
    let interchainAtomicSwapLogicAddress = Settings.interchainAtomicSwapLogic;
    if (f) {
      const atomicSwapHelperFactory = await ethers.getContractFactory(
        "AtomicSwapHelper"
      );
      const atomicSwapHelper = await atomicSwapHelperFactory.deploy();
      const atomicSwapMsgValidatorFactory = await ethers.getContractFactory(
        "AtomicSwapMsgValidator"
      );
      const atomicSwapMsgValidator =
        await atomicSwapMsgValidatorFactory.deploy();
      const ITCAtomicSwapLogicFactory = await ethers.getContractFactory(
        "InterchainAtomicSwapLogic"
      );
      const interchainAtomicSwapLogic =
        await ITCAtomicSwapLogicFactory.deploy();

      atomicSwapHelperAddress = await atomicSwapHelper.getAddress();
      atomicSwapMsgValidatorAddress = await atomicSwapMsgValidator.getAddress();
      interchainAtomicSwapLogicAddress =
        await interchainAtomicSwapLogic.getAddress();

      await saveItemsToSetting([
        {
          title: `atomicSwapHelper_${network.name}`,
          value: atomicSwapHelperAddress,
        },
        {
          title: `atomicSwapMsgValidator_${network.name}`,
          value: atomicSwapMsgValidatorAddress,
        },
        {
          title: `interchainAtomicSwapLogic_${network.name}`,
          value: interchainAtomicSwapLogicAddress,
        },
      ]);
    }

    console.log(`atomicSwapHelper_${network.name}`, atomicSwapHelperAddress);
    console.log(
      `atomicSwapMsgValidator_${network.name}`,
      atomicSwapMsgValidatorAddress
    );
    console.log(
      `interchainAtomicSwapLogic_${network.name}`,
      interchainAtomicSwapLogicAddress
    );
  });

task("deploy:inter-chain:contract", "deploy contracts")
  //.addParam("chainID", "network chainID in layer zero")
  //.addParam("lzEndpoint", "layer zero endpoint address")
  .addOptionalParam("f", "force write")
  .setAction(async ({ f }, { ethers, upgrades, network }) => {
    const admin = process.env.ADMIN;
    const treasury = process.env.TREASURY;
    const sellTokenFeeRate = process.env.SELL_TOKEN_FEE_RATE;
    const buyTokenFeeRate = process.env.BUY_TOKEN_FEE_RATE;

    const chainInfo = getChainInfo(network.name);
    if (chainInfo == null) {
      console.error(
        "Doesn't support network chain. Please check chain information"
      );
      return;
    }
    console.log("chainInfo", chainInfo);
    // AtomicSwap contract deploy
    // deploy libraries
    let atomicSwapHelperAddress = Settings.atomicSwapHelper;
    let atomicSwapMsgValidatorAddress = Settings.atomicSwapMsgValidator;
    let interchainAtomicSwapLogicAddress = Settings.interchainAtomicSwapLogic;
    if (f) {
      const atomicSwapHelperFactory = await ethers.getContractFactory(
        "AtomicSwapHelper"
      );
      const atomicSwapHelper = await atomicSwapHelperFactory.deploy();
      const atomicSwapMsgValidatorFactory = await ethers.getContractFactory(
        "AtomicSwapMsgValidator"
      );
      const atomicSwapMsgValidator =
        await atomicSwapMsgValidatorFactory.deploy();
      const ITCAtomicSwapLogicFactory = await ethers.getContractFactory(
        "InterchainAtomicSwapLogic"
      );
      const interchainAtomicSwapLogic =
        await ITCAtomicSwapLogicFactory.deploy();

      atomicSwapHelperAddress = await atomicSwapHelper.getAddress();
      atomicSwapMsgValidatorAddress = await atomicSwapMsgValidator.getAddress();
      interchainAtomicSwapLogicAddress =
        await interchainAtomicSwapLogic.getAddress();

      await saveItemsToSetting([
        {
          title: "atomicSwapHelper",
          value: atomicSwapHelperAddress,
        },
        {
          title: "atomicSwapMsgValidator",
          value: atomicSwapMsgValidatorAddress,
        },
        {
          title: "interchainAtomicSwapLogic",
          value: interchainAtomicSwapLogicAddress,
        },
      ]);
    }

    console.log("atomicSwapHelper", atomicSwapHelperAddress);
    console.log("atomicSwapMsgValidator", atomicSwapMsgValidatorAddress);
    console.log("interchainAtomicSwapLogic", interchainAtomicSwapLogicAddress);

    // bridge contract deployment
    const sideBridgeFactory = await ethers.getContractFactory(
      "SideLzAppUpgradable"
    );

    if (!ethers.isAddress(chainInfo.endpoint)) {
      return new Error("Invalid endpoint address");
    }

    const sideBridge = await upgrades.deployProxy(
      sideBridgeFactory,
      [admin, chainInfo.endpoint],
      {
        initializer: "initialize",
      }
    );

    const sideBridgeAddress = await sideBridge.getAddress();

    // Deploy libraries
    // AtomicSwap contract deploy
    const interChainAtomicSwapFactory = await ethers.getContractFactory(
      "InterchainAtomicSwap",
      {
        libraries: {
          AtomicSwapHelper: atomicSwapHelperAddress,
          AtomicSwapMsgValidator: atomicSwapMsgValidatorAddress,
          InterchainAtomicSwapLogic: interchainAtomicSwapLogicAddress,
        },
      }
    );

    const initialAParams = {
      admin: admin,
      chainID: chainInfo.chainId,
      bridge: sideBridgeAddress,
      treasury: treasury,
      sellerFee: sellTokenFeeRate,
      buyerFee: buyTokenFeeRate,
    };

    const InterChainAtomicSwap = await upgrades.deployProxy(
      interChainAtomicSwapFactory,
      [initialAParams],
      {
        initializer: "initialize",
        unsafeAllowLinkedLibraries: true,
      }
    );
    const InterChainAtomicSwapAddress = await InterChainAtomicSwap.getAddress();
    await saveItemsToSetting([
      { title: "interChainAtomicSwap", value: InterChainAtomicSwapAddress },
    ]);
    console.log("interChainAtomicSwap:", InterChainAtomicSwapAddress);
  });

task("deploy:inter-chain:setTrust", "set trust remote contract address")
  //.addParam("chainID", "network chainID in layer zero")
  //.addParam("lzEndpoint", "layer zero endpoint address")
  .addOptionalParam("f", "force write")
  .setAction(async ({ f }, { ethers, upgrades, network }) => {
    const admin = process.env.ADMIN;
    const treasury = process.env.TREASURY;
    const sellTokenFeeRate = process.env.SELL_TOKEN_FEE_RATE;
    const buyTokenFeeRate = process.env.BUY_TOKEN_FEE_RATE;

    const chainInfo = getChainInfo(network.name);
    if (chainInfo == null) {
      console.error(
        "Doesn't support network chain. Please check chain information"
      );
      return;
    }
    console.log("chainInfo", chainInfo);
    // AtomicSwap contract deploy
    // deploy libraries
    let atomicSwapHelperAddress = Settings.atomicSwapHelper;
    let atomicSwapMsgValidatorAddress = Settings.atomicSwapMsgValidator;
    let interchainAtomicSwapLogicAddress = Settings.interchainAtomicSwapLogic;
    if (f) {
      const atomicSwapHelperFactory = await ethers.getContractFactory(
        "AtomicSwapHelper"
      );
      const atomicSwapHelper = await atomicSwapHelperFactory.deploy();
      const atomicSwapMsgValidatorFactory = await ethers.getContractFactory(
        "AtomicSwapMsgValidator"
      );
      const atomicSwapMsgValidator =
        await atomicSwapMsgValidatorFactory.deploy();
      const ITCAtomicSwapLogicFactory = await ethers.getContractFactory(
        "InterchainAtomicSwapLogic"
      );
      const interchainAtomicSwapLogic =
        await ITCAtomicSwapLogicFactory.deploy();

      atomicSwapHelperAddress = await atomicSwapHelper.getAddress();
      atomicSwapMsgValidatorAddress = await atomicSwapMsgValidator.getAddress();
      interchainAtomicSwapLogicAddress =
        await interchainAtomicSwapLogic.getAddress();

      await saveItemsToSetting([
        {
          title: "atomicSwapHelper",
          value: atomicSwapHelperAddress,
        },
        {
          title: "atomicSwapMsgValidator",
          value: atomicSwapMsgValidatorAddress,
        },
        {
          title: "interchainAtomicSwapLogic",
          value: interchainAtomicSwapLogicAddress,
        },
      ]);
    }

    console.log("atomicSwapHelper", atomicSwapHelperAddress);
    console.log("atomicSwapMsgValidator", atomicSwapMsgValidatorAddress);
    console.log("interchainAtomicSwapLogic", interchainAtomicSwapLogicAddress);

    // bridge contract deployment
    const sideBridgeFactory = await ethers.getContractFactory(
      "SideLzAppUpgradable"
    );

    if (!ethers.isAddress(chainInfo.endpoint)) {
      return new Error("Invalid endpoint address");
    }

    const sideBridge = await upgrades.deployProxy(
      sideBridgeFactory,
      [admin, chainInfo.endpoint],
      {
        initializer: "initialize",
      }
    );

    const sideBridgeAddress = await sideBridge.getAddress();

    // Deploy libraries
    // AtomicSwap contract deploy
    const interChainAtomicSwapFactory = await ethers.getContractFactory(
      "InterchainAtomicSwap",
      {
        libraries: {
          AtomicSwapHelper: atomicSwapHelperAddress,
          AtomicSwapMsgValidator: atomicSwapMsgValidatorAddress,
          InterchainAtomicSwapLogic: interchainAtomicSwapLogicAddress,
        },
      }
    );

    const initialAParams = {
      admin: admin,
      chainID: chainInfo.chainId,
      bridge: sideBridgeAddress,
      treasury: treasury,
      sellerFee: sellTokenFeeRate,
      buyerFee: buyTokenFeeRate,
    };

    const InterChainAtomicSwap = await upgrades.deployProxy(
      interChainAtomicSwapFactory,
      [initialAParams],
      {
        initializer: "initialize",
        unsafeAllowLinkedLibraries: true,
      }
    );
    const InterChainAtomicSwapAddress = await InterChainAtomicSwap.getAddress();
    await saveItemsToSetting([
      { title: "interChainAtomicSwap", value: InterChainAtomicSwapAddress },
    ]);
    console.log("interChainAtomicSwap:", InterChainAtomicSwapAddress);
  });
