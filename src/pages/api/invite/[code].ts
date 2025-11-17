import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db';
import { accounts } from '@/server/schema';
import { eq } from 'drizzle-orm';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.query;

  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Invalid invite code' });
  }

  // Parse the code (format: referrerId-realm-quest or just referrerId)
  const referrerId = code.split('-')[0];

  try {
    // Try to find account by ID first
    let referrerAccount = await db
      .select({
        displayName: accounts.displayName,
        referralCode: accounts.referralCode,
      })
      .from(accounts)
      .where(eq(accounts.id, referrerId))
      .limit(1);

    // If not found by ID, try by referral code
    if (referrerAccount.length === 0) {
      referrerAccount = await db
        .select({
          displayName: accounts.displayName,
          referralCode: accounts.referralCode,
        })
        .from(accounts)
        .where(eq(accounts.referralCode, referrerId))
        .limit(1);
    }

    if (referrerAccount.length === 0) {
      // Return a generic response if referrer not found
      return res.status(200).json({
        name: 'A YourLand user',
        referralCode: referrerId,
      });
    }

    return res.status(200).json({
      name: referrerAccount[0].displayName,
      referralCode: referrerAccount[0].referralCode || referrerId,
    });
  } catch (error) {
    console.error('Error fetching referrer info:', error);
    return res.status(200).json({
      name: 'A YourLand user',
      referralCode: referrerId,
    });
  }
}

