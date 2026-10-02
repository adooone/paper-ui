import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const scssPath = join(dirname(fileURLToPath(import.meta.url)), 'stamp.module.scss');
const source = readFileSync(scssPath, 'utf-8');

function extractRule(css: string, selector: string): string {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`rule ${selector} not found`);
  const bodyStart = css.indexOf('{', start) + 1;
  let depth = 1;
  let i = bodyStart;
  while (depth > 0) {
    if (css[i] === '{') depth++;
    if (css[i] === '}') depth--;
    i++;
  }
  return css.slice(bodyStart, i - 1);
}

describe('stamp.module.scss', () => {
  it('sets the static stamp line-height to 1.2', () => {
    expect(extractRule(source, '.stamp')).toMatch(/line-height:\s*1\.2;/);
  });

  it('does not let .pressable override the stamp line-height', () => {
    expect(extractRule(source, '.pressable')).not.toMatch(/line-height/);
  });
});
