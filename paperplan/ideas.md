# Paper UI — Ideas & Future Concepts

A scratchpad for visual concepts, interaction experiments, and planned enhancements.

---

## 🎨 001 — Artistic SVG Button Backgrounds

**Status:** Concept → Ready for Plan

**Vision:** Replace standard rounded-rectangle button backgrounds with hand-crafted SVG shapes that mimic a watercolor paint stroke or ink blob. Buttons should feel organic, tactile, and consistent with the paint-diffusion aesthetic.

### Visual Goals

- **Irregular edges** — slightly wobbly, as if painted with a brush, not drawn with a tool
- **Uneven pigment** — darker at edges, lighter/patchy in the center, like real watercolor
- **Variant character** — each button variant (primary, secondary, ghost, danger) has its own distinct shape personality

### Implementation Notes

- SVG shape as `background-image` or inline SVG inside the button
- Irregular path generated procedurally or hand-tuned per variant
- `feTurbulence` + `feDisplacementMap` SVG filters for edge wobble and pigment texture
- Color controlled via CSS custom properties for theming
- Hover/active states: slight shape shift or pigment intensification via CSS transition on filter values

### Scope

- [ ] Design SVG shapes for 4 variants (primary, secondary, ghost, danger)
- [ ] Implement SVG filter pipeline (turbulence + displacement)
- [ ] Wire into `button.module.scss` and `icon-button.module.scss`
- [ ] Hover/active transitions
- [ ] Accessibility: maintain contrast ratios

---

## 🌊 002 — Watercolor Paint Diffusion Showcase

**Status:** Concept

**Vision:** A fullscreen (or large-section) interactive demo of a watercolor paint diffusion effect on the showcase page.

### Requirements

- Live interactive preview with existing paper texture as background
- Fixed semi-transparent WebGL canvas layered above texture, below page content
- Real-time paint diffusion triggered by cursor movement
- Control panel with sliders/toggles:
  - Trigger mode: cursor / hover / click
  - Decay behavior: fade / stay / spread
  - Paint color, intensity, speed

### Technical Notes

- Single global WebGL canvas (no per-element canvases)
- Ping-pong framebuffer diffusion shader
- Perlin or simplex noise for organic, fibrous edge bleeding
- Paper texture stays in CSS — shader handles paint layer only

### Scope

- [ ] WebGL shader pipeline (diffusion + noise)
- [ ] Showcase page entry with live preview
- [ ] Control panel component
- [ ] Integration test with paper textures

---

## 📝 Formatting Rules

- Each idea gets a numbered entry
- Status: `Concept` → `Ready for Plan` → `In Progress` → `Done`
- Visual goals before implementation details
- Checklist for concrete scope
