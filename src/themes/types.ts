export type AnimationStyle = 'fade' | 'slide' | 'pulse' | 'bloom' | 'glow';

export interface ColorPalette {
  primary: string;
  secondary: string;
  background: string;
  backgroundGradient: string;
  surface: string;
  surfaceHover: string;
  accent: string;
  text: string;
  textSecondary: string;
  border: string;
  borderHover: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  vibe: string;
  useCase: string;
  
  colors: {
    light: ColorPalette;
    dark: ColorPalette;
  };
  
  elevation: {
    none: string;
    low: string;
    medium: string;
    high: string;
    veryHigh: string;
  };
  
  blur: {
    none: number;
    low: number;
    medium: number;
    high: number;
  };
  
  cornerRadius: {
    small: string;
    medium: string;
    large: string;
    round: string;
  };
  
  animationStyle: AnimationStyle;
  
  ui: {
    buttonStyle: 'rounded' | 'sharp' | 'sculpted';
    cardStyle: 'flat' | 'elevated' | 'floating' | 'glowing';
    shadowIntensity: 'none' | 'soft' | 'medium' | 'strong';
    hasTexture: boolean;
    translucency: 'none' | 'light' | 'medium' | 'heavy';
  };
}

export type ThemeName = 'clay' | 'moss' | 'stone' | 'ember' | 'dune' | 'glacier';


