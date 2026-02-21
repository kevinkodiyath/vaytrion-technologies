# Iteration 2 — SVG Arc Approach

> **Status:** `active`

This iteration replaces the CSS circle-based sphere/glow from Iteration 1 with an SVG-based horizon using arc paths, inline gradients, SVG filters, and symmetric glow.

## Development State

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1 | `done` | Scaffold & Layout (carried from iteration-1) |
| Phase 2 | `done` | Horizon & Glow (SVG, monochrome) |
| Phase 2.5 | `done` | Structure & Parameter Polish |
| Phase 3 | `done` | Text Animations |
| Phase 4 | `done` | Particles (starry night) |
| Phase 5 | `done` | Responsive & Polish |

## What changed from Iteration 1

### Phase 2 — Horizon approach rewritten

**Removed (iteration-1 approach):**
- `div.sphere` — 400vw CSS circle with masked white border
- `div.glow-horizon` — box-shadow glow on the circle with keyframe animation
- `div.glow-ambient` — CSS radial gradient div with blur
- ~160 lines of CSS for sphere, glow, and ambient animations

**Added (iteration-2 approach):**
- Inline `<svg class="horizon-svg">` with `viewBox="0 0 1440 400"`
- SVG `<defs>`: `horizon-fade` gradient, `glow-gradient`, 2 blur filters
- Horizon line: filled shape from two offset quadratic bezier curves — thickest at center, tapers to 0px at edges
- Dual-layer symmetric glow: atmospheric (stroke-width 80, soft blur) + primary (stroke-width 40, tight blur), both at 20% opacity
- Below-horizon fill: matching path filled with `#0A0A0A`
- Monochrome white glow — no color cycling, no keyframe animations
- Total new CSS: ~40 lines including responsive breakpoints

### Phase 2.5 — Structure & Parameter Polish

**Content spacing:**
- Header font-size: 60px (was 3.5rem)
- Header-to-subheader gap: 11px (was 1.5rem)
- Header-to-CTA gap: 83px total (CTA margin-top: 21px)
- Subheader opacity: 60% (was 70%)
- CTA border-radius: 6px (was 10px)

**Horizon SVG:**
- Arc endpoints moved to bottom of viewBox (y=400) — line starts at 0px height at edges
- Curvature reduced: control point at y=120 (was y=10)
- Glow changed from upward-only (clipped) to symmetric (radiates above and below)
- Glow blur reduced for tighter spread around the line
- clipPath removed entirely

**Responsive breakpoints (3 tiers):**

| Viewport | Breakpoint | SVG Width | SVG Height | Bottom |
|----------|-----------|-----------|------------|--------|
| Large desktop | > 1200px | 70% | 30vh | 19% |
| Desktop / Tablet | <= 1200px | 100% | 22vh | 10% |
| Mobile | < 768px | 100% | 15vh | 10% |

Note: These breakpoints were replaced in Phase 5 with fully fluid `clamp()` scaling.

### Benefits
- No oversized off-screen elements
- Precise curve control via SVG `Q` command
- Clean edge fading via SVG `<linearGradient>` (0 at 1% from edges)
- GPU-accelerated blur via SVG `<filter>`
- Symmetric glow without clip paths
- Variable-thickness horizon line without JS
- Viewport-responsive arc (width, height, position)

## Files
- `index.html` — markup with inline SVG horizon
- `styles.css` — all styles, fully fluid responsive (no breakpoints)
- `main.js` — text animation orchestration + particle system + glow backdrop
- `task-phase-1.md` — Phase 1 checklist (completed, carried from iteration-1)
- `task-phase-2.md` — Phase 2 checklist (completed, with polish refinements)
- `task-phase-3.md` — Phase 3 checklist (text animations)
- `task-phase-4.md` — Phase 4 checklist (particles + glow)
- `task-viewports.md` — Viewport-specific task checklist (Phase 5)
- `viewport-desktop.md` — Desktop (>1200px) computed values & checklist
- `viewport-tablet.md` — Tablet (480–1200px) computed values & checklist
- `viewport-mobile.md` — Mobile (<480px) computed values & checklist

---

### Phase 5 — Responsive & Polish

**Approach:** Replaced all media query breakpoints with fully fluid `clamp()` scaling. No breakpoints — all values scale smoothly between mobile and desktop extremes based on viewport width.

**Changes:**
- Removed all 3 media queries (min-width:1025px, max-width:1200px, max-width:767px)
- Header font-size: `clamp(32px, 5vw, 60px)` — was fixed 60px
- Subheader font-size: `clamp(14px, 1.5vw, 16px)` — was fixed 16px
- CTA: fluid width `clamp(280px, 40vw, 420px)` with `max-width: 90%`, input uses `flex:1` — was fixed 260px input. Stacks vertically below 480px with `clamp(240px, 75vw, 320px)` width. All CTA sizing (font-size, padding, border-radius, gap) uses `clamp()`.
- Content padding: `clamp(1rem, 3vw, 2rem)` — was fixed 2rem
- All spacing (gaps, margins): converted to `clamp()` with proportional scaling
- Horizon SVG: width `clamp(70%, 150vw - 700px, 100%)`, height `clamp(15vh, 3vh + 12vw, 30vh)`, bottom `clamp(10%, 2vw + 8%, 19%)`
- Hero width: changed from `100vw` to `100%` (prevents scrollbar issue)

**Eliminated issues:**
- Breakpoint overlap at 1025–1200px (no breakpoints exist now)
- Header too large on mobile (scales down to 32px)
- CTA overflow on narrow screens (flex input + max-width cap)
- Jarring transitions between breakpoint tiers (continuous scaling)

---

### Phase 4 — Particles (Starry Night)

**Approach:** Hand-rolled `<canvas>` particle system — zero dependencies. 30 subtle white dots scattered across the upper 75% of the viewport, drifting slowly with a sinusoidal twinkle effect. Behind the header, above the horizon.

**Approach:** Hand-rolled `<canvas>` particle system — zero dependencies. 60 subtle white dots scattered across the upper 75% of the viewport, drifting slowly with a sinusoidal twinkle effect. Behind the header, above the horizon. All stars react uniformly to mouse movement (parallax).

**How it works:**
- Full-viewport `<canvas>` inside `.background-layer`, z-index 2 (above SVG, below content)
- 60 fixed particles spawned at random positions in the top 75% of the viewport
- Each particle drifts slowly in a random direction (±0.08 px/frame) and wraps around edges
- Twinkle: sinusoidal opacity cycle (3–7s period, random phase offset) — never fully invisible (floor at 20% of peak)
- Peak opacity range: 0.1–0.35 (very subtle)
- Radius range: 0.8–2px
- Mouse parallax: entire star field shifts uniformly (±15px max) opposite to cursor, lerped at 0.04/frame
- Delta-time normalized for consistent speed regardless of frame rate
- Canvas resizes on window resize with debounce

### Glow Backdrop

**Approach:** CSS radial gradient div behind all layers. Picks a random color from `[#932EFF, #3C2EFF, #428EFF, #39A29A, #27A043]` on page load, then cross-fades to the next random color every ~25s.

**How it works:**
- `#glow-backdrop` div inside `.background-layer`, z-index 0 (behind everything)
- 60vmax circular radial gradient, centered, 20% opacity color → transparent at 70%
- Entrance: scale(0.6) + opacity(0) → scale(1) + opacity(1) over 0.8s ease-out
- Text animations start 500ms into the glow entrance (overlap)
- Color drift: `setInterval` swaps `--glow-color` CSS var every 25s; CSS `transition: background 5s ease` handles the cross-fade
- No-JS fallback: glow shows at full scale/opacity immediately
