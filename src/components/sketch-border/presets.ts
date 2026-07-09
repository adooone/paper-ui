export interface SketchGeometry {
  radius?: number;
  inset?: number;
  roughness?: number;
  bowing?: number;
  strokeWidth?: number;
}

/**
 * Central geometry for every hand-drawn outline, grouped by role. Tune here to
 * restyle all sketchy borders at once (a future settings panel can map onto
 * these). Spread into a `<SketchBorder>` and override per instance only for
 * structural differences — e.g. a dynamic corner radius. Colour lives
 * separately in the `--pui-sketch-stroke` / `$color-sketch-stroke*` tokens.
 */
export const sketchOutline = {
  /** Large textured surfaces (clip): Card, Table, Menu, Toast, Alert, Select dropdown, Page. */
  // Low roughness AND low bowing: big containers read better with a near-straight
  // hand-drawn edge — high roughness lumps up on wide/short cards, and the default
  // bowing (1) bends the long straight runs into visible curves. roughness drives
  // both the stroke shake and the clip silhouette wobble (amplitude = roughness *
  // 1.1); bowing only bends the stroke between corners.
  surface: { radius: 12, inset: 2.5, roughness: 0.5, bowing: 0.2, strokeWidth: 1.3 },
  /** Text fields (fill): Input, Textarea, Select trigger, Table search. */
  field: { radius: 8, inset: 2, roughness: 1.1, strokeWidth: 1.3 },
  /** Small controls (smooth single stroke): Checkbox, Radio, Avatar. */
  control: { radius: 6, inset: 2, roughness: 0.5, bowing: 0.6, strokeWidth: 1.4 },
  /** Pill toggle (Switch). */
  pill: { radius: 999, inset: 2, roughness: 0.7, strokeWidth: 1 },
} as const satisfies Record<string, SketchGeometry>;
