# design-sync notes for paper-ui

## Environment

- `/design-login` requires an interactive terminal — not available in a headless/`-p` session. The user ran it separately in an interactive `claude` session, then this session's `DesignSync` calls started working.
- **Chromium can't launch in this sandbox**: 21 missing system shared libraries (`libatk1.0-0`, `libatk-bridge2.0-0`, `libatspi2.0-0`, `libxcomposite1`, `libxdamage1`, `libxfont2`, `libxkbfile1`, `libxmu6`, `libxaw7`, `x11-xkb-utils`, `xvfb`, `xserver-common`, `xfonts-scalable`, and several font packages). Chromium build `1228` itself is cached at `~/.cache/ms-playwright/`, and `playwright@1.61.0` (matching that build) is installed in `.ds-sync/node_modules`, but launching fails with `error while loading shared libraries: libatk-1.0.so.0`. No passwordless sudo in this session, so the deps couldn't be installed here. Fix: `sudo npx playwright install-deps chromium` (or the equivalent `apt-get install` of the packages above) in an environment with sudo, then re-run `resync.mjs` **without** `--no-render-check` to get real render verification.
- This is not just the render-check — `package-capture.mjs` (§4.3 grading) needs the same browser, so authoring+grading previews was not possible in this environment either. That's why this sync shipped **floor cards for all 42 components**, on the user's explicit choice, rather than the originally-planned "author core 20."

## Component count

- 42 real exports, not 36 as first estimated from a manual grep of `src/index.ts` — the extra 6 are legitimate small SVG icon components (`CheckIcon`, `CloseIcon`, `CopyIcon`, `FolderIcon`, `LightbulbIcon`, `PlusIcon` from `src/utils/icons.tsx`), not mis-detected type exports. No `componentSrcMap` exclusion needed.

## Fonts

- Google-Fonts-served families (`JetBrains Mono`, `Cormorant Garamond`, `Caveat`, `Courier Prime`) are loaded at runtime via a `<link>` in the showcase's `index.html`, never shipped as local `@font-face` files — wired via `cfg.runtimeFontPrefixes` to suppress the false `[FONT_MISSING]`.
- `Luminari` IS self-hosted (`dist/fonts/Luminari-Regular.woff`), but `dist/index.css`'s `@font-face` rule references it via an absolute `/fonts/Luminari-Regular.woff` path meant for the showcase app's own deployment (served at site root), which doesn't resolve as a relative file path for the converter. Fixed via `cfg.extraFonts: ["dist/fonts/Luminari-Regular.woff"]`.

## Re-sync risks

- **Nothing has been visually verified.** Every one of the 42 components ships on the `.d.ts`-driven floor card — functional (real bundle, real props) but with zero authored composition and zero screenshot/grading pass. The first re-sync with a working browser should treat this as a genuine first authoring pass, not a "carry forward" — there are no prior grades to carry.
- **Proposed core-20 for the first real authoring pass** (from docs prominence, confirmed with the user this run, not yet acted on): Alert, Avatar, Button, Card, Checkbox, IconButton, Input, Layout, Menu, Modal, Page, RadioGroup, Select, Stamp, Switch, Table, Tabs, Textarea, ToastProvider, Tooltip.
- The conventions header (`.design-sync/conventions.md`) was authored from this session's own knowledge of the codebase (no-provider-needed, prop vocabulary table, tailwind preset) and validated against the shipped `.d.ts` files for `Card`/`Button`/`Stamp`, but not against a live render — worth a quick sanity read on the next sync once previews exist.
- `dist/` is gitignored and rebuilt fresh each sync via `cfg.buildCmd` (`pnpm run build`) — no risk of a stale bundle shipping, but every re-sync does pay the full library rebuild cost.
