import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { AnteHandler, AnteHandlerInterface } from "../../../../contracts/abstracts/libs/AnteHandler";
type AnteHandlerConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class AnteHandler__factory extends ContractFactory {
    constructor(...args: AnteHandlerConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<AnteHandler & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): AnteHandler__factory;
    static readonly bytecode = "0x611028610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361061004b5760003560e01c806306cf2280146100505780637f2ca76f146100795780638dbb76c7146100a2575b600080fd5b81801561005c57600080fd5b50610077600480360381019061007291906108a4565b6100cb565b005b81801561008557600080fd5b506100a0600480360381019061009b9190610969565b610116565b005b8180156100ae57600080fd5b506100c960048036038101906100c49190610a33565b61025f565b005b60008284866100da9190610b04565b6100e49190610b75565b9050600081866100f49190610ba6565b9050610101888883610341565b61010c888484610341565b5050505050505050565b60008385876101259190610b04565b61012f9190610b75565b90506000818761013f9190610ba6565b905082156101c8576101548b8b8b3085610477565b8a73ffffffffffffffffffffffffffffffffffffffff1663d9caed128b8a846040518463ffffffff1660e01b815260040161019193929190610bf8565b600060405180830381600087803b1580156101ab57600080fd5b505af11580156101bf573d6000803e3d6000fd5b505050506101d6565b6101d58b8b8b8b85610477565b5b6101e38b8b8b3086610477565b8a73ffffffffffffffffffffffffffffffffffffffff1663d9caed128b86856040518463ffffffff1660e01b815260040161022093929190610bf8565b600060405180830381600087803b15801561023a57600080fd5b505af115801561024e573d6000803e3d6000fd5b505050505050505050505050505050565b600082848661026e9190610b04565b6102789190610b75565b9050600081866102889190610ba6565b9050600073ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff16146102db576102ca898989846105d2565b6102d6898985856105d2565b610336565b8534146103215734866040517f04157bb4000000000000000000000000000000000000000000000000000000008152600401610318929190610c2f565b60405180910390fd5b61032b878261070b565b610335838361070b565b5b505050505050505050565b6000808473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb8585604051602401610373929190610c58565b6040516020818303038152906040529060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040516103c19190610cf2565b6000604051808303816000865af19150503d80600081146103fe576040519150601f19603f3d011682016040523d82523d6000602084013e610403565b606091505b5091509150818015610431575060008151148061043057508080602001905181019061042f9190610d1e565b5b5b610470576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161046790610dce565b60405180910390fd5b5050505050565b6000808673ffffffffffffffffffffffffffffffffffffffff166315dacbea60e01b878787876040516024016104b09493929190610dee565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505060405161051a9190610cf2565b6000604051808303816000865af19150503d8060008114610557576040519150601f19603f3d011682016040523d82523d6000602084013e61055c565b606091505b509150915081801561058a57506000815114806105895750808060200190518101906105889190610d1e565b5b5b6105c9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105c090610e7f565b60405180910390fd5b50505050505050565b6000808573ffffffffffffffffffffffffffffffffffffffff166323b872dd86868660405160240161060693929190610bf8565b6040516020818303038152906040529060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040516106549190610cf2565b6000604051808303816000865af19150503d8060008114610691576040519150601f19603f3d011682016040523d82523d6000602084013e610696565b606091505b50915091508180156106c457506000815114806106c35750808060200190518101906106c29190610d1e565b5b5b610703576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106fa90610f11565b60405180910390fd5b505050505050565b60008273ffffffffffffffffffffffffffffffffffffffff1682600067ffffffffffffffff8111156107405761073f610f31565b5b6040519080825280601f01601f1916602001820160405280156107725781602001600182028036833780820191505090505b506040516107809190610cf2565b60006040518083038185875af1925050503d80600081146107bd576040519150601f19603f3d011682016040523d82523d6000602084013e6107c2565b606091505b5050905080610806576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107fd90610fd2565b60405180910390fd5b505050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061083b82610810565b9050919050565b61084b81610830565b811461085657600080fd5b50565b60008135905061086881610842565b92915050565b6000819050919050565b6108818161086e565b811461088c57600080fd5b50565b60008135905061089e81610878565b92915050565b60008060008060008060c087890312156108c1576108c061080b565b5b60006108cf89828a01610859565b96505060206108e089828a01610859565b95505060406108f189828a0161088f565b945050606061090289828a0161088f565b935050608061091389828a0161088f565b92505060a061092489828a01610859565b9150509295509295509295565b60008115159050919050565b61094681610931565b811461095157600080fd5b50565b6000813590506109638161093d565b92915050565b60008060008060008060008060006101208a8c03121561098c5761098b61080b565b5b600061099a8c828d01610859565b99505060206109ab8c828d01610859565b98505060406109bc8c828d01610859565b97505060606109cd8c828d01610859565b96505060806109de8c828d0161088f565b95505060a06109ef8c828d0161088f565b94505060c0610a008c828d0161088f565b93505060e0610a118c828d01610859565b925050610100610a238c828d01610954565b9150509295985092959850929598565b600080600080600080600060e0888a031215610a5257610a5161080b565b5b6000610a608a828b01610859565b9750506020610a718a828b01610859565b9650506040610a828a828b01610859565b9550506060610a938a828b0161088f565b9450506080610aa48a828b0161088f565b93505060a0610ab58a828b0161088f565b92505060c0610ac68a828b01610859565b91505092959891949750929550565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610b0f8261086e565b9150610b1a8361086e565b9250828202610b288161086e565b91508282048414831517610b3f57610b3e610ad5565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610b808261086e565b9150610b8b8361086e565b925082610b9b57610b9a610b46565b5b828204905092915050565b6000610bb18261086e565b9150610bbc8361086e565b9250828203905081811115610bd457610bd3610ad5565b5b92915050565b610be381610830565b82525050565b610bf28161086e565b82525050565b6000606082019050610c0d6000830186610bda565b610c1a6020830185610bda565b610c276040830184610be9565b949350505050565b6000604082019050610c446000830185610be9565b610c516020830184610be9565b9392505050565b6000604082019050610c6d6000830185610bda565b610c7a6020830184610be9565b9392505050565b600081519050919050565b600081905092915050565b60005b83811015610cb5578082015181840152602081019050610c9a565b60008484015250505050565b6000610ccc82610c81565b610cd68185610c8c565b9350610ce6818560208601610c97565b80840191505092915050565b6000610cfe8284610cc1565b915081905092915050565b600081519050610d188161093d565b92915050565b600060208284031215610d3457610d3361080b565b5b6000610d4284828501610d09565b91505092915050565b600082825260208201905092915050565b7f5472616e7366657248656c7065723a3a736166655472616e736665723a20747260008201527f616e73666572206661696c656400000000000000000000000000000000000000602082015250565b6000610db8602d83610d4b565b9150610dc382610d5c565b604082019050919050565b60006020820190508181036000830152610de781610dab565b9050919050565b6000608082019050610e036000830187610bda565b610e106020830186610bda565b610e1d6040830185610bda565b610e2a6060830184610be9565b95945050505050565b7f5354460000000000000000000000000000000000000000000000000000000000600082015250565b6000610e69600383610d4b565b9150610e7482610e33565b602082019050919050565b60006020820190508181036000830152610e9881610e5c565b9050919050565b7f5472616e7366657248656c7065723a3a7472616e7366657246726f6d3a20747260008201527f616e7366657246726f6d206661696c6564000000000000000000000000000000602082015250565b6000610efb603183610d4b565b9150610f0682610e9f565b604082019050919050565b60006020820190508181036000830152610f2a81610eee565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f5472616e7366657248656c7065723a3a736166655472616e736665724554483a60008201527f20455448207472616e73666572206661696c6564000000000000000000000000602082015250565b6000610fbc603483610d4b565b9150610fc782610f60565b604082019050919050565b60006020820190508181036000830152610feb81610faf565b905091905056fea26469706673582212205d5fb116d044486858539a3f2eda7c261818ab677b0b0bf105d777a4eff8641764736f6c63430008140033";
    static readonly abi: readonly [{
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
    }];
    static createInterface(): AnteHandlerInterface;
    static connect(address: string, runner?: ContractRunner | null): AnteHandler;
}
export {};