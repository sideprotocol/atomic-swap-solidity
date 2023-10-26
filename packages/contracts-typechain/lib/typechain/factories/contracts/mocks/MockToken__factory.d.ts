import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { MockToken, MockTokenInterface } from "../../../contracts/mocks/MockToken";
type MockTokenConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class MockToken__factory extends ContractFactory {
    constructor(...args: MockTokenConstructorParams);
    getDeployTransaction(name: string, symbol: string, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(name: string, symbol: string, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<MockToken & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): MockToken__factory;
    static readonly bytecode = "0x60806040526000600560006101000a81548160ff0219169083151502179055503480156200002c57600080fd5b50604051620015f6380380620015f6833981810160405281019062000052919062000215565b81818160039081620000659190620004e5565b508060049081620000779190620004e5565b5050505050620005cc565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620000eb82620000a0565b810181811067ffffffffffffffff821117156200010d576200010c620000b1565b5b80604052505050565b60006200012262000082565b9050620001308282620000e0565b919050565b600067ffffffffffffffff821115620001535762000152620000b1565b5b6200015e82620000a0565b9050602081019050919050565b60005b838110156200018b5780820151818401526020810190506200016e565b60008484015250505050565b6000620001ae620001a88462000135565b62000116565b905082815260208101848484011115620001cd57620001cc6200009b565b5b620001da8482856200016b565b509392505050565b600082601f830112620001fa57620001f962000096565b5b81516200020c84826020860162000197565b91505092915050565b600080604083850312156200022f576200022e6200008c565b5b600083015167ffffffffffffffff81111562000250576200024f62000091565b5b6200025e85828601620001e2565b925050602083015167ffffffffffffffff81111562000282576200028162000091565b5b6200029085828601620001e2565b9150509250929050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620002ed57607f821691505b602082108103620003035762000302620002a5565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200036d7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200032e565b6200037986836200032e565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620003c6620003c0620003ba8462000391565b6200039b565b62000391565b9050919050565b6000819050919050565b620003e283620003a5565b620003fa620003f182620003cd565b8484546200033b565b825550505050565b600090565b6200041162000402565b6200041e818484620003d7565b505050565b5b8181101562000446576200043a60008262000407565b60018101905062000424565b5050565b601f82111562000495576200045f8162000309565b6200046a846200031e565b810160208510156200047a578190505b6200049262000489856200031e565b83018262000423565b50505b505050565b600082821c905092915050565b6000620004ba600019846008026200049a565b1980831691505092915050565b6000620004d58383620004a7565b9150826002028217905092915050565b620004f0826200029a565b67ffffffffffffffff8111156200050c576200050b620000b1565b5b620005188254620002d4565b620005258282856200044a565b600060209050601f8311600181146200055d576000841562000548578287015190505b620005548582620004c7565b865550620005c4565b601f1984166200056d8662000309565b60005b82811015620005975784890151825560018201915060208501945060208101905062000570565b86831015620005b75784890151620005b3601f891682620004a7565b8355505b6001600288020188555050505b505050505050565b61101a80620005dc6000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c806340c10f191161007157806340c10f191461018f57806370a08231146101ab57806395d89b41146101db578063a9059cbb146101f9578063d17c8d4314610229578063dd62ed3e14610247576100b4565b806306fdde03146100b9578063095ea7b3146100d757806318160ddd1461010757806323b872dd14610125578063313ce567146101555780633c57c56514610173575b600080fd5b6100c1610277565b6040516100ce9190610c15565b60405180910390f35b6100f160048036038101906100ec9190610cd0565b610309565b6040516100fe9190610d2b565b60405180910390f35b61010f61032c565b60405161011c9190610d55565b60405180910390f35b61013f600480360381019061013a9190610d70565b610336565b60405161014c9190610d2b565b60405180910390f35b61015d61036b565b60405161016a9190610ddf565b60405180910390f35b61018d60048036038101906101889190610e26565b610374565b005b6101a960048036038101906101a49190610cd0565b610391565b005b6101c560048036038101906101c09190610e53565b61039f565b6040516101d29190610d55565b60405180910390f35b6101e36103e7565b6040516101f09190610c15565b60405180910390f35b610213600480360381019061020e9190610cd0565b610479565b6040516102209190610d2b565b60405180910390f35b61023161049c565b60405161023e9190610d2b565b60405180910390f35b610261600480360381019061025c9190610e80565b6104af565b60405161026e9190610d55565b60405180910390f35b60606003805461028690610eef565b80601f01602080910402602001604051908101604052809291908181526020018280546102b290610eef565b80156102ff5780601f106102d4576101008083540402835291602001916102ff565b820191906000526020600020905b8154815290600101906020018083116102e257829003601f168201915b5050505050905090565b600080610314610536565b905061032181858561053e565b600191505092915050565b6000600254905090565b6000600560009054906101000a900460ff16156103565760009050610364565b610361848484610550565b90505b9392505050565b60006012905090565b80600560006101000a81548160ff02191690831515021790555050565b61039b828261057f565b5050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6060600480546103f690610eef565b80601f016020809104026020016040519081016040528092919081815260200182805461042290610eef565b801561046f5780601f106104445761010080835404028352916020019161046f565b820191906000526020600020905b81548152906001019060200180831161045257829003601f168201915b5050505050905090565b600080610484610536565b9050610491818585610601565b600191505092915050565b600560009054906101000a900460ff1681565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b61054b83838360016106f5565b505050565b60008061055b610536565b90506105688582856108cc565b610573858585610601565b60019150509392505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036105f15760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016105e89190610f2f565b60405180910390fd5b6105fd60008383610960565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036106735760006040517f96c6fd1e00000000000000000000000000000000000000000000000000000000815260040161066a9190610f2f565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036106e55760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016106dc9190610f2f565b60405180910390fd5b6106f0838383610960565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036107675760006040517fe602df0500000000000000000000000000000000000000000000000000000000815260040161075e9190610f2f565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036107d95760006040517f94280d620000000000000000000000000000000000000000000000000000000081526004016107d09190610f2f565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080156108c6578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516108bd9190610d55565b60405180910390a35b50505050565b60006108d884846104af565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff811461095a578181101561094a578281836040517ffb8f41b200000000000000000000000000000000000000000000000000000000815260040161094193929190610f4a565b60405180910390fd5b610959848484840360006106f5565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036109b25780600260008282546109a69190610fb0565b92505081905550610a85565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610a3e578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401610a3593929190610f4a565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610ace5780600260008282540392505081905550610b1b565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610b789190610d55565b60405180910390a3505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610bbf578082015181840152602081019050610ba4565b60008484015250505050565b6000601f19601f8301169050919050565b6000610be782610b85565b610bf18185610b90565b9350610c01818560208601610ba1565b610c0a81610bcb565b840191505092915050565b60006020820190508181036000830152610c2f8184610bdc565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610c6782610c3c565b9050919050565b610c7781610c5c565b8114610c8257600080fd5b50565b600081359050610c9481610c6e565b92915050565b6000819050919050565b610cad81610c9a565b8114610cb857600080fd5b50565b600081359050610cca81610ca4565b92915050565b60008060408385031215610ce757610ce6610c37565b5b6000610cf585828601610c85565b9250506020610d0685828601610cbb565b9150509250929050565b60008115159050919050565b610d2581610d10565b82525050565b6000602082019050610d406000830184610d1c565b92915050565b610d4f81610c9a565b82525050565b6000602082019050610d6a6000830184610d46565b92915050565b600080600060608486031215610d8957610d88610c37565b5b6000610d9786828701610c85565b9350506020610da886828701610c85565b9250506040610db986828701610cbb565b9150509250925092565b600060ff82169050919050565b610dd981610dc3565b82525050565b6000602082019050610df46000830184610dd0565b92915050565b610e0381610d10565b8114610e0e57600080fd5b50565b600081359050610e2081610dfa565b92915050565b600060208284031215610e3c57610e3b610c37565b5b6000610e4a84828501610e11565b91505092915050565b600060208284031215610e6957610e68610c37565b5b6000610e7784828501610c85565b91505092915050565b60008060408385031215610e9757610e96610c37565b5b6000610ea585828601610c85565b9250506020610eb685828601610c85565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610f0757607f821691505b602082108103610f1a57610f19610ec0565b5b50919050565b610f2981610c5c565b82525050565b6000602082019050610f446000830184610f20565b92915050565b6000606082019050610f5f6000830186610f20565b610f6c6020830185610d46565b610f796040830184610d46565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610fbb82610c9a565b9150610fc683610c9a565b9250828201905080821115610fde57610fdd610f81565b5b9291505056fea26469706673582212207f8ed5b490557c03b3f46ee4fe42d616d63fb5a8fd89384a96cca20eb57f8b3d64736f6c63430008140033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "name";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "symbol";
            readonly type: "string";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "allowance";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "needed";
            readonly type: "uint256";
        }];
        readonly name: "ERC20InsufficientAllowance";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "balance";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "needed";
            readonly type: "uint256";
        }];
        readonly name: "ERC20InsufficientBalance";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "approver";
            readonly type: "address";
        }];
        readonly name: "ERC20InvalidApprover";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "receiver";
            readonly type: "address";
        }];
        readonly name: "ERC20InvalidReceiver";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "ERC20InvalidSender";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }];
        readonly name: "ERC20InvalidSpender";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "Approval";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "Transfer";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }];
        readonly name: "allowance";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "spender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "approve";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "balanceOf";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "decimals";
        readonly outputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "";
            readonly type: "uint8";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "failTransferFrom";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
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
        readonly name: "mint";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "name";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bool";
            readonly name: "_value";
            readonly type: "bool";
        }];
        readonly name: "setFailTransferFrom";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "symbol";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "totalSupply";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "transfer";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "transferFrom";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): MockTokenInterface;
    static connect(address: string, runner?: ContractRunner | null): MockToken;
}
export {};
