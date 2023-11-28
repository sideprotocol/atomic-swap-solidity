import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export interface ReentrancyAttackInterface extends Interface {
    getFunction(nameOrSignature: "attack" | "beneficiary" | "orderId" | "vestingContract"): FunctionFragment;
    encodeFunctionData(functionFragment: "attack", values?: undefined): string;
    encodeFunctionData(functionFragment: "beneficiary", values?: undefined): string;
    encodeFunctionData(functionFragment: "orderId", values?: undefined): string;
    encodeFunctionData(functionFragment: "vestingContract", values?: undefined): string;
    decodeFunctionResult(functionFragment: "attack", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "beneficiary", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "orderId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vestingContract", data: BytesLike): Result;
}
export interface ReentrancyAttack extends BaseContract {
    connect(runner?: ContractRunner | null): ReentrancyAttack;
    waitForDeployment(): Promise<this>;
    interface: ReentrancyAttackInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    attack: TypedContractMethod<[], [void], "payable">;
    beneficiary: TypedContractMethod<[], [string], "view">;
    orderId: TypedContractMethod<[], [string], "view">;
    vestingContract: TypedContractMethod<[], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "attack"): TypedContractMethod<[], [void], "payable">;
    getFunction(nameOrSignature: "beneficiary"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "orderId"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "vestingContract"): TypedContractMethod<[], [string], "view">;
    filters: {};
}
