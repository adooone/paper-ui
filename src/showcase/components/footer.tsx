import type { FC } from 'react';
import { colorInkTertiary, colorPaperSurface, fontFamilySerif } from '../lib/styles';

export const Footer: FC = () => {
  return (
    <footer
      className="border-t border-ink-100 py-10"
      style={{ backgroundColor: colorPaperSurface }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-base" style={{ color: colorInkTertiary, fontFamily: fontFamilySerif }}>
          Paper UI — Natural Materials Component Library
        </p>
        <p className="text-base" style={{ color: colorInkTertiary, fontFamily: fontFamilySerif }}>
          v0.1.0
        </p>
      </div>
    </footer>
  );
};

export default Footer;
