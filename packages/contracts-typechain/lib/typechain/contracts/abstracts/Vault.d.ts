import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface VaultInterface extends Interface {
    getFunction(nameOrSignature: "allowance" | "approve" | "balanceOf" | "deposit" | "transfer" | "transferFrom" | "withdraw"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Deposit" | "VaultApproval" | "VaultTransfer" | "Withdrawal"): EventFragment;
    encodeFunctionData(functionFragment: "allowance", values: [AddressLike, AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "approve", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "deposit", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "transfer", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [AddressLike, AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "withdraw", values: [AddressLike, AddressLike, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}
export declare namespace DepositEvent {
    type InputTuple = [
        token: AddressLike,
        from: AddressLike,
        value: BigNumberish
    ];
    type OutputTuple = [token: string, from: string, value: bigint];
    interface OutputObject {
        token: string;
        from: string;
        value: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace VaultApprovalEvent {
    type InputTuple = [
        owner: AddressLike,
        spender: AddressLike,
        value: BigNumberish
    ];
    type OutputTuple = [owner: string, spender: string, value: bigint];
    interface OutputObject {
        owner: string;
        spender: string;
        value: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace VaultTransferEvent {
    type InputTuple = [
        token: AddressLike,
        from: AddressLike,
        to: AddressLike,
        value: BigNumberish
    ];
    type OutputTuple = [
        token: string,
        from: string,
        to: string,
        value: bigint
    ];
    interface OutputObject {
        token: string;
        from: string;
        to: string;
        value: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace WithdrawalEvent {
    type InputTuple = [
        token: AddressLike,
        to: AddressLike,
        value: BigNumberish
    ];
    type OutputTuple = [token: string, to: string, value: bigint];
    interface OutputObject {
        token: string;
        to: string;
        value: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface Vault extends BaseContract {
    connect(runner?: ContractRunner | null): Vault;
    waitForDeployment(): Promise<this>;
    interface: VaultInterface;
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
        account: AddressLike,
        token: AddressLike
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
        account: AddressLike,
        token: AddressLike
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
    getEvent(key: "Deposit"): TypedContractEvent<DepositEvent.InputTuple, DepositEvent.OutputTuple, DepositEvent.OutputObject>;
    getEvent(key: "VaultApproval"): TypedContractEvent<VaultApprovalEvent.InputTuple, VaultApprovalEvent.OutputTuple, VaultApprovalEvent.OutputObject>;
    getEvent(key: "VaultTransfer"): TypedContractEvent<VaultTransferEvent.InputTuple, VaultTransferEvent.OutputTuple, VaultTransferEvent.OutputObject>;
    getEvent(key: "Withdrawal"): TypedContractEvent<WithdrawalEvent.InputTuple, WithdrawalEvent.OutputTuple, WithdrawalEvent.OutputObject>;
    filters: {
        "Deposit(address,address,uint256)": TypedContractEvent<DepositEvent.InputTuple, DepositEvent.OutputTuple, DepositEvent.OutputObject>;
        Deposit: TypedContractEvent<DepositEvent.InputTuple, DepositEvent.OutputTuple, DepositEvent.OutputObject>;
        "VaultApproval(address,address,uint256)": TypedContractEvent<VaultApprovalEvent.InputTuple, VaultApprovalEvent.OutputTuple, VaultApprovalEvent.OutputObject>;
        VaultApproval: TypedContractEvent<VaultApprovalEvent.InputTuple, VaultApprovalEvent.OutputTuple, VaultApprovalEvent.OutputObject>;
        "VaultTransfer(address,address,address,uint256)": TypedContractEvent<VaultTransferEvent.InputTuple, VaultTransferEvent.OutputTuple, VaultTransferEvent.OutputObject>;
        VaultTransfer: TypedContractEvent<VaultTransferEvent.InputTuple, VaultTransferEvent.OutputTuple, VaultTransferEvent.OutputObject>;
        "Withdrawal(address,address,uint256)": TypedContractEvent<WithdrawalEvent.InputTuple, WithdrawalEvent.OutputTuple, WithdrawalEvent.OutputObject>;
        Withdrawal: TypedContractEvent<WithdrawalEvent.InputTuple, WithdrawalEvent.OutputTuple, WithdrawalEvent.OutputObject>;
    };
}
