import { ZeroAddress, ethers } from "ethers";
import {
  Settings,
  CONSTANTS,
  MockToken__factory,
  ecdsa,
  VaultPermit__factory,
} from "@sideprotocol/contracts-typechain";
import { InchainAtomicSwap__factory } from "@sideprotocol/contracts-typechain";

import { BlockTimer, generateAgreement, setupSwapPermitPayload } from "./utils";
const vaultName = "SideVault";
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

  async executeSwap(tokenA: bigint, tokenB: bigint, chain: string) {
    const atomicSwap = InchainAtomicSwap__factory.connect(Settings.inChainAtomicSwap_sepolia, this.maker);
    const usdc = MockToken__factory.connect(Settings.mockUSDC_sepolia, this.maker);
    const usdt = MockToken__factory.connect(Settings.mockUSDT_sepolia, this.taker);
    const vault = VaultPermit__factory.connect(Settings.vault_sepolia, this.maker);
    const chainInfo = CONSTANTS.getChainInfo(chain);
    await usdc.mint(this.maker.address, tokenA);
    await usdt.mint(this.taker.address, tokenB);

    await usdc.approve(await atomicSwap.getAddress(), tokenA);
    const usdcAddress = await usdc.getAddress();
    const usdtAddress = await usdt.getAddress();
    const atomicSwapAddress = await atomicSwap.getAddress();

    const minBidAmount = (tokenA * BigInt(80)) / BigInt(100);
    const swapPermitPayload = setupSwapPermitPayload(
      usdcAddress,
      usdtAddress,
      this.taker.address,
      tokenA,
      tokenB,
      minBidAmount
    );
    const deadline = BigInt(await this.timer.AfterSeconds(100000));

    // Deposit
    await vault.connect(this.maker).deposit(swapPermitPayload.sellToken.token, swapPermitPayload.sellToken.amount, {
      value: swapPermitPayload.sellToken.token == ZeroAddress ? swapPermitPayload.sellToken.amount : 0,
    });
    await vault.connect(this.taker).deposit(swapPermitPayload.buyToken.token, swapPermitPayload.buyToken.amount);


    
    const { sellerAgreement, buyerAgreement } = generateAgreement(
      swapPermitPayload,
      this.maker.address,
      this.taker.address
    );
    const { signature: sellerSignature } = await ecdsa.createPermitSignature({
      tokenName: vaultName,
      contractAddress: await vault.getAddress(),
      chainId: chainInfo.chainId,
      author: this.maker,
      spender: atomicSwapAddress,
      value: swapPermitPayload.sellToken.amount,
      agreement: sellerAgreement,
      deadline,
    });

    const sellerSig = ethers.Signature.from(sellerSignature);
    swapPermitPayload.sellerSignature = {
      deadline,
      v: sellerSig.v,
      r: sellerSig.r,
      s: sellerSig.s,
      owner: this.maker.address,
    };

    const { signature: buyerSignature } = await ecdsa.createPermitSignature({
      tokenName: vaultName,
      contractAddress: await vault.getAddress(),
      chainId: chainInfo.chainId,
      author: this.taker,
      spender: atomicSwapAddress,
      value: swapPermitPayload.buyToken.amount,
      agreement: buyerAgreement,
      deadline,
    });
    const buyerSig = ethers.Signature.from(buyerSignature);
    swapPermitPayload.buyerSignature = {
      deadline,
      v: buyerSig.v,
      r: buyerSig.r,
      s: buyerSig.s,
      owner: this.taker.address,
    };

    //const estimateGas = await atomicSwap.executeSwapWithPermit.estimateGas(swapPermitPayload, []);
    //console.log("estimateGas:", estimateGas);
    //const tx = await atomicSwap.executeSwapWithPermit(swapPermitPayload, []);
    //await this.log(AtomicSwapMsgType.MAKE_SWAP, tx);
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

  // queries
  async getOrder(chain: string, orderID: string) {
    console.log("contract address:", Settings[`inChainAtomicSwap_${chain}`]);
    const srcContractAddress = Settings[`inChainAtomicSwap_${chain}`];

    const atomicSwap = InchainAtomicSwap__factory.connect(srcContractAddress, this.maker);
    console.log("order", orderID);
    const order = await atomicSwap.swapOrder(orderID);
    console.log("newOrder", order);
  }
}
