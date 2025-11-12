# 🌍 YourLand Theme System — "Terrains of Expression"

A comprehensive theming system that allows users to personalize their YourLand experience through earth-based visual environments. Each theme shifts the tone through carefully crafted color palettes, lighting depth, and subtle texture or motion cues.

## 🎨 Available Themes

### 1. **Clay** 🏺
- **Vibe:** Grounded, warm, handcrafted
- **Palette:** Terracotta (#D4705B), soft beige (#E8D5C4), sandstone (#F5EBE0)
- **Accent:** Deep umber (#8B4513)
- **Use Case:** Journaling, storytelling, slower reflection modes
- **UI Personality:** 
  - Rounded corners feel sculpted
  - Soft, directional shadows
  - Buttons have slightly "pressed" clay-like depth

### 2. **Moss** 🌿
- **Vibe:** Alive, fresh, growing
- **Palette:** Sage green (#8BA888), fern (#A8C5A0), cream (#F5F7F4)
- **Accent:** Muted gold (#B8985F)
- **Use Case:** Community & connection screens, "Circles"
- **UI Personality:**
  - Light gradients with organic curves
  - Minimal shadows, slight translucency on cards
  - Animations: fade and bloom effects

### 3. **Stone** 🗿
- **Vibe:** Minimalist, modern, stoic
- **Palette:** Soft gray (#B0B8C0), slate (#64707D), off-white (#F8F9FA)
- **Accent:** Steel blue (#5B89B8)
- **Use Case:** Map, data, and archival ("Vault" / "Journeys")
- **UI Personality:**
  - Flat design with crisp contrast
  - Sharp card edges, minimal shadows
  - Hover/press feedback uses light shimmer

### 4. **Ember** 🔥
- **Vibe:** Creative energy, dusk, nightlife
- **Palette:** Dark plum (#8B5A7C), burnt orange (#D87A5A), ochre glow (#1A1520)
- **Accent:** Neon coral (#FF6B6B)
- **Use Case:** Events, IRL "Connect" mode, night sessions
- **UI Personality:**
  - Strong shadows and contrast
  - Floating cards with outer glow edges
  - Animations: pulsing, glowing transitions

### 5. **Dune** 🏜️
- **Vibe:** Vast, reflective, cinematic
- **Palette:** Tan (#D4A574), ivory (#E8D4B8), faded gold, muted sky blue (#FAF6F0)
- **Accent:** Desert red (#B85C4F)
- **Use Case:** Travel journaling, storytelling recaps
- **UI Personality:**
  - Long horizontal gradients (sunset tones)
  - Textured background (subtle noise)
  - Motion: horizon fade transitions between screens

### 6. **Glacier** 🧊
- **Vibe:** Clarity, minimal, futuristic
- **Palette:** Icy blue (#A8D5E2), fog white (#E8F4F8), graphite (#F5FAFB)
- **Accent:** Mint/turquoise (#6DD5C3)
- **Use Case:** AI curation, publishing, and "story rendering"
- **UI Personality:**
  - Glassy blur backgrounds
  - Floating layers and translucent surfaces
  - Animations: smooth slide-in, frosted opacity

## 🪶 Thematic System Tokens

Each theme is expressed through a consistent set of design tokens:

### CSS Custom Properties

```css
/* Colors */
--color-primary
--color-secondary
--color-background
--color-background-gradient
--color-surface
--color-surface-hover
--color-accent
--color-text
--color-text-secondary
--color-border
--color-border-hover

/* Elevation (Shadows) */
--elevation-none
--elevation-low
--elevation-medium
--elevation-high
--elevation-very-high

/* Blur */
--blur-none
--blur-low
--blur-medium
--blur-high

/* Corner Radius */
--corner-radius-small
--corner-radius-medium
--corner-radius-large
--corner-radius-round

/* Animation Style */
--animation-style
```

## 💻 Usage

### Basic Implementation

```typescript
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { currentTheme, themeName, setTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {currentTheme.name}</p>
      <button onClick={() => setTheme('clay')}>Switch to Clay</button>
    </div>
  );
}
```

### Using Theme Tokens in Styled Components

```typescript
import styled from 'styled-components';

const Card = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--corner-radius-medium);
  box-shadow: var(--elevation-medium);
  backdrop-filter: blur(var(--blur-low));
  
  &:hover {
    border-color: var(--color-border-hover);
    background: var(--color-surface-hover);
  }
`;
```

### Accessing Theme Properties Directly

```typescript
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { currentTheme } = useTheme();
  
  return (
    <div style={{ 
      backgroundColor: currentTheme.colors.primary,
      borderRadius: currentTheme.cornerRadius.medium 
    }}>
      Theme content
    </div>
  );
}
```

## ✨ UI Touchpoints

Different areas of the app adapt to themes in specific ways:

| Area | Thematic Expression |
|------|---------------------|
| **Home Feed** | Adapts accent + background; subtle parallax motion |
| **Capture Screen** | Adapts camera overlay color + button shadows |
| **Connect Screen** | Adapts glow intensity + radar highlight |
| **Profile / Journeys** | Adapts map coloration & ambient gradient |
| **Vault** | Desaturated, texture-light — always grounded |

## 🚀 Demo Page

Visit `/demo` to explore all themes and see how they transform different UI components and screens. The demo includes:

- Live theme switcher
- Home Feed mockup
- Capture screen interface
- Connect radar visualization
- Profile cards
- Vault grid

## 🔧 Theme Persistence

Themes are automatically saved to `localStorage` with the key `yourland-theme`. The system remembers user preferences across sessions.

## 📦 Files Structure

```
src/
├── themes/
│   ├── types.ts           # TypeScript type definitions
│   └── terrains.ts        # Theme definitions and exports
├── contexts/
│   └── ThemeContext.tsx   # Theme provider and hooks
├── components/
│   └── ThemeSwitcher.tsx  # Theme selection UI component
└── pages/
    └── demo.tsx           # Theme demonstration page

theme-tokens.json          # JSON export for external tools
```

## 🎯 Design Philosophy

The theme system follows these principles:

1. **Consistency:** All themes use the same token structure
2. **Performance:** CSS custom properties update without re-rendering
3. **Accessibility:** Color contrasts meet WCAG standards
4. **Flexibility:** Easy to add new themes or modify existing ones
5. **User Control:** Themes persist across sessions

## 🌟 Adding New Themes

To add a new theme:

1. Define the theme in `src/themes/terrains.ts`:
```typescript
export const myNewTheme: Theme = {
  id: 'mynew',
  name: 'My New Theme',
  // ... configure all properties
};
```

2. Add it to the themes object:
```typescript
export const themes: Record<string, Theme> = {
  // ... existing themes
  mynew: myNewTheme,
};
```

3. Update the `ThemeName` type in `types.ts`:
```typescript
export type ThemeName = 'clay' | 'moss' | 'stone' | 'ember' | 'dune' | 'glacier' | 'mynew';
```

## 📚 Integration Examples

### With Tailwind CSS
Export theme tokens to `tailwind.config.js` using the provided `theme-tokens.json` file.

### With Other Frameworks
The CSS custom properties work with any framework or vanilla CSS/JS.

---

**Built for YourLand** — Your space, your terrain, your expression.

