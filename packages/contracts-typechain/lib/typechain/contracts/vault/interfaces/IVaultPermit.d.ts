import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export declare namespace IAtomicSwapBase {
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
}
export interface IVaultPermitInterface extends Interface {
    getFunction(nameOrSignature: "DOMAIN_SEPARATOR" | "permit"): FunctionFragment;
    encodeFunctionData(functionFragment: "DOMAIN_SEPARATOR", values?: undefined): string;
    encodeFunctionData(functionFragment: "permit", values: [
        AddressLike,
        AddressLike,
        BigNumberish,
        BytesLike,
        IAtomicSwapBase.PermitSignatureStruct
    ]): string;
    decodeFunctionResult(functionFragment: "DOMAIN_SEPARATOR", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
}
export interface IVaultPermit extends BaseContract {
    connect(runner?: ContractRunner | null): IVaultPermit;
    waitForDeployment(): Promise<this>;
    interface: IVaultPermitInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    DOMAIN_SEPARATOR: TypedContractMethod<[], [string], "view">;
    permit: TypedContractMethod<[
        token: AddressLike,
        spender: AddressLike,
        value: BigNumberish,
        agreement: BytesLike,
        signature: IAtomicSwapBase.PermitSignatureStruct
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "DOMAIN_SEPARATOR"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "permit"): TypedContractMethod<[
        token: AddressLike,
        spender: AddressLike,
        value: BigNumberish,
        agreement: BytesLike,
        signature: IAtomicSwapBase.PermitSignatureStruct
    ], [
        void
    ], "nonpayable">;
    filters: {};
}
