import dotenv from "dotenv";
import { saveItemsToSetting } from "../utils/utils";
import { task } from "hardhat/config";
import {
  Settings,
  InterchainAtomicSwap__factory,
  SideLzAppUpgradable__factory,
  LZEndpointMock__factory,
  ILayerZeroEndpoint,
  LzAppUpgradeable__factory,
} from "@sideprotocol/contracts-typechain";

import { getChainInfo } from "../utils/const";

task("deploy:inter-chain:lib", "deploy libraries")
  .addOptionalParam("f", "force write")
  .setAction(async ({ f }, { ethers, upgrades, network }) => {
    // AtomicSwap contract deploy
    // deploy libraries
    let atomicSwapStateLogicAddress =
      Settings[`atomicSwapStateLogic_${network.name}` as keyof typeof Settings];
    let tokenTransferHelperAddress =
      Settings[`tokenTransferHelper_${network.name}` as keyof typeof Settings];
    let interchainAtomicSwapLogicAddress =
      Settings[
        `interchainAtomicSwapLogic_${network.name}` as keyof typeof Settings
      ];
    let atomicSwapMsgValidatorAddress =
      Settings[
        `atomicSwapMsgValidator_${network.name}` as keyof typeof Settings
      ];

    if (f) {
      const atomicSwapStateLogicFactory = await ethers.getContractFactory(
        `AtomicSwapStateLogic`
      );
      const atomicSwapStateLogic = await atomicSwapStateLogicFactory.deploy();
      atomicSwapStateLogicAddress = await atomicSwapStateLogic.getAddress();

      const tokenTransferHelperFactory = await ethers.getContractFactory(
        `TokenTransferHelper`
      );
      const tokenTransferHelper = await tokenTransferHelperFactory.deploy();
      tokenTransferHelperAddress = await tokenTransferHelper.getAddress();

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

      atomicSwapMsgValidatorAddress = await atomicSwapMsgValidator.getAddress();
      interchainAtomicSwapLogicAddress =
        await interchainAtomicSwapLogic.getAddress();

      await saveItemsToSetting([
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
        {
          title: `interchainAtomicSwapLogic_${network.name}`,
          value: interchainAtomicSwapLogicAddress,
        },
      ]);
    }

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

    let vestingAddress =
      Settings[`vesting_${network.name}` as keyof typeof Settings];

    if (!ethers.isAddress(vestingAddress)) {
      console.error("Please deploy vesting contract first of all");
      return;
    }

    let atomicSwapStateLogicAddress =
      Settings[`atomicSwapStateLogic_${network.name}` as keyof typeof Settings];
    let tokenTransferHelperAddress =
      Settings[`tokenTransferHelper_${network.name}` as keyof typeof Settings];
    let atomicSwapMsgValidatorAddress =
      Settings[
        `atomicSwapMsgValidator_${network.name}` as keyof typeof Settings
      ];
    let interchainAtomicSwapLogicAddress =
      Settings[
        `interchainAtomicSwapLogic_${network.name}` as keyof typeof Settings
      ];

    if (f) {
      const atomicSwapStateLogicFactory = await ethers.getContractFactory(
        `AtomicSwapStateLogic`
      );
      const atomicSwapStateLogic = await atomicSwapStateLogicFactory.deploy();
      atomicSwapStateLogicAddress = await atomicSwapStateLogic.getAddress();

      const tokenTransferHelperFactory = await ethers.getContractFactory(
        `TokenTransferHelper`
      );
      const tokenTransferHelper = await tokenTransferHelperFactory.deploy();
      tokenTransferHelperAddress = await tokenTransferHelper.getAddress();

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

      atomicSwapMsgValidatorAddress = await atomicSwapMsgValidator.getAddress();
      interchainAtomicSwapLogicAddress =
        await interchainAtomicSwapLogic.getAddress();

      await saveItemsToSetting([
        {
          title: `atomicSwapStateLogic_${network.name}`,
          value: atomicSwapStateLogicAddress,
        },
        {
          title: `tokenTransferHelper_${network.name}`,
          value: tokenTransferHelperAddress,
        },
        {
          title: `interchainAtomicSwapLogic_${network.name}`,
          value: interchainAtomicSwapLogicAddress,
        },
      ]);
    }

    console.log("atomicSwapStateLogic", atomicSwapStateLogicAddress);
    console.log("tokenTransfer", tokenTransferHelperAddress);
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
    await saveItemsToSetting([
      {
        title: `sideBridgeAddress_${network.name}`,
        value: sideBridgeAddress,
      },
    ]);

    console.log("Bridge", sideBridgeAddress);

    // Deploy libraries
    // AtomicSwap contract deploy
    const interChainAtomicSwapFactory = await ethers.getContractFactory(
      "InterchainAtomicSwap",
      {
        libraries: {
          AtomicSwapStateLogic: atomicSwapStateLogicAddress,
          TokenTransferHelper: tokenTransferHelperAddress,
          AtomicSwapMsgValidator: atomicSwapMsgValidatorAddress,
          InterchainAtomicSwapLogic: interchainAtomicSwapLogicAddress,
        },
      }
    );

    const initialAParams = {
      admin: admin,
      vestingManager: vestingAddress,
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
      {
        title: `interChainAtomicSwap_${network.name}`,
        value: InterChainAtomicSwapAddress,
      },
    ]);
    console.log("interChainAtomicSwap:", InterChainAtomicSwapAddress);
  });

task("deploy:inter-chain:setTrustRemote", "set trust remote contract address")
  .addParam("remote", "counter party contract address")
  .addOptionalParam("f", "force write")
  .setAction(async ({ remote, f }, { ethers, upgrades, network }) => {
    const signer = await ethers.provider.getSigner();
    const remoteChainInfo = getChainInfo(remote);
    if (!ethers.isAddress(remoteChainInfo?.endpoint)) {
      console.error("this chain doesn't supported");
      return;
    }

    const srcChainInfo = getChainInfo(network.name);
    if (!ethers.isAddress(srcChainInfo?.endpoint)) {
      console.error("this chain doesn't supported");
      return;
    }

    const sideSrcBridge =
      Settings[`sideBridgeAddress_${network.name}` as keyof typeof Settings];
    const sideRemoteBridge =
      Settings[`sideBridgeAddress_${remote}` as keyof typeof Settings];

    const sideSrcBridgeContract = SideLzAppUpgradable__factory.connect(
      sideSrcBridge,
      signer
    );

    await sideSrcBridgeContract.setTrustedRemote(
      remoteChainInfo.chainId,
      ethers.solidityPacked(
        ["address", "address"],
        [sideRemoteBridge, sideSrcBridge]
      )
    );

    // Setup to packet receivers
    const srcAtomicSwapAddress =
      Settings[`interChainAtomicSwap_${network.name}` as keyof typeof Settings];
    const remoteAtomicSwapAddress =
      Settings[`interChainAtomicSwap_${remote}` as keyof typeof Settings];

    await sideSrcBridgeContract.setPacketReceivers(
      srcAtomicSwapAddress,
      ethers.ZeroAddress
    );
  });
