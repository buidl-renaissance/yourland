import { Theme, ColorPalette } from './types';

export const clayTheme: Theme = {
  id: 'clay',
  name: 'Clay',
  description: 'Grounded, warm, handcrafted',
  vibe: 'grounded, warm, handcrafted',
  useCase: 'journaling, storytelling, slower reflection modes',
  
  colors: {
    light: {
      primary: '#D4705B',
      secondary: '#E8D5C4',
      background: '#F5EBE0',
      backgroundGradient: 'linear-gradient(135deg, #F5EBE0 0%, #E8D5C4 100%)',
      surface: 'rgba(212, 112, 91, 0.08)',
      surfaceHover: 'rgba(212, 112, 91, 0.15)',
      accent: '#8B4513',
      text: '#3D2817',
      textSecondary: '#6B5444',
      border: 'rgba(212, 112, 91, 0.2)',
      borderHover: 'rgba(212, 112, 91, 0.4)',
    },
    dark: {
      primary: '#D4705B',
      secondary: '#8B4513',
      background: '#2A1810',
      backgroundGradient: 'linear-gradient(135deg, #2A1810 0%, #3D2817 100%)',
      surface: 'rgba(212, 112, 91, 0.15)',
      surfaceHover: 'rgba(212, 112, 91, 0.25)',
      accent: '#E8977D',
      text: '#E8D5C4',
      textSecondary: '#A08070',
      border: 'rgba(212, 112, 91, 0.3)',
      borderHover: 'rgba(212, 112, 91, 0.5)',
    },
  },
  
  elevation: {
    none: 'none',
    low: '0 2px 4px rgba(0, 0, 0, 0.2)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.15)',
    high: '0 8px 16px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2)',
    veryHigh: '0 16px 32px rgba(0, 0, 0, 0.35), 0 8px 16px rgba(0, 0, 0, 0.25)',
  },
  
  blur: {
    none: 0,
    low: 4,
    medium: 8,
    high: 12,
  },
  
  cornerRadius: {
    small: '12px',
    medium: '18px',
    large: '24px',
    round: '50px',
  },
  
  animationStyle: 'fade',
  
  ui: {
    buttonStyle: 'sculpted',
    cardStyle: 'elevated',
    shadowIntensity: 'soft',
    hasTexture: true,
    translucency: 'none',
  },
};

export const mossTheme: Theme = {
  id: 'moss',
  name: 'Moss',
  description: 'Alive, fresh, growing',
  vibe: 'alive, fresh, growing',
  useCase: 'community & connection screens, "Circles"',
  
  colors: {
    light: {
      primary: '#8BA888',
      secondary: '#A8C5A0',
      background: '#F5F7F4',
      backgroundGradient: 'linear-gradient(135deg, #F5F7F4 0%, #E8EDE7 100%)',
      surface: 'rgba(139, 168, 136, 0.1)',
      surfaceHover: 'rgba(139, 168, 136, 0.18)',
      accent: '#B8985F',
      text: '#2C3E2A',
      textSecondary: '#5A6C58',
      border: 'rgba(139, 168, 136, 0.25)',
      borderHover: 'rgba(139, 168, 136, 0.45)',
    },
    dark: {
      primary: '#8BA888',
      secondary: '#5A6C58',
      background: '#1A231A',
      backgroundGradient: 'linear-gradient(135deg, #1A231A 0%, #2C3E2A 100%)',
      surface: 'rgba(139, 168, 136, 0.15)',
      surfaceHover: 'rgba(139, 168, 136, 0.25)',
      accent: '#D4B87A',
      text: '#E8EDE7',
      textSecondary: '#9DB09A',
      border: 'rgba(139, 168, 136, 0.3)',
      borderHover: 'rgba(139, 168, 136, 0.5)',
    },
  },
  
  elevation: {
    none: 'none',
    low: '0 2px 8px rgba(0, 0, 0, 0.15)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.2)',
    high: '0 8px 20px rgba(0, 0, 0, 0.25)',
    veryHigh: '0 12px 28px rgba(0, 0, 0, 0.3)',
  },
  
  blur: {
    none: 0,
    low: 6,
    medium: 10,
    high: 16,
  },
  
  cornerRadius: {
    small: '16px',
    medium: '24px',
    large: '32px',
    round: '50px',
  },
  
  animationStyle: 'bloom',
  
  ui: {
    buttonStyle: 'rounded',
    cardStyle: 'elevated',
    shadowIntensity: 'soft',
    hasTexture: false,
    translucency: 'light',
  },
};

export const stoneTheme: Theme = {
  id: 'stone',
  name: 'Stone',
  description: 'Minimalist, modern, stoic',
  vibe: 'minimalist, modern, stoic',
  useCase: 'map, data, and archival ("Vault" / "Journeys")',
  
  colors: {
    light: {
      primary: '#B0B8C0',
      secondary: '#64707D',
      background: '#F8F9FA',
      backgroundGradient: 'linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%)',
      surface: 'rgba(176, 184, 192, 0.08)',
      surfaceHover: 'rgba(176, 184, 192, 0.15)',
      accent: '#5B89B8',
      text: '#1A1D23',
      textSecondary: '#4A525C',
      border: 'rgba(176, 184, 192, 0.3)',
      borderHover: 'rgba(91, 137, 184, 0.5)',
    },
    dark: {
      primary: '#B0B8C0',
      secondary: '#64707D',
      background: '#0F1214',
      backgroundGradient: 'linear-gradient(135deg, #0F1214 0%, #1A1D23 100%)',
      surface: 'rgba(176, 184, 192, 0.12)',
      surfaceHover: 'rgba(176, 184, 192, 0.2)',
      accent: '#7BA5D4',
      text: '#E9ECEF',
      textSecondary: '#8A95A3',
      border: 'rgba(176, 184, 192, 0.25)',
      borderHover: 'rgba(123, 165, 212, 0.5)',
    },
  },
  
  elevation: {
    none: 'none',
    low: 'none',
    medium: '0 1px 2px rgba(0, 0, 0, 0.2)',
    high: '0 2px 4px rgba(0, 0, 0, 0.25)',
    veryHigh: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  
  blur: {
    none: 0,
    low: 0,
    medium: 4,
    high: 8,
  },
  
  cornerRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    round: '50px',
  },
  
  animationStyle: 'fade',
  
  ui: {
    buttonStyle: 'sharp',
    cardStyle: 'flat',
    shadowIntensity: 'none',
    hasTexture: false,
    translucency: 'none',
  },
};

export const emberTheme: Theme = {
  id: 'ember',
  name: 'Ember',
  description: 'Creative energy, dusk, nightlife',
  vibe: 'creative energy, dusk, nightlife',
  useCase: 'events, IRL "Connect" mode, night sessions',
  
  colors: {
    light: {
      primary: '#8B5A7C',
      secondary: '#D87A5A',
      background: '#F5E6E8',
      backgroundGradient: 'linear-gradient(135deg, #F5E6E8 0%, #E8D4DB 100%)',
      surface: 'rgba(216, 122, 90, 0.1)',
      surfaceHover: 'rgba(216, 122, 90, 0.18)',
      accent: '#FF6B6B',
      text: '#3D1F2F',
      textSecondary: '#6B4A5A',
      border: 'rgba(139, 90, 124, 0.25)',
      borderHover: 'rgba(255, 107, 107, 0.4)',
    },
    dark: {
      primary: '#D87A5A',
      secondary: '#8B5A7C',
      background: '#1A1520',
      backgroundGradient: 'linear-gradient(135deg, #1A1520 0%, #2A1F2A 100%)',
      surface: 'rgba(216, 122, 90, 0.12)',
      surfaceHover: 'rgba(216, 122, 90, 0.2)',
      accent: '#FF6B6B',
      text: '#F5E6E8',
      textSecondary: '#C4A8AE',
      border: 'rgba(216, 122, 90, 0.3)',
      borderHover: 'rgba(255, 107, 107, 0.5)',
    },
  },
  
  elevation: {
    none: 'none',
    low: '0 4px 12px rgba(0, 0, 0, 0.3)',
    medium: '0 8px 20px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 107, 107, 0.15)',
    high: '0 12px 28px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 107, 107, 0.2)',
    veryHigh: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 107, 107, 0.3)',
  },
  
  blur: {
    none: 0,
    low: 8,
    medium: 12,
    high: 20,
  },
  
  cornerRadius: {
    small: '12px',
    medium: '20px',
    large: '28px',
    round: '50px',
  },
  
  animationStyle: 'glow',
  
  ui: {
    buttonStyle: 'rounded',
    cardStyle: 'glowing',
    shadowIntensity: 'strong',
    hasTexture: false,
    translucency: 'medium',
  },
};

export const duneTheme: Theme = {
  id: 'dune',
  name: 'Dune',
  description: 'Vast, reflective, cinematic',
  vibe: 'vast, reflective, cinematic',
  useCase: 'travel journaling, storytelling recaps',
  
  colors: {
    light: {
      primary: '#D4A574',
      secondary: '#E8D4B8',
      background: '#FAF6F0',
      backgroundGradient: 'linear-gradient(180deg, #E8D4B8 0%, #FAF6F0 40%, #D4A574 100%)',
      surface: 'rgba(212, 165, 116, 0.1)',
      surfaceHover: 'rgba(212, 165, 116, 0.18)',
      accent: '#B85C4F',
      text: '#3A2F26',
      textSecondary: '#6E5F52',
      border: 'rgba(212, 165, 116, 0.25)',
      borderHover: 'rgba(184, 92, 79, 0.4)',
    },
    dark: {
      primary: '#D4A574',
      secondary: '#8B6B48',
      background: '#201812',
      backgroundGradient: 'linear-gradient(180deg, #2A1F18 0%, #201812 40%, #352820 100%)',
      surface: 'rgba(212, 165, 116, 0.12)',
      surfaceHover: 'rgba(212, 165, 116, 0.2)',
      accent: '#E87D6E',
      text: '#E8D4B8',
      textSecondary: '#A08977',
      border: 'rgba(212, 165, 116, 0.3)',
      borderHover: 'rgba(232, 125, 110, 0.5)',
    },
  },
  
  elevation: {
    none: 'none',
    low: '0 4px 8px rgba(0, 0, 0, 0.15)',
    medium: '0 6px 12px rgba(0, 0, 0, 0.2)',
    high: '0 10px 20px rgba(0, 0, 0, 0.25)',
    veryHigh: '0 16px 32px rgba(0, 0, 0, 0.3)',
  },
  
  blur: {
    none: 0,
    low: 6,
    medium: 12,
    high: 20,
  },
  
  cornerRadius: {
    small: '8px',
    medium: '16px',
    large: '24px',
    round: '50px',
  },
  
  animationStyle: 'slide',
  
  ui: {
    buttonStyle: 'rounded',
    cardStyle: 'elevated',
    shadowIntensity: 'soft',
    hasTexture: true,
    translucency: 'light',
  },
};

export const glacierTheme: Theme = {
  id: 'glacier',
  name: 'Glacier',
  description: 'Clarity, minimal, futuristic',
  vibe: 'clarity, minimal, futuristic',
  useCase: 'AI curation, publishing, and "story rendering"',
  
  colors: {
    light: {
      primary: '#A8D5E2',
      secondary: '#E8F4F8',
      background: '#F5FAFB',
      backgroundGradient: 'linear-gradient(135deg, #F5FAFB 0%, #E8F4F8 100%)',
      surface: 'rgba(168, 213, 226, 0.15)',
      surfaceHover: 'rgba(168, 213, 226, 0.25)',
      accent: '#6DD5C3',
      text: '#1A2F35',
      textSecondary: '#4A6670',
      border: 'rgba(168, 213, 226, 0.3)',
      borderHover: 'rgba(109, 213, 195, 0.5)',
    },
    dark: {
      primary: '#6BA8BA',
      secondary: '#4A6670',
      background: '#0D1618',
      backgroundGradient: 'linear-gradient(135deg, #0D1618 0%, #1A2F35 100%)',
      surface: 'rgba(107, 168, 186, 0.15)',
      surfaceHover: 'rgba(107, 168, 186, 0.25)',
      accent: '#6DD5C3',
      text: '#E8F4F8',
      textSecondary: '#8BA5B0',
      border: 'rgba(107, 168, 186, 0.3)',
      borderHover: 'rgba(109, 213, 195, 0.5)',
    },
  },
  
  elevation: {
    none: 'none',
    low: '0 4px 12px rgba(0, 0, 0, 0.15)',
    medium: '0 8px 20px rgba(0, 0, 0, 0.2)',
    high: '0 12px 28px rgba(0, 0, 0, 0.25)',
    veryHigh: '0 20px 40px rgba(0, 0, 0, 0.3)',
  },
  
  blur: {
    none: 0,
    low: 10,
    medium: 20,
    high: 30,
  },
  
  cornerRadius: {
    small: '12px',
    medium: '20px',
    large: '28px',
    round: '50px',
  },
  
  animationStyle: 'slide',
  
  ui: {
    buttonStyle: 'rounded',
    cardStyle: 'floating',
    shadowIntensity: 'soft',
    hasTexture: false,
    translucency: 'heavy',
  },
};

export const themes: Record<string, Theme> = {
  clay: clayTheme,
  moss: mossTheme,
  stone: stoneTheme,
  ember: emberTheme,
  dune: duneTheme,
  glacier: glacierTheme,
};

export const themeList = Object.values(themes);
