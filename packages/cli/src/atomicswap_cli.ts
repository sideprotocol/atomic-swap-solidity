import { BigNumber, ethers } from "ethers";
import { Settings, AtomicSwap, MockToken } from "@sideprotocol/contracts-typechain";
import AtomicSwapABI from "@sideprotocol/contracts-typechain/abi/contracts/AtomicSwap.sol/AtomicSwap.json";
import MockTokenABI from "@sideprotocol/contracts-typechain/abi/contracts/mocks/MockToken.sol/MockToken.json";
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
  protected provider: ethers.providers.JsonRpcProvider;
  protected timer: BlockTimer;
  constructor(makerPriv: string, takerPriv: string, bidderPriv: string, providerUrl: string) {
    this.provider = new ethers.providers.JsonRpcProvider(providerUrl);
    this.maker = new ethers.Wallet(makerPriv, this.provider);
    this.taker = new ethers.Wallet(takerPriv, this.provider);
    this.bidder = new ethers.Wallet(bidderPriv, this.provider);
    this.timer = new BlockTimer(providerUrl);
  }

  async makeSwap(
    tokenA: BigNumber,
    tokenB: BigNumber,
    minBidAmount: BigNumber = tokenA.div(2),
    acceptBid: boolean = true,
    expireAt?: number
  ) {
    const atomicSwap = new ethers.Contract(Settings.atomicswap, AtomicSwapABI.abi, this.maker) as AtomicSwap;
    const usdc = new ethers.Contract(Settings.mockUSDC, MockTokenABI.abi, this.maker) as MockToken;
    const usdt = new ethers.Contract(Settings.mockUSDC, MockTokenABI.abi, this.taker) as MockToken;

    await usdc.mint(this.maker.address, tokenA);
    await usdt.mint(this.taker.address, tokenB);

    await usdc.approve(atomicSwap.address, tokenA);

    const orderExpireAt = expireAt ?? (await this.timer.AfterSeconds(10000));

    const payload = {
      sellToken: {
        token: Settings.mockUSDC,
        amount: tokenA,
      },
      buyToken: {
        token: Settings.mockUSDT,
        amount: tokenB,
      },
      maker: this.maker.address,
      minBidAmount: minBidAmount,
      desiredTaker: ethers.constants.AddressZero,
      expireAt: orderExpireAt,
      acceptBid: acceptBid,
    };

    const estimateGas = await atomicSwap.estimateGas.makeSwap(payload);
    const tx = await atomicSwap.makeSwap(payload, { value: estimateGas.mul(1000) });
    await this.log(AtomicSwapMsgType.MAKE_SWAP, tx);
  }

  async takeSwap(orderID: string, receiver?: string) {
    const atomicSwap = new ethers.Contract(Settings.atomicswap, AtomicSwapABI.abi, this.taker) as AtomicSwap;
    const usdt = new ethers.Contract(Settings.mockUSDC, MockTokenABI.abi, this.taker) as MockToken;

    const order = await atomicSwap.swapOrder(orderID);
    await usdt.approve(atomicSwap.address, order.buyToken.amount);
    const takerReceiver = receiver ?? this.taker.address;

    const estimateGas = await atomicSwap.estimateGas.takeSwap({
      orderID,
      takerReceiver,
    });
    const tx = await atomicSwap.takeSwap(
      {
        orderID,
        takerReceiver,
      },
      { value: estimateGas.mul(100) }
    );
    await this.log(AtomicSwapMsgType.TAKE_SWAP, tx);
  }

  async cancelSwap(orderID: string) {
    const atomicSwap = new ethers.Contract(Settings.atomicswap, AtomicSwapABI.abi, this.maker) as AtomicSwap;
    const tx = await atomicSwap.cancelSwap({
      orderID,
    });
    await this.log(AtomicSwapMsgType.CANCEL_SWAP, tx);
  }

  async placeBid(orderID: string, amount?: BigNumber, expireAt?: number) {
    const atomicSwap = new ethers.Contract(Settings.atomicswap, AtomicSwapABI.abi, this.bidder) as AtomicSwap;
    const order = await atomicSwap.swapOrder(orderID);
    const bidAmount = amount ?? order.minBidAmount;
    const bidExpireAt = expireAt ?? (await this.timer.AfterSeconds(10000));

    const bidPayload = {
      bidder: this.bidder.address,
      bidAmount: bidAmount,
      orderID: orderID,
      bidderReceiver: this.bidder.address,
      expireTimestamp: bidExpireAt,
    };
    // make bid
    const tx = await atomicSwap.placeBid(bidPayload);
    await this.log(AtomicSwapMsgType.PLACE_BID, tx);
  }

  async updateBid(orderID: string, additionalAmount?: BigNumber) {
    const atomicSwap = new ethers.Contract(Settings.atomicswap, AtomicSwapABI.abi, this.maker) as AtomicSwap;
    const updateBidAmount = additionalAmount ?? ethers.utils.parseEther("0.1");
    // make bid
    const tx = await atomicSwap.updateBid({
      orderID,
      addition: updateBidAmount,
    });
    await this.log(AtomicSwapMsgType.UPDATE_BID, tx);
  }

  async acceptBid(orderID: string) {
    // make bid
    const atomicSwap = new ethers.Contract(Settings.atomicswap, AtomicSwapABI.abi, this.maker) as AtomicSwap;
    const tx = await atomicSwap.connect(this.maker).acceptBid({
      orderID,
      bidder: this.bidder.address,
    });
    await this.log(AtomicSwapMsgType.ACCEPT_BID, tx);
  }

  async cancelBid(orderID: string) {
    const atomicSwap = new ethers.Contract(Settings.atomicswap, AtomicSwapABI.abi, this.bidder) as AtomicSwap;
    const tx = await atomicSwap.cancelBid(orderID);
    await this.log(AtomicSwapMsgType.CANCEL_BID, tx);
  }

  protected async log(msgType: AtomicSwapMsgType, tx: ethers.ContractTransaction) {
    const confirmedTx = await tx.wait();
    console.log(`==========${msgType.toString()}============\n`);
    console.log("txHash:==>", tx.hash);

    const events = confirmedTx.events;
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
