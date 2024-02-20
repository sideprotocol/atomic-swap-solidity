import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import {
  Utils,
  generateAgreement,
  setupSwapPermitPayload,
} from "../../utils/utils";
import { expect } from "chai";
import { ethers } from "hardhat";

import { randomBytes } from "crypto";
import { ZeroAddress, keccak256 } from "ethers";
import { BlockTime } from "../../utils/time";
import { ecdsa } from "@sideprotocol/contracts-typechain";
describe("AtomicSwap: Vault", () => {
  it("should revert when agreement reuse", async () => {
    const {
      atomicSwap,
      usdc,
      usdt,
      usdcAddress,
      usdtAddress,
      vault,
      vaultName,
    } = await loadFixture(Utils.prepareInChainAtomicTest);
    const accounts = await ethers.getSigners();
    const [_, buyer, seller] = accounts;
    const swapPermitPayload = setupSwapPermitPayload(
      usdcAddress,
      usdtAddress,
      buyer.address,
    );

    const data = await usdc.balanceOf(seller.address);
    console.log("seller balance:", data);

    // Approve
    await usdc
      .connect(seller)
      .approve(await vault.getAddress(), swapPermitPayload.sellToken.amount);

    await usdt
      .connect(buyer)
      .approve(await vault.getAddress(), swapPermitPayload.buyToken.amount);

    // Deposit
    await vault
      .connect(seller)
      .deposit(
        swapPermitPayload.sellToken.token,
        swapPermitPayload.sellToken.amount,
        {
          value:
            swapPermitPayload.sellToken.token == ZeroAddress
              ? swapPermitPayload.sellToken.amount
              : 0,
        },
      );
    await vault
      .connect(buyer)
      .deposit(
        swapPermitPayload.buyToken.token,
        swapPermitPayload.buyToken.amount,
      );

    const atomicSwapAddress = await atomicSwap.getAddress();
    const { chainId } = await ethers.provider.getNetwork();
    const deadline = BigInt(await BlockTime.AfterSeconds(100000));

    const { sellerAgreement, buyerAgreement } = generateAgreement(
      swapPermitPayload,
      seller.address,
      buyer.address,
    );
    const { signature: sellerSignature } = await ecdsa.createPermitSignature({
      tokenName: vaultName,
      contractAddress: await vault.getAddress(),
      chainId: chainId,
      author: seller,
      spender: atomicSwapAddress,
      value: swapPermitPayload.sellToken.amount,
      agreement: sellerAgreement,
      deadline,
    });

    const sellerSig = ethers.Signature.from(sellerSignature);
    swapPermitPayload.sellerSignature = {
      deadline,
      v: sellerSig.v,
      r: sellerSig.r,
      s: sellerSig.s,
      owner: seller.address,
    };

    const { signature: buyerSignature } = await ecdsa.createPermitSignature({
      tokenName: vaultName,
      contractAddress: await vault.getAddress(),
      chainId: chainId,
      author: buyer,
      spender: atomicSwapAddress,
      value: swapPermitPayload.buyToken.amount,
      agreement: buyerAgreement,
      deadline,
    });
    const buyerSig = ethers.Signature.from(buyerSignature);
    swapPermitPayload.buyerSignature = {
      deadline,
      v: buyerSig.v,
      r: buyerSig.r,
      s: buyerSig.s,
      owner: buyer.address,
    };

    await vault.permit(
      swapPermitPayload.sellToken.token,
      atomicSwapAddress,
      swapPermitPayload.sellToken.amount,
      sellerAgreement,
      swapPermitPayload.sellerSignature,
    );
    await expect(
      vault.permit(
        swapPermitPayload.sellToken.token,
        atomicSwapAddress,
        swapPermitPayload.sellToken.amount,
        sellerAgreement,
        swapPermitPayload.sellerSignature,
      ),
    ).to.revertedWithCustomError(vault, "VaultDuplicatedAgreement");
  });
  it("should revert when non-admin try to make permit", async () => {
    const {
      atomicSwap,
      usdc,
      usdt,
      usdcAddress,
      usdtAddress,
      vault,
      vaultName,
    } = await loadFixture(Utils.prepareInChainAtomicTest);
    const accounts = await ethers.getSigners();
    const [_, buyer, seller] = accounts;
    const swapPermitPayload = setupSwapPermitPayload(
      usdcAddress,
      usdtAddress,
      buyer.address,
    );

    const data = await usdc.balanceOf(seller.address);
    console.log("seller balance:", data);

    // Approve
    await usdc
      .connect(seller)
      .approve(await vault.getAddress(), swapPermitPayload.sellToken.amount);

    await usdt
      .connect(buyer)
      .approve(await vault.getAddress(), swapPermitPayload.buyToken.amount);

    // Deposit
    await vault
      .connect(seller)
      .deposit(
        swapPermitPayload.sellToken.token,
        swapPermitPayload.sellToken.amount,
        {
          value:
            swapPermitPayload.sellToken.token == ZeroAddress
              ? swapPermitPayload.sellToken.amount
              : 0,
        },
      );
    await vault
      .connect(buyer)
      .deposit(
        swapPermitPayload.buyToken.token,
        swapPermitPayload.buyToken.amount,
      );

    const atomicSwapAddress = await atomicSwap.getAddress();
    const { chainId } = await ethers.provider.getNetwork();
    const deadline = BigInt(await BlockTime.AfterSeconds(100000));

    const { sellerAgreement, buyerAgreement } = generateAgreement(
      swapPermitPayload,
      seller.address,
      buyer.address,
    );
    const { signature: sellerSignature } = await ecdsa.createPermitSignature({
      tokenName: vaultName,
      contractAddress: await vault.getAddress(),
      chainId: chainId,
      author: seller,
      spender: atomicSwapAddress,
      value: swapPermitPayload.sellToken.amount,
      agreement: sellerAgreement,
      deadline,
    });

    const sellerSig = ethers.Signature.from(sellerSignature);
    swapPermitPayload.sellerSignature = {
      deadline,
      v: sellerSig.v,
      r: sellerSig.r,
      s: sellerSig.s,
      owner: seller.address,
    };

    const { signature: buyerSignature } = await ecdsa.createPermitSignature({
      tokenName: vaultName,
      contractAddress: await vault.getAddress(),
      chainId: chainId,
      author: buyer,
      spender: atomicSwapAddress,
      value: swapPermitPayload.buyToken.amount,
      agreement: buyerAgreement,
      deadline,
    });
    const buyerSig = ethers.Signature.from(buyerSignature);
    swapPermitPayload.buyerSignature = {
      deadline,
      v: buyerSig.v,
      r: buyerSig.r,
      s: buyerSig.s,
      owner: buyer.address,
    };
    await expect(
      vault
        .connect(buyer)
        .permit(
          swapPermitPayload.sellToken.token,
          atomicSwapAddress,
          swapPermitPayload.sellToken.amount,
          sellerAgreement,
          swapPermitPayload.sellerSignature,
        ),
    ).to.revertedWith("OwnablePausable: access denied");
  });
  it("should retrieve Domain Separator", async () => {
    const { vault } = await loadFixture(Utils.prepareInChainAtomicTest);
    const domainSeparator = await vault.DOMAIN_SEPARATOR();
    expect(domainSeparator).to.equal(
      "0x698dfb0f8a9b6557cc97cc21a7a41b3a7a23519b45ddee6c15e2df636705b216",
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
