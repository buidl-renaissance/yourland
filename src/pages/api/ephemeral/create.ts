import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db';
import { accounts, referrals } from '@/server/schema';
import { eq } from 'drizzle-orm';

// This endpoint syncs ephemeral accounts created client-side to the server database
// The actual account creation happens client-side via IndexedDB
// This endpoint stores the account in the server database for referral tracking

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    accountId,
    displayName,
    email,
    referrerId,
    deviceId,
    referralCode,
    realm,
    questType,
    createdAt,
    updatedAt,
  } = req.body;

  if (!accountId || !displayName || !deviceId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if account already exists
    const existing = await db
      .select()
      .from(accounts)
      .where(eq(accounts.id, accountId))
      .limit(1);

    if (existing.length > 0) {
      return res.status(200).json({
        success: true,
        accountId,
        message: 'Account already exists',
      });
    }

    // Insert account
    await db.insert(accounts).values({
      id: accountId,
      displayName,
      email: email || null,
      deviceId,
      referrerId: referrerId || null,
      referralCode: referralCode || null,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
      updatedAt: updatedAt ? new Date(updatedAt) : new Date(),
      xp: 0,
      reputation: 0,
      profileCompleted: false,
      appDownloaded: false,
      landClaimed: false,
      realm: realm || null,
      questType: questType || null,
    });

    // Create referral relationship if referrer exists
    if (referrerId) {
      await db.insert(referrals).values({
        id: accountId, // Use account ID as the referral relationship ID
        referrerId,
        referredAt: new Date(),
        milestoneAccountCreated: true,
        milestoneProfileCompleted: false,
        milestoneAppDownloaded: false,
        milestoneLandClaimed: false,
      });
    }

    return res.status(200).json({
      success: true,
      accountId,
      message: 'Ephemeral account synced',
    });
  } catch (error) {
    console.error('Error syncing ephemeral account:', error);
    return res.status(500).json({
      error: 'Failed to sync account',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

