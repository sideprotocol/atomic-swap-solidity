import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { Vesting, VestingInterface } from "../../../contracts/vesting/Vesting";
type VestingConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Vesting__factory extends ContractFactory {
    constructor(...args: VestingConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<Vesting & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): Vesting__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50611a4e806100206000396000f3fe60806040526004361061007f5760003560e01c80638da5cb5b1161004e5780638da5cb5b1461018f578063c4d66de8146101ba578063d7c2eec7146101e3578063f2fde38b1461020c576100ca565b8063715018a6146100cf5780637623f00e146100e65780637b00ffad1461010f57806382a969e214610151576100ca565b366100ca57343373ffffffffffffffffffffffffffffffffffffffff167f88a5966d370b9919b20f3e2c13ff65706f196a4e32cc2c12bf57088f8852587460405160405180910390a3005b600080fd5b3480156100db57600080fd5b506100e4610235565b005b3480156100f257600080fd5b5061010d600480360381019061010891906112e0565b610249565b005b34801561011b57600080fd5b5061013660048036038101906101319190611377565b610507565b604051610148969594939291906113d5565b60405180910390f35b34801561015d57600080fd5b5061017860048036038101906101739190611436565b610590565b604051610186929190611489565b60405180910390f35b34801561019b57600080fd5b506101a46105de565b6040516101b191906114b2565b60405180910390f35b3480156101c657600080fd5b506101e160048036038101906101dc91906114cd565b610616565b005b3480156101ef57600080fd5b5061020a60048036038101906102059190611377565b6107a5565b005b34801561021857600080fd5b50610233600480360381019061022e91906114cd565b610bce565b005b61023d610c54565b6102476000610cdb565b565b600042905060006040518060c001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020016000815260200160008152509050806000808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600089815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600301556080820151816004015560a082015181600501559050506000600160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000898152602001908152602001600020905060005b8451811015610484578185828151811061042a576104296114fa565b5b6020026020010151908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101555050808061047c90611558565b91505061040d565b5060405180608001604052808381526020018581526020018873ffffffffffffffffffffffffffffffffffffffff168152602001898152506040516104c991906117e3565b60405180910390207fb16abbea6ba3704f5f2a80a6e86817bd96545258a4bbe645becfc85ab722675260405160405180910390a25050505050505050565b6000602052816000526040600020602052806000526040600020600091509150508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030154908060040154908060050154905086565b600160205282600052604060002060205281600052604060002081815481106105b857600080fd5b906000526020600020906002020160009250925050508060000154908060010154905082565b6000806105e9610db2565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b6000610620610dda565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff1614801561066e5750825b9050600060018367ffffffffffffffff161480156106a3575060003073ffffffffffffffffffffffffffffffffffffffff163b145b9050811580156106b1575080155b156106e8576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555083156107385760018560000160086101000a81548160ff0219169083151502179055505b61074186610e02565b831561079d5760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d260016040516107949190611853565b60405180910390a15b505050505050565b6107ad610e88565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002090506000600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002090508160010154421015610892576040517f35549be800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000818054905014806108ad57508080549050826005015410155b156108e4576040517f8bdb538100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080836001015490506000846005015490505b83805490508110156109c657610e1084828154811061091a576109196114fa565b5b906000526020600020906002020160000154610936919061186e565b8261094191906118b0565b91508142106109c6576000612710858381548110610962576109616114fa565b5b9060005260206000209060020201600101548760030154610983919061186e565b61098d9190611913565b9050808461099b91906118b0565b93506001826109aa91906118b0565b86600501819055505080806109be90611558565b9150506108f8565b5060008211610a01576040517f3507415000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81846004016000828254610a1591906118b0565b92505081905550600073ffffffffffffffffffffffffffffffffffffffff168460020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610ac857610ac386838660020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16610edf9092919063ffffffff16565b610b7a565b60008673ffffffffffffffffffffffffffffffffffffffff1683604051610aee90611975565b60006040518083038185875af1925050503d8060008114610b2b576040519150601f19603f3d011682016040523d82523d6000602084013e610b30565b606091505b5050905080610b785786836040517fbcaf58d0000000000000000000000000000000000000000000000000000000008152600401610b6f92919061198a565b60405180910390fd5b505b818673ffffffffffffffffffffffffffffffffffffffff167fb21fb52d5749b80f3182f8c6992236b5e5576681880914484d7f4c9b062e619e60405160405180910390a350505050610bca610fab565b5050565b610bd6610c54565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610c485760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610c3f91906114b2565b60405180910390fd5b610c5181610cdb565b50565b610c5c610fc4565b73ffffffffffffffffffffffffffffffffffffffff16610c7a6105de565b73ffffffffffffffffffffffffffffffffffffffff1614610cd957610c9d610fc4565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401610cd091906114b2565b60405180910390fd5b565b6000610ce5610db2565b905060008160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050828260000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3505050565b60007f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300905090565b60007ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00905090565b610e0a610fcc565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610e7c5760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610e7391906114b2565b60405180910390fd5b610e8581610cdb565b50565b6000610e9261100c565b90506002816000015403610ed2576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002816000018190555050565b60008390508073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb84846040518363ffffffff1660e01b8152600401610f1f92919061198a565b6020604051808303816000875af1158015610f3e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f6291906119eb565b610fa55782826040517f1c43b976000000000000000000000000000000000000000000000000000000008152600401610f9c92919061198a565b60405180910390fd5b50505050565b6000610fb561100c565b90506001816000018190555050565b600033905090565b610fd4611034565b61100a576040517fd7e6bcf800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b60007f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00905090565b600061103e610dda565b60000160089054906101000a900460ff16905090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b61107b81611068565b811461108657600080fd5b50565b60008135905061109881611072565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006110c98261109e565b9050919050565b6110d9816110be565b81146110e457600080fd5b50565b6000813590506110f6816110d0565b92915050565b6000819050919050565b61110f816110fc565b811461111a57600080fd5b50565b60008135905061112c81611106565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61118082611137565b810181811067ffffffffffffffff8211171561119f5761119e611148565b5b80604052505050565b60006111b2611054565b90506111be8282611177565b919050565b600067ffffffffffffffff8211156111de576111dd611148565b5b602082029050602081019050919050565b600080fd5b600080fd5b60006040828403121561120f5761120e6111f4565b5b61121960406111a8565b905060006112298482850161111d565b600083015250602061123d8482850161111d565b60208301525092915050565b600061125c611257846111c3565b6111a8565b9050808382526020820190506040840283018581111561127f5761127e6111ef565b5b835b818110156112a8578061129488826111f9565b845260208401935050604081019050611281565b5050509392505050565b600082601f8301126112c7576112c6611132565b5b81356112d7848260208601611249565b91505092915050565b600080600080600060a086880312156112fc576112fb61105e565b5b600061130a88828901611089565b955050602061131b888289016110e7565b945050604061132c888289016110e7565b935050606061133d8882890161111d565b925050608086013567ffffffffffffffff81111561135e5761135d611063565b5b61136a888289016112b2565b9150509295509295909350565b6000806040838503121561138e5761138d61105e565b5b600061139c858286016110e7565b92505060206113ad85828601611089565b9150509250929050565b6113c0816110be565b82525050565b6113cf816110fc565b82525050565b600060c0820190506113ea60008301896113b7565b6113f760208301886113c6565b61140460408301876113b7565b61141160608301866113c6565b61141e60808301856113c6565b61142b60a08301846113c6565b979650505050505050565b60008060006060848603121561144f5761144e61105e565b5b600061145d868287016110e7565b935050602061146e86828701611089565b925050604061147f8682870161111d565b9150509250925092565b600060408201905061149e60008301856113c6565b6114ab60208301846113c6565b9392505050565b60006020820190506114c760008301846113b7565b92915050565b6000602082840312156114e3576114e261105e565b5b60006114f1848285016110e7565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611563826110fc565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361159557611594611529565b5b600182019050919050565b6115a9816110be565b82525050565b60006115bb83836115a0565b60208301905092915050565b6115d0816110fc565b82525050565b60006115e283836115c7565b60208301905092915050565b60008201600082015161160184826115af565b935050602082015161161384826115d6565b935050604082015161162584826115af565b935050606082015161163784826115d6565b935050608082015161164984826115d6565b93505060a082015161165b84826115d6565b935050505050565b600061166f83836115ee565b60c08301905092915050565b600081519050919050565b600081905092915050565b6000819050602082019050919050565b6000820160008201516116b484826115d6565b93505060208201516116c684826115d6565b935050505050565b60006116da83836116a1565b60408301905092915050565b6000602082019050919050565b60006116fe8261167b565b6117088185611686565b935061171383611691565b8060005b8381101561174457815161172b88826116ce565b9750611736836116e6565b925050600181019050611717565b5085935050505092915050565b600061175d83836116f3565b905092915050565b61176e81611068565b82525050565b60006117808383611765565b60208301905092915050565b600080830160008301516117a08582611663565b94505060208301516117b28582611751565b94505060408301516117c485826115af565b94505060608301516117d68582611774565b9450508391505092915050565b60006117ef828461178c565b915081905092915050565b6000819050919050565b600067ffffffffffffffff82169050919050565b6000819050919050565b600061183d611838611833846117fa565b611818565b611804565b9050919050565b61184d81611822565b82525050565b60006020820190506118686000830184611844565b92915050565b6000611879826110fc565b9150611884836110fc565b9250828202611892816110fc565b915082820484148315176118a9576118a8611529565b5b5092915050565b60006118bb826110fc565b91506118c6836110fc565b92508282019050808211156118de576118dd611529565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061191e826110fc565b9150611929836110fc565b925082611939576119386118e4565b5b828204905092915050565b600081905092915050565b50565b600061195f600083611944565b915061196a8261194f565b600082019050919050565b600061198082611952565b9150819050919050565b600060408201905061199f60008301856113b7565b6119ac60208301846113c6565b9392505050565b60008115159050919050565b6119c8816119b3565b81146119d357600080fd5b50565b6000815190506119e5816119bf565b92915050565b600060208284031215611a0157611a0061105e565b5b6000611a0f848285016119d6565b9150509291505056fea2646970667358221220705e4ec205896db884826d3127c9519d2388aa19e670998f1318a63a71d7b91b64736f6c63430008140033";
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
            readonly components: readonly [{
                readonly components: readonly [{
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
                readonly internalType: "struct IVesting.VestingSchedule";
                readonly name: "schedule";
                readonly type: "tuple";
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
                readonly name: "release";
                readonly type: "tuple[]";
            }, {
                readonly internalType: "address";
                readonly name: "beneficiary";
                readonly type: "address";
            }, {
                readonly internalType: "bytes32";
                readonly name: "orderId";
                readonly type: "bytes32";
            }];
            readonly indexed: true;
            readonly internalType: "struct IVesting.VestingInfo";
            readonly name: "vesting";
            readonly type: "tuple";
        }];
        readonly name: "NewVesting";
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
        }, {
            readonly internalType: "bytes32";
            readonly name: "orderId";
            readonly type: "bytes32";
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
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
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
            readonly internalType: "bytes32";
            readonly name: "orderId";
            readonly type: "bytes32";
        }, {
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
        }, {
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
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
    static createInterface(): VestingInterface;
    static connect(address: string, runner?: ContractRunner | null): Vesting;
}
export {};
