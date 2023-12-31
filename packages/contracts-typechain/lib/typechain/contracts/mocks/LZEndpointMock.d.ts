import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export interface LZEndpointMockInterface extends Interface {
    getFunction(nameOrSignature: "blockNextMsg" | "defaultAdapterParams" | "estimateFees" | "forceResumeReceive" | "getChainId" | "getConfig" | "getInboundNonce" | "getLengthOfQueue" | "getOutboundNonce" | "getReceiveLibraryAddress" | "getReceiveVersion" | "getSendLibraryAddress" | "getSendVersion" | "hasStoredPayload" | "inboundNonce" | "isReceivingPayload" | "isSendingPayload" | "lzEndpointLookup" | "mockChainId" | "msgsToDeliver" | "nextMsgBlocked" | "oracleFee" | "outboundNonce" | "protocolFeeConfig" | "receivePayload" | "relayerFeeConfig" | "retryPayload" | "send" | "setConfig" | "setDefaultAdapterParams" | "setDestLzEndpoint" | "setOracleFee" | "setProtocolFee" | "setReceiveVersion" | "setRelayerPrice" | "setSendVersion" | "storedPayload"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "PayloadCleared" | "PayloadStored" | "UaForceResumeReceive" | "ValueTransferFailed"): EventFragment;
    encodeFunctionData(functionFragment: "blockNextMsg", values?: undefined): string;
    encodeFunctionData(functionFragment: "defaultAdapterParams", values?: undefined): string;
    encodeFunctionData(functionFragment: "estimateFees", values: [BigNumberish, AddressLike, BytesLike, boolean, BytesLike]): string;
    encodeFunctionData(functionFragment: "forceResumeReceive", values: [BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "getChainId", values?: undefined): string;
    encodeFunctionData(functionFragment: "getConfig", values: [BigNumberish, BigNumberish, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getInboundNonce", values: [BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "getLengthOfQueue", values: [BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "getOutboundNonce", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "getReceiveLibraryAddress", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "getReceiveVersion", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "getSendLibraryAddress", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "getSendVersion", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "hasStoredPayload", values: [BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "inboundNonce", values: [BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "isReceivingPayload", values?: undefined): string;
    encodeFunctionData(functionFragment: "isSendingPayload", values?: undefined): string;
    encodeFunctionData(functionFragment: "lzEndpointLookup", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "mockChainId", values?: undefined): string;
    encodeFunctionData(functionFragment: "msgsToDeliver", values: [BigNumberish, BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "nextMsgBlocked", values?: undefined): string;
    encodeFunctionData(functionFragment: "oracleFee", values?: undefined): string;
    encodeFunctionData(functionFragment: "outboundNonce", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "protocolFeeConfig", values?: undefined): string;
    encodeFunctionData(functionFragment: "receivePayload", values: [
        BigNumberish,
        BytesLike,
        AddressLike,
        BigNumberish,
        BigNumberish,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "relayerFeeConfig", values?: undefined): string;
    encodeFunctionData(functionFragment: "retryPayload", values: [BigNumberish, BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "send", values: [
        BigNumberish,
        BytesLike,
        BytesLike,
        AddressLike,
        AddressLike,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "setConfig", values: [BigNumberish, BigNumberish, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "setDefaultAdapterParams", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "setDestLzEndpoint", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "setOracleFee", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setProtocolFee", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setReceiveVersion", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setRelayerPrice", values: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "setSendVersion", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "storedPayload", values: [BigNumberish, BytesLike]): string;
    decodeFunctionResult(functionFragment: "blockNextMsg", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "defaultAdapterParams", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "estimateFees", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "forceResumeReceive", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getChainId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getConfig", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getInboundNonce", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLengthOfQueue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getOutboundNonce", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getReceiveLibraryAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getReceiveVersion", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getSendLibraryAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getSendVersion", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasStoredPayload", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "inboundNonce", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isReceivingPayload", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isSendingPayload", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lzEndpointLookup", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mockChainId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "msgsToDeliver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nextMsgBlocked", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "oracleFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "outboundNonce", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "protocolFeeConfig", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "receivePayload", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "relayerFeeConfig", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "retryPayload", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "send", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setConfig", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setDefaultAdapterParams", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setDestLzEndpoint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setOracleFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setProtocolFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setReceiveVersion", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setRelayerPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSendVersion", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "storedPayload", data: BytesLike): Result;
}
export declare namespace PayloadClearedEvent {
    type InputTuple = [
        srcChainId: BigNumberish,
        srcAddress: BytesLike,
        nonce: BigNumberish,
        dstAddress: AddressLike
    ];
    type OutputTuple = [
        srcChainId: bigint,
        srcAddress: string,
        nonce: bigint,
        dstAddress: string
    ];
    interface OutputObject {
        srcChainId: bigint;
        srcAddress: string;
        nonce: bigint;
        dstAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace PayloadStoredEvent {
    type InputTuple = [
        srcChainId: BigNumberish,
        srcAddress: BytesLike,
        dstAddress: AddressLike,
        nonce: BigNumberish,
        payload: BytesLike,
        reason: BytesLike
    ];
    type OutputTuple = [
        srcChainId: bigint,
        srcAddress: string,
        dstAddress: string,
        nonce: bigint,
        payload: string,
        reason: string
    ];
    interface OutputObject {
        srcChainId: bigint;
        srcAddress: string;
        dstAddress: string;
        nonce: bigint;
        payload: string;
        reason: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace UaForceResumeReceiveEvent {
    type InputTuple = [chainId: BigNumberish, srcAddress: BytesLike];
    type OutputTuple = [chainId: bigint, srcAddress: string];
    interface OutputObject {
        chainId: bigint;
        srcAddress: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ValueTransferFailedEvent {
    type InputTuple = [to: AddressLike, quantity: BigNumberish];
    type OutputTuple = [to: string, quantity: bigint];
    interface OutputObject {
        to: string;
        quantity: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface LZEndpointMock extends BaseContract {
    connect(runner?: ContractRunner | null): LZEndpointMock;
    waitForDeployment(): Promise<this>;
    interface: LZEndpointMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    blockNextMsg: TypedContractMethod<[], [void], "nonpayable">;
    defaultAdapterParams: TypedContractMethod<[], [string], "view">;
    estimateFees: TypedContractMethod<[
        _dstChainId: BigNumberish,
        _userApplication: AddressLike,
        _payload: BytesLike,
        _payInZRO: boolean,
        _adapterParams: BytesLike
    ], [
        [bigint, bigint] & {
            nativeFee: bigint;
            zroFee: bigint;
        }
    ], "view">;
    forceResumeReceive: TypedContractMethod<[
        _srcChainId: BigNumberish,
        _path: BytesLike
    ], [
        void
    ], "nonpayable">;
    getChainId: TypedContractMethod<[], [bigint], "view">;
    getConfig: TypedContractMethod<[
        arg0: BigNumberish,
        arg1: BigNumberish,
        arg2: AddressLike,
        arg3: BigNumberish
    ], [
        string
    ], "view">;
    getInboundNonce: TypedContractMethod<[
        _chainID: BigNumberish,
        _path: BytesLike
    ], [
        bigint
    ], "view">;
    getLengthOfQueue: TypedContractMethod<[
        _srcChainId: BigNumberish,
        _srcAddress: BytesLike
    ], [
        bigint
    ], "view">;
    getOutboundNonce: TypedContractMethod<[
        _chainID: BigNumberish,
        _srcAddress: AddressLike
    ], [
        bigint
    ], "view">;
    getReceiveLibraryAddress: TypedContractMethod<[
        arg0: AddressLike
    ], [
        string
    ], "view">;
    getReceiveVersion: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    getSendLibraryAddress: TypedContractMethod<[
        arg0: AddressLike
    ], [
        string
    ], "view">;
    getSendVersion: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    hasStoredPayload: TypedContractMethod<[
        _srcChainId: BigNumberish,
        _path: BytesLike
    ], [
        boolean
    ], "view">;
    inboundNonce: TypedContractMethod<[
        arg0: BigNumberish,
        arg1: BytesLike
    ], [
        bigint
    ], "view">;
    isReceivingPayload: TypedContractMethod<[], [boolean], "view">;
    isSendingPayload: TypedContractMethod<[], [boolean], "view">;
    lzEndpointLookup: TypedContractMethod<[arg0: AddressLike], [string], "view">;
    mockChainId: TypedContractMethod<[], [bigint], "view">;
    msgsToDeliver: TypedContractMethod<[
        arg0: BigNumberish,
        arg1: BytesLike,
        arg2: BigNumberish
    ], [
        [
            string,
            bigint,
            string
        ] & {
            dstAddress: string;
            nonce: bigint;
            payload: string;
        }
    ], "view">;
    nextMsgBlocked: TypedContractMethod<[], [boolean], "view">;
    oracleFee: TypedContractMethod<[], [bigint], "view">;
    outboundNonce: TypedContractMethod<[
        arg0: BigNumberish,
        arg1: AddressLike
    ], [
        bigint
    ], "view">;
    protocolFeeConfig: TypedContractMethod<[
    ], [
        [bigint, bigint] & {
            zroFee: bigint;
            nativeBP: bigint;
        }
    ], "view">;
    receivePayload: TypedContractMethod<[
        _srcChainId: BigNumberish,
        _path: BytesLike,
        _dstAddress: AddressLike,
        _nonce: BigNumberish,
        _gasLimit: BigNumberish,
        _payload: BytesLike
    ], [
        void
    ], "nonpayable">;
    relayerFeeConfig: TypedContractMethod<[
    ], [
        [
            bigint,
            bigint,
            bigint,
            bigint,
            bigint
        ] & {
            dstPriceRatio: bigint;
            dstGasPriceInWei: bigint;
            dstNativeAmtCap: bigint;
            baseGas: bigint;
            gasPerByte: bigint;
        }
    ], "view">;
    retryPayload: TypedContractMethod<[
        _srcChainId: BigNumberish,
        _path: BytesLike,
        _payload: BytesLike
    ], [
        void
    ], "nonpayable">;
    send: TypedContractMethod<[
        _chainId: BigNumberish,
        _path: BytesLike,
        _payload: BytesLike,
        _refundAddress: AddressLike,
        _zroPaymentAddress: AddressLike,
        _adapterParams: BytesLike
    ], [
        void
    ], "payable">;
    setConfig: TypedContractMethod<[
        arg0: BigNumberish,
        arg1: BigNumberish,
        arg2: BigNumberish,
        arg3: BytesLike
    ], [
        void
    ], "nonpayable">;
    setDefaultAdapterParams: TypedContractMethod<[
        _adapterParams: BytesLike
    ], [
        void
    ], "nonpayable">;
    setDestLzEndpoint: TypedContractMethod<[
        destAddr: AddressLike,
        lzEndpointAddr: AddressLike
    ], [
        void
    ], "nonpayable">;
    setOracleFee: TypedContractMethod<[
        _oracleFee: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setProtocolFee: TypedContractMethod<[
        _zroFee: BigNumberish,
        _nativeBP: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setReceiveVersion: TypedContractMethod<[
        arg0: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setRelayerPrice: TypedContractMethod<[
        _dstPriceRatio: BigNumberish,
        _dstGasPriceInWei: BigNumberish,
        _dstNativeAmtCap: BigNumberish,
        _baseGas: BigNumberish,
        _gasPerByte: BigNumberish
    ], [
        void
    ], "nonpayable">;
    setSendVersion: TypedContractMethod<[
        arg0: BigNumberish
    ], [
        void
    ], "nonpayable">;
    storedPayload: TypedContractMethod<[
        arg0: BigNumberish,
        arg1: BytesLike
    ], [
        [
            bigint,
            string,
            string
        ] & {
            payloadLength: bigint;
            dstAddress: string;
            payloadHash: string;
        }
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "blockNextMsg"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "defaultAdapterParams"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "estimateFees"): TypedContractMethod<[
        _dstChainId: BigNumberish,
        _userApplication: AddressLike,
        _payload: BytesLike,
        _payInZRO: boolean,
        _adapterParams: BytesLike
    ], [
        [bigint, bigint] & {
            nativeFee: bigint;
            zroFee: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "forceResumeReceive"): TypedContractMethod<[
        _srcChainId: BigNumberish,
        _path: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "getChainId"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "getConfig"): TypedContractMethod<[
        arg0: BigNumberish,
        arg1: BigNumberish,
        arg2: AddressLike,
        arg3: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "getInboundNonce"): TypedContractMethod<[
        _chainID: BigNumberish,
        _path: BytesLike
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "getLengthOfQueue"): TypedContractMethod<[
        _srcChainId: BigNumberish,
        _srcAddress: BytesLike
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "getOutboundNonce"): TypedContractMethod<[
        _chainID: BigNumberish,
        _srcAddress: AddressLike
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "getReceiveLibraryAddress"): TypedContractMethod<[arg0: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "getReceiveVersion"): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "getSendLibraryAddress"): TypedContractMethod<[arg0: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "getSendVersion"): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "hasStoredPayload"): TypedContractMethod<[
        _srcChainId: BigNumberish,
        _path: BytesLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "inboundNonce"): TypedContractMethod<[
        arg0: BigNumberish,
        arg1: BytesLike
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "isReceivingPayload"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "isSendingPayload"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "lzEndpointLookup"): TypedContractMethod<[arg0: AddressLike], [string], "view">;
    getFunction(nameOrSignature: "mockChainId"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "msgsToDeliver"): TypedContractMethod<[
        arg0: BigNumberish,
        arg1: BytesLike,
        arg2: BigNumberish
    ], [
        [
            string,
            bigint,
            string
        ] & {
            dstAddress: string;
            nonce: bigint;
            payload: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "nextMsgBlocked"): TypedContractMethod<[], [boolean], "view">;
    getFunction(nameOrSignature: "oracleFee"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "outboundNonce"): TypedContractMethod<[
        arg0: BigNumberish,
        arg1: AddressLike
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "protocolFeeConfig"): TypedContractMethod<[
    ], [
        [bigint, bigint] & {
            zroFee: bigint;
            nativeBP: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "receivePayload"): TypedContractMethod<[
        _srcChainId: BigNumberish,
        _path: BytesLike,
        _dstAddress: AddressLike,
        _nonce: BigNumberish,
        _gasLimit: BigNumberish,
        _payload: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "relayerFeeConfig"): TypedContractMethod<[
    ], [
        [
            bigint,
            bigint,
            bigint,
            bigint,
            bigint
        ] & {
            dstPriceRatio: bigint;
            dstGasPriceInWei: bigint;
            dstNativeAmtCap: bigint;
            baseGas: bigint;
            gasPerByte: bigint;
        }
    ], "view">;
    getFunction(nameOrSignature: "retryPayload"): TypedContractMethod<[
        _srcChainId: BigNumberish,
        _path: BytesLike,
        _payload: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "send"): TypedContractMethod<[
        _chainId: BigNumberish,
        _path: BytesLike,
        _payload: BytesLike,
        _refundAddress: AddressLike,
        _zroPaymentAddress: AddressLike,
        _adapterParams: BytesLike
    ], [
        void
    ], "payable">;
    getFunction(nameOrSignature: "setConfig"): TypedContractMethod<[
        arg0: BigNumberish,
        arg1: BigNumberish,
        arg2: BigNumberish,
        arg3: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setDefaultAdapterParams"): TypedContractMethod<[_adapterParams: BytesLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "setDestLzEndpoint"): TypedContractMethod<[
        destAddr: AddressLike,
        lzEndpointAddr: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setOracleFee"): TypedContractMethod<[_oracleFee: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "setProtocolFee"): TypedContractMethod<[
        _zroFee: BigNumberish,
        _nativeBP: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setReceiveVersion"): TypedContractMethod<[arg0: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "setRelayerPrice"): TypedContractMethod<[
        _dstPriceRatio: BigNumberish,
        _dstGasPriceInWei: BigNumberish,
        _dstNativeAmtCap: BigNumberish,
        _baseGas: BigNumberish,
        _gasPerByte: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setSendVersion"): TypedContractMethod<[arg0: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "storedPayload"): TypedContractMethod<[
        arg0: BigNumberish,
        arg1: BytesLike
    ], [
        [
            bigint,
            string,
            string
        ] & {
            payloadLength: bigint;
            dstAddress: string;
            payloadHash: string;
        }
    ], "view">;
    getEvent(key: "PayloadCleared"): TypedContractEvent<PayloadClearedEvent.InputTuple, PayloadClearedEvent.OutputTuple, PayloadClearedEvent.OutputObject>;
    getEvent(key: "PayloadStored"): TypedContractEvent<PayloadStoredEvent.InputTuple, PayloadStoredEvent.OutputTuple, PayloadStoredEvent.OutputObject>;
    getEvent(key: "UaForceResumeReceive"): TypedContractEvent<UaForceResumeReceiveEvent.InputTuple, UaForceResumeReceiveEvent.OutputTuple, UaForceResumeReceiveEvent.OutputObject>;
    getEvent(key: "ValueTransferFailed"): TypedContractEvent<ValueTransferFailedEvent.InputTuple, ValueTransferFailedEvent.OutputTuple, ValueTransferFailedEvent.OutputObject>;
    filters: {
        "PayloadCleared(uint16,bytes,uint64,address)": TypedContractEvent<PayloadClearedEvent.InputTuple, PayloadClearedEvent.OutputTuple, PayloadClearedEvent.OutputObject>;
        PayloadCleared: TypedContractEvent<PayloadClearedEvent.InputTuple, PayloadClearedEvent.OutputTuple, PayloadClearedEvent.OutputObject>;
        "PayloadStored(uint16,bytes,address,uint64,bytes,bytes)": TypedContractEvent<PayloadStoredEvent.InputTuple, PayloadStoredEvent.OutputTuple, PayloadStoredEvent.OutputObject>;
        PayloadStored: TypedContractEvent<PayloadStoredEvent.InputTuple, PayloadStoredEvent.OutputTuple, PayloadStoredEvent.OutputObject>;
        "UaForceResumeReceive(uint16,bytes)": TypedContractEvent<UaForceResumeReceiveEvent.InputTuple, UaForceResumeReceiveEvent.OutputTuple, UaForceResumeReceiveEvent.OutputObject>;
        UaForceResumeReceive: TypedContractEvent<UaForceResumeReceiveEvent.InputTuple, UaForceResumeReceiveEvent.OutputTuple, UaForceResumeReceiveEvent.OutputObject>;
        "ValueTransferFailed(address,uint256)": TypedContractEvent<ValueTransferFailedEvent.InputTuple, ValueTransferFailedEvent.OutputTuple, ValueTransferFailedEvent.OutputObject>;
        ValueTransferFailed: TypedContractEvent<ValueTransferFailedEvent.InputTuple, ValueTransferFailedEvent.OutputTuple, ValueTransferFailedEvent.OutputObject>;
    };
}
