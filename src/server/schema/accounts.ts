import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const accounts = sqliteTable('accounts', {
  id: text('id').primaryKey(),
  displayName: text('display_name').notNull(),
  email: text('email'),
  deviceId: text('device_id').notNull(),
  referrerId: text('referrer_id'),
  referralCode: text('referral_code'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  xp: integer('xp').default(0).notNull(),
  reputation: integer('reputation').default(0).notNull(),
  profileCompleted: integer('profile_completed', { mode: 'boolean' }).default(false).notNull(),
  appDownloaded: integer('app_downloaded', { mode: 'boolean' }).default(false).notNull(),
  landClaimed: integer('land_claimed', { mode: 'boolean' }).default(false).notNull(),
  realm: text('realm'),
  questType: text('quest_type'),
  // Pending land claim fields (stored as JSON or separate fields)
  pendingLandAmount: real('pending_land_amount'),
  pendingLandReferrerBonus: real('pending_land_referrer_bonus'),
  pendingLandCreatedAt: integer('pending_land_created_at', { mode: 'timestamp' }),
  // ENS and Ethereum address fields
  ensDomain: text('ens_domain'),
  ethereumAddress: text('ethereum_address'),
});

