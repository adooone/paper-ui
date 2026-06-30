import { useState } from 'react';
import type { FC } from 'react';
import { Button } from '../../components/button';
import { CodeBlock } from '../../components/code-block';
import { TextureSwatches } from '../components/texture-swatches';
import { displayFonts, useFontContext } from '../font-context';
import {
  colorAccentAmber,
  colorAccentGreen,
  colorInkPrimary,
  colorInkSecondary,
  colorInkTertiary,
  colorPaperBase,
  fontFamilyHandwritten,
  fontFamilySerif,
} from '../lib/styles';
import type { TextureConfig } from '../lib/textures';

const installCode = `pnpm add @dendelion/paper-ui

yarn add @dendelion/paper-ui`;

interface WelcomePageProps {
  onNavigate: (page: 'gallery' | 'layout' | 'tokens' | 'docs') => void;
}

export const WelcomePage: FC<WelcomePageProps> = ({ onNavigate }) => {
  const { activeFont, currentFont, setActiveFont } = useFontContext();
  const [textureConfig, setTextureConfig] = useState<TextureConfig>({
    texture: 'paper',
    ruledType: 'none',
    ruledColor: 'blue',
  });

  return (
    <div
      className="min-h-[calc(100vh-80px)] flex flex-col"
      style={{ backgroundColor: colorPaperBase }}
    >
      <section className="flex-1 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(168,200,216,0.15) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(181,212,186,0.15) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(228,201,168,0.08) 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left py-16">
              <h1
                className="text-5xl sm:text-6xl md:text-7xl mb-10 tracking-tight"
                style={{
                  fontFamily: currentFont.family,
                  color: colorInkPrimary,
                  fontWeight: 700,
                }}
              >
                Dendelion UI
              </h1>

              <p
                className="text-xl sm:text-3xl mb-10 max-w-xl leading-relaxed"
                style={{
                  fontFamily: fontFamilySerif,
                  color: colorInkSecondary,
                }}
              >
                A React component library built from natural materials —
                <span style={{ color: colorAccentGreen }}> textured paper</span>,
                <span style={{ color: colorAccentGreen }}> flowing ink</span>, and
                <span style={{ color: colorAccentAmber }}> watercolor washes</span>.
              </p>

              <p
                className="mb-10 max-w-lg"
                style={{
                  fontFamily: fontFamilySerif,
                  color: colorInkTertiary,
                  fontSize: '1.35rem',
                }}
              >
                Built with TypeScript, Tailwind CSS, and SCSS modules. Warm, organic design tokens
                for interfaces that feel handcrafted.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-5 mb-16">
                <Button variant="primary" size="large" onClick={() => onNavigate('gallery')}>
                  Explore
                </Button>
                <Button variant="secondary" size="large" onClick={() => onNavigate('docs')}>
                  Documentation
                </Button>
              </div>

              <div className="max-w-md">
                <CodeBlock code={installCode} />
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-center justify-center gap-8">
              <TextureSwatches value={textureConfig} onChange={setTextureConfig} showPreview />

              <div className="w-full max-w-md">
                <p
                  className="text-sm mb-3 text-center"
                  style={{
                    fontFamily: fontFamilyHandwritten,
                    color: colorInkTertiary,
                    fontSize: '1.15rem',
                  }}
                >
                  Try a display font
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {displayFonts.map((font) => (
                    <Button
                      key={font.key}
                      variant="ghost"
                      size="small"
                      isActive={activeFont === font.key}
                      onClick={() => setActiveFont(font.key)}
                      style={{ fontFamily: font.family, fontSize: '1rem' }}
                    >
                      {font.name}
                    </Button>
                  ))}
                </div>
                <p
                  className="mt-2 text-center text-sm"
                  style={{
                    fontFamily: fontFamilySerif,
                    color: colorInkTertiary,
                  }}
                >
                  {currentFont.note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;
