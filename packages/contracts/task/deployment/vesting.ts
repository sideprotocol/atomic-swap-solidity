import dotenv from "dotenv";
import { saveItemsToSetting } from "../utils/utils";
import { task } from "hardhat/config";
import { Settings } from "@sideprotocol/contracts-typechain";
dotenv.config();

task("deploy:vesting", "deploy vesting contract").setAction(
  async ({}, { ethers, upgrades, network }) => {
    //deploy contracts
    const admin = process.env.ADMIN;

    let vaultAddress =
      Settings[`vault_${network.name}` as keyof typeof Settings];
    if (!ethers.isAddress(vaultAddress)) {
      console.error("Invalid vault address!");
      return;
    }

    // AtomicSwap contract deploy
    const vestingFactory = await ethers.getContractFactory(`Vesting`);
    // deploy contract
    const vesting = await upgrades.deployProxy(
      vestingFactory,
      [
        admin,
        vaultAddress,
        "vSide",
        "vSide",
        "https://nft.side.market/metadata",
      ],
      {
        initializer: "initialize",
        unsafeAllowLinkedLibraries: true,
      },
    );
    const vestingContractAddress = await vesting.getAddress();

    await saveItemsToSetting([
      {
        title: `vesting_${network.name}`,
        value: vestingContractAddress,
      },
    ]);
    console.log("Deployed vesting address:", vestingContractAddress);
  },
);
