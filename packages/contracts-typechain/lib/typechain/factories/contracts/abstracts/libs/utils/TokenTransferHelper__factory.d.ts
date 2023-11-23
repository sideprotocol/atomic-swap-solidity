import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { TokenTransferHelper, TokenTransferHelperInterface } from "../../../../../contracts/abstracts/libs/utils/TokenTransferHelper";
type TokenTransferHelperConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class TokenTransferHelper__factory extends ContractFactory {
    constructor(...args: TokenTransferHelperConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<TokenTransferHelper & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): TokenTransferHelper__factory;
    static readonly bytecode = "0x610bc8610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100405760003560e01c806306cf2280146100455780638dbb76c71461006e575b600080fd5b81801561005157600080fd5b5061006c60048036038101906100679190610786565b610097565b005b81801561007a57600080fd5b5061009560048036038101906100909190610813565b610128565b005b60008284866100a691906108e4565b6100b09190610955565b9050600081866100c09190610986565b9050600073ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff1614610111576101018888836101bc565b61010c8884846101bc565b61011e565b61011d87848385610288565b5b5050505050505050565b600082848661013791906108e4565b6101419190610955565b9050600081866101519190610986565b9050600073ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff16146101a4576101938989898461048e565b61019f8989858561048e565b6101b1565b6101b087848385610288565b5b505050505050505050565b60008390508073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb84846040518363ffffffff1660e01b81526004016101fc9291906109d8565b6020604051808303816000875af115801561021b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061023f9190610a39565b6102825782826040517f1c43b9760000000000000000000000000000000000000000000000000000000081526004016102799291906109d8565b60405180910390fd5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614806102ef5750600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16145b15610326576040517fe6c4247b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008473ffffffffffffffffffffffffffffffffffffffff168360405161034c90610a97565b60006040518083038185875af1925050503d8060008114610389576040519150601f19603f3d011682016040523d82523d6000602084013e61038e565b606091505b50509050806103d65784836040517fbcaf58d00000000000000000000000000000000000000000000000000000000081526004016103cd9291906109d8565b60405180910390fd5b60008473ffffffffffffffffffffffffffffffffffffffff16836040516103fc90610a97565b60006040518083038185875af1925050503d8060008114610439576040519150601f19603f3d011682016040523d82523d6000602084013e61043e565b606091505b50509050806104865784836040517f58590fb900000000000000000000000000000000000000000000000000000000815260040161047d9291906109d8565b60405180910390fd5b505050505050565b600084905060008173ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e86306040518363ffffffff1660e01b81526004016104d0929190610aac565b602060405180830381865afa1580156104ed573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105119190610aea565b90508281101561055a5780836040517f7c8db62f000000000000000000000000000000000000000000000000000000008152600401610551929190610b17565b60405180910390fd5b60008273ffffffffffffffffffffffffffffffffffffffff166370a08231876040518263ffffffff1660e01b81526004016105959190610b40565b602060405180830381865afa1580156105b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105d69190610aea565b90508381101561061f5780846040517f04157bb4000000000000000000000000000000000000000000000000000000008152600401610616929190610b17565b60405180910390fd5b8273ffffffffffffffffffffffffffffffffffffffff166323b872dd8787876040518463ffffffff1660e01b815260040161065c93929190610b5b565b6020604051808303816000875af115801561067b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061069f9190610a39565b6106e4578585856040517fca7f5f0e0000000000000000000000000000000000000000000000000000000081526004016106db93929190610b5b565b60405180910390fd5b50505050505050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061071d826106f2565b9050919050565b61072d81610712565b811461073857600080fd5b50565b60008135905061074a81610724565b92915050565b6000819050919050565b61076381610750565b811461076e57600080fd5b50565b6000813590506107808161075a565b92915050565b60008060008060008060c087890312156107a3576107a26106ed565b5b60006107b189828a0161073b565b96505060206107c289828a0161073b565b95505060406107d389828a01610771565b94505060606107e489828a01610771565b93505060806107f589828a01610771565b92505060a061080689828a0161073b565b9150509295509295509295565b600080600080600080600060e0888a031215610832576108316106ed565b5b60006108408a828b0161073b565b97505060206108518a828b0161073b565b96505060406108628a828b0161073b565b95505060606108738a828b01610771565b94505060806108848a828b01610771565b93505060a06108958a828b01610771565b92505060c06108a68a828b0161073b565b91505092959891949750929550565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006108ef82610750565b91506108fa83610750565b925082820261090881610750565b9150828204841483151761091f5761091e6108b5565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061096082610750565b915061096b83610750565b92508261097b5761097a610926565b5b828204905092915050565b600061099182610750565b915061099c83610750565b92508282039050818111156109b4576109b36108b5565b5b92915050565b6109c381610712565b82525050565b6109d281610750565b82525050565b60006040820190506109ed60008301856109ba565b6109fa60208301846109c9565b9392505050565b60008115159050919050565b610a1681610a01565b8114610a2157600080fd5b50565b600081519050610a3381610a0d565b92915050565b600060208284031215610a4f57610a4e6106ed565b5b6000610a5d84828501610a24565b91505092915050565b600081905092915050565b50565b6000610a81600083610a66565b9150610a8c82610a71565b600082019050919050565b6000610aa282610a74565b9150819050919050565b6000604082019050610ac160008301856109ba565b610ace60208301846109ba565b9392505050565b600081519050610ae48161075a565b92915050565b600060208284031215610b0057610aff6106ed565b5b6000610b0e84828501610ad5565b91505092915050565b6000604082019050610b2c60008301856109c9565b610b3960208301846109c9565b9392505050565b6000602082019050610b5560008301846109ba565b92915050565b6000606082019050610b7060008301866109ba565b610b7d60208301856109ba565b610b8a60408301846109c9565b94935050505056fea264697066735822122071b906c42044907ff4196ccf9bbfbdb52edab28fc2a5b3968b5d3180ac68655864736f6c63430008140033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "InvalidAddress";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "allowance";
            readonly type: "uint256";
        }];
        readonly name: "NotAllowedTransferAmount";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "real";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "expected";
            readonly type: "uint256";
        }];
        readonly name: "NotEnoughFund";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "TransferFailed";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "TransferFromFailed";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "TransferToRecipientFailed";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "TransferToTreasuryFailed";
        readonly type: "error";
    }];
    static createInterface(): TokenTransferHelperInterface;
    static connect(address: string, runner?: ContractRunner | null): TokenTransferHelper;
}
export {};
