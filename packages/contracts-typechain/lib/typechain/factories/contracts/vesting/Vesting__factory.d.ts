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
    static readonly bytecode = "0x608060405234801561001057600080fd5b50611df7806100206000396000f3fe60806040526004361061007f5760003560e01c80638da5cb5b1161004e5780638da5cb5b14610182578063c4d66de8146101ad578063d7c2eec7146101d6578063f2fde38b146101ff576100ca565b8063715018a6146100cf5780637623f00e146100e65780637b00ffad1461010257806382a969e214610144576100ca565b366100ca57343373ffffffffffffffffffffffffffffffffffffffff167f88a5966d370b9919b20f3e2c13ff65706f196a4e32cc2c12bf57088f8852587460405160405180910390a3005b600080fd5b3480156100db57600080fd5b506100e4610228565b005b61010060048036038101906100fb91906115e7565b61023c565b005b34801561010e57600080fd5b506101296004803603810190610124919061167e565b61056d565b60405161013b969594939291906116dc565b60405180910390f35b34801561015057600080fd5b5061016b6004803603810190610166919061173d565b6105f6565b604051610179929190611790565b60405180910390f35b34801561018e57600080fd5b50610197610644565b6040516101a491906117b9565b60405180910390f35b3480156101b957600080fd5b506101d460048036038101906101cf91906117d4565b61067c565b005b3480156101e257600080fd5b506101fd60048036038101906101f8919061167e565b61080b565b005b34801561020b57600080fd5b50610226600480360381019061022191906117d4565b610c76565b005b610230610cfc565b61023a6000610d83565b565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036102815781341461027c57600080fd5b6102af565b6102ae3330848673ffffffffffffffffffffffffffffffffffffffff16610e5a909392919063ffffffff16565b5b600042905060006040518060c001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018673ffffffffffffffffffffffffffffffffffffffff1681526020018581526020016000815260200160008152509050806000808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600089815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600301556080820151816004015560a082015181600501559050506000600160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000898152602001908152602001600020905060005b84518110156104ea57818582815181106104905761048f611801565b5b602002602001015190806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010155505080806104e29061185f565b915050610473565b5060405180608001604052808381526020018581526020018873ffffffffffffffffffffffffffffffffffffffff1681526020018981525060405161052f9190611aea565b60405180910390207fb16abbea6ba3704f5f2a80a6e86817bd96545258a4bbe645becfc85ab722675260405160405180910390a25050505050505050565b6000602052816000526040600020602052806000526040600020600091509150508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030154908060040154908060050154905086565b6001602052826000526040600020602052816000526040600020818154811061061e57600080fd5b906000526020600020906002020160009250925050508060000154908060010154905082565b60008061064f6110b9565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b60006106866110e1565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff161480156106d45750825b9050600060018367ffffffffffffffff16148015610709575060003073ffffffffffffffffffffffffffffffffffffffff163b145b905081158015610717575080155b1561074e576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550831561079e5760018560000160086101000a81548160ff0219169083151502179055505b6107a786611109565b83156108035760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d260016040516107fa9190611b5a565b60405180910390a15b505050505050565b61081361118f565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002090506000600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000848152602001908152602001600020905081600101544210156108f8576040517f35549be800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008180549050148061091357508080549050826005015410155b1561094a576040517f8bdb538100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080836001015490506000846005015490505b8380549050811015610a2c57610e108482815481106109805761097f611801565b5b90600052602060002090600202016000015461099c9190611b75565b826109a79190611bb7565b9150814210610a2c5760006127108583815481106109c8576109c7611801565b5b90600052602060002090600202016001015487600301546109e99190611b75565b6109f39190611c1a565b90508084610a019190611bb7565b9350600182610a109190611bb7565b8660050181905550508080610a249061185f565b91505061095e565b5060008211610a67576040517f3507415000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81846004016000828254610a7b9190611bb7565b92505081905550836003015484600401541115610ac4576040517f3507415000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168460020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610b7057610b6b86838660020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166111e69092919063ffffffff16565b610c22565b60008673ffffffffffffffffffffffffffffffffffffffff1683604051610b9690611c7c565b60006040518083038185875af1925050503d8060008114610bd3576040519150601f19603f3d011682016040523d82523d6000602084013e610bd8565b606091505b5050905080610c205786836040517fbcaf58d0000000000000000000000000000000000000000000000000000000008152600401610c17929190611c91565b60405180910390fd5b505b818673ffffffffffffffffffffffffffffffffffffffff167fb21fb52d5749b80f3182f8c6992236b5e5576681880914484d7f4c9b062e619e60405160405180910390a350505050610c726112b2565b5050565b610c7e610cfc565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610cf05760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610ce791906117b9565b60405180910390fd5b610cf981610d83565b50565b610d046112cb565b73ffffffffffffffffffffffffffffffffffffffff16610d22610644565b73ffffffffffffffffffffffffffffffffffffffff1614610d8157610d456112cb565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401610d7891906117b9565b60405180910390fd5b565b6000610d8d6110b9565b905060008160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050828260000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3505050565b600084905060008173ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e86306040518363ffffffff1660e01b8152600401610e9c929190611cba565b602060405180830381865afa158015610eb9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610edd9190611cf8565b905082811015610f265780836040517f7c8db62f000000000000000000000000000000000000000000000000000000008152600401610f1d929190611790565b60405180910390fd5b60008273ffffffffffffffffffffffffffffffffffffffff166370a08231876040518263ffffffff1660e01b8152600401610f6191906117b9565b602060405180830381865afa158015610f7e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fa29190611cf8565b905083811015610feb5780846040517f04157bb4000000000000000000000000000000000000000000000000000000008152600401610fe2929190611790565b60405180910390fd5b8273ffffffffffffffffffffffffffffffffffffffff166323b872dd8787876040518463ffffffff1660e01b815260040161102893929190611d25565b6020604051808303816000875af1158015611047573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061106b9190611d94565b6110b0578585856040517fca7f5f0e0000000000000000000000000000000000000000000000000000000081526004016110a793929190611d25565b60405180910390fd5b50505050505050565b60007f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300905090565b60007ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00905090565b6111116112d3565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036111835760006040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161117a91906117b9565b60405180910390fd5b61118c81610d83565b50565b6000611199611313565b905060028160000154036111d9576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002816000018190555050565b60008390508073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb84846040518363ffffffff1660e01b8152600401611226929190611c91565b6020604051808303816000875af1158015611245573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112699190611d94565b6112ac5782826040517f1c43b9760000000000000000000000000000000000000000000000000000000081526004016112a3929190611c91565b60405180910390fd5b50505050565b60006112bc611313565b90506001816000018190555050565b600033905090565b6112db61133b565b611311576040517fd7e6bcf800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b60007f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00905090565b60006113456110e1565b60000160089054906101000a900460ff16905090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b6113828161136f565b811461138d57600080fd5b50565b60008135905061139f81611379565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006113d0826113a5565b9050919050565b6113e0816113c5565b81146113eb57600080fd5b50565b6000813590506113fd816113d7565b92915050565b6000819050919050565b61141681611403565b811461142157600080fd5b50565b6000813590506114338161140d565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6114878261143e565b810181811067ffffffffffffffff821117156114a6576114a561144f565b5b80604052505050565b60006114b961135b565b90506114c5828261147e565b919050565b600067ffffffffffffffff8211156114e5576114e461144f565b5b602082029050602081019050919050565b600080fd5b600080fd5b600060408284031215611516576115156114fb565b5b61152060406114af565b9050600061153084828501611424565b600083015250602061154484828501611424565b60208301525092915050565b600061156361155e846114ca565b6114af565b90508083825260208201905060408402830185811115611586576115856114f6565b5b835b818110156115af578061159b8882611500565b845260208401935050604081019050611588565b5050509392505050565b600082601f8301126115ce576115cd611439565b5b81356115de848260208601611550565b91505092915050565b600080600080600060a0868803121561160357611602611365565b5b600061161188828901611390565b9550506020611622888289016113ee565b9450506040611633888289016113ee565b935050606061164488828901611424565b925050608086013567ffffffffffffffff8111156116655761166461136a565b5b611671888289016115b9565b9150509295509295909350565b6000806040838503121561169557611694611365565b5b60006116a3858286016113ee565b92505060206116b485828601611390565b9150509250929050565b6116c7816113c5565b82525050565b6116d681611403565b82525050565b600060c0820190506116f160008301896116be565b6116fe60208301886116cd565b61170b60408301876116be565b61171860608301866116cd565b61172560808301856116cd565b61173260a08301846116cd565b979650505050505050565b60008060006060848603121561175657611755611365565b5b6000611764868287016113ee565b935050602061177586828701611390565b925050604061178686828701611424565b9150509250925092565b60006040820190506117a560008301856116cd565b6117b260208301846116cd565b9392505050565b60006020820190506117ce60008301846116be565b92915050565b6000602082840312156117ea576117e9611365565b5b60006117f8848285016113ee565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061186a82611403565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361189c5761189b611830565b5b600182019050919050565b6118b0816113c5565b82525050565b60006118c283836118a7565b60208301905092915050565b6118d781611403565b82525050565b60006118e983836118ce565b60208301905092915050565b60008201600082015161190884826118b6565b935050602082015161191a84826118dd565b935050604082015161192c84826118b6565b935050606082015161193e84826118dd565b935050608082015161195084826118dd565b93505060a082015161196284826118dd565b935050505050565b600061197683836118f5565b60c08301905092915050565b600081519050919050565b600081905092915050565b6000819050602082019050919050565b6000820160008201516119bb84826118dd565b93505060208201516119cd84826118dd565b935050505050565b60006119e183836119a8565b60408301905092915050565b6000602082019050919050565b6000611a0582611982565b611a0f818561198d565b9350611a1a83611998565b8060005b83811015611a4b578151611a3288826119d5565b9750611a3d836119ed565b925050600181019050611a1e565b5085935050505092915050565b6000611a6483836119fa565b905092915050565b611a758161136f565b82525050565b6000611a878383611a6c565b60208301905092915050565b60008083016000830151611aa7858261196a565b9450506020830151611ab98582611a58565b9450506040830151611acb85826118b6565b9450506060830151611add8582611a7b565b9450508391505092915050565b6000611af68284611a93565b915081905092915050565b6000819050919050565b600067ffffffffffffffff82169050919050565b6000819050919050565b6000611b44611b3f611b3a84611b01565b611b1f565b611b0b565b9050919050565b611b5481611b29565b82525050565b6000602082019050611b6f6000830184611b4b565b92915050565b6000611b8082611403565b9150611b8b83611403565b9250828202611b9981611403565b91508282048414831517611bb057611baf611830565b5b5092915050565b6000611bc282611403565b9150611bcd83611403565b9250828201905080821115611be557611be4611830565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000611c2582611403565b9150611c3083611403565b925082611c4057611c3f611beb565b5b828204905092915050565b600081905092915050565b50565b6000611c66600083611c4b565b9150611c7182611c56565b600082019050919050565b6000611c8782611c59565b9150819050919050565b6000604082019050611ca660008301856116be565b611cb360208301846116cd565b9392505050565b6000604082019050611ccf60008301856116be565b611cdc60208301846116be565b9392505050565b600081519050611cf28161140d565b92915050565b600060208284031215611d0e57611d0d611365565b5b6000611d1c84828501611ce3565b91505092915050565b6000606082019050611d3a60008301866116be565b611d4760208301856116be565b611d5460408301846116cd565b949350505050565b60008115159050919050565b611d7181611d5c565b8114611d7c57600080fd5b50565b600081519050611d8e81611d68565b92915050565b600060208284031215611daa57611da9611365565b5b6000611db884828501611d7f565b9150509291505056fea264697066735822122059c4919a86e2dac9ab713804bbe7f32633d8a601d7d9b91f4d38df76bf2e1de064736f6c63430008140033";
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
        readonly stateMutability: "payable";
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
