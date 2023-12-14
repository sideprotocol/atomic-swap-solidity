### Motivation

Referring to the EIP2612 specification, we implement a higher-level authorized transaction model within the contract, supporting users to pledge assets to the contract, including erc20 tokens and native tokens, realizing off-chain pending orders and bidding, and on-chain execution of transactions, and exempting the transaction gas fee.

Additions to the specification of `InchainAtomicSwap`.

### Definitions

- `Trading Balance`: The balance of the user's asset tokens within the contract.
- `Wallet Balance`: The balance of the user's asset tokens within the wallet address.
- `Pledge`: The user deposits asset tokens into the `Trading Balance`.
- `Withdrawal`: The user withdraws the asset tokens within the `Trading Balance` to the `Wallet Balance`.
- `Permit`: The user's authorized signature for a specific transaction, including transaction currency, quantity, and price.

### Atomic Swap Order Process

### Pledge to Trading Balance

1. The user pledges assets to Trading Balance in Contract before Atomic Swap Process.

#### Make a swap

1. A maker creates an order with `Sell Token` and `Buy Token`, and sends Order data to backend database off-chain.
2. The maker signs the signature for this order and sends it to our backend database.
3. The amount of `Sell Token` cannot exceed the maker's trading balance.

#### Cancel a swap

1. A maker can cancel a previously created order.
2. When canceling an order, there is no interaction with the chain, we simply update the order status to `canceled` and void the user signature.

#### When swap expired

1. When an order expires, the system will automatically update the order status to Expired and disable any other action.
2. When an order expires, its bids and vestings will be updated to Expired also.
3. All of the above operations are executed off-chain without any transaction fees.

#### Taking a swap

1. A taker can take an order by sending a `TakeSwap` transaction.
2. The taker should sign a signature to take this order.
3. The backend system sends the order data, maker's signature to the taker, and the taker submits `TakeSwap` request to Contract.
4. The contract completes the verification of the user's signature and executes the order transaction.
5. After completion of the transaction, the contract transfers `Sell Token` to Taker's trading balance, and transfers `Buy Token` to Maker's trading balance, and charges the fees.
6. Only the order with status `INITIAL` can be taken successfully.

### Bid process

#### Place Bid

1. The user pledges a certain number of tokens in the contract.
2. The user submits a bid request off-chain, and signs a signature for this bid transaction.
3. Bidder sends the bid data and signature to our backend database.
4. The amount of Bid cannot exceed the user's trading balance.

#### Cancel Bid

1. Unaccepted bids can be canceled by the bidder.
2. Bid can be canceled by the bidder, but not by the maker.
3. When canceling a bid, there is no interaction with the chain, we simply update the bid status to `canceled` and void the user signature.

#### Update Bid

1. The bidder can increase the `bidAmount` by sending an update request to backend service.
2. Only active bids can be updated.
3. The bidder should send a higher amount to backend service.
4. The latest bidder amount cannot exceed the bidder's trading balance.

#### When bid expired

1. When a bid expires, the system will automatically update the bid status to Expired and disable any other action.
2. All of the above bid operations are executed off-chain without any transaction fees.

#### Accept Bid

1. The order maker is able to accept any bid, even if the bid is not the highest bid.
2. When a bid is accepted by the maker, the backend system will send the order data, the bid data, maker's signature and bidder's signature to the maker, and the maker submits `AcceptBid` request to contract.
3. The contract checks the data and signatures to complete the transaction.
4. When a transaction is completed, the contract transfers `Sell Token` to the bidder's trading balance, and transfers `Buy Token` to Maker's trading balance, and charges the fees.
5. The Status of order changes to `COMPLETED`.
6. The Status of the accepted bid changes to `ACCEPTED`, the others bids change to `NOT SELECTED`.

### Withdrawal from Trading Balance

1. When needed, the user can withdraw assets from the trading balance, to the wallet address.


### Data structure

- Order:

```ts
interface AtomicSwapOrder {
  id: string;
  status: OrderStatus;
  maker: string;
  desiredTaker: string;
  taker: string;
  sellToken: Coin;
  buyToken: Coin;
  acceptBid: boolean;
  minBidAmount: number;
  createdAt: number;
  expiredAt: number;
}

interface Bid {
  orderId: string;
  status: BidStatus;
  bidder: string;
  amount: number;
  receiveTimestamp: number;
  expireTimestamp: number;
}

```

### Permit process

```solidity

struct TakeSwapMsg {
  AtomicSwapOrder order;
  bytes32 makerSignature;
  address takerReceiver;
}

function takeSwap(
  TakeSwapMsg calldata takeswap
) external {
  // ...

  verifyMakerSignature(takeswap.order, takeswap.makerSignature);

  // ...
}

function verifyMakerSignature(
  AtomicSwapOrder order,
  bytes32 signature
) external {
  ...
  (v,r,s)= splitSignature(signature);
  bytes32 orderHash =  _makeOrderHash(order);
  require(order.maker == ecrecover(orderHash, v, r, s), "invalid signature");
  ...
  // ... check order parameters
}

function _makeOrderHash(
  AtomicSwapOrder order
) private {
  return keccak256(abi.encode(
    order.id,
    order.maker,
    order.sellToken.token,
    order.sellToken.amount,
    order.desiredTaker,
    order.buyToken.token,
    order.buyToken.amount,
    order.acceptBid,
    order.minBidAmount,
    order.createdAt,
    order.expiredAt
  ));
}

function _makeBidHash(
  Bid bid
) private {
  return keccak256(abi.encode(
    bid.orderId,
    bid.bidder,
    bid.amount,
    bid.receiveTimestamp,
    bid.expireTimestamp
  ));
}

```
