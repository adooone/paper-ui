# Plan 013 — Full Design/Code Audit & Fix Batches

**Status:** 🚧 In Progress
**Created:** 2026-07-04
**Scope:** Findings from a full library audit (code sweep of all 34 exported components + visual pass over every gallery section on ui.adoo.one in both themes), and the fix batches that came out of it.

---

## Audit summary

Strong foundations confirmed: canonical token file, the two-mixin focus policy (solid `focus-ring` for clickables, dotted `ink-focus` for text fields), genuine keyboard/ARIA work in Select/Menu/Modal, reasoned biome-ignore comments. Score at audit time: ~72/100. The findings below are what pulled it down.

## Fixed batches (all committed 2026-07-04)

### Batch 1 — SCSS custom-property interpolation (`b07d73d`) — the headline bug
Sass emits custom-property values **verbatim**, so `--pui-dark: rgba($color-accent-slate, 0.45)` shipped the literal string `$color-accent-slate` to the browser (confirmed in the deployed ui.adoo.one stylesheet). At `var()` substitution time this invalidated the entire pencil-border `background-image` stack, so **Input, Textarea, Select and the Table search lost fill, texture and border exactly on `:focus` and error states** — fields rendered as bare white boxes (visible on the deployed Input/Textarea "Error" demos). 27 declarations across 4 files wrapped in `#{…}`.
Also: Button/IconButton hover+active blob states gated on `:not(:disabled)`; Modal got the `prefers-reduced-motion` guard the other animated components already had.
**Guardrail idea:** a stylelint rule (`declaration-property-value-disallowed-list` on `/^--/` values containing `$`) would make this bug class impossible.

### Batch 2 — forwardRef on all interactive controls (`d561f50`)
Button, IconButton, Input, Textarea, Checkbox, Radio, Switch forward refs to the real control element. Fixes silent ref failures (react-hook-form `register()`, programmatic focus). The Tooltip cloneElement workaround from plan 010 was a symptom of this gap.

### Batch 3 — form-integration gaps (`2bde667`)
- **Select**: new `name` prop wired to the hidden native select — it previously never contributed a value to plain form submissions.
- **Checkbox**: `indeterminate` now sets the real DOM property (screen readers announce "mixed", `:indeterminate` CSS works) and shows its visual state even when unchecked (previously rendered as an empty box).
- **Table**: new `rowKey` prop for stable row identity (expansion state used to stick to row *positions* after sort/filter); toolbar search is only controlled when a value is passed (used to be frozen read-only without one) and has an accessible name.

### Batch 4 — showcase fixes (`a6e02df`)
- Sidebar navigation scroll: smooth `scrollIntoView` is silently dropped by some Chrome setups (reproduced on the dev machine — sidebar never scrolled at all); now verifies movement and falls back to an instant jump.
- Gallery bottom padding clears the floating wobble/theme island.
- Layouts page: standalone `position="top"` NavigationIsland demo was written against the pre-`f30d581` "inline" semantics and escaped over the site header — now bounded via the transform-containing-block trick; copy corrected.
- Footer version read from package.json (was hardcoded `v0.1.0`).
- (Uncommitted, riding with the user's nav.tsx WIP:) sticky header made opaque — at `rgba(…, 0.95)` dark chalkboard demo cards ghosted through behind the nav links.

### Batch 5 — packaging (`c1c53bf`)
`"sideEffects": ["**/*.css", "**/*.scss"]` in package.json so bundlers can tree-shake the JS while keeping stylesheet imports.

### Batch 6 — SSR-stable seeds (`588776f`)
`Math.random()` during render made server and client draw different blob/rough shapes (hydration mismatch under SSR) and re-rolled silhouettes on remount. New `useStableSeed()` hook hashes React's SSR-stable `useId`; `use-blob-paths`, `use-rect-blob-paths`, Progress and Skeleton all use it. Raw `generateWobbly*` utils keep their random fallback for direct callers.

### Batch 7 — TS token export (`84701fa`)
`src/tokens.ts` now mirrors the full `_tokens.scss` color palette plus a `withAlpha()` helper (both exported from the package root). Stamp `variantColors`, Progress, Skeleton and `textureColorMap` no longer carry hex/rgba copies. Remaining duplication (acceptable for now): `tailwind.ts` must stay self-contained because it ships as a source file, and the showcase's `lib/styles.ts` keeps its own constants.

### Batch 8 — tooling guardrails (`this commit`)
- **stylelint** (minimal config, `postcss-scss` syntax) wired into `pnpm lint` / `lint:fix` and the `ci` script. One rule so far: `$` in `--*` custom-property values is an error unless `#{…}`-interpolated — the batch-1 bug class can't ship again (verified against a canary).
- **publint** (`pnpm check-package`) — immediately caught a real packaging bug: with `"type": "module"`, the CJS build `dist/index.js` was interpreted as ESM, so `require('@dendelion/paper-ui')` was broken. The CJS build is now emitted/exported as `dist/index.cjs`. Remaining publint notes (deferred): a `.d.cts` types split for require-resolution, and an `engines.node` field.
- **Playwright visual regression: deferred, next candidate.** Chromium can't run in the dev sandbox, so the setup needs to be verified on the dev machine or in CI. One screenshot per gallery section (paper + chalkboard) would have caught the batch-1 white-fields bug; Lost Pixel is the lighter alternative if full Playwright feels heavy.

### Batch 9 — Select polish (`38da8bb`)
Portal dropdown moved from a hardcoded inline `zIndex: 1000` to `$z-popover` (matching Menu, above modals); it closes when its trigger scrolls out of view instead of floating detached; Tab away closes it.

### Batch 10 — Tabs (`1e59b64`)
Uncontrolled by default (first item, optional `defaultActiveKey`; `activeKey` stays the controlled mode — previously nothing rendered without it), plus the full ARIA tabs pattern: tab/panel ids, `aria-controls`/`aria-labelledby`, focusable `role=tabpanel`, roving tabindex, ArrowLeft/Right/Home/End with automatic activation.

### Batch 11 — chalkboard base token, polite toasts, chevron icons (`531a0a0`)
`$chalkboard-border-base` (rgb 200, 210, 195) is now the single source for ~20 scattered chalkboard border/ring rgba literals across nine modules (compiled CSS verified byte-identical); Toast/Alert announce `role=status` for info/success and keep `role=alert` for warning/error; Accordion and Table expand controls use a shared `ChevronRightIcon` SVG (CSS rotation) instead of `▼`/`▶` text glyphs.

### Batch 12 — Tooltip viewport clamping (`6e42c99`)
Tooltip measures itself (one hidden frame) and positions with explicit top/left clamped into the viewport, so edge-adjacent triggers no longer get cut-off tooltips.

### Batch 13 — showcase hash routing (`0fa56ae`)
Pages live in the URL hash (`#gallery`, `#tokens`, …): deep-linkable, reload-safe, back/forward work.

## Open findings (not yet fixed, roughly prioritized)

1. **IconButton `label` optional** → icon-only buttons can lack an accessible name (breaking change to make required; decide).
2. **Chalkboard contrast pass** (needs the user's eye): Stamp variant pills nearly invisible on dark; unchecked radio/checkbox outlines faint.
3. **Exit animations** missing everywhere — toast/modal/menu/dropdown vanish abruptly on close.
4. **Packaging (larger)**: `./tailwind` + `./styles` exports point at `.ts` source files (non-TS consumers); framer-motion is a hard dep used only by Layout's drawer; single-file dist prevents per-component tree-shaking (`preserveModules`); globals.scss import in index.ts force-styles consumer `<body>` (only when consuming source/CSS — consider an opt-in entry); `.d.cts` types split + `engines.node` from the publint report.
5. Raw z-indexes in island (50) / layout (100) — global fixed elements that should map onto the `$z-*` scale; needs a visual pass since relative order must be preserved (code-block 10 / cells 20 are local stacking, fine as-is).

## Tooling candidates (fits the minimal-testing agreement)

1. **Playwright screenshot tests over the showcase** (or Lost Pixel) — one snapshot of the Input section would have caught the batch-1 bug; turns the "user reviews visually" workflow into a diff review.
2. **@axe-core/playwright** — automated a11y sweep per showcase page.
3. **stylelint** — SCSS is currently unlinted (Biome is TS-only); includes the batch-1 guardrail rule.
4. **publint + @arethetypeswrong/cli** — validate the exports map; **size-limit** for bundle budgets.
5. **react-docgen-typescript** — generate showcase prop tables from real types; plan 010 already fought docs drift by hand.

## Sketch-outline system (2026-07-04, user-directed)

The user liked Skeleton's rough.js look and asked to extend it to cards, inputs and buttons. Landed as two batches:

- **`583f833`** — internal `SketchBorder` building block (`src/components/sketch-border/`, not exported): absolutely-positioned SVG, measures its host via ResizeObserver, draws a rough.js rounded-rect outline at **real pixel size** (per-instance corner radii + jitter from `useStableSeed`; stroke color via `--sketch-stroke` so hosts tint states from CSS). Card swaps its conic-gradient stroke for it. Button/IconButton/Stamp/ListItem hover rings now trace the blob's own contour through `rough.path()` (`sketchOutline` in use-blob-paths) — sketchy overdraw instead of a second smooth curve; blob fills untouched.
- **`40c25c9`** — Input/Textarea move the visual box to a `.field` wrapper (native inputs can't host SVG) using the new `pencil-fill` mixin (pencil-border's fill/texture/wash stack minus the conic stroke); Select trigger + dropdown (frame/scroller split so the border stays pinned). All states (hover/focus-within/error/disabled/chalkboard) drive `--sketch-stroke`.

**Still on pencil-border (conic)**: Table wrapper, CopyButton, cells — candidates for the same treatment after visual review. Modal uses a plain border. **Tuning knobs** for the review pass: `roughness`/`strokeWidth`/`inset` per call site, and stroke alphas in each component's SCSS.

**Trade-off accepted:** outlines are client-drawn, so SSR/no-JS shows fill without stroke until hydration+measure (progressive enhancement; CSS fallback possible later if it bothers).

### Sketch outline v2 (`f4ee548`) — fixing the first pass per user visual feedback

Screenshot review (textarea/input corners) showed a scribbly self-crossing mess — the whole rounded-rect was sketched as one rough.js `path()` call, and high curvature (corners) plus rough's default double-stroke pass produced looping artifacts right where the box bends most. Fix: split into 8 independent segments (4 corner arcs + 4 edges), each drawn with `disableMultiStroke: true` and lower `roughness`/`bowing` — small single-pass segments read as one clean line. Corners draw darker/thicker than edges via new `--sketch-dark`/`--sketch-light` (replacing the single `--sketch-stroke`), reusing the *exact* color values the old conic-gradient pencil-border had per state — restores the old look, not just a new mechanism. Segments jitter independently and edges overshoot into their neighboring corner, so the line wanders both outside and inside the nominal boundary instead of a uniform offset. Blob ring (Button/IconButton/Stamp/ListItem) got the same disableMultiStroke/lower-roughness tuning; no corner/edge split there since a blob has no straight edges. Verified against the local dev server in Chrome (not just build/lint) before committing, given how visual this change is.

### Sketch outline v3 (`18df867`) — one spline, verified at magnification

v2's segment approach still failed the user's eye: independently rough.js-drawn corner arcs and edges can't be guaranteed to meet, leaving disconnected hooks/kinks at corners (confirmed at 4x in Chrome). v3 drops rough.js from SketchBorder entirely: ONE closed Catmull-Rom spline through jittered sample points (3 per corner arc, a few per edge) — single unbroken line and round corners by construction, with the wander coming from point jitter. Corner "pencil pressure" re-draws the same spline segments in `--sketch-dark` (recolors the line, adds no geometry). `roughness` prop now means wander amplitude in px; `bowing` removed. Blob rings (Button etc.) still use rough.js `path()` with `disableMultiStroke` — a continuous organic curve doesn't have the corner-meeting problem, and it looked right at magnification.
