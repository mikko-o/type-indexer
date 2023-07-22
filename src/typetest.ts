
import { BaseContract, ethers } from 'ethers'
import { LayerCakeTools, LayerCakeTools__factory } from './types/typechain/index'
import { BandwidthChangedEvent } from './types/typechain/LayerCakeTools'
import { Indexer } from '.'
import format from 'pg-format'


class BandwidthChangedIndexer extends Indexer<LayerCakeTools, BandwidthChangedEvent.Log, readonly [boolean, bigint]> {
  name: 'BandwidthChanged' = 'BandwidthChanged'
  filterName: 'BandwidthChanged' = 'BandwidthChanged'

  processEvent = (e: BandwidthChangedEvent.Log, c: BaseContract) => {
    const { added, amount } = e.args
    return [added, amount] as const
  }

  store: (data: (readonly [boolean, bigint])[]) => Promise<void> = async (data) => {
    this.client.query(format('INSERT INTO bandwidth_changed (added, amount) VALUES %L', data))
  }
}