import { cn } from '../../utils/style-helpers';
import styles from './cells.module.scss';

export interface TableCellInputProps {
  kind: 'number' | 'string';
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  variant?: 'default' | 'chalkboard';
}

export function TableCellInput({
  kind,
  value,
  placeholder,
  onChange,
  variant = 'default',
}: TableCellInputProps) {
  return (
    <input
      type={kind === 'number' ? 'number' : 'text'}
      className={cn(styles.input, variant === 'chalkboard' && styles.chalkInput)}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
