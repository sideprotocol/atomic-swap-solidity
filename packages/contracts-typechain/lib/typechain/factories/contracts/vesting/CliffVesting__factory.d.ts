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
    static readonly bytecode = "0x608060405234801561001057600080fd5b506119d1806100206000396000f3fe60806040526004361061008a5760003560e01c806382a969e21161005957806382a969e2146101855780638da5cb5b146101c3578063d7c2eec7146101ee578063e1f3d55a14610217578063f2fde38b14610242576100d5565b80631794bb3c146100da578063715018a6146101035780637623f00e1461011a5780637b00ffad14610143576100d5565b366100d557343373ffffffffffffffffffffffffffffffffffffffff167f88a5966d370b9919b20f3e2c13ff65706f196a4e32cc2c12bf57088f8852587460405160405180910390a3005b600080fd5b3480156100e657600080fd5b5061010160048036038101906100fc919061102b565b61026b565b005b34801561010f57600080fd5b50610118610444565b005b34801561012657600080fd5b50610141600480360381019061013c9190611262565b610458565b005b34801561014f57600080fd5b5061016a600480360381019061016591906112f9565b610716565b60405161017c96959493929190611357565b60405180910390f35b34801561019157600080fd5b506101ac60048036038101906101a791906113b8565b61079f565b6040516101ba92919061140b565b60405180910390f35b3480156101cf57600080fd5b506101d86107ed565b6040516101e59190611434565b60405180910390f35b3480156101fa57600080fd5b50610215600480360381019061021091906112f9565b610825565b005b34801561022357600080fd5b5061022c610bc3565b604051610239919061144f565b60405180910390f35b34801561024e57600080fd5b506102696004803603810190610264919061146a565b610bc9565b005b6000610275610c4f565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff161480156102c35750825b9050600060018367ffffffffffffffff161480156102f8575060003073ffffffffffffffffffffffffffffffffffffffff163b145b905081158015610306575080155b1561033d576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550831561038d5760018560000160086101000a81548160ff0219169083151502179055505b61039688610c77565b86600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085600381905550831561043a5760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2600160405161043191906114f0565b60405180910390a15b5050505050505050565b61044c610cfd565b6104566000610d84565b565b600042905060006040518060c001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020016000815260200160008152509050806000808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600089815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600301556080820151816004015560a082015181600501559050506000600160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000898152602001908152602001600020905060005b845181101561069357818582815181106106395761063861150b565b5b6020026020010151908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101555050808061068b90611569565b91505061061c565b5060405180608001604052808381526020018581526020018873ffffffffffffffffffffffffffffffffffffffff168152602001898152506040516106d891906117f4565b60405180910390207fb16abbea6ba3704f5f2a80a6e86817bd96545258a4bbe645becfc85ab722675260405160405180910390a25050505050505050565b6000602052816000526040600020602052806000526040600020600091509150508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030154908060040154908060050154905086565b600160205282600052604060002060205281600052604060002081815481106107c757600080fd5b906000526020600020906002020160009250925050508060000154908060010154905082565b6000806107f8610e5b565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b61082d610e83565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002090506000600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002090508160010154421015610912576040517f35549be800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008180549050148061092d57508080549050826005015410155b15610964576040517f8bdb538100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080836001015490506000846005015490505b8380549050811015610a4657610e1084828154811061099a5761099961150b565b5b9060005260206000209060020201600001546109b6919061180b565b826109c1919061184d565b9150814210610a465760006127108583815481106109e2576109e161150b565b5b9060005260206000209060020201600101548760030154610a03919061180b565b610a0d91906118b0565b90508084610a1b919061184d565b9350600182610a2a919061184d565b8660050181905550508080610a3e90611569565b915050610978565b5060008211610a81576040517f3507415000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81846004016000828254610a95919061184d565b925050819055508360020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673__$b9ebb88af43d68d18cc83c52d00a91a1a0$__6306cf2280909188856003546103e8600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518763ffffffff1660e01b8152600401610b3f9695949392919061193a565b60006040518083038186803b158015610b5757600080fd5b505af4158015610b6b573d6000803e3d6000fd5b50505050818673ffffffffffffffffffffffffffffffffffffffff167fb21fb52d5749b80f3182f8c6992236b5e5576681880914484d7f4c9b062e619e60405160405180910390a350505050610bbf610eda565b5050565b60035481565b610bd1610cfd565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610c435760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610c3a9190611434565b60405180910390fd5b610c4c81610d84565b50565b60007ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00905090565b610c7f610ef3565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610cf15760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610ce89190611434565b60405180910390fd5b610cfa81610d84565b50565b610d05610f33565b73ffffffffffffffffffffffffffffffffffffffff16610d236107ed565b73ffffffffffffffffffffffffffffffffffffffff1614610d8257610d46610f33565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401610d799190611434565b60405180910390fd5b565b6000610d8e610e5b565b905060008160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050828260000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3505050565b60007f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300905090565b6000610e8d610f3b565b90506002816000015403610ecd576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002816000018190555050565b6000610ee4610f3b565b90506001816000018190555050565b610efb610f63565b610f31576040517fd7e6bcf800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b600033905090565b60007f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00905090565b6000610f6d610c4f565b60000160089054906101000a900460ff16905090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610fc282610f97565b9050919050565b610fd281610fb7565b8114610fdd57600080fd5b50565b600081359050610fef81610fc9565b92915050565b6000819050919050565b61100881610ff5565b811461101357600080fd5b50565b60008135905061102581610fff565b92915050565b60008060006060848603121561104457611043610f8d565b5b600061105286828701610fe0565b935050602061106386828701610fe0565b925050604061107486828701611016565b9150509250925092565b6000819050919050565b6110918161107e565b811461109c57600080fd5b50565b6000813590506110ae81611088565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611102826110b9565b810181811067ffffffffffffffff82111715611121576111206110ca565b5b80604052505050565b6000611134610f83565b905061114082826110f9565b919050565b600067ffffffffffffffff8211156111605761115f6110ca565b5b602082029050602081019050919050565b600080fd5b600080fd5b60006040828403121561119157611190611176565b5b61119b604061112a565b905060006111ab84828501611016565b60008301525060206111bf84828501611016565b60208301525092915050565b60006111de6111d984611145565b61112a565b9050808382526020820190506040840283018581111561120157611200611171565b5b835b8181101561122a5780611216888261117b565b845260208401935050604081019050611203565b5050509392505050565b600082601f830112611249576112486110b4565b5b81356112598482602086016111cb565b91505092915050565b600080600080600060a0868803121561127e5761127d610f8d565b5b600061128c8882890161109f565b955050602061129d88828901610fe0565b94505060406112ae88828901610fe0565b93505060606112bf88828901611016565b925050608086013567ffffffffffffffff8111156112e0576112df610f92565b5b6112ec88828901611234565b9150509295509295909350565b600080604083850312156113105761130f610f8d565b5b600061131e85828601610fe0565b925050602061132f8582860161109f565b9150509250929050565b61134281610fb7565b82525050565b61135181610ff5565b82525050565b600060c08201905061136c6000830189611339565b6113796020830188611348565b6113866040830187611339565b6113936060830186611348565b6113a06080830185611348565b6113ad60a0830184611348565b979650505050505050565b6000806000606084860312156113d1576113d0610f8d565b5b60006113df86828701610fe0565b93505060206113f08682870161109f565b925050604061140186828701611016565b9150509250925092565b60006040820190506114206000830185611348565b61142d6020830184611348565b9392505050565b60006020820190506114496000830184611339565b92915050565b60006020820190506114646000830184611348565b92915050565b6000602082840312156114805761147f610f8d565b5b600061148e84828501610fe0565b91505092915050565b6000819050919050565b600067ffffffffffffffff82169050919050565b6000819050919050565b60006114da6114d56114d084611497565b6114b5565b6114a1565b9050919050565b6114ea816114bf565b82525050565b600060208201905061150560008301846114e1565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061157482610ff5565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036115a6576115a561153a565b5b600182019050919050565b6115ba81610fb7565b82525050565b60006115cc83836115b1565b60208301905092915050565b6115e181610ff5565b82525050565b60006115f383836115d8565b60208301905092915050565b60008201600082015161161284826115c0565b935050602082015161162484826115e7565b935050604082015161163684826115c0565b935050606082015161164884826115e7565b935050608082015161165a84826115e7565b93505060a082015161166c84826115e7565b935050505050565b600061168083836115ff565b60c08301905092915050565b600081519050919050565b600081905092915050565b6000819050602082019050919050565b6000820160008201516116c584826115e7565b93505060208201516116d784826115e7565b935050505050565b60006116eb83836116b2565b60408301905092915050565b6000602082019050919050565b600061170f8261168c565b6117198185611697565b9350611724836116a2565b8060005b8381101561175557815161173c88826116df565b9750611747836116f7565b925050600181019050611728565b5085935050505092915050565b600061176e8383611704565b905092915050565b61177f8161107e565b82525050565b60006117918383611776565b60208301905092915050565b600080830160008301516117b18582611674565b94505060208301516117c38582611762565b94505060408301516117d585826115c0565b94505060608301516117e78582611785565b9450508391505092915050565b6000611800828461179d565b915081905092915050565b600061181682610ff5565b915061182183610ff5565b925082820261182f81610ff5565b915082820484148315176118465761184561153a565b5b5092915050565b600061185882610ff5565b915061186383610ff5565b925082820190508082111561187b5761187a61153a565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006118bb82610ff5565b91506118c683610ff5565b9250826118d6576118d5611881565b5b828204905092915050565b6118ea81610fb7565b82525050565b6118f981610ff5565b82525050565b6000819050919050565b600061192461191f61191a846118ff565b6114b5565b610ff5565b9050919050565b61193481611909565b82525050565b600060c08201905061194f60008301896118e1565b61195c60208301886118e1565b61196960408301876118f0565b61197660608301866118f0565b611983608083018561192b565b61199060a08301846118e1565b97965050505050505056fea26469706673582212206031e925c32e13f09b4ae860b134dd8b7d941a9f50f131d1c64c3a9326c7345c64736f6c63430008140033";
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
