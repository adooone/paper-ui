import { useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useBodyScrollLock } from '../../hooks/use-body-scroll-lock';
import { useEscapeKey } from '../../hooks/use-escape-key';
import { useFocusTrap } from '../../hooks/use-focus-trap';
import { CloseIcon } from '../../utils/icons';
import { cn } from '../../utils/style-helpers';
import { type TextureProp, resolveTexture } from '../../utils/textures';
import styles from './modal.module.scss';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  surface?: 'paper' | 'chalkboard';
  texture?: TextureProp;
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  size = 'medium',
  surface = 'paper',
  texture = false,
  className,
}: ModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEscapeKey(open, onClose);
  useFocusTrap(open, panelRef);
  useBodyScrollLock(open);

  if (!open || typeof document === 'undefined') return null;

  const textureStyles = resolveTexture(texture);

  return createPortal(
    <div className={styles.overlay}>
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close modal"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className={cn(
          styles.modal,
          styles[size],
          surface === 'chalkboard' && styles.chalkboard,
          className,
        )}
        style={textureStyles}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
      >
        <div className={styles.header}>
          {title && (
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
          )}
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close modal">
            <CloseIcon size={18} />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
