import { sleep } from "./utils"
import { BaseContract, Provider, WebSocketProvider, } from "ethers";
import { ClientBase, Pool } from "pg";
import { ProgressReporter } from "./utils/ProgressReporter";
import { readFileSync } from 'fs'

export type IndexerTask = (start: number, end: number) => Promise<void>

export type IndexerEndCallback = (endBlock: number) => void | Promise<void>

export type { AvailFilterKeys, GetFilter } from './types'

interface IndexSettings {
  checkpointInterval?: number
  progressReportInterval?: number
}

export async function _index(provider: Provider | WebSocketProvider, startBlock: number, batchSize: number, task: IndexerTask, onEnd: IndexerEndCallback, settings?: IndexSettings) {
  let currentBlock = startBlock
  const progressReporter = new ProgressReporter(startBlock, await provider.getBlockNumber(), settings?.progressReportInterval ?? 500000)
  const checkpointInterval = settings?.checkpointInterval ?? 1000000
  let checkpoint = 0

  while (currentBlock < await provider.getBlockNumber()) {
    progressReporter.update(currentBlock)
    const start = currentBlock
    const end = Math.min(currentBlock + batchSize, await provider.getBlockNumber())
    await task(start, end)
    if (end >= checkpoint + checkpointInterval) {
      checkpoint = end
      await onEnd(end)
    }
    currentBlock = end + 1
  }
  progressReporter.update(currentBlock - 1)
  await onEnd(currentBlock - 1)
}

export interface IndexerSettings {
  startBlock?: number
  minIndexableBlock?: number
  updateLastIndexedBlock?: boolean
  name?: string
  batchSize?: number
  checkpointInterval?: number
  progressReportInterval?: number
  indexInterval: number
}


class InitialIndexStatus {
  private done: boolean = false
  setDone = () => this.done = true
  isDone = () => this.done === true
}

/**
 * Will exit the process unless periodic activity is detected
 */
class InactivityMonitor {
  errorTimeout: number
  lastUpdated = Number(new Date())
  intervalId: ReturnType<typeof setInterval> | null = null

  constructor(errorTimeout: number) {
    this.errorTimeout = errorTimeout
  }

  startMonitoring = () => {
    this.intervalId = setInterval(this.checkInactivity, this.errorTimeout)
  }

  stopMonitoring = () => {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  checkInactivity = () => {
    if (Number(new Date()) - this.lastUpdated > this.errorTimeout) {
      console.log("Inactivity detected, exiting")
      process.exit(0)
    }
  }

  logActivity = () => {
    this.lastUpdated = Number(new Date())
    if (this.intervalId === null) {
      this.startMonitoring()
    }
  }
}


//type FiltersBase = { [name: string]: (event: TypedEventLog, contractName: string) => void | Promise<void> }
abstract class IndexerBase<TypedContract extends BaseContract, EventLog, DbInputType> {
  abstract filterName: keyof TypedContract['filters']
  abstract processEvent: (e: EventLog) => DbInputType
  abstract store: (data: Array<DbInputType>) => Promise<void>
  // Will run at the end of each batch of blocks indexed 
  //abstract onIndexEnd: () => Promise<void>
  // An optional event listener which will start when previous blocks have been indexed
  //abstract startEventListener?: () => void | Promise<void>
  // Should be defined to clear any temporary data allocated when indexing a batch of blocks
  // abstract clearState: () => void

  // Unique name for the indexer
  abstract name: string
}

export abstract class Indexer<TypedContract extends BaseContract, EventLog, DbInputType = any> extends IndexerBase<TypedContract, EventLog, DbInputType> {
  static initialIndexStatus = new InitialIndexStatus()
  client: ClientBase | Pool
  getProvider: (() => Provider | WebSocketProvider)
  private static inactivityMonitor = new InactivityMonitor(1000 * 60 * 10)
  static initDb = async (client: ClientBase | Pool) => {
    // create indexer tables
    const create = readFileSync('node_modules/type-indexer/src/db/indexer_schema.sql', { encoding: 'utf-8' })
    await client.query(create)
  }

  contract: BaseContract
  settings?: IndexerSettings

  defaultIndexInterval = 30 * 1000

  constructor(contract: BaseContract, connectAndGetProvider: () => Provider | WebSocketProvider, client: ClientBase | Pool, settings?: IndexerSettings) {
    super()
    this.contract = contract
    this.settings = settings
    this.getProvider = connectAndGetProvider
    this.client = client
  }

  async index() {
    const address = await this.contract.getAddress()

    const onEnd = async (b: number) => {
      //await this.onIndexEnd()
      //this.clearState()
      if (this.settings?.updateLastIndexedBlock !== false) {
        await this.updateLastIndexedBlock(address, b)
        await this.refreshLastUpdatedAt(address)
      }
      Indexer.inactivityMonitor.logActivity()
    }
    let start = this.settings?.startBlock
    if (start === undefined) {
      //const last = await this.getLastIndexedBlock()
      start = await this.getLastIndexedBlock(address) + 1
      if (this.settings?.minIndexableBlock && (start || 0) < this.settings.minIndexableBlock) {
        start = this.settings.minIndexableBlock
      }
    }

    console.log(`\n${(this.name ?? 'Unnamed indexer') + ' ' + address}: indexing from block ${start}`)
    //console.log(await Promise.all(this.contracts.map(async x => `${(await x.getAddress()).substring(0, 8)}...`).join(', ')))

    const initialTask = this.getTask()
    await _index(this.getProvider(), start, this.settings?.batchSize ?? 50000, initialTask, onEnd, { checkpointInterval: this.settings?.checkpointInterval, progressReportInterval: this.settings?.progressReportInterval })

    //if (this.startEventListener) this.startEventListener()

    // Periodically index with query filter
    // Only the indexer should update last indexed block (not the listener)
    const indexPeriodically = async () => {
      const address = await this.contract.getAddress()
      while (true) {
        const startTs = Number(new Date())

        //await sleep(60 * 1000)
        if (!Indexer.initialIndexStatus.isDone()) {
          await sleep(this.settings?.indexInterval ?? this.defaultIndexInterval)
          continue
        }
        start = await this.getLastIndexedBlock(address)
        console.log(`\n${(this.name ?? 'Unnamed indexer') + ' ' + address}: indexing from block ${start}`)
        //console.log(await Promise.all(this.contracts.map(async x => `${(await x.getAddress()).substring(0, 8)}...`).join(', ')))
        const task = this.getTask()
        await _index(this.getProvider(), start, this.settings?.batchSize ?? 50000, task, onEnd, { checkpointInterval: this.settings?.checkpointInterval, progressReportInterval: this.settings?.progressReportInterval })

        const endTs = Number(new Date())
        const duration = endTs - startTs
        const wait = (this.settings?.indexInterval ?? this.defaultIndexInterval) - duration
        await sleep(wait)
      }
    }

    indexPeriodically()
  }

  private getTask = (): IndexerTask => async (start, end) => {
    try {
      // Reconnect to make sure the connection is alive
      const provider = this.getProvider()
      const contract = this.contract.connect({ provider })
      const filter = contract.filters[this.filterName as string]()
      const events = await contract.queryFilter(filter, start, end) as EventLog[]
      //console.log(c.address, events.length)
      const output = await Promise.all(
        events.map(e => this.processEvent(e))
      )

      await this.store(output)

      /*
      await Promise.all(
        Object.entries(this.filters).map(async ([filterKey, onEvent]) => {
          const filter = c.filters[filterKey]()
          type E = Parameters<typeof onEvent>[0]
          const events = await c.queryFilter(filter, start, end) as E[]
          //console.log(c.address, events.length)
          await Promise.all(
            events.map(e => onEvent(e, c.address))
          )
        })
      )
      */
    } catch (e) {
      console.log("Error on indexer task", this.name, e)
      throw e
    }
  }

  getIndexerId = (contractAddress: string) => this.name + contractAddress

  getLastIndexedBlock: (contractAddress: string) => Promise<number> = async (contractAddress) => {
    const q = await this.client.query(`
      SELECT * FROM last_indexed_blocks
      WHERE indexer_name = $1
    `, [this.getIndexerId(contractAddress)])

    if (q.rowCount === 0) return 0
    else return Number(q.rows[0].block)
  }

  updateLastIndexedBlock: (contractAddress: string, b: number) => Promise<void> = async (contractAddress, b) => {
    await this.client.query(`
      INSERT INTO
        last_indexed_blocks (indexer_name, block)
      VALUES ($1, $2)
      ON CONFLICT (indexer_name) DO UPDATE
      SET block = EXCLUDED.block
    `, [this.getIndexerId(contractAddress), b])
  }

  refreshLastUpdatedAt = async (contractName: string) => {
    await this.client.query(`
      INSERT INTO last_updated_at (id) VALUES ($1)
      ON CONFLICT (id) DO UPDATE SET ts = NOW()
    `, [this.name])
  }
}

type ListenerFiltersBase = {
  [k: string]: (args: any[], contractAddress: string) => void | Promise<void>
}


/*
export abstract class Listener<ListenerFilters extends ListenerFiltersBase> {
  abstract filters: ListenerFilters

  start = (contracts: BaseContract[]) => {
    contracts.forEach(c => {
      Object.entries(this.filters).forEach(([key, onEvent]) => {
        const filter = c.filters[key]()
        c.on(filter, (...args) => onEvent([...args], c.address))
      })
    })
  }
}
*/