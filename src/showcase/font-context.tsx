import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type DisplayFontKey = 'cormorant' | 'luminari' | 'cinzel' | 'almendra';

export interface DisplayFont {
  name: string;
  key: DisplayFontKey;
  family: string;
  note: string;
}

export const displayFonts: DisplayFont[] = [
  {
    name: 'Cormorant Garamond',
    key: 'cormorant',
    family: "'Cormorant Garamond', serif",
    note: 'Current — elegant, warm serif',
  },
  {
    name: 'Luminari',
    key: 'luminari',
    family: "'Luminari', serif",
    note: 'Fantasy, storybook display (local WOFF)',
  },
  {
    name: 'Cinzel Decorative',
    key: 'cinzel',
    family: "'Cinzel Decorative', serif",
    note: 'Ornate, medieval-inspired caps',
  },
  {
    name: 'Almendra Display',
    key: 'almendra',
    family: "'Almendra Display', serif",
    note: 'Fantasy, storybook feel',
  },
];

interface FontContextValue {
  activeFont: DisplayFontKey;
  currentFont: DisplayFont;
  setActiveFont: (key: DisplayFontKey) => void;
}

const FontContext = createContext<FontContextValue | null>(null);

export function useFontContext(): FontContextValue {
  const ctx = useContext(FontContext);
  if (!ctx) {
    throw new Error('useFontContext must be used within a FontProvider');
  }
  return ctx;
}

interface FontProviderProps {
  children: ReactNode;
}

export function FontProvider({ children }: FontProviderProps) {
  const [activeFont, setActiveFontState] = useState<DisplayFontKey>('luminari');

  const currentFont = displayFonts.find((f) => f.key === activeFont) ?? displayFonts[0];

  const setActiveFont = useCallback((key: DisplayFontKey) => {
    setActiveFontState(key);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--paper-button-font', currentFont.family);
  }, [currentFont.family]);

  return (
    <FontContext.Provider value={{ activeFont, currentFont, setActiveFont }}>
      {children}
    </FontContext.Provider>
  );
}
