import { cloneElement, useCallback, useEffect, useId, useRef, useState } from 'react';
import type {
  MouseEvent,
  ReactElement,
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { useEscapeKey } from '../../hooks/use-escape-key';
import { cn } from '../../utils/style-helpers';
import { SketchBorder } from '../sketch-border';
import styles from './menu.module.scss';

export interface MenuItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  danger?: boolean;
}

export interface MenuSeparator {
  id: string;
  type: 'separator';
}

export type MenuEntry = MenuItem | MenuSeparator;

export interface MenuProps {
  trigger: ReactElement;
  items: MenuEntry[];
  align?: 'start' | 'end';
  surface?: 'paper' | 'chalkboard';
  className?: string;
}

const GAP = 6;

function isSeparator(entry: MenuEntry): entry is MenuSeparator {
  return 'type' in entry && entry.type === 'separator';
}

export function Menu({ trigger, items, align = 'start', surface = 'paper', className }: MenuProps) {
  const menuId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const focusTrigger = useCallback(() => {
    wrapperRef.current?.querySelector<HTMLElement>('button, a, [tabindex]')?.focus();
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEscapeKey(isOpen, () => {
    close();
    focusTrigger();
  });

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: globalThis.MouseEvent) => {
      const target = e.target as Node;
      if (wrapperRef.current?.contains(target) || listRef.current?.contains(target)) return;
      close();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, close]);

  // Track trigger position for portal rendering
  useEffect(() => {
    if (!isOpen) {
      setRect(null);
      return;
    }
    const updateRect = () => {
      if (wrapperRef.current) setRect(wrapperRef.current.getBoundingClientRect());
    };
    updateRect();
    document.addEventListener('scroll', updateRect, { capture: true, passive: true });
    window.addEventListener('resize', updateRect, { passive: true });
    return () => {
      document.removeEventListener('scroll', updateRect, { capture: true });
      window.removeEventListener('resize', updateRect);
    };
  }, [isOpen]);

  // Move focus into the menu once it's positioned and rendered
  useEffect(() => {
    if (!isOpen || !rect) return;
    listRef.current?.querySelector<HTMLElement>('[role="menuitem"]:not(:disabled)')?.focus();
  }, [isOpen, rect]);

  const handleListKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const focusableItems = Array.from(
      listRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)') ?? [],
    );
    if (focusableItems.length === 0) return;
    const currentIndex = focusableItems.indexOf(document.activeElement as HTMLElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        focusableItems[(currentIndex + 1) % focusableItems.length]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        focusableItems[(currentIndex - 1 + focusableItems.length) % focusableItems.length]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        focusableItems[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        focusableItems[focusableItems.length - 1]?.focus();
        break;
      case 'Tab':
        close();
        break;
    }
  };

  const handleSelect = (item: MenuItem) => {
    if (item.disabled) return;
    close();
    focusTrigger();
    item.onSelect?.();
  };

  const triggerProps = trigger.props as { onClick?: (e: MouseEvent) => void };

  return (
    <span ref={wrapperRef} className={styles.wrapper}>
      {cloneElement(trigger, {
        'aria-haspopup': 'menu',
        'aria-expanded': isOpen,
        onClick: (e: MouseEvent) => {
          triggerProps.onClick?.(e);
          setIsOpen((prev) => !prev);
        },
      } as Record<string, unknown>)}

      {isOpen &&
        rect &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={listRef}
            id={menuId}
            role="menu"
            className={cn(styles.menu, surface === 'chalkboard' && styles.chalkboard, className)}
            style={{
              position: 'fixed',
              top: rect.bottom + GAP,
              minWidth: rect.width,
              ...(align === 'end'
                ? { right: window.innerWidth - rect.right }
                : { left: rect.left }),
            }}
            onKeyDown={handleListKeyDown}
          >
            <SketchBorder clip radius={12} inset={2.5} roughness={1.2} strokeWidth={1.3} />
            <div className={styles.surface} />
            <div className={styles.list}>
              {items.map((entry) =>
                isSeparator(entry) ? (
                  // biome-ignore lint/a11y/useFocusableInteractive: a static visual divider between menu items, not an adjustable splitter, so it is intentionally not focusable.
                  <div key={entry.id} role="separator" className={styles.separator} />
                ) : (
                  <button
                    key={entry.id}
                    type="button"
                    role="menuitem"
                    tabIndex={-1}
                    disabled={entry.disabled}
                    className={cn(
                      styles.item,
                      entry.danger && styles.danger,
                      entry.disabled && styles.itemDisabled,
                    )}
                    onClick={() => handleSelect(entry)}
                  >
                    {entry.icon && <span className={styles.icon}>{entry.icon}</span>}
                    <span className={styles.label}>{entry.label}</span>
                  </button>
                ),
              )}
            </div>
          </div>,
          document.body,
        )}
    </span>
  );
}
