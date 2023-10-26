import { ethers } from "hardhat";
import {
  createDefaultAtomicOrder,
  createDefaultITCAtomicOrder,
  newAtomicSwapOrderID,
} from "../../utils/utils";
import { Utils } from "../../utils/utils";
import { BlockTime } from "../../utils/time";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("ITCAtomicSwap: MakeSwap", () => {
  let accounts: HardhatEthersSigner[];
  beforeEach(async () => {
    accounts = await ethers.getSigners();
  });

  it("make inter-chain swap order with native token", async () => {
    const {
      atomicSwapA,
      atomicSwapB,
      chainID,
      usdc,
      usdt,
      bridgeA,
      bridgeB,
      atomicSwapAAddress,
      atomicSwapBAddress,
    } = await loadFixture(Utils.prepareITCAtomicSwapTest);
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const usdtAddress = await usdt.getAddress();
    const payload = {
      sellToken: {
        token: ethers.ZeroAddress,
        amount: "20",
      },
      buyToken: {
        token: usdtAddress,
        amount: "20",
      },
      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: await BlockTime.AfterSeconds(100),
      acceptBid: true,
    };
    const encoder = new ethers.AbiCoder();
    const payloadBytes = encoder.encode(
      [
        "tuple(address, uint256)",
        "tuple(address, uint256)",
        "address",
        "address",
        "address",
        "uint256",
        "uint16",
      ],
      [
        [ethers.ZeroAddress, 20],
        [ethers.ZeroAddress, 20],
        maker.address,
        maker.address,
        taker.address,
        222,
        chainID,
      ]
    );

    const estimateFee = await bridgeA.estimateFee(
      chainID,
      false,
      "0x",
      payloadBytes
    );

    const amount = await usdc.allowance(
      accounts[0].address,
      atomicSwapAAddress
    );

    expect(
      await atomicSwapA.makeSwap(
        {
          base: payload,
          makerReceiver: makerReceiver.address,
          desiredTaker: taker.address,
          dstChainID: chainID,
        },
        {
          value:
            (estimateFee.nativeFee * BigInt(15)) / BigInt(10) +
            payload.sellToken.amount,
        }
      )
    ).not.to.reverted;

    const lockedAmount = await ethers.provider.getBalance(atomicSwapAAddress);
    expect(lockedAmount == BigInt(20)).to.equal(true);

    const nonce = await atomicSwapA.nonces(maker.address);
    const id = newAtomicSwapOrderID(maker.address, nonce - BigInt(1));
    const orderIDAtContractA = await atomicSwapA.swapOrder(id);
    expect(orderIDAtContractA.id).to.equal(id);
    const orderIDAtContractB = await atomicSwapB.swapOrder(id);
    expect(orderIDAtContractB.id).to.equal(id);
  });
  it("create inter-chain order with ERC20 token", async () =>
    createDefaultITCAtomicOrder(false, false));

  it("should revert to create inter-chain order with wrong maker", async () => {
    const { atomicSwapA, chainID, bridgeA, usdtAddress } = await loadFixture(
      Utils.prepareITCAtomicSwapTest
    );
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const payload = {
      sellToken: {
        token: ethers.ZeroAddress,
        amount: "20",
      },
      buyToken: {
        token: usdtAddress,
        amount: "20",
      },
      maker: taker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: await BlockTime.AfterSeconds(100),
      acceptBid: true,
    };

    const encoder = new ethers.AbiCoder();
    const payloadBytes = encoder.encode(
      [
        "tuple(address, uint256)",
        "tuple(address, uint256)",
        "address",
        "address",
        "address",
        "uint256",
        "uint16",
      ],
      [
        [ethers.ZeroAddress, 20],
        [ethers.ZeroAddress, 20],
        maker.address,
        maker.address,
        taker.address,
        222,
        chainID,
      ]
    );

    const estimateFee = await bridgeA.estimateFee(
      chainID,
      false,
      "0x",
      payloadBytes
    );

    await expect(
      atomicSwapA.makeSwap(
        {
          base: payload,

          makerReceiver: makerReceiver.address,
          desiredTaker: taker.address,
          dstChainID: chainID,
        },
        {
          value: (estimateFee.nativeFee * BigInt(11)) / BigInt(10),
        }
      )
    ).to.revertedWithCustomError(atomicSwapA, "UnauthorizedSender");
  });

  it("should revert to create inter-chain order with not allowed amount", async () => {
    const { atomicSwapA, chainID, usdcAddress, usdtAddress, usdt, bridgeA } =
      await loadFixture(Utils.prepareITCAtomicSwapTest);
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const payload = {
      sellToken: {
        token: usdcAddress,
        amount: ethers.parseEther("100"),
      },
      buyToken: {
        token: usdtAddress,
        amount: ethers.parseEther("100"),
      },
      maker: taker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: await BlockTime.AfterSeconds(100),
      acceptBid: true,
    };
    const encoder = new ethers.AbiCoder();
    const payloadBytes = encoder.encode(
      [
        "tuple(address, uint256)",
        "tuple(address, uint256)",
        "address",
        "address",
        "address",
        "uint256",
        "uint16",
        "bool",
      ],
      [
        [usdcAddress, payload.sellToken.amount],
        [usdtAddress, payload.buyToken.amount],
        payload.maker,
        makerReceiver.address,
        payload.desiredTaker,
        payload.expireAt,
        chainID,
        true,
      ]
    );

    const estimateFee = await bridgeA.estimateFee(
      chainID,
      false,
      "0x",
      payloadBytes
    );
    const tx = atomicSwapA.connect(taker).makeSwap(
      {
        base: payload,
        makerReceiver: makerReceiver.address,
        desiredTaker: taker.address,
        dstChainID: chainID,
      },
      {
        value: (estimateFee.nativeFee * BigInt(11)) / BigInt(10),
      }
    );
    await expect(tx).to.revertedWithCustomError(
      atomicSwapA,
      "NotAllowedTransferAmount"
    );
  });

  it("should revert to create inter-chain order with transfer failed", async () => {
    const {
      atomicSwapA,
      chainID,
      usdc,
      usdt,
      bridgeA,
      usdcAddress,
      usdtAddress,
    } = await loadFixture(Utils.prepareITCAtomicSwapTest);
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const payload = {
      sellToken: {
        token: usdcAddress,
        amount: "20",
      },
      buyToken: {
        token: usdtAddress,
        amount: "20",
      },
      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: await BlockTime.AfterSeconds(100),
      acceptBid: true,
    };
    const encoder = new ethers.AbiCoder();
    const payloadBytes = encoder.encode(
      [
        "tuple(address, uint256)",
        "tuple(address, uint256)",
        "address",
        "address",
        "address",
        "uint256",
        "uint16",
        "bool",
      ],
      [
        [ethers.ZeroAddress, 20],
        [ethers.ZeroAddress, 20],
        maker.address,
        maker.address,
        taker.address,
        payload.expireAt,
        chainID,
        true,
      ]
    );

    await usdc.setFailTransferFrom(true);
    const estimateFee = await bridgeA.estimateFee(
      chainID,
      false,
      "0x",
      payloadBytes
    );
    await expect(
      atomicSwapA.makeSwap(
        {
          base: payload,
          makerReceiver: makerReceiver.address,
          desiredTaker: taker.address,
          dstChainID: chainID,
        },
        {
          value: (estimateFee.nativeFee * BigInt(11)) / BigInt(10),
        }
      )
    ).to.revertedWith("Failed to transfer from");
  });

  it("should revert to create in-chain pool with not enough native token", async () => {
    const { atomicSwapA, chainID, usdc, bridgeA, usdcAddress, usdtAddress } =
      await loadFixture(Utils.prepareITCAtomicSwapTest);
    const accounts = await ethers.getSigners();
    const [maker, taker, makerReceiver, takerReceiver] = accounts;
    const payload = {
      sellToken: {
        token: ethers.ZeroAddress,
        amount: ethers.parseEther("20"),
      },
      buyToken: {
        token: usdtAddress,
        amount: ethers.parseEther("20"),
      },
      maker: maker.address,
      minBidAmount: ethers.parseEther("15"),
      desiredTaker: taker.address,
      expireAt: await BlockTime.AfterSeconds(100),
      acceptBid: true,
    };
    const encoder = new ethers.AbiCoder();
    const payloadBytes = encoder.encode(
      [
        "tuple(address, uint256)",
        "tuple(address, uint256)",
        "address",
        "address",
        "address",
        "uint256",
        "uint16",
        "bool",
      ],
      [
        [ethers.ZeroAddress, 20],
        [ethers.ZeroAddress, 20],
        maker.address,
        maker.address,
        taker.address,
        222,
        chainID,
        true,
      ]
    );

    const estimateFee = await bridgeA.estimateFee(
      chainID,
      false,
      "0x",
      payloadBytes
    );

    const amount = await usdc.allowance(
      accounts[0].address,
      await atomicSwapA.getAddress()
    );
    await expect(
      atomicSwapA.makeSwap(
        {
          base: payload,
          makerReceiver: makerReceiver.address,
          desiredTaker: taker.address,
          dstChainID: chainID,
        },
        {
          value: (estimateFee.nativeFee * BigInt(11)) / BigInt(10),
        }
      )
    ).to.revertedWith("Not enough ether");
  });
});
