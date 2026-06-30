import type { FC } from 'react';
import { CodeBlock } from '../../components/code-block';
import { Footer } from '../components/footer';
import {
  colorAccentAmber,
  colorAccentGreen,
  colorAccentRose,
  colorInkPrimary,
  colorInkSecondary,
  colorInkTertiary,
  colorPaperSurface,
  fontFamilyDisplay,
  fontFamilyMono,
  fontFamilySerif,
  paperCardStyle,
} from '../lib/styles';

interface ColorShade {
  name: string;
  value: string;
  textDark: boolean;
}

interface WatercolorShade extends ColorShade {
  light: string;
  dark: string;
}

const colors = {
  paper: {
    name: 'Paper',
    description: 'Warm off-white backgrounds with subtle grain texture',
    shades: [
      { name: '50', value: '#FDFCF8', textDark: true },
      { name: '100', value: '#FAF8F0', textDark: true },
      { name: '200', value: '#F5F1E6', textDark: true },
      { name: '300', value: '#EDE7D6', textDark: true },
      { name: '400', value: '#E0D6BF', textDark: true },
      { name: '500', value: '#D0C3A5', textDark: true },
      { name: '600', value: '#B8A98A', textDark: true },
      { name: '700', value: '#9A8B6E', textDark: true },
      { name: '800', value: '#7D7058', textDark: true },
      { name: '900', value: '#5E5343', textDark: true },
      { name: '950', value: '#3D352B', textDark: false },
    ],
  },
  ink: {
    name: 'Ink',
    description: 'Deep charcoal for text, borders, and buttons',
    shades: [
      { name: '50', value: '#F5F4F2', textDark: true },
      { name: '100', value: '#E5E3DF', textDark: true },
      { name: '200', value: '#CBC8C1', textDark: true },
      { name: '300', value: '#A8A399', textDark: true },
      { name: '400', value: '#858077', textDark: true },
      { name: '500', value: '#68635C', textDark: true },
      { name: '600', value: '#504C46', textDark: false },
      { name: '700', value: '#3D3A35', textDark: false },
      { name: '800', value: '#2B2926', textDark: false },
      { name: '900', value: '#1A1917', textDark: false },
      { name: '950', value: '#0D0C0C', textDark: false },
    ],
  },
  canvas: {
    name: 'Canvas',
    description: 'Cream-colored surfaces with visible weave texture',
    shades: [
      { name: '50', value: '#FBF9F4', textDark: true },
      { name: '100', value: '#F7F3EA', textDark: true },
      { name: '200', value: '#F0EAD8', textDark: true },
      { name: '300', value: '#E5DBC4', textDark: true },
      { name: '400', value: '#D6C9A8', textDark: true },
      { name: '500', value: '#C4B48A', textDark: true },
      { name: '600', value: '#A8986E', textDark: true },
      { name: '700', value: '#8C7D56', textDark: true },
      { name: '800', value: '#736744', textDark: true },
      { name: '900', value: '#574E36', textDark: true },
      { name: '950', value: '#383224', textDark: false },
    ],
  },
  watercolor: {
    name: 'Watercolor',
    description: 'Soft blended washes for accents and hover states',
    shades: [
      { name: 'blue', value: '#8FB996', textDark: true, light: '#B5D4BA', dark: '#5E8A66' },
      { name: 'green', value: '#8FB996', textDark: true, light: '#B5D4BA', dark: '#5E8A66' },
      { name: 'amber', value: '#D4A373', textDark: true, light: '#E4C9A8', dark: '#A67B4F' },
      { name: 'rose', value: '#C98B8B', textDark: true, light: '#DEB5B5', dark: '#9E5E5E' },
      { name: 'slate', value: '#8A9BA8', textDark: true, light: '#B0BEC8', dark: '#5E7080' },
    ],
  },
};

const typography = {
  families: [
    {
      name: 'font-display',
      font: 'Luminari',
      usage: 'Titles, buttons, headings',
      style: 'Fantasy display serif',
    },
    {
      name: 'font-default / font-serif',
      font: 'Cormorant Garamond',
      usage: 'Body text, paragraphs, nav, labels',
      style: 'Elegant, warm serif',
    },
    {
      name: 'font-mono',
      font: 'JetBrains Mono',
      usage: 'Code, technical text, stats',
      style: 'Technical, clean',
    },
  ],
  sizes: [
    { name: 'text-xs', size: '12px', rem: '0.75rem', usage: 'Captions' },
    { name: 'text-sm', size: '14px', rem: '0.875rem', usage: 'Small labels' },
    { name: 'text-base', size: '16px', rem: '1rem', usage: 'Body text' },
    { name: 'text-lg', size: '18px', rem: '1.125rem', usage: 'Button text' },
    { name: 'text-xl', size: '20px', rem: '1.25rem', usage: 'Subheadings' },
    { name: 'text-2xl', size: '24px', rem: '1.5rem', usage: 'Headings' },
    { name: 'text-3xl', size: '30px', rem: '1.875rem', usage: 'Large headings' },
    { name: 'text-4xl', size: '36px', rem: '2.25rem', usage: 'Display text' },
  ],
};

const spacing = [
  { name: '0', value: '0px', rem: '0' },
  { name: '0.5', value: '2px', rem: '0.125rem' },
  { name: '1', value: '4px', rem: '0.25rem' },
  { name: '2', value: '8px', rem: '0.5rem' },
  { name: '3', value: '12px', rem: '0.75rem' },
  { name: '4', value: '16px', rem: '1rem' },
  { name: '5', value: '20px', rem: '1.25rem' },
  { name: '6', value: '24px', rem: '1.5rem' },
  { name: '8', value: '32px', rem: '2rem' },
  { name: '10', value: '40px', rem: '2.5rem' },
  { name: '12', value: '48px', rem: '3rem' },
  { name: '16', value: '64px', rem: '4rem' },
  { name: '20', value: '80px', rem: '5rem' },
  { name: '24', value: '96px', rem: '6rem' },
];

const borderRadius = [
  { name: 'rounded-none', value: '0' },
  { name: 'rounded-sm', value: '8px' },
  { name: 'rounded-md', value: '12px' },
  { name: 'rounded-lg', value: '20px' },
  { name: 'rounded-xl', value: '28px' },
  { name: 'rounded-full', value: '9999px' },
];

const shadows = [
  {
    name: 'shadow-paper-sm',
    value: '0 1px 2px rgba(61, 53, 43, 0.08), 0 1px 1px rgba(61, 53, 43, 0.06)',
    usage: 'Subtle elevation',
  },
  {
    name: 'shadow-paper-md',
    value: '0 4px 6px rgba(61, 53, 43, 0.08), 0 2px 4px rgba(61, 53, 43, 0.06)',
    usage: 'Cards, buttons',
  },
  {
    name: 'shadow-paper-lg',
    value: '0 10px 15px rgba(61, 53, 43, 0.1), 0 4px 6px rgba(61, 53, 43, 0.08)',
    usage: 'Floating elements',
  },
  {
    name: 'shadow-pressed',
    value: 'inset 0 2px 4px rgba(61, 53, 43, 0.15)',
    usage: 'Pressed stamp effect',
  },
  {
    name: 'shadow-ink-sm',
    value: '0 1px 2px rgba(26, 25, 23, 0.12)',
    usage: 'Ink-tinted subtle shadow',
  },
];

const ColorSwatch: FC<{ name: string; value: string; textDark: boolean }> = ({
  name,
  value,
  textDark,
}) => (
  <div
    className="rounded-lg p-3 flex flex-col justify-between h-20"
    style={{ backgroundColor: value }}
  >
    <span
      className={`text-xs font-medium ${textDark ? 'text-black/60' : 'text-white/60'}`}
      style={{ fontFamily: fontFamilyMono }}
    >
      {name}
    </span>
    <span
      className={`text-xs font-mono ${textDark ? 'text-black/80' : 'text-white/80'}`}
      style={{ fontFamily: fontFamilyMono }}
    >
      {value}
    </span>
  </div>
);

export const TokensPage: FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16">
      <div className="mb-16">
        <h1
          className="text-5xl font-bold mb-6"
          style={{
            fontFamily: fontFamilyDisplay,
            color: colorInkPrimary,
            fontWeight: 700,
          }}
        >
          Design Tokens
        </h1>
        <p
          className="text-lg"
          style={{
            fontFamily: fontFamilySerif,
            color: colorInkSecondary,
            fontSize: '1.35rem',
          }}
        >
          Complete reference for Paper UI's design system tokens including colors, typography,
          spacing, and more.
        </p>
      </div>

      <div className="space-y-20">
        <section>
          <div className="mb-10">
            <h2
              className="text-3xl font-bold mb-3"
              style={{
                fontFamily: fontFamilyDisplay,
                color: colorInkPrimary,
                fontWeight: 700,
              }}
            >
              Colors
            </h2>
            <p
              style={{
                fontFamily: fontFamilySerif,
                color: colorInkSecondary,
                fontSize: '1.35rem',
              }}
            >
              Nature-inspired color palette with semantic naming. Each color has a full 50–950
              scale.
            </p>
          </div>

          <div className="space-y-10">
            {Object.entries(colors).map(([key, color]) => (
              <div key={key} className="rounded-xl p-10 border" style={paperCardStyle}>
                <div className="mb-6">
                  <h3
                    className="text-lg font-semibold capitalize"
                    style={{
                      fontFamily: fontFamilySerif,
                      color: colorInkPrimary,
                      fontWeight: 600,
                    }}
                  >
                    {color.name}
                  </h3>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: fontFamilySerif,
                      color: colorInkTertiary,
                    }}
                  >
                    {color.description}
                  </p>
                </div>
                {key === 'watercolor' ? (
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-5">
                    {(color.shades as WatercolorShade[]).map((shade) => (
                      <div key={shade.name} className="space-y-2">
                        <ColorSwatch
                          name={`${shade.name}`}
                          value={shade.value}
                          textDark={shade.textDark}
                        />
                        <ColorSwatch
                          name={`${shade.name}-light`}
                          value={shade.light}
                          textDark={shade.textDark}
                        />
                        <ColorSwatch
                          name={`${shade.name}-dark`}
                          value={shade.dark}
                          textDark={!shade.textDark}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-5">
                    {(color.shades as ColorShade[]).map((shade) => (
                      <ColorSwatch
                        key={shade.name}
                        name={`${key}-${shade.name}`}
                        value={shade.value}
                        textDark={shade.textDark}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <CodeBlock
              filename="example.tsx"
              code={`// Using colors in Tailwind classes
<div className="bg-paper-50 text-ink-900">
  <p className="text-watercolor-rose">Warning message</p>
  <span className="bg-canvas-200">Highlighted</span>
</div>`}
            />
          </div>
        </section>

        <section>
          <div className="mb-10">
            <h2
              className="text-3xl font-bold mb-3"
              style={{
                fontFamily: fontFamilyDisplay,
                color: colorInkPrimary,
                fontWeight: 700,
              }}
            >
              Typography
            </h2>
            <p
              style={{
                fontFamily: fontFamilySerif,
                color: colorInkSecondary,
                fontSize: '1.35rem',
              }}
            >
              Two primary font families — Luminari for display and Cormorant Garamond for body text.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="rounded-xl p-10 border" style={paperCardStyle}>
              <h3
                className="text-lg font-semibold mb-6"
                style={{
                  fontFamily: fontFamilySerif,
                  color: colorInkPrimary,
                  fontWeight: 600,
                }}
              >
                Font Families
              </h3>
              <div className="space-y-10">
                {typography.families.map((font) => (
                  <div
                    key={font.name}
                    className="py-3 border-b last:border-0"
                    style={{ borderColor: 'rgba(61, 53, 43, 0.08)' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <code
                        className="text-xs font-mono"
                        style={{
                          color: '#5E8A66',
                          fontFamily: fontFamilyMono,
                        }}
                      >
                        {font.name}
                      </code>
                      <span
                        className="text-xs"
                        style={{
                          color: colorInkTertiary,
                          fontFamily: fontFamilySerif,
                        }}
                      >
                        {font.font}
                      </span>
                    </div>
                    <p
                      className="text-xl mb-1"
                      style={{
                        fontFamily:
                          font.font === 'Luminari'
                            ? "'Luminari', serif"
                            : font.font === 'Cormorant Garamond'
                              ? "'Cormorant Garamond', serif"
                              : "'JetBrains Mono', monospace",
                        color: colorInkPrimary,
                      }}
                    >
                      The quick brown fox
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span
                        style={{
                          color: colorInkSecondary,
                          fontFamily: fontFamilySerif,
                        }}
                      >
                        {font.usage}
                      </span>
                      <span
                        style={{
                          color: colorInkTertiary,
                          fontFamily: fontFamilySerif,
                        }}
                      >
                        {font.style}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-10 border" style={paperCardStyle}>
              <h3
                className="text-lg font-semibold mb-6"
                style={{
                  fontFamily: fontFamilySerif,
                  color: colorInkPrimary,
                  fontWeight: 600,
                }}
              >
                Type Scale
              </h3>
              <div className="space-y-3">
                {typography.sizes.map((size) => (
                  <div key={size.name} className="flex items-center justify-between">
                    <span
                      className="text-ink-900"
                      style={{
                        fontSize: size.rem,
                        fontFamily: fontFamilySerif,
                      }}
                    >
                      Aa
                    </span>
                    <div className="text-right">
                      <code
                        className="text-xs font-mono"
                        style={{
                          color: '#5E8A66',
                          fontFamily: fontFamilyMono,
                        }}
                      >
                        {size.name}
                      </code>
                      <span
                        className="text-xs ml-2"
                        style={{
                          color: colorInkTertiary,
                          fontFamily: fontFamilySerif,
                        }}
                      >
                        {size.size}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <CodeBlock
              filename="example.tsx"
              code={`// Typography classes
<h1 className="font-display text-3xl">Display Heading</h1>
<p className="font-serif text-base">Body text in serif</p>
<button className="font-handwritten text-lg">Button Label</button>
<code className="font-mono text-xs">code snippet</code>`}
            />
          </div>
        </section>

        <section>
          <div className="mb-10">
            <h2
              className="text-3xl font-bold mb-3"
              style={{
                fontFamily: fontFamilyDisplay,
                color: colorInkPrimary,
                fontWeight: 700,
              }}
            >
              Spacing
            </h2>
            <p
              style={{
                fontFamily: fontFamilySerif,
                color: colorInkSecondary,
                fontSize: '1.35rem',
              }}
            >
              4px-based spacing scale for consistent layouts.
            </p>
          </div>

          <div className="rounded-xl p-10 border" style={paperCardStyle}>
            <div className="space-y-3">
              {spacing.map((space) => (
                <div key={space.name} className="flex items-center gap-5">
                  <code
                    className="w-16 text-xs font-mono"
                    style={{
                      color: '#5E8A66',
                      fontFamily: fontFamilyMono,
                    }}
                  >
                    {space.name}
                  </code>
                  <div
                    className="h-4 rounded"
                    style={{
                      width: space.value === '0px' ? '4px' : space.value,
                      backgroundColor: 'rgba(123, 167, 188, 0.3)',
                    }}
                  />
                  <span
                    className="text-xs"
                    style={{
                      color: colorInkTertiary,
                      fontFamily: fontFamilySerif,
                    }}
                  >
                    {space.rem} ({space.value})
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <CodeBlock
              filename="example.tsx"
              code={`// Spacing classes
<div className="p-4 m-2 gap-5">
  <div className="px-6 py-4">Content with padding</div>
  <div className="space-y-2">Stacked items</div>
</div>`}
            />
          </div>
        </section>

        <section>
          <div className="mb-10">
            <h2
              className="text-3xl font-bold mb-3"
              style={{
                fontFamily: fontFamilyDisplay,
                color: colorInkPrimary,
                fontWeight: 700,
              }}
            >
              Border Radius
            </h2>
            <p
              style={{
                fontFamily: fontFamilySerif,
                color: colorInkSecondary,
                fontSize: '1.35rem',
              }}
            >
              Consistent corner rounding for different element types.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {borderRadius.map((radius) => (
              <div
                key={radius.name}
                className="rounded-xl p-4 border text-center"
                style={paperCardStyle}
              >
                <div className="relative h-24 mx-auto mb-3 flex items-center justify-center">
                  <div
                    className="w-20 h-20"
                    style={{
                      borderRadius: radius.value,
                      background: 'linear-gradient(135deg, #B5D4BA, #8FB996)',
                    }}
                  />
                </div>
                <code
                  className="text-xs font-mono block mb-1"
                  style={{
                    color: '#5E8A66',
                    fontFamily: fontFamilyMono,
                  }}
                >
                  {radius.name}
                </code>
                <span
                  className="text-xs"
                  style={{
                    color: colorInkTertiary,
                    fontFamily: fontFamilySerif,
                  }}
                >
                  {radius.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <CodeBlock
              filename="example.tsx"
              code={`// Border radius classes
<button className="rounded-full">Pill Button</button>
<div className="rounded-xl">Card Container</div>
<span className="rounded-md">Tag</span>`}
            />
          </div>
        </section>

        <section>
          <div className="mb-10">
            <h2
              className="text-3xl font-bold mb-3"
              style={{
                fontFamily: fontFamilyDisplay,
                color: colorInkPrimary,
                fontWeight: 700,
              }}
            >
              Shadows
            </h2>
            <p
              style={{
                fontFamily: fontFamilySerif,
                color: colorInkSecondary,
                fontSize: '1.35rem',
              }}
            >
              Elevation system for depth and hierarchy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {shadows.map((shadow) => (
              <div
                key={shadow.name}
                className="rounded-xl p-10 border"
                style={{
                  backgroundColor: '#FDFCF8',
                  borderColor: 'rgba(61, 53, 43, 0.12)',
                  boxShadow: shadow.value,
                }}
              >
                <code
                  className="text-xs font-mono block mb-1"
                  style={{
                    color: '#5E8A66',
                    fontFamily: fontFamilyMono,
                  }}
                >
                  {shadow.name}
                </code>
                <p
                  className="text-xs"
                  style={{
                    color: colorInkTertiary,
                    fontFamily: fontFamilySerif,
                  }}
                >
                  {shadow.usage}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <CodeBlock
              filename="example.tsx"
              code={`// Shadow classes
<div className="shadow-paper-sm">Subtle elevation</div>
<div className="shadow-paper-md">Card default</div>
<div className="shadow-pressed">Pressed stamp</div>`}
            />
          </div>
        </section>

        <section>
          <div className="mb-10">
            <h2
              className="text-3xl font-bold mb-3"
              style={{
                fontFamily: fontFamilyDisplay,
                color: colorInkPrimary,
                fontWeight: 700,
              }}
            >
              Quick Reference
            </h2>
            <p
              style={{
                fontFamily: fontFamilySerif,
                color: colorInkSecondary,
                fontSize: '1.35rem',
              }}
            >
              Common utility classes and their purposes.
            </p>
          </div>

          <div className="rounded-xl p-10 border" style={paperCardStyle}>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h4
                  className="text-sm font-medium mb-3"
                  style={{
                    fontFamily: fontFamilySerif,
                    color: colorInkPrimary,
                    fontWeight: 600,
                  }}
                >
                  Semantic Colors
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: colorAccentGreen }}
                    />
                    <code
                      style={{
                        color: '#5E8A66',
                        fontFamily: fontFamilyMono,
                        fontSize: '0.95rem',
                      }}
                    >
                      watercolor-blue
                    </code>
                    <span
                      style={{
                        color: colorInkSecondary,
                        fontFamily: fontFamilySerif,
                      }}
                    >
                      - Calm, primary accent
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: colorAccentGreen }}
                    />
                    <code
                      style={{
                        color: '#5E8A66',
                        fontFamily: fontFamilyMono,
                        fontSize: '0.95rem',
                      }}
                    >
                      watercolor-green
                    </code>
                    <span
                      style={{
                        color: colorInkSecondary,
                        fontFamily: fontFamilySerif,
                      }}
                    >
                      - Success, growth
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: colorAccentAmber }}
                    />
                    <code
                      style={{
                        color: '#A67B4F',
                        fontFamily: fontFamilyMono,
                        fontSize: '0.95rem',
                      }}
                    >
                      watercolor-amber
                    </code>
                    <span
                      style={{
                        color: colorInkSecondary,
                        fontFamily: fontFamilySerif,
                      }}
                    >
                      - Warm highlight
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: colorAccentRose }}
                    />
                    <code
                      style={{
                        color: '#9E5E5E',
                        fontFamily: fontFamilyMono,
                        fontSize: '0.95rem',
                      }}
                    >
                      watercolor-rose
                    </code>
                    <span
                      style={{
                        color: colorInkSecondary,
                        fontFamily: fontFamilySerif,
                      }}
                    >
                      - Danger, attention
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h4
                  className="text-sm font-medium mb-3"
                  style={{
                    fontFamily: fontFamilySerif,
                    color: colorInkPrimary,
                    fontWeight: 600,
                  }}
                >
                  Common Patterns
                </h4>
                <ul className="space-y-2 text-sm">
                  <li
                    style={{
                      fontFamily: fontFamilySerif,
                      color: colorInkSecondary,
                    }}
                  >
                    <code
                      style={{
                        color: '#5E8A66',
                        fontFamily: fontFamilyMono,
                        fontSize: '0.95rem',
                      }}
                    >
                      bg-paper-50
                    </code>{' '}
                    - Page backgrounds
                  </li>
                  <li
                    style={{
                      fontFamily: fontFamilySerif,
                      color: colorInkSecondary,
                    }}
                  >
                    <code
                      style={{
                        color: '#5E8A66',
                        fontFamily: fontFamilyMono,
                        fontSize: '0.95rem',
                      }}
                    >
                      border-ink-100
                    </code>{' '}
                    - Subtle borders
                  </li>
                  <li
                    style={{
                      fontFamily: fontFamilySerif,
                      color: colorInkSecondary,
                    }}
                  >
                    <code
                      style={{
                        color: '#5E8A66',
                        fontFamily: fontFamilyMono,
                        fontSize: '0.95rem',
                      }}
                    >
                      text-ink-600
                    </code>{' '}
                    - Secondary text
                  </li>
                  <li
                    style={{
                      fontFamily: fontFamilySerif,
                      color: colorInkSecondary,
                    }}
                  >
                    <code
                      style={{
                        color: '#5E8A66',
                        fontFamily: fontFamilyMono,
                        fontSize: '0.95rem',
                      }}
                    >
                      rounded-md
                    </code>{' '}
                    - Ink-bleed corners
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-10">
            <h2
              className="text-3xl font-bold mb-3"
              style={{
                fontFamily: fontFamilyDisplay,
                color: colorInkPrimary,
                fontWeight: 700,
              }}
            >
              Textures
            </h2>
            <p
              style={{
                fontFamily: fontFamilySerif,
                color: colorInkSecondary,
                fontSize: '1.25rem',
              }}
            >
              SVG-generated surface textures — no external image files. Each uses feTurbulence,
              feColorMatrix, and CSS gradients for paper-like, canvas, and organic effects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'bg-white-texture',
                bg: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='white'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.97 0 0 0 0 0.96 0 0 0 0 0.95 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23white)' opacity='1'/%3E%3C/svg%3E\")",
                color: '#FDFCFA',
                note: 'Bright white — clean sheet',
              },
              {
                name: 'bg-paper-texture',
                bg: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E\")",
                color: '#FAF8F0',
                note: 'Fine grain — default page background',
              },
              {
                name: 'bg-parchment-texture',
                bg: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='parchment'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23parchment)' opacity='0.25'/%3E%3C/svg%3E\")",
                color: '#F5F1E6',
                note: 'Aged, warm yellowed grain',
              },
              {
                name: 'bg-watercolor-paper',
                bg: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='wc'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.04' numOctaves='3' seed='5'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='linear' slope='0.3' intercept='0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wc)' opacity='0.08'/%3E%3C/svg%3E\")",
                color: '#FBF9F4',
                note: 'Organic splotchy watercolor surface',
              },
              {
                name: 'bg-kraft-texture',
                bg: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='kraft'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0.8 0.6 0.4 0 0  0.5 0.4 0.2 0 0  0.3 0.2 0.1 0 0  0 0 0 0.12 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23kraft)' opacity='0.4'/%3E%3C/svg%3E\")",
                color: '#E5DBC4',
                note: 'Rough cardboard / kraft paper',
              },
              {
                name: 'bg-speckle-texture',
                bg: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='speckle'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.3  0 0 0 0 0.25  0 0 0 0 0.2  0 0 0 0.25 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23speckle)' opacity='0.35'/%3E%3C/svg%3E\")",
                color: '#FAF8F0',
                note: 'Fine dust particles — old book feel',
              },
              {
                name: 'bg-white-texture',
                bg: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='white'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.97 0 0 0 0 0.96 0 0 0 0 0.95 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23white)' opacity='1'/%3E%3C/svg%3E\")",
                color: '#FDFCFA',
                note: 'Bright white — clean sheet',
              },
              {
                name: 'bg-linen-texture',
                bg: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='linen'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.2 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23linen)' opacity='0.15'/%3E%3C/svg%3E\")",
                color: '#F7F3EA',
                note: 'Fabric crosshatch — linen canvas',
              },
              {
                name: 'bg-grunge-texture',
                bg: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grunge'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='5' seed='12'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='40'/%3E%3CfeGaussianBlur stdDeviation='2'/%3E%3CfeColorMatrix type='matrix' values='0.3 0.2 0.1 0 0  0.3 0.2 0.1 0 0  0.3 0.2 0.1 0 0  0 0 0 0.15 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23E5E3DF' filter='url(%23grunge)' opacity='0.3'/%3E%3C/svg%3E\")",
                color: '#E5E3DF',
                note: 'Ink blot / distressed overlay',
              },
              {
                name: 'bg-canvas-weave',
                bg: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 3px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 3px)',
                color: '#F0EAD8',
                note: 'CSS crosshatch — canvas weave',
              },
            ].map((texture) => (
              <div
                key={texture.name}
                className="rounded-2xl border overflow-hidden"
                style={{ borderColor: 'rgba(61, 53, 43, 0.12)' }}
              >
                <div
                  className="h-40 flex items-center justify-center"
                  style={{
                    backgroundColor: texture.color,
                    backgroundImage: texture.bg,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '200px 200px',
                  }}
                >
                  <span
                    className="text-2xl"
                    style={{
                      fontFamily: "'Luminari', serif",
                      color: colorInkPrimary,
                      opacity: 0.4,
                    }}
                  >
                    Aa
                  </span>
                </div>
                <div className="p-5">
                  <code
                    className="text-sm font-mono block mb-2"
                    style={{
                      color: '#5E8A66',
                      fontFamily: fontFamilyMono,
                    }}
                  >
                    {texture.name}
                  </code>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: fontFamilySerif,
                      color: colorInkSecondary,
                    }}
                  >
                    {texture.note}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <CodeBlock
              filename="example.tsx"
              code={`// Using textures in Tailwind classes
<div className="bg-paper-texture">Fine grain page</div>
<div className="bg-parchment-texture">Aged parchment card</div>
<div className="bg-watercolor-paper">Organic surface</div>
<div className="bg-kraft-texture">Rough cardboard</div>
<div className="bg-speckle-texture">Old book feel</div>
<div className="bg-white-texture">Bright white</div>
<div className="bg-linen-texture">Fabric canvas</div>
<div className="bg-grunge-texture">Distressed overlay</div>`}
            />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default TokensPage;
