/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type {
  AtomicSwapStateLogic,
  AtomicSwapStateLogicInterface,
} from "../../../../../contracts/abstracts/libs/logic/AtomicSwapStateLogic";

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
] as const;

const _bytecode =
  "0x610cde610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100565760003560e01c80632296d7e01461005b578063a2040cee14610084578063cc76f931146100ad578063d81ab44f146100d6575b600080fd5b81801561006757600080fd5b50610082600480360381019061007d9190610a1c565b610106565b005b81801561009057600080fd5b506100ab60048036038101906100a69190610a86565b6103fb565b005b8180156100b957600080fd5b506100d460048036038101906100cf9190610b88565b610526565b005b6100f060048036038101906100eb9190610bc8565b6106f5565b6040516100fd9190610c17565b60405180910390f35b6000801b8460008481526020019081526020016000206000015414610157576040517f966753c500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006040518061018001604052808481526020016000600381111561017f5761017e610c32565b5b81526020018373ffffffffffffffffffffffffffffffffffffffff16815260200185602001518152602001856080015173ffffffffffffffffffffffffffffffffffffffff168152602001856040015181526020018560a00151815260200142815260200160008152602001600081526020018560c0015181526020018560e0015115158152509050808560008581526020019081526020016000206000820151816000015560208201518160010160006101000a81548160ff021916908360038111156102505761024f610c32565b5b021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160020160008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155505060808201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060a08201518160050160008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155505060c0820151816007015560e08201518160080155610100820151816009015561012082015181600a015561014082015181600b015561016082015181600c0160006101000a81548160ff0219169083151502179055509050505050505050565b8160008281526020019081526020016000206000808201600090556001820160006101000a81549060ff02191690556001820160016101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560028201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000905550506004820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560058201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560018201600090555050600782016000905560088201600090556009820160009055600a820160009055600b820160009055600c820160006101000a81549060ff021916905550505050565b60006040518060e00160405280836000015181526020018360600151815260200160028081111561055a57610559610c32565b5b8152602001836020015173ffffffffffffffffffffffffffffffffffffffff168152602001836040015173ffffffffffffffffffffffffffffffffffffffff1681526020014281526020018360800151815250905080836000846060015181526020019081526020016000206000846020015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082015181600001556020820151816001015560408201518160020160006101000a81548160ff0219169083600281111561064657610645610c32565b5b021790555060608201518160020160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060808201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060a0820151816004015560c08201518160050155905050505050565b6000818360405160200161070a929190610c7f565b60405160208183030381529060405280519060200120905092915050565b6000604051905090565b600080fd5b6000819050919050565b61074a81610737565b811461075557600080fd5b50565b60008135905061076781610741565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6107bb82610772565b810181811067ffffffffffffffff821117156107da576107d9610783565b5b80604052505050565b60006107ed610728565b90506107f982826107b2565b919050565b6000819050919050565b610811816107fe565b811461081c57600080fd5b50565b60008135905061082e81610808565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061085f82610834565b9050919050565b61086f81610854565b811461087a57600080fd5b50565b60008135905061088c81610866565b92915050565b6000819050919050565b6108a581610892565b81146108b057600080fd5b50565b6000813590506108c28161089c565b92915050565b6000604082840312156108de576108dd61076d565b5b6108e860406107e3565b905060006108f88482850161087d565b600083015250602061090c848285016108b3565b60208301525092915050565b60008115159050919050565b61092d81610918565b811461093857600080fd5b50565b60008135905061094a81610924565b92915050565b600061014082840312156109675761096661076d565b5b6109726101006107e3565b905060006109828482850161081f565b6000830152506020610996848285016108c8565b60208301525060606109aa848285016108c8565b60408301525060a06109be8482850161087d565b60608301525060c06109d28482850161087d565b60808301525060e06109e6848285016108b3565b60a0830152506101006109fb848285016108b3565b60c083015250610120610a108482850161093b565b60e08301525092915050565b6000806000806101a08587031215610a3757610a36610732565b5b6000610a4587828801610758565b9450506020610a5687828801610950565b935050610160610a688782880161081f565b925050610180610a7a8782880161087d565b91505092959194509250565b60008060408385031215610a9d57610a9c610732565b5b6000610aab85828601610758565b9250506020610abc8582860161081f565b9150509250929050565b6000819050919050565b610ad981610ac6565b8114610ae457600080fd5b50565b600081359050610af681610ad0565b92915050565b600060a08284031215610b1257610b1161076d565b5b610b1c60a06107e3565b90506000610b2c848285016108b3565b6000830152506020610b408482850161087d565b6020830152506040610b548482850161087d565b6040830152506060610b688482850161081f565b6060830152506080610b7c848285016108b3565b60808301525092915050565b60008060c08385031215610b9f57610b9e610732565b5b6000610bad85828601610ae7565b9250506020610bbe85828601610afc565b9150509250929050565b60008060408385031215610bdf57610bde610732565b5b6000610bed8582860161081f565b9250506020610bfe8582860161087d565b9150509250929050565b610c11816107fe565b82525050565b6000602082019050610c2c6000830184610c08565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b610c6a81610854565b82525050565b610c79816107fe565b82525050565b6000604082019050610c946000830185610c61565b610ca16020830184610c70565b939250505056fea2646970667358221220d574522ba6e3029ea72e4994494e696bbe52f04866de5518eb01c01faaafd19e64736f6c63430008140033";

type AtomicSwapStateLogicConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AtomicSwapStateLogicConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AtomicSwapStateLogic__factory extends ContractFactory {
  constructor(...args: AtomicSwapStateLogicConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      AtomicSwapStateLogic & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): AtomicSwapStateLogic__factory {
    return super.connect(runner) as AtomicSwapStateLogic__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AtomicSwapStateLogicInterface {
    return new Interface(_abi) as AtomicSwapStateLogicInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): AtomicSwapStateLogic {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as AtomicSwapStateLogic;
  }
}
