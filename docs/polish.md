# Glow Effect

- Glow backdrop (`#glow-backdrop`) — large 60vmax radial gradient circle centered behind content
- Entrance animation: scales from 0.6 to 1.0, fades in over 0.8s ease-out
- Color drift: cycles through 5 colors (`#932EFF`, `#3C2EFF`, `#428EFF`, `#39A29A`, `#27A043`) every 25s with a 5s cross-fade
- Color set via `--glow-color` CSS custom property at 20% alpha

> Changes Required

- The text animation is top to bottom the glow animation should be bottom to
top, kind of like a sunrise. So the glow should start at the horizon and then
expand upwards and outwards.

# Header

- `h1.header` using Plus Jakarta Sans at weight 500
- Fluid font size via `clamp(32px, 5vw, 60px)`
- 4 lines displayed as flex column: "Security That Thinks." / "Not louder." / "Not reactive." / "Not ordinary."
- Tight letter-spacing at `-0.05em`, line-height `1.2`
- Negative top margin on lines 2-4 to pull them closer together

# Subheader

- `p.subheader` using Inter at weight 400
- Fluid font size via `clamp(14px, 1.5vw, 16px)`
- Muted white at 60% opacity (`var(--text-muted)`)
- Max-width constrained to `300px`, letter-spacing `-0.04em`

# Word Reveal Animation

- JS splits header lines and subheader into individual `<span class="word">` elements at runtime
- Each word starts hidden (`opacity: 0; filter: blur(8px)`) and transitions to revealed
- Staggered timing: 56ms between words, 70ms between lines for header; 20ms between words for subheader
- 0.3s ease transition for both opacity and blur
- Uses double `requestAnimationFrame` to guarantee hidden state paints before transitioning

> Changes Required

- The whole animation sequence should be smoother and faster

# CTA

- Email signup form container (`div.cta`) with blurred dark background (`rgba(10,10,10,0.6)` + `backdrop-filter: blur(10px)`)
- Horizontal `inline-flex` on desktop, stacks vertically on mobile (480px breakpoint)
- Fluid width via `clamp(280px, 40vw, 420px)`
- Fade-in animation: starts hidden (`opacity: 0; filter: blur(4px)`), 1.2s ease-out transition after header animation completes

> Changes Required

- Add a subtle border for the cta div.

# Email Input

- Transparent background text input with `flex: 1`
- Placeholder: "Your email address" in grey (`#666666`)
- Inter font, weight 400
- On mobile: visible border (`1px solid #333`), own backdrop blur, `min-height: 44px` for touch targets

# CTA Button

- White (`#FFFFFF`) button with dark text (`#0A0A0A`)
- Inter font at weight 600, label: "Get Notified"
- Hover state reduces opacity to 0.85
- Focus-visible outline in `#428EFF`
- On mobile: full-width, `min-height: 44px`

# Horizon

- Inline SVG with `1440x1000` viewBox containing a curved horizon line
- Positioned at bottom of viewport, centered horizontally
- Width scales from 100% (mobile) to 70% (desktop) via `clamp()`
- Horizon line: two offset quadratic bezier curves, thickest at center, tapers to 0px at edges
- Filled with `linearGradient` (`#horizon-fade`) with exponential opacity taper

> Changes Required

- the positioning needs to be adjusted according to viewports

1. Desktop viewport : Horizon should be behind the cta div or 10% down
2. Mobile viewport : Horizon should be in the middle of the header but behind it


# Horizon Glow

- Dual-layer SVG glow arcs following the horizon curve
- Atmospheric layer: stroke-width 80, soft blur (`stdDeviation="30 40"`), 20% opacity
- Primary layer: stroke-width 40, tighter blur (`stdDeviation="20 25"`), 20% opacity
- Both use `glow-gradient` linear gradient, radiate symmetrically above and below the arc

# Below-Horizon Fill

- SVG path creating solid `#0A0A0A` fill below the horizon curve
- Extends to the bottom of the viewBox
- Blends seamlessly with the page background

# Particles

- Full-viewport `<canvas>` element at `z-index: 2` (above horizon, below content)
- 60 white dots scattered across the upper 75% of the viewport
- Sinusoidal twinkle: 3-7s cycles, opacity range 0.1-0.35 with a 20% floor
- Slow positional drift: +-0.08 px/frame with edge wrapping
- Delta-time normalized, devicePixelRatio-aware, debounced resize handling

# Mouse Parallax

- Tracks mouse position, normalizes to -1..1, inverts for parallax effect
- Entire star field shifts uniformly by up to +-15px
- Smoothed via lerp at 0.04 per frame

# Background Layer

- Absolute-positioned layer (`z-index: 0`) holding all visual effects
- Contains glow backdrop, horizon SVG, and particle canvas
- `pointer-events: none` so it is non-interactive

# Content Layer

- Relative-positioned layer (`z-index: 10`) using flexbox column centering
- Contains all text and CTA elements
- Padded with `clamp(1rem, 3vw, 2rem)`

# Color Palette

- `--bg`: `#0A0A0A` — page background, below-horizon fill, button text
- `--text`: `#FFFFFF` — primary text, button background
- `--grey-border`: `#333333` — mobile CTA input border
- `--text-muted`: `rgba(255, 255, 255, 0.6)` — subheader text
- Glow colors: Purple `#932EFF`, Indigo `#3C2EFF`, Blue `#428EFF`, Teal `#39A29A`, Green `#27A043`

# Fonts

- Plus Jakarta Sans (500) — header only
- Inter (400, 600) — subheader, CTA input, CTA button

# Responsive Strategy

- Zero breakpoints for sizing — all dimensions use `clamp()` for fluid scaling
- One breakpoint at `max-width: 480px` for CTA layout (horizontal to vertical stacking)

# No-JS Fallback

- `<html>` starts with `class="no-js"`; JS removes it on load
- Fallback CSS makes all `.word` and `.cta` elements immediately visible
- Glow backdrop shown at full scale/opacity without transition

# Boot Sequence

1. `initGlow()` — picks random color, sets CSS variable, triggers entrance animation
2. `initParticles()` — canvas begins rendering stars
3. +500ms: `runAnimations()` — text reveal begins (overlapping with glow entrance)
4. +~800ms: glow entrance complete
5. +~1800ms: all header words revealed
6. +~2000ms: subheader words revealed, CTA fade begins
7. +~3200ms: CTA fully visible, page is interactive
