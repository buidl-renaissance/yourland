import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from './db';
import Database from 'better-sqlite3';

const databasePath = process.env.DATABASE_URL || './data/yourland.db';
const sqlite = new Database(databasePath);

// Run migrations
migrate(db, { migrationsFolder: './drizzle' });

console.log('Migrations completed!');
sqlite.close();

