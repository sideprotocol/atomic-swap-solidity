import { ethers } from "hardhat";
import { Utils } from "../../utils/utils";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("AtomicSwap: Initialization", () => {
  let accounts: HardhatEthersSigner[];
  beforeEach(async () => {
    accounts = await ethers.getSigners();
  });
  it("should correctly initialize AtomicSwap contract", async () => {
    const { atomicSwap } = await loadFixture(Utils.prepareInChainAtomicTest);
    // assert that specific variables or settings are initialized as expected
    // for instance, if there's a owner or admin variable:
    expect(await atomicSwap.owner()).to.equal(accounts[0].address);
  });
  it("should not allow re-initialization", async () => {
    const { atomicSwap } = await loadFixture(Utils.prepareInChainAtomicTest);
    await expect(
      atomicSwap.initialize(accounts[0].address, accounts[10].address, 100, 100)
    ).to.be.revertedWith("Initializable: contract is already initialized");
  });
});
