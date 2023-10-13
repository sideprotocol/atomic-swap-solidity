// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Settings } from "@sideprotocol/contracts-typechain";
import { ethers, network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import {
  saveDeployedAddress,
  ERC20_MINT_AMOUNT,
  generateRandomString,
} from "../utils/utils";

//

async function main(network: string) {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  //import users
  //deploy contracts
  const sweeperFactory = await ethers.getContractFactory("Sweeper");
  const sweeper = await sweeperFactory.deploy();
  await sweeper.deployed();
  console.log("Sweeper address", sweeper.address);

  const tokens: string[] = [];
  let testAccounts: string[] = [];
  if (network === "localhost") {
    const signers = await ethers.getSigners();
    testAccounts = signers.map((acc) => acc.address);
  }
  for (let index = 0; index < 5; index++) {
    const tokenName = generateRandomString(3);
    const mockERC20Factory = await ethers.getContractFactory("MockErc20Token");
    const mockERC20Token = await mockERC20Factory.deploy(tokenName, tokenName);
    await mockERC20Token.deployed();
    tokens.push(mockERC20Token.address);
    console.log("Test ERC2Token address", mockERC20Token.address);
    if (network === "localhost") {
      await mockERC20Token.mint(testAccounts, ERC20_MINT_AMOUNT);
    }
  }
  await saveDeployedAddress(sweeper.address, tokens);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(network.name).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
