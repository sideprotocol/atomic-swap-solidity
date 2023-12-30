import { ethers, keccak256 } from "ethers";
import { IAtomicSwapBase as AtomicSwapBaseData } from "@sideprotocol/contracts-typechain/typechain/contracts/inchain_atomicswap/InchainAtomicSwap";
export function newAtomicSwapOrderID(sender: string, swapOrderCounter: number): string {
  const encoder = new ethers.AbiCoder();
  const id = keccak256(encoder.encode(["address", "uint256"], [sender, swapOrderCounter]));
  return id;
}

export function generateOrderID(): string {
  const uuidStr = ethers.randomBytes(32);
  const encoder = new ethers.AbiCoder();
  const id = keccak256(encoder.encode(["bytes"], [uuidStr]));
  return id;
}

export function setupSwapPermitPayload(
  sellToken: string,
  buyToken: string,
  desiredTaker: string,
  sellerAmount: bigint,
  buyerAmount: bigint,
  minBigAmount: bigint
) {
  const uuid = generateOrderID();
  const swapParams: AtomicSwapBaseData.SwapWithPermitMsgStruct = {
    uuid: uuid,
    sellToken: {
      token: sellToken,
      amount: sellerAmount,
    },
    buyToken: {
      token: buyToken,
      amount: buyerAmount,
    },
    minBidAmount: minBigAmount,
    desiredTaker,
    acceptBid: true,
    withdrawToSellerAccount: false,
    withdrawToBuyerAccount: false,
    sellerSignature: {
      v: 27 | 28,
      r: "",
      s: "",
      owner: "",
      deadline: BigInt(0),
    },
    buyerSignature: {
      v: 27 | 28,
      r: "",
      s: "",
      owner: "",
      deadline: BigInt(0),
    },
  };
  return swapParams;
}

export function generateAgreement(
  swap: AtomicSwapBaseData.SwapWithPermitMsgStruct,
  seller: string,
  buyer: string
): { sellerAgreement: string; buyerAgreement: string } {
  return {
    sellerAgreement: _generateAgreement(swap, seller),
    buyerAgreement: _generateAgreement(swap, buyer),
  };
}

function _generateAgreement(swap: AtomicSwapBaseData.SwapWithPermitMsgStruct, signer: string): string {
  const abiCoder = new ethers.AbiCoder();
  const encoded = abiCoder.encode(
    ["address", "bytes32", "tuple(address, uint256)", "tuple(address, uint256)", "address", "uint256", "bool", "bool"],
    [
      signer,
      swap.uuid, // Convert string uuid to bytes32 array
      [swap.sellToken.token, swap.sellToken.amount],
      [swap.buyToken.token, swap.buyToken.amount],
      swap.desiredTaker,
      swap.minBidAmount,
      swap.acceptBid,
      swap.withdrawToSellerAccount,
    ]
  );

  return ethers.keccak256(encoded);
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
