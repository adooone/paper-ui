import { useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useBodyScrollLock } from '../../hooks/use-body-scroll-lock';
import { useEscapeKey } from '../../hooks/use-escape-key';
import { useFocusTrap } from '../../hooks/use-focus-trap';
import { cn } from '../../utils/style-helpers';
import styles from './drawer.module.scss';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: 'left' | 'right';
  width?: number | string;
  className?: string;
}

export function Drawer({
  open,
  onClose,
  children,
  side = 'left',
  width = 320,
  className,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEscapeKey(open, onClose);
  useFocusTrap(open, panelRef);
  useBodyScrollLock(open);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className={styles.overlay}>
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close drawer"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className={cn(styles.panel, styles[side], className)}
        style={{ width: typeof width === 'number' ? `${width}px` : width }}
        role="dialog"
        aria-modal="true"
        aria-label="Drawer"
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
