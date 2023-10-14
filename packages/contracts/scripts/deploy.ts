// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Settings } from "@sideprotocol/contracts-typechain";
import { ethers, network, upgrades } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import dotenv from "dotenv";
import { saveDeployedAddress } from "../utils/utils";
dotenv.config();
async function main(network: string) {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  //import users
  //deploy contracts
  const admin = process.env.ADMIN;
  const treasury = process.env.TREASURY;
  const sellTokenRate = process.env.SELL_TOKEN_FEE_RATE;
  const buyTokenRate = process.env.BUY_TOKEN_FEE_RATE;

  // AtomicSwap contract deploy
  const atomicSwapFactory = await ethers.getContractFactory("AtomicSwap");
  const atomicSwap = await upgrades.deployProxy(
    atomicSwapFactory,
    [admin, treasury, sellTokenRate, buyTokenRate],
    {
      initializer: "initialize",
    }
  );
  console.log("contract address:", atomicSwap.address);
  await saveDeployedAddress(atomicSwap.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(network.name).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
