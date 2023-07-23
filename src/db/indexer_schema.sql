CREATE TABLE IF NOT EXISTS last_indexed_blocks (
  indexer_name VARCHAR PRIMARY KEY,
  block BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS last_updated_at (
  id VARCHAR PRIMARY KEY,
  ts TIMESTAMP NOT NULL DEFAULT NOW()
);