// Land Economy Rules

export const LAND_ECONOMY = {
  // Base land allocation when user first installs app
  BASE_LAND_ALLOCATION: 100,

  // Referral bonuses (per milestone)
  REFERRAL_BONUSES: {
    accountCreated: 10,
    profileCompleted: 25,
    appDownloaded: 50,
    landClaimed: 100,
  },

  // IRL Bluetooth encounter bonus
  IRL_ENCOUNTER_BONUS: 15,

  // Land tiers and rarity
  TIERS: {
    COMMON: {
      name: 'Common',
      multiplier: 1,
      color: '#8BA888',
    },
    UNCOMMON: {
      name: 'Uncommon',
      multiplier: 1.5,
      color: '#60efff',
    },
    RARE: {
      name: 'Rare',
      multiplier: 2,
      color: '#00ff87',
    },
    EPIC: {
      name: 'Epic',
      multiplier: 3,
      color: '#D87A5A',
    },
    LEGENDARY: {
      name: 'Legendary',
      multiplier: 5,
      color: '#FF6B6B',
    },
  },

  // Seasonal land expansions
  SEASONAL_EXPANSIONS: {
    enabled: true,
    baseExpansion: 50,
  },
} as const;

export interface LandAllocation {
  base: number;
  referral: number;
  irl: number;
  seasonal?: number;
  total: number;
  tier: keyof typeof LAND_ECONOMY.TIERS;
}

export function calculateLandAllocation(
  referralCount: number = 0,
  irlEncounters: number = 0,
  seasonalBonus: boolean = false
): LandAllocation {
  const base = LAND_ECONOMY.BASE_LAND_ALLOCATION;
  
  // Calculate referral bonus (sum of all milestone rewards)
  const referral = Object.values(LAND_ECONOMY.REFERRAL_BONUSES).reduce(
    (sum, bonus) => sum + bonus,
    0
  ) * referralCount;

  // IRL encounter bonus
  const irl = LAND_ECONOMY.IRL_ENCOUNTER_BONUS * irlEncounters;

  // Seasonal expansion
  const seasonal = seasonalBonus ? LAND_ECONOMY.SEASONAL_EXPANSIONS.baseExpansion : 0;

  const total = base + referral + irl + seasonal;

  // Determine tier based on total land
  let tier: keyof typeof LAND_ECONOMY.TIERS = 'COMMON';
  if (total >= 500) tier = 'LEGENDARY';
  else if (total >= 300) tier = 'EPIC';
  else if (total >= 200) tier = 'RARE';
  else if (total >= 150) tier = 'UNCOMMON';

  return {
    base,
    referral,
    irl,
    seasonal,
    total,
    tier,
  };
}

export function getLandTierInfo(tier: keyof typeof LAND_ECONOMY.TIERS) {
  return LAND_ECONOMY.TIERS[tier];
}

