import type { FC } from 'react';
import { Button } from '../../components/button';
import { colorInkPrimary, fontFamilyDisplay } from '../lib/styles';

export type Page = 'welcome' | 'gallery' | 'layout' | 'tokens' | 'docs';

interface NavProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const navItems: { id: Page; label: string }[] = [
  { id: 'welcome', label: 'Home' },
  { id: 'gallery', label: 'Components' },
  { id: 'layout', label: 'Layouts' },
  { id: 'tokens', label: 'Design Tokens' },
  { id: 'docs', label: 'Documentation' },
];

export const ShowcaseNav: FC<NavProps> = ({ currentPage, onPageChange }) => {
  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-sm border-b border-ink-100"
      style={{ backgroundColor: 'rgba(250, 248, 240, 0.95)' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex items-center justify-between h-20">
          <button
            type="button"
            onClick={() => onPageChange('welcome')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src="/img/logo.svg" alt="Paper UI logo" className="w-10 h-10" />
            <span
              className="text-xl tracking-wide"
              style={{
                fontFamily: fontFamilyDisplay,
                color: colorInkPrimary,
                fontWeight: 600,
              }}
            >
              Dendelion
            </span>
          </button>

          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="small"
                isActive={currentPage === item.id}
                onClick={() => onPageChange(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ShowcaseNav;
