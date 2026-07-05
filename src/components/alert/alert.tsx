import type { ReactNode } from 'react';
import { CloseIcon } from '../../utils/icons';
import { cn } from '../../utils/style-helpers';
import { type TextureProp, resolveTexture } from '../../utils/textures';
import { SketchBorder } from '../sketch-border';
import { AlertIcon } from './alert-icon';
import styles from './alert.module.scss';

export interface AlertProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  surface?: 'paper' | 'chalkboard';
  texture?: TextureProp;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export function Alert({
  children,
  variant = 'info',
  surface = 'paper',
  texture = 'kraft',
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) {
  const isChalkboard = surface === 'chalkboard';

  return (
    <div
      className={cn(styles.alert, styles[variant], isChalkboard && styles.chalkboard, className)}
      // Only genuinely urgent variants interrupt screen readers; info/success
      // announce politely.
      role={variant === 'warning' || variant === 'error' ? 'alert' : 'status'}
    >
      <SketchBorder clip radius={8} inset={2} roughness={1.1} strokeWidth={1.2} />
      <div className={styles.surface} style={isChalkboard ? undefined : resolveTexture(texture)} />
      <span className={styles.iconWrapper}>
        <AlertIcon variant={variant} />
      </span>
      <div className={styles.message}>{children}</div>
      {dismissible && (
        <button
          type="button"
          className={styles.dismiss}
          onClick={onDismiss}
          aria-label="Dismiss alert"
        >
          <CloseIcon size={16} />
        </button>
      )}
    </div>
  );
}
