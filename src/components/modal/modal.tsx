import type { ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import { CloseIcon } from '../../utils/icons';
import { getTextureStyles, type TextureConfig } from '../../utils/textures';
import styles from './modal.module.scss';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'chalkboard';
  texture?: TextureConfig;
  withTexture?: boolean;
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  size = 'medium',
  variant = 'default',
  texture,
  withTexture = false,
  className,
}: ModalProps) {
  if (!open) return null;

  const textureStyles = texture
    ? getTextureStyles(texture)
    : withTexture
      ? getTextureStyles({ texture: 'paper', ruledType: 'none' })
      : undefined;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div
        className={cn(
          styles.modal,
          styles[size],
          variant === 'chalkboard' && styles.chalkboard,
          className,
        )}
        style={textureStyles}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close modal"
          >
            <CloseIcon size={18} />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}

