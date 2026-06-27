import { useState } from 'react';
import type { FC } from 'react';
import { Button } from '../../components/button';
import { Checkbox } from '../../components/checkbox';
import { Layout, type LayoutBackground } from '../../components/layout';
import { Page } from '../../components/page';
import { NavigationIsland } from '../../components/navigation-island';
import { CodeBlock } from '../../components/code-block';
import { Footer } from '../components/footer';
import { TextureSwatches } from '../components/texture-swatches';
import { buildTextureStyles, type TextureConfig } from '../lib/textures';
import {
  colorInkPrimary,
  colorInkSecondary,
  fontFamilyDisplay,
  fontFamilySerif,
  paperCardStyle,
  shadowPaperMd,
} from '../lib/styles';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/' },
  { id: 'plans', label: 'Plans', path: '/plans' },
  { id: 'settings', label: 'Settings', path: '/settings' },
];

const islandItems = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'explore', label: 'Explore', icon: <CompassIcon /> },
  { id: 'library', label: 'Library', icon: <BookIcon /> },
  { id: 'profile', label: 'Profile', icon: <UserIcon /> },
];

const pageContent = (
  <div>
    <h3
      style={{
        fontFamily: fontFamilyDisplay,
        color: colorInkPrimary,
        fontSize: '1.25rem',
        lineHeight: '32px',
        margin: 0,
        marginBottom: '32px',
      }}
    >
      Content Area
    </h3>
    <p
      style={{
        fontFamily: fontFamilySerif,
        color: colorInkSecondary,
        fontSize: '1rem',
        lineHeight: '32px',
        margin: 0,
        marginBottom: '32px',
      }}
    >
      Toggle sections above to see the layout adapt.
    </p>
    <p
      style={{
        fontFamily: fontFamilySerif,
        color: colorInkSecondary,
        fontSize: '1rem',
        lineHeight: '32px',
        margin: 0,
      }}
    >
      Paper UI is a library of reusable React components for building natural materials interfaces. It is made with accessibility and performance in mind. Colors and textures are carefully chosen to create a harmonious and intuitive user experience.
    </p>
  </div>
);

export const LayoutPage: FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showPage, setShowPage] = useState(true);
  const [showIsland, setShowIsland] = useState(true);
  const [showHeader, setShowHeader] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [activeIsland, setActiveIsland] = useState('home');

  const [layoutConfig, setLayoutConfig] = useState<TextureConfig>({
    texture: 'paper',
    ruledType: 'none',
    ruledColor: 'blue',
  });

  const [pageConfig, setPageConfig] = useState<TextureConfig>({
    texture: 'white',
    ruledType: 'lines',
    ruledColor: 'blue',
  });

  const [activeSurface, setActiveSurface] = useState<'layout' | 'page'>('layout');

  const layoutBackground: LayoutBackground =
    layoutConfig.ruledType === 'none'
      ? (layoutConfig.texture as LayoutBackground)
      : {
        texture: layoutConfig.texture as 'paper' | 'parchment' | 'kraft' | 'white' | 'canvas',
        ruledType: layoutConfig.ruledType,
        ruledColor: layoutConfig.ruledColor as 'blue' | 'brown' | 'black',
      };

  const pageStyles = buildTextureStyles(pageConfig);

  const code = `<Layout
  showHeader={${showHeader}}
  showFooter={${showFooter}}
  showSidebar={${showSidebar}}
  showPage={${showPage}}
  background={${layoutConfig.ruledType === 'none' ? `'${layoutConfig.texture}'` : `{ texture: '${layoutConfig.texture}', ruledType: '${layoutConfig.ruledType}', ruledColor: '${layoutConfig.ruledColor}' }`}}
  title="Dashboard"
  subtitle="Overview"
  navigationItems={[...]}
  activeItemId="${activeNav}"
  onNavigate={...}
  navigationIsland={${showIsland ? '<NavigationIsland ... />' : 'undefined'}}
>
  <Page withTexture style={{ /* texture styles */ }}>
    Content here
  </Page>
</Layout>`;

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
      <div className="mb-12">
        <h1
          className="text-5xl font-bold mb-4"
          style={{
            fontFamily: fontFamilyDisplay,
            color: colorInkPrimary,
            fontWeight: 700,
          }}
        >
          Layout
        </h1>
        <p
          style={{
            fontFamily: fontFamilySerif,
            color: colorInkSecondary,
            fontSize: '1.35rem',
          }}
        >
          Configurable page shell. Header spans full width above the sidebar and
          main content. Sidebar inherits the layout background — no divider, just
          a clean nav list. Supports full texture + ruled overlay backgrounds.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_330px] gap-8 mb-12">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4" style={{ minHeight: 40 }}>
            <h2
              className="text-2xl font-bold"
              style={{
                fontFamily: fontFamilyDisplay,
                color: colorInkPrimary,
              }}
            >
              Preview
            </h2>
          </div>

          <div className="rounded-2xl p-2 w-full" style={{ backgroundColor: '#E8E0CC', height: '520px' }}>
            <div
              className="rounded-xl w-full h-full overflow-hidden"
              style={{
                border: '2px solid #D6C9A8',
                boxShadow:
                  'inset 0 0 0 1px rgba(61, 53, 43, 0.06), 0 4px 6px rgba(61, 53, 43, 0.05)',
              }}
            >
              <div style={{ position: 'relative', height: '100%' }}>
                <Layout
                  showHeader={showHeader}
                  showFooter={showFooter}
                  showSidebar={showSidebar}
                  showPage={false}
                  background={layoutBackground}
                  title="Dashboard"
                  subtitle="Overview"
                  style={{ height: '100%' }}
                  navigationItems={navItems}
                  activeItemId={activeNav}
                  onNavigate={(item) => setActiveNav(item.id)}
                  headerActions={
                    <Button variant="primary" size="small">
                      Action
                    </Button>
                  }
                  navigationIsland={
                    showIsland ? (
                      <NavigationIsland
                        items={islandItems}
                        activeId={activeIsland}
                        onSelect={setActiveIsland}
                        position="top"
                      />
                    ) : undefined
                  }
                >
                  {showPage ? (
                    <Page
                      withTexture
                      style={{
                        ...pageStyles,
                        maxWidth: 'none',
                        margin: 0,
                        borderRadius: '28px',
                        boxShadow: shadowPaperMd,
                        minHeight: '100%',
                      }}
                    >
                      {pageContent}
                    </Page>
                  ) : (
                    <div style={{ lineHeight: '32px', padding: '32px', overflowY: 'auto' }}>
                      {pageContent}
                    </div>
                  )}
                </Layout>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4" style={{ minHeight: 40 }}>
            <h2
              className="text-2xl font-bold"
              style={{
                fontFamily: fontFamilyDisplay,
                color: colorInkPrimary,
              }}
            >
              Configure
            </h2>
          </div>

          <div
            className="rounded-2xl p-6 border space-y-6"
            style={paperCardStyle}
          >
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <Checkbox
                label="Sidebar"
                checked={showSidebar}
                onChange={(e) => setShowSidebar(e.target.checked)}
              />
              <Checkbox
                label="Header"
                checked={showHeader}
                onChange={(e) => setShowHeader(e.target.checked)}
              />
              <Checkbox
                label="Page"
                checked={showPage}
                onChange={(e) => setShowPage(e.target.checked)}
              />
              <Checkbox
                label="Footer"
                checked={showFooter}
                onChange={(e) => setShowFooter(e.target.checked)}
              />
              <Checkbox
                label="Island"
                checked={showIsland}
                onChange={(e) => setShowIsland(e.target.checked)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="small"
                isActive={activeSurface === 'layout'}
                onClick={() => setActiveSurface('layout')}
              >
                Layout
              </Button>
              <Button
                variant="ghost"
                size="small"
                isActive={activeSurface === 'page'}
                onClick={() => setActiveSurface('page')}
              >
                Page
              </Button>
            </div>

            {activeSurface === 'layout' ? (
              <TextureSwatches
                value={layoutConfig}
                onChange={setLayoutConfig}
                compact
              />
            ) : (
              <TextureSwatches
                value={pageConfig}
                onChange={setPageConfig}
                compact
              />
            )}
          </div>
        </div>
      </div>

      <div className="mb-16">
        <CodeBlock filename="Layout.tsx" code={code} />
      </div>

      <div className="mb-16">
        <h2
          className="text-2xl font-bold mb-4"
          style={{
            fontFamily: fontFamilyDisplay,
            color: colorInkPrimary,
          }}
        >
          Navigation Island
        </h2>
        <p
          className="mb-6"
          style={{
            fontFamily: fontFamilySerif,
            color: colorInkSecondary,
            fontSize: '1.25rem',
          }}
        >
          A floating pill-style navigation bar. By default it anchors to the
          bottom of the viewport. Set{' '}
          <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.95em', color: '#8FB996' }}>
            position="top"
          </code>{' '}
          to place it inline instead.
        </p>
        <div
          className="p-10 rounded-2xl border flex flex-col items-center justify-center gap-8"
          style={paperCardStyle}
        >
          <NavigationIsland
            items={islandItems}
            activeId={activeIsland}
            onSelect={setActiveIsland}
            position="top"
          />
          <p
            style={{
              fontFamily: fontFamilySerif,
              color: colorInkSecondary,
            }}
          >
            Paper-textured floating nav with ink shadows
          </p>
        </div>
        <div className="mt-6">
          <CodeBlock
            filename="NavigationIsland.tsx"
            code={`import { NavigationIsland } from '@dendelion/paper-ui';

// Default: fixed to bottom of viewport
<NavigationIsland
  items={[...]}
  activeId="home"
  onSelect={(id) => navigate(id)}
/>

// Inline placement (e.g. inside a header)
<NavigationIsland
  items={[...]}
  activeId="home"
  onSelect={(id) => navigate(id)}
  position="top"
/>`}
          />
        </div>
      </div>

    </div>
  );
};

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default LayoutPage;
