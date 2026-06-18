# Plan 009 — Design System Cleanup & Single Source of Truth

**Status:** ✅ Completed  
**Created:** 2026-06-05  
**Completed:** 2026-06-05  
**Scope:** Fix all design token inconsistencies, eliminate duplicates, enforce single source of truth

---

## Problem Statement

The project has **3 disconnected sources of truth** for the same design values:
1. `src/styles/_tokens.scss` — SCSS variables
2. `tailwind.ts` — Tailwind preset (duplicates all SCSS tokens)
3. `src/utils/textures.ts` — JS runtime color maps (with drift: `#FDFCFA` vs `#FDFCF8`)

Additionally, **65+ hardcoded hex values** in component `.module.scss` files bypass the token system entirely, and there are **6+ duplicated code patterns** across the codebase.

---

## Goals

1. **Single source of truth** — `_tokens.scss` is the canonical source; Tailwind preset and TS textures derive from it
2. **Zero hardcoded hex** in component `.module.scss` files — every color references a token
3. **Zero hardcoded hex** in library `.tsx` files — use tokens or CSS variables
4. **Eliminate all code duplication** — shared utilities, extracted helpers, shared constants
5. **Enforce code style rules** — one component per file, `cn()` usage, proper imports

---

## Phase 1 — Token Audit & Harmonization

**Goal:** Establish `_tokens.scss` as the single source of truth and fix drift.

### Tasks

1. **Fix `textureColorMap.white` drift** in `src/utils/textures.ts:40`
   - Change `#FDFCFA` → `#FDFCF8` to match `$color-bg-base`
   - Or introduce `$color-bg-white: #FDFCFA` in `_tokens.scss` if the difference is intentional

2. **Fix duplicate accent tokens** in `src/styles/_tokens.scss:13-16`
   - `$color-accent-blue` and `$color-accent-green` are both `#8FB996`
   - If intentional (blue-green palette), add a comment. If error, differentiate values.

3. **Add missing token categories** to `src/styles/_tokens.scss`:
   - **Chalkboard opacity tokens:**
     ```scss
     $chalkboard-border-08: rgba(200, 210, 195, 0.08);
     $chalkboard-border-12: rgba(200, 210, 195, 0.12);
     $chalkboard-border-20: rgba(200, 210, 195, 0.2);
     $chalkboard-border-25: rgba(200, 210, 195, 0.25);
     ```
   - **Ghost button tokens:**
     ```scss
     $ghost-hover-fill: rgba(143, 185, 150, 0.12);
     $ghost-active-fill: rgba(143, 185, 150, 0.2);
     $ghost-border: rgba(61, 53, 43, 0.22);
     ```
   - **Watercolor blob tokens:**
     ```scss
     $watercolor-blob-color: rgba(143, 185, 150, 0.12);
     $watercolor-blob-size-sm: 160px;
     $watercolor-blob-size-lg: 300px;
     $watercolor-blur-sm: 40px;
     $watercolor-blur-lg: 60px;
     ```
   - **Font size tokens for values outside current scale:**
     ```scss
     $font-size-2xs: 0.75rem;
     $font-size-xs-alt: 0.8rem;
     $font-size-sm-alt: 0.85rem;
     $font-size-base-alt: 1.05rem;
     $font-size-md-alt: 1.15rem;
     ```

4. **Regenerate `tailwind.ts`** from `_tokens.scss` values to ensure they stay in sync. Add a comment in both files noting the other as the source of truth.

5. **Regenerate `textureColorMap`** in `src/utils/textures.ts` to reference token values (add a comment noting `_tokens.scss` as canonical).

### Verification

- `pnpm run check-types` passes
- `pnpm run build` passes
- Visual inspection: no color drift in showcase

---

## Phase 2 — Hardcoded Hex in Component SCSS (65+ fixes)

**Goal:** Replace all hardcoded hex values in `.module.scss` files with token references.

### Files to Fix (by priority)

| File | Hardcoded Hex Count | Key Colors to Replace |
|------|--------------------|-----------------------|
| `button.module.scss` | 14 | `#E8DEC8`, `#DDD2B8`, `#F5F0E4`, `#EDE6D6`, `#E8D4D4`, `#DEC4C4` |
| `icon-button.module.scss` | 8 | Same hover/active colors (duplicated from button) |
| `cells.module.scss` | 11 | `#1A1917`, `#FAF8F0`, `#A8A399`, `#3D5A42`, `#8C7D56` |
| `code-block.module.scss` | 7 | `#2B2926`, `#FAF8F0`, `#F5F1E6`, `#68635C` |
| `copy-button.module.scss` | 5 | `#68635C`, `#A8A399`, `#5E8A66`, `#d4e8cb` |
| `prop-table.module.scss` | 4 | `#5E8A66`, `#9E5E5E`, `#68635C` |
| `page.module.scss` | 5 | `#B5D4BA`, `#E4C9A8`, `#DEB5B5`, `#B0BEC8` |
| `island.module.scss` | 1 | `#E5DBC4` |
| `navigation-island.module.scss` | 0 | (check for rgba duplicates) |
| `input.module.scss` | 0 | (check for chalkboard rgba duplicates) |
| `select.module.scss` | 0 | (check for chalkboard rgba duplicates) |
| `table.module.scss` | 0 | (check for chalkboard rgba duplicates) |

### Mapping: Common Hardcoded Values → Token

| Hardcoded Value | Token Reference |
|-----------------|-----------------|
| `#1A1917` | `$color-text-primary` |
| `#68635C` | `$color-text-secondary` |
| `#A8A399` | `$color-text-tertiary` |
| `#FDFCF8` | `$color-bg-base` |
| `#FAF8F0` | `$color-bg-surface` |
| `#F5F1E6` | `$color-bg-elevated` |
| `#E5DBC4` | `$color-canvas-300` *(new token — see Issues N1)* |
| `#F0EAD8` | `$color-canvas-base` |
| `#142e22` | `$color-chalkboard-bg` |
| `#e8e4d9` | `$color-chalkboard-text` |
| `#d4e8cb` | `$color-chalkboard-chalk` |
| `#a8b5a0` | `$color-chalkboard-muted` |
| `#B5D4BA` | `$color-accent-blue-light` / `$color-accent-green-light` |
| `#E4C9A8` | `$color-accent-amber-light` |
| `#DEB5B5` | `$color-accent-rose-light` |
| `#B0BEC8` | `$color-accent-slate-light` |
| `#5E8A66` | `watercolor.green.dark` (add SCSS token) |
| `#A67B4F` | `watercolor.amber.dark` (add SCSS token) |
| `#9E5E5E` | `$color-accent-rose-dark` |
| `#8C7D56` | `canvas.700` (add SCSS token) |

### Additional: Add missing tokens to `_tokens.scss`

```scss
$color-accent-blue-dark: #5E8A66;
$color-accent-amber-dark: #A67B4F;
$color-accent-slate-dark: #5E7080;
$color-canvas-300: #E5DBC4;   /* kraft texture / island bg — distinct from $color-canvas-dark (#D6C9A8) */
$color-canvas-700: #8C7D56;
```

> **⚠️ Note:** `$color-canvas-dark` is already defined as `#D6C9A8` (canvas.400). The value `#E5DBC4` (canvas.300, kraft color) requires a **new** token `$color-canvas-300` — do not reuse `$color-canvas-dark`.

### Verification

- `pnpm run check-types` passes
- `pnpm run build` passes
- Visual diff: no color changes (tokens resolve to same values)

---

## Phase 3 — Hardcoded Hex in Library .tsx Files

**Goal:** Remove all hardcoded hex colors from library component `.tsx` files.

### Files to Fix

| File | Line | Issue | Fix |
|------|------|-------|-----|
| `layout/layout.tsx` | 53 | `#FDFCF8` fallback | Use token via CSS variable or SCSS |
| `page/page.tsx` | 37 | `#FDFCF8` fallback | Use token via CSS variable or SCSS |

### Approach

Add CSS custom properties for runtime-accessible base colors in `globals.scss`:

```scss
:root {
  --pui-bg-base: #{$color-bg-base};
  --pui-bg-surface: #{$color-bg-surface};
}
```

Then reference `var(--pui-bg-base)` in the `.tsx` files instead of hardcoded hex.

### Verification

- `pnpm run check-types` passes
- `pnpm run build` passes

---

## Phase 4 — Extract Duplicated Code

**Goal:** Eliminate all identified code duplication.

### 4a. Extract `CloseIcon` SVG

**Current:** Near-identical SVG in `alert.tsx:136-153` and `modal.tsx:66-83`

> **⚠️ Correction (N4):** Sizes differ — alert is `16×16`, modal is `18×18`. SVG paths are identical (`<line>` elements). The shared component needs a `size` prop.

**Action:** Create `src/components/shared/close-icon.tsx`:
```tsx
export function CloseIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
```

Use `<CloseIcon size={16} />` in alert and `<CloseIcon size={18} />` in modal.

**Note:** Since it's a pure SVG helper, belongs in `src/utils/icons.tsx` or `src/components/shared/`.

### 4b. Extract Button Sizing Constant

**Current:** Identical inline styles in `navigation-island.tsx:50` and `layout.tsx:173`

```ts
{ height: 32, lineHeight: '32px', padding: '0 16px' }
```

**Action:** Create a shared constant in `src/utils/style-helpers.ts`:
```ts
export const buttonSizeCompact = { height: 32, lineHeight: '32px', padding: '0 16px' } as const;
```

Import in both files.

### 4c. Extract `accentClassMap`

**Current:** Identical Record in `card.tsx:15-21` and `page.tsx:16-22`

Since `card` and `page` use different SCSS modules, the map references their local styles. Extract the *pattern* as a shared factory:

```ts
// src/utils/accent-class-map.ts
export function createAccentClassMap(styles: Record<string, string>) {
  return { blue: styles.blue, green: styles.green, amber: styles.amber, rose: styles.rose, slate: styles.slate };
}
```

> **⚠️ Fix (N6):** Do NOT add `import type { Record } from 'typescript'` — `Record<K, V>` is a built-in TypeScript utility type, not importable from any module.

### 4d. Extract `getDefaultValue`

**Current:** Nearly identical in `prop-table.tsx:35-45` and `detail-sidebar.tsx:25-35`

**Action:** Move to `src/utils/prop-helpers.ts`:
```ts
export function getDefaultValue(defaultValue?: string | boolean | number): string { ... }
```

Import in both files.

### 4e. Extract `categoryColors`

**Current:** Same pattern in `component-section.tsx:27-32` and `docs.tsx:228-230`

> **⚠️ Key case mismatch (N8):** The two files use different key conventions:
> - `component-section.tsx`: lowercase keys (`basic`, `form`, `layout`, …)
> - `docs.tsx`: Title-case keys (`Basic`, `Form`, `Layout`, …)
>
> Also the value shape differs: component-section uses `{ bg: string; text: string }` while docs.tsx appears to use the same shape. Unify to lowercase keys when extracting.

**Action:** Create `src/showcase/lib/category-colors.ts`:
```ts
export const categoryColors: Record<string, { bg: string; text: string }> = {
  basic:      { bg: 'rgba(143, 185, 150, 0.2)', text: '#5E8A66' },
  form:       { bg: 'rgba(181, 212, 186, 0.2)', text: '#5E8A66' },
  layout:     { bg: 'rgba(228, 201, 168, 0.2)', text: '#A67B4F' },
  navigation: { bg: 'rgba(176, 190, 200, 0.2)', text: '#5E7080' },
  feedback:   { bg: 'rgba(222, 181, 181, 0.2)', text: '#9E5E5E' },
  overlay:    { bg: 'rgba(168, 155, 168, 0.2)', text: '#6E5E6E' },
};
```

Update both files and standardise on lowercase keys. `docs.tsx` will need its category lookup keys converted to lowercase.

### 4f. Extract Chalkboard Fallback Pattern

**Current:** Repeated pattern — but implementations differ per component (N7):

- `table.tsx:41-45` — exact 3-way ternary (`texture` → chalkboard variant → paper):
  ```ts
  const textureStyles = texture
    ? getTextureStyles(texture)
    : variant === 'chalkboard'
      ? getTextureStyles({ texture: 'chalkboard', ruledType: 'none' })
      : getTextureStyles({ texture: 'paper', ruledType: 'none' });
  ```
- `modal.tsx:31-35` — uses `withTexture` boolean, no chalkboard variant check, result can be `undefined`
- `select.tsx:182-186` — same as modal (withTexture only, no variant check)

> **⚠️ Correction (N7):** Only `table.tsx` has the exact 3-way ternary. Modal and select use a `withTexture`-only pattern. The helper should handle both signatures or only target the table pattern.

**Action:** Create `src/utils/get-default-texture.ts` focused on the variant-aware pattern:
```ts
export function getVariantTexture(variant?: string, texture?: TextureConfig): React.CSSProperties {
  if (texture) return getTextureStyles(texture);
  if (variant === 'chalkboard') return getTextureStyles({ texture: 'chalkboard', ruledType: 'none' });
  return getTextureStyles({ texture: 'paper', ruledType: 'none' });
}
```

Apply to `table.tsx`. Leave `modal.tsx` and `select.tsx` as-is (different semantics).

### 4g. Eliminate Duplicated Ghost/Primary/Danger Button Styles

**Current:** `button.module.scss`, `icon-button.module.scss`, `navigation-island.module.scss` all copy-paste the same variant styles.

**Action:** Create `src/styles/_button-variants.scss`:
```scss
@mixin button-ghost-styles {
  .blobFill { fill: transparent; }
  &:hover .blobFill { fill: $ghost-hover-fill; }
  &:active .blobFill { fill: $ghost-active-fill; }
  .blobRing { stroke: $ghost-border; }
}

@mixin button-primary-styles { ... }
@mixin button-danger-styles { ... }
```

Import in all three SCSS modules.

### Verification

- `pnpm run check-types` passes
- `pnpm run build` passes
- Grep for old patterns to confirm elimination

---

## Phase 5 — Fix Code Style Violations

**Goal:** Enforce CODE_STYLE.md rules.

### 5a. Split `table/cells.tsx`

**Current:** 3 components in one file (`TableCellToggle`, `TableCellInput`, `TableCellDropdown`)

**Action:**
- Create `src/components/table/table-cell-toggle.tsx` with `TableCellToggle`
- Create `src/components/table/table-cell-input.tsx` with `TableCellInput`
- Create `src/components/table/table-cell-dropdown.tsx` with `TableCellDropdown`
- Update `src/components/table/index.ts` to re-export all three
- Delete old `cells.tsx` and `cells.module.scss` (distribute to new files or shared module)

### 5b. Fix Import Inconsistencies

| File | Issue | Fix |
|------|-------|-----|
| `src/index.ts` (root barrel) | Imports from `./components/navigation-island/navigation-island` | Change to `./components/navigation-island` |
| `src/showcase/pages/layout.tsx` | Imports from `../../components/navigation-island/navigation-island` | Change to `../../components/navigation-island` |

### 5c. Fix `cn()` Usage in prop-table.tsx

**File:** `src/components/prop-table/prop-table.tsx:98`

**Current:** `className="font-mono text-xs text-amber-700"`  
**Fix:** Use `cn()` with Tailwind classes or extract to SCSS module.

### 5d. Fix `: any` in tokens.tsx

**File:** `src/showcase/pages/tokens.tsx:276,298`

**Current:** `(shade: any)`  
**Fix:** Type with a proper interface:
```ts
interface Shade {
  name: string;
  value: string;
  textColor?: string;
}
```

### 5e. Fix Inline Styles in Navigation Island

**File:** `src/components/navigation-island/navigation-island.tsx:30-36,50`

**Current:** Position and sizing via inline `style={}`  
**Fix:** Move to SCSS module:
```scss
.positioned {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 300;
}

.compactButton {
  height: 32px;
  line-height: 32px;
  padding: 0 16px;
}
```

### 5f. Fix Empty `catch` Block

**File:** `src/components/copy-button/copy-button.tsx:24`

**Current:** `catch {}` silently swallows errors  
**Fix:** Add console.error or fallback:
```ts
catch (err) {
  console.error('Failed to copy:', err);
}
```

### Verification

- `pnpm run check-types` passes
- `pnpm run build` passes
- `pnpm run lint` passes

---

## Phase 6 — Hardcoded Values in Showcase Files (Low Priority)

**Goal:** Reduce hardcoded hex in showcase pages where practical.

### Approach

- `tokens.tsx`: The hardcoded values here are **displaying the token values** — this is intentional. Leave as-is but add a comment that these are reference values.
- `components.tsx`: Extract demo color constants to `src/showcase/lib/demo-colors.ts`
- `texture-swatches.tsx`: Extract color data to `src/showcase/lib/texture-data.ts`
- `component-section.tsx` / `docs.tsx`: Use shared `categoryColors` (from Phase 4e)

### Verification

- `pnpm run check-types` passes
- `pnpm run build` passes

---

## Execution Order

| Phase | Depends On | Effort | Risk |
|-------|-----------|--------|------|
| 1. Token Audit | None | Medium | Low |
| 2. Hardcoded Hex in SCSS | Phase 1 (new tokens) | High | Low |
| 3. Hardcoded Hex in TSX | Phase 1 (CSS vars) | Low | Low |
| 4. Extract Duplicates | None (can parallel with 1-3) | Medium | Medium |
| 5. Code Style Violations | None | Medium | Low |
| 6. Showcase Cleanup | Phase 4e (categoryColors) | Low | Low |

**Recommended order:** Phase 1 → Phase 2 → Phase 3 → Phase 5 → Phase 4 → Phase 6

---

## Success Criteria

- [x] Zero hardcoded hex colors in `src/components/**/*.module.scss`
- [x] Zero hardcoded hex colors in `src/components/**/*.tsx`
- [x] `_tokens.scss` is the single source of truth (documented with header comment)
- [x] `tailwind.ts` and `textures.ts` reference `_tokens.scss` values (sync comments added, white drift fixed)
- [x] All duplicated code patterns eliminated (CloseIcon, buttonSizeCompact, accentClassMap, getDefaultValue, categoryColors, getVariantTexture)
- [x] `table/cells.tsx` split into 3 files (`table-cell-toggle.tsx`, `table-cell-input.tsx`, `table-cell-dropdown.tsx`)
- [x] All imports use barrel files consistently (NavigationIsland fixed in index.ts and layout.tsx)
- [x] `pnpm run check-types` passes
- [x] `pnpm run build` passes
- [ ] `pnpm run lint` passes (not verified — no lint script configured)
- [ ] No visual regression in showcase (verify manually)

---

## Issues & Corrections

*Found during codebase review on 2026-06-05. These correct or extend the original plan.*

---

### N1 — Plan mapping error: `#E5DBC4 ≠ $color-canvas-dark`

**File:** `src/components/island/island.module.scss:14`, `src/utils/textures.ts:39`  
**Problem:** The Phase 2 mapping table originally said `#E5DBC4 → $color-canvas-dark`, but `$color-canvas-dark = #D6C9A8` (canvas.400 in Tailwind). The value `#E5DBC4` is canvas.300 / the kraft texture color.  
**Fix:** Add a new token `$color-canvas-300: #E5DBC4` to `_tokens.scss`. Do not repurpose `$color-canvas-dark`.

---

### N2 — Undocumented color `#5e7a68` in code-block

**File:** `src/components/code-block/code-block.module.scss:48`  
**Problem:** `$chalk-muted: #5e7a68` is a local variable unique to code-block — NOT in `_tokens.scss` and NOT the same as `$color-chalkboard-muted (#a8b5a0)`. It appears to be an intentional darker shade for code-block syntax muted text (vs regular UI muted text).  
**Fix options:**
1. Add `$color-chalkboard-muted-dark: #5e7a68` to `_tokens.scss` and reference it
2. Document with a comment that this deviation is intentional

---

### N3 — Undocumented color `#2d4a35` in component-section

**File:** `src/showcase/components/component-section.tsx:45`  
**Problem:** `backgroundColor: '#2d4a35'` is hardcoded in the showcase's chalkboard card style. It's not in `_tokens.scss`. Closest tokens are `$color-chalkboard-surface (#1e3a2d)` or `$color-chalkboard-light (#264a3a)` — neither matches exactly.  
**Fix:** Either add `$color-chalkboard-card: #2d4a35` to tokens and expose as CSS var, or use `$color-chalkboard-light (#264a3a)` if visually acceptable.

---

### N4 — CloseIcon sizes differ (plan 4a said "identical")

**Files:** `src/components/alert/alert.tsx:136-153`, `src/components/modal/modal.tsx:66-83`  
**Problem:** Alert CloseIcon is `16×16`, modal CloseIcon is `18×18`. SVG paths are identical. The original plan said "Identical SVG" — they share the same path but differ in rendered size.  
**Fix:** Shared `CloseIcon` component must accept a `size` prop (default 16). Alert uses `size={16}`, modal uses `size={18}`.

---

### N5 — Redundant local `$chalk-*` variable declarations

**Files:**  
- `src/components/table/cells.module.scss:3-7`
- `src/components/code-block/code-block.module.scss:45-48`
- `src/components/prop-table/prop-table.module.scss:3-6`

**Problem:** Each file declares a block of local `$chalk-*` variables at the top that duplicate `$color-chalkboard-*` tokens from `_tokens.scss` — yet all three files also already import tokens via `@use '../../styles/tokens' as *;`. The local variables are dead weight.  
**Fix:** Remove local `$chalk-*` declarations and replace usages with the already-imported `$color-chalkboard-*` tokens directly. Exception: `code-block`'s `$chalk-muted: #5e7a68` (see N2 — different value).

---

### N6 — Plan 4c alternative code has invalid TypeScript import

**Location:** Phase 4c alternative suggestion  
**Problem:** The original text suggested `import type { Record } from 'typescript'` — but `Record<K, V>` is a built-in TypeScript utility type. It is not importable from any module and this line would cause a compile error.  
**Fix:** Already corrected inline in Phase 4c above — no import needed.

---

### N7 — Phase 4f overstates duplication (modal/select differ from table)

**Files:** `src/components/table/table.tsx:41-45`, `src/components/modal/modal.tsx:31-35`, `src/components/select/select.tsx:182-186`  
**Problem:** Modal and select use a `withTexture` boolean prop (result can be `undefined`), not the variant-aware 3-way ternary that table uses. The patterns are related but not identical. Extracting all three into one helper without care would change modal/select semantics.  
**Fix:** Extract helper for table's pattern only. Leave modal/select untouched or handle separately.

---

### N8 — `categoryColors` key case mismatch between the two files

**Files:** `src/showcase/components/component-section.tsx:26-33`, `src/showcase/pages/docs.tsx:227-232`  
**Problem:** Component-section uses lowercase keys (`basic`, `form`, `layout`, …), docs.tsx uses Title-case keys (`Basic`, `Form`, `Layout`, …). Extraction requires choosing one convention and updating the call sites.  
**Fix:** Standardise on lowercase (matches the prop type in `ComponentSectionProps`). Update docs.tsx to use lowercase lookup keys when calling the shared map.

---

*Created from audit of 19 library components, 7 showcase components, 5 showcase pages, 2 style files, 1 Tailwind preset, 1 texture utility.*  
*Issues N1–N8 added 2026-06-05 during post-creation codebase review.*
