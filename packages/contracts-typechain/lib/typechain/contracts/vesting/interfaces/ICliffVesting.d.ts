import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export interface ICliffVestingInterface extends Interface {
    getFunction(nameOrSignature: "startVesting"): FunctionFragment;
    encodeFunctionData(functionFragment: "startVesting", values: [
        AddressLike,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        AddressLike,
        BigNumberish,
        BigNumberish
    ]): string;
    decodeFunctionResult(functionFragment: "startVesting", data: BytesLike): Result;
}
export interface ICliffVesting extends BaseContract {
    connect(runner?: ContractRunner | null): ICliffVesting;
    waitForDeployment(): Promise<this>;
    interface: ICliffVestingInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    startVesting: TypedContractMethod<[
        beneficiary: AddressLike,
        start: BigNumberish,
        cliffDurationInHours: BigNumberish,
        durationInHours: BigNumberish,
        token: AddressLike,
        totalAmount: BigNumberish,
        releaseIntervalInHours: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "startVesting"): TypedContractMethod<[
        beneficiary: AddressLike,
        start: BigNumberish,
        cliffDurationInHours: BigNumberish,
        durationInHours: BigNumberish,
        token: AddressLike,
        totalAmount: BigNumberish,
        releaseIntervalInHours: BigNumberish
    ], [
        void
    ], "nonpayable">;
    filters: {};
}
