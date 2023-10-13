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
4. An order expiry will result in a refund of the escrowed tokens.

#### Taking a swap

1. A taker takes an order by sending a `TakeSwap` transaction. 
2. The taker's sell tokens are sent to the escrow address owned by the contract. 
3. if the taker's price is equate to order's price ,the contract sending Maker's selling tokens to taker and sending Taker's selling Token to maker. otherwise reject the take transaction and refund the taker's token.
4. An order cannot be taken if the current time is later than the `expirationTimestamp`.


#### Cancelling a swap

1.  A maker cancels a previously created order. Expired orders can also be cancelled.
2.  An Order can only be cancel once. 
3.  Tokens should be refunded when order is cancel.
4.  An order can be also cancel if there are unfinished bidding orders. 
5.  Maker can accept the bid order if the order has canceled.

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
 - bid price should great than 0 and less than order price
    - makers can set price limit for bids for their order. For example: minimum bid amount: 100
 - bider should able to specified a duration for this offering. Maker can only accept the bid in that time window.
 - Don't support partial bid for now.
 - Unfinished bid order should be allowed to claim it's assets back

** Process **

 - Taker pick a order (he is interested), 
 - Input a price and duration(should be equal or above minimum limit: if specified)
 - Deposit required tokens
 - Submit the bider order.
 - Maker receive bider orders and decide if she/he want to accept the price.

```ts
interface BidMsg {
  orderId: string,
  status: string, // 1. waiting for accept, 2. complete, 3.cancel
  offerringToken: Coin,
  duration: u64,
  completeTimestamp: u64,
  creationTimestamp: u64
}

Suggestion: We can add this step in cancel itself, cancel means remove bid and refund tokens if bid was not taken
```
```ts
interface ClaimBidMsg {
  bidId: string,
  completeTimestamp: u64,
  creationTimestamp: u64
}
```
### Escrow mechanism

 - Maker send tokens to contract and locked. 
 <TODO: how solidity implement it>

### Implementation details

### Handling data for query

### Future improvements

### Conclusion
