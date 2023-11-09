import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { AtomicSwapCli } from "./src/atomicswap_cli"; // Adjust the path accordingly

import dotenv from "dotenv";
dotenv.config();

const makerPriv = process.env.MAKER_PRIV!;
const takerPriv = process.env.TAKER_PRIV!;
const bidderPriv = process.env.BIDDER_PRIV!;
//const providerUrl = process.env.PROVIDER_URL!;

yargs(hideBin(process.argv))
  .command(
    "makeSwap",
    "Make a swap",
    {
      tokenA: { type: "string", demandOption: true, describe: "Token A amount" },
      tokenB: { type: "string", demandOption: true, describe: "Token B amount" },
      minBidAmount: { type: "string", default: "", describe: "Minimum bid amount" },
      acceptBid: { type: "boolean", default: true, describe: "Accept bid or not" },
      expireAt: { type: "number", describe: "Expire time" },
    },
    async (args) => {
      const providerUrl = process.env.PROVIDER_URL!;

      const cli = new AtomicSwapCli(makerPriv, takerPriv, bidderPriv, providerUrl);
      try {
        await cli.makeSwap(
          BigInt(args.tokenA),
          BigInt(args.tokenB),
          args.minBidAmount ? BigInt(args.minBidAmount) : undefined,
          args.acceptBid,
          args.expireAt
        );
      } catch (error) {
        console.log("error", error);
      }
    }
  )
  .command(
    "InterChainMakeSwap",
    "Make a inter-chain swap",
    {
      srcChain: { type: "string", demandOption: true, describe: "source chain name" },
      targetChain: { type: "string", demandOption: true, describe: "target chain name" },
      tokenA: { type: "string", demandOption: true, describe: "Token A amount" },
      tokenB: { type: "string", demandOption: true, describe: "Token B amount" },
      minBidAmount: { type: "string", default: "", describe: "Minimum bid amount" },
      acceptBid: { type: "boolean", default: true, describe: "Accept bid or not" },
      expireAt: { type: "number", describe: "Expire time" },
    },
    async (args) => {
      const providerUrl = process.env[`PROVIDER_URL_${args.srcChain.toUpperCase()}`]!;
      const cli = new AtomicSwapCli(makerPriv, takerPriv, bidderPriv, providerUrl);
      try {
        await cli.interChainMakeSwap(
          args.srcChain,
          args.targetChain,
          BigInt(args.tokenA),
          BigInt(args.tokenB),
          args.minBidAmount ? BigInt(args.minBidAmount) : undefined,
          args.acceptBid,
          args.expireAt
        );
      } catch (error) {
        console.log("error", error);
      }
    }
  )
  .command(
    "InterChainTakeSwap",
    "Make a inter-chain swap",
    {
      orderID: { type: "string", demandOption: true, describe: "orderID" },
      chain: { type: "string", demandOption: true, describe: "chainID of taker chain" },
      receiver: { type: "string", demandOption: true, describe: "Taker Receiver address" },
    },
    async (args) => {
      const providerUrl = process.env[`PROVIDER_URL_${args.chain.toUpperCase()}`]!;
      const cli = new AtomicSwapCli(makerPriv, takerPriv, bidderPriv, providerUrl);
      try {
        await cli.interChainTakeSwap(args.orderID, args.chain, args.receiver);
      } catch (error) {
        console.log("error", error);
      }
    }
  )
  .command(
    "getOrder",
    "Get Order from contract",
    {
      chain: { type: "string", demandOption: true, describe: "source chain name" },
      orderID: { type: "string", demandOption: true, describe: "order id" },
    },
    async (args) => {
      const providerUrl = process.env.PROVIDER_URL!;

      const cli = new AtomicSwapCli(makerPriv, takerPriv, bidderPriv, providerUrl);
      try {
        await cli.getOrder(args.chain, args.orderID);
      } catch (error) {
        console.log("error", error);
      }
    }
  )
  .command(
    "takeSwap",
    "Take a swap",
    {
      orderID: { type: "string", demandOption: true, describe: "Order ID" },
      receiver: { type: "string", default: "", describe: "Receiver address" },
    },
    async (args) => {
      const providerUrl = process.env.PROVIDER_URL!;

      const cli = new AtomicSwapCli(makerPriv, takerPriv, bidderPriv, providerUrl);
      await cli.takeSwap(args.orderID, args.receiver == "" ? undefined : args.receiver);
    }
  )
  .command(
    "cancelSwap",
    "Cancel a swap",
    {
      orderID: { type: "string", demandOption: true, describe: "Order ID" },
    },
    async (args) => {
      const providerUrl = process.env.PROVIDER_URL!;

      const cli = new AtomicSwapCli(makerPriv, takerPriv, bidderPriv, providerUrl);
      await cli.cancelSwap(args.orderID);
    }
  )
  .command(
    "placeBid",
    "Place a bid",
    {
      orderID: { type: "string", demandOption: true, describe: "Order ID" },
      amount: { type: "string", default: "", describe: "Bid amount" },
      expireAt: { type: "number", default: 0, describe: "Expire time" },
    },
    async (args) => {
      const providerUrl = process.env.PROVIDER_URL!;

      const cli = new AtomicSwapCli(makerPriv, takerPriv, bidderPriv, providerUrl);
      await cli.placeBid(args.orderID, BigInt(args.amount), args.expireAt);
    }
  )
  .command(
    "updateBid",
    "Update a bid",
    {
      orderID: { type: "string", demandOption: true, describe: "Order ID" },
      addition: { type: "string", default: "0.1", describe: "Bid amount" },
    },
    async (args) => {
      const providerUrl = process.env.PROVIDER_URL!;

      const cli = new AtomicSwapCli(makerPriv, takerPriv, bidderPriv, providerUrl);
      await cli.updateBid(args.orderID, BigInt(args.addition));
    }
  )
  .command(
    "acceptBid",
    "Accept a bid",
    {
      orderID: { type: "string", demandOption: true, describe: "Order ID" },
    },
    async (args) => {
      const providerUrl = process.env.PROVIDER_URL!;

      const cli = new AtomicSwapCli(makerPriv, takerPriv, bidderPriv, providerUrl);
      await cli.acceptBid(args.orderID);
    }
  )
  .command(
    "cancelBid",
    "Cancel a bid",
    {
      orderID: { type: "string", demandOption: true, describe: "Order ID" },
    },
    async (args) => {
      const providerUrl = process.env.PROVIDER_URL!;

      const cli = new AtomicSwapCli(makerPriv, takerPriv, bidderPriv, providerUrl);
      // Assuming you've added a cancelBid method to the AtomicSwapCli class
      await cli.cancelBid(args.orderID);
    }
  )
  .help().argv;
