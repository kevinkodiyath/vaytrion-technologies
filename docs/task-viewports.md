# Viewport Tasks — Responsive Tuning

> **Goal:** Ensure the horizon SVG, content layout, and spacing work correctly across all viewport sizes using fully fluid scaling (no breakpoints).

## Status: `done`

---

## Viewport Docs

Detailed checklists and computed `clamp()` values for each viewport tier:

| Tier | Range | Doc | Status |
|------|-------|-----|--------|
| Desktop | > 1200px | [viewport-desktop.md](viewport-desktop.md) | `verified` |
| Tablet | 480px – 1200px | [viewport-tablet.md](viewport-tablet.md) | `verified` |
| Mobile | < 480px | [viewport-mobile.md](viewport-mobile.md) | `verified` |

---

## Approach: Fluid Scaling with `clamp()`

All responsive sizing uses CSS `clamp()` functions. One media query at 480px for CTA stacking (layout change — cannot be done with `clamp()`). All other values scale smoothly.

---

## Fluid Values Reference

| Property | CSS Value | Min (mobile) | Max (desktop) |
|----------|-----------|--------------|---------------|
| Header font-size | `clamp(32px, 5vw, 60px)` | 32px | 60px |
| Header-line gap | `clamp(-10px, -0.8vw, -6px)` | -10px | -6px |
| Subheader font-size | `clamp(14px, 1.5vw, 16px)` | 14px | 16px |
| Subheader margin-top | `clamp(8px, 1.5vw, 11px)` | 8px | 11px |
| CTA margin-top | `clamp(14px, 3vw, 21px)` | 14px | 21px |
| CTA width | `clamp(280px, 40vw, 420px)` | 280px | 420px |
| CTA width (mobile) | `clamp(240px, 75vw, 320px)` | 240px | 320px |
| CTA gap | `clamp(0.3rem, 0.8vw, 0.5rem)` | 0.3rem | 0.5rem |
| CTA border-radius | `clamp(4px, 0.6vw, 6px)` | 4px | 6px |
| CTA padding | `clamp(0.25rem, 0.5vw, 0.35rem)` | 0.25rem | 0.35rem |
| CTA input font-size | `clamp(0.85rem, 1.2vw, 0.95rem)` | 0.85rem | 0.95rem |
| CTA button font-size | `clamp(0.85rem, 1.2vw, 0.95rem)` | 0.85rem | 0.95rem |
| CTA button padding | `clamp(0.5rem, 1vw, 0.7rem) clamp(0.9rem, 1.8vw, 1.4rem)` | 0.5rem 0.9rem | 0.7rem 1.4rem |
| Content padding | `clamp(1rem, 3vw, 2rem)` | 1rem | 2rem |
| Horizon width | `clamp(70%, 55vw + 216px, 100%)` | 70% | 100% |
| Horizon height | `clamp(15vh, 3vh + 12vw, 30vh)` | 15vh | 30vh |
| Horizon bottom | `clamp(10%, 2vw + 8%, 19%)` | 10% | 19% |

---

## Completed Tasks

### Horizon
- [x] SVG width scales fluidly from 100% (narrow) to 70% (wide)
- [x] SVG height scales fluidly from 15vh (narrow) to 30vh (wide)
- [x] Bottom position scales fluidly from 10% (narrow) to 19% (wide)
- [x] Removed 3-tier media query breakpoints
- [x] No breakpoint overlap issues (no breakpoints at all)

### Content — Header
- [x] Font-size scales fluidly: 32px (mobile) to 60px (desktop)
- [x] Header-line negative margin scales proportionally

### Content — Subheader
- [x] Font-size scales fluidly: 14px (mobile) to 16px (desktop)
- [x] Margin-top scales fluidly: 8px to 11px
- [x] max-width kept at 300px (adequate at all sizes)
- [x] Uses `var(--text-muted)` CSS custom property

### Content — CTA
- [x] Horizontal layout on desktop, stacks vertically below 480px
- [x] Width scales fluidly: 280px to 420px (desktop), 240px to 320px (mobile stacked)
- [x] max-width: 90% prevents overflow on narrow screens
- [x] Input uses flex:1 + min-width:0 instead of fixed 260px width
- [x] All CTA sizing (font-size, padding, gap, border-radius) uses clamp()
- [x] Stacked layout: input full-width, button full-width below
- [x] Mobile touch targets meet 44px minimum (min-height: 44px)
- [x] CTA font minimum raised to 0.85rem (13.6px) for better tablet readability

### Layout
- [x] Hero width changed from 100vw to 100% (prevents scrollbar issue)
- [x] Content padding scales fluidly: 1rem to 2rem

### Cross-Viewport
- [x] No horizontal scrollbar at any viewport width
- [x] Smooth visual transition when resizing
- [x] Horizon arc endpoints visible at all sizes
- [x] Glow symmetric at all sizes
- [x] Text readable over background at all sizes

---

## Fixes Applied

| Fix | Details |
|-----|---------|
| Horizon width formula | Changed from `150vw - 700px` to `55vw + 216px`. Now 100% on mobile, ~83% at 768px, ~72% at 1280px, 70% at 1440px+. |
| Touch target sizes | Added `min-height: 44px` to input and button in mobile media query. Meets WCAG 2.5.8. |
| CTA font minimum | Raised from `0.8rem` (12.8px) to `0.85rem` (13.6px) for better readability on tablets. |
| --text-muted variable | Subheader now uses `var(--text-muted)` instead of hardcoded `rgba(255, 255, 255, 0.6)`. Variable value corrected from 0.7 to 0.6 opacity. |
