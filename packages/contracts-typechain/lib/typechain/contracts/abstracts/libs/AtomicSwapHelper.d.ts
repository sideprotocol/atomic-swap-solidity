import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export interface AtomicSwapHelperInterface extends Interface {
    getFunction(nameOrSignature: "generateNewAtomicSwapID"): FunctionFragment;
    encodeFunctionData(functionFragment: "generateNewAtomicSwapID", values: [BytesLike, AddressLike]): string;
    decodeFunctionResult(functionFragment: "generateNewAtomicSwapID", data: BytesLike): Result;
}
export interface AtomicSwapHelper extends BaseContract {
    connect(runner?: ContractRunner | null): AtomicSwapHelper;
    waitForDeployment(): Promise<this>;
    interface: AtomicSwapHelperInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    generateNewAtomicSwapID: TypedContractMethod<[
        uuid: BytesLike,
        contractAddress: AddressLike
    ], [
        string
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "generateNewAtomicSwapID"): TypedContractMethod<[
        uuid: BytesLike,
        contractAddress: AddressLike
    ], [
        string
    ], "view">;
    filters: {};
}
