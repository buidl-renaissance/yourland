import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #050509 0%, #111124 100%);
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  padding: 2rem 1rem;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ProfileHeader = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
`;

const AvatarContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid rgba(0, 255, 135, 0.3);
  object-fit: cover;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
`;

const AvatarPlaceholder = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid rgba(0, 255, 135, 0.3);
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.3);
`;

const ProfileDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 135, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    background: rgba(0, 255, 135, 0.1);
    border-color: #00ff87;
    color: #00ff87;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 255, 135, 0.2);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const SocialIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;

const SocialText = styled.span`
  white-space: nowrap;
`;

const MetadataSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const MetadataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
`;

const MetadataLabel = styled.span`
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  min-width: 100px;
`;

const MetadataValue = styled.span`
  color: rgba(255, 255, 255, 0.9);
  word-break: break-all;
`;

const MetadataLink = styled.a`
  color: #00ff87;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ProfileName = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ProfileIdentity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 2rem;
`;

const IdentityItem = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  font-family: 'Courier New', monospace;
  word-break: break-all;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const LandClaimsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LandClaimCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LandClaimInfo = styled.div`
  flex: 1;
`;

const LandClaimAmount = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #00ff87;
  margin-bottom: 0.25rem;
`;

const LandClaimMeta = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

const LandClaimTier = styled.div`
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  color: #0a0a0a;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
`;

const LoadingText = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.1rem;
  padding: 4rem 2rem;
`;

const ErrorMessage = styled.div`
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  color: #ff6b6b;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.6);
`;

const CopyButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #00ff87;
  }
`;

interface ENSMetadata {
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
  [key: string]: string | undefined;
}

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

export default function ProfilePage() {
  const router = useRouter();
  const { identifier } = router.query;
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!identifier || typeof identifier !== 'string') return;

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/profile/${encodeURIComponent(identifier)}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to load profile');
        }

        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [identifier]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Convert IPFS URLs to gateway URLs
  const getAvatarUrl = (avatarUrl?: string): string | undefined => {
    if (!avatarUrl) return undefined;
    
    // Handle IPFS URLs
    if (avatarUrl.startsWith('ipfs://')) {
      const ipfsHash = avatarUrl.replace('ipfs://', '');
      return `https://ipfs.io/ipfs/${ipfsHash}`;
    }
    
    // Handle IPFS hashes without protocol
    if (avatarUrl.startsWith('Qm') || avatarUrl.startsWith('baf')) {
      return `https://ipfs.io/ipfs/${avatarUrl}`;
    }
    
    return avatarUrl;
  };

  if (isLoading) {
    return (
      <PageContainer>
        <ContentWrapper>
          <LoadingText>Loading profile...</LoadingText>
        </ContentWrapper>
      </PageContainer>
    );
  }

  if (error || !profileData) {
    return (
      <PageContainer>
        <ContentWrapper>
          <Nav>
            <Logo href="/">yourland</Logo>
          </Nav>
          <ErrorMessage>
            {error || 'Profile not found'}
          </ErrorMessage>
        </ContentWrapper>
      </PageContainer>
    );
  }

  const { account, blockchain, stats, landClaims } = profileData;
  const displayName = account?.displayName || blockchain.ensDomain || 'Anonymous';
  const address = blockchain.address || account?.ethereumAddress;

  return (
    <>
      <Head>
        <title>{displayName} - YourLand Profile</title>
        <meta name="description" content={`View ${displayName}'s YourLand profile`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PageContainer>
        <ContentWrapper>
          <Nav>
            <Logo href="/">yourland</Logo>
            <Link href="/" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' }}>
              ← Back
            </Link>
          </Nav>

          <ProfileHeader>
            <AvatarContainer>
              {getAvatarUrl(blockchain.metadata.avatar) ? (
                <>
                  <Avatar
                    src={getAvatarUrl(blockchain.metadata.avatar)}
                    alt={displayName}
                    style={{ display: 'block' }}
                    onError={(e) => {
                      // Hide avatar and show placeholder if image fails to load
                      e.currentTarget.style.display = 'none';
                      const container = e.currentTarget.parentElement;
                      if (container) {
                        const placeholder = container.querySelector('[data-placeholder]') as HTMLElement;
                        if (placeholder) placeholder.style.display = 'flex';
                      }
                    }}
                  />
                  <AvatarPlaceholder data-placeholder style={{ display: 'none' }}>
                    {displayName.charAt(0).toUpperCase()}
                  </AvatarPlaceholder>
                </>
              ) : (
                <AvatarPlaceholder>
                  {displayName.charAt(0).toUpperCase()}
                </AvatarPlaceholder>
              )}
            </AvatarContainer>
            <ProfileName>{displayName}</ProfileName>
            {blockchain.metadata.description && (
              <ProfileDescription>{blockchain.metadata.description}</ProfileDescription>
            )}
            <ProfileIdentity>
              {blockchain.ensDomain && (
                <IdentityItem>
                  {blockchain.ensDomain}
                  <CopyButton onClick={() => copyToClipboard(blockchain.ensDomain!)}>
                    Copy
                  </CopyButton>
                </IdentityItem>
              )}
              {address && (
                <IdentityItem>
                  {address}
                  <CopyButton onClick={() => copyToClipboard(address)}>
                    Copy
                  </CopyButton>
                </IdentityItem>
              )}
            </ProfileIdentity>
            {(blockchain.metadata.twitter || blockchain.metadata.github || blockchain.metadata.discord || blockchain.metadata.telegram || blockchain.metadata.reddit || blockchain.metadata.youtube || blockchain.metadata.url) && (
              <SocialLinks>
                {blockchain.metadata.twitter && (
                  <SocialLink
                    href={`https://twitter.com/${blockchain.metadata.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter"
                  >
                    <SocialIcon>
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </SocialIcon>
                    <SocialText>@{blockchain.metadata.twitter.replace('@', '')}</SocialText>
                  </SocialLink>
                )}
                {blockchain.metadata.github && (
                  <SocialLink
                    href={`https://github.com/${blockchain.metadata.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                  >
                    <SocialIcon>
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </SocialIcon>
                    <SocialText>{blockchain.metadata.github}</SocialText>
                  </SocialLink>
                )}
                {blockchain.metadata.discord && (
                  <SocialLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      copyToClipboard(blockchain.metadata.discord!);
                    }}
                    title="Discord (click to copy)"
                  >
                    <SocialIcon>
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                    </SocialIcon>
                    <SocialText>{blockchain.metadata.discord}</SocialText>
                  </SocialLink>
                )}
                {blockchain.metadata.telegram && (
                  <SocialLink
                    href={`https://t.me/${blockchain.metadata.telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Telegram"
                  >
                    <SocialIcon>
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.027-1.627 4.476-1.635z"/>
                      </svg>
                    </SocialIcon>
                    <SocialText>{blockchain.metadata.telegram.replace('@', '')}</SocialText>
                  </SocialLink>
                )}
                {blockchain.metadata.reddit && (
                  <SocialLink
                    href={`https://reddit.com/user/${blockchain.metadata.reddit.replace('u/', '').replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Reddit"
                  >
                    <SocialIcon>
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                      </svg>
                    </SocialIcon>
                    <SocialText>{blockchain.metadata.reddit.replace('u/', '').replace('@', '')}</SocialText>
                  </SocialLink>
                )}
                {blockchain.metadata.youtube && (
                  <SocialLink
                    href={`https://youtube.com/${blockchain.metadata.youtube.startsWith('@') ? blockchain.metadata.youtube : `@${blockchain.metadata.youtube}`}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="YouTube"
                  >
                    <SocialIcon>
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </SocialIcon>
                    <SocialText>{blockchain.metadata.youtube.replace('@', '')}</SocialText>
                  </SocialLink>
                )}
                {blockchain.metadata.url && (
                  <SocialLink
                    href={blockchain.metadata.url.startsWith('http') ? blockchain.metadata.url : `https://${blockchain.metadata.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Website"
                  >
                    <SocialIcon>
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </SocialIcon>
                    <SocialText>Website</SocialText>
                  </SocialLink>
                )}
              </SocialLinks>
            )}
            {(blockchain.metadata.email || blockchain.metadata.url) && (
              <MetadataSection>
                {blockchain.metadata.email && (
                  <MetadataItem>
                    <MetadataLabel>Email:</MetadataLabel>
                    <MetadataValue>
                      <MetadataLink href={`mailto:${blockchain.metadata.email}`}>
                        {blockchain.metadata.email}
                      </MetadataLink>
                    </MetadataValue>
                  </MetadataItem>
                )}
              </MetadataSection>
            )}
          </ProfileHeader>

          <StatsGrid>
            <StatCard>
              <StatValue>{account?.xp || 0}</StatValue>
              <StatLabel>XP</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{account?.reputation || 0}</StatValue>
              <StatLabel>Reputation</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{stats.referralCount}</StatValue>
              <StatLabel>Referrals</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{stats.totalLandAmount.toFixed(2)}</StatValue>
              <StatLabel>Total Land</StatLabel>
            </StatCard>
          </StatsGrid>

          {account && (
            <Section>
              <SectionTitle>Account Status</SectionTitle>
              <StatsGrid>
                <StatCard>
                  <StatValue>{account.profileCompleted ? '✓' : '○'}</StatValue>
                  <StatLabel>Profile Completed</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{account.appDownloaded ? '✓' : '○'}</StatValue>
                  <StatLabel>App Downloaded</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{account.landClaimed ? '✓' : '○'}</StatValue>
                  <StatLabel>Land Claimed</StatLabel>
                </StatCard>
              </StatsGrid>
            </Section>
          )}

          <Section>
            <SectionTitle>Land Claims</SectionTitle>
            {landClaims.length > 0 ? (
              <LandClaimsList>
                {landClaims.map((claim) => (
                  <LandClaimCard key={claim.id}>
                    <LandClaimInfo>
                      <LandClaimAmount>{claim.amount.toFixed(2)} Land</LandClaimAmount>
                      <LandClaimMeta>
                        Claimed on {formatDate(claim.claimedAt)}
                      </LandClaimMeta>
                    </LandClaimInfo>
                    <LandClaimTier>{claim.tier}</LandClaimTier>
                  </LandClaimCard>
                ))}
              </LandClaimsList>
            ) : (
              <EmptyState>
                No land claims yet
              </EmptyState>
            )}
          </Section>
        </ContentWrapper>
      </PageContainer>
    </>
  );
}

