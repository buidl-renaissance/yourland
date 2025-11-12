import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@/contexts/ThemeContext';
import { themeList } from '@/themes/terrains';
import { ThemeName, ColorPalette } from '@/themes/types';

const SwitcherContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: var(--color-surface);
  backdrop-filter: blur(var(--blur-medium));
  border: 1px solid var(--color-border);
  border-radius: var(--corner-radius-medium);
  padding: 1rem;
  box-shadow: var(--elevation-high);
  
  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    padding: 0.75rem;
  }
`;

const SwitcherTitle = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--color-text-secondary);
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

const ThemeButton = styled.button<{ $isActive: boolean; $themeColor: string }>`
  width: 60px;
  height: 60px;
  border: 2px solid ${props => props.$isActive ? 'var(--color-accent)' : 'var(--color-border)'};
  border-radius: var(--corner-radius-small);
  background: ${props => props.$themeColor};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: scale(1.05);
    border-color: var(--color-accent);
    box-shadow: var(--elevation-medium);
  }
  
  ${props => props.$isActive && `
    box-shadow: 0 0 0 3px var(--color-surface), 0 0 0 5px var(--color-accent);
  `}
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const ThemeIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
`;

const ThemeLabel = styled.div`
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(0, 0, 0, 0.7);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
`;

const themeIcons: Record<string, string> = {
  clay: '🏺',
  moss: '🌿',
  stone: '🗿',
  ember: '🔥',
  dune: '🏜️',
  glacier: '🧊',
};

export const ThemeSwitcher: React.FC = () => {
  const { themeName, setTheme, currentColors } = useTheme();

  return (
    <SwitcherContainer>
      <SwitcherTitle>Terrains</SwitcherTitle>
      <ThemeGrid>
        {themeList.map((theme) => (
          <ThemeButton
            key={theme.id}
            $isActive={themeName === theme.id}
            $themeColor={currentColors.primary}
            onClick={() => setTheme(theme.id as ThemeName)}
            title={`${theme.name} - ${theme.description}`}
          >
            <ThemeIcon>{themeIcons[theme.id]}</ThemeIcon>
            <ThemeLabel>{theme.name}</ThemeLabel>
          </ThemeButton>
        ))}
      </ThemeGrid>
    </SwitcherContainer>
  );
};

