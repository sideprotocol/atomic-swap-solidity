"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtomicSwapStateLogic__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "OrderAlreadyExists",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "uuid",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "contractAddress",
                type: "address",
            },
        ],
        name: "generateNewAtomicSwapID",
        outputs: [
            {
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
];
const _bytecode = "0x610c63610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100565760003560e01c80632296d7e01461005b578063a2040cee14610084578063cc76f931146100ad578063d81ab44f146100d6575b600080fd5b81801561006757600080fd5b50610082600480360381019061007d91906109b5565b610106565b005b81801561009057600080fd5b506100ab60048036038101906100a69190610a1f565b6103fb565b005b8180156100b957600080fd5b506100d460048036038101906100cf9190610b0d565b610526565b005b6100f060048036038101906100eb9190610b4d565b61068e565b6040516100fd9190610b9c565b60405180910390f35b6000801b8460008481526020019081526020016000206000015414610157576040517f966753c500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006040518061018001604052808481526020016000600381111561017f5761017e610bb7565b5b81526020018373ffffffffffffffffffffffffffffffffffffffff16815260200185602001518152602001856080015173ffffffffffffffffffffffffffffffffffffffff168152602001856040015181526020018560a00151815260200142815260200160008152602001600081526020018560c0015181526020018560e0015115158152509050808560008581526020019081526020016000206000820151816000015560208201518160010160006101000a81548160ff021916908360038111156102505761024f610bb7565b5b021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160020160008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155505060808201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060a08201518160050160008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155505060c0820151816007015560e08201518160080155610100820151816009015561012082015181600a015561014082015181600b015561016082015181600c0160006101000a81548160ff0219169083151502179055509050505050505050565b8160008281526020019081526020016000206000808201600090556001820160006101000a81549060ff02191690556001820160016101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560028201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000905550506004820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560058201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090555050600782016000905560088201600090556009820160009055600a820160009055600b820160009055600c820160006101000a81549060ff021916905550505050565b60006040518060c00160405280836000015181526020018360400151815260200160028081111561055a57610559610bb7565b5b8152602001836020015173ffffffffffffffffffffffffffffffffffffffff1681526020014281526020018360600151815250905080836000846040015181526020019081526020016000206000846020015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082015181600001556020820151816001015560408201518160020160006101000a81548160ff0219169083600281111561062657610625610bb7565b5b021790555060608201518160020160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506080820151816003015560a08201518160040155905050505050565b600081836040516020016106a3929190610c04565b60405160208183030381529060405280519060200120905092915050565b6000604051905090565b600080fd5b6000819050919050565b6106e3816106d0565b81146106ee57600080fd5b50565b600081359050610700816106da565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6107548261070b565b810181811067ffffffffffffffff821117156107735761077261071c565b5b80604052505050565b60006107866106c1565b9050610792828261074b565b919050565b6000819050919050565b6107aa81610797565b81146107b557600080fd5b50565b6000813590506107c7816107a1565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006107f8826107cd565b9050919050565b610808816107ed565b811461081357600080fd5b50565b600081359050610825816107ff565b92915050565b6000819050919050565b61083e8161082b565b811461084957600080fd5b50565b60008135905061085b81610835565b92915050565b60006040828403121561087757610876610706565b5b610881604061077c565b9050600061089184828501610816565b60008301525060206108a58482850161084c565b60208301525092915050565b60008115159050919050565b6108c6816108b1565b81146108d157600080fd5b50565b6000813590506108e3816108bd565b92915050565b60006101408284031215610900576108ff610706565b5b61090b61010061077c565b9050600061091b848285016107b8565b600083015250602061092f84828501610861565b602083015250606061094384828501610861565b60408301525060a061095784828501610816565b60608301525060c061096b84828501610816565b60808301525060e061097f8482850161084c565b60a0830152506101006109948482850161084c565b60c0830152506101206109a9848285016108d4565b60e08301525092915050565b6000806000806101a085870312156109d0576109cf6106cb565b5b60006109de878288016106f1565b94505060206109ef878288016108e9565b935050610160610a01878288016107b8565b925050610180610a1387828801610816565b91505092959194509250565b60008060408385031215610a3657610a356106cb565b5b6000610a44858286016106f1565b9250506020610a55858286016107b8565b9150509250929050565b6000819050919050565b610a7281610a5f565b8114610a7d57600080fd5b50565b600081359050610a8f81610a69565b92915050565b600060808284031215610aab57610aaa610706565b5b610ab5608061077c565b90506000610ac58482850161084c565b6000830152506020610ad984828501610816565b6020830152506040610aed848285016107b8565b6040830152506060610b018482850161084c565b60608301525092915050565b60008060a08385031215610b2457610b236106cb565b5b6000610b3285828601610a80565b9250506020610b4385828601610a95565b9150509250929050565b60008060408385031215610b6457610b636106cb565b5b6000610b72858286016107b8565b9250506020610b8385828601610816565b9150509250929050565b610b9681610797565b82525050565b6000602082019050610bb16000830184610b8d565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b610bef816107ed565b82525050565b610bfe81610797565b82525050565b6000604082019050610c196000830185610be6565b610c266020830184610bf5565b939250505056fea26469706673582212205258d8cc156d0eb1f74570c4806b5f421025f58ca93c41d10d1eaadab8fcf9ec64736f6c63430008140033";
const isSuperArgs = (xs) => xs.length > 1;
class AtomicSwapStateLogic__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    connect(runner) {
        return super.connect(runner);
    }
    static createInterface() {
        return new ethers_1.Interface(_abi);
    }
    static connect(address, runner) {
        return new ethers_1.Contract(address, _abi, runner);
    }
}
exports.AtomicSwapStateLogic__factory = AtomicSwapStateLogic__factory;
AtomicSwapStateLogic__factory.bytecode = _bytecode;
AtomicSwapStateLogic__factory.abi = _abi;
//# sourceMappingURL=AtomicSwapStateLogic__factory.js.map