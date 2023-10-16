### Motivation

Our objective is to establish a decentralized and permissionless on-chain OTC marketplace that enables secure and trust-minimized customization of trade orders. These unique features are currently unavailable through other exchanges.

### Definitions

- `Atomic Swap`: In an atomic swap, both parties lock their assets in a smart contract. If the predefined conditions are met, the contract swaps the tokens between the two parties. If the conditions are not met, the taker's request is rejected. The term "atomic" is used because the swap either successfully occurs according to the agreed terms or doesn't happen at all. 
- `Order`: An order is a request or instruction from a trader to buy or sell a particular asset at a specified price. Orders can be limit orders (with a specific price) or market orders (executed at the current market price). To ensure safety, the tokens involved in an order are kept secure within the contract until the trade is finalized.
- `Maker`: The maker is an individual or entity who initiates or creates an order to buy or sell a specific asset at a specified price. Makers provide liquidity to the market by placing orders that are not immediately matched with existing orders. 
- `Taker`: The taker is an individual or entity who matches an existing order created by a maker. Takers consume liquidity from the market by executing orders that are already on the order book.
- `Maker Token`: A maker token refers to the tokens that a `Maker` uses to create or initiate an `Order`. These tokens are placed in a smart contract until the order is matched with a taker or until the maker claims back the tokens after the order expires.
- `Desired Taker Token`: The "desired taker token" refers to the specific amount and type of tokens that a maker requires to receive from a taker in exchange for their `Maker Token` within a trade or order. 
- `Taker Token`: A taker token is the tokens that a taker uses to accept and execute an existing order created by a maker. Taker tokens are used to pay for the assets they acquire when they execute a trade. Initially, taker tokens are deposited into the smart contract by the taker and then transferred to the maker if the trade is executed successfully
- `Bid`: A bid is an order made by a trader in response to an existing order, signaling their intention to trade a specific asset at a certain price. To place a bid, the bidder must deposit the amount of tokens they are willing to pay to the smart contract. 
- `Bidder`: A bidder is an individual or entity participating who submits bids or offers to purchase a specific asset at a specified price or under certain conditions. Bidders compete with each other to secure the best possible terms for their desired transactions. A bidder may also be referred to as a `Taker` if their bid is accepted by the `Maker`.
- `Designate`: A maker is allowed to explicitly specify or select a particular counterparty (a Recipient, in the form of an address) as the exclusive taker of the order. When the `Designate` feature is enabled, only the recipient can bid on this order.
- `Recipient`: A recipient becomes the sole taker of an order when the maker designates a specific counterparty for the transaction.
- `Expiration`: Expiration refers to the predefined date and time at which an order or contract automatically becomes invalid or no longer active. Both orders initiated by `Maker` and bids submitted by `Bidder` must include an expiration date.

### Objectives

- `Permissionless`: The system operates without the need for third-party intermediaries or any form of control over funds and transactions.
- Guarantee of Desired Exchange: Users can trust that the contract ensures a fair exchange, preventing scenarios where a user receives tokens without the corresponding promised exchange.
- `Escrow Enabled`: The contract is equipped with an escrow mechanism that securely holds tokens to facilitate exchanges.
- `Refundable`: Tokens held in escrow are refundable under specific conditions, such as timeouts or order/bid cancellations.
- `Order Cancellation`: The contract guarantees that each token exchange is an all-or-nothing transaction, ensuring it either completes successfully or fails entirely, with no middle ground.
- `Bid Management`: The system enables users to actively bid on existing orders, granting makers the freedom to select bids of their preference for order completion.

### User roles

- `Maker`: The maker is an individual or entity who initiates or creates an order to buy or sell a specific asset at a specified price.
- `Taker`: The taker is an individual or entity who matches an existing order created by a maker.
- `Bidder`: A bidder is an individual or entity participating who submits bids or offers to purchase a specific asset at a specified price or under certain conditions.
- `Recipient`: A recipient becomes the sole taker of an order when the maker designates a specific counterparty for the transaction.

### Atomic Swap Order Process

#### Making a swap

1. A maker creates an order transaction with `Maker Token`.
2. The maker's `Maker Token` are sent to the contract.
3. The order is saved in contract.
4. In the event of an order expiration, a refund of the tokens held in contract will be initiated. However, it's important to note that the maker must manually trigger this refund process through a "cancelswap" operation, as the contract does not automatically execute it.

#### Taking a swap

1. A taker takes an order by sending a `TakeSwap` transaction.
2. The taker's `Taker Token` are transferred to the escrow address owned by the contract.
3. If the quantity of `Taker Token` is equal to the quantity of `Desired Taker Token`, the contract sends `Maker Token` to the taker and `Taker Token` to the maker; otherwise, it rejects the `TakeSwap` transaction.
4. An order cannot be taken if the current time is later than the `expiredAt` timestamp.

#### Cancelling a swap

1. A maker can cancel a previously created order, including expired orders.
2. An order can only be canceled once.
4. Tokens can be refunded when an order is canceled.
5. A maker can cancel an order at any time, even if there are outstanding incomplete bidding orders associated with it.
6. The maker should not be able to accept a bid order if the order has been canceled.

### Order Data struct and types

- Order:

```ts
interface Coin {
  // use symbol for native token
  // use contract address for ERC 20
  token: string;
  amount: number;
}

enum OrderStatus {
  CANCELED = 0,
  OPEN = 1,
  COMPLETED = 2,
  COMPLETED_BY_BID = 3,
}

interface AtomicSwapOrder {
  id: string;
  status: OrderStatus;
  maker: string;
  taker: string;
  makerToken: Coin;
  desiredTakerToken: Coin;
  acceptBid: boolean;
  highestBid: string;
  minBidAmount: number;
  // evm block timestamp
  createdAt: number;
  canceledAt: number;
  completedAt: number;
}
```

- Make Order

```ts
interface MakeSwapMsg {
  // the tokens to be exchanged
  makerToken: Coin; // sellToken
  desiredTakerToken: Coin; // buyToken
  // the maker's address
  maker: string;
  // if desiredTaker is specified,
  // only the desiredTaker is allowed to take this order
  // this is the address on the taker chain
  acceptBid: boolean;
  // mininum amount of desired taker token
  minBidAmount: number; 
  desiredTaker: string;
  createdAt: number;
  expiredAt: number;
}
```

- Take Order

```ts
interface TakeSwapMsg {
  orderID: string;
  // the tokens to be sold
  takerToken: Coin;
  // taker can setup custom address to receive token. we will open this for future development and integration with other protocols.
  takerReceiver: string;
  createdAt: number;
}
```

- Cancel Order

```ts
interface CancelSwapMsg {
  orderID: string;
}
```

### Bid process

#### Place Bid

- Anyone can place bids on open orders. If an order has a designated recipient, only the recipient can place bids for that order. No bid offers (except from the recipient) are allowed for this order. 
- The bid amount should be greater than the `minBidAmount` and less than the amount of `Desired Taker Token`. 
- Makers are allowed to set a minimum bid amount for their orders. For example, the minimum bid amount for token X is 100.
- Bidders should be able to specify an expiration time for their bid offers. The maker can only accept the bid within that specified time window.
- Partial bids (partially fill the order by accepting some bid orders) do not need to be supported in this version.
- The Status of bid order is `WAIT_FOR_ACCEPT`.
- The bidder should send `tokenToken` to the contract when he/she place a bid.

#### Accept Bid

 - The order maker are able to accept any bider, even the bid is not the highest bid.
 - When a bid is accept by maker, the `makerToken` will send to the recipient in the bider order. if no recipient is sepcifiled, send to the bider,
 - When a bid is accept by maker, the `tokerToken` of bid order will send to the maker of order.
 - The Status of order change from `OPEN` to `COMPLETED_BY_BID`.
 - The Status of the accepted bid change from `WAIT_FOR_ACCEPT` to `ACCEPTED`.
   
#### Cancel Bid

- Unaccepted bid orders should be claimable by the bidder. Similar to how makers need to claim their funds after canceling an order, bidders also need to manually claim back their funds.
- Bid orders can be canceled by the bidder before they expire, but not by the maker
- Only orders in `WAIT_FOR_ACCEPT` can be canceled.
- Order status change from `WAIT_FOR_ACCEPT` to `CANCELED`.
- All funds should be refunded, no extra fees(execpt gas) should be charged for canceled bid.

#### Update Bid

 - The bidder should be able to increase the `bidAmount` by sending a update msg.
 - Only the orders in `WAIT_FOR_ACCEPT` can be update.
 - the bidder should send `addition` takerToken to the contract address.
 - The latest bider amount equals the amount of order plus the `addition` of updateMsg


**Process**

- The bidder selects an order for which they want to submit a bid.
- They input a bid amount (which must be greater than `minBidAmount` and equal to or smaller than the desired amount of taker tokens) as well as an expiration time.
- The bidder submits their bid order by depositing the bid token amount into the contract.
- The maker receives the bid orders and decides whether to accept the bid order.
- If the maker accepts the bid order, the contract sends the bid token amount provided by the bidder to the maker and the amount of Maker Token provided by the maker to the bidder.

### Bid data structure

```ts

enum BidStatus {
  CANCELED = 0,
  WAITING_FOR_ACCEPT = 1,
  ACCEPTED = 2,
}

interface BidOrder {
  id: string;
  status: BidStatus;
  orderId: string;
  bidder: string;
  amount: number
  // evm block timestamp
  createdAt: number;
  canceledAt: number;
  completedAt: number;
}
```

 - Place Bid by Bidder
```ts
interface PlaceBidMsg {
  orderID: string;
  bidAmount: number;
  duration: u64;
  createdAt: u64;
}
```

- Accept Bid by Maker.
  Maker can select one of bid from the total bid list.

```ts
interface AcceptBidMsg {
  orderID: string;
  bidder: string;
}
```

- Cancel Bid by bidder.
  CancelBidMsg can be executed by bidder only.

```ts
interface CancelBidMsg {
  orderID: string;
}
```

- Update Bid by bidder.
  UpdateBidMsg can be executed by bidder only. So msg.sender will become bidder address directly.

```ts
interface UpdateBidMsg {
  orderID: string;
  addition: Coin;
}
```

- Accept Counter offer by bidder.
 
```ts
interface AcceptCounterOfferMsg {
  orderID: string;
  addition: Coin;
}
```

### Fees

- Maker fee: 0.1%
- Take fee: 0.12%
- Maker Fees are paid by the maker who makes an order. The maker fee is calculated based on the amount of tokens provided and deposited into the contract by the maker.
- Taker Fees are paid by the taker who takes an order (including bidders whose bids are accepted by the maker). The taker fee is calculated based on the amount of tokens provided and deposited into the contract by the taker.
- Fees paid by both the maker and the taker are sent to a treasury account.

### Escrow mechanism

- Maker send tokens to contract and locked.
  <TODO: how solidity implement it>

### Implementation details

### Handling data for query

 - Order List
   
   Users can query orders by their status and receive a paginated list of matching orders.
   
 - Bid List
   
   Users can query bids by orderId and receive a paginated list of matching Bids.

### Future improvements

### Conclusion
