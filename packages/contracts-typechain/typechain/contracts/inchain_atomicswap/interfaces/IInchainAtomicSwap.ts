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

export declare namespace IAtomicSwapBase {
  export type AcceptBidMsgStruct = { orderID: BytesLike; bidder: AddressLike };

  export type AcceptBidMsgStructOutput = [orderID: string, bidder: string] & {
    orderID: string;
    bidder: string;
  };

  export type CancelSwapMsgStruct = { orderID: BytesLike };

  export type CancelSwapMsgStructOutput = [orderID: string] & {
    orderID: string;
  };

  export type CoinStruct = { token: AddressLike; amount: BigNumberish };

  export type CoinStructOutput = [token: string, amount: bigint] & {
    token: string;
    amount: bigint;
  };

  export type MakeSwapMsgStruct = {
    uuid: BytesLike;
    sellToken: IAtomicSwapBase.CoinStruct;
    buyToken: IAtomicSwapBase.CoinStruct;
    maker: AddressLike;
    desiredTaker: AddressLike;
    minBidAmount: BigNumberish;
    expireAt: BigNumberish;
    acceptBid: boolean;
  };

  export type MakeSwapMsgStructOutput = [
    uuid: string,
    sellToken: IAtomicSwapBase.CoinStructOutput,
    buyToken: IAtomicSwapBase.CoinStructOutput,
    maker: string,
    desiredTaker: string,
    minBidAmount: bigint,
    expireAt: bigint,
    acceptBid: boolean
  ] & {
    uuid: string;
    sellToken: IAtomicSwapBase.CoinStructOutput;
    buyToken: IAtomicSwapBase.CoinStructOutput;
    maker: string;
    desiredTaker: string;
    minBidAmount: bigint;
    expireAt: bigint;
    acceptBid: boolean;
  };

  export type ReleaseStruct = {
    durationInHours: BigNumberish;
    percentage: BigNumberish;
  };

  export type ReleaseStructOutput = [
    durationInHours: bigint,
    percentage: bigint
  ] & { durationInHours: bigint; percentage: bigint };

  export type PlaceBidMsgStruct = {
    bidAmount: BigNumberish;
    bidder: AddressLike;
    orderID: BytesLike;
    expireTimestamp: BigNumberish;
  };

  export type PlaceBidMsgStructOutput = [
    bidAmount: bigint,
    bidder: string,
    orderID: string,
    expireTimestamp: bigint
  ] & {
    bidAmount: bigint;
    bidder: string;
    orderID: string;
    expireTimestamp: bigint;
  };

  export type TakeSwapMsgStruct = {
    orderID: BytesLike;
    takerReceiver: AddressLike;
  };

  export type TakeSwapMsgStructOutput = [
    orderID: string,
    takerReceiver: string
  ] & { orderID: string; takerReceiver: string };

  export type UpdateBidMsgStruct = {
    orderID: BytesLike;
    bidder: AddressLike;
    addition: BigNumberish;
  };

  export type UpdateBidMsgStructOutput = [
    orderID: string,
    bidder: string,
    addition: bigint
  ] & { orderID: string; bidder: string; addition: bigint };
}

export interface IInchainAtomicSwapInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "acceptBid"
      | "cancelSwap"
      | "makeSwap"
      | "makeSwapWithVesting"
      | "placeBid"
      | "takeSwap"
      | "updateBid"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AcceptedBid"
      | "AtomicSwapOrderCanceled"
      | "AtomicSwapOrderCreated"
      | "AtomicSwapOrderTook"
      | "CanceledBid"
      | "PlacedBid"
      | "ReceivedNewBid"
      | "UpdatedBid"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "acceptBid",
    values: [IAtomicSwapBase.AcceptBidMsgStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelSwap",
    values: [IAtomicSwapBase.CancelSwapMsgStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "makeSwap",
    values: [IAtomicSwapBase.MakeSwapMsgStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "makeSwapWithVesting",
    values: [IAtomicSwapBase.MakeSwapMsgStruct, IAtomicSwapBase.ReleaseStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "placeBid",
    values: [IAtomicSwapBase.PlaceBidMsgStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "takeSwap",
    values: [IAtomicSwapBase.TakeSwapMsgStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "updateBid",
    values: [IAtomicSwapBase.UpdateBidMsgStruct]
  ): string;

  decodeFunctionResult(functionFragment: "acceptBid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "cancelSwap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "makeSwap", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "makeSwapWithVesting",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "placeBid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "takeSwap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "updateBid", data: BytesLike): Result;
}

export namespace AcceptedBidEvent {
  export type InputTuple = [
    orderID: BytesLike,
    bidder: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [orderID: string, bidder: string, amount: bigint];
  export interface OutputObject {
    orderID: string;
    bidder: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AtomicSwapOrderCanceledEvent {
  export type InputTuple = [id: BytesLike];
  export type OutputTuple = [id: string];
  export interface OutputObject {
    id: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AtomicSwapOrderCreatedEvent {
  export type InputTuple = [id: BytesLike];
  export type OutputTuple = [id: string];
  export interface OutputObject {
    id: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AtomicSwapOrderTookEvent {
  export type InputTuple = [
    maker: AddressLike,
    taker: AddressLike,
    id: BytesLike
  ];
  export type OutputTuple = [maker: string, taker: string, id: string];
  export interface OutputObject {
    maker: string;
    taker: string;
    id: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CanceledBidEvent {
  export type InputTuple = [orderID: BytesLike, bidder: AddressLike];
  export type OutputTuple = [orderID: string, bidder: string];
  export interface OutputObject {
    orderID: string;
    bidder: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PlacedBidEvent {
  export type InputTuple = [
    orderID: BytesLike,
    bidder: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [orderID: string, bidder: string, amount: bigint];
  export interface OutputObject {
    orderID: string;
    bidder: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ReceivedNewBidEvent {
  export type InputTuple = [
    orderID: BytesLike,
    bidder: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [orderID: string, bidder: string, amount: bigint];
  export interface OutputObject {
    orderID: string;
    bidder: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UpdatedBidEvent {
  export type InputTuple = [
    orderID: BytesLike,
    bidder: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [orderID: string, bidder: string, amount: bigint];
  export interface OutputObject {
    orderID: string;
    bidder: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IInchainAtomicSwap extends BaseContract {
  connect(runner?: ContractRunner | null): IInchainAtomicSwap;
  waitForDeployment(): Promise<this>;

  interface: IInchainAtomicSwapInterface;

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

  acceptBid: TypedContractMethod<
    [acceptBidMsg: IAtomicSwapBase.AcceptBidMsgStruct],
    [void],
    "payable"
  >;

  cancelSwap: TypedContractMethod<
    [cancelswap: IAtomicSwapBase.CancelSwapMsgStruct],
    [void],
    "payable"
  >;

  makeSwap: TypedContractMethod<
    [makeswap: IAtomicSwapBase.MakeSwapMsgStruct],
    [string],
    "payable"
  >;

  makeSwapWithVesting: TypedContractMethod<
    [
      makeswap: IAtomicSwapBase.MakeSwapMsgStruct,
      releases: IAtomicSwapBase.ReleaseStruct[]
    ],
    [void],
    "payable"
  >;

  placeBid: TypedContractMethod<
    [placeBidMsg: IAtomicSwapBase.PlaceBidMsgStruct],
    [void],
    "payable"
  >;

  takeSwap: TypedContractMethod<
    [takeswap: IAtomicSwapBase.TakeSwapMsgStruct],
    [void],
    "payable"
  >;

  updateBid: TypedContractMethod<
    [updateBidMsg: IAtomicSwapBase.UpdateBidMsgStruct],
    [void],
    "payable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "acceptBid"
  ): TypedContractMethod<
    [acceptBidMsg: IAtomicSwapBase.AcceptBidMsgStruct],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "cancelSwap"
  ): TypedContractMethod<
    [cancelswap: IAtomicSwapBase.CancelSwapMsgStruct],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "makeSwap"
  ): TypedContractMethod<
    [makeswap: IAtomicSwapBase.MakeSwapMsgStruct],
    [string],
    "payable"
  >;
  getFunction(
    nameOrSignature: "makeSwapWithVesting"
  ): TypedContractMethod<
    [
      makeswap: IAtomicSwapBase.MakeSwapMsgStruct,
      releases: IAtomicSwapBase.ReleaseStruct[]
    ],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "placeBid"
  ): TypedContractMethod<
    [placeBidMsg: IAtomicSwapBase.PlaceBidMsgStruct],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "takeSwap"
  ): TypedContractMethod<
    [takeswap: IAtomicSwapBase.TakeSwapMsgStruct],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "updateBid"
  ): TypedContractMethod<
    [updateBidMsg: IAtomicSwapBase.UpdateBidMsgStruct],
    [void],
    "payable"
  >;

  getEvent(
    key: "AcceptedBid"
  ): TypedContractEvent<
    AcceptedBidEvent.InputTuple,
    AcceptedBidEvent.OutputTuple,
    AcceptedBidEvent.OutputObject
  >;
  getEvent(
    key: "AtomicSwapOrderCanceled"
  ): TypedContractEvent<
    AtomicSwapOrderCanceledEvent.InputTuple,
    AtomicSwapOrderCanceledEvent.OutputTuple,
    AtomicSwapOrderCanceledEvent.OutputObject
  >;
  getEvent(
    key: "AtomicSwapOrderCreated"
  ): TypedContractEvent<
    AtomicSwapOrderCreatedEvent.InputTuple,
    AtomicSwapOrderCreatedEvent.OutputTuple,
    AtomicSwapOrderCreatedEvent.OutputObject
  >;
  getEvent(
    key: "AtomicSwapOrderTook"
  ): TypedContractEvent<
    AtomicSwapOrderTookEvent.InputTuple,
    AtomicSwapOrderTookEvent.OutputTuple,
    AtomicSwapOrderTookEvent.OutputObject
  >;
  getEvent(
    key: "CanceledBid"
  ): TypedContractEvent<
    CanceledBidEvent.InputTuple,
    CanceledBidEvent.OutputTuple,
    CanceledBidEvent.OutputObject
  >;
  getEvent(
    key: "PlacedBid"
  ): TypedContractEvent<
    PlacedBidEvent.InputTuple,
    PlacedBidEvent.OutputTuple,
    PlacedBidEvent.OutputObject
  >;
  getEvent(
    key: "ReceivedNewBid"
  ): TypedContractEvent<
    ReceivedNewBidEvent.InputTuple,
    ReceivedNewBidEvent.OutputTuple,
    ReceivedNewBidEvent.OutputObject
  >;
  getEvent(
    key: "UpdatedBid"
  ): TypedContractEvent<
    UpdatedBidEvent.InputTuple,
    UpdatedBidEvent.OutputTuple,
    UpdatedBidEvent.OutputObject
  >;

  filters: {
    "AcceptedBid(bytes32,address,uint256)": TypedContractEvent<
      AcceptedBidEvent.InputTuple,
      AcceptedBidEvent.OutputTuple,
      AcceptedBidEvent.OutputObject
    >;
    AcceptedBid: TypedContractEvent<
      AcceptedBidEvent.InputTuple,
      AcceptedBidEvent.OutputTuple,
      AcceptedBidEvent.OutputObject
    >;

    "AtomicSwapOrderCanceled(bytes32)": TypedContractEvent<
      AtomicSwapOrderCanceledEvent.InputTuple,
      AtomicSwapOrderCanceledEvent.OutputTuple,
      AtomicSwapOrderCanceledEvent.OutputObject
    >;
    AtomicSwapOrderCanceled: TypedContractEvent<
      AtomicSwapOrderCanceledEvent.InputTuple,
      AtomicSwapOrderCanceledEvent.OutputTuple,
      AtomicSwapOrderCanceledEvent.OutputObject
    >;

    "AtomicSwapOrderCreated(bytes32)": TypedContractEvent<
      AtomicSwapOrderCreatedEvent.InputTuple,
      AtomicSwapOrderCreatedEvent.OutputTuple,
      AtomicSwapOrderCreatedEvent.OutputObject
    >;
    AtomicSwapOrderCreated: TypedContractEvent<
      AtomicSwapOrderCreatedEvent.InputTuple,
      AtomicSwapOrderCreatedEvent.OutputTuple,
      AtomicSwapOrderCreatedEvent.OutputObject
    >;

    "AtomicSwapOrderTook(address,address,bytes32)": TypedContractEvent<
      AtomicSwapOrderTookEvent.InputTuple,
      AtomicSwapOrderTookEvent.OutputTuple,
      AtomicSwapOrderTookEvent.OutputObject
    >;
    AtomicSwapOrderTook: TypedContractEvent<
      AtomicSwapOrderTookEvent.InputTuple,
      AtomicSwapOrderTookEvent.OutputTuple,
      AtomicSwapOrderTookEvent.OutputObject
    >;

    "CanceledBid(bytes32,address)": TypedContractEvent<
      CanceledBidEvent.InputTuple,
      CanceledBidEvent.OutputTuple,
      CanceledBidEvent.OutputObject
    >;
    CanceledBid: TypedContractEvent<
      CanceledBidEvent.InputTuple,
      CanceledBidEvent.OutputTuple,
      CanceledBidEvent.OutputObject
    >;

    "PlacedBid(bytes32,address,uint256)": TypedContractEvent<
      PlacedBidEvent.InputTuple,
      PlacedBidEvent.OutputTuple,
      PlacedBidEvent.OutputObject
    >;
    PlacedBid: TypedContractEvent<
      PlacedBidEvent.InputTuple,
      PlacedBidEvent.OutputTuple,
      PlacedBidEvent.OutputObject
    >;

    "ReceivedNewBid(bytes32,address,uint256)": TypedContractEvent<
      ReceivedNewBidEvent.InputTuple,
      ReceivedNewBidEvent.OutputTuple,
      ReceivedNewBidEvent.OutputObject
    >;
    ReceivedNewBid: TypedContractEvent<
      ReceivedNewBidEvent.InputTuple,
      ReceivedNewBidEvent.OutputTuple,
      ReceivedNewBidEvent.OutputObject
    >;

    "UpdatedBid(bytes32,address,uint256)": TypedContractEvent<
      UpdatedBidEvent.InputTuple,
      UpdatedBidEvent.OutputTuple,
      UpdatedBidEvent.OutputObject
    >;
    UpdatedBid: TypedContractEvent<
      UpdatedBidEvent.InputTuple,
      UpdatedBidEvent.OutputTuple,
      UpdatedBidEvent.OutputObject
    >;
  };
}
