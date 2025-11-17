CREATE TABLE `accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`display_name` text NOT NULL,
	`email` text,
	`device_id` text NOT NULL,
	`referrer_id` text,
	`referral_code` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`xp` integer DEFAULT 0 NOT NULL,
	`reputation` integer DEFAULT 0 NOT NULL,
	`profile_completed` integer DEFAULT false NOT NULL,
	`app_downloaded` integer DEFAULT false NOT NULL,
	`land_claimed` integer DEFAULT false NOT NULL,
	`realm` text,
	`quest_type` text,
	`pending_land_amount` real,
	`pending_land_referrer_bonus` real,
	`pending_land_created_at` integer
);
--> statement-breakpoint
CREATE TABLE `referrals` (
	`id` text PRIMARY KEY NOT NULL,
	`referrer_id` text NOT NULL,
	`referred_at` integer NOT NULL,
	`milestone_account_created` integer DEFAULT true NOT NULL,
	`milestone_profile_completed` integer DEFAULT false NOT NULL,
	`milestone_app_downloaded` integer DEFAULT false NOT NULL,
	`milestone_land_claimed` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `land_claims` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`amount` real NOT NULL,
	`referrer_bonus` real,
	`irl_bonus` real,
	`tier` text NOT NULL,
	`claimed_at` integer NOT NULL,
	`transaction_hash` text
);
