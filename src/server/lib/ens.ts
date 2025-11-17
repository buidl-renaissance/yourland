import { ethers } from 'ethers';

// Public RPC endpoint - can be overridden via env
const RPC_URL = process.env.ETHEREUM_RPC_URL || 'https://eth.llamarpc.com';

// In-memory cache for ENS resolutions (24 hour TTL)
interface CacheEntry {
  value: string | null;
  timestamp: number;
}

interface MetadataCacheEntry {
  value: ENSMetadata | null;
  timestamp: number;
}

export interface ENSMetadata {
  avatar?: string;
  description?: string;
  url?: string;
  twitter?: string;
  github?: string;
  discord?: string;
  telegram?: string;
  reddit?: string;
  youtube?: string;
  email?: string;
  [key: string]: string | undefined; // Allow other text records
}

const ensCache = new Map<string, CacheEntry>();
const reverseCache = new Map<string, CacheEntry>();
const metadataCache = new Map<string, MetadataCacheEntry>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

// Provider instance (lazy initialization)
let provider: ethers.JsonRpcProvider | null = null;

function getProvider(): ethers.JsonRpcProvider {
  if (!provider) {
    provider = new ethers.JsonRpcProvider(RPC_URL);
  }
  return provider;
}

/**
 * Check if a string is a valid Ethereum address
 */
export function isValidAddress(address: string): boolean {
  try {
    return ethers.isAddress(address);
  } catch {
    return false;
  }
}

/**
 * Check if a string looks like an ENS domain
 */
export function isENSDomain(identifier: string): boolean {
  // Basic check: ends with .eth and contains valid characters
  const ensPattern = /^[a-z0-9-]+\.eth$/i;
  return ensPattern.test(identifier);
}

/**
 * Normalize an Ethereum address to checksum format
 */
export function normalizeAddress(address: string): string {
  try {
    return ethers.getAddress(address);
  } catch {
    return address;
  }
}

/**
 * Resolve ENS domain to Ethereum address
 */
export async function resolveENS(domain: string): Promise<string | null> {
  // Check cache first
  const cacheKey = domain.toLowerCase();
  const cached = ensCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.value;
  }

  try {
    const provider = getProvider();
    const address = await provider.resolveName(domain);
    
    // Cache the result
    ensCache.set(cacheKey, {
      value: address,
      timestamp: Date.now(),
    });

    return address;
  } catch (error) {
    console.error(`Error resolving ENS domain ${domain}:`, error);
    
    // Cache null result to avoid repeated failed lookups
    ensCache.set(cacheKey, {
      value: null,
      timestamp: Date.now(),
    });

    return null;
  }
}

/**
 * Reverse resolve Ethereum address to ENS domain
 */
export async function reverseResolve(address: string): Promise<string | null> {
  try {
    const normalizedAddr = normalizeAddress(address);
    
    // Check cache first
    const cached = reverseCache.get(normalizedAddr);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.value;
    }

    const provider = getProvider();
    const domain = await provider.lookupAddress(normalizedAddr);
    
    // Cache the result
    reverseCache.set(normalizedAddr, {
      value: domain,
      timestamp: Date.now(),
    });

    return domain;
  } catch (error) {
    console.error(`Error reverse resolving address ${address}:`, error);
    return null;
  }
}

/**
 * Auto-detect if identifier is ENS or address and resolve to address
 * Returns the normalized address and optionally the ENS domain
 */
export async function resolveIdentifier(
  identifier: string
): Promise<{ address: string | null; ensDomain: string | null }> {
  const lowerIdentifier = identifier.toLowerCase();

  // Check if it's already a valid address
  if (isValidAddress(identifier)) {
    const address = normalizeAddress(identifier);
    // Try reverse resolve to get ENS domain
    const ensDomain = await reverseResolve(address);
    return { address, ensDomain };
  }

  // Check if it's an ENS domain
  if (isENSDomain(lowerIdentifier)) {
    const address = await resolveENS(lowerIdentifier);
    return { address, ensDomain: address ? lowerIdentifier : null };
  }

  // Invalid identifier
  return { address: null, ensDomain: null };
}

/**
 * Get ENS text record (metadata)
 * Common text record keys:
 * - avatar: Profile image URL
 * - description: Bio/description
 * - url: Website
 * - com.twitter: Twitter handle
 * - com.github: GitHub username
 * - com.discord: Discord handle
 * - email: Email address
 */
export async function getENSTextRecord(
  domain: string,
  key: string
): Promise<string | null> {
  try {
    const provider = getProvider();
    const resolver = await provider.getResolver(domain);
    
    if (!resolver) {
      return null;
    }

    const value = await resolver.getText(key);
    return value || null;
  } catch (error) {
    console.error(`Error fetching ENS text record ${key} for ${domain}:`, error);
    return null;
  }
}

/**
 * Fetch all common ENS metadata for a domain
 */
export async function getENSMetadata(domain: string): Promise<ENSMetadata> {
  // Check cache first
  const cacheKey = domain.toLowerCase();
  const cached = metadataCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.value || {};
  }

  const metadata: ENSMetadata = {};

  try {
    const provider = getProvider();
    const resolver = await provider.getResolver(domain);
    
    if (!resolver) {
      // Cache empty result
      metadataCache.set(cacheKey, {
        value: null,
        timestamp: Date.now(),
      });
      return {};
    }

    // Fetch common text records in parallel
    const textRecordKeys = [
      'avatar',
      'description',
      'url',
      'com.twitter',
      'com.github',
      'com.discord',
      'com.telegram',
      'com.reddit',
      'com.youtube',
      'email',
    ];

    const results = await Promise.allSettled(
      textRecordKeys.map(async (key) => {
        try {
          const value = await resolver.getText(key);
          return { key, value: value || null };
        } catch {
          return { key, value: null };
        }
      })
    );

    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        const { key, value } = result.value;
        if (value) {
          // Normalize keys for easier access
          if (key === 'com.twitter') {
            metadata.twitter = value;
          } else if (key === 'com.github') {
            metadata.github = value;
          } else if (key === 'com.discord') {
            metadata.discord = value;
          } else if (key === 'com.telegram') {
            metadata.telegram = value;
          } else if (key === 'com.reddit') {
            metadata.reddit = value;
          } else if (key === 'com.youtube') {
            metadata.youtube = value;
          } else {
            metadata[key] = value;
          }
        }
      }
    });

    // Cache the result
    metadataCache.set(cacheKey, {
      value: metadata,
      timestamp: Date.now(),
    });

    return metadata;
  } catch (error) {
    console.error(`Error fetching ENS metadata for ${domain}:`, error);
    
    // Cache empty result
    metadataCache.set(cacheKey, {
      value: null,
      timestamp: Date.now(),
    });

    return {};
  }
}

/**
 * Get ENS metadata for an address (via reverse resolution)
 */
export async function getAddressMetadata(
  address: string
): Promise<{ ensDomain: string | null; metadata: ENSMetadata }> {
  const ensDomain = await reverseResolve(address);
  
  if (!ensDomain) {
    return { ensDomain: null, metadata: {} };
  }

  const metadata = await getENSMetadata(ensDomain);
  return { ensDomain, metadata };
}

/**
 * Clear cache entries (useful for testing or forced refresh)
 */
export function clearCache(): void {
  ensCache.clear();
  reverseCache.clear();
  metadataCache.clear();
}

