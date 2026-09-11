---
id: IDEA-1
title: Tokens as a dependency-free export
type: feat
status: idea
created: 2026-09-10
tags:
  - tokens
  - build
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
- [ ] Make `src/tokens.ts` hold every token value
      Absorb the ramps and font families from `tailwind.ts` and the colors, type scale, spacing, radii, and shadows from the SCSS as plain `as const` objects with no imports.
- [ ] Generate the SCSS with `scripts/tokens-scss.ts`
      Emit `src/styles/_tokens.scss` with today's variable names, wire up `pnpm tokens` and `--check`, and add the check to `ci`.
- [ ] Derive `tailwind.ts` from the token objects
- [ ] Add the `./tokens` build entry and package export
      A second Vite library entry emitting `dist/tokens.{mjs,cjs,d.ts}`, with the root export still re-exporting `colors`, `space`, and `withAlpha`.
- [ ] Document the native consumer surface in the README
      Name the `./tokens` export alongside `dist/fonts` and `dist/img`.
