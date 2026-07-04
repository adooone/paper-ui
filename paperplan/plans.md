# Paper UI — Plans Overview

## Active Plans

| Plan | Status | Description |
|------|--------|-------------|
| [005-PAPER_UI_PLAN.md](./005-PAPER_UI_PLAN.md) | 🚧 In Progress | Create Paper UI component library (MVP: 6 components + showcase) |
| [010-DESIGN_SYSTEM_PHASE2.md](./010-DESIGN_SYSTEM_PHASE2.md) | 🚧 In Progress | Design system phase 2: token/state consistency, texture quality pass, component gap-filling |
| [013-DESIGN_AUDIT.md](./013-DESIGN_AUDIT.md) | 🚧 In Progress | Full design/code audit: findings, fix batches (5 landed), open items, tooling candidates |
| [009-DESIGN_SYSTEM_CLEANUP.md](./009-DESIGN_SYSTEM_CLEANUP.md) | ✅ Completed | Design system cleanup: single source of truth, eliminate hardcoded hex, deduplicate code |
| [006-PAPER_UI_CLEANUP_PLAN.md](./006-PAPER_UI_CLEANUP_PLAN.md) | ✅ Completed | Codebase cleanup: fix bugs, remove dead code, standardize patterns |
| [007-SVG_BUTTON_BACKGROUNDS.md](./007-SVG_BUTTON_BACKGROUNDS.md) | ✅ Completed | Random organic blob shapes + pencil-ring hover for all buttons |
| [008-ARTISTIC_ALIGNMENT_PLAN.md](./008-ARTISTIC_ALIGNMENT_PLAN.md) | ✅ Completed | Align v0.2 components (Input, Select, Alert, Modal, Table) with artistic design system |

## Upcoming

| Plan | Description |
|------|-------------|
| 011-PAPER_UI_DARK_MODE_PLAN.md | Night Studio theme (charcoal paper, white ink) |
| 012-WATERCOLOR_DIFFUSION.md | WebGL paint diffusion effect showcase demo |
| — Breadcrumb, Pagination, Menu/Dropdown, Avatar | Remaining component gaps, tracked in [010-DESIGN_SYSTEM_PHASE2.md](./010-DESIGN_SYSTEM_PHASE2.md) |

## Completed This Session

- Phase 1: Bootstrap — ✅
- Phase 2: 6 Components (Layout, Page, Button, Checkbox, IconButton, NavigationIsland) — ✅
- Phase 3: Showcase (5 pages: Welcome, Components, Layouts, Tokens, Docs) — ✅
- Phase 4: Paper Camp Integration — ⏳ Pending
- Phase 5: Build & Publish — 🚧 Ready (README done, build passes, awaiting npm login)
- Phase 6: Cleanup & Quality Audit — ✅

## Completed

_(Completed plans will appear here)_

---

## Project Vision

**Paper UI** is a React component library built around natural materials: textured paper, ink, canvas, wood grain, and watercolor washes. It is a standalone NPM package (`@dendelion/paper-ui`) that serves as the visual foundation for Paper Camp and any other project needing an organic, tactile UI.

### Core Concept

- **Paper** — warm off-white backgrounds with subtle grain texture
- **Ink** — deep charcoal with slightly irregular, hand-drawn edges
- **Canvas** — cream-colored surfaces with visible weave texture
- **Watercolor** — soft blended washes for accents and hover states

### Architecture

```
paper-ui/
├── src/
│   ├── components/     # React components with SCSS modules
│   ├── styles/         # Design tokens, mixins, textures
│   ├── utils/          # Style helpers (cn, variant maps)
│   └── showcase/       # Built-in documentation app
├── tailwind.ts         # Paper UI Tailwind preset
└── paperplan/         # This planning system
```

---

## Planning Methodology

This project follows the Paper Plan methodology. See [about.md](./about.md) for details.

### Quick Reference

- Plans are numbered sequentially (005, 006, ...)
- Each plan follows the standard template
- Status is tracked in this index and in the individual plan files
- Phases are completed sequentially within each plan

### Status Values

| Status | Icon | Meaning |
|--------|------|---------|
| Pending | ⏳ | Not started, waiting |
| In Progress | 🚧 | Currently being worked |
| Completed | ✅ | Done, verified, merged |
| Cancelled | ❌ | Will not be done |
| Blocked | 🚫 | Cannot proceed (add reason) |

---

## Relationship to Other Projects

| Project | Relationship |
|---------|-------------|
| [Paper Camp](../../paper-camp/paperplan/plans.md) | Primary consumer of Paper UI |
| [Mojo UI](../../mojo-ui/paperplan/plans.md) | Predecessor / reference implementation |
