import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const referrals = sqliteTable('referrals', {
  id: text('id').primaryKey(),
  referrerId: text('referrer_id').notNull(),
  referredAt: integer('referred_at', { mode: 'timestamp' }).notNull(),
  // Milestone flags
  milestoneAccountCreated: integer('milestone_account_created', { mode: 'boolean' }).default(true).notNull(),
  milestoneProfileCompleted: integer('milestone_profile_completed', { mode: 'boolean' }).default(false).notNull(),
  milestoneAppDownloaded: integer('milestone_app_downloaded', { mode: 'boolean' }).default(false).notNull(),
  milestoneLandClaimed: integer('milestone_land_claimed', { mode: 'boolean' }).default(false).notNull(),
});

