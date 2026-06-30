import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { layoutConfig } from '../../layout';
import { space } from '../../tokens';
import { buttonSizeCompact, cn } from '../../utils/style-helpers';
import {
  type PaperTextureKey,
  type RuledColorKey,
  type RuledType,
  type TextureConfig,
  getTextureStyles,
} from '../../utils/textures';
import { Button } from '../button';
import { Page } from '../page';
import styles from './layout.module.scss';

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: ReactNode;
}

export type LayoutBackground =
  | 'plain'
  | PaperTextureKey
  | { image: string }
  | {
      texture: PaperTextureKey;
      ruledType?: RuledType;
      ruledColor?: RuledColorKey;
    };

export interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
  showPage?: boolean;
  background?: LayoutBackground;
  title?: string;
  subtitle?: string;
  headerActions?: ReactNode;
  navigationItems?: NavigationItem[];
  activeItemId?: string;
  onNavigate?: (item: NavigationItem) => void;
  logo?: ReactNode;
  footerContent?: ReactNode;
  navigationIsland?: ReactNode;
  style?: React.CSSProperties;
  bleedBottom?: boolean;
  routeKey?: string;
  stackOpen?: boolean;
}

function getBackgroundStyles(bg: LayoutBackground | undefined): React.CSSProperties {
  if (!bg || bg === 'plain') {
    return { backgroundColor: 'var(--pui-bg-base)' };
  }

  if (typeof bg === 'object' && 'image' in bg) {
    return {
      backgroundImage: `url(${bg.image})`,
      backgroundRepeat: 'repeat',
      backgroundSize: '200px 200px',
    };
  }

  if (typeof bg === 'object' && 'texture' in bg) {
    return getTextureStyles({
      texture: bg.texture,
      ruledType: bg.ruledType,
      ruledColor: bg.ruledColor,
    });
  }

  return getTextureStyles({ texture: bg });
}

export function Layout({
  children,
  showHeader = true,
  showFooter = false,
  showSidebar = true,
  showPage = true,
  background = 'paper',
  title,
  subtitle,
  headerActions,
  navigationItems = [],
  activeItemId,
  onNavigate,
  logo,
  footerContent,
  navigationIsland,
  style,
  bleedBottom = true,
  routeKey,
  stackOpen,
}: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const bgStyles = getBackgroundStyles(background);
  const hasSidebar = showSidebar && navigationItems.length > 0;

  return (
    <div className={styles.layout} style={{ ...bgStyles, ...style }}>
      {showHeader && (
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            {hasSidebar && (
              <button
                type="button"
                className={styles.mobileToggle}
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round" />
                </svg>
              </button>
            )}

            <div className={styles.headerTitles}>
              {title && <h1 className={styles.headerTitle}>{title}</h1>}
              {subtitle && <span className={styles.headerSubtitle}>{subtitle}</span>}
            </div>
          </div>

          {headerActions && <div className={styles.headerActions}>{headerActions}</div>}
        </header>
      )}

      <div className={styles.body}>
        {mobileOpen && (
          <button
            type="button"
            className={styles.mobileOverlay}
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            tabIndex={-1}
          />
        )}

        {hasSidebar && (
          <aside className={cn(styles.sidebar, mobileOpen && styles.sidebarOpen)}>
            <div className={styles.sidebarInner}>
              <div className={styles.logoArea}>
                {logo || <span className={styles.logoText}>Paper UI</span>}
              </div>

              <nav className={styles.nav} aria-label="Main navigation">
                {navigationItems.map((item) => {
                  const isActive = item.id === activeItemId;
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      size="small"
                      isActive={isActive}
                      onClick={() => {
                        onNavigate?.(item);
                        setMobileOpen(false);
                      }}
                      aria-current={isActive ? 'page' : undefined}
                      icon={item.icon}
                      style={buttonSizeCompact}
                    >
                      {item.label}
                    </Button>
                  );
                })}
              </nav>
            </div>
          </aside>
        )}

        <div className={styles.main}>
          <main
            className={showPage ? styles.contentWithPage : styles.content}
            style={bleedBottom ? { paddingBottom: 0 } : undefined}
          >
            {(() => {
              const content =
                routeKey !== undefined ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={routeKey}
                      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      style={{ height: '100%' }}
                    >
                      {children}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  children
                );
              return showPage ? (
                <Page
                  withTexture
                  rounded={bleedBottom ? 'top' : 'all'}
                  style={
                    bleedBottom && navigationIsland
                      ? {
                          paddingBottom: `calc(${layoutConfig.navIslandBottom} + ${layoutConfig.navIslandHeight} + ${space[4]})`,
                        }
                      : undefined
                  }
                >
                  {content}
                </Page>
              ) : (
                content
              );
            })()}
          </main>
        </div>
      </div>

      {navigationIsland && (
        <div className={styles.navIslandFixed}>
          {stackOpen !== undefined ? (
            <motion.div
              animate={{
                x: stackOpen ? `-${layoutConfig.stackPanelWidth / 2}px` : 0,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {navigationIsland}
            </motion.div>
          ) : (
            navigationIsland
          )}
        </div>
      )}

      {showFooter && (
        <footer className={styles.footer}>
          {footerContent || (
            <p className={styles.footerText}>Paper UI — Natural Materials Component Library</p>
          )}
        </footer>
      )}
    </div>
  );
}
