import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const landClaims = sqliteTable('land_claims', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  amount: real('amount').notNull(),
  referrerBonus: real('referrer_bonus'),
  irlBonus: real('irl_bonus'),
  tier: text('tier').notNull(),
  claimedAt: integer('claimed_at', { mode: 'timestamp' }).notNull(),
  transactionHash: text('transaction_hash'),
});

