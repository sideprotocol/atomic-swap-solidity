import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { Vesting, VestingInterface } from "../../../contracts/vesting/Vesting";
type VestingConstructorParams = [linkLibraryAddresses: VestingLibraryAddresses, signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Vesting__factory extends ContractFactory {
    constructor(...args: VestingConstructorParams);
    static linkBytecode(linkLibraryAddresses: VestingLibraryAddresses): string;
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<Vesting & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): Vesting__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50612280806100206000396000f3fe60806040526004361061008a5760003560e01c806382a969e21161005957806382a969e2146101fa5780638da5cb5b14610238578063c4d66de814610263578063d7c2eec71461028c578063f2fde38b146102b557610157565b8063704b6c021461015c578063715018a6146101855780637623f00e1461019c5780637b00ffad146101b857610157565b36610157576000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610111576040517f059bcfbb00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b343373ffffffffffffffffffffffffffffffffffffffff167f88a5966d370b9919b20f3e2c13ff65706f196a4e32cc2c12bf57088f8852587460405160405180910390a3005b600080fd5b34801561016857600080fd5b50610183600480360381019061017e91906115d1565b6102de565b005b34801561019157600080fd5b5061019a610340565b005b6101b660048036038101906101b19190611818565b610354565b005b3480156101c457600080fd5b506101df60048036038101906101da91906118af565b610873565b6040516101f19695949392919061190d565b60405180910390f35b34801561020657600080fd5b50610221600480360381019061021c919061196e565b6108fc565b60405161022f9291906119c1565b60405180910390f35b34801561024457600080fd5b5061024d61094a565b60405161025a91906119ea565b60405180910390f35b34801561026f57600080fd5b5061028a600480360381019061028591906115d1565b610982565b005b34801561029857600080fd5b506102b360048036038101906102ae91906118af565b610b11565b005b3480156102c157600080fd5b506102dc60048036038101906102d791906115d1565b610e36565b005b6102e6610ebc565b60016000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b610348610ebc565b6103526000610f43565b565b61035c61101a565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166103de576040517f059bcfbb00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600087815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146104b7576040517f628dbb9600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8073__$2effe1973215a034e8e4a17bdeb5710028$__6333b988f590916040518263ffffffff1660e01b81526004016104f09190611af2565b60006040518083038186803b15801561050857600080fd5b505af415801561051c573d6000803e3d6000fd5b50505050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361059f5781341461059a5781346040517f04157bb40000000000000000000000000000000000000000000000000000000081526004016105919291906119c1565b60405180910390fd5b6105ac565b6105ab83333085611071565b5b600042905060006040518060c001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018673ffffffffffffffffffffffffffffffffffffffff168152602001858152602001600081526020016000815250905080600160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600089815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600301556080820151816004015560a082015181600501559050506000600260008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000898152602001908152602001600020905060005b84518110156107e8578185828151811061078e5761078d611b14565b5b602002602001015190806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010155505080806107e090611b72565b915050610771565b5060405180608001604052808381526020018581526020018873ffffffffffffffffffffffffffffffffffffffff1681526020018981525060405161082d9190611dd5565b60405180910390207fb16abbea6ba3704f5f2a80a6e86817bd96545258a4bbe645becfc85ab722675260405160405180910390a250505061086c6111aa565b5050505050565b6001602052816000526040600020602052806000526040600020600091509150508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060030154908060040154908060050154905086565b6002602052826000526040600020602052816000526040600020818154811061092457600080fd5b906000526020600020906002020160009250925050508060000154908060010154905082565b6000806109556111c3565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b600061098c6111eb565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff161480156109da5750825b9050600060018367ffffffffffffffff16148015610a0f575060003073ffffffffffffffffffffffffffffffffffffffff163b145b905081158015610a1d575080155b15610a54576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055508315610aa45760018560000160086101000a81548160ff0219169083151502179055505b610aad86611213565b8315610b095760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d26001604051610b009190611e45565b60405180910390a15b505050505050565b610b1961101a565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002090506000600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008481526020019081526020016000209050600081805490501480610bdc57508080549050826005015410155b15610c13576040517f8bdb538100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080836001015490506000846005015490505b8380549050811015610cf557610e10848281548110610c4957610c48611b14565b5b906000526020600020906002020160000154610c659190611e60565b82610c709190611ea2565b9150814210610cf5576000612710858381548110610c9157610c90611b14565b5b9060005260206000209060020201600101548760030154610cb29190611e60565b610cbc9190611f05565b90508084610cca9190611ea2565b9350600182610cd99190611ea2565b8660050181905550508080610ced90611b72565b915050610c27565b5060008211610d30576040517f3507415000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81846004016000828254610d449190611ea2565b92505081905550600073ffffffffffffffffffffffffffffffffffffffff168460020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610dd757610dd28460020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168784611299565b610de2565b610de186836113cf565b5b818673ffffffffffffffffffffffffffffffffffffffff167fb21fb52d5749b80f3182f8c6992236b5e5576681880914484d7f4c9b062e619e60405160405180910390a350505050610e326111aa565b5050565b610e3e610ebc565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610eb05760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610ea791906119ea565b60405180910390fd5b610eb981610f43565b50565b610ec46114cf565b73ffffffffffffffffffffffffffffffffffffffff16610ee261094a565b73ffffffffffffffffffffffffffffffffffffffff1614610f4157610f056114cf565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401610f3891906119ea565b60405180910390fd5b565b6000610f4d6111c3565b905060008160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050828260000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3505050565b60006110246114d7565b90506002816000015403611064576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002816000018190555050565b6000808573ffffffffffffffffffffffffffffffffffffffff166323b872dd8686866040516024016110a593929190611f36565b6040516020818303038152906040529060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040516110f39190611fde565b6000604051808303816000865af19150503d8060008114611130576040519150601f19603f3d011682016040523d82523d6000602084013e611135565b606091505b50915091508180156111635750600081511480611162575080806020019051810190611161919061202d565b5b5b6111a2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611199906120dd565b60405180910390fd5b505050505050565b60006111b46114d7565b90506001816000018190555050565b60007f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300905090565b60007ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00905090565b61121b6114ff565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361128d5760006040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161128491906119ea565b60405180910390fd5b61129681610f43565b50565b6000808473ffffffffffffffffffffffffffffffffffffffff1663a9059cbb85856040516024016112cb9291906120fd565b6040516020818303038152906040529060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040516113199190611fde565b6000604051808303816000865af19150503d8060008114611356576040519150601f19603f3d011682016040523d82523d6000602084013e61135b565b606091505b50915091508180156113895750600081511480611388575080806020019051810190611387919061202d565b5b5b6113c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113bf90612198565b60405180910390fd5b5050505050565b60008273ffffffffffffffffffffffffffffffffffffffff1682600067ffffffffffffffff81111561140457611403611680565b5b6040519080825280601f01601f1916602001820160405280156114365781602001600182028036833780820191505090505b506040516114449190611fde565b60006040518083038185875af1925050503d8060008114611481576040519150601f19603f3d011682016040523d82523d6000602084013e611486565b606091505b50509050806114ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114c19061222a565b60405180910390fd5b505050565b600033905090565b60007f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f00905090565b61150761153f565b61153d576040517fd7e6bcf800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b60006115496111eb565b60000160089054906101000a900460ff16905090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061159e82611573565b9050919050565b6115ae81611593565b81146115b957600080fd5b50565b6000813590506115cb816115a5565b92915050565b6000602082840312156115e7576115e6611569565b5b60006115f5848285016115bc565b91505092915050565b6000819050919050565b611611816115fe565b811461161c57600080fd5b50565b60008135905061162e81611608565b92915050565b6000819050919050565b61164781611634565b811461165257600080fd5b50565b6000813590506116648161163e565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6116b88261166f565b810181811067ffffffffffffffff821117156116d7576116d6611680565b5b80604052505050565b60006116ea61155f565b90506116f682826116af565b919050565b600067ffffffffffffffff82111561171657611715611680565b5b602082029050602081019050919050565b600080fd5b600080fd5b6000604082840312156117475761174661172c565b5b61175160406116e0565b9050600061176184828501611655565b600083015250602061177584828501611655565b60208301525092915050565b600061179461178f846116fb565b6116e0565b905080838252602082019050604084028301858111156117b7576117b6611727565b5b835b818110156117e057806117cc8882611731565b8452602084019350506040810190506117b9565b5050509392505050565b600082601f8301126117ff576117fe61166a565b5b813561180f848260208601611781565b91505092915050565b600080600080600060a0868803121561183457611833611569565b5b60006118428882890161161f565b9550506020611853888289016115bc565b9450506040611864888289016115bc565b935050606061187588828901611655565b925050608086013567ffffffffffffffff8111156118965761189561156e565b5b6118a2888289016117ea565b9150509295509295909350565b600080604083850312156118c6576118c5611569565b5b60006118d4858286016115bc565b92505060206118e58582860161161f565b9150509250929050565b6118f881611593565b82525050565b61190781611634565b82525050565b600060c08201905061192260008301896118ef565b61192f60208301886118fe565b61193c60408301876118ef565b61194960608301866118fe565b61195660808301856118fe565b61196360a08301846118fe565b979650505050505050565b60008060006060848603121561198757611986611569565b5b6000611995868287016115bc565b93505060206119a68682870161161f565b92505060406119b786828701611655565b9150509250925092565b60006040820190506119d660008301856118fe565b6119e360208301846118fe565b9392505050565b60006020820190506119ff60008301846118ef565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b611a3a81611634565b82525050565b604082016000820151611a566000850182611a31565b506020820151611a696020850182611a31565b50505050565b6000611a7b8383611a40565b60408301905092915050565b6000602082019050919050565b6000611a9f82611a05565b611aa98185611a10565b9350611ab483611a21565b8060005b83811015611ae5578151611acc8882611a6f565b9750611ad783611a87565b925050600181019050611ab8565b5085935050505092915050565b60006020820190508181036000830152611b0c8184611a94565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611b7d82611634565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611baf57611bae611b43565b5b600182019050919050565b611bc381611593565b82525050565b6000611bd58383611bba565b60208301905092915050565b611bea81611634565b82525050565b6000611bfc8383611be1565b60208301905092915050565b600082016000820151611c1b8482611bc9565b9350506020820151611c2d8482611bf0565b9350506040820151611c3f8482611bc9565b9350506060820151611c518482611bf0565b9350506080820151611c638482611bf0565b93505060a0820151611c758482611bf0565b935050505050565b6000611c898383611c08565b60c08301905092915050565b600081905092915050565b600082016000820151611cb38482611bf0565b9350506020820151611cc58482611bf0565b935050505050565b6000611cd98383611ca0565b60408301905092915050565b6000611cf082611a05565b611cfa8185611c95565b9350611d0583611a21565b8060005b83811015611d36578151611d1d8882611ccd565b9750611d2883611a87565b925050600181019050611d09565b5085935050505092915050565b6000611d4f8383611ce5565b905092915050565b611d60816115fe565b82525050565b6000611d728383611d57565b60208301905092915050565b60008083016000830151611d928582611c7d565b9450506020830151611da48582611d43565b9450506040830151611db68582611bc9565b9450506060830151611dc88582611d66565b9450508391505092915050565b6000611de18284611d7e565b915081905092915050565b6000819050919050565b600067ffffffffffffffff82169050919050565b6000819050919050565b6000611e2f611e2a611e2584611dec565b611e0a565b611df6565b9050919050565b611e3f81611e14565b82525050565b6000602082019050611e5a6000830184611e36565b92915050565b6000611e6b82611634565b9150611e7683611634565b9250828202611e8481611634565b91508282048414831517611e9b57611e9a611b43565b5b5092915050565b6000611ead82611634565b9150611eb883611634565b9250828201905080821115611ed057611ecf611b43565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000611f1082611634565b9150611f1b83611634565b925082611f2b57611f2a611ed6565b5b828204905092915050565b6000606082019050611f4b60008301866118ef565b611f5860208301856118ef565b611f6560408301846118fe565b949350505050565b600081519050919050565b600081905092915050565b60005b83811015611fa1578082015181840152602081019050611f86565b60008484015250505050565b6000611fb882611f6d565b611fc28185611f78565b9350611fd2818560208601611f83565b80840191505092915050565b6000611fea8284611fad565b915081905092915050565b60008115159050919050565b61200a81611ff5565b811461201557600080fd5b50565b60008151905061202781612001565b92915050565b60006020828403121561204357612042611569565b5b600061205184828501612018565b91505092915050565b600082825260208201905092915050565b7f5472616e7366657248656c7065723a3a7472616e7366657246726f6d3a20747260008201527f616e7366657246726f6d206661696c6564000000000000000000000000000000602082015250565b60006120c760318361205a565b91506120d28261206b565b604082019050919050565b600060208201905081810360008301526120f6816120ba565b9050919050565b600060408201905061211260008301856118ef565b61211f60208301846118fe565b9392505050565b7f5472616e7366657248656c7065723a3a736166655472616e736665723a20747260008201527f616e73666572206661696c656400000000000000000000000000000000000000602082015250565b6000612182602d8361205a565b915061218d82612126565b604082019050919050565b600060208201905081810360008301526121b181612175565b9050919050565b7f5472616e7366657248656c7065723a3a736166655472616e736665724554483a60008201527f20455448207472616e73666572206661696c6564000000000000000000000000602082015250565b600061221460348361205a565b915061221f826121b8565b604082019050919050565b6000602082019050818103600083015261224381612207565b905091905056fea264697066735822122090401ec37645ef79ce5a8da9193d012b41f622a81a24562eb36e6afce9c821a064736f6c63430008140033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "DuplicateReleaseSchedule";
        readonly type: "error";
    }, {
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
        readonly name: "NoPermissionToUserContract";
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
            readonly internalType: "address";
            readonly name: "_newAdmin";
            readonly type: "address";
        }];
        readonly name: "setAdmin";
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
export interface VestingLibraryAddresses {
    ["contracts/abstracts/libs/utils/AtomicSwapMsgValidator.sol:AtomicSwapMsgValidator"]: string;
}
export {};
