import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import {
  Utils,
  generateAgreement,
  generateRandomTestAddress,
  setupSwapPermitPayload,
} from "../../utils/utils";
import { expect } from "chai";
import { ethers } from "hardhat";
import { randomBytes } from "crypto";
import { keccak256 } from "ethers";
import { BlockTime } from "../../utils/time";
import { ecdsa } from "@sideprotocol/contracts-typechain";
describe("AtomicSwap: Vault", () => {
  it.skip("should revert when agreement reuse", async () => {
    const { usdcAddress, usdtAddress, vault, vaultName, atomicSwap } =
      await loadFixture(Utils.prepareInChainAtomicTest);
    const accounts = await ethers.getSigners();
    const [maker, taker] = accounts;

    const swapPermitPayload = setupSwapPermitPayload(
      usdcAddress,
      usdtAddress,
      maker.address,
    );

    const agreement = generateAgreement(swapPermitPayload);
    const deadline = await BlockTime.AfterSeconds(1000);
    const { chainId } = await ethers.provider.getNetwork();
    const atomicSwapAddress = await atomicSwap.getAddress();
    const { signature: sellerSignature } = await ecdsa.createPermitSignature({
      tokenName: vaultName,
      contractAddress: await vault.getAddress(),
      chainId: chainId,
      author: maker,
      spender: atomicSwapAddress,
      value: swapPermitPayload.sellToken.amount,
      agreement,
      deadline,
    });
    // const { signature: buyerSignature } = await ecdsa.createPermitSignature({
    //   tokenName: vaultName,
    //   contractAddress: await vault.getAddress(),
    //   chainId: chainId,
    //   author: taker,
    //   spender: atomicSwapAddress,
    //   value: ethers.parseEther("20"),
    //   agreement,
    //   deadline,
    // });

    const makerSig = ethers.Signature.from(sellerSignature);

    // Maker execute
    await vault.permit(
      usdcAddress,
      maker.address,
      swapPermitPayload.sellToken.amount,
      agreement,
      {
        deadline,
        v: makerSig.v,
        r: makerSig.r,
        s: makerSig.s,
        owner: maker.address,
      },
    );

    // await expect(
    //   vault.permit(
    //     usdcAddress,
    //     taker.address,
    //     ethers.parseEther("20"),
    //     agreement,
    //     {
    //       deadline,
    //       v: makerSig.v,
    //       r: makerSig.r,
    //       s: makerSig.s,
    //       owner: maker.address,
    //     },
    //   ),
    // ).to.reverted;
  });
  it("should retrieve Domain Separator", async () => {
    const { vault } = await loadFixture(Utils.prepareInChainAtomicTest);
    const domainSeparator = await vault.DOMAIN_SEPARATOR();
    expect(domainSeparator).to.equal(
      "0x929a5f84c16461680484377c32347455fd444f19c4163acae9c3dba0fe55bf0a",
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
