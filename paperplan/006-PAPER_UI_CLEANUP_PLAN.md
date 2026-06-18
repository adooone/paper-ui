# Plan 006: Paper UI — Codebase Cleanup & Quality Audit

## Overview

**Status:** ✅ Completed

**Goal:** Fix remaining errors, remove dead code, standardize patterns, and optimize all code to be clean, simple, and consistent across the entire codebase.

**Scope:** All source files in `src/` — library components, SCSS modules, utilities, styles, and showcase app.

---

## Issues Discovered During Audit

### 🔴 Critical Bugs

| # | Issue | File | Impact |
|---|-------|------|--------|
| 1 | `speckle` texture missing from `textureMap` and `colorMap` in Layout | `layout.tsx` | Selecting `speckle` background produces `undefined` CSS values |
| 2 | Docs quick-start references non-existent `@dendelion/paper-ui/globals.scss` export | `docs.tsx` | Misleading documentation — correct import is `import '@dendelion/paper-ui'` |
| 3 | `Checkbox` imported but unused in Docs page | `docs.tsx` | Dead import, potential tree-shaking issue |

### 🟡 Code Quality / Consistency

| # | Issue | File | Impact |
|---|-------|------|--------|
| 4 | NavigationIsland has `export default` inconsistent with other components | `navigation-island.tsx` | Breaks the named-export-only pattern used by all other components |
| 5 | NavigationIsland uses `React.ReactNode` instead of direct import | `navigation-island.tsx` | Inconsistent with rest of codebase |
| 6 | Components manually concatenate className strings instead of using `cn()` | All `*.tsx` | Fragile, produces `"undefined"` in className when conditions are false, harder to maintain |
| 7 | `Page` component has very long inline className template with `.charAt(0).toUpperCase()` | `page.tsx` | Verbose, should use simple helper or `cn()` |
| 8 | Layout mobile overlay uses `role="button"` with incomplete keyboard handling | `layout.tsx` | Accessibility gap — only Escape handled, not Enter/Space |
| 9 | Hardcoded color hex values in component styles instead of tokens | `button.module.scss`, `checkbox.module.scss`, `icon-button.module.scss` | Brittle — token changes won't propagate |

### 🟠 Dead Code Removal

| # | Dead Code | File | Note |
|---|-----------|------|------|
| 10 | `getHandwrittenSizeClass()` | `style-helpers.ts` | Never called |
| 11 | `getIconButtonSize()` | `style-helpers.ts` | Never called |
| 12 | `getWatercolorColor()` | `style-helpers.ts` | Never called |
| 13 | `paper-grain-overlay` mixin | `_mixins.scss` | Never used |
| 14 | `watercolor-blob` mixin | `_mixins.scss` | Never used |
| 15 | `pressed-stamp` mixin | `_mixins.scss` | Never used (token `$shadow-pressed` is used instead) |
| 16 | `handwritten-text` mixin | `_mixins.scss` | Never used |
| 17 | `ink-border` mixin | `_mixins.scss` | Never used |
| 18 | `ink-border-hover` mixin | `_mixins.scss` | Never used |
| 19 | `ruled-paper` mixin | `_mixins.scss` | Never used |
| 20 | `paper-shadow` mixin | `_mixins.scss` | Never used (tokens used directly) |
| 21 | `$wood-grain-pattern` | `_textures.scss` | Never used |
| 22 | `src/styles/index.scss` | `styles/index.scss` | Never imported, serves no purpose |

### 🔵 Minor Cleanups

| # | Issue | File |
|---|-------|------|
| 23 | `tsconfig.json` has `"declaration": true` but `vite-plugin-dts` handles declarations | `tsconfig.json` |
| 24 | Showcase `ReactDOM` import at bottom of `showcase.tsx` should use `react-dom/client` directly | `showcase.tsx` |
| 25 | `layout.tsx` footer and header use hardcoded inline `fontFamily` styles | `layout.tsx` |

---

## Implementation Phases

### Phase 1: Fix Critical Bugs

**Status:** ✅ Complete

| # | Task |
|---|------|
| 1.1 | Add `speckle` to `textureMap` and `colorMap` in `layout.tsx` |
| 1.2 | Fix docs quick-start code to use correct import path |
| 1.3 | Remove unused `Checkbox` import from `docs.tsx` |

### Phase 2: Standardize Component Patterns

**Status:** ✅ Complete

| # | Task |
|---|------|
| 2.1 | Remove `export default` from `navigation-island.tsx`, import `ReactNode` directly |
| 2.2 | Use `cn()` utility (or simple helper) for className construction in all library components |
| 2.3 | Simplify `Page` accent color className logic |
| 2.4 | Fix Layout mobile overlay accessibility |

### Phase 3: Remove Dead Code

**Status:** ✅ Complete

| # | Task |
|---|------|
| 3.1 | Remove unused helper functions from `style-helpers.ts` |
| 3.2 | Remove unused mixins from `_mixins.scss` |
| 3.3 | Remove unused `$wood-grain-pattern` from `_textures.scss` |
| 3.4 | Delete `src/styles/index.scss` |

### Phase 4: Token Consistency

**Status:** ✅ Complete

| # | Task |
|---|------|
| 4.1 | Replace hardcoded hex values in `button.module.scss` with token variables |
| 4.2 | Replace hardcoded hex values in `checkbox.module.scss` with token variables |
| 4.3 | Replace hardcoded hex values in `icon-button.module.scss` with token variables |
| 4.4 | Replace hardcoded hex values in `layout.tsx` inline styles with tokens or CSS variables |

### Phase 5: Verify & Document

**Status:** ✅ Complete

| # | Task |
|---|------|
| 5.1 | Run `pnpm run check-types` |
| 5.2 | Run `pnpm run build` |
| 5.3 | Run `pnpm run dev` and smoke-test showcase pages |
| 5.4 | Update `plans.md` with completion status |

---

## Definition of Done

- [x] `pnpm run check-types` passes with zero errors
- [x] `pnpm run build` succeeds with no warnings
- [x] All 6 library components render correctly in showcase
- [x] No dead imports, dead functions, or dead mixins remain
- [x] All components use consistent export patterns (named exports via `index.ts`)
- [x] ClassName construction is robust (no manual `undefined` in strings)
- [x] No hardcoded color hex values in library component styles
- [x] Mobile overlay accessibility is correct

---

## Estimated Effort

| Phase | Estimate |
|-------|----------|
| 1. Bug Fixes | 15 min |
| 2. Component Standardization | 30 min |
| 3. Dead Code Removal | 20 min |
| 4. Token Consistency | 25 min |
| 5. Verification | 15 min |
| **Total** | **~1.5 hours** |
