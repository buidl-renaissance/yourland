import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db';
import { accounts } from '@/server/schema';
import { eq } from 'drizzle-orm';
import { resolveIdentifier, normalizeAddress, isValidAddress } from '@/server/lib/ens';

/**
 * Link ENS domain or Ethereum address to an existing account
 * For now, this is a simple endpoint that allows linking without signature verification
 * In production, you should add signature verification or wallet connection
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { accountId, identifier, signature } = req.body;

  if (!accountId || !identifier) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Resolve identifier to address
    const { address, ensDomain } = await resolveIdentifier(identifier);

    if (!address) {
      return res.status(400).json({ error: 'Could not resolve identifier to Ethereum address' });
    }

    const normalizedAddress = normalizeAddress(address);

    // TODO: Verify signature if provided
    // if (signature) {
    //   const message = `Link ${identifier} to account ${accountId}`;
    //   const recoveredAddress = ethers.utils.verifyMessage(message, signature);
    //   if (recoveredAddress.toLowerCase() !== normalizedAddress.toLowerCase()) {
    //     return res.status(401).json({ error: 'Invalid signature' });
    //   }
    // }

    // Check if account exists
    const existingAccount = await db
      .select()
      .from(accounts)
      .where(eq(accounts.id, accountId))
      .limit(1);

    if (existingAccount.length === 0) {
      return res.status(404).json({ error: 'Account not found' });
    }

    // Check if address/ENS is already linked to another account
    const existingLink = await db
      .select()
      .from(accounts)
      .where(
        eq(accounts.ethereumAddress, normalizedAddress)
      )
      .limit(1);

    if (existingLink.length > 0 && existingLink[0].id !== accountId) {
      return res.status(409).json({ error: 'Address already linked to another account' });
    }

    // Update account with ENS/address
    await db
      .update(accounts)
      .set({
        ethereumAddress: normalizedAddress,
        ensDomain: ensDomain || (isValidAddress(identifier) ? null : identifier.toLowerCase()),
        updatedAt: new Date(),
      })
      .where(eq(accounts.id, accountId));

    return res.status(200).json({
      success: true,
      accountId,
      ethereumAddress: normalizedAddress,
      ensDomain: ensDomain || null,
      message: 'Account linked successfully',
    });
  } catch (error) {
    console.error('Error linking account:', error);
    return res.status(500).json({
      error: 'Failed to link account',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}


