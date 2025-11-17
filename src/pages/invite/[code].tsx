import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { InviteLanding } from '@/components/onboarding/InviteLanding';
import { AccountCreation } from '@/components/onboarding/AccountCreation';
import { AppDownloadPrompt } from '@/components/onboarding/AppDownloadPrompt';
import type { EphemeralAccount } from '@/lib/ephemeral/account';
import type { InviteParams } from '@/lib/ephemeral/account';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #050509 0%, #111124 100%);
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  padding: 2rem 1rem;
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem 2rem;
  backdrop-filter: blur(12px);
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.1rem;
`;

function parseInviteCode(code: string): InviteParams {
  // QR code format: referrerId-realm-quest or just referrerId
  const parts = code.split('-');
  return {
    referrerId: parts[0] || undefined,
    realm: parts[1] || undefined,
    quest: parts[2] || undefined,
  };
}

export default function InvitePage() {
  const router = useRouter();
  const { code } = router.query;
  const [inviteParams, setInviteParams] = useState<InviteParams | null>(null);
  const [account, setAccount] = useState<EphemeralAccount | null>(null);
  const [referrerInfo, setReferrerInfo] = useState<{ name?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!code || typeof code !== 'string') return;

    const params = parseInviteCode(code);
    setInviteParams(params);

    // Fetch referrer info from API
    const fetchReferrerInfo = async () => {
      try {
        const response = await fetch(`/api/invite/${params.referrerId}`);
        if (response.ok) {
          const data = await response.json();
          setReferrerInfo(data);
        }
      } catch (error) {
        console.error('Failed to fetch referrer info:', error);
      }
    };

    if (params.referrerId) {
      fetchReferrerInfo();
    }

    // Check for existing ephemeral account
    const checkExistingAccount = async () => {
      try {
        const { getEphemeralAccount } = await import('@/lib/ephemeral/storage');
        const existingAccount = await getEphemeralAccount();
        if (existingAccount) {
          setAccount(existingAccount);
        }
      } catch (error) {
        console.error('Failed to check existing account:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingAccount();
  }, [code]);

  const handleAccountCreated = (newAccount: EphemeralAccount) => {
    setAccount(newAccount);
    // Track referral event
    if (inviteParams?.referrerId) {
      fetch('/api/referral/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referrerId: inviteParams.referrerId,
          event: 'accountCreated',
          accountId: newAccount.id,
        }),
      }).catch(console.error);
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <ContentWrapper>
          <LoadingText>Loading...</LoadingText>
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <>
      <Head>
        <title>Join YourLand - Claim Your Land</title>
        <meta
          name="description"
          content="You've been invited to join YourLand. Claim your digital territory and start building."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PageContainer>
        <ContentWrapper>
          <Logo>yourland</Logo>

          {!account ? (
            <>
              <Section>
                <InviteLanding
                  referrerName={referrerInfo?.name}
                  referrerId={inviteParams?.referrerId}
                  realm={inviteParams?.realm}
                  questType={inviteParams?.quest}
                />
              </Section>

              <Section>
                <AccountCreation
                  referrerId={inviteParams?.referrerId}
                  realm={inviteParams?.realm}
                  questType={inviteParams?.quest}
                  onAccountCreated={handleAccountCreated}
                />
              </Section>
            </>
          ) : (
            <>
              <Section>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 700, 
                  marginBottom: '1rem',
                  background: 'linear-gradient(135deg, #00ff87 0%, #60efff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textAlign: 'center'
                }}>
                  Welcome, {account.displayName}!
                </h2>
                <p style={{ 
                  textAlign: 'center', 
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '2rem'
                }}>
                  Your ephemeral account is ready. Download the app to claim your land and unlock the full experience.
                </p>
              </Section>

              <Section>
                <AppDownloadPrompt accountId={account.id} />
              </Section>
            </>
          )}
        </ContentWrapper>
      </PageContainer>
    </>
  );
}

