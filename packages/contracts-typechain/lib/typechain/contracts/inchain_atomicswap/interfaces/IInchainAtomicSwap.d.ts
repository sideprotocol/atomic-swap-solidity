import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../common";
export declare namespace IAtomicSwapBase {
    type CoinStruct = {
        token: AddressLike;
        amount: BigNumberish;
    };
    type CoinStructOutput = [token: string, amount: bigint] & {
        token: string;
        amount: bigint;
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
    type PermitSignatureStruct = {
        v: BigNumberish;
        r: BytesLike;
        s: BytesLike;
        owner: AddressLike;
        deadline: BigNumberish;
    };
    type PermitSignatureStructOutput = [
        v: bigint,
        r: string,
        s: string,
        owner: string,
        deadline: bigint
    ] & {
        v: bigint;
        r: string;
        s: string;
        owner: string;
        deadline: bigint;
    };
    type SwapWithPermitMsgStruct = {
        uuid: BytesLike;
        sellToken: IAtomicSwapBase.CoinStruct;
        buyToken: IAtomicSwapBase.CoinStruct;
        desiredTaker: AddressLike;
        minBidAmount: BigNumberish;
        acceptBid: boolean;
        completeByBid: boolean;
        withdrawToSellerAccount: boolean;
        withdrawToBuyerAccount: boolean;
        releases: IAtomicSwapBase.ReleaseStruct[];
        sellerSignature: IAtomicSwapBase.PermitSignatureStruct;
        buyerSignature: IAtomicSwapBase.PermitSignatureStruct;
    };
    type SwapWithPermitMsgStructOutput = [
        uuid: string,
        sellToken: IAtomicSwapBase.CoinStructOutput,
        buyToken: IAtomicSwapBase.CoinStructOutput,
        desiredTaker: string,
        minBidAmount: bigint,
        acceptBid: boolean,
        completeByBid: boolean,
        withdrawToSellerAccount: boolean,
        withdrawToBuyerAccount: boolean,
        releases: IAtomicSwapBase.ReleaseStructOutput[],
        sellerSignature: IAtomicSwapBase.PermitSignatureStructOutput,
        buyerSignature: IAtomicSwapBase.PermitSignatureStructOutput
    ] & {
        uuid: string;
        sellToken: IAtomicSwapBase.CoinStructOutput;
        buyToken: IAtomicSwapBase.CoinStructOutput;
        desiredTaker: string;
        minBidAmount: bigint;
        acceptBid: boolean;
        completeByBid: boolean;
        withdrawToSellerAccount: boolean;
        withdrawToBuyerAccount: boolean;
        releases: IAtomicSwapBase.ReleaseStructOutput[];
        sellerSignature: IAtomicSwapBase.PermitSignatureStructOutput;
        buyerSignature: IAtomicSwapBase.PermitSignatureStructOutput;
    };
}
export interface IInchainAtomicSwapInterface extends Interface {
    getFunction(nameOrSignature: "executeSwapWithPermit"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AcceptedBid" | "AtomicSwapOrderCreated" | "AtomicSwapOrderTook"): EventFragment;
    encodeFunctionData(functionFragment: "executeSwapWithPermit", values: [IAtomicSwapBase.SwapWithPermitMsgStruct]): string;
    decodeFunctionResult(functionFragment: "executeSwapWithPermit", data: BytesLike): Result;
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
        id: BytesLike,
        maker: AddressLike,
        taker: AddressLike
    ];
    type OutputTuple = [id: string, maker: string, taker: string];
    interface OutputObject {
        id: string;
        maker: string;
        taker: string;
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
    executeSwapWithPermit: TypedContractMethod<[
        swap: IAtomicSwapBase.SwapWithPermitMsgStruct
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "executeSwapWithPermit"): TypedContractMethod<[
        swap: IAtomicSwapBase.SwapWithPermitMsgStruct
    ], [
        void
    ], "nonpayable">;
    getEvent(key: "AcceptedBid"): TypedContractEvent<AcceptedBidEvent.InputTuple, AcceptedBidEvent.OutputTuple, AcceptedBidEvent.OutputObject>;
    getEvent(key: "AtomicSwapOrderCreated"): TypedContractEvent<AtomicSwapOrderCreatedEvent.InputTuple, AtomicSwapOrderCreatedEvent.OutputTuple, AtomicSwapOrderCreatedEvent.OutputObject>;
    getEvent(key: "AtomicSwapOrderTook"): TypedContractEvent<AtomicSwapOrderTookEvent.InputTuple, AtomicSwapOrderTookEvent.OutputTuple, AtomicSwapOrderTookEvent.OutputObject>;
    filters: {
        "AcceptedBid(bytes32,address,uint256)": TypedContractEvent<AcceptedBidEvent.InputTuple, AcceptedBidEvent.OutputTuple, AcceptedBidEvent.OutputObject>;
        AcceptedBid: TypedContractEvent<AcceptedBidEvent.InputTuple, AcceptedBidEvent.OutputTuple, AcceptedBidEvent.OutputObject>;
        "AtomicSwapOrderCreated(bytes32)": TypedContractEvent<AtomicSwapOrderCreatedEvent.InputTuple, AtomicSwapOrderCreatedEvent.OutputTuple, AtomicSwapOrderCreatedEvent.OutputObject>;
        AtomicSwapOrderCreated: TypedContractEvent<AtomicSwapOrderCreatedEvent.InputTuple, AtomicSwapOrderCreatedEvent.OutputTuple, AtomicSwapOrderCreatedEvent.OutputObject>;
        "AtomicSwapOrderTook(bytes32,address,address)": TypedContractEvent<AtomicSwapOrderTookEvent.InputTuple, AtomicSwapOrderTookEvent.OutputTuple, AtomicSwapOrderTookEvent.OutputObject>;
        AtomicSwapOrderTook: TypedContractEvent<AtomicSwapOrderTookEvent.InputTuple, AtomicSwapOrderTookEvent.OutputTuple, AtomicSwapOrderTookEvent.OutputObject>;
    };
}
