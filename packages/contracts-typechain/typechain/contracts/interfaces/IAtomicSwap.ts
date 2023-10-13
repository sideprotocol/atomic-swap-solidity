/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { BaseContract, BigNumber, BytesLike, Signer, utils } from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface IAtomicSwapInterface extends utils.Interface {
  functions: {};

  events: {
    "AtomicSwapOrderCanceled(bytes32)": EventFragment;
    "AtomicSwapOrderCreated(bytes32)": EventFragment;
    "AtomicSwapOrderTook(address,address,bytes32)": EventFragment;
    "PaymentReceived(address,uint256,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AtomicSwapOrderCanceled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AtomicSwapOrderCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AtomicSwapOrderTook"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PaymentReceived"): EventFragment;
}

export interface AtomicSwapOrderCanceledEventObject {
  id: string;
}
export type AtomicSwapOrderCanceledEvent = TypedEvent<
  [string],
  AtomicSwapOrderCanceledEventObject
>;

export type AtomicSwapOrderCanceledEventFilter =
  TypedEventFilter<AtomicSwapOrderCanceledEvent>;

export interface AtomicSwapOrderCreatedEventObject {
  id: string;
}
export type AtomicSwapOrderCreatedEvent = TypedEvent<
  [string],
  AtomicSwapOrderCreatedEventObject
>;

export type AtomicSwapOrderCreatedEventFilter =
  TypedEventFilter<AtomicSwapOrderCreatedEvent>;

export interface AtomicSwapOrderTookEventObject {
  maker: string;
  taker: string;
  id: string;
}
export type AtomicSwapOrderTookEvent = TypedEvent<
  [string, string, string],
  AtomicSwapOrderTookEventObject
>;

export type AtomicSwapOrderTookEventFilter =
  TypedEventFilter<AtomicSwapOrderTookEvent>;

export interface PaymentReceivedEventObject {
  payer: string;
  amount: BigNumber;
  daoShare: BigNumber;
  burned: BigNumber;
}
export type PaymentReceivedEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber],
  PaymentReceivedEventObject
>;

export type PaymentReceivedEventFilter = TypedEventFilter<PaymentReceivedEvent>;

export interface IAtomicSwap extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IAtomicSwapInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {};

  callStatic: {};

  filters: {
    "AtomicSwapOrderCanceled(bytes32)"(
      id?: PromiseOrValue<BytesLike> | null
    ): AtomicSwapOrderCanceledEventFilter;
    AtomicSwapOrderCanceled(
      id?: PromiseOrValue<BytesLike> | null
    ): AtomicSwapOrderCanceledEventFilter;

    "AtomicSwapOrderCreated(bytes32)"(
      id?: PromiseOrValue<BytesLike> | null
    ): AtomicSwapOrderCreatedEventFilter;
    AtomicSwapOrderCreated(
      id?: PromiseOrValue<BytesLike> | null
    ): AtomicSwapOrderCreatedEventFilter;

    "AtomicSwapOrderTook(address,address,bytes32)"(
      maker?: PromiseOrValue<string> | null,
      taker?: PromiseOrValue<string> | null,
      id?: PromiseOrValue<BytesLike> | null
    ): AtomicSwapOrderTookEventFilter;
    AtomicSwapOrderTook(
      maker?: PromiseOrValue<string> | null,
      taker?: PromiseOrValue<string> | null,
      id?: PromiseOrValue<BytesLike> | null
    ): AtomicSwapOrderTookEventFilter;

    "PaymentReceived(address,uint256,uint256,uint256)"(
      payer?: PromiseOrValue<string> | null,
      amount?: null,
      daoShare?: null,
      burned?: null
    ): PaymentReceivedEventFilter;
    PaymentReceived(
      payer?: PromiseOrValue<string> | null,
      amount?: null,
      daoShare?: null,
      burned?: null
    ): PaymentReceivedEventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}
