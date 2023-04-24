import { BaseContract, providers } from "ethers";
import { TypedEvent } from "./types/typechain/common";
import { BaseProvider } from '@ethersproject/providers';
import { ClientBase, Pool } from "pg";
export type IndexerTask = (start: number, end: number) => Promise<void>;
export type IndexerEndCallback = (endBlock: number) => void | Promise<void>;
export type { AvailFilterKeys, GetFilter } from './types';
interface IndexSettings {
    checkpointInterval?: number;
    progressReportInterval?: number;
}
export declare function _index(provider: BaseProvider, startBlock: number, batchSize: number, task: IndexerTask, onEnd: IndexerEndCallback, settings?: IndexSettings): Promise<void>;
export interface IndexerSettings {
    startBlock?: number;
    minIndexableBlock?: number;
    updateLastIndexedBlock?: boolean;
    name?: string;
    batchSize?: number;
    checkpointInterval?: number;
    progressReportInterval?: number;
}
declare class InitialIndexStatus {
    private done;
    setDone: () => boolean;
    isDone: () => boolean;
}
type FiltersBase = {
    [name: string]: (event: TypedEvent, contractName: string) => void | Promise<void>;
};
declare abstract class IndexerBase<Filters> {
    abstract filters: Filters;
    abstract onIndexEnd: () => Promise<void>;
    abstract startEventListener?: () => void | Promise<void>;
    abstract clearState: () => void;
    abstract name: string;
}
export declare abstract class Indexer<Filters extends FiltersBase> extends IndexerBase<Filters> {
    static initialIndexStatus: InitialIndexStatus;
    private static client;
    private static connectProvider;
    private static inactivityMonitor;
    static setClient: (c: ClientBase | Pool) => void;
    static initialize: (settings: {
        client: ClientBase | Pool;
        connectProvider: () => providers.BaseProvider;
    }) => void;
    static getClient: () => ClientBase | Pool;
    static connectAndGetProvider: () => providers.BaseProvider;
    contracts: BaseContract[];
    settings?: IndexerSettings;
    constructor(contracts: BaseContract[], settings?: IndexerSettings);
    get client(): ClientBase | Pool;
    index(): Promise<void>;
    private getTask;
    getLastIndexedBlock: () => Promise<number>;
    updateLastIndexedBlock: (b: number) => Promise<void>;
    refreshLastUpdatedAt: () => Promise<void>;
}
type ListenerFiltersBase = {
    [k: string]: (args: any[], contractAddress: string) => void | Promise<void>;
};
export declare abstract class Listener<ListenerFilters extends ListenerFiltersBase> {
    abstract filters: ListenerFilters;
    start: (contracts: BaseContract[]) => void;
}
