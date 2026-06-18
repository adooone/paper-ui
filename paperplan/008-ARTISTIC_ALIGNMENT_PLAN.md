# Plan 008 — Artistic Design Alignment for v0.2 Components

## Overview

**Status:** 🚧 In Progress

**Goal:** Align the visual language of all recently added v0.2 components (Table, Input, Alert, Select, Modal) with the established organic, hand-drawn aesthetic of the original MVP components (Button, IconButton, Checkbox, BlobBadge, Card, Page).

**Scope:** Input, Select, Alert, Modal, Table — SCSS modules, TSX structure, and showcase integration.

**Related:**
- Plan 007 (SVG blob backgrounds)
- Plan 005 (MVP component library)

---

## Context

The original Paper UI components establish a strong artistic identity:
- **Organic shapes**: wobbly SVG blob backgrounds (Button, IconButton, BlobBadge)
- **Hand-drawn borders**: asymmetric border-radius (Checkbox: `5px 4px 6px 5px`)
- **Ink & watercolor**: stroke-dasharray animations, pencil-ring hover, watercolor wash gradients
- **Paper texture**: subtle grain via SVG noise data URI
- **No generic glows**: focus states use ink/dotted outlines, not blue halos

The v0.2 components (Input, Select, Alert, Modal, Table) were added for feature coverage but largely ignore these artistic patterns. They use generic geometric styling — perfect border-radius, standard focus rings, flat color backgrounds, and digital-perfect borders. This creates a visual disconnect: some elements look hand-crafted, others look like stock UI.

---

## Visual Design Direction

### Principles for All Components

1. **No perfect geometry** — borders and radii should have subtle imperfection
2. **No generic glows** — focus states should feel like ink or pencil marks
3. **Watercolor, not flat paint** — use radial-gradient washes and low-opacity organic shapes instead of flat rgba tints
4. **Blob language** — where appropriate, integrate the SVG blob system for backgrounds and hover states
5. **Iconography** — every alert/status variant should have a distinct visual symbol

---

## Issues Catalog

### Input

| # | Issue | Severity |
|---|-------|----------|
| 1 | Perfect `border-radius: $radius-sm` (8px). No hand-drawn imperfection. | Medium |
| 2 | Generic blue glow focus ring (`box-shadow: 0 0 0 3px rgba(...)`). Does not match Button/Checkbox focus style. | High |
| 3 | No organic shape language — just a flat rectangle with texture. Missing the blob/wobble identity. | Medium |
| 4 | Error state uses flat red border + red shadow. Should use watercolor wash. | Medium |
| 5 | Helper text is plain. Underutilizes `$font-family-handwritten` which could add artistic flair. | Low |

### Select

| # | Issue | Severity |
|---|-------|----------|
| 1 | Same generic radius and focus ring as Input. | High |
| 2 | Chevron is a perfectly geometric polyline. Could be slightly hand-drawn or have a blob behind it. | Low |
| 3 | No visual differentiation from Input. Needs a distinct identity (e.g., small folded corner or stamp edge). | Medium |
| 4 | Native `<select>` dropdown is unstyled. Acceptable limitation, but the closed state should be maximally artistic. | Low |

### Alert

| # | Issue | Severity |
|---|-------|----------|
| 1 | **Missing variant icons**. No info/warning/success/error symbols. Critical for accessibility and artistic identity. | High |
| 2 | `border-radius: $radius-md` perfect. Needs organic imperfection. | Medium |
| 3 | Hardcoded hex text colors (`#4A5A66`, `#3D5A42`, `#6B5135`, `#6E3A3A`) instead of semantic tokens. | Medium |
| 4 | Background is flat rgba tint (`rgba(176, 190, 200, 0.18)`). Should use watercolor wash blobs like Card/Page. | High |
| 5 | Dismiss button uses generic `rgba(0,0,0,0.06)` hover. Should use blob/ring hover pattern. | Medium |
| 6 | No left accent/stamp. A watercolor brush-stroke bar on the left would add artistic character. | Low |

### Modal

| # | Issue | Severity |
|---|-------|----------|
| 1 | **Torn edge effect is broken/unnatural**. `clip-path: polygon` with evenly spaced points creates a mechanical sawtooth, not organic torn paper. | High |
| 2 | Close button is generic. Should use IconButton pattern or at least a blob background. | Medium |
| 3 | Backdrop uses `backdrop-filter: blur(3px)` — modern glass aesthetic, not paper/ink studio. | Medium |
| 4 | `border-radius: $radius-lg` (20px) everywhere. Needs organic imperfection. | Medium |
| 5 | Missing watercolor accent option. Card/Page offer accent blobs; Modal should too. | Low |

### Table

| # | Issue | Severity |
|---|-------|----------|
| 1 | `border-radius: $radius-md` on wrapper. Needs organic imperfection. | Low |
| 2 | Grid cell borders are perfectly straight digital lines (`1.5px solid rgba(...)`). Hand-drawn ledger should have slight irregularity. | Medium |
| 3 | Row hover is nearly invisible (`rgba(143,185,150,0.06)`). Should be a noticeable watercolor wash. | Medium |
| 4 | Header cells are flat despite texture. Needs watercolor wash or ink stamp. | Medium |
| 5 | Toolbar search input duplicates Input CSS inline instead of using the Input component. Risks divergence. | Medium |
| 6 | Ruled variant lines are mathematically perfect. Real notebook lines have wobble. | Low |
| 7 | Missing ledger/page artistic touches (column guides, margin lines). | Low |

### Cross-Cutting

| # | Issue | Severity |
|---|-------|----------|
| 1 | **Blob/wobble language absent from all v0.2 components**. The defining artistic feature of Paper UI is missing from the newest additions. | High |
| 2 | Focus states are identical generic glows across Input, Select, and Table search. Should match the ink/dotted focus of Button/Checkbox. | High |
| 3 | `$font-family-handwritten` exists in tokens but is never used in any component. | Low |

---

## Implementation Phases

### Phase 1: Shared Artistic Utilities

**Objective:** Create reusable SCSS mixins and patterns that all components can use.

**Tasks:**

| # | Task | File | Est |
|---|------|------|-----|
| 1.1 | Add `organic-radius()` mixin — generates asymmetric border-radius like Checkbox | `_mixins.scss` | 15m |
| 1.2 | Add `watercolor-wash()` mixin — radial gradient blob | `_mixins.scss` | 15m |
| 1.3 | Add `ink-focus()` mixin — replaces generic glow with `outline: 2px dotted $color-text-tertiary; outline-offset: 2px` or similar | `_mixins.scss` | 10m |
| 1.4 | Add `ruled-lines-wobbly()` mixin — repeating gradient with slight opacity variation for notebook feel | `_mixins.scss` | 20m |
| 1.5 | Update tokens if needed (e.g., add `$color-focus-ring` token) | `_tokens.scss` | 10m |

**Completed:** All mixins added and token updated. `check-types` and `build` pass.

### Phase 2: Input & Select Overhaul

**Objective:** Give form components organic borders, ink focus, and watercolor error states.

**Tasks:**

| # | Task | File | Est |
|---|------|------|-----|
| 2.1 | Replace `border-radius: $radius-sm` with `organic-radius()` in Input & Select | `input.module.scss`, `select.module.scss` | 10m |
| 2.2 | Replace generic focus box-shadow with `ink-focus()` mixin | `input.module.scss`, `select.module.scss` | 10m |
| 2.3 | Add subtle watercolor wash on Input/Select wrapper on focus (via `::before` blob or gradient) | `input.module.scss`, `select.module.scss` | 30m |
| 2.4 | Replace flat error red shadow with watercolor wash in error tone | `input.module.scss`, `select.module.scss` | 15m |
| 2.5 | Differentiate Select: add a small folded-paper corner or stamp edge effect on the right side | `select.module.scss` | 20m |
| 2.6 | Optionally use `$font-family-handwritten` for helper text or placeholder | `input.module.scss`, `select.module.scss` | 10m |

### Phase 3: Alert Overhaul

**Objective:** Turn Alert into a watercolor message box with variant icons and organic shape.

**Tasks:**

| # | Task | File | Est |
|---|------|------|-----|
| 3.1 | Add hand-drawn SVG variant icons (info, success, warning, error) to Alert component | `alert.tsx` | 30m |
| 3.2 | Replace flat rgba backgrounds with `watercolor-wash()` mixin per variant | `alert.module.scss` | 20m |
| 3.3 | Replace hardcoded hex text colors with semantic tokens | `alert.module.scss` | 10m |
| 3.4 | Apply `organic-radius()` to alert container | `alert.module.scss` | 5m |
| 3.5 | Add left-side watercolor "ink stamp" accent bar (pseudo-element with radial gradient) | `alert.module.scss` | 20m |
| 3.6 | Replace dismiss button with blob-background hover (or use IconButton) | `alert.tsx`, `alert.module.scss` | 20m |

### Phase 4: Modal Overhaul

**Objective:** Fix torn edge, replace glass backdrop, add organic shape.

**Tasks:**

| # | Task | File | Est |
|---|------|------|-----|
| 4.1 | Redesign torn edge with SVG-based irregular path instead of `clip-path: polygon` | `modal.module.scss` | 30m |
| 4.2 | Replace `backdrop-filter: blur(3px)` with textured paper/ink wash overlay (e.g., noise texture + tint) | `modal.module.scss` | 20m |
| 4.3 | Apply `organic-radius()` to modal container | `modal.module.scss` | 5m |
| 4.4 | Replace close button with IconButton or add blob hover background | `modal.tsx`, `modal.module.scss` | 15m |
| 4.5 | Add optional `accent` / `accentColor` props with watercolor blob decoration | `modal.tsx`, `modal.module.scss` | 15m |

### Phase 5: Table Overhaul

**Objective:** Make the table feel like a hand-ruled ledger, not a data grid.

**Tasks:**

| # | Task | File | Est |
|---|------|------|-----|
| 5.1 | Apply `organic-radius()` to wrapper | `table.module.scss` | 5m |
| 5.2 | Make grid borders slightly irregular (opacity variation, dashed feel, or pseudo-elements) | `table.module.scss` | 20m |
| 5.3 | Increase row hover wash opacity and use watercolor gradient instead of flat tint | `table.module.scss` | 10m |
| 5.4 | Add watercolor wash to header row background | `table.module.scss` | 10m |
| 5.5 | Refactor toolbar search to use the Input component directly instead of duplicated CSS | `table.tsx`, `table.module.scss` | 20m |
| 5.6 | Add wobble/irregularity to ruled variant lines | `table.module.scss` | 15m |

### Phase 6: Showcase & Verification

**Objective:** Update the Components page to show off the new artistic treatments and verify build.

**Tasks:**

| # | Task | File | Est |
|---|------|------|-----|
| 6.1 | Update Input showcase examples to demonstrate error states and focus | `components.tsx` | 10m |
| 6.2 | Update Select showcase to demonstrate differentiation | `components.tsx` | 10m |
| 6.3 | Update Alert showcase to show icons and dismissible variant | `components.tsx` | 10m |
| 6.4 | Update Modal showcase to show torn edge and accent options | `components.tsx` | 10m |
| 6.5 | Update Table showcase to show all three variants with improved style | `components.tsx` | 10m |
| 6.6 | `pnpm run check-types` | — | 5m |
| 6.7 | `pnpm run build` | — | 5m |
| 6.8 | Visual smoke test in browser | — | 15m |

---

## Definition of Done

- [ ] All v0.2 components use organic border-radius (not perfectly circular/square)
- [ ] Focus states use ink/dotted outline pattern, not generic blue glow
- [ ] Alert has distinct watercolor wash backgrounds and variant icons
- [ ] Modal torn edge looks like real torn paper, not digital sawtooth
- [ ] Modal backdrop feels like textured studio overlay, not glass blur
- [ ] Table borders and ruled lines feel hand-drawn, not CAD-perfect
- [ ] Input and Select have distinct visual identities
- [ ] No hardcoded hex colors in component SCSS (use tokens or mixin-generated values)
- [ ] `check-types` and `build` pass
- [ ] Showcase page demonstrates all artistic improvements

---

## Estimated Effort

| Phase | Complexity | Estimate |
|-------|------------|----------|
| 1. Shared utilities | Low | 1h |
| 2. Input & Select | Medium | 1.5h |
| 3. Alert | Medium | 1.5h |
| 4. Modal | Medium | 1.5h |
| 5. Table | Medium | 1.5h |
| 6. Showcase & verify | Low | 1h |

**Total: ~8 hours**

---

## Progress Summary

| Date | Phase | Status | Notes |
|------|-------|--------|-------|
| 2026-06-04 | Phase 1 | ✅ Completed | All mixins added; `$color-focus-ring` token added; build passes |
| 2026-06-04 | Phase 2 | ✅ Completed | Input & Select overhauled: organic radius, ink focus, watercolor wash, handwritten helper text, select folded corner |
| 2026-06-04 | Phase 3 | ✅ Completed | Alert overhauled: variant icons, watercolor wash backgrounds, ink stamp accent bar, organic radius, semantic tokens |
| 2026-06-04 | Phase 4 | ✅ Completed | Modal overhauled: organic radius, SVG path torn edge, textured backdrop (no blur), accent blob support, organic close button |
| 2026-06-04 | Phase 5 | ✅ Completed | Table overhauled: organic radius, watercolor header/hover, fuzzy ruled lines, artistic search input |
| 2026-06-04 | Phase 6 | ✅ Completed | Showcase updated: Modal demo with torn edge & accent variants; all builds pass |

---

## Notes

- **Independent of other pending plans** — Can run in parallel with 009 (dark mode) and 010 (watercolor diffusion) but should complete before them so dark mode can adapt the new artistic patterns.
- **Native `<select>` limitation** — The open dropdown options cannot be styled. This is accepted; focus is on the closed trigger state.
- **Blob integration in form components** — Full blob SVG backgrounds on Input/Select may feel too busy. We should use blobs sparingly: maybe only on focus or error wrappers, not as permanent backgrounds.
- **Reference components** — When in doubt, follow the artistic patterns established by `Checkbox` (asymmetric radius, SVG stroke animation), `Button` (blob fill + ring hover), and `Card` (watercolor radial gradient accent).
