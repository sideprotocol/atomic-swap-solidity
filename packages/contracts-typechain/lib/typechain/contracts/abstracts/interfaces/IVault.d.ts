import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export interface IVaultInterface extends Interface {
    getFunction(nameOrSignature: "allowance" | "approve" | "balanceOf" | "deposit" | "transfer" | "transferFrom" | "withdraw" | "withdrawFrom"): FunctionFragment;
    encodeFunctionData(functionFragment: "allowance", values: [AddressLike, AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "approve", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "deposit", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "transfer", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [AddressLike, AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "withdraw", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "withdrawFrom", values: [AddressLike, AddressLike, AddressLike, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawFrom", data: BytesLike): Result;
}
export interface IVault extends BaseContract {
    connect(runner?: ContractRunner | null): IVault;
    waitForDeployment(): Promise<this>;
    interface: IVaultInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    allowance: TypedContractMethod<[
        token: AddressLike,
        owner: AddressLike,
        spender: AddressLike
    ], [
        bigint
    ], "view">;
    approve: TypedContractMethod<[
        token: AddressLike,
        spender: AddressLike,
        value: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    balanceOf: TypedContractMethod<[
        token: AddressLike,
        account: AddressLike
    ], [
        bigint
    ], "view">;
    deposit: TypedContractMethod<[
        token: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "payable">;
    transfer: TypedContractMethod<[
        token: AddressLike,
        to: AddressLike,
        value: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    transferFrom: TypedContractMethod<[
        token: AddressLike,
        from: AddressLike,
        to: AddressLike,
        value: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    withdraw: TypedContractMethod<[
        token: AddressLike,
        to: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    withdrawFrom: TypedContractMethod<[
        token: AddressLike,
        from: AddressLike,
        to: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "allowance"): TypedContractMethod<[
        token: AddressLike,
        owner: AddressLike,
        spender: AddressLike
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "approve"): TypedContractMethod<[
        token: AddressLike,
        spender: AddressLike,
        value: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[
        token: AddressLike,
        account: AddressLike
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "deposit"): TypedContractMethod<[
        token: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "transfer"): TypedContractMethod<[
        token: AddressLike,
        to: AddressLike,
        value: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "transferFrom"): TypedContractMethod<[
        token: AddressLike,
        from: AddressLike,
        to: AddressLike,
        value: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "withdraw"): TypedContractMethod<[
        token: AddressLike,
        to: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "withdrawFrom"): TypedContractMethod<[
        token: AddressLike,
        from: AddressLike,
        to: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    filters: {};
}
