import { useId } from 'react';
import { cn } from '../../utils/style-helpers';
import { Radio } from './radio';
import styles from './radio.module.scss';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  orientation?: 'vertical' | 'horizontal';
  surface?: 'paper' | 'chalkboard';
  className?: string;
}

export function RadioGroup({
  options,
  value,
  onChange,
  name,
  orientation = 'vertical',
  surface = 'paper',
  className,
}: RadioGroupProps) {
  const generatedName = useId();
  const groupName = name ?? generatedName;

  return (
    <div
      role="radiogroup"
      className={cn(styles.group, orientation === 'horizontal' && styles.horizontal, className)}
    >
      {options.map((opt) => (
        <Radio
          key={opt.value}
          name={groupName}
          value={opt.value}
          label={opt.label}
          checked={value === opt.value}
          disabled={opt.disabled}
          surface={surface}
          onChange={() => onChange?.(opt.value)}
        />
      ))}
    </div>
  );
}
