import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

const databasePath = process.env.DATABASE_URL || './data/yourland.db';

// Create database directory if it doesn't exist
import { mkdirSync } from 'fs';
import { dirname } from 'path';
try {
  mkdirSync(dirname(databasePath), { recursive: true });
} catch (error) {
  // Directory might already exist, ignore
}

const sqlite = new Database(databasePath);
sqlite.pragma('journal_mode = WAL');

export const db = drizzle(sqlite, { schema });

