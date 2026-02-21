# Viewport: Desktop (> 1200px)

> Wide monitors, ultrawide displays, standard desktops.

## Key Test Widths

| Width | Device Example |
|-------|---------------|
| 1280px | Small desktop / laptop |
| 1440px | Standard desktop |
| 1920px | Full HD monitor |

---

## Computed Values

Values shown are what each `clamp()` resolves to at the given viewport width.

### Content

| Property | CSS | @1280px | @1440px | @1920px |
|----------|-----|---------|---------|---------|
| Header font-size | `clamp(32px, 5vw, 60px)` | 60px | 60px | 60px |
| Header-line gap | `clamp(-10px, -0.8vw, -6px)` | -10px | -10px | -10px |
| Subheader font-size | `clamp(14px, 1.5vw, 16px)` | 16px | 16px | 16px |
| Subheader margin-top | `clamp(8px, 1.5vw, 11px)` | 11px | 11px | 11px |
| Content padding | `clamp(1rem, 3vw, 2rem)` | 32px | 32px | 32px |

### CTA (horizontal layout)

| Property | CSS | @1280px | @1440px | @1920px |
|----------|-----|---------|---------|---------|
| CTA width | `clamp(280px, 40vw, 420px)` | 420px | 420px | 420px |
| CTA margin-top | `clamp(14px, 3vw, 21px)` | 21px | 21px | 21px |
| CTA gap | `clamp(0.3rem, 0.8vw, 0.5rem)` | 8px | 8px | 8px |
| CTA border-radius | `clamp(4px, 0.6vw, 6px)` | 6px | 6px | 6px |
| CTA padding | `clamp(0.25rem, 0.5vw, 0.35rem)` | 5.6px | 5.6px | 5.6px |
| CTA padding-left | `clamp(0.8rem, 1.5vw, 1.2rem)` | 19.2px | 19.2px | 19.2px |
| Input font-size | `clamp(0.85rem, 1.2vw, 0.95rem)` | 15.2px | 15.2px | 15.2px |
| Button font-size | `clamp(0.85rem, 1.2vw, 0.95rem)` | 15.2px | 15.2px | 15.2px |
| Button padding | `clamp(0.5rem, 1vw, 0.7rem) clamp(0.9rem, 1.8vw, 1.4rem)` | 11.2px 22.4px | 11.2px 22.4px | 11.2px 22.4px |

### Horizon SVG

| Property | CSS | @1280px | @1440px | @1920px |
|----------|-----|---------|---------|---------|
| Width | `clamp(70%, 55vw + 216px, 100%)` | 920px (71.9%) | 1008px (70%) | 1272px (70%*) |
| Height | `clamp(15vh, 3vh + 12vw, 30vh)` | 30vh | 30vh | 30vh |
| Bottom | `clamp(10%, 2vw + 8%, 19%)` | 19% | 19% | 19% |

\* At 1920px, preferred value (1272px) < 70% of viewport (1344px), so clamp resolves to 70%.

---

## Verification Checklist

### Header
- [x] 60px font-size renders well at wide viewports
- [x] 4 header lines stack cleanly with -10px gap
- [x] Letter-spacing (-0.05em) looks intentional, not cramped
- [x] Text doesn't feel undersized on ultrawide (1920px+)

### Subheader
- [x] 16px font-size readable at distance from screen
- [x] max-width 300px doesn't look too narrow on wide viewports
- [x] 60% opacity text legible against #0A0A0A background (contrast ~7.5:1)
- [x] 11px gap from header feels proportional

### CTA
- [x] 420px wide CTA doesn't look undersized on wide screens
- [x] Input text and placeholder visible and readable
- [x] Button "Get Notified" fits comfortably at 15.2px font-size
- [x] Horizontal layout (input + button) properly aligned
- [x] Border and backdrop blur visible

### Horizon
- [x] Arc curvature looks correct at 1440px+
- [x] Glow spread balanced -- not too wide, not too tight
- [x] Arc endpoints visible at SVG edges (gradient tapers to 0 at edges)
- [x] Glow symmetric above and below arc (equal blur spread, overflow: visible)
- [x] Below-horizon fill (#0A0A0A) blends with background

### Layout
- [x] Content vertically centered with comfortable spacing to horizon
- [x] No horizontal scrollbar (width: 100%, overflow: hidden)
- [x] Content doesn't overlap horizon arc (content z-index: 10, horizon bottom: 19%)

---

## Resolved Issues

| Issue | Resolution |
|-------|-----------|
| Horizon width ~86% at 1280px | Fixed: Changed formula from `150vw - 700px` to `55vw + 216px`. Now resolves to ~72% at 1280px, 70% at 1440px+. |
| CTA font-size at minimum through desktop | Fixed: Raised minimum from 0.8rem to 0.85rem (13.6px). Desktop still hits max (15.2px) so no change at this tier. |
| Subheader used hardcoded rgba | Fixed: Now uses `var(--text-muted)` CSS custom property. |
