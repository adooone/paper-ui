import type { FC } from 'react';
import { Button } from '../../components/button';
import { CodeBlock } from '../../components/code-block';
import type { PropDef } from '../../components/prop-table';
import { PropTable } from '../../components/prop-table';
import { Stamp } from '../../components/stamp';
import { Footer } from '../components/footer';
import { categoryColors } from '../lib/category-colors';
import {
  colorAccentGreen,
  colorAccentGreenDark,
  colorAccentRose,
  colorInkPrimary,
  colorInkSecondary,
  colorPaperSurface,
  fontFamilyDisplay,
  fontFamilyMono,
  fontFamilySerif,
  paperCardStyle,
} from '../lib/styles';

const quickStartCode = `// 1. Install the package
pnpm add @dendelion/paper-ui

// 2. Import the Tailwind preset
import { paperPreset } from '@dendelion/paper-ui/tailwind';

// 3. Update tailwind.config.js
export default {
  presets: [paperPreset],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
};

// 4. Import global styles in your app entry
import '@dendelion/paper-ui';`;

const usageExample = `import { Button, Page, Layout } from '@dendelion/paper-ui';

function App() {
  return (
    <Layout title="My App" navigationItems={[...]}>
      <Page withAccent accentColor="green">
        <Button variant="primary">Get Started</Button>
      </Page>
    </Layout>
  );
}`;

const componentList: Array<{
  name: string;
  category: string;
  description: string;
  props: PropDef[];
}> = [
  {
    name: 'Button',
    category: 'Basic',
    description: 'Interactive button with paper texture and watercolor wash.',
    props: [
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'ghost' | 'danger'",
        default: "'primary'",
        description: 'Visual style variant',
      },
      {
        name: 'size',
        type: "'small' | 'medium' | 'large'",
        default: "'medium'",
        description: 'Button size',
      },
      {
        name: 'icon',
        type: 'ReactNode',
        description: 'Left icon element',
      },
      {
        name: 'iconRight',
        type: 'ReactNode',
        description: 'Right icon element',
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        description: 'Expand to full width',
      },
      { name: 'onClick', type: '() => void', description: 'Click handler' },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disable button',
      },
    ],
  },
  {
    name: 'IconButton',
    category: 'Basic',
    description: 'Circular canvas patch button for icon content.',
    props: [
      {
        name: 'icon',
        type: 'ReactNode',
        required: true,
        description: 'Icon content',
      },
      {
        name: 'variant',
        type: "'default' | 'ghost' | 'danger'",
        default: "'default'",
        description: 'Visual style',
      },
      {
        name: 'size',
        type: "'small' | 'medium' | 'large'",
        default: "'medium'",
        description: 'Button size',
      },
      {
        name: 'label',
        type: 'string',
        description: 'Accessibility label',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disable button',
      },
    ],
  },
  {
    name: 'Checkbox',
    category: 'Form',
    description: 'Hand-drawn checkbox with SVG stroke animation.',
    props: [
      {
        name: 'checked',
        type: 'boolean',
        required: true,
        description: 'Checked state',
      },
      {
        name: 'onChange',
        type: '(e: ChangeEvent) => void',
        required: true,
        description: 'Change handler',
      },
      { name: 'label', type: 'string', description: 'Checkbox label' },
      {
        name: 'labelPosition',
        type: "'left' | 'right'",
        default: "'right'",
        description: 'Label position',
      },
      {
        name: 'indeterminate',
        type: 'boolean',
        default: 'false',
        description: 'Indeterminate state',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disable checkbox',
      },
    ],
  },
  {
    name: 'Page',
    category: 'Layout',
    description: 'Content wrapper with paper texture and watercolor accent.',
    props: [
      {
        name: 'withTexture',
        type: 'boolean',
        default: 'true',
        description: 'Show paper grain texture',
      },
      {
        name: 'withAccent',
        type: 'boolean',
        default: 'false',
        description: 'Show watercolor accent blob',
      },
      {
        name: 'accentColor',
        type: "'blue' | 'green' | 'amber' | 'rose' | 'slate'",
        default: "'blue'",
        description: 'Accent blob color',
      },
    ],
  },
  {
    name: 'Layout',
    category: 'Layout',
    description: 'Page shell with sidebar, header, and content area.',
    props: [
      { name: 'title', type: 'string', description: 'Header title' },
      { name: 'subtitle', type: 'string', description: 'Header subtitle' },
      {
        name: 'navigationItems',
        type: 'NavigationItem[]',
        description: 'Sidebar navigation items',
      },
      {
        name: 'activeItemId',
        type: 'string',
        description: 'Active navigation item ID',
      },
      {
        name: 'onNavigate',
        type: '(item: NavigationItem) => void',
        description: 'Navigation handler',
      },
      {
        name: 'headerActions',
        type: 'ReactNode',
        description: 'Header action elements',
      },
    ],
  },
];

const categories = ['Basic', 'Form', 'Layout'];

export const DocsPage: FC = () => {
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
          Documentation
        </h1>
        <p
          className="text-lg"
          style={{
            fontFamily: fontFamilySerif,
            color: colorInkSecondary,
            fontSize: '1.35rem',
          }}
        >
          Complete API reference for all Paper UI components including props, usage examples, and
          installation instructions.
        </p>
      </div>

      <div className="space-y-20">
        <section>
          <h2
            className="text-3xl font-bold mb-6"
            style={{
              fontFamily: fontFamilyDisplay,
              color: colorInkPrimary,
              fontWeight: 700,
            }}
          >
            Installation
          </h2>
          <p
            className="mb-10"
            style={{
              fontFamily: fontFamilySerif,
              color: colorInkSecondary,
              fontSize: '1.35rem',
            }}
          >
            Get started with Paper UI in your React project.
          </p>
          <CodeBlock filename="setup.sh" code={quickStartCode} />
        </section>

        <section>
          <h2
            className="text-3xl font-bold mb-6"
            style={{
              fontFamily: fontFamilyDisplay,
              color: colorInkPrimary,
              fontWeight: 700,
            }}
          >
            Basic Usage
          </h2>
          <p
            className="mb-10"
            style={{
              fontFamily: fontFamilySerif,
              color: colorInkSecondary,
              fontSize: '1.35rem',
            }}
          >
            Import and use components in your React application.
          </p>
          <CodeBlock filename="App.tsx" code={usageExample} />
        </section>

        <section>
          <h2
            className="text-3xl font-bold mb-10"
            style={{
              fontFamily: fontFamilyDisplay,
              color: colorInkPrimary,
              fontWeight: 700,
            }}
          >
            Component API Reference
          </h2>

          {categories.map((category) => {
            const components = componentList.filter((c) => c.category === category);
            if (components.length === 0) return null;

            return (
              <div key={category} className="mb-16">
                <div className="flex items-center gap-5 mb-10">
                  <h3
                    className="text-xl font-semibold"
                    style={{
                      fontFamily: fontFamilySerif,
                      color: colorInkPrimary,
                      fontWeight: 600,
                    }}
                  >
                    {category}
                  </h3>
                  <Stamp
                    size="small"
                    fillColor={categoryColors[category.toLowerCase()].bg}
                    textColor={categoryColors[category.toLowerCase()].text}
                  >
                    {components.length} components
                  </Stamp>
                </div>

                <div className="space-y-10">
                  {components.map((component) => (
                    <div
                      key={component.name}
                      id={component.name.toLowerCase()}
                      className="rounded-xl p-10 border scroll-mt-24"
                      style={paperCardStyle}
                    >
                      <div className="mb-6">
                        <code
                          className="text-lg font-mono"
                          style={{
                            color: colorAccentGreenDark,
                            fontFamily: fontFamilyMono,
                          }}
                        >
                          {component.name}
                        </code>
                        <p
                          className="mt-1"
                          style={{
                            fontFamily: fontFamilySerif,
                            color: colorInkSecondary,
                            fontSize: '1.35rem',
                          }}
                        >
                          {component.description}
                        </p>
                      </div>
                      <PropTable props={component.props} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <section>
          <h2
            className="text-3xl font-bold mb-6"
            style={{
              fontFamily: fontFamilyDisplay,
              color: colorInkPrimary,
              fontWeight: 700,
            }}
          >
            Best Practices
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="rounded-xl p-10 border" style={paperCardStyle}>
              <h3
                className="text-lg font-semibold mb-3"
                style={{
                  fontFamily: fontFamilySerif,
                  color: '#5E8A66',
                  fontWeight: 600,
                }}
              >
                Do
              </h3>
              <ul
                className="space-y-2 text-sm"
                style={{
                  fontFamily: fontFamilySerif,
                  color: colorInkSecondary,
                  fontSize: '1.125rem',
                }}
              >
                <li className="flex items-start gap-2">
                  <span style={{ color: colorAccentGreen }}>✓</span>
                  Use primary buttons for main actions, secondary for alternatives
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: colorAccentGreen }}>✓</span>
                  Keep button labels concise (1–3 words)
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: colorAccentGreen }}>✓</span>
                  Wrap page content with Page for consistent paper texture
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: colorAccentGreen }}>✓</span>
                  Include labels for checkboxes
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: colorAccentGreen }}>✓</span>
                  Use consistent spacing and the paper color palette
                </li>
              </ul>
            </div>

            <div className="rounded-xl p-10 border" style={paperCardStyle}>
              <h3
                className="text-lg font-semibold mb-3"
                style={{
                  fontFamily: fontFamilySerif,
                  color: '#9E5E5E',
                  fontWeight: 600,
                }}
              >
                Don't
              </h3>
              <ul
                className="space-y-2 text-sm"
                style={{
                  fontFamily: fontFamilySerif,
                  color: colorInkSecondary,
                  fontSize: '1.125rem',
                }}
              >
                <li className="flex items-start gap-2">
                  <span style={{ color: colorAccentRose }}>✗</span>
                  Mix multiple button variants in the same group
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: colorAccentRose }}>✗</span>
                  Use danger variant for non-destructive actions
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: colorAccentRose }}>✗</span>
                  Skip the Layout wrapper on multi-page apps
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: colorAccentRose }}>✗</span>
                  Use arbitrary Tailwind colors outside the paper palette
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: colorAccentRose }}>✗</span>
                  Forget aria-labels on IconButtons
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2
            className="text-3xl font-bold mb-6"
            style={{
              fontFamily: fontFamilyDisplay,
              color: colorInkPrimary,
              fontWeight: 700,
            }}
          >
            TypeScript Support
          </h2>
          <p
            className="mb-10"
            style={{
              fontFamily: fontFamilySerif,
              color: colorInkSecondary,
              fontSize: '1.35rem',
            }}
          >
            Paper UI is built with TypeScript and exports all type definitions.
          </p>

          <CodeBlock
            filename="types.tsx"
            code={`import type {
  ButtonProps,
  IconButtonProps,
  CheckboxProps,
  PageProps,
  LayoutProps,
  NavigationItem
} from '@dendelion/paper-ui';

// Use types in your components
interface MyComponentProps {
  buttonProps: ButtonProps;
  navItems: NavigationItem[];
}`}
          />
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default DocsPage;
