import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './cells.module.scss';

export interface TableCellDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  variant?: 'default' | 'chalkboard';
}

export function TableCellDropdown({
  options,
  value,
  onChange,
  variant = 'default',
}: TableCellDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className={styles.cell} ref={ref}>
      <button
        type="button"
        className={cn(
          styles.dropdownToggle,
          variant === 'chalkboard' && styles.chalkDropdownToggle,
        )}
        onClick={() => setOpen(!open)}
      >
        {value}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={cn(styles.chevron, open && styles.chevronOpen)}
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div className={cn(styles.dropdown, variant === 'chalkboard' && styles.chalkDropdown)}>
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              className={cn(
                styles.dropdownItem,
                variant === 'chalkboard' && styles.chalkDropdownItem,
              )}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
