import type { PropDef } from '../components/prop-table';

export function getDefaultValue(prop: PropDef): string | boolean {
  if (prop.type === 'boolean') return prop.default === 'true';
  if (prop.default) {
    const match = prop.default.match(/^'(.+)'$/);
    if (match) return match[1];
    return prop.default;
  }
  const options = prop.type.match(/^'(.+)'$/);
  if (options) return options[1].split("' | '")[0];
  return '';
}
