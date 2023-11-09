import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { Vesting, VestingInterface } from "../../../../contracts/vesting/CliffVesting.sol/Vesting";
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
    static readonly bytecode = "0x608060405234801561001057600080fd5b506113c2806100206000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c8063a815badc1161005b578063a815badc146100c6578063f2fde38b146100e2578063f7013ef6146100fe578063fdb20ccb1461011a5761007d565b80631916558714610082578063715018a61461009e5780638da5cb5b146100a8575b600080fd5b61009c60048036038101906100979190610da8565b610151565b005b6100a66103d7565b005b6100b06103eb565b6040516100bd9190610de4565b60405180910390f35b6100e060048036038101906100db9190610e35565b610423565b005b6100fc60048036038101906100f79190610da8565b61073e565b005b61011860048036038101906101139190610ed7565b6107c4565b005b610134600480360381019061012f9190610da8565b610a21565b604051610148989796959493929190610f61565b60405180910390f35b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905080600201544210156101d1576040517fa8f0b2c500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600081600701548260020154426101e8919061100e565b6101f29190611071565b905060008260030154836007015483856005015461021091906110a2565b61021a91906110a2565b6102249190611071565b90506000836006015482610238919061100e565b90506000811161027d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161027490611167565b60405180910390fd5b808460060160008282546102919190611187565b9250508190555060008460040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff1673__$43d88e9d14e1b5704d66ee9740fe7e5d8f$__6311f1248b90918760000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1689866004546103e8600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518863ffffffff1660e01b8152600401610366979695949392919061121e565b60006040518083038186803b15801561037e57600080fd5b505af4158015610392573d6000803e3d6000fd5b505050507fb21fb52d5749b80f3182f8c6992236b5e5576681880914484d7f4c9b062e619e86836040516103c792919061128d565b60405180910390a1505050505050565b6103df610aa9565b6103e96000610b30565b565b6000806103f6610c07565b90508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806104cc5750600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b61050b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161050290611302565b60405180910390fd5b60008060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101541461059157866040517fdd4b5de60000000000000000000000000000000000000000000000000000000081526004016105889190610de4565b60405180910390fd5b6040518061010001604052803373ffffffffffffffffffffffffffffffffffffffff168152602001878152602001610e10876105cd91906110a2565b886105d89190611187565b8152602001610e10866105eb91906110a2565b81526020018473ffffffffffffffffffffffffffffffffffffffff16815260200183815260200160008152602001610e108361062791906110a2565b8152506000808973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155604082015181600201556060820151816003015560808201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060a0820151816005015560c0820151816006015560e0820151816007015590505050505050505050565b610746610aa9565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036107b85760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016107af9190610de4565b60405180910390fd5b6107c181610b30565b50565b60006107ce610c2f565b905060008160000160089054906101000a900460ff1615905060008260000160009054906101000a900467ffffffffffffffff1690506000808267ffffffffffffffff1614801561081c5750825b9050600060018367ffffffffffffffff16148015610851575060003073ffffffffffffffffffffffffffffffffffffffff163b145b90508115801561085f575080155b15610896576040517ff92ee8a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018560000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555083156108e65760018560000160086101000a81548160ff0219169083151502179055505b6108ef8a610c57565b88600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555087600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508560048190555086600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508315610a155760008560000160086101000a81548160ff0219169083151502179055507fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d26001604051610a0c9190611371565b60405180910390a15b50505050505050505050565b60006020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030154908060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060050154908060060154908060070154905088565b610ab1610cdd565b73ffffffffffffffffffffffffffffffffffffffff16610acf6103eb565b73ffffffffffffffffffffffffffffffffffffffff1614610b2e57610af2610cdd565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401610b259190610de4565b60405180910390fd5b565b6000610b3a610c07565b905060008160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050828260000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3505050565b60007f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300905090565b60007ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00905090565b610c5f610ce5565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610cd15760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610cc89190610de4565b60405180910390fd5b610cda81610b30565b50565b600033905090565b610ced610d25565b610d23576040517fd7e6bcf800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b6000610d2f610c2f565b60000160089054906101000a900460ff16905090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610d7582610d4a565b9050919050565b610d8581610d6a565b8114610d9057600080fd5b50565b600081359050610da281610d7c565b92915050565b600060208284031215610dbe57610dbd610d45565b5b6000610dcc84828501610d93565b91505092915050565b610dde81610d6a565b82525050565b6000602082019050610df96000830184610dd5565b92915050565b6000819050919050565b610e1281610dff565b8114610e1d57600080fd5b50565b600081359050610e2f81610e09565b92915050565b600080600080600080600060e0888a031215610e5457610e53610d45565b5b6000610e628a828b01610d93565b9750506020610e738a828b01610e20565b9650506040610e848a828b01610e20565b9550506060610e958a828b01610e20565b9450506080610ea68a828b01610d93565b93505060a0610eb78a828b01610e20565b92505060c0610ec88a828b01610e20565b91505092959891949750929550565b600080600080600060a08688031215610ef357610ef2610d45565b5b6000610f0188828901610d93565b9550506020610f1288828901610d93565b9450506040610f2388828901610d93565b9350506060610f3488828901610d93565b9250506080610f4588828901610e20565b9150509295509295909350565b610f5b81610dff565b82525050565b600061010082019050610f77600083018b610dd5565b610f84602083018a610f52565b610f916040830189610f52565b610f9e6060830188610f52565b610fab6080830187610dd5565b610fb860a0830186610f52565b610fc560c0830185610f52565b610fd260e0830184610f52565b9998505050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061101982610dff565b915061102483610dff565b925082820390508181111561103c5761103b610fdf565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061107c82610dff565b915061108783610dff565b92508261109757611096611042565b5b828204905092915050565b60006110ad82610dff565b91506110b883610dff565b92508282026110c681610dff565b915082820484148315176110dd576110dc610fdf565b5b5092915050565b600082825260208201905092915050565b7f4e6f2076657374656420746f6b656e7320617661696c61626c6520666f72207260008201527f656c656173650000000000000000000000000000000000000000000000000000602082015250565b60006111516026836110e4565b915061115c826110f5565b604082019050919050565b6000602082019050818103600083015261118081611144565b9050919050565b600061119282610dff565b915061119d83610dff565b92508282019050808211156111b5576111b4610fdf565b5b92915050565b6111c481610d6a565b82525050565b6111d381610dff565b82525050565b6000819050919050565b6000819050919050565b60006112086112036111fe846111d9565b6111e3565b610dff565b9050919050565b611218816111ed565b82525050565b600060e082019050611233600083018a6111bb565b61124060208301896111bb565b61124d60408301886111bb565b61125a60608301876111ca565b61126760808301866111ca565b61127460a083018561120f565b61128160c08301846111bb565b98975050505050505050565b60006040820190506112a26000830185610dd5565b6112af6020830184610f52565b9392505050565b7f4e6f207065726d697373696f6e20746f20757365000000000000000000000000600082015250565b60006112ec6014836110e4565b91506112f7826112b6565b602082019050919050565b6000602082019050818103600083015261131b816112df565b9050919050565b6000819050919050565b600067ffffffffffffffff82169050919050565b600061135b61135661135184611322565b6111e3565b61132c565b9050919050565b61136b81611340565b82525050565b60006020820190506113866000830184611362565b9291505056fea2646970667358221220fccf9229ade8a401efd1af1d0e070b14109bfbef0078df41b8d5e5b9c531a02f64736f6c63430008140033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "CliffNotEnded";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidInitialization";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NoVestedTokensAvailable";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "NotInitializing";
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
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "beneficiary";
            readonly type: "address";
        }, {
            readonly indexed: false;
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
            readonly name: "_inChainAtomicswap";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "_interChainAtomicswap";
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
            readonly internalType: "uint256";
            readonly name: "start";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "cliffDurationInHours";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "durationInHours";
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
            readonly name: "releaseIntervalInHours";
            readonly type: "uint256";
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
            readonly internalType: "uint256";
            readonly name: "cliff";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "duration";
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
            readonly name: "releaseInterval";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): VestingInterface;
    static connect(address: string, runner?: ContractRunner | null): Vesting;
}
export interface VestingLibraryAddresses {
    ["contracts/abstracts/libs/TokenTransferHelper.sol:TokenTransferHelper"]: string;
}
export {};
