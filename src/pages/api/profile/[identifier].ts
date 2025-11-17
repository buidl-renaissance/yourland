import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/server/db';
import { accounts, referrals, landClaims } from '@/server/schema';
import { eq, or } from 'drizzle-orm';
import { resolveIdentifier, normalizeAddress, getENSMetadata, getAddressMetadata } from '@/server/lib/ens';
import type { ENSMetadata } from '@/server/lib/ens';

interface ProfileData {
  account: {
    id: string;
    displayName: string;
    email?: string;
    ensDomain?: string;
    ethereumAddress?: string;
    xp: number;
    reputation: number;
    profileCompleted: boolean;
    appDownloaded: boolean;
    landClaimed: boolean;
    realm?: string;
    questType?: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  blockchain: {
    address: string | null;
    ensDomain: string | null;
    metadata: ENSMetadata;
  };
  stats: {
    referralCount: number;
    landClaimCount: number;
    totalLandAmount: number;
  };
  landClaims: Array<{
    id: string;
    amount: number;
    tier: string;
    claimedAt: Date;
  }>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileData | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { identifier } = req.query;

  if (!identifier || typeof identifier !== 'string') {
    return res.status(400).json({ error: 'Invalid identifier' });
  }

  try {
    // Resolve identifier (ENS or address) to address
    const { address, ensDomain } = await resolveIdentifier(identifier);

    if (!address) {
      return res.status(404).json({ error: 'Could not resolve identifier to Ethereum address' });
    }

    const normalizedAddress = normalizeAddress(address);

    // Fetch ENS metadata
    let ensMetadata: ENSMetadata = {};
    if (ensDomain) {
      ensMetadata = await getENSMetadata(ensDomain);
    } else {
      // Try to get metadata via reverse resolution
      const addressMetadata = await getAddressMetadata(normalizedAddress);
      if (addressMetadata.ensDomain) {
        ensMetadata = addressMetadata.metadata;
      }
    }

    // Lookup account in database by address or ENS domain
    let account = await db
      .select()
      .from(accounts)
      .where(
        or(
          eq(accounts.ethereumAddress, normalizedAddress),
          eq(accounts.ensDomain, identifier.toLowerCase())
        )
      )
      .limit(1);

    // If not found by address, try by the resolved ENS domain
    if (account.length === 0 && ensDomain) {
      account = await db
        .select()
        .from(accounts)
        .where(eq(accounts.ensDomain, ensDomain.toLowerCase()))
        .limit(1);
    }

    const accountData = account.length > 0 ? account[0] : null;

    // Get referral count (accounts referred by this account)
    let referralCount = 0;
    if (accountData) {
      const referralRelationships = await db
        .select()
        .from(referrals)
        .where(eq(referrals.referrerId, accountData.id));
      referralCount = referralRelationships.length;
    }

    // Get land claims
    let landClaimCount = 0;
    let totalLandAmount = 0;
    let landClaimsData: Array<{
      id: string;
      amount: number;
      tier: string;
      claimedAt: Date;
    }> = [];

    if (accountData) {
      const claims = await db
        .select()
        .from(landClaims)
        .where(eq(landClaims.accountId, accountData.id));
      
      landClaimCount = claims.length;
      totalLandAmount = claims.reduce((sum, claim) => sum + (claim.amount || 0), 0);
      landClaimsData = claims.map(claim => ({
        id: claim.id,
        amount: claim.amount || 0,
        tier: claim.tier,
        claimedAt: claim.claimedAt,
      }));
    }

    // Return combined profile data
    return res.status(200).json({
      account: accountData ? {
        id: accountData.id,
        displayName: accountData.displayName,
        email: accountData.email || undefined,
        ensDomain: accountData.ensDomain || undefined,
        ethereumAddress: accountData.ethereumAddress || undefined,
        xp: accountData.xp,
        reputation: accountData.reputation,
        profileCompleted: Boolean(accountData.profileCompleted),
        appDownloaded: Boolean(accountData.appDownloaded),
        landClaimed: Boolean(accountData.landClaimed),
        realm: accountData.realm || undefined,
        questType: accountData.questType || undefined,
        createdAt: accountData.createdAt,
        updatedAt: accountData.updatedAt,
      } : null,
      blockchain: {
        address: normalizedAddress,
        ensDomain: ensDomain || accountData?.ensDomain || null,
        metadata: ensMetadata,
      },
      stats: {
        referralCount,
        landClaimCount,
        totalLandAmount,
      },
      landClaims: landClaimsData,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({
      error: 'Failed to fetch profile',
    });
  }
}

