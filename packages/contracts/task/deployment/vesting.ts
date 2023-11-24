import dotenv from "dotenv";
import { saveItemsToSetting } from "../utils/utils";
import { task } from "hardhat/config";
import { Settings } from "@sideprotocol/contracts-typechain";
dotenv.config();

task("deploy:vesting", "deploy in chain ").setAction(
  async ({}, { ethers, upgrades, network }) => {
    //deploy contracts
    const admin = process.env.ADMIN;
    const treasury = process.env.TREASURY;
    const sellTokenFeeRate = process.env.SELL_TOKEN_FEE_RATE;
    let tokenTransferHelperAddress =
      Settings[`tokenTransferHelper_${network.name}` as keyof typeof Settings];
    if (!ethers.isAddress(tokenTransferHelperAddress)) {
      const tokenTransferHelperFactory = await ethers.getContractFactory(
        `TokenTransferHelper`
      );
      const tokenTransferHelper = await tokenTransferHelperFactory.deploy();
      tokenTransferHelperAddress = await tokenTransferHelper.getAddress();
    }

    // AtomicSwap contract deploy
    const vestingFactory = await ethers.getContractFactory(`Vesting`);
    // deploy contract
    const vesting = await upgrades.deployProxy(vestingFactory, [admin], {
      initializer: "initialize",
      unsafeAllowLinkedLibraries: true,
    });
    const vestingContractAddress = await vesting.getAddress();

    await saveItemsToSetting([
      {
        title: `vesting_${network.name}`,
        value: vestingContractAddress,
      },
    ]);
    console.log("Deployed vesting address:", vestingContractAddress);
  }
);
