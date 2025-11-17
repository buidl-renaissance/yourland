import type { ReferralEvent } from '@/pages/api/referral/track';

export interface ReferralReward {
  event: ReferralEvent;
  landAmount: number;
  xp: number;
}

// Land rewards for each referral milestone
export const REFERRAL_REWARDS: Record<ReferralEvent, ReferralReward> = {
  accountCreated: {
    event: 'accountCreated',
    landAmount: 10,
    xp: 50,
  },
  profileCompleted: {
    event: 'profileCompleted',
    landAmount: 25,
    xp: 100,
  },
  appDownloaded: {
    event: 'appDownloaded',
    landAmount: 50,
    xp: 200,
  },
  landClaimed: {
    event: 'landClaimed',
    landAmount: 100,
    xp: 500,
  },
};

export async function trackReferralEvent(
  referrerId: string,
  event: ReferralEvent,
  accountId: string
): Promise<void> {
  try {
    const response = await fetch('/api/referral/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        referrerId,
        event,
        accountId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to track referral event');
    }
  } catch (error) {
    console.error('Error tracking referral event:', error);
    // Don't throw - referral tracking shouldn't block user flow
  }
}

export function getReferralReward(event: ReferralEvent): ReferralReward {
  return REFERRAL_REWARDS[event];
}

export function calculateTotalReferralRewards(events: ReferralEvent[]): {
  totalLand: number;
  totalXP: number;
} {
  return events.reduce(
    (acc, event) => {
      const reward = getReferralReward(event);
      return {
        totalLand: acc.totalLand + reward.landAmount,
        totalXP: acc.totalXP + reward.xp,
      };
    },
    { totalLand: 0, totalXP: 0 }
  );
}

