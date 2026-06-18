# Plan 007 — Artistic SVG Button Backgrounds

## Overview

**Status:** ✅ Complete

**Goal:** Every button instance gets a unique wobbly organic blob shape via noise-based SVG cubic bezier paths. Hover triggers a hand-drawn pencil/ink highlight ring with a slightly offset path. No two buttons look identical.

**Scope:** `Button` and `IconButton` components — JS path generation + inline SVG + SCSS modules.

**Related:** [`ideas.md`](../ideas.md) — Idea #001

---

## Context

Currently, Paper UI buttons use solid-color or gradient fills with `border-radius` for shape. The watercolor wash effect is simulated with a radial gradient overlay. This is clean but generic.

The goal is to make buttons feel hand-painted — with irregular edges, uneven pigment, and a tactile shape that varies by variant (primary vs secondary vs ghost vs danger).

---

## Visual Design

### Shape Language

| Variant | Shape Character |
|---------|----------------|
| **Primary** | Broad, confident watercolor wash — slightly rounded but with organic bleed |
| **Secondary** | Thinner, more controlled stroke — like a loaded brush dragged once |
| **Ghost** | Barely-there wash — pale stain with visible paper grain through it |
| **Danger** | Angry, splattered edge — rougher, more energetic stroke |

### Shared Properties

- Edge wobble: ±2–4px deviation from a rounded rectangle
- Pigment distribution: darker at perimeter, lighter/patchy in center
- All shapes stretch to fill button width (SVG `preserveAspectRatio="none"`)
- Color controlled via CSS custom properties for theming

---

## Implementation

### SVG Shape Strategy

**Option A — Inline SVG in SCSS:**
- Encode SVG as data URI per variant
- Pros: no extra requests, works with SCSS modules
- Cons: harder to animate filter values

**Option B — SVG filter + generic blob path:**
- One generic irregular path per variant
- Color + texture via SVG `feTurbulence` + `feDisplacementMap` filters
- Filter params animated on hover via CSS custom properties
- **Chosen approach** — more flexible, consistent with paint diffusion aesthetic

### Path Generation Algorithm

```
1. Divide a circle into 14 segments
2. Add radial noise: radius = base + noise * wobble
3. Add angular noise: angle = baseAngle + noise * 0.35
4. Convert to Cartesian coordinates
5. Build smooth closed cubic bezier path via Catmull-Rom spline
```

**Result:** Truly wavy, uncertain edges with 14 control points — nothing like an ellipse.

### Hover / Active States

| State | Behavior |
|-------|----------|
| **Hover** | SVG `<path>` ring appears with `stroke` (hand-drawn ink line). Blob fill darkens |
| **Active** | Ring stroke darkens. Blob fill goes one shade darker |
| **Disabled** | `opacity: 0.5`, ring hidden |

---

## Phases

### Phase 1: Random Blob Generator

**Status:** ✅ Complete

| # | Task | Est. |
|---|------|------|
| 1.1 | Create `randomBlob()` utility — generates 8-value asymmetric `border-radius` strings | 30m |
| 1.2 | Create `randomRing()` utility — generates slightly offset ring shape for hover highlight | 15m |
| 1.3 | Wire into Button and IconButton via CSS custom properties `--blob` and `--ring` | 15m |

### Phase 2: Integrate into Button Component

**Status:** ✅ Complete

| # | Task | Est. |
|---|------|------|
| 2.1 | Replace `.primary`, `.secondary`, `.ghost`, `.danger` backgrounds in `button.module.scss` with `clip-path` + radial gradient blobs | 1.5h |
| 2.2 | Wire CSS custom properties for color theming | 30m |
| 2.3 | Implement hover/active filter transitions | 1h |
| 2.4 | Ensure text contrast passes WCAG on all variants | 30m |

### Phase 3: Integrate into IconButton Component

**Status:** ✅ Complete

| # | Task | Est. |
|---|------|------|
| 3.1 | Adapt SVG shapes for circular icon-button bounds | 1h |
| 3.2 | Update `icon-button.module.scss` | 30m |

### Phase 4: Showcase Updates

**Status:** ✅ Complete (no changes needed — random shapes visible on Components page)

| # | Task | Est. |
|---|------|------|
| 4.1 | Organic shapes and pencil ring hover visible automatically on Components page | — |
| 4.2 | Hover any button to see the hand-drawn ring highlight | — |

### Phase 5: Verify & Document

**Status:** ✅ Complete

| # | Task | Est. |
|---|------|------|
| 5.1 | `pnpm run check-types` | 5m |
| 5.2 | `pnpm run build` | 5m |
| 5.3 | Smoke-test all variants in showcase | 15m |
| 5.4 | Update `plans.md` and close plan | 5m |

---

## Definition of Done

- [x] Every button instance has a unique organic blob shape (random `border-radius`)
- [x] Hover triggers a hand-drawn pencil/ink ring (`::after` border with imperfect shape)
- [x] No shadows or elevation — purely color-based hover
- [x] Text remains readable (contrast ≥ 4.5:1)
- [x] No visual regressions in other components
- [x] `check-types` and `build` pass

---

## Actual Effort

| Phase | Actual |
|-------|--------|
| 1. Wobbly SVG path generator | ~1.5h |
| 2. Button integration (inline SVG) | ~1h |
| 3. IconButton integration | ~30m |
| 4. Showcase | — |
| 5. Verify | ~15m |
| **Total** | **~3.25h** |

## Result

- `src/utils/random-blob.ts` — `generateWobblyBlob()` and `generateWobblyRing()` using Catmull-Rom splines with configurable noise intensity (`wobble: 0-1`)
- `src/components/button/button.tsx` — `wobble` prop passed through to blob generator; re-renders SVG when changed
- `src/components/button/button.module.scss` — SVG `fill` transitions for hover, `stroke` ring opacity transition
- `src/components/icon-button/icon-button.tsx` — same `wobble` prop support
- `src/components/icon-button/icon-button.module.scss` — same SVG fill/stroke hover effect
- `src/showcase/pages/components.tsx` — slider control (0-100%) for adjusting blob wobble on the Button & IconButton preview
