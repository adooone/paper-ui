# Changelog

## [0.3.0](https://github.com/adooone/paper-ui/compare/v0.2.0...v0.3.0) (2026-06-30)


### ⚠ BREAKING CHANGES

* **textures:** the `texture` prop accepts `boolean | PaperTextureKey | TextureConfig` on all textured components (Card, Alert, Modal, Select, Page, Table). You can pass a bare name (`texture="kraft"`) or a full config everywhere; `texture={false}` disables it.
* **api:** the dark "chalkboard" theme is no longer a `variant` value. Every chalkboard-capable component now takes a separate `surface` prop ('paper' | 'chalkboard', default 'paper'), so `variant` is reserved for semantic style (primary/secondary, info/success, etc.).

### Features

* add Accordion, Icon, ListItem, Progress, and Textarea components ([b585795](https://github.com/adooone/paper-ui/commit/b5857951a89373ea838cb121c82f4bc614429524))


### Bug Fixes

* **ci:** set packageManager so pnpm/action-setup resolves a version ([bdbc4d8](https://github.com/adooone/paper-ui/commit/bdbc4d810d7fe90a02822047e15fa3ed55a100fc))
* **review:** address CodeRabbit review findings ([6bf161c](https://github.com/adooone/paper-ui/commit/6bf161c78f5d6bdc554f688d48ba712bb4b2cd45))


### Code Refactoring

* **api:** extract chalkboard into a surface prop; mark package use client ([9fea72c](https://github.com/adooone/paper-ui/commit/9fea72c30f26bf6cd0aa30753c621a37d83d0595))
* **components:** consistency + accessibility cleanup, format with Biome ([baf1206](https://github.com/adooone/paper-ui/commit/baf1206def7029003e7a9b111c83261d83f6f176))
* **hooks:** extract useEscapeKey and reuse in Layout and Modal ([637fdc9](https://github.com/adooone/paper-ui/commit/637fdc9a8ec0ed2919a0baf6cb84c02d63e656c2))
* **textures:** unify the texture prop across components ([a02de3c](https://github.com/adooone/paper-ui/commit/a02de3c2c2333753f4838ba8760e8b78f2b24209))


### Documentation

* **repo:** sync README, code style, and agent guide ([fdfc86a](https://github.com/adooone/paper-ui/commit/fdfc86a4022e368a668270a7b28362bcdb157513))

## 0.2.0

### Minor Changes

- [`34f29e5`](https://github.com/croco-dendy/paper-ui/commit/34f29e585d8ff255b4d1011afaf1371e4ac25732) Thanks [@croco-dendy](https://github.com/croco-dendy)! - Add Accordion, Icon, ListItem, Progress, and Textarea components. Export
  CloseIcon/LightbulbIcon/CheckIcon/CopyIcon/PlusIcon/FolderIcon, space
  tokens, and layoutConfig from the package root.

All notable changes to @dendelion/paper-ui will be documented in this file.

## [0.1.0] - Unreleased

### Added

- Natural-material React components: Layout, Page, Button, Checkbox, IconButton, NavigationIsland, Card, Input, Select, Tabs, Alert, Modal, Table, Stamp, CodeBlock, CopyButton, PropTable, Swatch, Island
- Tailwind CSS preset with paper, ink, canvas, and watercolor color tokens
- SCSS modules with shared mixins, tokens, and paper textures
- Self-hosted fonts: Luminari, Cormorant Garamond, Caveat, JetBrains Mono
- TypeScript declarations
- ESM and CJS build outputs
- Component showcase for development and documentation
