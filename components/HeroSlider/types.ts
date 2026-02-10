import type { CSSProperties } from 'react';

export type HeroSlide = {
  id: string;
  eyebrow?: string;
  title: string;
  highlightWords?: string[];
  description: string;
  cta: {
    label: string;
    href: string;
    variant?: 'solid' | 'outline';
  };
  visual:
    | { type: 'image'; src: string; alt: string }
    | { type: 'video'; src: string; poster?: string; muted?: boolean; loop?: boolean };
  theme: {
    gradientFrom: string;
    gradientTo: string;
    accent: string;
    text: string;
    buttonBg: string;
    buttonText: string;
    navBg?: string;
    glow?: string;
  };
};

export type HeroSliderProps = {
  slides: HeroSlide[];
  autoPlay?: boolean;
  intervalMs?: number;
  showNav?: boolean;
  initialIndex?: number;
  helperText?: string;
  onSlideChange?: (index: number) => void;
};

export type HeroSliderThemeVars = CSSProperties & {
  '--hs-from': string;
  '--hs-to': string;
  '--hs-accent': string;
  '--hs-text': string;
  '--hs-glow': string;
  '--hs-btn-bg': string;
  '--hs-btn-text': string;
  '--hs-nav-bg': string;
};
