import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../typechain/common";
export interface IFtsoInterface extends utils.Interface {
    functions: {
        "active()": FunctionFragment;
        "getCurrentEpochId()": FunctionFragment;
        "getCurrentPrice()": FunctionFragment;
        "getCurrentRandom()": FunctionFragment;
        "getEpochId(uint256)": FunctionFragment;
        "getEpochPrice(uint256)": FunctionFragment;
        "getEpochPriceForVoter(uint256,address)": FunctionFragment;
        "getPriceEpochConfiguration()": FunctionFragment;
        "getPriceEpochData()": FunctionFragment;
        "getRandom(uint256)": FunctionFragment;
        "symbol()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "active" | "getCurrentEpochId" | "getCurrentPrice" | "getCurrentRandom" | "getEpochId" | "getEpochPrice" | "getEpochPriceForVoter" | "getPriceEpochConfiguration" | "getPriceEpochData" | "getRandom" | "symbol"): FunctionFragment;
    encodeFunctionData(functionFragment: "active", values?: undefined): string;
    encodeFunctionData(functionFragment: "getCurrentEpochId", values?: undefined): string;
    encodeFunctionData(functionFragment: "getCurrentPrice", values?: undefined): string;
    encodeFunctionData(functionFragment: "getCurrentRandom", values?: undefined): string;
    encodeFunctionData(functionFragment: "getEpochId", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getEpochPrice", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getEpochPriceForVoter", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "getPriceEpochConfiguration", values?: undefined): string;
    encodeFunctionData(functionFragment: "getPriceEpochData", values?: undefined): string;
    encodeFunctionData(functionFragment: "getRandom", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    decodeFunctionResult(functionFragment: "active", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCurrentEpochId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCurrentPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCurrentRandom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getEpochId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getEpochPrice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getEpochPriceForVoter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPriceEpochConfiguration", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPriceEpochData", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRandom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    events: {
        "LowTurnout(uint256,uint256,uint256,uint256)": EventFragment;
        "PriceEpochInitializedOnFtso(uint256,uint256,uint256)": EventFragment;
        "PriceFinalized(uint256,uint256,bool,uint256,uint256,uint8,uint256)": EventFragment;
        "PriceHashSubmitted(address,uint256,bytes32,uint256)": EventFragment;
        "PriceRevealed(address,uint256,uint256,uint256,uint256,uint256,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "LowTurnout"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PriceEpochInitializedOnFtso"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PriceFinalized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PriceHashSubmitted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "PriceRevealed"): EventFragment;
}
export interface LowTurnoutEventObject {
    epochId: BigNumber;
    natTurnout: BigNumber;
    lowNatTurnoutThresholdBIPS: BigNumber;
    timestamp: BigNumber;
}
export type LowTurnoutEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
], LowTurnoutEventObject>;
export type LowTurnoutEventFilter = TypedEventFilter<LowTurnoutEvent>;
export interface PriceEpochInitializedOnFtsoEventObject {
    epochId: BigNumber;
    endTime: BigNumber;
    timestamp: BigNumber;
}
export type PriceEpochInitializedOnFtsoEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    BigNumber
], PriceEpochInitializedOnFtsoEventObject>;
export type PriceEpochInitializedOnFtsoEventFilter = TypedEventFilter<PriceEpochInitializedOnFtsoEvent>;
export interface PriceFinalizedEventObject {
    epochId: BigNumber;
    price: BigNumber;
    rewardedFtso: boolean;
    lowRewardPrice: BigNumber;
    highRewardPrice: BigNumber;
    finalizationType: number;
    timestamp: BigNumber;
}
export type PriceFinalizedEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    boolean,
    BigNumber,
    BigNumber,
    number,
    BigNumber
], PriceFinalizedEventObject>;
export type PriceFinalizedEventFilter = TypedEventFilter<PriceFinalizedEvent>;
export interface PriceHashSubmittedEventObject {
    submitter: string;
    epochId: BigNumber;
    hash: string;
    timestamp: BigNumber;
}
export type PriceHashSubmittedEvent = TypedEvent<[
    string,
    BigNumber,
    string,
    BigNumber
], PriceHashSubmittedEventObject>;
export type PriceHashSubmittedEventFilter = TypedEventFilter<PriceHashSubmittedEvent>;
export interface PriceRevealedEventObject {
    voter: string;
    epochId: BigNumber;
    price: BigNumber;
    random: BigNumber;
    timestamp: BigNumber;
    votePowerNat: BigNumber;
    votePowerAsset: BigNumber;
}
export type PriceRevealedEvent = TypedEvent<[
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
], PriceRevealedEventObject>;
export type PriceRevealedEventFilter = TypedEventFilter<PriceRevealedEvent>;
export interface IFtso extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IFtsoInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        active(overrides?: CallOverrides): Promise<[boolean]>;
        getCurrentEpochId(overrides?: CallOverrides): Promise<[BigNumber]>;
        getCurrentPrice(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            _price: BigNumber;
            _timestamp: BigNumber;
        }>;
        getCurrentRandom(overrides?: CallOverrides): Promise<[BigNumber]>;
        getEpochId(_timestamp: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        getEpochPrice(_epochId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        getEpochPriceForVoter(_epochId: PromiseOrValue<BigNumberish>, _voter: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        getPriceEpochConfiguration(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            _firstEpochStartTime: BigNumber;
            _submitPeriod: BigNumber;
            _revealPeriod: BigNumber;
        }>;
        getPriceEpochData(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            boolean
        ] & {
            _epochId: BigNumber;
            _epochSubmitEndTime: BigNumber;
            _epochRevealEndTime: BigNumber;
            _votePowerBlock: BigNumber;
            _fallbackMode: boolean;
        }>;
        getRandom(_epochId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        symbol(overrides?: CallOverrides): Promise<[string]>;
    };
    active(overrides?: CallOverrides): Promise<boolean>;
    getCurrentEpochId(overrides?: CallOverrides): Promise<BigNumber>;
    getCurrentPrice(overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber
    ] & {
        _price: BigNumber;
        _timestamp: BigNumber;
    }>;
    getCurrentRandom(overrides?: CallOverrides): Promise<BigNumber>;
    getEpochId(_timestamp: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    getEpochPrice(_epochId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    getEpochPriceForVoter(_epochId: PromiseOrValue<BigNumberish>, _voter: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    getPriceEpochConfiguration(overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        _firstEpochStartTime: BigNumber;
        _submitPeriod: BigNumber;
        _revealPeriod: BigNumber;
    }>;
    getPriceEpochData(overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean
    ] & {
        _epochId: BigNumber;
        _epochSubmitEndTime: BigNumber;
        _epochRevealEndTime: BigNumber;
        _votePowerBlock: BigNumber;
        _fallbackMode: boolean;
    }>;
    getRandom(_epochId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    symbol(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        active(overrides?: CallOverrides): Promise<boolean>;
        getCurrentEpochId(overrides?: CallOverrides): Promise<BigNumber>;
        getCurrentPrice(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            _price: BigNumber;
            _timestamp: BigNumber;
        }>;
        getCurrentRandom(overrides?: CallOverrides): Promise<BigNumber>;
        getEpochId(_timestamp: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getEpochPrice(_epochId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getEpochPriceForVoter(_epochId: PromiseOrValue<BigNumberish>, _voter: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        getPriceEpochConfiguration(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            _firstEpochStartTime: BigNumber;
            _submitPeriod: BigNumber;
            _revealPeriod: BigNumber;
        }>;
        getPriceEpochData(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            boolean
        ] & {
            _epochId: BigNumber;
            _epochSubmitEndTime: BigNumber;
            _epochRevealEndTime: BigNumber;
            _votePowerBlock: BigNumber;
            _fallbackMode: boolean;
        }>;
        getRandom(_epochId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        symbol(overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "LowTurnout(uint256,uint256,uint256,uint256)"(epochId?: PromiseOrValue<BigNumberish> | null, natTurnout?: null, lowNatTurnoutThresholdBIPS?: null, timestamp?: null): LowTurnoutEventFilter;
        LowTurnout(epochId?: PromiseOrValue<BigNumberish> | null, natTurnout?: null, lowNatTurnoutThresholdBIPS?: null, timestamp?: null): LowTurnoutEventFilter;
        "PriceEpochInitializedOnFtso(uint256,uint256,uint256)"(epochId?: PromiseOrValue<BigNumberish> | null, endTime?: null, timestamp?: null): PriceEpochInitializedOnFtsoEventFilter;
        PriceEpochInitializedOnFtso(epochId?: PromiseOrValue<BigNumberish> | null, endTime?: null, timestamp?: null): PriceEpochInitializedOnFtsoEventFilter;
        "PriceFinalized(uint256,uint256,bool,uint256,uint256,uint8,uint256)"(epochId?: PromiseOrValue<BigNumberish> | null, price?: null, rewardedFtso?: null, lowRewardPrice?: null, highRewardPrice?: null, finalizationType?: null, timestamp?: null): PriceFinalizedEventFilter;
        PriceFinalized(epochId?: PromiseOrValue<BigNumberish> | null, price?: null, rewardedFtso?: null, lowRewardPrice?: null, highRewardPrice?: null, finalizationType?: null, timestamp?: null): PriceFinalizedEventFilter;
        "PriceHashSubmitted(address,uint256,bytes32,uint256)"(submitter?: PromiseOrValue<string> | null, epochId?: PromiseOrValue<BigNumberish> | null, hash?: null, timestamp?: null): PriceHashSubmittedEventFilter;
        PriceHashSubmitted(submitter?: PromiseOrValue<string> | null, epochId?: PromiseOrValue<BigNumberish> | null, hash?: null, timestamp?: null): PriceHashSubmittedEventFilter;
        "PriceRevealed(address,uint256,uint256,uint256,uint256,uint256,uint256)"(voter?: PromiseOrValue<string> | null, epochId?: PromiseOrValue<BigNumberish> | null, price?: null, random?: null, timestamp?: null, votePowerNat?: null, votePowerAsset?: null): PriceRevealedEventFilter;
        PriceRevealed(voter?: PromiseOrValue<string> | null, epochId?: PromiseOrValue<BigNumberish> | null, price?: null, random?: null, timestamp?: null, votePowerNat?: null, votePowerAsset?: null): PriceRevealedEventFilter;
    };
    estimateGas: {
        active(overrides?: CallOverrides): Promise<BigNumber>;
        getCurrentEpochId(overrides?: CallOverrides): Promise<BigNumber>;
        getCurrentPrice(overrides?: CallOverrides): Promise<BigNumber>;
        getCurrentRandom(overrides?: CallOverrides): Promise<BigNumber>;
        getEpochId(_timestamp: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getEpochPrice(_epochId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getEpochPriceForVoter(_epochId: PromiseOrValue<BigNumberish>, _voter: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        getPriceEpochConfiguration(overrides?: CallOverrides): Promise<BigNumber>;
        getPriceEpochData(overrides?: CallOverrides): Promise<BigNumber>;
        getRandom(_epochId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        symbol(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        active(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getCurrentEpochId(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getCurrentPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getCurrentRandom(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getEpochId(_timestamp: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getEpochPrice(_epochId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getEpochPriceForVoter(_epochId: PromiseOrValue<BigNumberish>, _voter: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPriceEpochConfiguration(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPriceEpochData(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRandom(_epochId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
