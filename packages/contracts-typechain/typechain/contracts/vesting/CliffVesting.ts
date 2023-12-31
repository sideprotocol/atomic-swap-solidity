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
} from "../../common";

export declare namespace ICliffVesting {
  export type VestingScheduleStruct = {
    from: AddressLike;
    start: BigNumberish;
    token: AddressLike;
    totalAmount: BigNumberish;
    amountReleased: BigNumberish;
    lastReleasedStep: BigNumberish;
  };

  export type VestingScheduleStructOutput = [
    from: string,
    start: bigint,
    token: string,
    totalAmount: bigint,
    amountReleased: bigint,
    lastReleasedStep: bigint
  ] & {
    from: string;
    start: bigint;
    token: string;
    totalAmount: bigint;
    amountReleased: bigint;
    lastReleasedStep: bigint;
  };

  export type VestingInfoStruct = {
    schedule: ICliffVesting.VestingScheduleStruct;
    release: IAtomicSwapBase.ReleaseStruct[];
    beneficiary: AddressLike;
    scheduleId: BigNumberish;
  };

  export type VestingInfoStructOutput = [
    schedule: ICliffVesting.VestingScheduleStructOutput,
    release: IAtomicSwapBase.ReleaseStructOutput[],
    beneficiary: string,
    scheduleId: bigint
  ] & {
    schedule: ICliffVesting.VestingScheduleStructOutput;
    release: IAtomicSwapBase.ReleaseStructOutput[];
    beneficiary: string;
    scheduleId: bigint;
  };
}

export declare namespace IAtomicSwapBase {
  export type ReleaseStruct = {
    durationInHours: BigNumberish;
    percentage: BigNumberish;
  };

  export type ReleaseStructOutput = [
    durationInHours: bigint,
    percentage: bigint
  ] & { durationInHours: bigint; percentage: bigint };
}

export interface CliffVestingInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "getVestingScheduleCount"
      | "initialize"
      | "owner"
      | "release"
      | "releaseInfos"
      | "renounceOwnership"
      | "startVesting"
      | "transferOwnership"
      | "vestingSchedules"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Initialized"
      | "NewVesting"
      | "OwnershipTransferred"
      | "Received"
      | "Released"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "getVestingScheduleCount",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "release",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "releaseInfos",
    values: [AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "startVesting",
    values: [
      AddressLike,
      AddressLike,
      BigNumberish,
      IAtomicSwapBase.ReleaseStruct[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "vestingSchedules",
    values: [AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "getVestingScheduleCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "release", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "releaseInfos",
    data: BytesLike
  ): Result;
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

export namespace NewVestingEvent {
  export type InputTuple = [vesting: ICliffVesting.VestingInfoStruct];
  export type OutputTuple = [vesting: ICliffVesting.VestingInfoStructOutput];
  export interface OutputObject {
    vesting: ICliffVesting.VestingInfoStructOutput;
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

export namespace ReceivedEvent {
  export type InputTuple = [sender: AddressLike, amount: BigNumberish];
  export type OutputTuple = [sender: string, amount: bigint];
  export interface OutputObject {
    sender: string;
    amount: bigint;
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

export interface CliffVesting extends BaseContract {
  connect(runner?: ContractRunner | null): CliffVesting;
  waitForDeployment(): Promise<this>;

  interface: CliffVestingInterface;

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

  getVestingScheduleCount: TypedContractMethod<
    [beneficiary: AddressLike],
    [bigint],
    "view"
  >;

  initialize: TypedContractMethod<
    [_admin: AddressLike, _treasury: AddressLike, _sellerFee: BigNumberish],
    [void],
    "nonpayable"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  release: TypedContractMethod<
    [beneficiary: AddressLike, scheduleId: BigNumberish],
    [void],
    "nonpayable"
  >;

  releaseInfos: TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish, arg2: BigNumberish],
    [[bigint, bigint] & { durationInHours: bigint; percentage: bigint }],
    "view"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  startVesting: TypedContractMethod<
    [
      beneficiary: AddressLike,
      token: AddressLike,
      totalAmount: BigNumberish,
      releases: IAtomicSwapBase.ReleaseStruct[]
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
    [arg0: AddressLike, arg1: BigNumberish],
    [
      [string, bigint, string, bigint, bigint, bigint] & {
        from: string;
        start: bigint;
        token: string;
        totalAmount: bigint;
        amountReleased: bigint;
        lastReleasedStep: bigint;
      }
    ],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getVestingScheduleCount"
  ): TypedContractMethod<[beneficiary: AddressLike], [bigint], "view">;
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
  ): TypedContractMethod<
    [beneficiary: AddressLike, scheduleId: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "releaseInfos"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: BigNumberish, arg2: BigNumberish],
    [[bigint, bigint] & { durationInHours: bigint; percentage: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "startVesting"
  ): TypedContractMethod<
    [
      beneficiary: AddressLike,
      token: AddressLike,
      totalAmount: BigNumberish,
      releases: IAtomicSwapBase.ReleaseStruct[]
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
    [arg0: AddressLike, arg1: BigNumberish],
    [
      [string, bigint, string, bigint, bigint, bigint] & {
        from: string;
        start: bigint;
        token: string;
        totalAmount: bigint;
        amountReleased: bigint;
        lastReleasedStep: bigint;
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
    key: "NewVesting"
  ): TypedContractEvent<
    NewVestingEvent.InputTuple,
    NewVestingEvent.OutputTuple,
    NewVestingEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "Received"
  ): TypedContractEvent<
    ReceivedEvent.InputTuple,
    ReceivedEvent.OutputTuple,
    ReceivedEvent.OutputObject
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

    "NewVesting(tuple)": TypedContractEvent<
      NewVestingEvent.InputTuple,
      NewVestingEvent.OutputTuple,
      NewVestingEvent.OutputObject
    >;
    NewVesting: TypedContractEvent<
      NewVestingEvent.InputTuple,
      NewVestingEvent.OutputTuple,
      NewVestingEvent.OutputObject
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

    "Received(address,uint256)": TypedContractEvent<
      ReceivedEvent.InputTuple,
      ReceivedEvent.OutputTuple,
      ReceivedEvent.OutputObject
    >;
    Received: TypedContractEvent<
      ReceivedEvent.InputTuple,
      ReceivedEvent.OutputTuple,
      ReceivedEvent.OutputObject
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
