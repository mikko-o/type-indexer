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
    indexInterval: number;
}
declare class InitialIndexStatus {
    private done;
    setDone: () => boolean;
    isDone: () => boolean;
}
declare abstract class IndexerBase<TypedContract extends BaseContract, EventLog, DbInputType> {
    abstract filterName: keyof TypedContract['filters'];
    abstract processEvent: (e: EventLog) => DbInputType;
    abstract store: (data: Array<DbInputType>) => Promise<void>;
    abstract name: string;
}
export declare abstract class Indexer<TypedContract extends BaseContract, EventLog, DbInputType = any> extends IndexerBase<TypedContract, EventLog, DbInputType> {
    static initialIndexStatus: InitialIndexStatus;
    client: ClientBase | Pool;
    getProvider: (() => Provider);
    private static inactivityMonitor;
    static initDb: (client: ClientBase | Pool) => Promise<void>;
    contract: BaseContract;
    settings?: IndexerSettings;
    defaultIndexInterval: number;
    constructor(contract: BaseContract, connectAndGetProvider: () => Provider, client: ClientBase | Pool, settings?: IndexerSettings);
    index(): Promise<void>;
    private getTask;
    getIndexerId: (contractAddress: string) => string;
    getLastIndexedBlock: (contractAddress: string) => Promise<number>;
    updateLastIndexedBlock: (contractAddress: string, b: number) => Promise<void>;
    refreshLastUpdatedAt: (contractName: string) => Promise<void>;
}
