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
    static readonly bytecode = "0x608060405234801561001057600080fd5b50611a62806100206000396000f3fe6080604052600436106100955760003560e01c806382a969e21161005957806382a969e2146101cd5780638da5cb5b1461020b578063d7c2eec714610236578063e1f3d55a1461025f578063f2fde38b1461028a576100e0565b806307d0d916146100e55780631794bb3c14610122578063715018a61461014b5780637623f00e146101625780637b00ffad1461018b576100e0565b366100e057343373ffffffffffffffffffffffffffffffffffffffff167f88a5966d370b9919b20f3e2c13ff65706f196a4e32cc2c12bf57088f8852587460405160405180910390a3005b600080fd5b3480156100f157600080fd5b5061010c60048036038101906101079190611086565b6102b3565b60405161011991906110cc565b60405180910390f35b34801561012e57600080fd5b5061014960048036038101906101449190611113565b6102fc565b005b34801561015757600080fd5b506101606104d5565b005b34801561016e57600080fd5b506101896004803603810190610184919061134a565b6104e9565b005b34801561019757600080fd5b506101b260048036038101906101ad91906113e1565b6107a7565b6040516101c496959493929190611430565b60405180910390f35b3480156101d957600080fd5b506101f460048036038101906101ef9190611491565b610830565b6040516102029291906114e4565b60405180910390f35b34801561021757600080fd5b5061022061087e565b60405161022d919061150d565b60405180910390f35b34801561024257600080fd5b5061025d600480360381019061025891906113e1565b6108b6565b005b34801561026b57600080fd5b50610274610c54565b60405161028191906110cc565b60405180910390f35b34801561029657600080fd5b506102b160048036038101906102ac9190611086565b610c5a565b005b6000600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000610306610ce0565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff161480156103545750825b9050600060018367ffffffffffffffff16148015610389575060003073ffffffffffffffffffffffffffffffffffffffff163b145b905081158015610397575080155b156103ce576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550831561041e5760018560000160086101000a81548160ff0219169083151502179055505b61042788610d08565b86600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508560048190555083156104cb5760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d260016040516104c29190611581565b60405180910390a15b5050505050505050565b6104dd610d8e565b6104e76000610e15565b565b600042905060006040518060c001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020016000815260200160008152509050806000808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600089815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600301556080820151816004015560a082015181600501559050506000600160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000898152602001908152602001600020905060005b845181101561072457818582815181106106ca576106c961159c565b5b6020026020010151908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101555050808061071c906115fa565b9150506106ad565b5060405180608001604052808381526020018581526020018873ffffffffffffffffffffffffffffffffffffffff168152602001898152506040516107699190611885565b60405180910390207fb16abbea6ba3704f5f2a80a6e86817bd96545258a4bbe645becfc85ab722675260405160405180910390a25050505050505050565b6000602052816000526040600020602052806000526040600020600091509150508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030154908060040154908060050154905086565b6001602052826000526040600020602052816000526040600020818154811061085857600080fd5b906000526020600020906002020160009250925050508060000154908060010154905082565b600080610889610eec565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b6108be610f14565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002090506000600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000848152602001908152602001600020905081600101544210156109a3576040517f35549be800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000818054905014806109be57508080549050826005015410155b156109f5576040517f8bdb538100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080836001015490506000846005015490505b8380549050811015610ad757610e10848281548110610a2b57610a2a61159c565b5b906000526020600020906002020160000154610a47919061189c565b82610a5291906118de565b9150814210610ad7576000612710858381548110610a7357610a7261159c565b5b9060005260206000209060020201600101548760030154610a94919061189c565b610a9e9190611941565b90508084610aac91906118de565b9350600182610abb91906118de565b8660050181905550508080610acf906115fa565b915050610a09565b5060008211610b12576040517f3507415000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81846004016000828254610b2691906118de565b925050819055508360020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673__$b9ebb88af43d68d18cc83c52d00a91a1a0$__6306cf2280909188856004546103e8600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518763ffffffff1660e01b8152600401610bd0969594939291906119cb565b60006040518083038186803b158015610be857600080fd5b505af4158015610bfc573d6000803e3d6000fd5b50505050818673ffffffffffffffffffffffffffffffffffffffff167fb21fb52d5749b80f3182f8c6992236b5e5576681880914484d7f4c9b062e619e60405160405180910390a350505050610c50610f6b565b5050565b60045481565b610c62610d8e565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610cd45760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610ccb919061150d565b60405180910390fd5b610cdd81610e15565b50565b60007ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00905090565b610d10610f84565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610d825760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610d79919061150d565b60405180910390fd5b610d8b81610e15565b50565b610d96610fc4565b73ffffffffffffffffffffffffffffffffffffffff16610db461087e565b73ffffffffffffffffffffffffffffffffffffffff1614610e1357610dd7610fc4565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401610e0a919061150d565b60405180910390fd5b565b6000610e1f610eec565b905060008160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050828260000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3505050565b60007f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300905090565b6000610f1e610fcc565b90506002816000015403610f5e576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002816000018190555050565b6000610f75610fcc565b90506001816000018190555050565b610f8c610ff4565b610fc2576040517fd7e6bcf800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b600033905090565b60007f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00905090565b6000610ffe610ce0565b60000160089054906101000a900460ff16905090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061105382611028565b9050919050565b61106381611048565b811461106e57600080fd5b50565b6000813590506110808161105a565b92915050565b60006020828403121561109c5761109b61101e565b5b60006110aa84828501611071565b91505092915050565b6000819050919050565b6110c6816110b3565b82525050565b60006020820190506110e160008301846110bd565b92915050565b6110f0816110b3565b81146110fb57600080fd5b50565b60008135905061110d816110e7565b92915050565b60008060006060848603121561112c5761112b61101e565b5b600061113a86828701611071565b935050602061114b86828701611071565b925050604061115c868287016110fe565b9150509250925092565b6000819050919050565b61117981611166565b811461118457600080fd5b50565b60008135905061119681611170565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6111ea826111a1565b810181811067ffffffffffffffff82111715611209576112086111b2565b5b80604052505050565b600061121c611014565b905061122882826111e1565b919050565b600067ffffffffffffffff821115611248576112476111b2565b5b602082029050602081019050919050565b600080fd5b600080fd5b6000604082840312156112795761127861125e565b5b6112836040611212565b90506000611293848285016110fe565b60008301525060206112a7848285016110fe565b60208301525092915050565b60006112c66112c18461122d565b611212565b905080838252602082019050604084028301858111156112e9576112e8611259565b5b835b8181101561131257806112fe8882611263565b8452602084019350506040810190506112eb565b5050509392505050565b600082601f8301126113315761133061119c565b5b81356113418482602086016112b3565b91505092915050565b600080600080600060a086880312156113665761136561101e565b5b600061137488828901611187565b955050602061138588828901611071565b945050604061139688828901611071565b93505060606113a7888289016110fe565b925050608086013567ffffffffffffffff8111156113c8576113c7611023565b5b6113d48882890161131c565b9150509295509295909350565b600080604083850312156113f8576113f761101e565b5b600061140685828601611071565b925050602061141785828601611187565b9150509250929050565b61142a81611048565b82525050565b600060c0820190506114456000830189611421565b61145260208301886110bd565b61145f6040830187611421565b61146c60608301866110bd565b61147960808301856110bd565b61148660a08301846110bd565b979650505050505050565b6000806000606084860312156114aa576114a961101e565b5b60006114b886828701611071565b93505060206114c986828701611187565b92505060406114da868287016110fe565b9150509250925092565b60006040820190506114f960008301856110bd565b61150660208301846110bd565b9392505050565b60006020820190506115226000830184611421565b92915050565b6000819050919050565b600067ffffffffffffffff82169050919050565b6000819050919050565b600061156b61156661156184611528565b611546565b611532565b9050919050565b61157b81611550565b82525050565b60006020820190506115966000830184611572565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611605826110b3565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611637576116366115cb565b5b600182019050919050565b61164b81611048565b82525050565b600061165d8383611642565b60208301905092915050565b611672816110b3565b82525050565b60006116848383611669565b60208301905092915050565b6000820160008201516116a38482611651565b93505060208201516116b58482611678565b93505060408201516116c78482611651565b93505060608201516116d98482611678565b93505060808201516116eb8482611678565b93505060a08201516116fd8482611678565b935050505050565b60006117118383611690565b60c08301905092915050565b600081519050919050565b600081905092915050565b6000819050602082019050919050565b6000820160008201516117568482611678565b93505060208201516117688482611678565b935050505050565b600061177c8383611743565b60408301905092915050565b6000602082019050919050565b60006117a08261171d565b6117aa8185611728565b93506117b583611733565b8060005b838110156117e65781516117cd8882611770565b97506117d883611788565b9250506001810190506117b9565b5085935050505092915050565b60006117ff8383611795565b905092915050565b61181081611166565b82525050565b60006118228383611807565b60208301905092915050565b600080830160008301516118428582611705565b945050602083015161185485826117f3565b94505060408301516118668582611651565b94505060608301516118788582611816565b9450508391505092915050565b6000611891828461182e565b915081905092915050565b60006118a7826110b3565b91506118b2836110b3565b92508282026118c0816110b3565b915082820484148315176118d7576118d66115cb565b5b5092915050565b60006118e9826110b3565b91506118f4836110b3565b925082820190508082111561190c5761190b6115cb565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061194c826110b3565b9150611957836110b3565b92508261196757611966611912565b5b828204905092915050565b61197b81611048565b82525050565b61198a816110b3565b82525050565b6000819050919050565b60006119b56119b06119ab84611990565b611546565b6110b3565b9050919050565b6119c58161199a565b82525050565b600060c0820190506119e06000830189611972565b6119ed6020830188611972565b6119fa6040830187611981565b611a076060830186611981565b611a1460808301856119bc565b611a2160a0830184611972565b97965050505050505056fea26469706673582212209d29c7592f5c676b6b86ab7fdc44b189b570203d9f5a24f2fc1d0493bd17c13864736f6c63430008140033";
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
                readonly internalType: "struct ICliffVesting.VestingSchedule";
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
            readonly internalType: "struct ICliffVesting.VestingInfo";
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
            readonly name: "beneficiary";
            readonly type: "address";
        }];
        readonly name: "getVestingScheduleCount";
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
        readonly inputs: readonly [];
        readonly name: "sellerFee";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
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
    static createInterface(): CliffVestingInterface;
    static connect(address: string, runner?: ContractRunner | null): CliffVesting;
}
export interface CliffVestingLibraryAddresses {
    ["contracts/abstracts/libs/utils/TokenTransferHelper.sol:TokenTransferHelper"]: string;
}
export {};
