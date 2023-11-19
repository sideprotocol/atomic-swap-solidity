import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../../common";
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
}
export interface AtomicSwapMsgValidatorInterface extends Interface {
    getFunction(nameOrSignature: "isContract" | "validateMakeSwapParams" | "validateVestingParams"): FunctionFragment;
    encodeFunctionData(functionFragment: "isContract", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "validateMakeSwapParams", values: [IAtomicSwapBase.MakeSwapMsgStruct]): string;
    encodeFunctionData(functionFragment: "validateVestingParams", values: [IAtomicSwapBase.ReleaseStruct[]]): string;
    decodeFunctionResult(functionFragment: "isContract", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "validateMakeSwapParams", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "validateVestingParams", data: BytesLike): Result;
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
    isContract: TypedContractMethod<[addr: AddressLike], [boolean], "view">;
    validateMakeSwapParams: TypedContractMethod<[
        makeswap: IAtomicSwapBase.MakeSwapMsgStruct
    ], [
        void
    ], "view">;
    validateVestingParams: TypedContractMethod<[
        releases: IAtomicSwapBase.ReleaseStruct[]
    ], [
        void
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "isContract"): TypedContractMethod<[addr: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "validateMakeSwapParams"): TypedContractMethod<[
        makeswap: IAtomicSwapBase.MakeSwapMsgStruct
    ], [
        void
    ], "view">;
    getFunction(nameOrSignature: "validateVestingParams"): TypedContractMethod<[
        releases: IAtomicSwapBase.ReleaseStruct[]
    ], [
        void
    ], "view">;
    filters: {};
}
