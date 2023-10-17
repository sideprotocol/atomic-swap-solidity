# How to Use CLI Application

This guide will walk you through the steps necessary to set up and use our CLI application.

## Prerequisites

Before starting, ensure you have the following:

1. A text editor of your choice.
2. Access to the relevant Ethereum private keys.
3. The provider URL where your contract is deployed.

## Setting Up Environment Variables

Environment variables provide a way to configure the behavior of your application without altering code. Follow these steps to set them up:

### 1. Create an `.env` File:

Inside the root directory of the project, create a file named `.env`.

### 2. Populate the `.env` File:

Refer to the `.env.example` file that comes with the project. This file contains sample environment variable configurations. Copy the format from `.env.example` to your `.env` file and replace placeholder values with your actual data.

### 3. Recommendations:

- Use different Ethereum private keys for the maker, taker, and bidder. This is crucial for security and functional separation.
- Make sure the provider URL in your `.env` file matches the network where your contract is deployed. For instance, if you've deployed your contract on the Ropsten testnet, ensure you use the Ropsten testnet provider URL.

### 4. Command Line Examples

- `Make Swap`
  `yarn start makeSwap --tokenA "10" --tokenB "5" --acceptBid false`
  it will provide similar results if you succeeded the tx.

  ````txHash:==> 0x7009b60ef7aca6fb6e3dbdfeb156b3ad64ca242a11371b566e5537dc163c2be7
  id:==> 0x8448ad957edbdb22004bda794403a1ba0074a675d31ba359581582e5568a9039```
  ````

- `TakeSwap`
  `yarn start takeSwap --orderID "yourOrderID" --receiver "yourReceiverAddress"`
  sample:
  `yarn start takeSwap --orderID 0x8448ad957edbdb22004bda794403a1ba0074a675d31ba359581582e5568a9039`
  can select receiver address. if don't select, it will be same with `taker`.

  expected result:

  ````txHash:==> 0x6a7d81466e880d78c2abd94971abe8965ffd66d743cd59bd5b4515c3d9acb2f9
  maker:==> 0x02c6723A6007076079d384cB22b09915F2AD3232
  taker:==> 0x0000000000000000000000000000000000000000
  id:==> 0x243a40aaf054b8472d994a015dca977891b7067f2847c9194d98a089522520ea```
  ````
