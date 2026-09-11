---
id: IDEA-1
title: Tokens as a dependency-free export
type: feat
status: in-progress
created: 2026-09-10
updated: 2026-09-11
tags:
  - tokens
  - build
order: 1
---

The design tokens live in three hand-synced copies. `src/styles/_tokens.scss`
calls itself the canonical source; `src/tokens.ts` mirrors its colors and
spacing by hand; `tailwind.ts` carries the paper, ink, and canvas ramps
and the font families as literals that appear nowhere in the SCSS at all.
A value changed in one place reaches the others only if someone remembers.
And the only way to read a token from JavaScript is the root import, which
pulls React, framer-motion, and roughjs along with it — fine on the web,
impossible in React Native, where the Paper Camp phone app needs exactly
these values and nothing else from the package.

**`src/tokens.ts` is the source.** It becomes the one place a value is
written: the paper, ink, and canvas ramps from `tailwind.ts`; the accent,
wash, chalkboard, code, border, sketch-stroke, and button-wash colors from
the SCSS; the three font families; the type scale, weights, line heights,
and letter spacings; the spacing scale; the radii; and the shadows. Plain
objects, `as const`, no imports. `withAlpha` stays beside them.

**The SCSS and the preset are derived.** `pnpm tokens` runs
`scripts/tokens-scss.ts`, which writes `src/styles/_tokens.scss` from the
TypeScript object with the same variable names it has today, so no
component stylesheet changes. The file stays committed; `pnpm tokens
--check` fails when it differs from the generated one and joins the `ci`
script. `tailwind.ts` imports the ramps and font families from
`src/tokens.ts` instead of repeating them.

**A second entry, with nothing attached.** The library build gains
`src/tokens.ts` as an entry beside `src/index.ts`, emitted as
`dist/tokens.mjs`, `dist/tokens.cjs`, and `dist/tokens.d.ts`, and the
package exports it as `./tokens`. A consumer that imports
`@dendelion/paper-ui/tokens` gets the objects and no React. The root
export keeps re-exporting `colors`, `space`, and `withAlpha`, so nothing
that imports them today moves. The README gains a section naming the
export, the font files under `dist/fonts`, and the textures under
`dist/img`, which are the other two things a native client takes from
this package.

### Out of scope

Changing any token value. Native components; the phone app builds its
own from these tokens. A runtime theme switch.

### Phases
- [x] Make `src/tokens.ts` hold every token value
      Absorb the ramps and font families from `tailwind.ts` and the colors, type scale, spacing, radii, and shadows from the SCSS as plain `as const` objects with no imports.
- [x] Generate the SCSS with `scripts/tokens-scss.ts`
      Emit `src/styles/_tokens.scss` with today's variable names, wire up `pnpm tokens` and `--check`, and add the check to `ci`.
- [x] Derive `tailwind.ts` from the token objects
- [x] Add the `./tokens` build entry and package export
      A second Vite library entry emitting `dist/tokens.{mjs,cjs,d.ts}`, with the root export still re-exporting `colors`, `space`, and `withAlpha`.
- [ ] Document the native consumer surface in the README
      Name the `./tokens` export alongside `dist/fonts` and `dist/img`.

### Fixes
- [ ] Fix the failing "Consistency" check
      Fix the failing "Consistency" check in this repo.

### Thread
- [ ] 2026-09-11 [question] [agent] Run-all parked on phase 2 ("Generate the SCSS with `scripts/tokens-scss.ts`") — the agent needs a decision: run denied by permission ask: cd /home/croco/dev/paper-ui && cp src/styles/_tokens.scss /tmp/tokens-backup.scss && echo "// extra" >> src/styles/_tokens.scss && node --experimental-strip-types scripts/tokens-scss.ts --check 2>&1; cp /tmp/tokens-backup.scss src/styles/_tokens.scss; echo "---restored---"
- [x] 2026-09-11 [question] [agent] Run-all parked on phase 2 ("Generate the SCSS with `scripts/tokens-scss.ts`") — the agent needs a decision: run denied by permission ask: cp src/styles/_tokens.scss /tmp/tokens-backup.scss && echo "// extra" >> src/styles/_tokens.scss && (pnpm run tokens:check 2>&1 || echo "EXIT=$?"); cp /tmp/tokens-backup.scss src/styles/_tokens.scss; echo "---restored---"; pnpm run tokens:check 2>&1 | tail -3
- [x] 2026-09-11 [clarification] Decision: the repo's .claude/settings.json now allows `pnpm run *`, `pnpm test*`, `node scripts/*`, `npx biome check*`, and edits under src/, scripts/, and papercamp/. Do not copy or mutate files through the shell to test the check mode. Verify `tokens:check` like this: run `pnpm run tokens:check` on the committed state and expect it to pass; then change one value in src/tokens.ts with the Edit tool, run `pnpm run tokens:check` and expect it to fail, then run `pnpm run tokens` to regenerate the SCSS, and revert the value with Edit. Continue phase 2.
- [x] 2026-09-11 [chat] [agent] Good, that unblocks it — settings.json now allows the pnpm/node commands and edits under src/, scripts/, papercamp/, and the plan is to verify tokens:check by editing src/tokens.ts directly instead of shell-copying files. Picking phase 2 back up with that approach.
- [x] 2026-09-11 [log] [agent] Settings.json update unblocked phase 2; plan is to verify tokens:check via direct src/tokens.ts edits, not shell-copied files.
