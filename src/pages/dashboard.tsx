import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { QRCodeGenerator } from '@/components/qr/QRCodeGenerator';
import { ReferralStats } from '@/components/onboarding/ReferralStats';
import { AppDownloadPrompt } from '@/components/onboarding/AppDownloadPrompt';
import type { EphemeralAccount } from '@/lib/ephemeral/account';
import { calculateLandAllocation } from '@/lib/land/economy';

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

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const NavLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #00ff87;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeSection = styled.section`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem 2rem;
  backdrop-filter: blur(12px);
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const WelcomeTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
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

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const QuestCard = styled.div`
  background: linear-gradient(135deg, rgba(0, 255, 135, 0.1) 0%, rgba(96, 239, 255, 0.1) 100%);
  border: 2px solid rgba(0, 255, 135, 0.3);
  border-radius: 20px;
  padding: 2rem;
  margin-top: 1.5rem;
`;

const QuestTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #00ff87;
  margin-bottom: 1rem;
`;

const QuestDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const QuestButton = styled.button`
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  color: #0a0a0a;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 255, 135, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 135, 0.4);
  }
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

export default function Dashboard() {
  const [account, setAccount] = useState<EphemeralAccount | null>(null);
  const [referralCount, setReferralCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const { getEphemeralAccount, getReferralRelationships } = await import('@/lib/ephemeral/storage');
        const existingAccount = await getEphemeralAccount();
        
        if (!existingAccount) {
          setError('No account found. Please create an account first.');
          setIsLoading(false);
          return;
        }

        setAccount(existingAccount);

        // Load referral count - get all accounts that were referred by this account
        const relationships = await getReferralRelationships(existingAccount.id);
        setReferralCount(relationships.length);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <PageContainer>
        <ContentWrapper>
          <LoadingText>Loading dashboard...</LoadingText>
        </ContentWrapper>
      </PageContainer>
    );
  }

  if (error || !account) {
    return (
      <PageContainer>
        <ContentWrapper>
          <ErrorMessage>
            {error || 'No account found. Please create an account first.'}
          </ErrorMessage>
        </ContentWrapper>
      </PageContainer>
    );
  }

  const landAllocation = calculateLandAllocation(referralCount, 0, false);

  return (
    <>
      <Head>
        <title>Dashboard - YourLand</title>
        <meta
          name="description"
          content="Your YourLand dashboard. Manage your land, referrals, and quests."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PageContainer>
        <Nav>
          <Logo>yourland</Logo>
          <NavLink href="/">Home</NavLink>
        </Nav>

        <ContentWrapper>
          <WelcomeSection>
            <WelcomeTitle>Welcome, {account.displayName}!</WelcomeTitle>
            <WelcomeSubtitle>
              Your digital territory awaits. Claim your land, invite friends, and build your network.
            </WelcomeSubtitle>
          </WelcomeSection>

          {!account.appDownloaded && (
            <Section>
              <AppDownloadPrompt accountId={account.id} />
            </Section>
          )}

          <Section>
            <SectionTitle>Your Invite Code</SectionTitle>
            <QRCodeGenerator account={account} />
          </Section>

          <Section>
            <SectionTitle>Your Stats</SectionTitle>
            <ReferralStats account={account} referralCount={referralCount} />
          </Section>

          <Section>
            <SectionTitle>First Quest: Anchor Your Identity</SectionTitle>
            <QuestCard>
              <QuestTitle>🎯 Connect with Your Inviter</QuestTitle>
              <QuestDescription>
                {account.referrerId
                  ? `You were invited by someone! Connect with them to complete your first quest and earn bonus land.`
                  : `Start your journey by inviting friends. Each person you invite helps you both earn more land.`}
              </QuestDescription>
              {account.referrerId && (
                <QuestButton onClick={() => alert('Quest feature coming soon!')}>
                  Complete Quest
                </QuestButton>
              )}
            </QuestCard>
          </Section>

          <Section>
            <SectionTitle>Land Allocation</SectionTitle>
            <div style={{ padding: '1.5rem 0' }}>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
                Based on your current activity, you&apos;re eligible for:
              </p>
              <div style={{
                background: 'rgba(0, 255, 135, 0.1)',
                border: '1px solid rgba(0, 255, 135, 0.3)',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #00ff87 0%, #60efff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '0.5rem'
                }}>
                  {landAllocation.total}
                </div>
                <div style={{
                  fontSize: '1.2rem',
                  color: '#00ff87',
                  fontWeight: 700,
                  marginBottom: '1rem'
                }}>
                  {landAllocation.tier} Land
                </div>
                <div style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: 1.6
                }}>
                  Base: {landAllocation.base} • Referrals: {landAllocation.referral} • IRL: {landAllocation.irl}
                </div>
              </div>
            </div>
          </Section>
        </ContentWrapper>
      </PageContainer>
    </>
  );
}

