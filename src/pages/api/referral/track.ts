import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db';
import { referrals } from '@/server/schema';
import { eq } from 'drizzle-orm';
import type { ReferralEvent } from '@/lib/referral/tracking';

interface ReferralEventData {
  referrerId: string;
  event: ReferralEvent;
  accountId: string;
  timestamp?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { referrerId, event, accountId } = req.body as ReferralEventData;

  if (!referrerId || !event || !accountId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Find the referral relationship
    const referral = await db
      .select()
      .from(referrals)
      .where(eq(referrals.id, accountId))
      .limit(1);

    if (referral.length === 0) {
      return res.status(404).json({ error: 'Referral relationship not found' });
    }

    const currentReferral = referral[0];

    // Update milestone based on event
    const updates: Partial<typeof referrals.$inferInsert> = {};

    switch (event) {
      case 'accountCreated':
        updates.milestoneAccountCreated = true;
        break;
      case 'profileCompleted':
        updates.milestoneProfileCompleted = true;
        break;
      case 'appDownloaded':
        updates.milestoneAppDownloaded = true;
        break;
      case 'landClaimed':
        updates.milestoneLandClaimed = true;
        break;
    }

    // Update the referral milestone
    await db
      .update(referrals)
      .set(updates)
      .where(eq(referrals.id, accountId));

    // TODO: Calculate rewards based on event type
    // TODO: Update referrer's land allocation
    // TODO: Send notification if applicable

    return res.status(200).json({
      success: true,
      event,
      message: 'Referral event tracked',
    });
  } catch (error) {
    console.error('Error tracking referral event:', error);
    return res.status(500).json({
      error: 'Failed to track referral event',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

