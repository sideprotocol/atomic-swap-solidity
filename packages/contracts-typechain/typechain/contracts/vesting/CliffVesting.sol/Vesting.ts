/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export interface VestingInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "initialize"
      | "owner"
      | "release"
      | "renounceOwnership"
      | "startVesting"
      | "transferOwnership"
      | "vestingSchedules"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "Initialized" | "OwnershipTransferred" | "Released"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "initialize",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "release",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "startVesting",
    values: [
      AddressLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      AddressLike,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "vestingSchedules",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "release", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "startVesting",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "vestingSchedules",
    data: BytesLike
  ): Result;
}

export namespace InitializedEvent {
  export type InputTuple = [version: BigNumberish];
  export type OutputTuple = [version: bigint];
  export interface OutputObject {
    version: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ReleasedEvent {
  export type InputTuple = [beneficiary: AddressLike, amount: BigNumberish];
  export type OutputTuple = [beneficiary: string, amount: bigint];
  export interface OutputObject {
    beneficiary: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Vesting extends BaseContract {
  connect(runner?: ContractRunner | null): Vesting;
  waitForDeployment(): Promise<this>;

  interface: VestingInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  initialize: TypedContractMethod<
    [_admin: AddressLike, _treasury: AddressLike, _sellerFee: BigNumberish],
    [void],
    "nonpayable"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  release: TypedContractMethod<
    [beneficiary: AddressLike],
    [void],
    "nonpayable"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  startVesting: TypedContractMethod<
    [
      beneficiary: AddressLike,
      start: BigNumberish,
      cliffDurationInHours: BigNumberish,
      durationInHours: BigNumberish,
      token: AddressLike,
      totalAmount: BigNumberish,
      releaseIntervalInHours: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  vestingSchedules: TypedContractMethod<
    [arg0: AddressLike],
    [
      [string, bigint, bigint, bigint, string, bigint, bigint, bigint] & {
        from: string;
        start: bigint;
        cliff: bigint;
        duration: bigint;
        token: string;
        totalAmount: bigint;
        amountReleased: bigint;
        releaseInterval: bigint;
      }
    ],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<
    [_admin: AddressLike, _treasury: AddressLike, _sellerFee: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "release"
  ): TypedContractMethod<[beneficiary: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "startVesting"
  ): TypedContractMethod<
    [
      beneficiary: AddressLike,
      start: BigNumberish,
      cliffDurationInHours: BigNumberish,
      durationInHours: BigNumberish,
      token: AddressLike,
      totalAmount: BigNumberish,
      releaseIntervalInHours: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "vestingSchedules"
  ): TypedContractMethod<
    [arg0: AddressLike],
    [
      [string, bigint, bigint, bigint, string, bigint, bigint, bigint] & {
        from: string;
        start: bigint;
        cliff: bigint;
        duration: bigint;
        token: string;
        totalAmount: bigint;
        amountReleased: bigint;
        releaseInterval: bigint;
      }
    ],
    "view"
  >;

  getEvent(
    key: "Initialized"
  ): TypedContractEvent<
    InitializedEvent.InputTuple,
    InitializedEvent.OutputTuple,
    InitializedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "Released"
  ): TypedContractEvent<
    ReleasedEvent.InputTuple,
    ReleasedEvent.OutputTuple,
    ReleasedEvent.OutputObject
  >;

  filters: {
    "Initialized(uint64)": TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
    Initialized: TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "Released(address,uint256)": TypedContractEvent<
      ReleasedEvent.InputTuple,
      ReleasedEvent.OutputTuple,
      ReleasedEvent.OutputObject
    >;
    Released: TypedContractEvent<
      ReleasedEvent.InputTuple,
      ReleasedEvent.OutputTuple,
      ReleasedEvent.OutputObject
    >;
  };
}
