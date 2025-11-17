import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { QRCodeGenerator } from '@/components/qr/QRCodeGenerator';
import type { EphemeralAccount } from '@/lib/ephemeral/account';

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

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const LoadingText = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.1rem;
`;

const ErrorMessage = styled.div`
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  color: #ff6b6b;
`;

const CreateAccountPrompt = styled.div`
  text-align: center;
  padding: 2rem;
`;

const CreateButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  color: #0a0a0a;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 255, 135, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(0, 255, 135, 0.4);
  }
`;

export default function GenerateInvitePage() {
  const router = useRouter();
  const [account, setAccount] = useState<EphemeralAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const { getEphemeralAccount } = await import('@/lib/ephemeral/storage');
        const existingAccount = await getEphemeralAccount();
        setAccount(existingAccount);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load account');
      } finally {
        setIsLoading(false);
      }
    };

    loadAccount();
  }, []);

  if (isLoading) {
    return (
      <PageContainer>
        <ContentWrapper>
          <LoadingText>Loading...</LoadingText>
        </ContentWrapper>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ContentWrapper>
          <ErrorMessage>{error}</ErrorMessage>
        </ContentWrapper>
      </PageContainer>
    );
  }

  if (!account) {
    return (
      <PageContainer>
        <ContentWrapper>
          <Section>
            <Title>Create Account First</Title>
            <Subtitle>
              You need to create an account before you can generate invite codes.
            </Subtitle>
            <CreateAccountPrompt>
              <CreateButton href="/">Get Started</CreateButton>
            </CreateAccountPrompt>
          </Section>
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <>
      <Head>
        <title>Generate Invite - YourLand</title>
        <meta
          name="description"
          content="Generate your personal invite code and start earning land through referrals."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PageContainer>
        <ContentWrapper>
          <Logo>yourland</Logo>

          <Section>
            <Title>Invite Friends</Title>
            <Subtitle>
              Share your invite code to grow your network and earn land together.
            </Subtitle>
            <QRCodeGenerator account={account} />
          </Section>
        </ContentWrapper>
      </PageContainer>
    </>
  );
}

