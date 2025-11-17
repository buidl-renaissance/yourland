import React, { useState, useEffect } from 'react';
import { QRCodeDisplay } from './QRCodeDisplay';
import styled from 'styled-components';
import type { EphemeralAccount } from '@/lib/ephemeral/account';

const GeneratorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoCard = styled.div`
  background: rgba(0, 255, 135, 0.08);
  border: 1px solid rgba(0, 255, 135, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
`;

const InfoTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: #00ff87;
  margin-bottom: 0.75rem;
`;

const InfoText = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

interface QRCodeGeneratorProps {
  account: EphemeralAccount;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ account }) => {
  const [referralCount, setReferralCount] = useState(0);
  const [potentialLand, setPotentialLand] = useState(0);

  useEffect(() => {
    // Fetch referral stats
    const fetchStats = async () => {
      try {
        // Get referrals where this account is the referrer
        // We need to match by account ID, not referral code
        const { getReferralRelationships } = await import('@/lib/ephemeral/storage');
        const relationships = await getReferralRelationships(account.id);
        setReferralCount(relationships.length);
        
        // Calculate potential land from referrals
        const { REFERRAL_REWARDS } = await import('@/lib/referral/tracking');
        const totalLand = relationships.length * Object.values(REFERRAL_REWARDS).reduce(
          (sum, reward) => sum + reward.landAmount,
          0
        );
        setPotentialLand(totalLand);
      } catch (error) {
        console.error('Failed to fetch referral stats:', error);
      }
    };

    fetchStats();
  }, [account]);

  const inviteCode = account.referralCode || account.id.substring(0, 8).toUpperCase();

  return (
    <GeneratorContainer>
      <QRCodeDisplay
        value={inviteCode}
        title="Your Invite Code"
        subtext="Share this QR code to invite others and earn land together"
        size={250}
      />

      <InfoCard>
        <InfoTitle>🌍 How Referrals Work</InfoTitle>
        <InfoText>
          When someone joins using your invite code, you both earn land. The more people you invite, 
          the more land you can earn. Connect with people IRL via Bluetooth for even more bonuses!
        </InfoText>
      </InfoCard>

      <StatsGrid>
        <StatCard>
          <StatValue>{referralCount}</StatValue>
          <StatLabel>Referrals</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{potentialLand}</StatValue>
          <StatLabel>Potential Land</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{account.xp}</StatValue>
          <StatLabel>XP</StatLabel>
        </StatCard>
      </StatsGrid>
    </GeneratorContainer>
  );
};

