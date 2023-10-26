import { ethers } from "hardhat";
import { newAtomicSwapOrderID } from "../../utils/utils";
import { Utils } from "../../utils/utils";
import { BlockTime } from "../../utils/time";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("ITCAtomicSwap: Initialization", () => {
  let accounts: HardhatEthersSigner[];
  beforeEach(async () => {
    accounts = await ethers.getSigners();
  });
  it("should correctly initialize AtomicSwap contract", async () => {
    const { atomicSwapA } = await loadFixture(Utils.prepareITCAtomicSwapTest);
    // assert that specific variables or settings are initialized as expected
    // for instance, if there's a owner or admin variable:
    expect(await atomicSwapA.owner()).to.equal(accounts[0].address);
  });
  it("should not allow re-initialization", async () => {
    const { atomicSwapA, chainID, bridgeA } = await loadFixture(
      Utils.prepareITCAtomicSwapTest
    );

    const bridge = await bridgeA.getAddress();
    await expect(
      atomicSwapA.initialize({
        admin: accounts[0].address,
        chainID: chainID,
        bridge: bridge,
        treasury: accounts[10].address,
        sellerFee: 100,
        buyerFee: 100,
      })
    ).to.be.reverted;
  });
});
