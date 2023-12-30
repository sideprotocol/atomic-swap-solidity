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
    "executeSwap",
    "Execute a token swap with a permit",
    {
      tokenA: { type: "string", demandOption: true, describe: "Amount of token A" },
      tokenB: { type: "string", demandOption: true, describe: "Amount of token B" },
      chain: { type: "string", demandOption: true, describe: "Chain Name" },
    },
    async (args) => {
      const providerUrl = process.env.PROVIDER_URL!; // Ensure you have the PROVIDER_URL in your .env

      const cli = new AtomicSwapCli(makerPriv, takerPriv, bidderPriv, providerUrl);
      try {
        await cli.executeSwap(BigInt(args.tokenA), BigInt(args.tokenB), args.chain);
      } catch (error) {
        console.error("Error executing swap:", error);
      }
    }
  )
  .help().argv;
