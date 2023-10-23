import { PoolType, createDefaultAtomicOrder } from "../../utils/utils";
import { ethers } from "hardhat";
import { expect } from "chai";
import { randomBytes } from "crypto";
describe("AtomicSwap: CancelSwap", () => {
  it("cancel swap (in-chain)", async () => {
    const {
      orderID,
      chainID,
      atomicSwapA,
      atomicSwapB,
      taker,
      bridgeB,
      bridgeA,
      usdc,
    } = await createDefaultAtomicOrder(PoolType.IN_CHAIN);
    const cancelSwapMsg = {
      orderID: orderID,
    };

    const encoder = new ethers.utils.AbiCoder();
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

    const operators = await atomicSwapA.swapOrderOperators(orderID);
    const sellToken = await atomicSwapA.swapOrderSellToken(orderID);
    const amountBeforeCancel = await usdc.balanceOf(operators.maker);

    await expect(
      atomicSwapA.cancelSwap(cancelSwapMsg, {
        value: estimateFee.nativeFee.mul(20).div(10),
      })
    ).not.to.reverted;

    const amountAfterCancel = await usdc.balanceOf(operators.maker);
    expect(amountAfterCancel.sub(amountBeforeCancel).toString()).to.be.equal(
      sellToken.amount
    );

    const swapOrderIDAtatomicSwapA = await atomicSwapA.swapOrderID(orderID);
    expect(swapOrderIDAtatomicSwapA.id).to.equal(ethers.HashZero);
  });
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
    } = await createDefaultAtomicOrder(PoolType.INTER_CHAIN);
    const cancelSwapMsg = {
      orderID: orderID,
    };

    const encoder = new ethers.utils.AbiCoder();
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

    const operators = await atomicSwapA.swapOrderOperators(orderID);
    const sellToken = await atomicSwapA.swapOrderSellToken(orderID);
    const amountBeforeCancel = await usdc.balanceOf(operators.maker);

    await expect(
      atomicSwapA.cancelSwap(cancelSwapMsg, {
        value: estimateFee.nativeFee.mul(20).div(10),
      })
    ).not.to.reverted;

    const amountAfterCancel = await usdc.balanceOf(operators.maker);
    expect(amountAfterCancel.sub(amountBeforeCancel).toString()).to.be.equal(
      sellToken.amount
    );

    const swapOrderIDAtatomicSwapA = await atomicSwapA.swapOrderID(orderID);
    expect(swapOrderIDAtatomicSwapA.id).to.equal(ethers.HashZero);
    const swapOrderIDAtatomicSwapB = await atomicSwapB.swapOrderID(orderID);
    expect(swapOrderIDAtatomicSwapB.id).to.equal(ethers.HashZero);
  });

  it("should revert when sender is not the maker", async () => {
    const { orderID, atomicSwapA, taker } = await createDefaultAtomicOrder(
      PoolType.IN_CHAIN
    );
    const cancelSwapMsg = {
      orderID: orderID,
    };

    await expect(
      atomicSwapA.connect(taker).cancelSwap(cancelSwapMsg)
    ).to.be.revertedWithCustomError(atomicSwapA, "NoPermissionToCancel");
  });

  it("should revert when swap doesn't exist", async () => {
    const { atomicSwapA, taker } = await createDefaultAtomicOrder(
      PoolType.IN_CHAIN
    );
    const cancelSwapMsg = {
      orderID: randomBytes(32),
    };
    await expect(
      atomicSwapA.connect(taker).cancelSwap(cancelSwapMsg)
    ).to.be.revertedWithCustomError(atomicSwapA, "NonExistPool");
  });

  it("should unlock ether when sell token is zero address", async () => {
    const { orderID, atomicSwapA, maker, payload } =
      await createDefaultAtomicOrder(PoolType.IN_CHAIN, true);
    const balanceBeforeCancel = await ethers.provider.getBalance(maker.address);
    const tx = await atomicSwapA.cancelSwap({ orderID: orderID });
    const receipt = await tx.wait();
    const gasUsed = receipt.gasUsed;
    const txCost = gasUsed.mul(tx.gasPrice!);

    // Now, instead of expecting the difference in balance to be exactly `payload.sellToken.amount`
    // you'd expect it to be `payload.sellToken.amount - txCost`
    const expectedIncrease = payload.sellToken.amount.sub(txCost);
    const balanceAfterCancel = await ethers.provider.getBalance(maker.address);
    expect(balanceAfterCancel.sub(balanceBeforeCancel).toString()).to.be.equal(
      expectedIncrease.toString()
    );
  });
});
