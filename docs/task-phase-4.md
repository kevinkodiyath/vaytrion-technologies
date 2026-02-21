# Phase 4 — Starry Night Particles + Glow Backdrop

> **Goal:** Ambient starry night particle canvas with mouse parallax, plus a colored glow backdrop that drifts between colors. Zero dependencies.

## Status: `done`

---

## Design Decisions

- **Particles**: 60 white dots scattered across the upper 75% of the viewport — static positions with sinusoidal twinkle and slow positional drift
- **Mouse parallax**: Entire star field shifts uniformly ±15px opposite to cursor direction, lerped at 0.04/frame for smooth tracking
- **Glow backdrop**: Large radial gradient blob behind all content, picks a random color on load, cross-fades to a new random color every 25s
- **No dependencies**: Pure canvas 2D API for particles, CSS radial-gradient for glow
- **Performance target**: <1ms per frame on mid-range devices at 60fps

---

## Particle Spec

| Property | Value | Notes |
|----------|-------|-------|
| Count | 60 | Fixed pool, no spawning/despawning |
| Region | Full width, upper 75% of viewport | `y ∈ [0, canvas.height * 0.75]` |
| Radius | 0.5–2px | Randomized per star |
| Color | `#FFFFFF` | White |
| Max opacity | 0.3–0.8 | Randomized per star |
| Drift speed | ±0.08 px/frame | Slow random walk in x and y |
| Twinkle | Sinusoidal, 3–7s cycle | `sin(time * twinkleSpeed)` maps to 0.3–1.0 multiplier |
| Mouse parallax | ±15px uniform shift | Opposite to cursor, lerp factor 0.04 |
| Edge wrapping | Yes | Stars wrap around viewport edges |

---

## Glow Backdrop Spec

| Property | Value | Notes |
|----------|-------|-------|
| Element | `#glow-backdrop` div | z-index 0, behind everything |
| Shape | `radial-gradient(circle 60vmax ...)` | Centered, fades to transparent at 70% |
| Colors | `#932EFF, #3C2EFF, #428EFF, #39A29A, #27A043` | Random pick on load |
| Alpha | 0.2 | Via `rgba(r, g, b, 0.2)` in `--glow-color` CSS variable |
| Entrance | `scale(0.6) opacity(0)` → `scale(1) opacity(1)` | 0.8s ease-out transition |
| Color drift | New random color every 25s | CSS `transition: background 5s ease` handles cross-fade |

---

## Boot Sequence

1. `initGlow()` fires immediately — glow backdrop fades in over 0.8s
2. At 500ms overlap (while glow is still fading in), `runAnimations()` starts text animations
3. `initParticles()` starts alongside glow — canvas begins rendering immediately

---

## Tasks

### 1. HTML — Canvas Element
- [x] Add `<canvas id="particles-canvas">` inside `.background-layer`

### 2. HTML — Glow Backdrop
- [x] Add `<div id="glow-backdrop">` inside `.background-layer`

### 3. CSS — Canvas Positioning
- [x] `#particles-canvas`: `position: absolute; inset: 0; z-index: 2; pointer-events: none;`
- [x] z-index 2 places it above horizon SVG (z-index 1) but below content-layer (z-index 10)

### 4. CSS — Glow Backdrop Styling
- [x] `#glow-backdrop`: `position: absolute; inset: 0; z-index: 0;`
- [x] Radial gradient via `--glow-color` CSS custom property
- [x] Base transition: `background 5s ease` (for color drift)
- [x] `.visible` transition: adds `opacity 0.8s ease-out, transform 0.8s ease-out`
- [x] Initial state: `opacity: 0; transform: scale(0.6);`
- [x] `.visible` state: `opacity: 1; transform: scale(1);`

### 5. JS — Particle System
- [x] Create 60 stars with random positions in upper 75% of viewport
- [x] Each star: x, y, radius, maxOpacity, driftX, driftY, twinkleSpeed, twinkleOffset
- [x] Delta-time normalized animation loop
- [x] Twinkle: sinusoidal opacity modulation (3–7s cycles)
- [x] Drift: slow random walk ±0.08 px/frame with edge wrapping
- [x] Mouse parallax: track cursor, lerp star field offset at 0.04/frame, ±15px range
- [x] devicePixelRatio support for crisp rendering
- [x] Debounced resize handler — recreate stars on resize

### 6. JS — Glow System
- [x] Color array: `['#932EFF', '#3C2EFF', '#428EFF', '#39A29A', '#27A043']`
- [x] `hexToRgba()` helper to convert hex → `rgba(r, g, b, 0.2)`
- [x] Set `--glow-color` CSS variable on load with random pick
- [x] Add `.visible` class to trigger entrance animation
- [x] `setInterval` every 25s: pick new random color (different from current), update `--glow-color`

### 7. Integration
- [x] Boot orchestration: glow → overlap → text animations → particles all coordinated
- [x] No-JS fallback: canvas doesn't render, glow backdrop hidden by default (no `.visible` class)

### 8. Verify
- [ ] Stars twinkle smoothly with no popping
- [ ] Mouse parallax feels responsive but smooth (not jittery)
- [ ] Glow backdrop fades in smoothly on load
- [ ] Glow color drifts every ~25s with smooth 5s cross-fade
- [ ] Stars don't distract from text content
- [ ] No performance issues (check with DevTools Performance tab)
- [ ] Canvas resizes correctly on window resize
- [ ] Works on mobile (mouse parallax is a no-op, stars still twinkle)
- [ ] No visual artifacts on resize

---

## Files Changed

| File | Changes |
|------|---------|
| `index.html` | Added `<canvas id="particles-canvas">` and `<div id="glow-backdrop">` in `.background-layer` |
| `styles.css` | Added `#particles-canvas` positioning, `#glow-backdrop` gradient/transition/entrance styles |
| `main.js` | Added `initParticles()` (canvas star system ~100 lines), `initGlow()` (color pick + drift ~40 lines), boot orchestration |
