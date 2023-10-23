import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export declare namespace IAtomicSwapBase {
    type AcceptBidMsgStruct = {
        orderID: BytesLike;
        bidder: AddressLike;
    };
    type AcceptBidMsgStructOutput = [orderID: string, bidder: string] & {
        orderID: string;
        bidder: string;
    };
    type CounterOfferMsgStruct = {
        orderID: BytesLike;
        bidder: AddressLike;
        amount: BigNumberish;
    };
    type CounterOfferMsgStructOutput = [
        orderID: string,
        bidder: string,
        amount: bigint
    ] & {
        orderID: string;
        bidder: string;
        amount: bigint;
    };
    type CancelSwapMsgStruct = {
        orderID: BytesLike;
    };
    type CancelSwapMsgStructOutput = [orderID: string] & {
        orderID: string;
    };
    type CoinStruct = {
        token: AddressLike;
        amount: BigNumberish;
    };
    type CoinStructOutput = [token: string, amount: bigint] & {
        token: string;
        amount: bigint;
    };
    type MakeSwapMsgStruct = {
        sellToken: IAtomicSwapBase.CoinStruct;
        buyToken: IAtomicSwapBase.CoinStruct;
        maker: AddressLike;
        desiredTaker: AddressLike;
        minBidAmount: BigNumberish;
        expireAt: BigNumberish;
        acceptBid: boolean;
    };
    type MakeSwapMsgStructOutput = [
        sellToken: IAtomicSwapBase.CoinStructOutput,
        buyToken: IAtomicSwapBase.CoinStructOutput,
        maker: string,
        desiredTaker: string,
        minBidAmount: bigint,
        expireAt: bigint,
        acceptBid: boolean
    ] & {
        sellToken: IAtomicSwapBase.CoinStructOutput;
        buyToken: IAtomicSwapBase.CoinStructOutput;
        maker: string;
        desiredTaker: string;
        minBidAmount: bigint;
        expireAt: bigint;
        acceptBid: boolean;
    };
    type PlaceBidMsgStruct = {
        bidAmount: BigNumberish;
        bidder: AddressLike;
        orderID: BytesLike;
        expireTimestamp: BigNumberish;
    };
    type PlaceBidMsgStructOutput = [
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
    type TakeSwapMsgStruct = {
        orderID: BytesLike;
        takerReceiver: AddressLike;
    };
    type TakeSwapMsgStructOutput = [
        orderID: string,
        takerReceiver: string
    ] & {
        orderID: string;
        takerReceiver: string;
    };
    type UpdateBidMsgStruct = {
        orderID: BytesLike;
        addition: BigNumberish;
    };
    type UpdateBidMsgStructOutput = [orderID: string, addition: bigint] & {
        orderID: string;
        addition: bigint;
    };
}
export interface InchainAtomicSwapInterface extends Interface {
    getFunction(nameOrSignature: "acceptBid" | "acceptCountOfffer" | "bids" | "buyerFeeRate" | "cancelBid" | "cancelSwap" | "counteroffer" | "counteroffers" | "initialize" | "makeSwap" | "owner" | "placeBid" | "renounceOwnership" | "sellerFeeRate" | "swapOrder" | "swapOrderCounter" | "takeSwap" | "transferOwnership" | "updateBid"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AcceptedBid" | "AtomicSwapOrderCanceled" | "AtomicSwapOrderCreated" | "AtomicSwapOrderTook" | "CanceledBid" | "Initialized" | "OwnershipTransferred" | "ReceivedNewBid" | "UpdatedBid"): EventFragment;
    encodeFunctionData(functionFragment: "acceptBid", values: [IAtomicSwapBase.AcceptBidMsgStruct]): string;
    encodeFunctionData(functionFragment: "acceptCountOfffer", values: [IAtomicSwapBase.CounterOfferMsgStruct]): string;
    encodeFunctionData(functionFragment: "bids", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "buyerFeeRate", values?: undefined): string;
    encodeFunctionData(functionFragment: "cancelBid", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "cancelSwap", values: [IAtomicSwapBase.CancelSwapMsgStruct]): string;
    encodeFunctionData(functionFragment: "counteroffer", values: [IAtomicSwapBase.CounterOfferMsgStruct]): string;
    encodeFunctionData(functionFragment: "counteroffers", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "initialize", values: [AddressLike, AddressLike, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "makeSwap", values: [IAtomicSwapBase.MakeSwapMsgStruct]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "placeBid", values: [IAtomicSwapBase.PlaceBidMsgStruct]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "sellerFeeRate", values?: undefined): string;
    encodeFunctionData(functionFragment: "swapOrder", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "swapOrderCounter", values?: undefined): string;
    encodeFunctionData(functionFragment: "takeSwap", values: [IAtomicSwapBase.TakeSwapMsgStruct]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "updateBid", values: [IAtomicSwapBase.UpdateBidMsgStruct]): string;
    decodeFunctionResult(functionFragment: "acceptBid", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "acceptCountOfffer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bids", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "buyerFeeRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelBid", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelSwap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "counteroffer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "counteroffers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "makeSwap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "placeBid", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sellerFeeRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "swapOrder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "swapOrderCounter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "takeSwap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateBid", data: BytesLike): Result;
}
export declare namespace AcceptedBidEvent {
    type InputTuple = [
        orderID: BytesLike,
        bidder: AddressLike,
        amount: BigNumberish
    ];
    type OutputTuple = [orderID: string, bidder: string, amount: bigint];
    interface OutputObject {
        orderID: string;
        bidder: string;
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace AtomicSwapOrderCanceledEvent {
    type InputTuple = [id: BytesLike];
    type OutputTuple = [id: string];
    interface OutputObject {
        id: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace AtomicSwapOrderCreatedEvent {
    type InputTuple = [id: BytesLike];
    type OutputTuple = [id: string];
    interface OutputObject {
        id: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace AtomicSwapOrderTookEvent {
    type InputTuple = [
        maker: AddressLike,
        taker: AddressLike,
        id: BytesLike
    ];
    type OutputTuple = [maker: string, taker: string, id: string];
    interface OutputObject {
        maker: string;
        taker: string;
        id: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace CanceledBidEvent {
    type InputTuple = [orderID: BytesLike, bidder: AddressLike];
    type OutputTuple = [orderID: string, bidder: string];
    interface OutputObject {
        orderID: string;
        bidder: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace InitializedEvent {
    type InputTuple = [version: BigNumberish];
    type OutputTuple = [version: bigint];
    interface OutputObject {
        version: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace OwnershipTransferredEvent {
    type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
    type OutputTuple = [previousOwner: string, newOwner: string];
    interface OutputObject {
        previousOwner: string;
        newOwner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ReceivedNewBidEvent {
    type InputTuple = [
        orderID: BytesLike,
        bidder: AddressLike,
        amount: BigNumberish
    ];
    type OutputTuple = [orderID: string, bidder: string, amount: bigint];
    interface OutputObject {
        orderID: string;
        bidder: string;
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace UpdatedBidEvent {
    type InputTuple = [
        orderID: BytesLike,
        bidder: AddressLike,
        amount: BigNumberish
    ];
    type OutputTuple = [orderID: string, bidder: string, amount: bigint];
    interface OutputObject {
        orderID: string;
        bidder: string;
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface InchainAtomicSwap extends BaseContract {
    connect(runner?: ContractRunner | null): InchainAtomicSwap;
    waitForDeployment(): Promise<this>;
    interface: InchainAtomicSwapInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    acceptBid: TypedContractMethod<[
        acceptBidMsg: IAtomicSwapBase.AcceptBidMsgStruct
    ], [
        void
    ], "payable">;
    acceptCountOfffer: TypedContractMethod<[
        counterOfferMsg: IAtomicSwapBase.CounterOfferMsgStruct
    ], [
        void
    ], "nonpayable">;
    bids: TypedContractMethod<[
        arg0: BytesLike,
        arg1: AddressLike
    ], [
        [
            bigint,
            string,
            bigint,
            string,
            bigint,
            bigint
        ] & {
            amount: bigint;
            order: string;
            status: bigint;
            bidder: string;
            receiveTimestamp: bigint;
            expireTimestamp: bigint;
        }
    ], "view">;
    buyerFeeRate: TypedContractMethod<[], [bigint], "view">;
    cancelBid: TypedContractMethod<[_orderID: BytesLike], [void], "payable">;
    cancelSwap: TypedContractMethod<[
        cancelswap: IAtomicSwapBase.CancelSwapMsgStruct
    ], [
        void
    ], "payable">;
    counteroffer: TypedContractMethod<[
        counterOfferMsg: IAtomicSwapBase.CounterOfferMsgStruct
    ], [
        void
    ], "nonpayable">;
    counteroffers: TypedContractMethod<[
        arg0: BytesLike,
        arg1: AddressLike
    ], [
        bigint
    ], "view">;
    initialize: TypedContractMethod<[
        _admin: AddressLike,
        _treasury: AddressLike,
        _sellerFee: BigNumberish,
        _buyerFee: BigNumberish
    ], [
        void
    ], "nonpayable">;
    makeSwap: TypedContractMethod<[
        makeswap: IAtomicSwapBase.MakeSwapMsgStruct
    ], [
        void
    ], "payable">;
    owner: TypedContractMethod<[], [string], "view">;
    placeBid: TypedContractMethod<[
        placeBidMsg: IAtomicSwapBase.PlaceBidMsgStruct
    ], [
        void
    ], "payable">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    sellerFeeRate: TypedContractMethod<[], [bigint], "view">;
    swapOrder: TypedContractMethod<[
        arg0: BytesLike
    ], [
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
    ], "view">;
    swapOrderCounter: TypedContractMethod<[], [bigint], "view">;
    takeSwap: TypedContractMethod<[
        takeswap: IAtomicSwapBase.TakeSwapMsgStruct
    ], [
        void
    ], "payable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    updateBid: TypedContractMethod<[
        updateBidMsg: IAtomicSwapBase.UpdateBidMsgStruct
    ], [
        void
    ], "payable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "acceptBid"): TypedContractMethod<[
        acceptBidMsg: IAtomicSwapBase.AcceptBidMsgStruct
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "acceptCountOfffer"): TypedContractMethod<[
        counterOfferMsg: IAtomicSwapBase.CounterOfferMsgStruct
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "bids"): TypedContractMethod<[
        arg0: BytesLike,
        arg1: AddressLike
    ], [
        [
            bigint,
            string,
            bigint,
            string,
            bigint,
            bigint
        ] & {
            amount: bigint;
            order: string;
            status: bigint;
            bidder: string;
            receiveTimestamp: bigint;
            expireTimestamp: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "buyerFeeRate"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "cancelBid"): TypedContractMethod<[_orderID: BytesLike], [void], "payable">;
    getFunction(nameOrSignature: "cancelSwap"): TypedContractMethod<[
        cancelswap: IAtomicSwapBase.CancelSwapMsgStruct
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "counteroffer"): TypedContractMethod<[
        counterOfferMsg: IAtomicSwapBase.CounterOfferMsgStruct
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "counteroffers"): TypedContractMethod<[
        arg0: BytesLike,
        arg1: AddressLike
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
        _admin: AddressLike,
        _treasury: AddressLike,
        _sellerFee: BigNumberish,
        _buyerFee: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "makeSwap"): TypedContractMethod<[
        makeswap: IAtomicSwapBase.MakeSwapMsgStruct
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "placeBid"): TypedContractMethod<[
        placeBidMsg: IAtomicSwapBase.PlaceBidMsgStruct
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "sellerFeeRate"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "swapOrder"): TypedContractMethod<[
        arg0: BytesLike
    ], [
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
    ], "view">;
    getFunction(nameOrSignature: "swapOrderCounter"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "takeSwap"): TypedContractMethod<[
        takeswap: IAtomicSwapBase.TakeSwapMsgStruct
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "updateBid"): TypedContractMethod<[
        updateBidMsg: IAtomicSwapBase.UpdateBidMsgStruct
    ], [
        void
    ], "payable">;
    getEvent(key: "AcceptedBid"): TypedContractEvent<AcceptedBidEvent.InputTuple, AcceptedBidEvent.OutputTuple, AcceptedBidEvent.OutputObject>;
    getEvent(key: "AtomicSwapOrderCanceled"): TypedContractEvent<AtomicSwapOrderCanceledEvent.InputTuple, AtomicSwapOrderCanceledEvent.OutputTuple, AtomicSwapOrderCanceledEvent.OutputObject>;
    getEvent(key: "AtomicSwapOrderCreated"): TypedContractEvent<AtomicSwapOrderCreatedEvent.InputTuple, AtomicSwapOrderCreatedEvent.OutputTuple, AtomicSwapOrderCreatedEvent.OutputObject>;
    getEvent(key: "AtomicSwapOrderTook"): TypedContractEvent<AtomicSwapOrderTookEvent.InputTuple, AtomicSwapOrderTookEvent.OutputTuple, AtomicSwapOrderTookEvent.OutputObject>;
    getEvent(key: "CanceledBid"): TypedContractEvent<CanceledBidEvent.InputTuple, CanceledBidEvent.OutputTuple, CanceledBidEvent.OutputObject>;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "ReceivedNewBid"): TypedContractEvent<ReceivedNewBidEvent.InputTuple, ReceivedNewBidEvent.OutputTuple, ReceivedNewBidEvent.OutputObject>;
    getEvent(key: "UpdatedBid"): TypedContractEvent<UpdatedBidEvent.InputTuple, UpdatedBidEvent.OutputTuple, UpdatedBidEvent.OutputObject>;
    filters: {
        "AcceptedBid(bytes32,address,uint256)": TypedContractEvent<AcceptedBidEvent.InputTuple, AcceptedBidEvent.OutputTuple, AcceptedBidEvent.OutputObject>;
        AcceptedBid: TypedContractEvent<AcceptedBidEvent.InputTuple, AcceptedBidEvent.OutputTuple, AcceptedBidEvent.OutputObject>;
        "AtomicSwapOrderCanceled(bytes32)": TypedContractEvent<AtomicSwapOrderCanceledEvent.InputTuple, AtomicSwapOrderCanceledEvent.OutputTuple, AtomicSwapOrderCanceledEvent.OutputObject>;
        AtomicSwapOrderCanceled: TypedContractEvent<AtomicSwapOrderCanceledEvent.InputTuple, AtomicSwapOrderCanceledEvent.OutputTuple, AtomicSwapOrderCanceledEvent.OutputObject>;
        "AtomicSwapOrderCreated(bytes32)": TypedContractEvent<AtomicSwapOrderCreatedEvent.InputTuple, AtomicSwapOrderCreatedEvent.OutputTuple, AtomicSwapOrderCreatedEvent.OutputObject>;
        AtomicSwapOrderCreated: TypedContractEvent<AtomicSwapOrderCreatedEvent.InputTuple, AtomicSwapOrderCreatedEvent.OutputTuple, AtomicSwapOrderCreatedEvent.OutputObject>;
        "AtomicSwapOrderTook(address,address,bytes32)": TypedContractEvent<AtomicSwapOrderTookEvent.InputTuple, AtomicSwapOrderTookEvent.OutputTuple, AtomicSwapOrderTookEvent.OutputObject>;
        AtomicSwapOrderTook: TypedContractEvent<AtomicSwapOrderTookEvent.InputTuple, AtomicSwapOrderTookEvent.OutputTuple, AtomicSwapOrderTookEvent.OutputObject>;
        "CanceledBid(bytes32,address)": TypedContractEvent<CanceledBidEvent.InputTuple, CanceledBidEvent.OutputTuple, CanceledBidEvent.OutputObject>;
        CanceledBid: TypedContractEvent<CanceledBidEvent.InputTuple, CanceledBidEvent.OutputTuple, CanceledBidEvent.OutputObject>;
        "Initialized(uint64)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "ReceivedNewBid(bytes32,address,uint256)": TypedContractEvent<ReceivedNewBidEvent.InputTuple, ReceivedNewBidEvent.OutputTuple, ReceivedNewBidEvent.OutputObject>;
        ReceivedNewBid: TypedContractEvent<ReceivedNewBidEvent.InputTuple, ReceivedNewBidEvent.OutputTuple, ReceivedNewBidEvent.OutputObject>;
        "UpdatedBid(bytes32,address,uint256)": TypedContractEvent<UpdatedBidEvent.InputTuple, UpdatedBidEvent.OutputTuple, UpdatedBidEvent.OutputObject>;
        UpdatedBid: TypedContractEvent<UpdatedBidEvent.InputTuple, UpdatedBidEvent.OutputTuple, UpdatedBidEvent.OutputObject>;
    };
}
