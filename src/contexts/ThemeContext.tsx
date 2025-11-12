import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Theme, ThemeName, ColorPalette } from '@/themes/types';
import { themes } from '@/themes/terrains';

export type TimeMode = 'day' | 'night';

interface ThemeContextType {
  currentTheme: Theme;
  themeName: ThemeName;
  timeMode: TimeMode;
  currentColors: ColorPalette;
  setTheme: (themeName: ThemeName) => void;
  setTimeMode: (mode: TimeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize theme from localStorage or default to 'moss'
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('yourland-theme') as ThemeName;
      if (savedTheme && themes[savedTheme]) {
        return savedTheme;
      }
    }
    return 'moss';
  });
  
  const [timeMode, setTimeMode] = useState<TimeMode>(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('yourland-time-mode') as TimeMode;
      if (savedMode && (savedMode === 'day' || savedMode === 'night')) {
        return savedMode;
      }
    }
    return 'day';
  });
  
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('yourland-theme') as ThemeName;
      if (savedTheme && themes[savedTheme]) {
        return themes[savedTheme];
      }
    }
    return themes.moss;
  });
  
  const currentColors = timeMode === 'day' ? currentTheme.colors.light : currentTheme.colors.dark;

  // Update CSS custom properties when theme or time mode changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Colors (use current colors based on time mode)
    root.style.setProperty('--color-primary', currentColors.primary);
    root.style.setProperty('--color-secondary', currentColors.secondary);
    root.style.setProperty('--color-background', currentColors.background);
    root.style.setProperty('--color-background-gradient', currentColors.backgroundGradient);
    root.style.setProperty('--color-surface', currentColors.surface);
    root.style.setProperty('--color-surface-hover', currentColors.surfaceHover);
    root.style.setProperty('--color-accent', currentColors.accent);
    root.style.setProperty('--color-text', currentColors.text);
    root.style.setProperty('--color-text-secondary', currentColors.textSecondary);
    root.style.setProperty('--color-border', currentColors.border);
    root.style.setProperty('--color-border-hover', currentColors.borderHover);
    
    // Elevation
    root.style.setProperty('--elevation-none', currentTheme.elevation.none);
    root.style.setProperty('--elevation-low', currentTheme.elevation.low);
    root.style.setProperty('--elevation-medium', currentTheme.elevation.medium);
    root.style.setProperty('--elevation-high', currentTheme.elevation.high);
    root.style.setProperty('--elevation-very-high', currentTheme.elevation.veryHigh);
    
    // Blur
    root.style.setProperty('--blur-none', `${currentTheme.blur.none}px`);
    root.style.setProperty('--blur-low', `${currentTheme.blur.low}px`);
    root.style.setProperty('--blur-medium', `${currentTheme.blur.medium}px`);
    root.style.setProperty('--blur-high', `${currentTheme.blur.high}px`);
    
    // Corner Radius
    root.style.setProperty('--corner-radius-small', currentTheme.cornerRadius.small);
    root.style.setProperty('--corner-radius-medium', currentTheme.cornerRadius.medium);
    root.style.setProperty('--corner-radius-large', currentTheme.cornerRadius.large);
    root.style.setProperty('--corner-radius-round', currentTheme.cornerRadius.round);
    
    // Animation style
    root.style.setProperty('--animation-style', currentTheme.animationStyle);
  }, [currentTheme, currentColors, timeMode]);

  const setTheme = (newThemeName: ThemeName) => {
    if (themes[newThemeName]) {
      setThemeName(newThemeName);
      setCurrentTheme(themes[newThemeName]);
      localStorage.setItem('yourland-theme', newThemeName);
    }
  };

  const handleSetTimeMode = (mode: TimeMode) => {
    setTimeMode(mode);
    localStorage.setItem('yourland-time-mode', mode);
  };

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      themeName, 
      timeMode,
      currentColors,
      setTheme, 
      setTimeMode: handleSetTimeMode 
    }}>
      <StyledThemeProvider theme={currentTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};


