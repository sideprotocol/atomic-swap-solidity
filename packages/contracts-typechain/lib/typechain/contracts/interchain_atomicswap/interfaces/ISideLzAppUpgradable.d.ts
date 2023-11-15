import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export interface ISideLzAppUpgradableInterface extends Interface {
    getFunction(nameOrSignature: "sendLzMsg"): FunctionFragment;
    encodeFunctionData(functionFragment: "sendLzMsg", values: [BigNumberish, AddressLike, BytesLike]): string;
    decodeFunctionResult(functionFragment: "sendLzMsg", data: BytesLike): Result;
}
export interface ISideLzAppUpgradable extends BaseContract {
    connect(runner?: ContractRunner | null): ISideLzAppUpgradable;
    waitForDeployment(): Promise<this>;
    interface: ISideLzAppUpgradableInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    sendLzMsg: TypedContractMethod<[
        _dstChainId: BigNumberish,
        sender: AddressLike,
        _payload: BytesLike
    ], [
        void
    ], "payable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "sendLzMsg"): TypedContractMethod<[
        _dstChainId: BigNumberish,
        sender: AddressLike,
        _payload: BytesLike
    ], [
        void
    ], "payable">;
    filters: {};
}
