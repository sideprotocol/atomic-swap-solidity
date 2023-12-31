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

export declare namespace IAtomicSwapBase {
  export type CoinStruct = { token: AddressLike; amount: BigNumberish };

  export type CoinStructOutput = [token: string, amount: bigint] & {
    token: string;
    amount: bigint;
  };
}

export interface AtomicSwapBaseInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "bids"
      | "buyerFeeRate"
      | "counteroffers"
      | "owner"
      | "renounceOwnership"
      | "sellerFeeRate"
      | "swapOrder"
      | "swapOrderVestingParams"
      | "transferOwnership"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AcceptedBid"
      | "AtomicSwapOrderCanceled"
      | "AtomicSwapOrderCreated"
      | "AtomicSwapOrderTook"
      | "CanceledBid"
      | "Initialized"
      | "OwnershipTransferred"
      | "PlacedBid"
      | "ReceivedNewBid"
      | "UpdatedBid"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "bids",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "buyerFeeRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "counteroffers",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sellerFeeRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "swapOrder",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "swapOrderVestingParams",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "bids", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "buyerFeeRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "counteroffers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sellerFeeRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "swapOrder", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "swapOrderVestingParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
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

export interface AtomicSwapBase extends BaseContract {
  connect(runner?: ContractRunner | null): AtomicSwapBase;
  waitForDeployment(): Promise<this>;

  interface: AtomicSwapBaseInterface;

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

  bids: TypedContractMethod<
    [arg0: BytesLike, arg1: AddressLike],
    [
      [bigint, string, bigint, string, string, bigint, bigint] & {
        amount: bigint;
        order: string;
        status: bigint;
        bidder: string;
        bidderReceiver: string;
        receiveTimestamp: bigint;
        expireTimestamp: bigint;
      }
    ],
    "view"
  >;

  buyerFeeRate: TypedContractMethod<[], [bigint], "view">;

  counteroffers: TypedContractMethod<
    [arg0: BytesLike, arg1: AddressLike],
    [bigint],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  sellerFeeRate: TypedContractMethod<[], [bigint], "view">;

  swapOrder: TypedContractMethod<
    [arg0: BytesLike],
    [
      [
        string,
        bigint,
        string,
        IAtomicSwapBase.CoinStructOutput,
        string,
        IAtomicSwapBase.CoinStructOutput,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        boolean
      ] & {
        id: string;
        status: bigint;
        maker: string;
        sellToken: IAtomicSwapBase.CoinStructOutput;
        taker: string;
        buyToken: IAtomicSwapBase.CoinStructOutput;
        minBidAmount: bigint;
        createdAt: bigint;
        canceledAt: bigint;
        completedAt: bigint;
        expiredAt: bigint;
        acceptBid: boolean;
      }
    ],
    "view"
  >;

  swapOrderVestingParams: TypedContractMethod<
    [arg0: BytesLike, arg1: BigNumberish],
    [[bigint, bigint] & { durationInHours: bigint; percentage: bigint }],
    "view"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "bids"
  ): TypedContractMethod<
    [arg0: BytesLike, arg1: AddressLike],
    [
      [bigint, string, bigint, string, string, bigint, bigint] & {
        amount: bigint;
        order: string;
        status: bigint;
        bidder: string;
        bidderReceiver: string;
        receiveTimestamp: bigint;
        expireTimestamp: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "buyerFeeRate"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "counteroffers"
  ): TypedContractMethod<
    [arg0: BytesLike, arg1: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "sellerFeeRate"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "swapOrder"
  ): TypedContractMethod<
    [arg0: BytesLike],
    [
      [
        string,
        bigint,
        string,
        IAtomicSwapBase.CoinStructOutput,
        string,
        IAtomicSwapBase.CoinStructOutput,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        boolean
      ] & {
        id: string;
        status: bigint;
        maker: string;
        sellToken: IAtomicSwapBase.CoinStructOutput;
        taker: string;
        buyToken: IAtomicSwapBase.CoinStructOutput;
        minBidAmount: bigint;
        createdAt: bigint;
        canceledAt: bigint;
        completedAt: bigint;
        expiredAt: bigint;
        acceptBid: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "swapOrderVestingParams"
  ): TypedContractMethod<
    [arg0: BytesLike, arg1: BigNumberish],
    [[bigint, bigint] & { durationInHours: bigint; percentage: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

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
