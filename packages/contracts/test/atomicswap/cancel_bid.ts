import { bidToDefaultAtomicOrder } from "../../utils/utils";
import { expect } from "chai";

describe("AtomicSwap: CancelBid", () => {
  it("should cancel bid with native token", async () => {
    const { atomicSwap, taker, orderID, bidAmount, bidder, payload, usdt } =
      await bidToDefaultAtomicOrder(false, true);
    await expect(
      atomicSwap.connect(taker).cancelBid(orderID)
    ).to.changeEtherBalance(bidder, bidAmount);
  });

  it("should cancel bid with erc20 token", async () => {
    const { atomicSwap, taker, orderID, bidAmount, bidder, payload, usdt } =
      await bidToDefaultAtomicOrder(false, false);
    await expect(
      atomicSwap.connect(taker).cancelBid(orderID)
    ).to.changeTokenBalance(usdt, bidder, bidAmount);
  });

  it("should revert to cancel bid by not bidder", async () => {
    const { atomicSwap, maker, orderID, bidAmount, bidder, payload, usdt } =
      await bidToDefaultAtomicOrder(false, false);
    await expect(
      atomicSwap.connect(maker).cancelBid(orderID)
    ).to.revertedWithCustomError(atomicSwap, "UnauthorizedCancelAction");
  });

  it("should revert to cancel bid with already took bid", async () => {
    const { atomicSwap, maker, taker, orderID, bidder } =
      await bidToDefaultAtomicOrder(true, false);

    await expect(atomicSwap.connect(maker).acceptBid({ orderID, bidder })).not
      .to.reverted;

    await expect(
      atomicSwap.connect(taker).cancelBid(orderID)
    ).to.revertedWithCustomError(atomicSwap, "BidNotInPlacedStatus");
  });
});
