# Plan 010 — Design System Phase 2: Consistency & Component Gaps

**Status:** 🚧 In Progress
**Created:** 2026-07-01
**Scope:** Token rationalization, interaction-state consistency, filling missing components, texture/visual quality pass — all under the explicit goal of keeping every new piece on the "paper, ink, canvas, watercolor" aesthetic.

---

## Context

Repo infra (org transfer, release-please, commitlint, Vercel deploy of the showcase to `ui.adoo.one`) is done and stable. Focus shifted to the design system itself: making tokens consistent, auditing interaction states, and closing component gaps one batch at a time.

**Working agreement (still active):** minimal testing overhead. Verify with `check-types` / `lint` / `build` / `build:showcase`, plus a quick visual check if needed. No deep interaction testing — the user reviews visually and reports issues themselves. Push directly to `main` (no PRs) until Paper Camp integration is wired up for this repo.

---

## Completed This Phase

### Tokens & tooling
- `fedba03` — rationalized the font-size scale
- `28e0214` — gave the blue accent a distinct hue (was duplicate of green), added green-dark
- `bdbc4d8` — fixed CI `packageManager` resolution for pnpm/action-setup

### Accessibility / consistency audit
- `47cc215` — added missing hover/focus states across interactive elements
- `0191175` — unified focus rings into two mixins: `focus-ring` (solid, for buttons/clickables) and `ink-focus` (dotted, for text fields) — policy documented in [CODE_STYLE.md](./CODE_STYLE.md) §7

### New components (gap-filling batch)
- `d491056` / `8b7f723` — Radio, RadioGroup, Switch, Spinner, Skeleton
- `ec8e27a` / `2bd50d2` — Badge (status pill, distinct from the decorative Stamp), Divider (fading ink-stroke separator)
- `c108bc2` — reworked Switch and Spinner visuals to match the paper/ink aesthetic (organic-radius thumb, paper-grain track, gradient spinner arc)
- `2487223` / `779e621` — Tooltip (portal-positioned; fixed two real bugs found via browser testing: refs failing silently because paper-ui components aren't `forwardRef`-wrapped, and hover/focus state incorrectly canceling each other)
- `1138225` / `7019835` — Toast notification system (`ToastProvider` + `useToast`, 6-position stacking, pause-on-hover auto-dismiss), built on top of Alert's visuals; Alert kept as the small inline component with `kraft` as its default (container-contrasting) texture

### Texture quality pass
- `2923d41` — canvas texture redesigned (was a mechanical CSS crosshatch, looked wrong and inconsistent vs. every other `feTurbulence`-based texture); speckle redesigned to actually differ from paper (was visually identical); Alert's default texture fixed to `kraft`
- `275e981` — sorted all texture swatches by lightness (`white → paper → speckle → parchment → canvas → kraft → chalkboard`) — previously the swatch order was arbitrary and didn't track visual weight

### Component gap-filling, round 2
- `5cd11cc` — Avatar (circular/organic-square identity marker, initials fallback with a deterministic watercolor tint), Breadcrumb (ink-link trail with chevron separators), Pagination (prev/next IconButtons + sibling-aware page range with ellipsis, built on Button ghost/isActive like Tabs). Verified visually in both paper and chalkboard themes via the dev showcase.
- `0adfca2` — Menu: anchored action menu (portal-positioned like Tooltip/Select), real roving DOM focus across items, danger tone, disabled items, separators, start/end alignment. This closes the full gap list below.

### Full design-system QA pass
- `f30d581` — added `surface` to Accordion, ListItem, Progress, Skeleton, Spinner (the last five visual components missing it — their showcase demos either silently didn't flip to chalkboard, or worked around it with manual per-theme color overrides); fixed a real bug in NavigationIsland where `position="top"` silently fell through to `position: relative` instead of actually fixing to the top (the CSS existed, the branch logic didn't check for it)
- `1a5b667` — fixed docs that had drifted from reality: README's Quick Start told consumers to bare-import the package for CSS, which never actually worked (verified against `vite.config.ts` — CSS is a fully separate build asset); README's component table/count were stale (24 vs. actual 37); README claimed `bg-canvas-texture`/`bg-speckle-texture` Tailwind classes that didn't exist (real name is `canvas-weave`, speckle had no class at all — added it); Modal's showcase prop table referenced `tornEdge`/`accent`/`accentColor` which don't exist on the component anymore; Select's docs were missing several real props and its code example would crash at runtime (`onChange` receives a plain string, not an event); added a full showcase section for Accordion (shipped, zero docs); fixed the sidebar's "Island" entry which was actually documenting the *other* `Island` component, and added the real `NavigationIsland` a section of its own

### Badge merged into Stamp
- `20acc59` — the user pushed back on Badge's existence: as implemented it didn't look distinctly "artistic," and making it more artistic would just recreate Stamp with a different font. Rather than keep two components solving the same "tinted, ink-bordered label" problem, merged Badge's job into Stamp as opt-in props: `variant` (semantic color shortcut + matching ink ring, same token values Badge used) and `dot` (leading status dot). Stamp's existing `wobble` prop is now the dial between "one-off decorative mark" (default 0.3, random per instance) and "quiet repeatable status tag" (`wobble={0}` + `variant`) — same component, different scenario, per the user's stated preference for a minimal component set where components support scenarios via props rather than near-duplicate components. Badge removed entirely (component, export, showcase entry). Breaking change for direct `Badge` consumers.
- Caught and fixed a real bug during the manual chalkboard check: `variant`'s light-mode paper-tinted colors read as muddy/low-contrast carried over verbatim onto the dark chalkboard surface — fixed by collapsing all variants to one neutral chalk-toned look on chalkboard (mirroring how Badge's own chalkboard variant used to work), same pattern as the round-2 QA pass.

---

## Current Inventory

`src/components/`: accordion, alert, avatar, breadcrumb, button, card, checkbox, code-block, copy-button, divider, icon, icon-button, input, island, layout, list-item, menu, modal, navigation-island, page, pagination, progress, prop-table, radio, select, skeleton, spinner, stamp, swatch, table, tabs, textarea, toast, tooltip.

---

## Known Gaps

All four gap components identified this phase are done: ~~Breadcrumb~~, ~~Pagination~~, ~~Avatar~~ (`5cd11cc`), ~~Menu/Dropdown~~ (`0adfca2`).

**Deferred, build only when a concrete need shows up** (explicit user decision):
- **Tag** — discussed against Stamp (which now also covers Badge's old job via `variant`/`dot`); decided Stamp alone covers current needs, don't add a separate component without a real use case

---

## Next Steps

No component gaps remain from this phase's analysis, and a full QA pass (consistency, docs, package/consumption readiness) has been completed. Candidates going forward:

1. Continue any further visual-quality passes the user flags while reviewing the showcase (texture/color consistency has been an iterative back-and-forth this phase — expect more of this)
2. Dark mode (`011-PAPER_UI_DARK_MODE_PLAN.md`, listed as upcoming in [plans.md](./plans.md) but never started) is still open once component coverage feels sufficient
3. Re-survey for any newly-noticed component gaps now that the known list is cleared
4. Table's `board`/`expandable` modes are now documented but still have no live demo in the showcase — worth adding if there's a concrete need

**Workflow note:** as of 2026-07-01 the user commits work themselves review-side — I commit locally but do not `git push`; they push manually.

This file should be updated as batches complete, rather than creating a new numbered plan per batch — mirroring how 009 tracked the earlier cleanup phase.
