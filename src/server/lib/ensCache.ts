// Optional: Database-backed ENS cache
// For now, using in-memory cache in ens.ts
// This file can be extended to use database for persistent caching

import { db } from '../db';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Optional: Create a cache table for ENS resolutions
// Uncomment if you want persistent caching across server restarts
/*
export const ensCacheTable = sqliteTable('ens_cache', {
  key: text('key').primaryKey(),
  value: text('value'),
  timestamp: integer('timestamp', { mode: 'timestamp' }).notNull(),
});

// For now, using in-memory cache in ens.ts
// This can be extended to use the database table above
*/


