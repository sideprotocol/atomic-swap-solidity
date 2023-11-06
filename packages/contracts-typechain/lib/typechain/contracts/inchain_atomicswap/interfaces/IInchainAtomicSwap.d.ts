import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener } from "../../../common";
export interface IInchainAtomicSwapInterface extends Interface {
    getEvent(nameOrSignatureOrTopic: "AcceptedBid" | "AtomicSwapOrderCanceled" | "AtomicSwapOrderCreated" | "AtomicSwapOrderTook" | "CanceledBid" | "PlacedBid" | "ReceivedNewBid" | "UpdatedBid"): EventFragment;
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
export interface IInchainAtomicSwap extends BaseContract {
    connect(runner?: ContractRunner | null): IInchainAtomicSwap;
    waitForDeployment(): Promise<this>;
    interface: IInchainAtomicSwapInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getEvent(key: "AcceptedBid"): TypedContractEvent<AcceptedBidEvent.InputTuple, AcceptedBidEvent.OutputTuple, AcceptedBidEvent.OutputObject>;
    getEvent(key: "AtomicSwapOrderCanceled"): TypedContractEvent<AtomicSwapOrderCanceledEvent.InputTuple, AtomicSwapOrderCanceledEvent.OutputTuple, AtomicSwapOrderCanceledEvent.OutputObject>;
    getEvent(key: "AtomicSwapOrderCreated"): TypedContractEvent<AtomicSwapOrderCreatedEvent.InputTuple, AtomicSwapOrderCreatedEvent.OutputTuple, AtomicSwapOrderCreatedEvent.OutputObject>;
    getEvent(key: "AtomicSwapOrderTook"): TypedContractEvent<AtomicSwapOrderTookEvent.InputTuple, AtomicSwapOrderTookEvent.OutputTuple, AtomicSwapOrderTookEvent.OutputObject>;
    getEvent(key: "CanceledBid"): TypedContractEvent<CanceledBidEvent.InputTuple, CanceledBidEvent.OutputTuple, CanceledBidEvent.OutputObject>;
    getEvent(key: "PlacedBid"): TypedContractEvent<PlacedBidEvent.InputTuple, PlacedBidEvent.OutputTuple, PlacedBidEvent.OutputObject>;
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
        "PlacedBid(bytes32,address,uint256)": TypedContractEvent<PlacedBidEvent.InputTuple, PlacedBidEvent.OutputTuple, PlacedBidEvent.OutputObject>;
        PlacedBid: TypedContractEvent<PlacedBidEvent.InputTuple, PlacedBidEvent.OutputTuple, PlacedBidEvent.OutputObject>;
        "ReceivedNewBid(bytes32,address,uint256)": TypedContractEvent<ReceivedNewBidEvent.InputTuple, ReceivedNewBidEvent.OutputTuple, ReceivedNewBidEvent.OutputObject>;
        ReceivedNewBid: TypedContractEvent<ReceivedNewBidEvent.InputTuple, ReceivedNewBidEvent.OutputTuple, ReceivedNewBidEvent.OutputObject>;
        "UpdatedBid(bytes32,address,uint256)": TypedContractEvent<UpdatedBidEvent.InputTuple, UpdatedBidEvent.OutputTuple, UpdatedBidEvent.OutputObject>;
        UpdatedBid: TypedContractEvent<UpdatedBidEvent.InputTuple, UpdatedBidEvent.OutputTuple, UpdatedBidEvent.OutputObject>;
    };
}
