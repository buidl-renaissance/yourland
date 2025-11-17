import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const PromptContainer = styled.div`
  background: linear-gradient(135deg, rgba(0, 255, 135, 0.1) 0%, rgba(96, 239, 255, 0.1) 100%);
  border: 2px solid rgba(0, 255, 135, 0.3);
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  margin: 2rem 0;
`;

const Title = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: left;
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #00ff87;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin: 0;
`;

const DownloadButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const DownloadButton = styled.a`
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

const HighlightBadge = styled.div`
  display: inline-block;
  background: rgba(0, 255, 135, 0.2);
  color: #00ff87;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

interface AppDownloadPromptProps {
  accountId?: string;
}

export const AppDownloadPrompt: React.FC<AppDownloadPromptProps> = ({ accountId }) => {
  const appStoreUrl = 'https://apps.apple.com/app/yourland'; // Placeholder
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.yourland'; // Placeholder
  const deepLinkUrl = accountId 
    ? `yourland://claim?accountId=${accountId}`
    : 'yourland://claim';

  return (
    <PromptContainer>
      <HighlightBadge>Claim Your Land</HighlightBadge>
      <Title>Requires the App</Title>
      <Subtitle>
        Download the YourLand app to claim your land, connect with others via Bluetooth, 
        and unlock the full experience of your digital territory.
      </Subtitle>

      <FeatureGrid>
        <FeatureCard>
          <FeatureIcon>📡</FeatureIcon>
          <FeatureTitle>Bluetooth Proximity</FeatureTitle>
          <FeatureDescription>
            Connect with nearby friends and discover hyperlocal experiences through peer-to-peer networking.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>🏰</FeatureIcon>
          <FeatureTitle>Claim Your Land</FeatureTitle>
          <FeatureDescription>
            Own your digital territory. Land is stored on-chain and tied to your device identity and wallet.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>⚡</FeatureIcon>
          <FeatureTitle>Offline-First</FeatureTitle>
          <FeatureDescription>
            Access your land, connections, and content even without internet. Local-first storage means instant access.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>🎯</FeatureIcon>
          <FeatureTitle>IRL Encounters</FeatureTitle>
          <FeatureDescription>
            Real-time connection messages and local discovery. Meet people in your physical space.
          </FeatureDescription>
        </FeatureCard>
      </FeatureGrid>

      <DownloadButtons>
        <DownloadButton href={appStoreUrl} target="_blank" rel="noopener noreferrer">
          <span>📱</span> Download for iOS
        </DownloadButton>
        <DownloadButton href={playStoreUrl} target="_blank" rel="noopener noreferrer">
          <span>🤖</span> Download for Android
        </DownloadButton>
        {accountId && (
          <DownloadButton href={deepLinkUrl}>
            <span>🔗</span> Open in App
          </DownloadButton>
        )}
      </DownloadButtons>

      <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.6)' }}>
        Your ephemeral account will be merged into your permanent Land Passport when you open the app.
      </p>
    </PromptContainer>
  );
};

