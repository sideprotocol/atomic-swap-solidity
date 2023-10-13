import { time } from "@nomicfoundation/hardhat-network-helpers";
import { bidToDefaultAtomicOrder } from "../../utils/utils";
import { expect } from "chai";

describe("AtomicSwap: AcceptBid", () => {
  it("should accept bid with native token", async () => {
    const {
      atomicSwap,
      maker,
      orderID,
      bidAmount,
      bidder,
      payload,
      usdt,
      sellTokenFeeRate,
      buyTokenFeeRate,
      treasury,
    } = await bidToDefaultAtomicOrder(true, false);

    const sellTokenAmountAfterFee = payload.sellToken.amount
      .mul(1000 - buyTokenFeeRate)
      .div(1000);
    const sellTokenFee = payload.sellToken.amount.sub(sellTokenAmountAfterFee);

    const buyTokenAmountAfterFee = bidAmount
      .mul(1000 - sellTokenFeeRate)
      .div(1000);
    const buyTokenFee = bidAmount.sub(buyTokenAmountAfterFee);

    await expect(atomicSwap.connect(maker).acceptBid({ orderID, bidder }))
      .to.changeEtherBalance(bidder, sellTokenAmountAfterFee)
      .changeTokenBalance(usdt, maker.address, buyTokenAmountAfterFee)
      .changeEtherBalance(treasury, sellTokenFee)
      .changeTokenBalance(usdt, treasury, buyTokenFee);
  });

  it("should accept bid with erc20 token", async () => {
    const {
      atomicSwap,
      maker,
      orderID,
      usdc,
      usdt,
      bidAmount,
      bidder,
      payload,
      sellTokenFeeRate,
      buyTokenFeeRate,
      treasury,
    } = await bidToDefaultAtomicOrder(false, false);
    const sellTokenAmountAfterFee = payload.sellToken.amount
      .mul(1000 - buyTokenFeeRate)
      .div(1000);
    const sellTokenFee = payload.sellToken.amount.sub(sellTokenAmountAfterFee);

    const buyTokenAmountAfterFee = bidAmount
      .mul(1000 - sellTokenFeeRate)
      .div(1000);
    const buyTokenFee = bidAmount.sub(buyTokenAmountAfterFee);

    await expect(atomicSwap.connect(maker).acceptBid({ orderID, bidder }))
      .to.changeTokenBalance(usdt, maker.address, buyTokenAmountAfterFee)
      .changeTokenBalance(usdc, bidder, sellTokenAmountAfterFee)
      .changeTokenBalance(usdc, treasury, sellTokenFee)
      .changeTokenBalance(usdt, treasury, buyTokenFee);
  });
  it("should revert to accept bid by not maker", async () => {
    const { atomicSwap, taker, orderID, bidder } =
      await bidToDefaultAtomicOrder(true, false);

    await expect(
      atomicSwap.connect(taker).acceptBid({ orderID, bidder })
    ).to.revertedWithCustomError(atomicSwap, "UnauthorizedAcceptAction");
  });
  it("should revert to accept bid with already took bid", async () => {
    const { atomicSwap, maker, orderID, bidAmount, bidder, payload } =
      await bidToDefaultAtomicOrder(true, false);

    await expect(atomicSwap.connect(maker).acceptBid({ orderID, bidder })).not
      .to.reverted;
    await expect(
      atomicSwap.connect(maker).acceptBid({ orderID, bidder })
    ).to.revertedWithCustomError(atomicSwap, "BidNotInPlacedStatus");
  });

  it("should revert to accept bid after bid expiration", async () => {
    const { atomicSwap, maker, orderID, bidder } =
      await bidToDefaultAtomicOrder(true, false);
    await time.increase(50);
    await expect(
      atomicSwap.connect(maker).acceptBid({ orderID, bidder })
    ).to.revertedWithCustomError(atomicSwap, "BidAlreadyExpired");
  });
});
