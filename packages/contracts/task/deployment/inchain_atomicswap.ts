import dotenv from "dotenv";
import { saveItemsToSetting } from "../utils/utils";
import { task } from "hardhat/config";
import { Settings } from "@sideprotocol/contracts-typechain";
dotenv.config();
task("deploy:in-chain:lib", "deploy libraries")
  .addOptionalParam("f", "force write")
  .setAction(async ({ f }, { ethers, upgrades, network }) => {
    // deploy libraries
    const atomicSwapHelperFactory = await ethers.getContractFactory(
      "AtomicSwapHelper"
    );
    const atomicSwapHelper = await atomicSwapHelperFactory.deploy();
    const atomicSwapHelperAddress = await atomicSwapHelper.getAddress();
    await saveItemsToSetting(
      [
        {
          title: `atomicSwapHelper_${network.name}`,
          value: atomicSwapHelperAddress,
        },
      ],
      f
    );
    console.log("atomicSwapHelper", atomicSwapHelperAddress);
  });

task("deploy:in-chain:contract", "deploy in chain ").setAction(
  async ({}, { ethers, upgrades, network }) => {
    //deploy contracts
    const admin = process.env.ADMIN;
    const treasury = process.env.TREASURY;
    const sellTokenFeeRate = process.env.SELL_TOKEN_FEE_RATE;
    const buyTokenFeeRate = process.env.BUY_TOKEN_FEE_RATE;

    let atomicSwapHelperAddress =
      Settings[`atomicSwapHelper_${network.name}` as keyof typeof Settings];
    if (!ethers.isAddress(atomicSwapHelperAddress)) {
      const atomicSwapHelperFactory = await ethers.getContractFactory(
        `AtomicSwapHelper`
      );
      const atomicSwapHelper = await atomicSwapHelperFactory.deploy();
      atomicSwapHelperAddress = await atomicSwapHelper.getAddress();
    }
    // AtomicSwap contract deploy
    const atomicSwapFactory = await ethers.getContractFactory(
      `InchainAtomicSwap`,
      {
        libraries: {
          AtomicSwapHelper: atomicSwapHelperAddress,
        },
      }
    );

    // deploy contract
    const atomicSwap = await upgrades.deployProxy(
      atomicSwapFactory,
      [admin, treasury, sellTokenFeeRate, buyTokenFeeRate],
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
