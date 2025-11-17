import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { v4 as uuidv4 } from 'uuid';
import type { EphemeralAccount, ReferralRelationship } from './account';

interface YourLandDB extends DBSchema {
  accounts: {
    key: string;
    value: EphemeralAccount;
    indexes: { 'by-device-id': string; 'by-email': string };
  };
  referrals: {
    key: string;
    value: ReferralRelationship;
    indexes: { 'by-referrer': string };
  };
}

let dbPromise: Promise<IDBPDatabase<YourLandDB>> | null = null;

function getDB(): Promise<IDBPDatabase<YourLandDB>> {
  if (!dbPromise) {
    dbPromise = openDB<YourLandDB>('yourland-ephemeral', 1, {
      upgrade(db) {
        // Accounts store
        if (!db.objectStoreNames.contains('accounts')) {
          const accountStore = db.createObjectStore('accounts', {
            keyPath: 'id',
          });
          accountStore.createIndex('by-device-id', 'deviceId', { unique: false });
          accountStore.createIndex('by-email', 'email', { unique: false });
        }

        // Referrals store
        if (!db.objectStoreNames.contains('referrals')) {
          const referralStore = db.createObjectStore('referrals', {
            keyPath: 'id',
          });
          referralStore.createIndex('by-referrer', 'referrerId', { unique: false });
        }
      },
    });
  }
  return dbPromise;
}

function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') return uuidv4();
  
  const stored = localStorage.getItem('yourland-device-id');
  if (stored) return stored;
  
  const deviceId = uuidv4();
  localStorage.setItem('yourland-device-id', deviceId);
  return deviceId;
}

export async function createEphemeralAccount(
  displayName: string,
  email?: string,
  referrerId?: string,
  realm?: string,
  questType?: string
): Promise<EphemeralAccount> {
  const db = await getDB();
  const deviceId = getOrCreateDeviceId();
  
  const account: EphemeralAccount = {
    id: uuidv4(),
    displayName,
    email,
    deviceId,
    referrerId,
    referralCode: uuidv4().substring(0, 8).toUpperCase(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    xp: 0,
    reputation: 0,
    profileCompleted: false,
    appDownloaded: false,
    landClaimed: false,
    realm,
    questType,
  };

  await db.put('accounts', account);

  // Create referral relationship if referrer exists
  // Store this relationship with the new account's ID as the key
  // The referrerId field tracks who referred this account
  if (referrerId) {
    const referral: ReferralRelationship = {
      id: account.id, // Use account ID as the referral relationship ID
      referrerId,
      referredAt: Date.now(),
      milestones: {
        accountCreated: true,
        profileCompleted: false,
        appDownloaded: false,
        landClaimed: false,
      },
    };
    await db.put('referrals', referral);
  }

  return account;
}

export async function getEphemeralAccount(): Promise<EphemeralAccount | null> {
  const db = await getDB();
  const deviceId = getOrCreateDeviceId();
  
  const accounts = await db.getAllFromIndex('accounts', 'by-device-id', deviceId);
  return accounts.length > 0 ? accounts[0] : null;
}

export async function getEphemeralAccountByEmail(email: string): Promise<EphemeralAccount | null> {
  const db = await getDB();
  const accounts = await db.getAllFromIndex('accounts', 'by-email', email);
  return accounts.length > 0 ? accounts[0] : null;
}

export async function updateEphemeralAccount(
  accountId: string,
  updates: Partial<EphemeralAccount>
): Promise<EphemeralAccount> {
  const db = await getDB();
  const account = await db.get('accounts', accountId);
  
  if (!account) {
    throw new Error('Account not found');
  }

  const updated = {
    ...account,
    ...updates,
    updatedAt: Date.now(),
  };

  await db.put('accounts', updated);

  // Update referral milestones if applicable
  if (updates.profileCompleted || updates.appDownloaded || updates.landClaimed) {
    const referrals = await db.getAllFromIndex('referrals', 'by-referrer', account.referrerId || '');
    for (const referral of referrals) {
      if (referral.referrerId === account.referrerId) {
        const updatedReferral = {
          ...referral,
          milestones: {
            ...referral.milestones,
            profileCompleted: updates.profileCompleted ?? referral.milestones.profileCompleted,
            appDownloaded: updates.appDownloaded ?? referral.milestones.appDownloaded,
            landClaimed: updates.landClaimed ?? referral.milestones.landClaimed,
          },
        };
        await db.put('referrals', updatedReferral);
      }
    }
  }

  return updated;
}

export async function setPendingLandClaim(
  accountId: string,
  amount: number,
  referrerBonus?: number
): Promise<EphemeralAccount> {
  return updateEphemeralAccount(accountId, {
    pendingLandClaim: {
      amount,
      referrerBonus,
      createdAt: Date.now(),
    },
  });
}

export async function getReferralRelationships(
  referrerId: string
): Promise<ReferralRelationship[]> {
  const db = await getDB();
  // Get all referrals where this account is the referrer
  const allReferrals = await db.getAll('referrals');
  return allReferrals.filter(ref => ref.referrerId === referrerId);
}

