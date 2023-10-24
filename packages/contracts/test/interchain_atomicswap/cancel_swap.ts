import { createDefaultITCAtomicOrder, safeFactor } from "../../utils/utils";
import { ethers } from "hardhat";
import { expect } from "chai";
import { randomBytes } from "crypto";
describe("ITCAtomicSwap: CancelSwap", () => {
  it("cancel swap (inter-chain)", async () => {
    const {
      orderID,
      chainID,
      atomicSwapA,
      atomicSwapB,
      taker,
      bridgeB,
      bridgeA,
      usdc,
    } = await createDefaultITCAtomicOrder();
    const cancelSwapMsg = {
      orderID: orderID,
    };

    const encoder = new ethers.AbiCoder();
    const payloadBytes = encoder.encode(
      ["bytes32", "address", "address"],
      [orderID, taker.address, taker.address]
    );

    const estimateFee = await bridgeA.estimateFee(
      chainID,
      false,
      "0x",
      payloadBytes
    );

    const order = await atomicSwapA.swapOrder(orderID);
    const amountBeforeCancel = await usdc.balanceOf(order.maker);

    await expect(
      atomicSwapA.cancelSwap(cancelSwapMsg, {
        value: safeFactor(estimateFee.nativeFee, 1.1),
      })
    ).not.to.reverted;

    const amountAfterCancel = await usdc.balanceOf(order.maker);
    expect(amountAfterCancel - amountBeforeCancel).to.be.equal(
      order.sellToken.amount
    );

    const swapOrderIDAtatomicSwapA = await atomicSwapA.swapOrder(orderID);
    expect(swapOrderIDAtatomicSwapA.status).to.equal(BigInt(0));
    const swapOrderIDAtatomicSwapB = await atomicSwapB.swapOrder(orderID);
    expect(swapOrderIDAtatomicSwapB.id).to.equal(BigInt(0));
  });

  it("should revert when sender is not the maker", async () => {
    const { orderID, atomicSwapA, taker } = await createDefaultITCAtomicOrder();
    const cancelSwapMsg = {
      orderID: orderID,
    };

    await expect(
      atomicSwapA.connect(taker).cancelSwap(cancelSwapMsg)
    ).to.be.revertedWithCustomError(atomicSwapA, "UnauthorizedCancelAction");
  });

  it("should revert when swap doesn't exist", async () => {
    const { atomicSwapA, taker } = await createDefaultITCAtomicOrder();
    const cancelSwapMsg = {
      orderID: randomBytes(32),
    };
    await expect(
      atomicSwapA.connect(taker).cancelSwap(cancelSwapMsg)
    ).to.be.revertedWithCustomError(atomicSwapA, "OrderDoesNotExist");
  });

  it("should unlock ether when sell token is zero address", async () => {
    const { orderID, chainID, atomicSwapA, bridgeA, maker, payload } =
      await createDefaultITCAtomicOrder(true);
    const balanceBeforeCancel = await ethers.provider.getBalance(maker.address);

    const encoder = new ethers.AbiCoder();
    const payloadBytes = encoder.encode(
      ["bytes32", "address", "address"],
      [orderID, maker.address, maker.address]
    );

    const estimateFee = await bridgeA.estimateFee(
      chainID,
      false,
      "0x",
      payloadBytes
    );
    const tx = await atomicSwapA.cancelSwap(
      { orderID: orderID },
      {
        value: safeFactor(estimateFee.nativeFee, 1.1),
      }
    );
    const receipt = await tx.wait();
    const gasUsed = receipt?.gasUsed;
    const txCost = gasUsed! * tx.gasPrice!;

    // Now, instead of expecting the difference in balance to be exactly `payload.sellToken.amount`
    // you'd expect it to be `payload.sellToken.amount - txCost`
    const expectedIncrease =
      payload.sellToken.amount -
      txCost -
      safeFactor(estimateFee.nativeFee, 1.1);
    const balanceAfterCancel = await ethers.provider.getBalance(maker.address);
    expect(balanceAfterCancel - balanceBeforeCancel).to.be.gte(
      expectedIncrease
    );
  });
});
