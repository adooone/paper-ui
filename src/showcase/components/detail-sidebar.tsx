import { useState, useEffect, useMemo } from 'react';
import type { FC } from 'react';
import { CodeBlock } from '../../components/code-block';
import type { PropDef } from '../../components/prop-table';
import { PropTable } from '../../components/prop-table';
import { cn } from '../../utils/style-helpers';
import { getDefaultValue } from '../../utils/prop-helpers';
import styles from './detail-sidebar.module.scss';

interface DetailSidebarProps {
  open: boolean;
  title: string;
  codeExample?: string;
  id?: string;
  props?: PropDef[];
  onClose: () => void;
}

function toPascal(id: string): string {
  return id
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}


function generateCode(componentName: string, props: PropDef[], selectedValues: Record<string, string | boolean>): string {
  const lines: string[] = [];
  const imports = `import { ${componentName} } from '@dendelion/paper-ui';`;

  const propLines: string[] = [];
  for (const prop of props) {
    const value = selectedValues[prop.name];
    if (value === undefined || value === '') continue;

    if (typeof value === 'boolean') {
      if (value) propLines.push(`  ${prop.name}`);
    } else if (prop.type === 'number') {
      propLines.push(`  ${prop.name}={${value || '0'}}`);
    } else if (prop.type === 'string') {
      propLines.push(`  ${prop.name}="${value}"`);
    } else {
      propLines.push(`  ${prop.name}="${value}"`);
    }
  }

  const propBlock = propLines.length > 0
    ? '\n' + propLines.join('\n') + '\n'
    : '';

  return `${imports}\n\n<${componentName}${propBlock}>\n  ...\n</${componentName}>`;
}

export const DetailSidebar: FC<DetailSidebarProps> = ({
  open,
  title,
  id,
  props,
  onClose,
}) => {
  const componentName = id ? toPascal(id) : title;
  const [selectedValues, setSelectedValues] = useState<Record<string, string | boolean>>({});

  useEffect(() => {
    if (!props) return;
    const defaults: Record<string, string | boolean> = {};
    for (const prop of props) {
      defaults[prop.name] = getDefaultValue(prop);
    }
    setSelectedValues(defaults);
  }, [props]);

  const code = useMemo(() => {
    if (!props || props.length === 0) return '';
    return generateCode(componentName, props, selectedValues);
  }, [componentName, props, selectedValues]);

  const handleValueChange = (propName: string, value: string | boolean) => {
    setSelectedValues((prev) => ({ ...prev, [propName]: value }));
  };

  return (
    <div className={cn(styles.panel, open && styles.open)}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>{title}</span>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close details"
        >
          &times;
        </button>
      </div>
      <div className={styles.content}>
        {props && props.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Props</div>
            <PropTable
              props={props}
              variant="chalkboard"
              selectedValues={selectedValues}
              onValueChange={handleValueChange}
            />
          </div>
        )}
        {code && (
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Code</div>
            <CodeBlock code={code} filename={`${id ?? title}.example.tsx`} variant="chalkboard" />
          </div>
        )}
      </div>
    </div>
  );
};