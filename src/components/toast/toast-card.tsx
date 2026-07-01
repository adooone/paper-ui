import { useCallback, useEffect, useRef } from 'react';
import { Alert } from '../alert';
import type { ToastVariant } from './toast-context';
import styles from './toast.module.scss';

export interface ToastRecord {
  id: string;
  title?: string;
  description?: React.ReactNode;
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

  return (
    <div className={styles.item} onMouseEnter={pause} onMouseLeave={resume}>
      <Alert
        variant={record.variant}
        title={record.title}
        surface={surface}
        dismissible
        onDismiss={() => onDismiss(record.id)}
      >
        {record.description}
      </Alert>
    </div>
  );
}
