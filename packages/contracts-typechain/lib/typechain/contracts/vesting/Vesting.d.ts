import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export declare namespace IVesting {
    type VestingScheduleStruct = {
        from: AddressLike;
        start: BigNumberish;
        token: AddressLike;
        totalAmount: BigNumberish;
        amountReleased: BigNumberish;
        lastReleasedStep: BigNumberish;
    };
    type VestingScheduleStructOutput = [
        from: string,
        start: bigint,
        token: string,
        totalAmount: bigint,
        amountReleased: bigint,
        lastReleasedStep: bigint
    ] & {
        from: string;
        start: bigint;
        token: string;
        totalAmount: bigint;
        amountReleased: bigint;
        lastReleasedStep: bigint;
    };
    type VestingInfoStruct = {
        schedule: IVesting.VestingScheduleStruct;
        release: IAtomicSwapBase.ReleaseStruct[];
        beneficiary: AddressLike;
        orderId: BytesLike;
    };
    type VestingInfoStructOutput = [
        schedule: IVesting.VestingScheduleStructOutput,
        release: IAtomicSwapBase.ReleaseStructOutput[],
        beneficiary: string,
        orderId: string
    ] & {
        schedule: IVesting.VestingScheduleStructOutput;
        release: IAtomicSwapBase.ReleaseStructOutput[];
        beneficiary: string;
        orderId: string;
    };
}
export declare namespace IAtomicSwapBase {
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
export interface VestingInterface extends Interface {
    getFunction(nameOrSignature: "initialize" | "owner" | "release" | "releaseInfos" | "renounceOwnership" | "setAdmin" | "startVesting" | "transferOwnership" | "vestingSchedules"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized" | "NewVesting" | "OwnershipTransferred" | "Received" | "Released"): EventFragment;
    encodeFunctionData(functionFragment: "initialize", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "release", values: [AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "releaseInfos", values: [AddressLike, BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "setAdmin", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "startVesting", values: [
        BytesLike,
        AddressLike,
        AddressLike,
        BigNumberish,
        IAtomicSwapBase.ReleaseStruct[]
    ]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "vestingSchedules", values: [AddressLike, BytesLike]): string;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "release", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "releaseInfos", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "startVesting", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vestingSchedules", data: BytesLike): Result;
}
export declare namespace InitializedEvent {
    type InputTuple = [version: BigNumberish];
    type OutputTuple = [version: bigint];
    interface OutputObject {
        version: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace NewVestingEvent {
    type InputTuple = [vesting: IVesting.VestingInfoStruct];
    type OutputTuple = [vesting: IVesting.VestingInfoStructOutput];
    interface OutputObject {
        vesting: IVesting.VestingInfoStructOutput;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace OwnershipTransferredEvent {
    type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
    type OutputTuple = [previousOwner: string, newOwner: string];
    interface OutputObject {
        previousOwner: string;
        newOwner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ReceivedEvent {
    type InputTuple = [sender: AddressLike, amount: BigNumberish];
    type OutputTuple = [sender: string, amount: bigint];
    interface OutputObject {
        sender: string;
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ReleasedEvent {
    type InputTuple = [beneficiary: AddressLike, amount: BigNumberish];
    type OutputTuple = [beneficiary: string, amount: bigint];
    interface OutputObject {
        beneficiary: string;
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface Vesting extends BaseContract {
    connect(runner?: ContractRunner | null): Vesting;
    waitForDeployment(): Promise<this>;
    interface: VestingInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    initialize: TypedContractMethod<[_admin: AddressLike], [void], "nonpayable">;
    owner: TypedContractMethod<[], [string], "view">;
    release: TypedContractMethod<[
        beneficiary: AddressLike,
        orderId: BytesLike
    ], [
        void
    ], "nonpayable">;
    releaseInfos: TypedContractMethod<[
        arg0: AddressLike,
        arg1: BytesLike,
        arg2: BigNumberish
    ], [
        [bigint, bigint] & {
            durationInHours: bigint;
            percentage: bigint;
        }
    ], "view">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    setAdmin: TypedContractMethod<[_newAdmin: AddressLike], [void], "nonpayable">;
    startVesting: TypedContractMethod<[
        orderId: BytesLike,
        beneficiary: AddressLike,
        token: AddressLike,
        totalAmount: BigNumberish,
        releases: IAtomicSwapBase.ReleaseStruct[]
    ], [
        void
    ], "payable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    vestingSchedules: TypedContractMethod<[
        arg0: AddressLike,
        arg1: BytesLike
    ], [
        [
            string,
            bigint,
            string,
            bigint,
            bigint,
            bigint
        ] & {
            from: string;
            start: bigint;
            token: string;
            totalAmount: bigint;
            amountReleased: bigint;
            lastReleasedStep: bigint;
        }
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "initialize"): TypedContractMethod<[_admin: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "release"): TypedContractMethod<[
        beneficiary: AddressLike,
        orderId: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "releaseInfos"): TypedContractMethod<[
        arg0: AddressLike,
        arg1: BytesLike,
        arg2: BigNumberish
    ], [
        [bigint, bigint] & {
            durationInHours: bigint;
            percentage: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "setAdmin"): TypedContractMethod<[_newAdmin: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "startVesting"): TypedContractMethod<[
        orderId: BytesLike,
        beneficiary: AddressLike,
        token: AddressLike,
        totalAmount: BigNumberish,
        releases: IAtomicSwapBase.ReleaseStruct[]
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "vestingSchedules"): TypedContractMethod<[
        arg0: AddressLike,
        arg1: BytesLike
    ], [
        [
            string,
            bigint,
            string,
            bigint,
            bigint,
            bigint
        ] & {
            from: string;
            start: bigint;
            token: string;
            totalAmount: bigint;
            amountReleased: bigint;
            lastReleasedStep: bigint;
        }
    ], "view">;
    getEvent(key: "Initialized"): TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
    getEvent(key: "NewVesting"): TypedContractEvent<NewVestingEvent.InputTuple, NewVestingEvent.OutputTuple, NewVestingEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "Received"): TypedContractEvent<ReceivedEvent.InputTuple, ReceivedEvent.OutputTuple, ReceivedEvent.OutputObject>;
    getEvent(key: "Released"): TypedContractEvent<ReleasedEvent.InputTuple, ReleasedEvent.OutputTuple, ReleasedEvent.OutputObject>;
    filters: {
        "Initialized(uint64)": TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        Initialized: TypedContractEvent<InitializedEvent.InputTuple, InitializedEvent.OutputTuple, InitializedEvent.OutputObject>;
        "NewVesting(tuple)": TypedContractEvent<NewVestingEvent.InputTuple, NewVestingEvent.OutputTuple, NewVestingEvent.OutputObject>;
        NewVesting: TypedContractEvent<NewVestingEvent.InputTuple, NewVestingEvent.OutputTuple, NewVestingEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "Received(address,uint256)": TypedContractEvent<ReceivedEvent.InputTuple, ReceivedEvent.OutputTuple, ReceivedEvent.OutputObject>;
        Received: TypedContractEvent<ReceivedEvent.InputTuple, ReceivedEvent.OutputTuple, ReceivedEvent.OutputObject>;
        "Released(address,uint256)": TypedContractEvent<ReleasedEvent.InputTuple, ReleasedEvent.OutputTuple, ReleasedEvent.OutputObject>;
        Released: TypedContractEvent<ReleasedEvent.InputTuple, ReleasedEvent.OutputTuple, ReleasedEvent.OutputObject>;
    };
}
