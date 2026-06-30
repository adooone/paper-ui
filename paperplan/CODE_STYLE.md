# Paper UI — Code Style Guide

> This guide is for AI agents and contributors. Review it before every code change.

---

## 1. One Component Per File

**Rule:** Every `.tsx` file in `src/components/` or `src/showcase/components/` must contain **exactly one exported React component**.

**Why:**
- Keeps files focused and readable
- Makes imports predictable
- Enables tree-shaking
- Prevents merge conflicts

**Correct:**
```tsx
// button.tsx
export function Button({ ... }) { ... }

// icon-button.tsx  
export function IconButton({ ... }) { ... }
```

**Incorrect:**
```tsx
// buttons.tsx
export function Button({ ... }) { ... }
export function IconButton({ ... }) { ... }  // ❌ wrong
```

**What counts as "one component":**
- One main function component
- Its props interface
- Small inner helper functions that are NOT renderable components (e.g. `cn()`, `formatDate()`)

**What does NOT belong in the same file:**
- Secondary UI components (extract to their own file)
- Reusable sub-components used 3+ times (e.g. `Swatch`, `CopyButton`)
- Data/constants (extract to `lib/` or `data/`)
- Complex logic/helpers (extract to `utils/`)
- Hooks (extract to `hooks/`)

---

## 2. File & Export Naming

| Rule | Example |
|------|---------|
| File name = kebab-case of component name | `icon-button.tsx` for `IconButton` |
| Named export only (no default export) | `export function Button(...) { ... }` |
| Re-export via the directory `index.ts` barrel | `export { Button } from './button';` |
| Props interface = `{ComponentName}Props` | `ButtonProps`, `PageProps` |

---

## 3. Imports

**Order (top to bottom):**
1. React / framework imports
2. Third-party libraries
3. Absolute project imports (`@/` or `~/`)
4. Relative sibling imports
5. Types (`import type`)

**Example:**
```tsx
import { useState, useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './button.module.scss';
```

---

## 4. Directory Structure

```
src/
├── components/           # Library components (1 per file)
│   ├── button/
│   │   ├── button.tsx
│   │   ├── button.module.scss
│   │   └── index.ts      # Re-exports
│   └── ...
├── showcase/
│   ├── components/       # Showcase-only components (1 per file)
│   │   ├── copy-button.tsx
│   │   ├── code-block.tsx
│   │   └── texture-swatches.tsx
│   ├── lib/              # Data, types, helpers (no components)
│   │   └── textures.ts
│   └── pages/
│       └── ...
├── utils/                # Shared utility functions
│   └── style-helpers.ts
├── styles/               # SCSS tokens, mixins, textures
│   └── ...
└── types/                # Global type declarations
    └── ...
```

---

## 5. ClassName Construction

**Always use the `cn()` helper.** Never manually concatenate class strings.

**Correct:**
```tsx
className={cn(styles.button, styles[size], isActive && styles.active)}
```

**Incorrect:**
```tsx
className={`${styles.button} ${styles[size]} ${isActive ? styles.active : ''}`}
```

---

## 6. Style Rules

- Use **SCSS modules** for library component styles
- Use **Tailwind classes** for layout/spacing in showcase pages
- Use **SCSS tokens** (`$color-accent-blue`) instead of hardcoded hex values
- No arbitrary hex colors in component `.tsx` files — use tokens or CSS variables

---

## 7. Accessibility

- All interactive elements must be `<button>` with `type="button"`
- Include `aria-label` or `title` on icon-only buttons
- Never use `role="button"` with incomplete keyboard handlers
- Focus states must be visible (`focus-visible`)

---

## 8. Pre-Commit Checklist

Before finishing any task, verify:

- [ ] Each `.tsx` file contains only **1 exported React component**
- [ ] `pnpm run check-types` passes
- [ ] `pnpm run build` passes
- [ ] No dead imports, unused variables, or commented-out code
- [ ] All hardcoded colors use tokens
- [ ] `cn()` is used for className construction

---

*Last updated: Plan 006 — Codebase Cleanup*
