import { ethers } from "hardhat";
import { bidToDefaultITCAtomicOrder, encodePayload } from "../../utils/utils";
import { expect } from "chai";

describe("AtomicSwap: AcceptBid", () => {
  describe("Inter-chain", () => {
    it("should accept bid with native token", async () => {
      const {
        atomicSwapA,
        bridgeA,
        maker,
        makerReceiver,
        chainID,
        orderID,
        bidAmount,
        bidder,
        bidderReceiver,
        payload,
      } = await bidToDefaultITCAtomicOrder(true, true);

      const balanceBeforeAcceptOfMaker = await ethers.provider.getBalance(
        makerReceiver.address
      );
      const balanceBeforeAcceptOfBidder = await ethers.provider.getBalance(
        bidderReceiver
      );
      const acceptPayloadBytes = encodePayload(
        ["bytes32", "address"],
        [orderID, bidder]
      );
      const fee = await bridgeA.estimateFee(
        chainID,
        false,
        "0x",
        acceptPayloadBytes
      );

      await expect(
        atomicSwapA.connect(maker).acceptBid(
          { orderID, bidder },
          {
            value: fee.nativeFee.mul(20).div(10),
          }
        )
      ).to.be.changeEtherBalance(makerReceiver.address, bidAmount);

      // check balance after accept bid
      const balanceAfterAcceptOfBidder = await ethers.provider.getBalance(
        bidderReceiver
      );
      expect(balanceAfterAcceptOfBidder - balanceBeforeAcceptOfBidder).to.equal(
        payload.sellToken.amount
      );

      const balanceAfterAcceptOfMaker = await ethers.provider.getBalance(
        makerReceiver.address
      );
      expect(balanceAfterAcceptOfMaker - balanceBeforeAcceptOfMaker).to.equal(
        bidAmount
      );
    });
    it("should accept bid with erc20 token", async () => {
      const {
        atomicSwapA,
        bridgeA,
        chainID,
        maker,
        makerReceiver,
        orderID,
        usdc,
        usdt,
        bidAmount,
        bidder,
        bidderReceiver,
        payload,
      } = await bidToDefaultITCAtomicOrder(false, true);

      const balanceBeforeAcceptOfMaker = await usdt.balanceOf(
        makerReceiver.address
      );
      const balanceBeforeAcceptOfBidder = await usdc.balanceOf(bidderReceiver);

      const acceptPayloadBytes = encodePayload(
        ["bytes32", "address"],
        [orderID, bidder]
      );
      const fee = await bridgeA.estimateFee(
        chainID,
        false,
        "0x",
        acceptPayloadBytes
      );

      await expect(
        atomicSwapA.connect(maker).acceptBid(
          { orderID, bidder },
          {
            value: fee.nativeFee.mul(11).div(10),
          }
        )
      ).to.be.changeTokenBalance(usdt, makerReceiver.address, bidAmount);

      // check balance after accept bid
      const balanceAfterAcceptOfMaker = await usdt.balanceOf(
        makerReceiver.address
      );
      expect(
        balanceAfterAcceptOfMaker.sub(balanceBeforeAcceptOfMaker)
      ).to.equal(bidAmount);

      const balanceAfterAcceptOfBidder = await usdc.balanceOf(bidderReceiver);
      expect(
        balanceAfterAcceptOfBidder.sub(balanceBeforeAcceptOfBidder)
      ).to.equal(payload.sellToken.amount);
    });
  });
});
