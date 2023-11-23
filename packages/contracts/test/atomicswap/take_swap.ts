import { ethers } from "hardhat";
import { calcSwapAmount, createDefaultAtomicOrder, testTakeSwap } from "../../utils/utils";
import { expect } from "chai";
import { ZeroAddress } from "ethers";
describe("TakeSwap", () => {
  beforeEach(async () => {});

  it("should take order with native token", async () => testTakeSwap(true));
  it("should take order with erc20 token", async () => testTakeSwap());

  it("should revert when trying to take a non-existent swap", async () => {
    const { atomicSwap, taker } = await createDefaultAtomicOrder(true);

    await expect(
      atomicSwap.connect(taker).takeSwap({
        orderID: ethers.randomBytes(32), // Some random orderID
        takerReceiver: taker.address,
      })
    ).to.be.revertedWithCustomError(atomicSwap, "OrderDoesNotExist");
  });

  it("should revert when trying to take with insufficient Ether", async () => {
    const { orderID, atomicSwap, taker } = await createDefaultAtomicOrder(
      true,
      false,
      false,
      false
    );
    await expect(
      atomicSwap.connect(taker).takeSwap(
        {
          orderID,
          takerReceiver: taker.address,
        },
        {
          value: ethers.parseEther("0"),
        }
      )
    ).to.be.revertedWithCustomError(atomicSwap, "NotAllowedTransferAmount");
  });

  it("should revert when trying to take with insufficient ERC20 allowance", async () => {
    const { orderID, atomicSwap, taker } = await createDefaultAtomicOrder(
      false,
      false,
      false,
      false
    );

    await expect(
      atomicSwap.connect(taker).takeSwap({
        orderID,
        takerReceiver: taker.address,
      })
    ).to.be.revertedWithCustomError(atomicSwap, "NotAllowedTransferAmount");
  });

  it("should revert when trying to take an already completed swap", async () => {
    // Assuming the swap was taken in previous tests
    const { orderID, taker, atomicSwap } = await testTakeSwap(true);
    await expect(
      atomicSwap.connect(taker).takeSwap({
        orderID,
        takerReceiver: taker.address,
      })
    ).to.be.revertedWithCustomError(atomicSwap, "InactiveOrder");
  });

  it("should revert when a non-taker tries to take the swap", async () => {
    const { orderID, atomicSwap, maker, taker } =
      await createDefaultAtomicOrder(true, false, false, false);

    await expect(
      atomicSwap.connect(maker).takeSwap({
        orderID,
        takerReceiver: taker.address,
      })
    ).to.be.revertedWithCustomError(atomicSwap, "UnauthorizedTakeAction");
  });
  it("should revert when a non-taker tries to take the swap", async () => {
    const { orderID, atomicSwap, maker, taker } =
      await createDefaultAtomicOrder(true, false, false, false);

    await expect(
      atomicSwap.connect(taker).takeSwap({
        orderID,
        takerReceiver: ZeroAddress,
      })
    ).to.be.revertedWithCustomError(atomicSwap, "UnauthorizedSender");
  });
});
