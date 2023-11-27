import { time } from "@nomicfoundation/hardhat-network-helpers";
import {
  bidToDefaultAtomicOrder,
  calcSwapAmount,
  getZeroAddressSigner,
} from "../../utils/utils";
import { expect } from "chai";
import { ZeroAddress } from "ethers";

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

    const sellTokenAmount = calcSwapAmount(
      payload.sellToken.amount,
      buyTokenFeeRate
    );

    const buyTokenAmount = calcSwapAmount(bidAmount, sellTokenFeeRate);

    const tx = atomicSwap.connect(maker).acceptBid({ orderID, bidder });
    await expect(tx).to.changeEtherBalance(
      bidder,
      sellTokenAmount.amountAfterFee
    );
    await expect(tx).to.changeTokenBalance(
      usdt,
      maker.address,
      buyTokenAmount.amountAfterFee
    );
    await expect(tx).to.changeEtherBalance(treasury, sellTokenAmount.feeAmount);
    await expect(tx).to.changeTokenBalance(
      usdt,
      treasury,
      buyTokenAmount.feeAmount
    );
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
    const sellTokenAmount = calcSwapAmount(
      payload.sellToken.amount,
      buyTokenFeeRate
    );

    const buyTokenAmount = calcSwapAmount(bidAmount, sellTokenFeeRate);

    const tx = atomicSwap.connect(maker).acceptBid({ orderID, bidder });
    await expect(tx).to.changeTokenBalance(
      usdt,
      maker.address,
      buyTokenAmount.amountAfterFee
    );
    await expect(tx).to.changeTokenBalance(
      usdc,
      bidder,
      sellTokenAmount.amountAfterFee
    );

    await expect(tx).to.changeTokenBalance(
      usdc,
      treasury,
      sellTokenAmount.feeAmount
    );
    await expect(tx).to.changeTokenBalance(
      usdt,
      treasury,
      buyTokenAmount.feeAmount
    );
  });

  it("should accept bid with not accept Bid", async () => {
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
    } = await bidToDefaultAtomicOrder(false, false, true, false);
    const sellTokenAmount = calcSwapAmount(
      payload.sellToken.amount,
      buyTokenFeeRate
    );

    const buyTokenAmount = calcSwapAmount(bidAmount, sellTokenFeeRate);

    const tx = atomicSwap.connect(maker).acceptBid({ orderID, bidder });
    await expect(tx).to.revertedWithCustomError(atomicSwap, "BidNotAllowed");
  });
  it("should accept bid with zero address msg sender", async () => {
    const { atomicSwap, orderID, bidder, payload, buyTokenFeeRate } =
      await bidToDefaultAtomicOrder(false, false, true, false);
    const sellTokenAmount = calcSwapAmount(
      payload.sellToken.amount,
      buyTokenFeeRate
    );
    const signer = await getZeroAddressSigner();
    const tx = atomicSwap.connect(signer).acceptBid({ orderID, bidder });
    await expect(tx).to.revertedWithCustomError(
      atomicSwap,
      "UnauthorizedSender"
    );
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
    await expect(
      atomicSwap.connect(maker).acceptBid({ orderID, bidder: ZeroAddress })
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
