import { ethers } from "hardhat";
import { createDefaultAtomicOrder } from "../../utils/utils";
import { expect } from "chai";
describe("TakeSwap", () => {
  beforeEach(async () => {});

  const testTakeSwap = async (withNativeToken?: boolean) => {
    const [, , takerReceiver] = await ethers.getSigners();
    const { orderID, atomicSwap, taker, usdc, usdt } =
      await createDefaultAtomicOrder(withNativeToken, false, false, false);

    const order = await atomicSwap.swapOrder(orderID);
    const buyToken = (await atomicSwap.swapOrder(orderID)).buyToken;
    await expect(
      usdt.connect(taker).approve(atomicSwap.address, buyToken.amount)
    ).not.to.reverted;

    if (order.sellToken.token == ethers.constants.AddressZero) {
      await expect(
        atomicSwap.connect(taker).takeSwap({
          orderID,
          takerReceiver: takerReceiver.address,
        })
      )
        .to.changeEtherBalance(order.maker, order.buyToken.amount)
        .changeTokenBalance(usdt, takerReceiver.address, order.buyToken.amount);
    } else {
      await expect(
        atomicSwap.connect(taker).takeSwap({
          orderID,
          takerReceiver: takerReceiver.address,
        })
      )
        .to.changeTokenBalance(usdc, order.maker, order.buyToken.amount)
        .changeTokenBalance(usdt, takerReceiver.address, order.buyToken.amount);
    }

    expect((await atomicSwap.swapOrder(orderID)).status).to.equal(2);
    return {
      orderID,
      atomicSwap,
      taker,
    };
  };

  it("should take order with native token", async () => testTakeSwap(true));
  it("should take order with erc20 token", async () => testTakeSwap());

  it("should fail when trying to take a non-existent swap", async () => {
    const { atomicSwap, taker } = await createDefaultAtomicOrder(true);

    await expect(
      atomicSwap.connect(taker).takeSwap({
        orderID: ethers.utils.randomBytes(32), // Some random orderID
        takerReceiver: taker.address,
      })
    ).to.be.revertedWithCustomError(atomicSwap, "OrderDoesNotExist");
  });

  it("should fail when trying to take with insufficient Ether", async () => {
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
          value: ethers.utils.parseEther("0"),
        }
      )
    ).to.be.revertedWithCustomError(atomicSwap, "NotAllowedTransferAmount");
  });

  it("should fail when trying to take with insufficient ERC20 allowance", async () => {
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

  it("should fail when trying to take an already completed swap", async () => {
    // Assuming the swap was taken in previous tests
    const { orderID, taker, atomicSwap } = await testTakeSwap(true);
    await expect(
      atomicSwap.connect(taker).takeSwap({
        orderID,
        takerReceiver: taker.address,
      })
    ).to.be.revertedWithCustomError(atomicSwap, "OrderAlreadyCompleted");
  });

  it("should fail when a non-taker tries to take the swap", async () => {
    const { orderID, atomicSwap, maker, taker } =
      await createDefaultAtomicOrder(true, false, false, false);

    await expect(
      atomicSwap.connect(maker).takeSwap({
        orderID,
        takerReceiver: taker.address,
      })
    ).to.be.revertedWithCustomError(atomicSwap, "UnauthorizedTakeAction");
  });
});
