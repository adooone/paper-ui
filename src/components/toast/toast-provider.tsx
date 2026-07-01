import { useCallback, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/style-helpers';
import { ToastCard } from './toast-card';
import type { ToastRecord } from './toast-card';
import { ToastContext } from './toast-context';
import type { ToastOptions } from './toast-context';
import styles from './toast.module.scss';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
  surface?: 'paper' | 'chalkboard';
  /** Default auto-dismiss delay in ms for toasts that don't set their own. */
  defaultDuration?: number;
}

function toCamelCase(value: string) {
  return value.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

export function ToastProvider({
  children,
  position = 'bottom-right',
  surface = 'paper',
  defaultDuration = 5000,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      counter.current += 1;
      const id = `toast-${counter.current}`;
      setToasts((prev) => [
        ...prev,
        {
          id,
          title: options.title,
          description: options.description,
          variant: options.variant ?? 'info',
          duration: options.duration ?? defaultDuration,
        },
      ]);
      return id;
    },
    [defaultDuration],
  );

  const ordered = position.startsWith('top') ? [...toasts].reverse() : toasts;

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            className={cn(styles.stack, styles[toCamelCase(position)])}
            role="region"
            aria-label="Notifications"
          >
            {ordered.map((record) => (
              <ToastCard key={record.id} record={record} surface={surface} onDismiss={dismiss} />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}
