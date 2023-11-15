import * as dotenv from "dotenv";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-chai-matchers";
import "hardhat-contract-sizer";

dotenv.config();

import "./task/deployment/inchain_atomicswap";
import "./task/deployment/interchain_atomicswap";
import "./task/deployment/vesting";
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
      },
    ],
    settings: {
      metadata: {
        bytecodeHash: "none",
      },
      optimizer: {
        enabled: true,
        runs: 1000,
      },
      diagnostics: {
        overwriteStack: true,
      },
    },
  },
  paths: {
    root: "./",
    cache: "./build/cache",
    artifacts: "../contracts-typechain/abi",
  },
  typechain: {
    outDir: "../contracts-typechain/typechain",
    target: "ethers-v6",
  },
  networks: {
    hardhat: {
      forking: {
        url: process.env.MAINNET_URL || "",
      },
    },
    sepolia: {
      url: process.env.TESTNET_URL,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    mumbai: {
      url: process.env.MUMBAI_URL,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    bnb: {
      url: process.env.BNB_TESTNET_URL,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY!,
      sepolia: process.env.ETHERSCAN_API_KEY!,
      bscTestnet: process.env.BNBSCAN_API_KEY!,
      polygon: process.env.POLYGON_API_KEY!,
      polygonMumbai: process.env.POLYGON_API_KEY!,
    },
    // additionalNetworks: {
    //   bnb: process.env.ETHERSCAN_API_KEY,
    //   fantom: "YOUR_FTMSCAN_API_KEY",
    // },
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
};

export default config;
