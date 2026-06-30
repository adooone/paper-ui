# Agent Instructions — Paper UI

## Quick Reference

- **Tech stack:** React 18 + TypeScript + Vite + Tailwind CSS + SCSS Modules
- **Dev server:** `pnpm dev` → http://localhost:3020
- **Check types:** `pnpm run check-types`
- **Lint / format:** `pnpm run lint` (Biome) · `pnpm run lint:fix` to autofix
- **Build library:** `pnpm run build`
- **Component planning:** See `paperplan/` directory

## Critical Rules

1. **One component per file.** See `paperplan/CODE_STYLE.md` — review before every change.
2. Use `cn()` helper for all className construction.
3. No hardcoded hex colors in `.tsx` files — use SCSS tokens.
4. Named exports only (via `index.ts` barrel files).
5. Run `check-types` and `build` after every change.

## Architecture

```
src/
├── components/       # Library components (1 per file)
├── showcase/
│   ├── components/   # Showcase components (1 per file)
│   ├── lib/          # Data, types, helpers (no components)
│   └── pages/        # Showcase pages
├── utils/            # Shared utilities (cn, etc.)
├── styles/           # SCSS tokens, mixins, textures
└── types/            # Global type declarations
```

## Code Style

Full guide: [`paperplan/CODE_STYLE.md`](./paperplan/CODE_STYLE.md)

Key points:
- 1 component per `.tsx` file
- Extract helpers to `lib/`, hooks to `hooks/`
- SCSS modules for component styles, Tailwind for page layouts
- Always use `cn()` for class names

## Plans

Active plans are tracked in `paperplan/plans.md`.

## Workflow Rule — CRITICAL

**One phase at a time. ALWAYS.**

When a user says "start phase X" or "do phase X", that means **only that phase**. Do not proceed to the next phase automatically, even if it seems efficient.

**Correct flow:**
1. Complete the requested phase
2. Run `check-types` and `build`
3. Report completion and STOP
4. Wait for user to review and explicitly say "start next phase" or "do phase Y"
5. Only then begin the next phase

**Why:** The user reviews each phase for issues before proceeding. Skipping ahead destroys the review loop and wastes work if earlier phases need changes.

**Never assume:** "I'll just do the next phase while I'm here" is wrong. Always wait for explicit go-ahead.
