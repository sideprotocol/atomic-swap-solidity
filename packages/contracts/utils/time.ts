import { ethers } from "hardhat";
export const BlockTime = {
  Now: async () => {
    const blockNumber = await ethers.provider.getBlockNumber();
    return (await ethers.provider.getBlock(blockNumber)).timestamp;
  },
  BeforeSeconds: async (sec: number) => {
    const blockNumber = await ethers.provider.getBlockNumber();
    const now = (await ethers.provider.getBlock(blockNumber)).timestamp;
    return now - sec;
  },
  AfterSeconds: async (sec: number) => {
    const blockNumber = await ethers.provider.getBlockNumber();
    const now = (await ethers.provider.getBlock(blockNumber)).timestamp;
    return now + sec;
  },
  Delay: (sec: number) => {
    return new Promise((resolve) => setTimeout(resolve, sec));
  },
};
