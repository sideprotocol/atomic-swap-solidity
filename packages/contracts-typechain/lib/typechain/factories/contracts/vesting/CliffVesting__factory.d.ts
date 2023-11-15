import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { CliffVesting, CliffVestingInterface } from "../../../contracts/vesting/CliffVesting";
type CliffVestingConstructorParams = [linkLibraryAddresses: CliffVestingLibraryAddresses, signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class CliffVesting__factory extends ContractFactory {
    constructor(...args: CliffVestingConstructorParams);
    static linkBytecode(linkLibraryAddresses: CliffVestingLibraryAddresses): string;
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<CliffVesting & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): CliffVesting__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b506115ab806100206000396000f3fe60806040526004361061007f5760003560e01c80638da5cb5b1161004e5780638da5cb5b14610176578063d20252a1146101a1578063f2fde38b146101ca578063fdb20ccb146101f3576100ca565b80631794bb3c146100cf57806319165587146100f8578063655d41bd14610121578063715018a61461015f576100ca565b366100ca57343373ffffffffffffffffffffffffffffffffffffffff167f88a5966d370b9919b20f3e2c13ff65706f196a4e32cc2c12bf57088f8852587460405160405180910390a3005b600080fd5b3480156100db57600080fd5b506100f660048036038101906100f19190610f17565b610235565b005b34801561010457600080fd5b5061011f600480360381019061011a9190610f6a565b61040e565b005b34801561012d57600080fd5b5061014860048036038101906101439190610f97565b61078f565b604051610156929190610fe6565b60405180910390f35b34801561016b57600080fd5b506101746107d0565b005b34801561018257600080fd5b5061018b6107e4565b604051610198919061101e565b60405180910390f35b3480156101ad57600080fd5b506101c860048036038101906101c391906111e7565b61081c565b005b3480156101d657600080fd5b506101f160048036038101906101ec9190610f6a565b610a39565b005b3480156101ff57600080fd5b5061021a60048036038101906102159190610f6a565b610abf565b60405161022c9695949392919061126a565b60405180910390f35b600061023f610b3b565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff1614801561028d5750825b9050600060018367ffffffffffffffff161480156102c2575060003073ffffffffffffffffffffffffffffffffffffffff163b145b9050811580156102d0575080155b15610307576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555083156103575760018560000160086101000a81548160ff0219169083151502179055505b61036088610b63565b8560038190555086600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083156104045760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d260016040516103fb9190611324565b60405180910390a15b5050505050505050565b610416610be9565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090506000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905081600101544210156104d9576040517f35549be800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000818054905014806104f457508080549050826005015410155b1561052b576040517f8bdb538100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080836001015490506000846005015490505b838054905081101561060d57610e108482815481106105615761056061133f565b5b90600052602060002090600202016000015461057d919061139d565b8261058891906113df565b915081421061060d5760006127108583815481106105a9576105a861133f565b5b90600052602060002090600202016001015487600301546105ca919061139d565b6105d49190611442565b905080846105e291906113df565b93506001826105f191906113df565b866005018190555050808061060590611473565b91505061053f565b5060008211610648576040517f3507415000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8184600401600082825461065c91906113df565b9250508190555060008460020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff1673__$b9ebb88af43d68d18cc83c52d00a91a1a0$__6306cf2280909188866003546103e8600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518763ffffffff1660e01b815260040161070b96959493929190611514565b60006040518083038186803b15801561072357600080fd5b505af4158015610737573d6000803e3d6000fd5b50505050828673ffffffffffffffffffffffffffffffffffffffff167fb21fb52d5749b80f3182f8c6992236b5e5576681880914484d7f4c9b062e619e60405160405180910390a3505050505061078c610c40565b50565b600160205281600052604060002081815481106107ab57600080fd5b9060005260206000209060020201600091509150508060000154908060010154905082565b6107d8610c59565b6107e26000610ce0565b565b6000806107ef610db7565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b60004290506040518060c001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020018573ffffffffffffffffffffffffffffffffffffffff1681526020018481526020016000815260200160008152506000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600301556080820151816004015560a082015181600501559050506000600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060005b8351811015610a3057818482815181106109d6576109d561133f565b5b60200260200101519080600181540180825580915050600190039060005260206000209060020201600090919091909150600082015181600001556020820151816001015550508080610a2890611473565b9150506109b9565b50505050505050565b610a41610c59565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610ab35760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610aaa919061101e565b60405180910390fd5b610abc81610ce0565b50565b60006020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030154908060040154908060050154905086565b60007ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00905090565b610b6b610ddf565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610bdd5760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610bd4919061101e565b60405180910390fd5b610be681610ce0565b50565b6000610bf3610e1f565b90506002816000015403610c33576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002816000018190555050565b6000610c4a610e1f565b90506001816000018190555050565b610c61610e47565b73ffffffffffffffffffffffffffffffffffffffff16610c7f6107e4565b73ffffffffffffffffffffffffffffffffffffffff1614610cde57610ca2610e47565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401610cd5919061101e565b60405180910390fd5b565b6000610cea610db7565b905060008160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050828260000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3505050565b60007f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300905090565b610de7610e4f565b610e1d576040517fd7e6bcf800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b60007f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00905090565b600033905090565b6000610e59610b3b565b60000160089054906101000a900460ff16905090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610eae82610e83565b9050919050565b610ebe81610ea3565b8114610ec957600080fd5b50565b600081359050610edb81610eb5565b92915050565b6000819050919050565b610ef481610ee1565b8114610eff57600080fd5b50565b600081359050610f1181610eeb565b92915050565b600080600060608486031215610f3057610f2f610e79565b5b6000610f3e86828701610ecc565b9350506020610f4f86828701610ecc565b9250506040610f6086828701610f02565b9150509250925092565b600060208284031215610f8057610f7f610e79565b5b6000610f8e84828501610ecc565b91505092915050565b60008060408385031215610fae57610fad610e79565b5b6000610fbc85828601610ecc565b9250506020610fcd85828601610f02565b9150509250929050565b610fe081610ee1565b82525050565b6000604082019050610ffb6000830185610fd7565b6110086020830184610fd7565b9392505050565b61101881610ea3565b82525050565b6000602082019050611033600083018461100f565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6110878261103e565b810181811067ffffffffffffffff821117156110a6576110a561104f565b5b80604052505050565b60006110b9610e6f565b90506110c5828261107e565b919050565b600067ffffffffffffffff8211156110e5576110e461104f565b5b602082029050602081019050919050565b600080fd5b600080fd5b600060408284031215611116576111156110fb565b5b61112060406110af565b9050600061113084828501610f02565b600083015250602061114484828501610f02565b60208301525092915050565b600061116361115e846110ca565b6110af565b90508083825260208201905060408402830185811115611186576111856110f6565b5b835b818110156111af578061119b8882611100565b845260208401935050604081019050611188565b5050509392505050565b600082601f8301126111ce576111cd611039565b5b81356111de848260208601611150565b91505092915050565b6000806000806080858703121561120157611200610e79565b5b600061120f87828801610ecc565b945050602061122087828801610ecc565b935050604061123187828801610f02565b925050606085013567ffffffffffffffff81111561125257611251610e7e565b5b61125e878288016111b9565b91505092959194509250565b600060c08201905061127f600083018961100f565b61128c6020830188610fd7565b611299604083018761100f565b6112a66060830186610fd7565b6112b36080830185610fd7565b6112c060a0830184610fd7565b979650505050505050565b6000819050919050565b600067ffffffffffffffff82169050919050565b6000819050919050565b600061130e611309611304846112cb565b6112e9565b6112d5565b9050919050565b61131e816112f3565b82525050565b60006020820190506113396000830184611315565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006113a882610ee1565b91506113b383610ee1565b92508282026113c181610ee1565b915082820484148315176113d8576113d761136e565b5b5092915050565b60006113ea82610ee1565b91506113f583610ee1565b925082820190508082111561140d5761140c61136e565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061144d82610ee1565b915061145883610ee1565b92508261146857611467611413565b5b828204905092915050565b600061147e82610ee1565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036114b0576114af61136e565b5b600182019050919050565b6114c481610ea3565b82525050565b6114d381610ee1565b82525050565b6000819050919050565b60006114fe6114f96114f4846114d9565b6112e9565b610ee1565b9050919050565b61150e816114e3565b82525050565b600060c08201905061152960008301896114bb565b61153660208301886114bb565b61154360408301876114ca565b61155060608301866114ca565b61155d6080830185611505565b61156a60a08301846114bb565b97965050505050505056fea26469706673582212202b52097aa98f3fa84c74c5c215d45076c48e38b244f51e62fe84692b5e395c9364736f6c63430008140033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "InvalidInitialization";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidTotalPercentage";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidVesting";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NoVestedTokensAvailable";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NoVestedTokensForRelease";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NotInitializing";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OverMaximumReleaseStep";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }];
        readonly name: "OwnableInvalidOwner";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "OwnableUnauthorizedAccount";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ReentrancyGuardReentrantCall";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "beneficiary";
            readonly type: "address";
        }];
        readonly name: "VestingAlreadyStarted";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "VestingNotStarted";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint64";
            readonly name: "version";
            readonly type: "uint64";
        }];
        readonly name: "Initialized";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "previousOwner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "OwnershipTransferred";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "Received";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "beneficiary";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly name: "Released";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_admin";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "_treasury";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_sellerFee";
            readonly type: "uint256";
        }];
        readonly name: "initialize";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "owner";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "beneficiary";
            readonly type: "address";
        }];
        readonly name: "release";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "releaseInfos";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "durationInHours";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "percentage";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "renounceOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "beneficiary";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "totalAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "durationInHours";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "percentage";
                readonly type: "uint256";
            }];
            readonly internalType: "struct IAtomicSwapBase.Release[]";
            readonly name: "releases";
            readonly type: "tuple[]";
        }];
        readonly name: "startVesting";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "transferOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "vestingSchedules";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "start";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "totalAmount";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "amountReleased";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "lastReleasedStep";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly stateMutability: "payable";
        readonly type: "receive";
    }];
    static createInterface(): CliffVestingInterface;
    static connect(address: string, runner?: ContractRunner | null): CliffVesting;
}
export interface CliffVestingLibraryAddresses {
    ["contracts/abstracts/libs/utils/TokenTransferHelper.sol:TokenTransferHelper"]: string;
}
export {};