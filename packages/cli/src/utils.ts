import { ethers, keccak256 } from "ethers";

export function newAtomicSwapOrderID(sender: string, swapOrderCounter: number): string {
  const encoder = new ethers.AbiCoder();
  const id = keccak256(encoder.encode(["address", "uint256"], [sender, swapOrderCounter]));
  return id;
}

export class BlockTimer {
  protected provider: ethers.JsonRpcProvider;
  constructor(providerUrl: string) {
    this.provider = new ethers.JsonRpcProvider(providerUrl);
  }
  async Now() {
    const blockNumber = await this.provider.getBlockNumber();
    return (await this.provider.getBlock(blockNumber)).timestamp;
  }
  async BeforeSeconds(sec: number) {
    const blockNumber = await this.provider.getBlockNumber();
    const now = (await this.provider.getBlock(blockNumber)).timestamp;
    return now - sec;
  }
  async AfterSeconds(sec: number) {
    const blockNumber = await this.provider.getBlockNumber();
    const now = (await this.provider.getBlock(blockNumber)).timestamp;
    return now + sec;
  }
  Delay(sec: number) {
    return new Promise((resolve) => setTimeout(resolve, sec));
  }
}
