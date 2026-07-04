import { useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import { Button } from '../button';
import { Card } from '../card';
import styles from './tabs.module.scss';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  /** Controlled active tab id; omit to let Tabs manage its own state. */
  activeKey?: string;
  /** Initial tab for uncontrolled usage; defaults to the first item. */
  defaultActiveKey?: string;
  onSelect?: (id: string) => void;
  surface?: 'paper' | 'chalkboard';
  className?: string;
}

export function Tabs({
  items,
  activeKey,
  defaultActiveKey,
  onSelect,
  surface = 'paper',
  className,
}: TabsProps) {
  const baseId = useId();
  const [internalKey, setInternalKey] = useState(defaultActiveKey ?? items[0]?.id);
  const isControlled = activeKey !== undefined;
  const currentKey = isControlled ? activeKey : internalKey;
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());

  const activeItem = items.find((item) => item.id === currentKey);

  const selectTab = (id: string) => {
    if (!isControlled) setInternalKey(id);
    onSelect?.(id);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (items.length === 0) return;
    const currentIndex = items.findIndex((item) => item.id === currentKey);
    let nextIndex: number;
    switch (e.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % items.length;
        break;
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + items.length) % items.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = items.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    const next = items[nextIndex];
    selectTab(next.id);
    tabRefs.current.get(next.id)?.focus();
  };

  const tabId = (id: string) => `${baseId}-tab-${id}`;
  const panelId = (id: string) => `${baseId}-panel-${id}`;

  return (
    <div className={cn(styles.tabs, className)}>
      <div className={styles.tabBar} role="tablist" onKeyDown={handleKeyDown}>
        {items.map((item) => {
          const isActive = item.id === currentKey;
          return (
            <Button
              key={item.id}
              ref={(node) => {
                if (node) {
                  tabRefs.current.set(item.id, node);
                } else {
                  tabRefs.current.delete(item.id);
                }
              }}
              variant="ghost"
              isActive={isActive}
              icon={item.icon}
              onClick={() => selectTab(item.id)}
              className={styles.tabButton}
              role="tab"
              id={tabId(item.id)}
              aria-selected={isActive}
              aria-controls={item.children ? panelId(item.id) : undefined}
              tabIndex={isActive ? 0 : -1}
            >
              {item.label}
            </Button>
          );
        })}
      </div>
      {activeItem?.children && (
        <div
          role="tabpanel"
          id={panelId(activeItem.id)}
          aria-labelledby={tabId(activeItem.id)}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: the ARIA tabs pattern makes the panel focusable so keyboard users can move from the tablist into panel content that has no focusable elements of its own.
          tabIndex={0}
        >
          <Card surface={surface} className={styles.content}>
            {activeItem.children}
          </Card>
        </div>
      )}
    </div>
  );
}
