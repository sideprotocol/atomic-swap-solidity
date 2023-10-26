import { createDefaultAtomicOrder } from "../../utils/utils";
import { ethers } from "hardhat";
import { expect } from "chai";
import { randomBytes } from "crypto";
describe("AtomicSwap: CancelSwap", () => {
  it("cancel swap with native token", async () => {
    const { orderID, atomicSwap, maker, taker, usdc } =
      await createDefaultAtomicOrder(true);
    const order = await atomicSwap.swapOrder(orderID);
    const cancelSwapMsg = {
      orderID: orderID,
    };

    await expect(atomicSwap.cancelSwap(cancelSwapMsg)).to.changeEtherBalance(
      maker.address,
      order.sellToken.amount
    );
    const orderAfterCancel = await atomicSwap.swapOrder(orderID);
    expect(orderAfterCancel.id).to.equal(ethers.ZeroHash);
  });
  it("cancel swap with erc20 token", async () => {
    const { orderID, atomicSwap, maker, taker, usdc } =
      await createDefaultAtomicOrder(false);
    const order = await atomicSwap.swapOrder(orderID);
    const cancelSwapMsg = {
      orderID: orderID,
    };

    await expect(atomicSwap.cancelSwap(cancelSwapMsg)).to.changeTokenBalance(
      usdc,
      maker.address,
      order.sellToken.amount
    );
    const orderAfterCancel = await atomicSwap.swapOrder(orderID);
    expect(orderAfterCancel.id).to.equal(ethers.ZeroHash);
  });

  it("should revert when sender is not the maker", async () => {
    const { orderID, atomicSwap, taker } = await createDefaultAtomicOrder(true);
    const cancelSwapMsg = {
      orderID: orderID,
    };

    await expect(
      atomicSwap.connect(taker).cancelSwap(cancelSwapMsg)
    ).to.be.revertedWithCustomError(atomicSwap, "UnauthorizedCancelAction");
  });

  it("should revert when swap doesn't exist", async () => {
    const { atomicSwap, taker } = await createDefaultAtomicOrder(false);
    const cancelSwapMsg = {
      orderID: randomBytes(32),
    };
    await expect(
      atomicSwap.connect(taker).cancelSwap(cancelSwapMsg)
    ).to.be.revertedWithCustomError(atomicSwap, "OrderDoesNotExist");
  });
});
