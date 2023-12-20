import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { Utils, generateRandomTestAddress } from "../../utils/utils";
import { expect } from "chai";
import { ethers } from "hardhat";
import { randomBytes } from "crypto";
import { keccak256 } from "ethers";
describe("AtomicSwap: Vault", () => {
  it("should retrieve Domain Separator", async () => {
    const { vault } = await loadFixture(Utils.prepareInChainAtomicTest);
    const domainSeparator = await vault.DOMAIN_SEPARATOR();
    expect(domainSeparator).to.equal(
      "0x5214c10322a6cc7ce0f3d9b6f7b8f57463483ee65258a6751ce2cfb3767b220c",
    );
  });
  it("should revert permit when use old time stamp", async () => {
    const { usdcAddress, vault } = await loadFixture(
      Utils.prepareInChainAtomicTest,
    );
    const accounts = await ethers.getSigners();
    const [maker] = accounts;
    const agreement = ethers.keccak256(randomBytes(32));
    const deadline = BigInt(100);
    await expect(
      vault.permit(
        usdcAddress,
        maker.address,
        ethers.parseEther("15"),
        agreement,
        {
          deadline,
          v: 27,
          r: keccak256(randomBytes(32)),
          s: keccak256(randomBytes(32)),
          owner: maker.address,
        },
      ),
    ).to.revertedWithCustomError(vault, "VaultExpiredSignature");
  });
});
