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
        uuid: BytesLike;
        sellToken: IAtomicSwapBase.CoinStruct;
        buyToken: IAtomicSwapBase.CoinStruct;
        maker: AddressLike;
        desiredTaker: AddressLike;
        minBidAmount: BigNumberish;
        expireAt: BigNumberish;
        acceptBid: boolean;
    };
    type MakeSwapMsgStructOutput = [
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
    type ReleaseStruct = {
        durationInHours: BigNumberish;
        percentage: BigNumberish;
    };
    type ReleaseStructOutput = [
        durationInHours: bigint,
        percentage: bigint
    ] & {
        durationInHours: bigint;
        percentage: bigint;
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
        bidder: AddressLike;
        addition: BigNumberish;
    };
    type UpdateBidMsgStructOutput = [
        orderID: string,
        bidder: string,
        addition: bigint
    ] & {
        orderID: string;
        bidder: string;
        addition: bigint;
    };
}
export interface InchainAtomicSwapInterface extends Interface {
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE" | "PAUSER_ROLE" | "acceptBid" | "addAdmin" | "addPauser" | "bids" | "buyerFeeRate" | "cancelBid" | "cancelSwap" | "counteroffers" | "getRoleAdmin" | "grantRole" | "hasRole" | "initialize" | "isAdmin" | "isPauser" | "makeSwap" | "makeSwapWithVesting" | "paginationSize" | "pause" | "paused" | "placeBid" | "removeAdmin" | "removePauser" | "renounceRole" | "revokeRole" | "sellerFeeRate" | "setPaginationSize" | "supportsInterface" | "swapOrder" | "swapOrderVestingParams" | "takeSwap" | "unpause" | "updateBid"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AcceptedBid" | "AtomicSwapOrderCanceled" | "AtomicSwapOrderCreated" | "AtomicSwapOrderTook" | "CanceledBid" | "Initialized" | "Paused" | "PlacedBid" | "ReceivedNewBid" | "RoleAdminChanged" | "RoleGranted" | "RoleRevoked" | "Unpaused" | "UpdatedBid"): EventFragment;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "PAUSER_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "acceptBid", values: [IAtomicSwapBase.AcceptBidMsgStruct]): string;
    encodeFunctionData(functionFragment: "addAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "addPauser", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "bids", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "buyerFeeRate", values?: undefined): string;
    encodeFunctionData(functionFragment: "cancelBid", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "cancelSwap", values: [IAtomicSwapBase.CancelSwapMsgStruct]): string;
    encodeFunctionData(functionFragment: "counteroffers", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "initialize", values: [AddressLike, AddressLike, AddressLike, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "isAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "isPauser", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "makeSwap", values: [IAtomicSwapBase.MakeSwapMsgStruct]): string;
    encodeFunctionData(functionFragment: "makeSwapWithVesting", values: [IAtomicSwapBase.MakeSwapMsgStruct, IAtomicSwapBase.ReleaseStruct[]]): string;
    encodeFunctionData(functionFragment: "paginationSize", values?: undefined): string;
    encodeFunctionData(functionFragment: "pause", values?: undefined): string;
    encodeFunctionData(functionFragment: "paused", values?: undefined): string;
    encodeFunctionData(functionFragment: "placeBid", values: [IAtomicSwapBase.PlaceBidMsgStruct]): string;
    encodeFunctionData(functionFragment: "removeAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "removePauser", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [BytesLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "sellerFeeRate", values?: undefined): string;
    encodeFunctionData(functionFragment: "setPaginationSize", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "swapOrder", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "swapOrderVestingParams", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "takeSwap", values: [IAtomicSwapBase.TakeSwapMsgStruct]): string;
    encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
    encodeFunctionData(functionFragment: "updateBid", values: [IAtomicSwapBase.UpdateBidMsgStruct]): string;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "PAUSER_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "acceptBid", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addPauser", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bids", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "buyerFeeRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelBid", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelSwap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "counteroffers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isPauser", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "makeSwap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "makeSwapWithVesting", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paginationSize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "placeBid", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removeAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "removePauser", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sellerFeeRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setPaginationSize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "swapOrder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "swapOrderVestingParams", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "takeSwap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
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
export declare namespace PausedEvent {
    type InputTuple = [account: AddressLike];
    type OutputTuple = [account: string];
    interface OutputObject {
        account: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace PlacedBidEvent {
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
export declare namespace RoleAdminChangedEvent {
    type InputTuple = [
        role: BytesLike,
        previousAdminRole: BytesLike,
        newAdminRole: BytesLike
    ];
    type OutputTuple = [
        role: string,
        previousAdminRole: string,
        newAdminRole: string
    ];
    interface OutputObject {
        role: string;
        previousAdminRole: string;
        newAdminRole: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RoleGrantedEvent {
    type InputTuple = [
        role: BytesLike,
        account: AddressLike,
        sender: AddressLike
    ];
    type OutputTuple = [role: string, account: string, sender: string];
    interface OutputObject {
        role: string;
        account: string;
        sender: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace RoleRevokedEvent {
    type InputTuple = [
        role: BytesLike,
        account: AddressLike,
        sender: AddressLike
    ];
    type OutputTuple = [role: string, account: string, sender: string];
    interface OutputObject {
        role: string;
        account: string;
        sender: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace UnpausedEvent {
    type InputTuple = [account: AddressLike];
    type OutputTuple = [account: string];
    interface OutputObject {
        account: string;
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
    DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;
    PAUSER_ROLE: TypedContractMethod<[], [string], "view">;
    acceptBid: TypedContractMethod<[
        acceptBidMsg: IAtomicSwapBase.AcceptBidMsgStruct
    ], [
        void
    ], "payable">;
    addAdmin: TypedContractMethod<[_account: AddressLike], [void], "nonpayable">;
    addPauser: TypedContractMethod<[_account: AddressLike], [void], "nonpayable">;
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
    counteroffers: TypedContractMethod<[
        arg0: BytesLike,
        arg1: AddressLike
    ], [
        bigint
    ], "view">;
    getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;
    grantRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    hasRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        boolean
    ], "view">;
    initialize: TypedContractMethod<[
        _admin: AddressLike,
        _vestingManager: AddressLike,
        _treasury: AddressLike,
        _sellerFee: BigNumberish,
        _buyerFee: BigNumberish
    ], [
        void
    ], "nonpayable">;
    isAdmin: TypedContractMethod<[_account: AddressLike], [boolean], "view">;
    isPauser: TypedContractMethod<[_account: AddressLike], [boolean], "view">;
    makeSwap: TypedContractMethod<[
        makeswap: IAtomicSwapBase.MakeSwapMsgStruct
    ], [
        string
    ], "payable">;
    makeSwapWithVesting: TypedContractMethod<[
        makeswap: IAtomicSwapBase.MakeSwapMsgStruct,
        releases: IAtomicSwapBase.ReleaseStruct[]
    ], [
        void
    ], "payable">;
    paginationSize: TypedContractMethod<[], [bigint], "view">;
    pause: TypedContractMethod<[], [void], "nonpayable">;
    paused: TypedContractMethod<[], [boolean], "view">;
    placeBid: TypedContractMethod<[
        placeBidMsg: IAtomicSwapBase.PlaceBidMsgStruct
    ], [
        void
    ], "payable">;
    removeAdmin: TypedContractMethod<[
        _account: AddressLike
    ], [
        void
    ], "nonpayable">;
    removePauser: TypedContractMethod<[
        _account: AddressLike
    ], [
        void
    ], "nonpayable">;
    renounceRole: TypedContractMethod<[
        role: BytesLike,
        callerConfirmation: AddressLike
    ], [
        void
    ], "nonpayable">;
    revokeRole: TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    sellerFeeRate: TypedContractMethod<[], [bigint], "view">;
    setPaginationSize: TypedContractMethod<[
        _paginationSize: BigNumberish
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
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
    swapOrderVestingParams: TypedContractMethod<[
        arg0: BytesLike,
        arg1: BigNumberish
    ], [
        [bigint, bigint] & {
            durationInHours: bigint;
            percentage: bigint;
        }
    ], "view">;
    takeSwap: TypedContractMethod<[
        takeswap: IAtomicSwapBase.TakeSwapMsgStruct
    ], [
        void
    ], "payable">;
    unpause: TypedContractMethod<[], [void], "nonpayable">;
    updateBid: TypedContractMethod<[
        updateBidMsg: IAtomicSwapBase.UpdateBidMsgStruct
    ], [
        void
    ], "payable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "DEFAULT_ADMIN_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "PAUSER_ROLE"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "acceptBid"): TypedContractMethod<[
        acceptBidMsg: IAtomicSwapBase.AcceptBidMsgStruct
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "addAdmin"): TypedContractMethod<[_account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "addPauser"): TypedContractMethod<[_account: AddressLike], [void], "nonpayable">;
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
    getFunction(nameOrSignature: "counteroffers"): TypedContractMethod<[
        arg0: BytesLike,
        arg1: AddressLike
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "getRoleAdmin"): TypedContractMethod<[role: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "grantRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "hasRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[
        _admin: AddressLike,
        _vestingManager: AddressLike,
        _treasury: AddressLike,
        _sellerFee: BigNumberish,
        _buyerFee: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "isAdmin"): TypedContractMethod<[_account: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "isPauser"): TypedContractMethod<[_account: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "makeSwap"): TypedContractMethod<[
        makeswap: IAtomicSwapBase.MakeSwapMsgStruct
    ], [
        string
    ], "payable">;
    getFunction(nameOrSignature: "makeSwapWithVesting"): TypedContractMethod<[
        makeswap: IAtomicSwapBase.MakeSwapMsgStruct,
        releases: IAtomicSwapBase.ReleaseStruct[]
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "paginationSize"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "pause"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "paused"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "placeBid"): TypedContractMethod<[
        placeBidMsg: IAtomicSwapBase.PlaceBidMsgStruct
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "removeAdmin"): TypedContractMethod<[_account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "removePauser"): TypedContractMethod<[_account: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "renounceRole"): TypedContractMethod<[
        role: BytesLike,
        callerConfirmation: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "revokeRole"): TypedContractMethod<[
        role: BytesLike,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "sellerFeeRate"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "setPaginationSize"): TypedContractMethod<[_paginationSize: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
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
    getFunction(nameOrSignature: "swapOrderVestingParams"): TypedContractMethod<[
        arg0: BytesLike,
        arg1: BigNumberish
    ], [
        [bigint, bigint] & {
            durationInHours: bigint;
            percentage: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "takeSwap"): TypedContractMethod<[
        takeswap: IAtomicSwapBase.TakeSwapMsgStruct
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "unpause"): TypedContractMethod<[], [void], "nonpayable">;
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
    getEvent(key: "Paused"): TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
    getEvent(key: "PlacedBid"): TypedContractEvent<PlacedBidEvent.InputTuple, PlacedBidEvent.OutputTuple, PlacedBidEvent.OutputObject>;
    getEvent(key: "ReceivedNewBid"): TypedContractEvent<ReceivedNewBidEvent.InputTuple, ReceivedNewBidEvent.OutputTuple, ReceivedNewBidEvent.OutputObject>;
    getEvent(key: "RoleAdminChanged"): TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
    getEvent(key: "RoleGranted"): TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
    getEvent(key: "RoleRevoked"): TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
    getEvent(key: "Unpaused"): TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
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
        "Paused(address)": TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
        Paused: TypedContractEvent<PausedEvent.InputTuple, PausedEvent.OutputTuple, PausedEvent.OutputObject>;
        "PlacedBid(bytes32,address,uint256)": TypedContractEvent<PlacedBidEvent.InputTuple, PlacedBidEvent.OutputTuple, PlacedBidEvent.OutputObject>;
        PlacedBid: TypedContractEvent<PlacedBidEvent.InputTuple, PlacedBidEvent.OutputTuple, PlacedBidEvent.OutputObject>;
        "ReceivedNewBid(bytes32,address,uint256)": TypedContractEvent<ReceivedNewBidEvent.InputTuple, ReceivedNewBidEvent.OutputTuple, ReceivedNewBidEvent.OutputObject>;
        ReceivedNewBid: TypedContractEvent<ReceivedNewBidEvent.InputTuple, ReceivedNewBidEvent.OutputTuple, ReceivedNewBidEvent.OutputObject>;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        RoleAdminChanged: TypedContractEvent<RoleAdminChangedEvent.InputTuple, RoleAdminChangedEvent.OutputTuple, RoleAdminChangedEvent.OutputObject>;
        "RoleGranted(bytes32,address,address)": TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        RoleGranted: TypedContractEvent<RoleGrantedEvent.InputTuple, RoleGrantedEvent.OutputTuple, RoleGrantedEvent.OutputObject>;
        "RoleRevoked(bytes32,address,address)": TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        RoleRevoked: TypedContractEvent<RoleRevokedEvent.InputTuple, RoleRevokedEvent.OutputTuple, RoleRevokedEvent.OutputObject>;
        "Unpaused(address)": TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
        Unpaused: TypedContractEvent<UnpausedEvent.InputTuple, UnpausedEvent.OutputTuple, UnpausedEvent.OutputObject>;
        "UpdatedBid(bytes32,address,uint256)": TypedContractEvent<UpdatedBidEvent.InputTuple, UpdatedBidEvent.OutputTuple, UpdatedBidEvent.OutputObject>;
        UpdatedBid: TypedContractEvent<UpdatedBidEvent.InputTuple, UpdatedBidEvent.OutputTuple, UpdatedBidEvent.OutputObject>;
    };
}
