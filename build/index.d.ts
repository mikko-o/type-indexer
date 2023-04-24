import { BaseContract, Provider } from "ethers";
import { ClientBase, Pool } from "pg";
export type IndexerTask = (start: number, end: number) => Promise<void>;
export type IndexerEndCallback = (endBlock: number) => void | Promise<void>;
export type { AvailFilterKeys, GetFilter } from './types';
interface IndexSettings {
    checkpointInterval?: number;
    progressReportInterval?: number;
}
export declare function _index(provider: Provider, startBlock: number, batchSize: number, task: IndexerTask, onEnd: IndexerEndCallback, settings?: IndexSettings): Promise<void>;
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
declare abstract class IndexerBase<TypedContract extends BaseContract, EventLog, DbInputType> {
    abstract filterName: keyof TypedContract['filters'];
    abstract processEvent: (e: EventLog, c: BaseContract) => DbInputType;
    abstract store: (data: Array<DbInputType>) => Promise<void>;
    abstract name: string;
}
export declare abstract class Indexer<TypedContract extends BaseContract, EventLog, DbInputType = any> extends IndexerBase<TypedContract, EventLog, DbInputType> {
    static initialIndexStatus: InitialIndexStatus;
    private static client;
    private static connectProvider;
    private static inactivityMonitor;
    static setClient: (c: ClientBase | Pool) => void;
    static initialize: (settings: {
        client: ClientBase | Pool;
        connectProvider: () => Provider;
    }) => Promise<void>;
    static getClient: () => ClientBase | Pool;
    static connectAndGetProvider: () => Provider;
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