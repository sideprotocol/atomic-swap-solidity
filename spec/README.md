### Motivation
Our goal is to create a contract that enables users to trade their tokens smoothly and securely.

### Definitions

- `Atomic Swap`: Think of it as a token trade that's quite straightforward – it either goes through as planned or doesn't happen at all. There are no other outcomes.
- `Order`: This is when a user proposes a trade, saying, "I'm willing to exchange a certain amount of token A for a certain amount of token B." To ensure safety, the tokens involved are kept secure within the contract until the trade is finalized.
- `Maker`: The maker is the user who initiates the trade, taking the first step in the process.
- `Taker`: The taker, on the other hand, is the user who responds to an existing trade, essentially becoming the trade's counterpart.
- `Bid`: Here, the taker has the option to make a different offer on the maker's original trade. For instance, if User A offers to trade X amount of token A for Y amount of token B, User B can make a bid, suggesting to trade X for Y minus 10. This introduces some flexibility into the trading process.

### Objectives

- `Permissionless`: The system operates without the involvement of third parties or any form of control over funds and transactions.
Guarantee of Desired Exchange: Users can trust that the contract ensures a fair exchange, preventing instances where a user receives tokens without the corresponding promised exchange.
- `Escrow Enabled`: The contract is equipped with an escrow mechanism, securely holding tokens to facilitate exchanges.
- `Refundable`: Tokens are refundable from the escrow under specific conditions, such as timeouts or order/bid cancellations.
- `Order Cancellation`: Users have the flexibility to cancel orders at any time, provided they have not yet been taken.
- `Atomicity`: The contract guarantees that each token exchange is an all-or-nothing affair, either being a complete success or an utter failure, with no middle ground.
- `Bid Management`: To create a system that enables users to actively bid on existing orders, granting makers the freedom to select bids of their preference for order completion.

### User roles

 - Maker: The maker is the user who initiates the trade, taking the first step in the process.
 - Taker: The taker,on the other hand, is the user who responds to an existing trade, essentially becoming the trade's counterpart.
 - Bidder: The taker who offer a different price for an order.

### Order creation and execution

#### Making a swap

1. A maker creates an order transaction with selling tokens and the price. 
2. The maker's sell tokens are sent to the escrow address owned by the contract. 
3. The order is saved in contract.
4. In the event of an order expiration, a refund of the tokens held in escrow will be initiated. However, it's important to note that the user must manually trigger this refund process through a "cancelswap" operation, as the contract does not automatically execute it.

#### Taking a swap

1. A taker takes an order by sending a `TakeSwap` transaction for a specific order. 
2. The taker's sell tokens are sent to the escrow address owned by the contract. 
3. If  the taker's offered price matches the price specified in the order, the contract facilitates the exchange by transferring the maker's selling tokens to the taker and the taker's selling tokens to the maker. However, if the prices do not align, the contract will reject the "TakeSwap" transaction and promptly refund the taker's tokens.
4. An order cannot be taken if the current time is later than the `expirationTimestamp`.


#### Cancelling a swap

1.  A maker cancels a previously created order. Expired orders can also be cancelled.
2.  An order can only be cancelled once. 
3.  Tokens should be refunded when order is cancelled.
4.  An order can be cancelled by the maker at any time, even if there are outstanding, incomplete bidding orders associated with it. 
5.  Maker should not be able to accept a bid order if the order has been canceled.

### Data struct and types

 -  Order: 
```ts
pub struct AtomicSwapOrder {
    pub id: String,
    pub maker: MakeSwapMsg,
    pub status: Status,
    pub taker: Option<TakeSwapMsg>,
    pub highestBid: String,
    // In seconds
    pub createTimestamp: u64,
    pub cancelTimestamp: Option<Timestamp>,
    pub completeTimestamp: Option<Timestamp>,
}
```

 - Make Transaction
```ts
interface MakeSwapMsg {
  // the tokens to be exchanged
  sellToken: Coin
  buyToken: Coin
  // the maker's address
  makerAddress: string
  // if desiredTaker is specified,
  // only the desiredTaker is allowed to take this order
  // this is the address on the taker chain
  desiredTaker: string
  creationTimestamp: uint64
  expirationTimestamp: uint64
}
```
 - Take Transaction
```ts
interface TakeSwapMsg {
  orderId: string
  // the tokens to be sold
  sellToken: Coin
  // the taker's address
  takerAddress: string
  creationTimestamp: uint64
}
```
 - Cancel Transaction
```ts
interface CancelSwapMsg {
  orderId: string
  makerAddress: string
}
```

### Bid process

** Properties **:

 - Anyone can bid for any open orders. if the order has specified desired recipient, then only he can bid for this old.
- bids must adhere to the following rules:
  - The bid price should be greater than 0 and less than the price specified in the order. Makers can also set a minimum price for their tokens, e.g., a minimum price for token X: 100.
  - Bidders can specify a duration for the validity of their bid. Only during this specified time window can the maker of the order accept the bid.
 - Don't support partial bid for now.
 - Unfinished bid orders are allowed to claim their assets back.

** Process **

 - Taker pick a order (he is interested), 
 - The taker proceeds to input their desired price and a specified duration, ensuring it meets or exceeds the minimum limit if specified.
 - Deposit required tokens
 - The taker finalizes the process by submitting their bid order.
 - The maker then receives the bid orders and evaluates whether to accept the offered price.

```ts
interface MakeBidMsg {
  orderId: string,
  status: string, // 1. waiting for accept, 2. complete, 3.cancel
  offerringToken: Coin,
  duration: u64,
  completeTimestamp: u64,
  creationTimestamp: u64
}
```

```ts
interface TakeBidMsg {
  orderId: string,
  bidder: string,
}
```

```ts
interface CancelBidMsg {
  orderId: string,
  bidder: string,
}
```
### Escrow mechanism

 - Maker send tokens to contract and locked. 
 <TODO: how solidity implement it>

### Implementation details

### Handling data for query

### Future improvements

### Conclusion
