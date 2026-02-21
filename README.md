# Vaytrion Technologies — Landing Page

## System Prompt

You are working on a single-page "coming soon" landing page for Vaytrion
Technologies. The site is vanilla HTML/CSS/JS with zero dependencies — no
frameworks, no build tools, no bundlers.

### Files

| File | Purpose |
|------|---------|
| `index.html` | Single-page markup with inline SVG horizon |
| `styles.css` | All styles, fluid responsive via `clamp()` |
| `main.js` | Text animation orchestration, particle system, glow backdrop (single IIFE) |
| `docs/polish.md` | Complete component reference — **read this first for any visual work** |
| `docs/viewport-desktop.md` | Computed values and checklist for >1200px |
| `docs/viewport-tablet.md` | Computed values and checklist for 480px–1200px |
| `docs/viewport-mobile.md` | Computed values and checklist for <480px |

### Architecture

The page is a single full-viewport hero section with two stacked layers:

**Background layer** (`z-index: 0`, `pointer-events: none`):
- `#glow-backdrop` (z:0) — Colored radial gradient, cycles through 5 colors every 25s
- `.horizon-fill-svg` (z:1) — Solid `#0A0A0A` fill below the horizon curve
- `.horizon-svg` (z:2) — SVG horizon line + dual-layer glow arcs
- `#particles-canvas` (z:3) — 60 white dots with twinkle, drift, and mouse parallax

**Content layer** (`z-index: 10`, flexbox centered):
- `h1.header` — 4-line tagline, Plus Jakarta Sans 500
- `p.subheader` — Single line, Inter 400, 60% white opacity
- `div.cta` — Email input + "Get Notified" button

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0A0A0A` | Page background, below-horizon fill, button text |
| `--text` | `#FFFFFF` | Primary text, button background |
| `--grey-border` | `#333333` | Mobile CTA input border |
| `--text-muted` | `rgba(255, 255, 255, 0.6)` | Subheader text |
| Glow colors | `#932EFF`, `#3C2EFF`, `#428EFF`, `#39A29A`, `#27A043` | Rotating backdrop glow |

### Fonts

- **Plus Jakarta Sans** (weight 500) — header only
- **Inter** (weights 400, 600) — subheader, CTA input, CTA button

### Responsive Strategy

- All sizing uses `clamp()` for fluid scaling — no breakpoints for dimensions
- One breakpoint at `max-width: 480px` for CTA layout change (horizontal → vertical stacking)
- One breakpoint at `max-width: 1024px` for tablet horizon positioning
- Refer to `docs/viewport-*.md` for exact computed values at each tier

### Animation Systems

**Glow backdrop:** Random color on load → entrance animation (scale 0.4→1, fade in over 1.2s) → cross-fades to new random color every 25s via CSS `transition: background 5s ease`.

**Text reveal:** JS splits header lines and subheader into `<span class="word">` at runtime. Each word transitions from `opacity:0; filter:blur(6px)` to visible with staggered delays (36ms between words, 50ms between lines). Uses double `requestAnimationFrame` to guarantee the hidden state paints before transitioning.

**CTA entrance:** Fades in (`opacity:0; filter:blur(4px)` → visible) with 0.8s transition, timed to appear after header animation completes.

**Particles:** Full-viewport canvas, 60 stars with sinusoidal twinkle (3–7s cycles), slow drift (±0.08 px/frame), mouse parallax (±15px, lerped at 0.04/frame). Delta-time normalized, devicePixelRatio-aware.

**Boot sequence:**
1. `initGlow()` — picks random color, triggers entrance
2. `initParticles()` — canvas starts rendering
3. +500ms: `runAnimations()` — text reveal begins (overlaps glow entrance)
4. +~1800ms: all header words revealed
5. +~2000ms: subheader revealed, CTA fade begins

### No-JS Fallback

`<html>` starts with `class="no-js"`. The script removes it on load. If JS fails, CSS rules on `html.no-js` make all content visible immediately without animation.

### Horizon Positioning

The horizon is an SVG quadratic bezier curve (`Q720,120`) rendered in a `1440x1000` viewBox.

- **Desktop:** Horizon sits behind/just below the CTA, `top: 55%`
- **Tablet (≤1024px):** Horizon raised, `top: 37%`, width `160%`
- **Mobile (≤480px):** Horizon in the middle of the header, `top: 28%`, width `250%`

### Pending Changes (from `docs/polish.md`)

- Glow animation should animate bottom-to-top (sunrise effect) instead of uniform scale
- Word reveal animation should be smoother and faster overall
- CTA div needs a subtle border
- Horizon positioning needs per-viewport adjustment (desktop: behind CTA, mobile: middle of header)

### Guidelines

- Keep everything vanilla — no npm, no frameworks, no build steps
- All three files should work by opening `index.html` directly in a browser
- Always reference `docs/polish.md` for the full component spec before making visual changes
- Test at 320px, 375px, 768px, 1024px, 1440px, and 1920px widths
- Maintain the no-JS fallback — any new animated elements need `html.no-js` overrides
