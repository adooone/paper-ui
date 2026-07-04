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

### Batch 5 — packaging (`this commit`)
`"sideEffects": ["**/*.css", "**/*.scss"]` in package.json so bundlers can tree-shake the JS while keeping stylesheet imports.

## Open findings (not yet fixed, roughly prioritized)

1. **SSR/hydration**: `Math.random()` in `use-blob-paths`, Progress, Skeleton → hydration mismatch for Next.js consumers; blobs change shape on remount. Add optional `seed` prop / derive from `useId`.
2. **tokens.ts exports only `space`** — root cause of Stamp's `variantColors` and Progress's hardcoded hex duplicating SCSS tokens. Export the full token set to TS (or generate both sides from one source).
3. **Select**: hardcoded portal `zIndex: 1000` bypasses the `$z-*` scale; dropdown doesn't close on scroll (can detach from trigger); Tab while open leaves it open. Intermittent semi-transparent dropdown panel was observed twice during the audit — recheck after batch 1, may have been the same custom-prop bug via the focused trigger.
4. **Tabs**: no `defaultActiveKey` (renders nothing uncontrolled), missing `aria-controls`/`tabpanel`/arrow-key navigation.
5. **Toast/Alert roles**: `role="alert"` unconditionally — info/success should be `role="status"`.
6. **IconButton `label` optional** → icon-only buttons can lack an accessible name (breaking change to make required; decide).
7. **Tooltip**: no viewport collision handling.
8. Raw `rgba(200, 210, 195, …)` literals despite `$chalkboard-border-*` tokens; raw z-indexes in island/layout/code-block/cells; `▼`/`▶` text glyphs in Accordion/Table vs. SVG icons elsewhere.
9. **Chalkboard contrast pass**: Stamp variant pills nearly invisible on dark; unchecked radio/checkbox outlines faint.
10. **Showcase**: no URL routing (nothing deep-linkable, refresh resets to Home); exit animations missing everywhere (toast/modal/menu vanish abruptly).
11. **Packaging (larger)**: `./tailwind` + `./styles` exports point at `.ts` source files (non-TS consumers); framer-motion is a hard dep used only by Layout's drawer; single-file dist prevents per-component tree-shaking (`preserveModules`); globals.scss import in index.ts force-styles consumer `<body>` (only when consuming source/CSS — consider an opt-in entry).

## Tooling candidates (fits the minimal-testing agreement)

1. **Playwright screenshot tests over the showcase** (or Lost Pixel) — one snapshot of the Input section would have caught the batch-1 bug; turns the "user reviews visually" workflow into a diff review.
2. **@axe-core/playwright** — automated a11y sweep per showcase page.
3. **stylelint** — SCSS is currently unlinted (Biome is TS-only); includes the batch-1 guardrail rule.
4. **publint + @arethetypeswrong/cli** — validate the exports map; **size-limit** for bundle budgets.
5. **react-docgen-typescript** — generate showcase prop tables from real types; plan 010 already fought docs drift by hand.
