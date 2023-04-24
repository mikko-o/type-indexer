import { readFileSync } from 'fs'
import { Indexer } from '../..'

const create = readFileSync('src/db/schema.sql', { encoding: 'utf-8' })

async function main() {
  const client = Indexer.getClient()
  console.log(await client.query(create))
}
main()
  .then(() => process.exit(0))