import { useCallback, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { CloseIcon } from '../../utils/icons';
import { cn } from '../../utils/style-helpers';
import { resolveTexture } from '../../utils/textures';
import { AlertIcon } from '../alert/alert-icon';
import type { ToastVariant } from './toast-context';
import styles from './toast.module.scss';

export interface ToastRecord {
  id: string;
  title?: string;
  description?: ReactNode;
  variant: ToastVariant;
  duration: number;
}

export interface ToastCardProps {
  record: ToastRecord;
  surface?: 'paper' | 'chalkboard';
  onDismiss: (id: string) => void;
}

export function ToastCard({ record, surface = 'paper', onDismiss }: ToastCardProps) {
  const remaining = useRef(record.duration);
  const startedAt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const schedule = useCallback(
    (ms: number) => {
      clearTimeout(timer.current);
      if (ms <= 0) return;
      startedAt.current = Date.now();
      timer.current = setTimeout(() => onDismiss(record.id), ms);
    },
    [onDismiss, record.id],
  );

  useEffect(() => {
    schedule(record.duration);
    return () => clearTimeout(timer.current);
  }, [schedule, record.duration]);

  const pause = () => {
    if (!timer.current) return;
    clearTimeout(timer.current);
    remaining.current -= Date.now() - startedAt.current;
  };

  const resume = () => schedule(remaining.current);

  const isChalkboard = surface === 'chalkboard';
  // Only genuinely urgent variants interrupt screen readers; info/success
  // announce politely.
  const role = record.variant === 'warning' || record.variant === 'error' ? 'alert' : 'status';

  return (
    <div className={styles.item} onMouseEnter={pause} onMouseLeave={resume}>
      <div
        className={cn(styles.card, styles[record.variant], isChalkboard && styles.chalkboard)}
        style={isChalkboard ? undefined : resolveTexture('kraft')}
        role={role}
      >
        <span className={styles.iconWrapper}>
          <AlertIcon variant={record.variant} />
        </span>
        <div className={styles.content}>
          {record.title && <div className={styles.title}>{record.title}</div>}
          <div className={styles.description}>{record.description}</div>
        </div>
        <button
          type="button"
          className={styles.dismiss}
          onClick={() => onDismiss(record.id)}
          aria-label="Dismiss notification"
        >
          <CloseIcon size={16} />
        </button>
      </div>
    </div>
  );
}
