# Changelog

## [0.7.3](https://github.com/adooone/paper-ui/compare/v0.7.2...v0.7.3) (2026-07-09)


### Bug Fixes

* **page:** keep default strokeInset so the page outline isn't clipped ([910931d](https://github.com/adooone/paper-ui/commit/910931d5e2447450556e0bb767180b59baa5ae29))
* **sketch:** straighten surface outlines with lower bowing ([5060de3](https://github.com/adooone/paper-ui/commit/5060de3cc88a25583501e05c279008c2dcce4c61))

## [0.7.2](https://github.com/adooone/paper-ui/compare/v0.7.1...v0.7.2) (2026-07-08)


### Bug Fixes

* **page:** sit outline on the clip edge instead of inset inside it ([28eb7d6](https://github.com/adooone/paper-ui/commit/28eb7d6889b997439d3deaec482280f1022ae684))
* **page:** sit outline on the clip edge instead of inset inside it ([0beff07](https://github.com/adooone/paper-ui/commit/0beff0703c3815b0fe145b1ae9900c2f4c179fbc))

## [0.7.1](https://github.com/adooone/paper-ui/compare/v0.7.0...v0.7.1) (2026-07-07)


### Bug Fixes

* **page:** apply consumer style to the frame so page box is overridable ([7b2b742](https://github.com/adooone/paper-ui/commit/7b2b7428cedffc2099cbd625dda0345ae72c6128))
* **page:** apply consumer style to the frame so page box is overridable ([61276f8](https://github.com/adooone/paper-ui/commit/61276f8f20d440553045a88b0604d2cfb7499733))
* **sketch:** straighten surface outlines (roughness 1.2 → 0.5) ([9c9e433](https://github.com/adooone/paper-ui/commit/9c9e4335710ba94312cf01b9ac789d7beca70809))

## [0.7.0](https://github.com/adooone/paper-ui/compare/v0.6.1...v0.7.0) (2026-07-07)


### Features

* **page:** card-style sketchy shape + optional outline prop ([facb1ee](https://github.com/adooone/paper-ui/commit/facb1ee0cd8ce714d31b755be3aa1e35d49d4188))
* **spinner:** hand-drawn ring with a pencil arc that travels around it ([83e6abc](https://github.com/adooone/paper-ui/commit/83e6abc535ffae2fb3ea61f7253de036ecb2e2bf))


### Bug Fixes

* **sketch:** keep clip-mode stroke inside the box so it isn't clipped ([46a95b2](https://github.com/adooone/paper-ui/commit/46a95b211faf462091bb25b0f0e67fcecaabdbee))
* **textarea:** hand-drawn vertical resize grip in place of native grabber ([6e6fedf](https://github.com/adooone/paper-ui/commit/6e6fedf664622133d7861966b14a3badb9121221))


### Code Refactoring

* **sketch:** centralise outline colour + geometry into one config ([d38dbdd](https://github.com/adooone/paper-ui/commit/d38dbdde67fd9e9f10b8350b9e854a339272466d))

## [0.6.1](https://github.com/adooone/paper-ui/compare/v0.6.0...v0.6.1) (2026-07-06)


### Bug Fixes

* **card:** stretch texture layer to full card height ([4bd6dd1](https://github.com/adooone/paper-ui/commit/4bd6dd1acb3e97a6fcb8bee616441e4dceaad559))
* **sketch:** centripetal spline to remove corner spikes ([928653c](https://github.com/adooone/paper-ui/commit/928653cdd86aa4e7291dd5919c7d80a285fbdc99))

## [0.6.0](https://github.com/adooone/paper-ui/compare/v0.5.0...v0.6.0) (2026-07-05)


### ⚠ BREAKING CHANGES

* NavigationIsland and its export are removed — use Island instead. Layout's `navigationIsland` ReactNode prop is unchanged.

### Features

* **brand:** replace logo/favicon with a hand-drawn wobble blob ([b422ceb](https://github.com/adooone/paper-ui/commit/b422ceb75754622719f977a2f06addf8da5bf77a))
* **components:** forward refs on all interactive controls ([d561f50](https://github.com/adooone/paper-ui/commit/d561f50db2228ba064c1812f46536da501483668))
* **controls:** hand-drawn outlines on checkbox, radio, switch, avatar ([c0c18e9](https://github.com/adooone/paper-ui/commit/c0c18e95409681023a3783a138f5254082b768da))
* **layout:** configurable header height and texture ([7f706f4](https://github.com/adooone/paper-ui/commit/7f706f4c85de4d0121b54019f9e6af110353cef2))
* **showcase:** hash routing for pages ([0fa56ae](https://github.com/adooone/paper-ui/commit/0fa56aef2a8500e1cc459081fef956fb6a0db73f))
* **sketch:** hand-sketched outlines for Input, Textarea and Select ([40c25c9](https://github.com/adooone/paper-ui/commit/40c25c94cab990644e449314a0221819cf0c5c0e))
* **sketch:** rework SketchBorder engine (fill/clip/smooth modes) ([4e552ce](https://github.com/adooone/paper-ui/commit/4e552ce9d90e6b4d181dc867d6c7817b1769eabf))
* **sketch:** rough.js hand-sketched outlines for Card and blob rings ([583f833](https://github.com/adooone/paper-ui/commit/583f8332b4d4f8ef65d3f725d7d57c707842b733))
* **tabs:** uncontrolled mode and the full ARIA tabs pattern ([1e59b64](https://github.com/adooone/paper-ui/commit/1e59b6418b2419026305c2a650598575ebde558c))
* **tokens:** export the color palette to TS and end hex duplication ([84701fa](https://github.com/adooone/paper-ui/commit/84701fa3b9f81e83fc818d82c96f0a901843608f))


### Bug Fixes

* **components:** close form-integration gaps in Select, Checkbox and Table ([2bde667](https://github.com/adooone/paper-ui/commit/2bde6670735c8a4fd7f3e99624ebf24126e0f5d1))
* **hooks:** derive blob and rough.js seeds from useId instead of Math.random ([588776f](https://github.com/adooone/paper-ui/commit/588776f7224fd69a74d1287ada431848dd0a1e2d))
* **select:** popover z-index tier, close on scroll-out, close on Tab ([38da8bb](https://github.com/adooone/paper-ui/commit/38da8bb51d2bcc641cb6905fc74845dba818c0c3))
* **showcase:** sidebar scroll fallback, island containment, live footer version ([a6e02df](https://github.com/adooone/paper-ui/commit/a6e02dff55378998aa2a1e160bba9233c03fdb17))
* **sketch:** one continuous spline outline — truly single line, round corners ([18df867](https://github.com/adooone/paper-ui/commit/18df8674b56c2dbce1d2901d54314766cbb74eff))
* **sketch:** segment-based outlines — smoother corners, single-line strokes, dual-tone ([f4ee548](https://github.com/adooone/paper-ui/commit/f4ee5481ea43f6d6948535989aa82c5cae09802f))
* **styles:** interpolate SCSS vars inside CSS custom properties ([b07d73d](https://github.com/adooone/paper-ui/commit/b07d73d22fc79371b700b83b89e3e0628ee8de0a))
* **tooltip:** clamp position into the viewport ([6e42c99](https://github.com/adooone/paper-ui/commit/6e42c9971b56a5bc3ed28f6f94345ffa42dc2305))


### Code Refactoring

* **components:** draw surfaces & fields with SketchBorder ([c0d34e6](https://github.com/adooone/paper-ui/commit/c0d34e603e81a29a39cfb6685e8706e38b799bd1))
* remove NavigationIsland component ([c47f0cd](https://github.com/adooone/paper-ui/commit/c47f0cd9b85395a4c982fee407e873a99281a2b6))
* **showcase:** rename to "Paper UI"; opaque nav header ([091fc42](https://github.com/adooone/paper-ui/commit/091fc42f141d535013f9b73b641b2cdd291c6a37))
* **styles:** single chalkboard border base; fix(a11y): polite info toasts; chevron icons ([531a0a0](https://github.com/adooone/paper-ui/commit/531a0a097c27bfd64e28fef5cd67eeb8166f8d28))
* **toast,alert:** sketchy cards, drop colour gradient and left bar ([3dbadef](https://github.com/adooone/paper-ui/commit/3dbadef9b299c66100ac36642482c42b85e64760))


### Documentation

* **paperplan:** record audit batches 9-13 ([d43f466](https://github.com/adooone/paper-ui/commit/d43f466af7af4a2edfd54b2f42f36998ef351f3a))
* **paperplan:** record Progress height fix and new logo/favicon ([3ef75de](https://github.com/adooone/paper-ui/commit/3ef75de1567e498833d42681d6139556292fbde1))
* **paperplan:** record sketch outline v2 fixes ([74b1c69](https://github.com/adooone/paper-ui/commit/74b1c690c32effe0730a6e12728ffa33742e308c))
* **paperplan:** record sketch outline v3 (single-spline rewrite) ([faa2241](https://github.com/adooone/paper-ui/commit/faa2241878b300fe25944d003d365f1e60f23080))
* **paperplan:** record sketch-outline system ([054d04c](https://github.com/adooone/paper-ui/commit/054d04cc8ea0c75bf3fd9c721e5ea6013948bf12))

## [0.5.0](https://github.com/adooone/paper-ui/compare/v0.4.0...v0.5.0) (2026-07-01)


### ⚠ BREAKING CHANGES

* **alert:** make Alert a compact single-line message, give Toast its own card layout
* **components:** merge Badge into Stamp, remove Badge
* **tokens:** font-size SCSS tokens are renamed. The four `-alt` tokens (xs-alt, sm-alt, base-alt, md-alt) and `2xs` are removed, and the remaining names shift so the scale reads correctly:

### Features

* **components:** add Avatar, Breadcrumb, and Pagination ([5cd11cc](https://github.com/adooone/paper-ui/commit/5cd11cc40e690106594e8bff7ea587237c4d72bd))
* **components:** add Badge and Divider ([ec8e27a](https://github.com/adooone/paper-ui/commit/ec8e27ace8378bf91727ef6439048c62fff946b2))
* **components:** add Menu ([0adfca2](https://github.com/adooone/paper-ui/commit/0adfca2dd9397e256ba511eb44e63159c18516de))
* **components:** add Radio, RadioGroup, Switch, Spinner, Skeleton ([d491056](https://github.com/adooone/paper-ui/commit/d4910565d487e0402e84581c167707757804bf20))
* **components:** add Toast system (ToastProvider + useToast) ([1138225](https://github.com/adooone/paper-ui/commit/1138225e2d08c00e0a2fd8dc789b123f1b82eaa0))
* **components:** add Tooltip ([2487223](https://github.com/adooone/paper-ui/commit/248722349e20422810bdc4c6e7292d4573909bc0))
* **components:** draw Progress and Skeleton with rough.js, give Tooltip a kraft-paper fill ([d755909](https://github.com/adooone/paper-ui/commit/d755909900e2fcbf03aca6f03efc457ead6a7494))
* **showcase:** add Badge and Divider sections ([2bd50d2](https://github.com/adooone/paper-ui/commit/2bd50d26acfdd33b8b5279ed2b118c5e298cfc57))
* **showcase:** add Radio, Switch, Spinner, Skeleton sections ([8b7f723](https://github.com/adooone/paper-ui/commit/8b7f7236616025a9c37bfccd5033a1c9373619d7))
* **showcase:** add Toast section ([7019835](https://github.com/adooone/paper-ui/commit/70198354618de5361ab31a939ae3681fdb1e219c))
* **showcase:** add Tooltip section ([779e621](https://github.com/adooone/paper-ui/commit/779e6214c7b902711d74cc4dd163cc78de5f14ca))
* **tokens:** give the blue accent a distinct hue, add green-dark ([28e0214](https://github.com/adooone/paper-ui/commit/28e02143c1523f82aaf409494017da1cebf0d194))


### Bug Fixes

* **a11y:** add missing hover/focus states to interactive elements ([47cc215](https://github.com/adooone/paper-ui/commit/47cc215689adcfa8616c9a60c681aa529bf88866))
* **components:** add surface support to Accordion/ListItem/Progress/Skeleton/Spinner, fix NavigationIsland top position ([f30d581](https://github.com/adooone/paper-ui/commit/f30d58112234de5c6037917312f4d2326f1b92e8))
* **progress:** draw the rough sketch at real height instead of a fixed viewBox ([159b62a](https://github.com/adooone/paper-ui/commit/159b62a687aad919b784f8b66a68c6b2e24230e5))
* **showcase:** center the vertical Divider's Left/Right demo row ([254b4f0](https://github.com/adooone/paper-ui/commit/254b4f02bcd4d105331278fea9aa1fb3c7f378b4))
* **showcase:** give every Switch demo variant its own label ([d935283](https://github.com/adooone/paper-ui/commit/d9352831dcf9985961d70abc8e5ade34efead116))
* **showcase:** order Radio/Switch sections to match the sidebar ([beafcde](https://github.com/adooone/paper-ui/commit/beafcdec39de2573b13ed36c09087c916cc2f7e5))
* **showcase:** sort Switch size demo smallest to largest ([74e5991](https://github.com/adooone/paper-ui/commit/74e5991bf926ad1d8eb56089e4a1ffa4013b88bf))
* **tokens:** differentiate canvas and speckle textures, fix Alert default ([2923d41](https://github.com/adooone/paper-ui/commit/2923d4129a451e6b06c32b8162cb37546280c823))
* **tokens:** sort textures by lightness ([275e981](https://github.com/adooone/paper-ui/commit/275e98145e6e9aca70dd5ccccd0583837e5b4955))


### Code Refactoring

* **a11y:** unify focus rings into focus-ring / ink-focus mixins ([0191175](https://github.com/adooone/paper-ui/commit/019117590d5bcd3728eddb9fa2cd89fcf4ec5d0e))
* **alert:** make Alert a compact single-line message, give Toast its own card layout ([6114fa2](https://github.com/adooone/paper-ui/commit/6114fa2b0ee3a94fc4d7400bfa3cdb69de4a9c45))
* **components:** give Switch and Spinner the paper/ink aesthetic ([c108bc2](https://github.com/adooone/paper-ui/commit/c108bc2461e43622d3b7f84f7da33ad737f25260))
* **components:** merge Badge into Stamp, remove Badge ([20acc59](https://github.com/adooone/paper-ui/commit/20acc591a6e117a5193cf768c29f43bbe621a45e))
* **tokens:** rationalize the font-size scale ([fedba03](https://github.com/adooone/paper-ui/commit/fedba03eedb6416cc5d5f1d89de1b0db31b0df2e))


### Documentation

* fix stale/wrong docs, close showcase gaps, add missing texture class ([1a5b667](https://github.com/adooone/paper-ui/commit/1a5b6678dbf38bb5f137210632fd67d6e4c2434b))
* **paperplan:** add phase 2 design system plan ([ae5b854](https://github.com/adooone/paper-ui/commit/ae5b8546674608a71b1333a8ca4da8f0462c99d4))
* **paperplan:** mark Avatar/Breadcrumb/Pagination done, Menu/Dropdown next ([8cc7e42](https://github.com/adooone/paper-ui/commit/8cc7e42542fe9463dac6d1fd4f300c839012eef5))
* **paperplan:** mark Menu done, all phase-2 component gaps closed ([ecb2e76](https://github.com/adooone/paper-ui/commit/ecb2e7645b79518318659b56204c3e9eb05874ba))
* **paperplan:** record Badge-into-Stamp merge ([6b41844](https://github.com/adooone/paper-ui/commit/6b41844f091e5db92bc18bff9142449ecf99ceb4))
* **paperplan:** record full QA pass findings and fixes ([a62eed7](https://github.com/adooone/paper-ui/commit/a62eed759e47049d2a39951e7f47d02c2046c6e7))
* **paperplan:** record rough.js integration and Tooltip kraft redesign ([51fb438](https://github.com/adooone/paper-ui/commit/51fb4381fe4048f4a4cc3784c2835f8d373da6ff))
* **paperplan:** record showcase polish round and Alert/Toast redesign ([401c9ac](https://github.com/adooone/paper-ui/commit/401c9ac360c6d61468f4e73ac18aa393c8e178fa))

## [0.4.0](https://github.com/adooone/paper-ui/compare/v0.3.0...v0.4.0) (2026-06-30)


### Features

* **showcase:** add static build and Vercel config for deployment ([751d770](https://github.com/adooone/paper-ui/commit/751d7705854b7ae439403388edf9143c5866ce92))


### Code Refactoring

* **build:** extract shared CSS config for both Vite builds ([b029abc](https://github.com/adooone/paper-ui/commit/b029abc470b806321d98f80950614371b52ada95))

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
