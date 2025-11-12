import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { useTheme } from '@/contexts/ThemeContext';
import { themeList } from '@/themes/terrains';
import { ThemeName } from '@/themes/types';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  color: white;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #00ff87 0%, #60efff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
`;

const ModeSelector = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const ModeButton = styled.button<{ $isActive: boolean }>`
  padding: 0.75rem 2rem;
  border: 2px solid ${props => props.$isActive ? '#00ff87' : 'rgba(255, 255, 255, 0.2)'};
  background: ${props => props.$isActive ? 'rgba(0, 255, 135, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.$isActive ? '#00ff87' : 'rgba(255, 255, 255, 0.7)'};
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    border-color: #00ff87;
    color: #00ff87;
    background: rgba(0, 255, 135, 0.1);
  }
`;

const ThemeSelector = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const ThemeSelectorTitle = styled.div`
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1rem;
  font-weight: 700;
`;

const ThemeGrid = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 600px;
`;

const ThemeButton = styled.button<{ $isActive: boolean; $themeColor: string }>`
  width: 80px;
  padding: 0.75rem;
  border: 2px solid ${props => props.$isActive ? '#00ff87' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 12px;
  background: ${props => props.$themeColor};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    border-color: #00ff87;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
  
  ${props => props.$isActive && `
    box-shadow: 0 0 0 3px rgba(0, 255, 135, 0.3);
  `}
`;

const ThemeIcon = styled.div`
  font-size: 1.8rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
`;

const ThemeLabel = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(0, 0, 0, 0.8);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
`;

const PhoneFrame = styled.div`
  width: 100%;
  max-width: 430px;
  height: 932px;
  background: #000;
  border-radius: 55px;
  padding: 14px;
  box-shadow: 
    0 0 0 10px #1a1a1a,
    0 0 0 12px #333,
    0 25px 70px rgba(0, 0, 0, 0.6);
  position: relative;
  
  @media (max-width: 768px) {
    max-width: 100%;
    height: 750px;
  }
`;

const PhoneNotch = styled.div`
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  width: 130px;
  height: 32px;
  background: #000;
  border-radius: 0 0 22px 22px;
  z-index: 10;
`;

const PhoneScreen = styled.div`
  width: 100%;
  height: 100%;
  background: var(--color-background-gradient);
  border-radius: 44px;
  overflow: hidden;
  position: relative;
  transition: background 0.6s ease;
`;

const ScreenContent = styled.div`
  height: calc(100% - 85px);
  overflow-y: auto;
  padding: 3rem 0 1.5rem;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 2px;
  }
`;

const StatusBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  color: var(--color-text);
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 5;
  background: linear-gradient(to bottom, var(--color-background) 80%, transparent);
`;

const AppNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
`;

const AppLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--color-primary);
  letter-spacing: -0.5px;
`;

const NavIcon = styled.div`
  font-size: 1.3rem;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--color-accent);
  }
`;

const BottomNav = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 85px;
  background: var(--color-background);
  backdrop-filter: blur(var(--blur-high));
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 2rem 1.5rem;
  z-index: 10;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
`;

const NavButton = styled.button<{ $isActive?: boolean }>`
  background: ${props => props.$isActive ? 'var(--color-surface)' : 'transparent'};
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  color: ${props => props.$isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)'};
  transition: all 0.3s ease;
  padding: 0.65rem 1rem;
  border-radius: var(--corner-radius-medium);
  min-width: 70px;
  
  &:hover {
    color: var(--color-accent);
    background: var(--color-surface);
  }
`;

const NavButtonIcon = styled.div`
  font-size: 1.4rem;
`;

const NavButtonLabel = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.3px;
`;

const CaptureButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  border: none;
  box-shadow: var(--elevation-high);
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: scale(1.08);
    box-shadow: var(--elevation-very-high);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const ScreenSection = styled.div`
  margin-bottom: 2rem;
  padding: 0 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 0.5rem;
  transition: color 0.4s ease;
`;

const SectionSubtitle = styled.p`
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: 1.25rem;
  transition: color 0.4s ease;
  line-height: 1.4;
`;

// Feed Card Components
const FeedCard = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--corner-radius-medium);
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  transition: all 0.3s ease;
  box-shadow: var(--elevation-low);
  
  &:hover {
    border-color: var(--color-border-hover);
    box-shadow: var(--elevation-medium);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: var(--corner-radius-round);
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
`;

const CardInfo = styled.div`
  flex: 1;
`;

const CardName = styled.div`
  font-weight: 700;
  color: var(--color-text);
  font-size: 0.9rem;
`;

const CardMeta = styled.div`
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardBadge = styled.span`
  background: var(--color-accent);
  color: var(--color-background);
  padding: 0.15rem 0.5rem;
  border-radius: 10px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const CardContent = styled.p`
  color: var(--color-text);
  line-height: 1.55;
  font-size: 0.95rem;
  margin-bottom: 1rem;
`;

const CardImage = styled.div`
  width: 100%;
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  border-radius: var(--corner-radius-small);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  opacity: 0.3;
`;

const CardActions = styled.div`
  display: flex;
  gap: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--color-accent);
  }
`;

// Journey Card
const JourneyCard = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--corner-radius-large);
  overflow: hidden;
  margin-bottom: 1.25rem;
  box-shadow: var(--elevation-low);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: var(--elevation-medium);
    transform: translateY(-2px);
  }
`;

const JourneyHeader = styled.div`
  height: 120px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  position: relative;
`;

const JourneyBadge = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  color: white;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
`;

const JourneyContent = styled.div`
  padding: 1.25rem;
`;

const JourneyTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 0.35rem;
`;

const JourneyMeta = styled.div`
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.75rem;
`;

const JourneyStats = styled.div`
  display: flex;
  gap: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
`;

const JourneyStat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
`;

// Connect / Nearby
const RadarContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  margin: 1.5rem auto;
  position: relative;
  border-radius: 50%;
  background: radial-gradient(circle, var(--color-surface) 0%, var(--color-background) 100%);
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadarPulse = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid var(--color-accent);
  opacity: 0;
  animation: radarPulse 3s ease-out infinite;
  
  @keyframes radarPulse {
    0% { transform: scale(0.5); opacity: 1; }
    100% { transform: scale(1.5); opacity: 0; }
  }
`;

const RadarDot = styled.div<{ $top: string; $left: string }>`
  position: absolute;
  width: 12px;
  height: 12px;
  background: var(--color-accent);
  border-radius: 50%;
  top: ${props => props.$top};
  left: ${props => props.$left};
  box-shadow: 0 0 15px var(--color-accent);
  animation: dotPulse 2s ease-in-out infinite;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.3);
  }
  
  @keyframes dotPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
`;

const RadarCenter = styled.div`
  width: 20px;
  height: 20px;
  background: var(--color-primary);
  border-radius: 50%;
  box-shadow: 0 0 20px var(--color-primary);
  z-index: 1;
`;

const NearbyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const NearbyCard = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--corner-radius-medium);
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--color-border-hover);
    background: var(--color-surface-hover);
  }
`;

const NearbyAvatar = styled.div`
  width: 52px;
  height: 52px;
  border-radius: var(--corner-radius-round);
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  flex-shrink: 0;
`;

const NearbyInfo = styled.div`
  flex: 1;
`;

const NearbyName = styled.div`
  font-weight: 700;
  color: var(--color-text);
  font-size: 0.9rem;
`;

const NearbyStatus = styled.div`
  font-size: 0.75rem;
  color: var(--color-text-secondary);
`;

const NearbyDistance = styled.div`
  font-size: 0.75rem;
  color: var(--color-accent);
  font-weight: 700;
`;

// Profile Components
const ProfileHeader = styled.div`
  height: 140px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  border-radius: var(--corner-radius-large);
  margin: -1.5rem -1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  position: relative;
`;

const ProfileAvatar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: var(--corner-radius-round);
  background: var(--color-background);
  border: 4px solid var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  position: absolute;
  bottom: -30px;
`;

const ProfileContent = styled.div`
  padding-top: 2.5rem;
`;

const ProfileName = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-text);
  text-align: center;
  margin-bottom: 0.25rem;
`;

const ProfileBio = styled.p`
  color: var(--color-text-secondary);
  line-height: 1.5;
  font-size: 0.85rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const ProfileStats = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  padding: 1rem 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1.5rem;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--color-accent);
`;

const StatLabel = styled.div`
  font-size: 0.7rem;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
`;

const StoryGridItem = styled.div`
  aspect-ratio: 1;
  background: var(--color-surface);
  border-radius: var(--corner-radius-small);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  opacity: 0.6;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
`;

// Vault Components
const VaultGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const VaultCard = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--corner-radius-medium);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--color-border-hover);
    background: var(--color-surface-hover);
    transform: translateY(-2px);
    box-shadow: var(--elevation-medium);
  }
`;

const VaultCardIcon = styled.div`
  font-size: 2.8rem;
  margin-bottom: 0.75rem;
`;

const VaultCardLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.35rem;
`;

const VaultCardCount = styled.div`
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  font-weight: 600;
`;

const themeIcons: Record<string, string> = {
  clay: '🏺',
  moss: '🌿',
  stone: '🗿',
  ember: '🔥',
  dune: '🏜️',
  glacier: '🧊',
};

export default function Demo() {
  const { currentTheme, themeName, setTheme, timeMode, setTimeMode } = useTheme();
  const [activeTab, setActiveTab] = useState('discover');

  return (
    <>
      <Head>
        <title>UrLand - Experience Demo</title>
        <meta name="description" content="Explore UrLand's micro-blogging + travel journaling platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Header>
          <Title>UrLand Experience</Title>
          <Subtitle>Your life, journaled beautifully</Subtitle>
        </Header>

        <ModeSelector>
          <ModeButton 
            $isActive={timeMode === 'day'}
            onClick={() => setTimeMode('day')}
          >
            ☀️ Day Mode
          </ModeButton>
          <ModeButton 
            $isActive={timeMode === 'night'}
            onClick={() => setTimeMode('night')}
          >
            🌙 Night Mode
          </ModeButton>
        </ModeSelector>

        <ThemeSelector>
          <ThemeSelectorTitle>
            Choose Your Terrain
          </ThemeSelectorTitle>
          <ThemeGrid>
            {themeList.map((theme) => (
              <ThemeButton
                key={theme.id}
                $isActive={themeName === theme.id}
                $themeColor={timeMode === 'day' ? theme.colors.light.primary : theme.colors.dark.primary}
                onClick={() => setTheme(theme.id as ThemeName)}
                title={`${theme.name} - ${theme.description}`}
              >
                <ThemeIcon>{themeIcons[theme.id]}</ThemeIcon>
                <ThemeLabel>{theme.name}</ThemeLabel>
              </ThemeButton>
            ))}
          </ThemeGrid>
        </ThemeSelector>

        <PhoneFrame>
          <PhoneNotch />
          <PhoneScreen>
            <StatusBar>
              <span>9:41</span>
              <span>📶 💚 🔋</span>
            </StatusBar>
            
            <ScreenContent>
              {activeTab === 'discover' && (
                <>
                  <AppNav>
                    <AppLogo>urland</AppLogo>
                    <NavIcon>⚙️</NavIcon>
                  </AppNav>

                  <ScreenSection>
                    <SectionTitle>Discover</SectionTitle>
                    <SectionSubtitle>Explore stories from around the world</SectionSubtitle>
                    
                    <FeedCard>
                      <CardHeader>
                        <Avatar>🌸</Avatar>
                        <CardInfo>
                          <CardName>Maya Chen</CardName>
                          <CardMeta>
                            <span>2h ago</span>
                            <CardBadge>Circle</CardBadge>
                          </CardMeta>
                        </CardInfo>
                      </CardHeader>
                      <CardImage>🌄</CardImage>
                      <CardContent>
                        Sunrise hike at Griffith Observatory. The city waking up never gets old ✨
                      </CardContent>
                      <CardActions>
                        <ActionButton>❤️ 24</ActionButton>
                        <ActionButton>💬 5</ActionButton>
                        <ActionButton>🔗</ActionButton>
                      </CardActions>
                    </FeedCard>

                    <FeedCard>
                      <CardHeader>
                        <Avatar>🎨</Avatar>
                        <CardInfo>
                          <CardName>Alex Rivera</CardName>
                          <CardMeta>
                            <span>4h ago</span>
                            <CardBadge>Public</CardBadge>
                          </CardMeta>
                        </CardInfo>
                      </CardHeader>
                      <CardContent>
                        Just finished a 30-day journey through Southeast Asia. AI helped me turn 400+ photos into the perfect story collection. Link in bio! 🌏
                      </CardContent>
                      <CardActions>
                        <ActionButton>❤️ 142</ActionButton>
                        <ActionButton>💬 23</ActionButton>
                        <ActionButton>🔗</ActionButton>
                      </CardActions>
                    </FeedCard>

                    <FeedCard>
                      <CardHeader>
                        <Avatar>☕</Avatar>
                        <CardInfo>
                          <CardName>Jordan Kim</CardName>
                          <CardMeta>
                            <span>6h ago · Detroit, MI</span>
                          </CardMeta>
                        </CardInfo>
                      </CardHeader>
                      <CardImage>🏙️</CardImage>
                      <CardContent>
                        Found this incredible coffee spot in Corktown. Met 3 UrLand users IRL! 🤝
                      </CardContent>
                      <CardActions>
                        <ActionButton>❤️ 18</ActionButton>
                        <ActionButton>💬 7</ActionButton>
                        <ActionButton>🔗</ActionButton>
                      </CardActions>
                    </FeedCard>
                  </ScreenSection>
                </>
              )}

              {activeTab === 'journeys' && (
                <>
                  <AppNav>
                    <AppLogo>urland</AppLogo>
                    <NavIcon>🗺️</NavIcon>
                  </AppNav>

                  <ScreenSection>
                    <SectionTitle>Your Journeys</SectionTitle>
                    <SectionSubtitle>Places you've explored</SectionSubtitle>
                    
                    <JourneyCard>
                      <JourneyHeader>
                        🗾
                        <JourneyBadge>Active</JourneyBadge>
                      </JourneyHeader>
                      <JourneyContent>
                        <JourneyTitle>Tokyo Spring 2025</JourneyTitle>
                        <JourneyMeta>Mar 15 - Mar 29 · 14 days</JourneyMeta>
                        <JourneyStats>
                          <JourneyStat>📸 127</JourneyStat>
                          <JourneyStat>📝 18</JourneyStat>
                          <JourneyStat>📍 42</JourneyStat>
                        </JourneyStats>
                      </JourneyContent>
                    </JourneyCard>

                    <JourneyCard>
                      <JourneyHeader>
                        🏔️
                      </JourneyHeader>
                      <JourneyContent>
                        <JourneyTitle>Pacific Northwest Road Trip</JourneyTitle>
                        <JourneyMeta>Jan 10 - Jan 24 · 14 days</JourneyMeta>
                        <JourneyStats>
                          <JourneyStat>📸 243</JourneyStat>
                          <JourneyStat>📝 31</JourneyStat>
                          <JourneyStat>📍 68</JourneyStat>
                        </JourneyStats>
                      </JourneyContent>
                    </JourneyCard>

                    <JourneyCard>
                      <JourneyHeader>
                        🌊
                      </JourneyHeader>
                      <JourneyContent>
                        <JourneyTitle>Bali Surf & Culture</JourneyTitle>
                        <JourneyMeta>Nov 5 - Nov 19 · 14 days</JourneyMeta>
                        <JourneyStats>
                          <JourneyStat>📸 189</JourneyStat>
                          <JourneyStat>📝 24</JourneyStat>
                          <JourneyStat>📍 35</JourneyStat>
                        </JourneyStats>
                      </JourneyContent>
                    </JourneyCard>
                  </ScreenSection>
                </>
              )}

              {activeTab === 'connect' && (
                <>
                  <AppNav>
                    <AppLogo>urland</AppLogo>
                    <NavIcon>📡</NavIcon>
                  </AppNav>

                  <ScreenSection>
                    <SectionTitle>Nearby</SectionTitle>
                    <SectionSubtitle>People around you</SectionSubtitle>
                    
                    <RadarContainer>
                      <RadarPulse />
                      <RadarPulse style={{ animationDelay: '1s' }} />
                      <RadarPulse style={{ animationDelay: '2s' }} />
                      <RadarCenter />
                      <RadarDot $top="25%" $left="35%" />
                      <RadarDot $top="40%" $left="65%" />
                      <RadarDot $top="60%" $left="45%" />
                      <RadarDot $top="70%" $left="70%" />
                    </RadarContainer>
                  </ScreenSection>

                  <ScreenSection>
                    <SectionTitle>Discovered</SectionTitle>
                    <NearbyList>
                      <NearbyCard>
                        <NearbyAvatar>🎨</NearbyAvatar>
                        <NearbyInfo>
                          <NearbyName>Sam Torres</NearbyName>
                          <NearbyStatus>Exploring local art 🖼️</NearbyStatus>
                        </NearbyInfo>
                        <NearbyDistance>12m</NearbyDistance>
                      </NearbyCard>

                      <NearbyCard>
                        <NearbyAvatar>📸</NearbyAvatar>
                        <NearbyInfo>
                          <NearbyName>Riley Park</NearbyName>
                          <NearbyStatus>Photographer & storyteller</NearbyStatus>
                        </NearbyInfo>
                        <NearbyDistance>25m</NearbyDistance>
                      </NearbyCard>

                      <NearbyCard>
                        <NearbyAvatar>✈️</NearbyAvatar>
                        <NearbyInfo>
                          <NearbyName>Kai Martinez</NearbyName>
                          <NearbyStatus>Travel blogger</NearbyStatus>
                        </NearbyInfo>
                        <NearbyDistance>38m</NearbyDistance>
                      </NearbyCard>

                      <NearbyCard>
                        <NearbyAvatar>🎵</NearbyAvatar>
                        <NearbyInfo>
                          <NearbyName>Casey Wu</NearbyName>
                          <NearbyStatus>Music & festivals</NearbyStatus>
                        </NearbyInfo>
                        <NearbyDistance>45m</NearbyDistance>
                      </NearbyCard>
                    </NearbyList>
                  </ScreenSection>
                </>
              )}

              {activeTab === 'vault' && (
                <>
                  <AppNav>
                    <AppLogo>urland</AppLogo>
                    <NavIcon>⚙️</NavIcon>
                  </AppNav>

                  <ScreenSection>
                    <SectionTitle>Your Vault</SectionTitle>
                    <SectionSubtitle>Private archive & collections</SectionSubtitle>
                    
                    <VaultGrid>
                      <VaultCard>
                        <VaultCardIcon>📸</VaultCardIcon>
                        <VaultCardLabel>Photos</VaultCardLabel>
                        <VaultCardCount>1,247</VaultCardCount>
                      </VaultCard>
                      
                      <VaultCard>
                        <VaultCardIcon>📝</VaultCardIcon>
                        <VaultCardLabel>Notes</VaultCardLabel>
                        <VaultCardCount>89</VaultCardCount>
                      </VaultCard>
                      
                      <VaultCard>
                        <VaultCardIcon>🎵</VaultCardIcon>
                        <VaultCardLabel>Audio</VaultCardLabel>
                        <VaultCardCount>34</VaultCardCount>
                      </VaultCard>
                      
                      <VaultCard>
                        <VaultCardIcon>🎥</VaultCardIcon>
                        <VaultCardLabel>Videos</VaultCardLabel>
                        <VaultCardCount>142</VaultCardCount>
                      </VaultCard>
                      
                      <VaultCard>
                        <VaultCardIcon>🗺️</VaultCardIcon>
                        <VaultCardLabel>Maps</VaultCardLabel>
                        <VaultCardCount>23</VaultCardCount>
                      </VaultCard>
                      
                      <VaultCard>
                        <VaultCardIcon>💎</VaultCardIcon>
                        <VaultCardLabel>Collections</VaultCardLabel>
                        <VaultCardCount>12</VaultCardCount>
                      </VaultCard>
                    </VaultGrid>
                  </ScreenSection>

                  <ScreenSection>
                    <SectionTitle>Recent Captures</SectionTitle>
                    <StoryGrid>
                      <StoryGridItem>🌄</StoryGridItem>
                      <StoryGridItem>🏙️</StoryGridItem>
                      <StoryGridItem>🌊</StoryGridItem>
                      <StoryGridItem>🗾</StoryGridItem>
                      <StoryGridItem>🏔️</StoryGridItem>
                      <StoryGridItem>☕</StoryGridItem>
                      <StoryGridItem>🎨</StoryGridItem>
                      <StoryGridItem>🌸</StoryGridItem>
                      <StoryGridItem>🎵</StoryGridItem>
                      <StoryGridItem>🌆</StoryGridItem>
                      <StoryGridItem>🎭</StoryGridItem>
                      <StoryGridItem>🍜</StoryGridItem>
                    </StoryGrid>
                  </ScreenSection>

                  <ScreenSection>
                    <SectionTitle>Smart Collections</SectionTitle>
                    <SectionSubtitle>AI-organized for you</SectionSubtitle>
                    
                    <JourneyCard>
                      <JourneyHeader>
                        🌅
                        <JourneyBadge>Auto</JourneyBadge>
                      </JourneyHeader>
                      <JourneyContent>
                        <JourneyTitle>Golden Hour Moments</JourneyTitle>
                        <JourneyMeta>Last 6 months · Auto-curated</JourneyMeta>
                        <JourneyStats>
                          <JourneyStat>📸 45</JourneyStat>
                          <JourneyStat>📍 12 cities</JourneyStat>
                        </JourneyStats>
                      </JourneyContent>
                    </JourneyCard>

                    <JourneyCard>
                      <JourneyHeader>
                        🍜
                        <JourneyBadge>Auto</JourneyBadge>
                      </JourneyHeader>
                      <JourneyContent>
                        <JourneyTitle>Food Adventures</JourneyTitle>
                        <JourneyMeta>Last year · Auto-curated</JourneyMeta>
                        <JourneyStats>
                          <JourneyStat>📸 128</JourneyStat>
                          <JourneyStat>📍 24 cities</JourneyStat>
                        </JourneyStats>
                      </JourneyContent>
                    </JourneyCard>
                  </ScreenSection>
                </>
              )}
            </ScreenContent>

            <BottomNav>
              <NavButton $isActive={activeTab === 'discover'} onClick={() => setActiveTab('discover')}>
                <NavButtonIcon>🔍</NavButtonIcon>
                <NavButtonLabel>Discover</NavButtonLabel>
              </NavButton>
              
              <NavButton $isActive={activeTab === 'journeys'} onClick={() => setActiveTab('journeys')}>
                <NavButtonIcon>🧭</NavButtonIcon>
                <NavButtonLabel>Journeys</NavButtonLabel>
              </NavButton>
              
              <CaptureButton onClick={() => alert('Capture mode!')}>
                ➕
              </CaptureButton>
              
              <NavButton $isActive={activeTab === 'connect'} onClick={() => setActiveTab('connect')}>
                <NavButtonIcon>🔗</NavButtonIcon>
                <NavButtonLabel>Connect</NavButtonLabel>
              </NavButton>
              
              <NavButton $isActive={activeTab === 'vault'} onClick={() => setActiveTab('vault')}>
                <NavButtonIcon>🗄️</NavButtonIcon>
                <NavButtonLabel>Vault</NavButtonLabel>
              </NavButton>
            </BottomNav>
          </PhoneScreen>
        </PhoneFrame>
      </Container>
    </>
  );
}
