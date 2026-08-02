# 014 — Surface System (fill × texture)

**Status:** 🚧 In Progress
**Owner:** decoupling surface fill color from texture grain

## Problem

A "surface" today is **texture-coupled color**: each `PaperTextureKey` carries a fixed
base fill (`textureColorMap`) plus a single darker step (`textureShadeMap`) that **only
`Table`'s header consumes** via `--pui-texture-shade`. `Card` exposes just
`surface: 'paper' | 'chalkboard'` (two fills) + `texture`. There is no way to say
"kraft grain, darker fill" or "this card, but rose" — so consumers reach for `!important`
overrides (paper-camp's feedback cards did exactly this to darken agent messages).

## Model

A surface = **texture (grain) × fill (palette color)**, produced by one shared
`getSurfaceStyles()` helper that every container can use identically.

- **Darkened variant** = the texture's own darker step (generalizes today's
  `textureShadeMap` from Table-only to any surface).
- **Any color on any surface** = the grain of any texture + a chosen palette fill.
- `getTextureStyles` / `resolveTexture` keep working by delegating to the new helper;
  `Table`'s `--pui-texture-shade` contract is preserved.

## Decisions (settled)

- **Fill scope:** paper neutrals + canvas ramp + **soft accent washes** (a pale tint of
  each accent: blue / green / amber / rose / slate). Accent washes are new tokens.
- **Shade depth:** a **single** darker step per texture (base + shade). No multi-level ramp.
- **Rollout this pass:** `Card` only. The helper is built to be reusable, but Layout
  header / Page / Island / Table / Modal are deferred to a later phase.

## Phases

- [x] **Phase 1 — Foundation (no component changes)**
  - Added soft accent-wash tokens (`$color-wash-*`) to `_tokens.scss`, mirrored in `tokens.ts`.
  - Added `SurfaceFillKey` + `surfaceFillMap` + `SurfaceConfig` and `getSurfaceStyles()` in `utils/textures.ts`.
  - `getTextureStyles` is now a thin alias over `getSurfaceStyles`; `resolveTexture` unchanged (behavior identical). Public exports added in `index.ts`.
  - `check-types` ✅ · `lint` ✅ · `build` ✅.
- [x] **Phase 2 — Card**
  - Added `shade?: boolean` and `fill?: SurfaceFillKey` to `CardProps`, mapped through `getSurfaceStyles`.
  - `surface='chalkboard'` and `texture` back-compatible; `texture={true}` now resolves to Card's default (`parchment`) rather than the generic `paper`.
  - Showcase: live shaded-kraft + rose-wash cards, props table + code example updated.
  - `check-types` ✅ · `lint` ✅ · `build` ✅.
- [ ] **Phase 3 — Other containers (deferred)**
  - Layout header, Page, Island, Table, Modal onto the shared helper.

## API sketch

```tsx
<Card texture="kraft" shade />      // darkened kraft (replaces the !important hack)
<Card fill="rose" />                // rose-washed paper card
<Card texture="kraft" fill="blue" /> // kraft grain, blue-wash fill
```
