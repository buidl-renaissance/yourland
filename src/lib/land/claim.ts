import type { EphemeralAccount } from '@/lib/ephemeral/account';
import { calculateLandAllocation } from './economy';

export interface LandClaim {
  accountId: string;
  amount: number;
  referrerBonus?: number;
  irlBonus?: number;
  tier: string;
  claimedAt: number;
  transactionHash?: string;
}

export interface PendingLandClaim {
  accountId: string;
  amount: number;
  referrerBonus?: number;
  createdAt: number;
}

export async function createPendingLandClaim(
  account: EphemeralAccount,
  referralCount: number = 0,
  irlEncounters: number = 0
): Promise<PendingLandClaim> {
  const allocation = calculateLandAllocation(referralCount, irlEncounters);
  
  // Calculate referrer bonus if applicable
  const referrerBonus = account.referrerId ? allocation.referral : undefined;

  return {
    accountId: account.id,
    amount: allocation.total,
    referrerBonus,
    createdAt: Date.now(),
  };
}

export async function processLandClaim(
  accountId: string,
  pendingClaim: PendingLandClaim
): Promise<LandClaim> {
  // In production, this would:
  // 1. Validate the claim
  // 2. Create on-chain transaction (NFT or token)
  // 3. Distribute referrer bonus
  // 4. Update account state
  // 5. Return transaction hash

  const allocation = calculateLandAllocation();
  
  return {
    accountId,
    amount: pendingClaim.amount,
    referrerBonus: pendingClaim.referrerBonus,
    tier: allocation.tier,
    claimedAt: Date.now(),
    // transactionHash: '0x...' // In production
  };
}

export async function validateLandClaim(
  accountId: string,
  deviceId: string
): Promise<boolean> {
  // Validate that the claim belongs to the device
  // In production, this would check against the database
  return true;
}

