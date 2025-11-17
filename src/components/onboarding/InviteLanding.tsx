import React from 'react';
import styled from 'styled-components';

const InviteContainer = styled.div`
  text-align: center;
  padding: 2rem 0;
`;

const InviteMessage = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ReferrerName = styled.span`
  color: #00ff87;
  font-weight: 800;
`;

const InviteSubtext = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const BenefitCard = styled.div`
  background: rgba(0, 255, 135, 0.08);
  border: 1px solid rgba(0, 255, 135, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  margin: 1rem 0;
  text-align: left;
`;

const BenefitTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #00ff87;
  margin-bottom: 0.5rem;
`;

const BenefitText = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin: 0;
`;

interface InviteLandingProps {
  referrerName?: string;
  referrerId?: string;
  realm?: string;
  questType?: string;
}

export const InviteLanding: React.FC<InviteLandingProps> = ({
  referrerName,
  referrerId,
  realm,
  questType,
}) => {
  return (
    <InviteContainer>
      <InviteMessage>
        {referrerName ? (
          <>
            <ReferrerName>{referrerName}</ReferrerName> invited you to claim your land.
          </>
        ) : (
          <>You&apos;ve been invited to claim your land.</>
        )}
      </InviteMessage>
      
      <InviteSubtext>
        Join YourLand and start building your digital territory. Connect with your inviter to earn more land together.
      </InviteSubtext>

      <BenefitCard>
        <BenefitTitle>🌍 Claim Your Land</BenefitTitle>
        <BenefitText>
          Get your first plot of digital territory. Your land, your rules.
        </BenefitText>
      </BenefitCard>

      <BenefitCard>
        <BenefitTitle>🤝 Connect & Grow</BenefitTitle>
        <BenefitText>
          Connecting with {referrerName || 'your inviter'} earns you both more land. Build your network and expand your territory.
        </BenefitText>
      </BenefitCard>

      {realm && (
        <BenefitCard>
          <BenefitTitle>📍 {realm}</BenefitTitle>
          <BenefitText>
            You&apos;re joining a special realm. Explore unique features and connect with others in this space.
          </BenefitText>
        </BenefitCard>
      )}

      {questType && (
        <BenefitCard>
          <BenefitTitle>🎯 {questType}</BenefitTitle>
          <BenefitText>
            Complete your first quest to anchor your identity and unlock special rewards.
          </BenefitText>
        </BenefitCard>
      )}
    </InviteContainer>
  );
};

