export interface EphemeralAccount {
  id: string;
  displayName: string;
  email?: string;
  deviceId: string;
  referrerId?: string;
  referralCode?: string;
  createdAt: number;
  updatedAt: number;
  pendingLandClaim?: {
    amount: number;
    referrerBonus?: number;
    createdAt: number;
  };
  xp: number;
  reputation: number;
  profileCompleted: boolean;
  appDownloaded: boolean;
  landClaimed: boolean;
  realm?: string;
  questType?: string;
  ensDomain?: string;
  ethereumAddress?: string;
}

export interface ReferralRelationship {
  id: string;
  referrerId: string;
  referredAt: number;
  milestones: {
    accountCreated: boolean;
    profileCompleted: boolean;
    appDownloaded: boolean;
    landClaimed: boolean;
  };
}

export interface InviteParams {
  referrerId?: string;
  realm?: string;
  quest?: string;
}

