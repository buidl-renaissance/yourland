import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db';
import { accounts, landClaims } from '@/server/schema';
import { eq } from 'drizzle-orm';

// This endpoint handles merging ephemeral account to permanent account
// Called when user opens the app after downloading

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ephemeralAccountId, permanentAccountId, deviceId } = req.body;

  if (!ephemeralAccountId || !permanentAccountId || !deviceId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1. Validate the ephemeral account exists
    const ephemeralAccount = await db
      .select()
      .from(accounts)
      .where(eq(accounts.id, ephemeralAccountId))
      .limit(1);

    if (ephemeralAccount.length === 0) {
      return res.status(404).json({ error: 'Ephemeral account not found' });
    }

    const account = ephemeralAccount[0];

    // 2. Create new permanent account record (can't update primary key)
    // First, check if permanent account already exists
    let existingPermanent = await db
      .select()
      .from(accounts)
      .where(eq(accounts.id, permanentAccountId))
      .limit(1);

    if (existingPermanent.length === 0) {
      // Insert new permanent account with merged data
      await db.insert(accounts).values({
        id: permanentAccountId,
        displayName: account.displayName,
        email: account.email,
        deviceId: account.deviceId,
        referrerId: account.referrerId,
        referralCode: account.referralCode,
        createdAt: account.createdAt,
        updatedAt: new Date(),
        xp: account.xp,
        reputation: account.reputation,
        profileCompleted: account.profileCompleted,
        appDownloaded: true,
        landClaimed: account.landClaimed,
        realm: account.realm,
        questType: account.questType,
        pendingLandAmount: account.pendingLandAmount,
        pendingLandReferrerBonus: account.pendingLandReferrerBonus,
        pendingLandCreatedAt: account.pendingLandCreatedAt,
      });
    } else {
      // Update existing permanent account
      await db
        .update(accounts)
        .set({
          appDownloaded: true,
          updatedAt: new Date(),
          // Merge other fields if needed
        })
        .where(eq(accounts.id, permanentAccountId));
    }

    // 3. Process pending land claim if exists
    const accountToUse = existingPermanent.length > 0 ? existingPermanent[0] : account;
    if (accountToUse.pendingLandAmount) {
      // TODO: Create on-chain transaction (NFT or token)
      // For now, create a land claim record
      await db.insert(landClaims).values({
        id: `${permanentAccountId}-${Date.now()}`,
        accountId: permanentAccountId,
        amount: accountToUse.pendingLandAmount,
        referrerBonus: accountToUse.pendingLandReferrerBonus || null,
        tier: 'starter', // Default tier, should be calculated
        claimedAt: new Date(),
      });

      // Clear pending land claim
      await db
        .update(accounts)
        .set({
          pendingLandAmount: null,
          pendingLandReferrerBonus: null,
          pendingLandCreatedAt: null,
          landClaimed: true,
        })
        .where(eq(accounts.id, permanentAccountId));
    }

    // 4. TODO: Distribute referrer bonuses
    // 5. Account is now marked as merged (via appDownloaded flag and permanentAccountId)

    return res.status(200).json({
      success: true,
      permanentAccountId,
      merged: true,
      message: 'Account merged successfully',
    });
  } catch (error) {
    console.error('Error merging account:', error);
    return res.status(500).json({
      error: 'Failed to merge account',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

