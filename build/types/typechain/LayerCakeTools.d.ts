import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "./common";
export declare namespace LayerCakeExecutionProof {
    type OperationsStruct = {
        nonce: BigNumberish;
        amount: BigNumberish;
        fee: BigNumberish;
        sender: AddressLike;
        recipient: AddressLike;
        executionTime: BigNumberish;
        callDataGasLimit: BigNumberish;
        callData: BytesLike;
        cancel: boolean;
        cancellationFeeRefund: BigNumberish;
        negatedBandwidthProvider: AddressLike;
        initialNegation: boolean;
        invalidExecutionProofId: BytesLike;
    };
    type OperationsStructOutput = [
        nonce: bigint,
        amount: bigint,
        fee: bigint,
        sender: string,
        recipient: string,
        executionTime: bigint,
        callDataGasLimit: bigint,
        callData: string,
        cancel: boolean,
        cancellationFeeRefund: bigint,
        negatedBandwidthProvider: string,
        initialNegation: boolean,
        invalidExecutionProofId: string
    ] & {
        nonce: bigint;
        amount: bigint;
        fee: bigint;
        sender: string;
        recipient: string;
        executionTime: bigint;
        callDataGasLimit: bigint;
        callData: string;
        cancel: boolean;
        cancellationFeeRefund: bigint;
        negatedBandwidthProvider: string;
        initialNegation: boolean;
        invalidExecutionProofId: string;
    };
    type ExecutionProofStruct = {
        operations: LayerCakeExecutionProof.OperationsStruct;
        partialAmount: BigNumberish;
        v: BigNumberish;
        r: BytesLike;
        s: BytesLike;
    };
    type ExecutionProofStructOutput = [
        operations: LayerCakeExecutionProof.OperationsStructOutput,
        partialAmount: bigint,
        v: bigint,
        r: string,
        s: string
    ] & {
        operations: LayerCakeExecutionProof.OperationsStructOutput;
        partialAmount: bigint;
        v: bigint;
        r: string;
        s: string;
    };
}
export interface LayerCakeToolsInterface extends Interface {
    getFunction(nameOrSignature: "getExecutionId" | "getInvalidExecutionProofId" | "getPathwayId" | "recoverSigner"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "BandwidthChanged" | "OperationsExecuted" | "OperationsStored"): EventFragment;
    encodeFunctionData(functionFragment: "getExecutionId", values: [BytesLike, LayerCakeExecutionProof.OperationsStruct]): string;
    encodeFunctionData(functionFragment: "getInvalidExecutionProofId", values: [LayerCakeExecutionProof.ExecutionProofStruct]): string;
    encodeFunctionData(functionFragment: "getPathwayId", values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "recoverSigner", values: [BytesLike, LayerCakeExecutionProof.ExecutionProofStruct]): string;
    decodeFunctionResult(functionFragment: "getExecutionId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getInvalidExecutionProofId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPathwayId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "recoverSigner", data: BytesLike): Result;
}
export declare namespace BandwidthChangedEvent {
    type InputTuple = [
        bandwidthProvider: AddressLike,
        added: boolean,
        amount: BigNumberish
    ];
    type OutputTuple = [
        bandwidthProvider: string,
        added: boolean,
        amount: bigint
    ];
    interface OutputObject {
        bandwidthProvider: string;
        added: boolean;
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace OperationsExecutedEvent {
    type InputTuple = [
        executionId: BytesLike,
        bandwidthProvider: AddressLike,
        executionProof: LayerCakeExecutionProof.ExecutionProofStruct,
        executionPrepared: boolean
    ];
    type OutputTuple = [
        executionId: string,
        bandwidthProvider: string,
        executionProof: LayerCakeExecutionProof.ExecutionProofStructOutput,
        executionPrepared: boolean
    ];
    interface OutputObject {
        executionId: string;
        bandwidthProvider: string;
        executionProof: LayerCakeExecutionProof.ExecutionProofStructOutput;
        executionPrepared: boolean;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace OperationsStoredEvent {
    type InputTuple = [
        executionId: BytesLike,
        operations: LayerCakeExecutionProof.OperationsStruct
    ];
    type OutputTuple = [
        executionId: string,
        operations: LayerCakeExecutionProof.OperationsStructOutput
    ];
    interface OutputObject {
        executionId: string;
        operations: LayerCakeExecutionProof.OperationsStructOutput;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface LayerCakeTools extends BaseContract {
    connect(runner?: ContractRunner | null): LayerCakeTools;
    waitForDeployment(): Promise<this>;
    interface: LayerCakeToolsInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    getExecutionId: TypedContractMethod<[
        pathwayId: BytesLike,
        operations: LayerCakeExecutionProof.OperationsStruct
    ], [
        string
    ], "view">;
    getInvalidExecutionProofId: TypedContractMethod<[
        invalidExecutionProof: LayerCakeExecutionProof.ExecutionProofStruct
    ], [
        string
    ], "view">;
    getPathwayId: TypedContractMethod<[
        originChainId: BigNumberish,
        destinationChainId: BigNumberish,
        assetId: BigNumberish,
        contractId: BigNumberish
    ], [
        string
    ], "view">;
    recoverSigner: TypedContractMethod<[
        hash: BytesLike,
        executionProof: LayerCakeExecutionProof.ExecutionProofStruct
    ], [
        string
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "getExecutionId"): TypedContractMethod<[
        pathwayId: BytesLike,
        operations: LayerCakeExecutionProof.OperationsStruct
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "getInvalidExecutionProofId"): TypedContractMethod<[
        invalidExecutionProof: LayerCakeExecutionProof.ExecutionProofStruct
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "getPathwayId"): TypedContractMethod<[
        originChainId: BigNumberish,
        destinationChainId: BigNumberish,
        assetId: BigNumberish,
        contractId: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "recoverSigner"): TypedContractMethod<[
        hash: BytesLike,
        executionProof: LayerCakeExecutionProof.ExecutionProofStruct
    ], [
        string
    ], "view">;
    getEvent(key: "BandwidthChanged"): TypedContractEvent<BandwidthChangedEvent.InputTuple, BandwidthChangedEvent.OutputTuple, BandwidthChangedEvent.OutputObject>;
    getEvent(key: "OperationsExecuted"): TypedContractEvent<OperationsExecutedEvent.InputTuple, OperationsExecutedEvent.OutputTuple, OperationsExecutedEvent.OutputObject>;
    getEvent(key: "OperationsStored"): TypedContractEvent<OperationsStoredEvent.InputTuple, OperationsStoredEvent.OutputTuple, OperationsStoredEvent.OutputObject>;
    filters: {
        "BandwidthChanged(address,bool,uint256)": TypedContractEvent<BandwidthChangedEvent.InputTuple, BandwidthChangedEvent.OutputTuple, BandwidthChangedEvent.OutputObject>;
        BandwidthChanged: TypedContractEvent<BandwidthChangedEvent.InputTuple, BandwidthChangedEvent.OutputTuple, BandwidthChangedEvent.OutputObject>;
        "OperationsExecuted(bytes32,address,tuple,bool)": TypedContractEvent<OperationsExecutedEvent.InputTuple, OperationsExecutedEvent.OutputTuple, OperationsExecutedEvent.OutputObject>;
        OperationsExecuted: TypedContractEvent<OperationsExecutedEvent.InputTuple, OperationsExecutedEvent.OutputTuple, OperationsExecutedEvent.OutputObject>;
        "OperationsStored(bytes32,tuple)": TypedContractEvent<OperationsStoredEvent.InputTuple, OperationsStoredEvent.OutputTuple, OperationsStoredEvent.OutputObject>;
        OperationsStored: TypedContractEvent<OperationsStoredEvent.InputTuple, OperationsStoredEvent.OutputTuple, OperationsStoredEvent.OutputObject>;
    };
}
