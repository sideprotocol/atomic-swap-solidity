import dotenv from "dotenv";
import { saveItemsToSetting } from "../utils/utils";
import { task } from "hardhat/config";
dotenv.config();

task("deploy:vault", "deploy vault contract").setAction(
  async ({}, { ethers, network }) => {
    //deploy contracts
    const admin = process.env.ADMIN;
    // AtomicSwap contract deploy
    const vaultFactory = await ethers.getContractFactory("Vault");
    // deploy contract
    const vault = await vaultFactory.deploy("SideVault");
    const vaultContractAddress = await vault.getAddress();
    await saveItemsToSetting([
      {
        title: `vault_${network.name}`,
        value: vaultContractAddress,
      },
    ]);
    console.log("Deployed vault address:", vaultContractAddress);
  },
);
