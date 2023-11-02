import { ethers } from "ethers";
import { Settings, MockToken__factory } from "@sideprotocol/contracts-typechain";
import { InchainAtomicSwap__factory } from "@sideprotocol/contracts-typechain";
import { BlockTimer } from "./utils";
const enum AtomicSwapMsgType {
  MAKE_SWAP,
  TAKE_SWAP,
  CANCEL_SWAP,
  PLACE_BID,
  UPDATE_BID,
  ACCEPT_BID,
  CANCEL_BID,
}
export class AtomicSwapCli {
  protected maker: ethers.Wallet;
  protected taker: ethers.Wallet;
  protected bidder: ethers.Wallet;
  protected provider: ethers.JsonRpcProvider;
  protected timer: BlockTimer;
  constructor(makerPriv: string, takerPriv: string, bidderPriv: string, providerUrl: string) {
    this.provider = new ethers.JsonRpcProvider(providerUrl);
    this.maker = new ethers.Wallet(makerPriv, this.provider);
    this.taker = new ethers.Wallet(takerPriv, this.provider);
    this.bidder = new ethers.Wallet(bidderPriv, this.provider);
    this.timer = new BlockTimer(providerUrl);
  }

  async makeSwap(
    tokenA: bigint,
    tokenB: bigint,
    minBidAmount: bigint = tokenA / BigInt(2),
    acceptBid: boolean = true,
    expireAt?: number
  ) {
    console.log("contract address:", Settings.inChainAtomicSwap_sepolia);
    const atomicSwap = InchainAtomicSwap__factory.connect(Settings.inChainAtomicSwap_sepolia, this.maker);
    const usdc = MockToken__factory.connect(Settings.mockUSDC_sepolia, this.maker);
    const usdt = MockToken__factory.connect(Settings.mockUSDT_sepolia, this.taker);

    await usdc.mint(this.maker.address, tokenA);
    await usdt.mint(this.taker.address, tokenB);

    await usdc.approve(await atomicSwap.getAddress(), tokenA);

    const orderExpireAt = expireAt ?? (await this.timer.AfterSeconds(10000));
    console.log("expireAt:", orderExpireAt);
    const payload = {
      sellToken: {
        token: ethers.ZeroAddress, //Settings.mockUSDC_sepolia,
        amount: tokenA,
      },
      buyToken: {
        token: Settings.mockUSDT_sepolia,
        amount: tokenB,
      },
      maker: this.maker.address,
      minBidAmount: minBidAmount,
      desiredTaker: ethers.ZeroAddress,
      expireAt: orderExpireAt,
      acceptBid: acceptBid,
    };

    const estimateGas = await atomicSwap.makeSwap.estimateGas(payload, { value: payload.sellToken.amount });
    console.log("estimateGas:", estimateGas);
    const tx = await atomicSwap.makeSwap(payload, { value: payload.sellToken.amount, gasLimit: estimateGas });
    await this.log(AtomicSwapMsgType.MAKE_SWAP, tx);
  }

  async takeSwap(orderID: string, receiver?: string) {
    const atomicSwap = InchainAtomicSwap__factory.connect(Settings.inChainAtomicSwap_sepolia, this.taker);
    const usdt = MockToken__factory.connect(Settings.mockUSDC_sepolia, this.taker);

    const order = await atomicSwap.swapOrder(orderID);
    await usdt.approve(await atomicSwap.getAddress(), order.buyToken.amount);
    const takerReceiver = receiver ?? this.taker.address;

    const estimateGas = await atomicSwap.takeSwap.estimateGas({
      orderID,
      takerReceiver,
    });
    const tx = await atomicSwap.takeSwap(
      {
        orderID,
        takerReceiver,
      },
      { value: estimateGas * BigInt(100) }
    );
    await this.log(AtomicSwapMsgType.TAKE_SWAP, tx);
  }

  async cancelSwap(orderID: string) {
    const atomicSwap = InchainAtomicSwap__factory.connect(Settings.inChainAtomicSwap_sepolia, this.maker);
    const tx = await atomicSwap.cancelSwap({
      orderID,
    });
    await this.log(AtomicSwapMsgType.CANCEL_SWAP, tx);
  }

  async placeBid(orderID: string, amount?: BigInt, expireAt?: number) {
    const atomicSwap = InchainAtomicSwap__factory.connect(Settings.inChainAtomicSwap_sepolia, this.bidder);
    const order = await atomicSwap.swapOrder(orderID);
    const bidAmount = amount ?? order.minBidAmount;
    const bidExpireAt = expireAt ?? (await this.timer.AfterSeconds(10000));

    const bidPayload = {
      bidder: this.bidder.address,
      bidAmount: bidAmount.toString(),
      orderID: orderID,
      bidderReceiver: this.bidder.address,
      expireTimestamp: bidExpireAt,
    };
    // make bid
    const tx = await atomicSwap.placeBid(bidPayload);
    await this.log(AtomicSwapMsgType.PLACE_BID, tx);
  }

  async updateBid(orderID: string, additionalAmount?: bigint) {
    const atomicSwap = InchainAtomicSwap__factory.connect(Settings.inChainAtomicSwap_sepolia, this.maker);
    const updateBidAmount = additionalAmount ?? ethers.parseEther("0.1");
    // make bid
    const tx = await atomicSwap.updateBid({
      orderID,
      bidder: this.bidder.address,
      addition: updateBidAmount,
    });
    await this.log(AtomicSwapMsgType.UPDATE_BID, tx);
  }

  async acceptBid(orderID: string) {
    // make bid
    const atomicSwap = InchainAtomicSwap__factory.connect(Settings.inChainAtomicSwap_sepolia, this.maker);
    const tx = await atomicSwap.connect(this.maker).acceptBid({
      orderID,
      bidder: this.bidder.address,
    });
    await this.log(AtomicSwapMsgType.ACCEPT_BID, tx);
  }

  async cancelBid(orderID: string) {
    const atomicSwap = InchainAtomicSwap__factory.connect(Settings.inChainAtomicSwap_sepolia, this.bidder);
    const tx = await atomicSwap.cancelBid(orderID);
    await this.log(AtomicSwapMsgType.CANCEL_BID, tx);
  }

  protected async log(msgType: AtomicSwapMsgType, tx: ethers.ContractTransactionResponse) {
    const confirmedTx = await tx.wait();
    console.log(`==========${msgType.toString()}============\n`);
    console.log("txHash:==>", tx.hash);
    const events = confirmedTx.logs;
    if (!events || events.length === 0) {
      console.log("tx:", confirmedTx);
      return;
    }

    const contractEvent = events[events.length - 1];

    switch (msgType) {
      case AtomicSwapMsgType.MAKE_SWAP:
      case AtomicSwapMsgType.CANCEL_SWAP:
        this.printEventDetail(contractEvent, ["id"]);
        break;
      case AtomicSwapMsgType.TAKE_SWAP:
        this.printEventDetail(contractEvent, ["maker", "taker", "id"]);
        break;
      case AtomicSwapMsgType.PLACE_BID:
        this.printEventDetail(contractEvent, ["maker", "taker", "id"]);
        break;
      case AtomicSwapMsgType.ACCEPT_BID:
      case AtomicSwapMsgType.UPDATE_BID:
      case AtomicSwapMsgType.CANCEL_BID:
        this.printEventDetail(contractEvent, ["orderID", "bidder", "amount"]);
        break;
      default:
        console.log("Unexpected msgType:==>", msgType);
        break;
    }
  }

  protected printEventDetail(event: any, keys: string[]) {
    keys.forEach((key) => {
      console.log(`${key}:==>`, event.args[key]);
    });
  }
}
