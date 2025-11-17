import React from 'react';
import styled from 'styled-components';
import type { EphemeralAccount } from '@/lib/ephemeral/account';

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: #00ff87;
    box-shadow: 0 10px 30px rgba(0, 255, 135, 0.2);
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
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
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
`;

const MilestoneList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const MilestoneItem = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.completed 
    ? 'rgba(0, 255, 135, 0.1)' 
    : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.completed 
    ? 'rgba(0, 255, 135, 0.3)' 
    : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
`;

const MilestoneIcon = styled.div<{ completed: boolean }>`
  font-size: 1.5rem;
  opacity: ${props => props.completed ? 1 : 0.5};
`;

const MilestoneText = styled.div`
  flex: 1;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
`;

const MilestoneReward = styled.div`
  color: #00ff87;
  font-weight: 700;
  font-size: 0.9rem;
`;

interface ReferralStatsProps {
  account: EphemeralAccount;
  referralCount?: number;
}

export const ReferralStats: React.FC<ReferralStatsProps> = ({
  account,
  referralCount = 0,
}) => {
  const milestones = [
    {
      label: 'Account Created',
      completed: true,
      reward: '+10 Land',
      icon: '✅',
    },
    {
      label: 'Profile Completed',
      completed: account.profileCompleted,
      reward: '+25 Land',
      icon: '📝',
    },
    {
      label: 'App Downloaded',
      completed: account.appDownloaded,
      reward: '+50 Land',
      icon: '📱',
    },
    {
      label: 'Land Claimed',
      completed: account.landClaimed,
      reward: '+100 Land',
      icon: '🏰',
    },
  ];

  return (
    <>
      <StatsContainer>
        <StatCard>
          <StatIcon>👥</StatIcon>
          <StatValue>{referralCount}</StatValue>
          <StatLabel>Referrals</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>🌍</StatIcon>
          <StatValue>{account.pendingLandClaim?.amount || 0}</StatValue>
          <StatLabel>Pending Land</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>⭐</StatIcon>
          <StatValue>{account.xp}</StatValue>
          <StatLabel>XP</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>🏆</StatIcon>
          <StatValue>{account.reputation}</StatValue>
          <StatLabel>Reputation</StatLabel>
        </StatCard>
      </StatsContainer>

      <MilestoneList>
        {milestones.map((milestone, index) => (
          <MilestoneItem key={index} completed={milestone.completed}>
            <MilestoneIcon completed={milestone.completed}>
              {milestone.icon}
            </MilestoneIcon>
            <MilestoneText>{milestone.label}</MilestoneText>
            <MilestoneReward>{milestone.reward}</MilestoneReward>
          </MilestoneItem>
        ))}
      </MilestoneList>
    </>
  );
};

