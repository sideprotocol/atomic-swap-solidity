import { ethers } from "hardhat";
import { Utils } from "../../utils/utils";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ZeroAddress } from "ethers";

describe("AtomicSwap: Initialization", () => {
  let accounts: HardhatEthersSigner[];
  beforeEach(async () => {
    accounts = await ethers.getSigners();
  });
  it("should correctly initialize AtomicSwap contract", async () => {
    const { atomicSwap } = await loadFixture(Utils.prepareInChainAtomicTest);
    // assert that specific variables or settings are initialized as expected
    // for instance, if there's a owner or admin variable:
    expect(await atomicSwap.isAdmin(accounts[0].address)).to.equal(true);
  });
  it("should not allow re-initialization", async () => {
    const { atomicSwap } = await loadFixture(Utils.prepareInChainAtomicTest);
    await expect(
      atomicSwap.initialize(
        accounts[0].address,
        accounts[0].address,
        accounts[10].address,
        100,
        100
      )
    ).to.be.reverted;
  });
  it("should revert to initialize with big sellerFee", async () => {
    await expect(Utils.prepareInChainAtomicTest(10001, 120)).to.reverted;
  });
  it("should revert to initialize with big buyerFee", async () => {
    await expect(Utils.prepareInChainAtomicTest(100, 10001)).to.reverted;
  });
  it("should revert to initialize with zero address treasury", async () => {
    await expect(Utils.prepareInChainAtomicTest(100, 120, ZeroAddress)).to
      .reverted;
  });
});
