import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export declare namespace IAtomicSwapBase {
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
}
export interface AtomicSwapMsgValidatorInterface extends Interface {
    getFunction(nameOrSignature: "_validateMakeSwapParams"): FunctionFragment;
    encodeFunctionData(functionFragment: "_validateMakeSwapParams", values: [IAtomicSwapBase.MakeSwapMsgStruct]): string;
    decodeFunctionResult(functionFragment: "_validateMakeSwapParams", data: BytesLike): Result;
}
export interface AtomicSwapMsgValidator extends BaseContract {
    connect(runner?: ContractRunner | null): AtomicSwapMsgValidator;
    waitForDeployment(): Promise<this>;
    interface: AtomicSwapMsgValidatorInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    _validateMakeSwapParams: TypedContractMethod<[
        makeswap: IAtomicSwapBase.MakeSwapMsgStruct
    ], [
        void
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "_validateMakeSwapParams"): TypedContractMethod<[
        makeswap: IAtomicSwapBase.MakeSwapMsgStruct
    ], [
        void
    ], "view">;
    filters: {};
}
