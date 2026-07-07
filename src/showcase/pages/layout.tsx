import { useState } from 'react';
import type { FC } from 'react';
import { Button } from '../../components/button';
import { Checkbox } from '../../components/checkbox';
import { CodeBlock } from '../../components/code-block';
import { Layout, type LayoutBackground } from '../../components/layout';
import { Page } from '../../components/page';
import { Footer } from '../components/footer';
import { TextureSwatches } from '../components/texture-swatches';
import {
  colorInkPrimary,
  colorInkSecondary,
  fontFamilyDisplay,
  fontFamilySerif,
  paperCardStyle,
} from '../lib/styles';
import type { TextureConfig } from '../lib/textures';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/' },
  { id: 'plans', label: 'Plans', path: '/plans' },
  { id: 'settings', label: 'Settings', path: '/settings' },
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
      Paper UI is a library of reusable React components for building natural materials interfaces.
      It is made with accessibility and performance in mind. Colors and textures are carefully
      chosen to create a harmonious and intuitive user experience.
    </p>
  </div>
);

export const LayoutPage: FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showPage, setShowPage] = useState(true);
  const [showHeader, setShowHeader] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');

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
>
  <Page style={{ /* texture styles */ }}>
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
          Configurable page shell. Header spans full width above the sidebar and main content.
          Sidebar inherits the layout background — no divider, just a clean nav list. Supports full
          texture + ruled overlay backgrounds.
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

          <div
            className="rounded-2xl p-2 w-full"
            style={{ backgroundColor: '#E8E0CC', height: '520px' }}
          >
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
                >
                  {showPage ? (
                    <Page
                      texture={pageConfig}
                      style={{
                        maxWidth: 'none',
                        margin: 0,
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

          <div className="rounded-2xl p-6 border space-y-6" style={paperCardStyle}>
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
              <TextureSwatches value={layoutConfig} onChange={setLayoutConfig} compact />
            ) : (
              <TextureSwatches value={pageConfig} onChange={setPageConfig} compact />
            )}
          </div>
        </div>
      </div>

      <div className="mb-16">
        <CodeBlock filename="Layout.tsx" code={code} />
      </div>
    </div>
  );
};

export default LayoutPage;
