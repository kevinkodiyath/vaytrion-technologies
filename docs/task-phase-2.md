# Phase 2 — Horizon & Glow (SVG Approach)

> **Goal:** A curved white horizon line with soft symmetric glow, using inline SVG with arc paths, gradients, and filters.

## Status: `done`

## Design Decisions

- **Approach**: SVG arcs instead of CSS circles (replaced iteration-1 approach)
- **Colors**: Monochrome — white (`#FFFFFF`) glow on black (`#0A0A0A`) background, no color cycling
- **Arc curve**: Quadratic bezier `Q720,120` — gentle rise across a 1440x400 viewBox
- **Arc endpoints**: Start/end at `y=400` (bottom of viewBox) — 0px height at edges
- **Horizon line**: Filled shape (two offset bezier curves), thickest at center, tapers to 0px at edges
- **Glow**: Dual-layer symmetric (radiates equally above and below the arc), 20% opacity each
- **Edge fade**: Exponential opacity taper on both horizon line and glow, reaching 0 at 1% from edges
- **Positioning**: Base position `bottom: 10%`, centered via `left: 50%; transform: translateX(-50%)`

---

## Tasks

### 1. SVG structure
- [x] Inline `<svg class="horizon-svg">` with `viewBox="0 0 1440 400"` and `preserveAspectRatio="none"`
- [x] `<defs>`: `horizon-fade` gradient, `glow-gradient`, `glow-blur` filter, `glow-blur-soft` filter
- [x] Below-horizon fill path (`#0A0A0A`)
- [x] Dual-layer glow arcs (atmospheric: stroke-width 80 + soft blur; primary: stroke-width 40 + tight blur)
- [x] White horizon line as filled variable-thickness shape (0px at edges, thickest at center)

### 2. CSS
- [x] `.horizon-svg` positioning: absolute, bottom 10%, centered, 70% width, 30vh height
- [x] Removed all color-shift keyframe animations (monochrome white glow, no animation needed)

### 3. Verify
- [x] Horizon arc visible at bottom of viewport
- [x] White line thicker in center, tapers to edges
- [x] Glow radiates symmetrically above and below the arc
- [x] Edge fade reaches 0 at 1% from edges
- [x] Text remains readable
- [x] No oversized off-screen elements

---

## Refinements Applied (Phase 2.5 — Polish)

1. **Header font-size**: 3.5rem -> 60px
2. **Header-to-subheader gap**: 1.5rem -> 11px
3. **CTA margin-top**: 2rem -> 21px (83px total from header bottom)
4. **Subheader opacity**: 70% -> 60%
5. **CTA border-radius**: 10px -> 6px
6. **Arc endpoints**: moved from y=250 to y=400 (0px at edges)
7. **Arc curvature**: control point y=10 -> y=120 (gentler curve)
8. **Glow direction**: upward-only (clipped) -> symmetric (clipPath removed)
9. **Glow spread**: reduced blur stdDeviation and stroke widths for tighter glow
10. **Horizon position**: pushed up from bottom: 0 -> bottom: 10% (19% on >1024px)

---

## Checkpoint

> White curved horizon line — 0px at edges, thickest at center. Soft white glow radiates symmetrically at 20% opacity. Arc starts from bottom corners of SVG. Responsive across 3 viewport tiers. Clean, monochrome, lightweight.
