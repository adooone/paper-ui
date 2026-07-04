import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/style-helpers';
import { type TextureProp, resolveTexture } from '../../utils/textures';
import styles from './select.module.scss';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  helperText?: string;
  error?: boolean;
  size?: 'small' | 'medium' | 'large';
  surface?: 'paper' | 'chalkboard';
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Submitted with the surrounding form via the hidden native select. */
  name?: string;
  disabled?: boolean;
  width?: string | number;
  texture?: TextureProp;
  className?: string;
}

export function Select({
  label,
  helperText,
  error = false,
  size = 'medium',
  surface = 'paper',
  options,
  placeholder,
  value,
  defaultValue,
  onChange,
  name,
  disabled = false,
  width,
  texture = false,
  className,
}: SelectProps) {
  const selectId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  const selectedOption = options.find((o) => o.value === selectedValue);
  const displayLabel = selectedOption?.label ?? placeholder ?? 'Select...';

  const openDropdown = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
    const idx = options.findIndex((o) => o.value === selectedValue);
    setHighlightedIndex(idx >= 0 ? idx : 0);
  }, [disabled, options, selectedValue]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, []);

  const selectOption = useCallback(
    (option: SelectOption) => {
      if (option.disabled) return;
      if (!isControlled) {
        setInternalValue(option.value);
      }
      onChange?.(option.value);
      closeDropdown();
      triggerRef.current?.focus();
    },
    [isControlled, onChange, closeDropdown],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (isOpen && highlightedIndex >= 0) {
            selectOption(options[highlightedIndex]);
          } else {
            openDropdown();
          }
          break;
        case 'Escape':
          e.preventDefault();
          if (isOpen) closeDropdown();
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            openDropdown();
          } else {
            setHighlightedIndex((prev) => {
              let next = prev + 1;
              while (next < options.length && options[next].disabled) {
                next++;
              }
              return next < options.length ? next : prev;
            });
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!isOpen) {
            openDropdown();
          } else {
            setHighlightedIndex((prev) => {
              let next = prev - 1;
              while (next >= 0 && options[next].disabled) {
                next--;
              }
              return next >= 0 ? next : prev;
            });
          }
          break;
        case 'Home':
          e.preventDefault();
          if (isOpen) {
            let first = 0;
            while (first < options.length && options[first].disabled) {
              first++;
            }
            if (first < options.length) setHighlightedIndex(first);
          }
          break;
        case 'End':
          e.preventDefault();
          if (isOpen) {
            let last = options.length - 1;
            while (last >= 0 && options[last].disabled) {
              last--;
            }
            if (last >= 0) setHighlightedIndex(last);
          }
          break;
        case 'Tab':
          // Let focus move on, but don't leave the dropdown floating open.
          if (isOpen) closeDropdown();
          break;
      }
    },
    [disabled, isOpen, highlightedIndex, options, openDropdown, closeDropdown, selectOption],
  );

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: globalThis.MouseEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target) || listRef.current?.contains(target)) {
        return;
      }
      closeDropdown();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, closeDropdown]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (!isOpen || highlightedIndex < 0 || !listRef.current) return;
    const optionEl = listRef.current.querySelector(
      `[data-option-index="${highlightedIndex}"]`,
    ) as HTMLElement | null;
    optionEl?.scrollIntoView({ block: 'nearest' });
  }, [isOpen, highlightedIndex]);

  // Track trigger position for portal rendering
  useEffect(() => {
    if (!isOpen) {
      setTriggerRect(null);
      return;
    }
    const updateRect = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      // Close rather than float detached once the trigger scrolls out of view.
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        closeDropdown();
        return;
      }
      setTriggerRect(rect);
    };
    updateRect();
    document.addEventListener('scroll', updateRect, { capture: true, passive: true });
    window.addEventListener('resize', updateRect, { passive: true });
    return () => {
      document.removeEventListener('scroll', updateRect, { capture: true });
      window.removeEventListener('resize', updateRect);
    };
  }, [isOpen, closeDropdown]);

  const textureStyles = resolveTexture(texture);

  const dropdownStyle = textureStyles
    ? ({
        '--pui-texture': textureStyles.backgroundImage,
        '--pui-fill': textureStyles.backgroundColor,
      } as React.CSSProperties)
    : undefined;

  return (
    <div
      className={cn(styles.wrapper, surface === 'chalkboard' && styles.chalkboard, className)}
      style={width ? { width: typeof width === 'number' ? `${width}px` : width } : undefined}
    >
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}

      {/* Hidden native select for form submission / accessibility fallback */}
      <select
        id={selectId}
        name={name}
        className={styles.nativeSelect}
        value={selectedValue}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        aria-hidden="true"
        tabIndex={-1}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>

      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? `${selectId}-listbox` : undefined}
        aria-activedescendant={
          isOpen && highlightedIndex >= 0 ? `${selectId}-option-${highlightedIndex}` : undefined
        }
        className={cn(
          styles.trigger,
          styles[size],
          error && styles.error,
          isOpen && styles.open,
          disabled && styles.disabled,
        )}
        onClick={() => (isOpen ? closeDropdown() : openDropdown())}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      >
        <span className={cn(styles.triggerLabel, !selectedOption && styles.placeholder)}>
          {displayLabel}
        </span>
        <ChevronIcon className={cn(styles.chevron, isOpen && styles.chevronOpen)} />
      </button>

      {isOpen &&
        triggerRect &&
        createPortal(
          <div
            ref={listRef}
            id={`${selectId}-listbox`}
            role="listbox"
            tabIndex={-1}
            className={styles.dropdown}
            style={{
              ...dropdownStyle,
              position: 'fixed',
              top: triggerRect.bottom + 6,
              left: triggerRect.left,
              width: triggerRect.width,
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.preventDefault();
                closeDropdown();
                triggerRef.current?.focus();
              }
            }}
          >
            {options.map((opt, idx) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard selection is handled on the combobox trigger (arrow keys + Enter) via aria-activedescendant; options are pointer targets only.
              <div
                key={opt.value}
                id={`${selectId}-option-${idx}`}
                role="option"
                aria-selected={opt.value === selectedValue}
                tabIndex={-1}
                data-option-index={idx}
                className={cn(
                  styles.option,
                  opt.value === selectedValue && styles.optionSelected,
                  idx === highlightedIndex && styles.optionHighlighted,
                  opt.disabled && styles.optionDisabled,
                )}
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                  e.stopPropagation();
                  selectOption(opt);
                }}
                onMouseEnter={() => setHighlightedIndex(idx)}
              >
                {opt.label}
              </div>
            ))}
          </div>,
          document.body,
        )}

      {helperText && (
        <span className={cn(styles.helperText, error && styles.helperError)}>{helperText}</span>
      )}
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
