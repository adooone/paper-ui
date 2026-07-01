import { createContext } from 'react';
import type { ReactNode } from 'react';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastOptions {
  title?: string;
  description?: ReactNode;
  variant?: ToastVariant;
  /** Auto-dismiss delay in ms. 0 disables auto-dismiss. */
  duration?: number;
}

export interface ToastContextValue {
  /** Shows a toast and returns its id (pass to `dismiss` to close it early). */
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
