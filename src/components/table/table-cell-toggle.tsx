import { cn } from '../../utils/style-helpers';
import styles from './cells.module.scss';

export interface TableCellToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  variant?: 'default' | 'chalkboard';
}

export function TableCellToggle({ checked, onChange, variant = 'default' }: TableCellToggleProps) {
  return (
    <button
      type="button"
      className={cn(
        styles.toggle,
        variant === 'chalkboard' && styles.chalkToggle,
        checked && styles.toggleActive,
        checked && variant === 'chalkboard' && styles.chalkToggleActive,
      )}
      onClick={() => onChange(!checked)}
    >
      {checked ? 'true' : 'false'}
    </button>
  );
}
