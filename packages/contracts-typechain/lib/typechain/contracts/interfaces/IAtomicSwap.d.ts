import type { BaseContract, BigNumber, BigNumberish, BytesLike, Signer, utils } from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface IAtomicSwapInterface extends utils.Interface {
    functions: {};
    events: {
        "AcceptedBid(bytes32,address,uint256)": EventFragment;
        "AtomicSwapOrderCanceled(bytes32)": EventFragment;
        "AtomicSwapOrderCreated(bytes32)": EventFragment;
        "AtomicSwapOrderTook(address,address,bytes32)": EventFragment;
        "CanceledBid(bytes32,address)": EventFragment;
        "ReceivedNewBid(bytes32,address,uint256)": EventFragment;
        "UpdatedBid(bytes32,address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AcceptedBid"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AtomicSwapOrderCanceled"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AtomicSwapOrderCreated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AtomicSwapOrderTook"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "CanceledBid"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ReceivedNewBid"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "UpdatedBid"): EventFragment;
}
export interface AcceptedBidEventObject {
    orderID: string;
    bidder: string;
    amount: BigNumber;
}
export type AcceptedBidEvent = TypedEvent<[
    string,
    string,
    BigNumber
], AcceptedBidEventObject>;
export type AcceptedBidEventFilter = TypedEventFilter<AcceptedBidEvent>;
export interface AtomicSwapOrderCanceledEventObject {
    id: string;
}
export type AtomicSwapOrderCanceledEvent = TypedEvent<[
    string
], AtomicSwapOrderCanceledEventObject>;
export type AtomicSwapOrderCanceledEventFilter = TypedEventFilter<AtomicSwapOrderCanceledEvent>;
export interface AtomicSwapOrderCreatedEventObject {
    id: string;
}
export type AtomicSwapOrderCreatedEvent = TypedEvent<[
    string
], AtomicSwapOrderCreatedEventObject>;
export type AtomicSwapOrderCreatedEventFilter = TypedEventFilter<AtomicSwapOrderCreatedEvent>;
export interface AtomicSwapOrderTookEventObject {
    maker: string;
    taker: string;
    id: string;
}
export type AtomicSwapOrderTookEvent = TypedEvent<[
    string,
    string,
    string
], AtomicSwapOrderTookEventObject>;
export type AtomicSwapOrderTookEventFilter = TypedEventFilter<AtomicSwapOrderTookEvent>;
export interface CanceledBidEventObject {
    orderID: string;
    bidder: string;
}
export type CanceledBidEvent = TypedEvent<[
    string,
    string
], CanceledBidEventObject>;
export type CanceledBidEventFilter = TypedEventFilter<CanceledBidEvent>;
export interface ReceivedNewBidEventObject {
    orderID: string;
    bidder: string;
    amount: BigNumber;
}
export type ReceivedNewBidEvent = TypedEvent<[
    string,
    string,
    BigNumber
], ReceivedNewBidEventObject>;
export type ReceivedNewBidEventFilter = TypedEventFilter<ReceivedNewBidEvent>;
export interface UpdatedBidEventObject {
    orderID: string;
    bidder: string;
    amount: BigNumber;
}
export type UpdatedBidEvent = TypedEvent<[
    string,
    string,
    BigNumber
], UpdatedBidEventObject>;
export type UpdatedBidEventFilter = TypedEventFilter<UpdatedBidEvent>;
export interface IAtomicSwap extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IAtomicSwapInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {};
    callStatic: {};
    filters: {
        "AcceptedBid(bytes32,address,uint256)"(orderID?: PromiseOrValue<BytesLike> | null, bidder?: PromiseOrValue<string> | null, amount?: PromiseOrValue<BigNumberish> | null): AcceptedBidEventFilter;
        AcceptedBid(orderID?: PromiseOrValue<BytesLike> | null, bidder?: PromiseOrValue<string> | null, amount?: PromiseOrValue<BigNumberish> | null): AcceptedBidEventFilter;
        "AtomicSwapOrderCanceled(bytes32)"(id?: PromiseOrValue<BytesLike> | null): AtomicSwapOrderCanceledEventFilter;
        AtomicSwapOrderCanceled(id?: PromiseOrValue<BytesLike> | null): AtomicSwapOrderCanceledEventFilter;
        "AtomicSwapOrderCreated(bytes32)"(id?: PromiseOrValue<BytesLike> | null): AtomicSwapOrderCreatedEventFilter;
        AtomicSwapOrderCreated(id?: PromiseOrValue<BytesLike> | null): AtomicSwapOrderCreatedEventFilter;
        "AtomicSwapOrderTook(address,address,bytes32)"(maker?: PromiseOrValue<string> | null, taker?: PromiseOrValue<string> | null, id?: PromiseOrValue<BytesLike> | null): AtomicSwapOrderTookEventFilter;
        AtomicSwapOrderTook(maker?: PromiseOrValue<string> | null, taker?: PromiseOrValue<string> | null, id?: PromiseOrValue<BytesLike> | null): AtomicSwapOrderTookEventFilter;
        "CanceledBid(bytes32,address)"(orderID?: PromiseOrValue<BytesLike> | null, bidder?: PromiseOrValue<string> | null): CanceledBidEventFilter;
        CanceledBid(orderID?: PromiseOrValue<BytesLike> | null, bidder?: PromiseOrValue<string> | null): CanceledBidEventFilter;
        "ReceivedNewBid(bytes32,address,uint256)"(orderID?: PromiseOrValue<BytesLike> | null, bidder?: PromiseOrValue<string> | null, amount?: PromiseOrValue<BigNumberish> | null): ReceivedNewBidEventFilter;
        ReceivedNewBid(orderID?: PromiseOrValue<BytesLike> | null, bidder?: PromiseOrValue<string> | null, amount?: PromiseOrValue<BigNumberish> | null): ReceivedNewBidEventFilter;
        "UpdatedBid(bytes32,address,uint256)"(orderID?: PromiseOrValue<BytesLike> | null, bidder?: PromiseOrValue<string> | null, amount?: PromiseOrValue<BigNumberish> | null): UpdatedBidEventFilter;
        UpdatedBid(orderID?: PromiseOrValue<BytesLike> | null, bidder?: PromiseOrValue<string> | null, amount?: PromiseOrValue<BigNumberish> | null): UpdatedBidEventFilter;
    };
    estimateGas: {};
    populateTransaction: {};
}
