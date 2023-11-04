import { ethers } from "hardhat";
import {
  calcSwapAmount,
  createDefaultITCAtomicOrder,
  encodePayload,
  safeFactor,
} from "../../utils/utils";
import { expect } from "chai";

describe.only("ITCAtomicSwap: TakeSwap", () => {
  const testTakeSwap = async (withNativeToken?: boolean) => {
    const {
      orderID,
      chainID,
      atomicSwapA,
      atomicSwapB,
      taker,
      takerReceiver,
      makerReceiver,
      usdt,
      bridgeB,
      sellTokenFeeRate,
      buyTokenFeeRate,
      treasury,
    } = await createDefaultITCAtomicOrder(withNativeToken, false);

    const payloadBytes = encodePayload(
      ["bytes32", "address", "address"],
      [orderID, taker.address, taker.address]
    );

    const estimateFee = await bridgeB.estimateFee(
      chainID,
      false,
      "0x",
      payloadBytes
    );

    const buyToken = (await atomicSwapB.swapOrder(orderID)).buyToken;
    let nativeTokenAmount = safeFactor(estimateFee.nativeFee, 1.1);

    if (withNativeToken) {
      nativeTokenAmount = nativeTokenAmount + buyToken.amount;
    } else {
      await expect(
        usdt
          .connect(taker)
          .approve(await atomicSwapB.getAddress(), buyToken.amount)
      ).not.to.reverted;
    }

    const tx = atomicSwapB.connect(taker).takeSwap(
      {
        orderID,
        takerReceiver: takerReceiver.address,
      },
      {
        value: nativeTokenAmount,
      }
    );

    await expect(tx).not.to.reverted;

    const { amountAfterFee, feeAmount } = calcSwapAmount(
      buyToken.amount,
      sellTokenFeeRate
    );
    if (!withNativeToken) {
      await expect(tx).to.changeTokenBalances(
        usdt,
        [makerReceiver.address, treasury],
        [amountAfterFee, feeAmount]
      );
    } else {
      await expect(tx).to.changeEtherBalances(
        [makerReceiver.address, treasury],
        [amountAfterFee, feeAmount]
      );
    }

    expect((await atomicSwapA.swapOrder(orderID)).status).to.equal(2);
    expect((await atomicSwapB.swapOrder(orderID)).status).to.equal(2);

    return {
      orderID,
      atomicSwap: atomicSwapB,
      taker,
      takerReceiver,
    };
  };

  it("should success to take pool (inter-chain)", async () => testTakeSwap());
  it("should success to take pool (inter-chain) with native token", async () =>
    testTakeSwap(true));
  it("should fail when trying to take a non-existent swap", async () => {
    const { orderID, chainID, atomicSwapA, atomicSwapB, taker, takerReceiver } =
      await createDefaultITCAtomicOrder(true);
    const payloadBytes = encodePayload(
      ["bytes32", "address", "address"],
      [orderID, taker.address, taker.address]
    );

    await expect(
      atomicSwapA.connect(taker).takeSwap({
        orderID: ethers.randomBytes(32), // Some random orderID
        takerReceiver: takerReceiver.address,
      })
    ).to.be.revertedWithCustomError(atomicSwapB, "OrderDoesNotExist");
  });
  it("should fail when trying to take a accept bid", async () => {
    const { orderID, chainID, atomicSwapA, atomicSwapB, taker, takerReceiver } =
      await createDefaultITCAtomicOrder(true);
    const payloadBytes = encodePayload(
      ["bytes32", "address", "address"],
      [orderID, taker.address, taker.address]
    );

    await expect(
      atomicSwapA.connect(taker).takeSwap({
        orderID: orderID, // Some random orderID
        takerReceiver: takerReceiver.address,
      })
    ).to.be.revertedWithCustomError(atomicSwapB, "OrderNotAllowTake");
  });

  it("should fail when trying to take with insufficient Ether", async () => {
    const { orderID, chainID, atomicSwapA, taker, bridgeA, takerReceiver } =
      await createDefaultITCAtomicOrder(true, false);

    const payloadBytes = encodePayload(
      ["bytes32", "address", "address"],
      [orderID, taker.address, taker.address]
    );

    const bridge = bridgeA;
    const atomicSwap = atomicSwapA;
    const estimateFee = await bridge.estimateFee(
      chainID,
      false,
      "0x",
      payloadBytes
    );

    const nativeTokenAmount = safeFactor(estimateFee.nativeFee, 1.1);
    await expect(
      atomicSwap.connect(taker).takeSwap(
        {
          orderID,
          takerReceiver: takerReceiver.address,
        },
        {
          value: nativeTokenAmount,
        }
      )
    ).to.be.revertedWithCustomError(atomicSwap, "NotEnoughFund");
  });

  it("should fail when trying to take with insufficient ERC20 allowance", async () => {
    const { orderID, chainID, atomicSwapA, taker, bridgeA, takerReceiver } =
      await createDefaultITCAtomicOrder();

    const payloadBytes = encodePayload(
      ["bytes32", "address", "address"],
      [orderID, taker.address, taker.address]
    );

    const bridge = bridgeA;
    const atomicSwap = atomicSwapA;
    const estimateFee = await bridge.estimateFee(
      chainID,
      false,
      "0x",
      payloadBytes
    );

    const nativeTokenAmount = safeFactor(estimateFee.nativeFee, 1.1);
    await expect(
      atomicSwap.connect(taker).takeSwap(
        {
          orderID,
          takerReceiver: takerReceiver.address,
        },
        {
          value: nativeTokenAmount,
        }
      )
    ).to.be.reverted;
  });

  it("should fail when trying to take an already completed swap", async () => {
    // Assuming the swap was taken in previous tests
    const { orderID, taker, atomicSwap, takerReceiver } = await testTakeSwap(
      true
    );
    await expect(
      atomicSwap.connect(taker).takeSwap({
        orderID,
        takerReceiver: takerReceiver.address,
      })
    ).to.be.revertedWithCustomError(atomicSwap, "OrderAlreadyCompleted");
  });

  it("should fail when a non-taker tries to take the swap", async () => {
    const { orderID, atomicSwapB, maker, takerReceiver } =
      await createDefaultITCAtomicOrder(true, false);

    await expect(
      atomicSwapB.connect(maker).takeSwap({
        orderID,
        takerReceiver: takerReceiver.address,
      })
    ).to.be.revertedWithCustomError(atomicSwapB, "UnauthorizedTakeAction");
  });
});
