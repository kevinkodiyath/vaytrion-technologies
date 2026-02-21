# Viewport: Mobile (< 480px)

> Phones in portrait orientation. CTA stacks vertically via `@media (max-width: 480px)`.

## Key Test Widths

| Width | Device Example |
|-------|---------------|
| 320px | iPhone SE / small Android |
| 375px | iPhone 12 mini / standard phone |
| 430px | iPhone 14 Pro Max / large phone |

---

## Computed Values

Values shown are what each `clamp()` resolves to at the given viewport width. Assumes default 16px root font-size.

### Content

| Property | CSS | @320px | @375px | @430px |
|----------|-----|--------|--------|--------|
| Header font-size | `clamp(32px, 5vw, 60px)` | 32px | 32px | 32px |
| Header-line gap | `clamp(-10px, -0.8vw, -6px)` | -6px | -6px | -6px |
| Subheader font-size | `clamp(14px, 1.5vw, 16px)` | 14px | 14px | 14px |
| Subheader margin-top | `clamp(8px, 1.5vw, 11px)` | 8px | 8px | 8px |
| Content padding | `clamp(1rem, 3vw, 2rem)` | 16px | 16px | 16px |

### CTA (stacked vertical layout)

| Property | CSS | @320px | @375px | @430px |
|----------|-----|--------|--------|--------|
| CTA width | `clamp(240px, 75vw, 320px)` | 240px | 281.25px | 320px |
| CTA margin-top | `clamp(14px, 3vw, 21px)` | 14px | 14px | 14px |
| CTA gap | `clamp(0.3rem, 0.8vw, 0.5rem)` | 4.8px | 4.8px | 4.8px |
| CTA padding | `clamp(0.5rem, 1.5vw, 0.75rem)` | 8px | 8px | 8px |
| Input font-size | `clamp(0.85rem, 1.2vw, 0.95rem)` | 13.6px | 13.6px | 13.6px |
| Input padding | `clamp(0.4rem, 1vw, 0.6rem) clamp(0.5rem, 1.5vw, 0.8rem)` | 6.4px 8px | 6.4px 8px | 6.4px 8px |
| Input min-height | `44px` | 44px | 44px | 44px |
| Button font-size | `clamp(0.85rem, 1.2vw, 0.95rem)` | 13.6px | 13.6px | 13.6px |
| Button padding | `clamp(0.5rem, 1vw, 0.7rem) clamp(0.9rem, 1.8vw, 1.4rem)` | 8px 14.4px | 8px 14.4px | 8px 14.4px |
| Button min-height | `44px` | 44px | 44px | 44px |

### Horizon SVG

Values assume a typical mobile viewport height of ~700px for vh calculations.

| Property | CSS | @320px | @375px | @430px |
|----------|-----|--------|--------|--------|
| Width | `clamp(70%, 55vw + 216px, 100%)` | 320px (100%) | 375px (100%) | 430px (100%) |
| Height | `clamp(15vh, 3vh + 12vw, 30vh)` | 15vh | 15vh | 15vh |
| Bottom | `clamp(10%, 2vw + 8%, 19%)` | ~14.4% | ~15.5% | ~16.6% |

---

## Verification Checklist

### Header
- [x] 32px font-size readable but not overwhelming on small screens
- [x] 4 header lines fit without excessive vertical space
- [x] -6px line gap keeps lines grouped without overlapping
- [x] No text clipping or overflow at 320px

### Subheader
- [x] 14px font-size legible on mobile
- [x] 300px max-width doesn't cause overflow at 320px (320 - 32px padding = 288px available)
- [x] Text wraps cleanly within the constrained width
- [x] 8px gap from header feels adequate

### CTA (stacked)
- [x] Input stacks above button cleanly
- [x] 240px CTA width at 320px fits within screen (320 - 32px padding = 288px available)
- [x] Input placeholder text visible and not truncated
- [x] Button full-width, text centered
- [x] 13.6px font-size readable for input and button
- [x] Vertical gap between input and button (4.8px) feels adequate
- [x] Border and backdrop blur visible on mobile
- [x] Touch targets meet 44px minimum height

### Horizon
- [x] Arc visible but subtle at 15vh height
- [x] 100% width on mobile fills background naturally
- [x] Glow doesn't overpower the small screen
- [x] No horizontal overflow from SVG
- [x] Arc curvature still discernible at small size

### Layout
- [x] Content vertically centered on mobile screen
- [x] Content doesn't overlap horizon arc
- [x] No horizontal scrollbar at any mobile width
- [x] Touch targets (button, input) meet 44px minimum height

---

## Resolved Issues

| Issue | Resolution |
|-------|-----------|
| All values at minimums | Acceptable: 32px header, 14px subheader, 13.6px CTA font are appropriate sizes for mobile. No fluid scaling needed within this tier. |
| Subheader max-width vs viewport | At 320px: 288px available < 300px max-width, so parent constrains. Works correctly, just means the max-width value is technically unreachable at smallest sizes. No fix needed. |
| Touch target sizes | Fixed: Added `min-height: 44px` to both `.cta-input` and `.cta-button` in the mobile media query. Meets WCAG 2.5.8 target size recommendation. |
| CTA font at 12.8px | Fixed: Raised minimum from 0.8rem (12.8px) to 0.85rem (13.6px). |
| Horizon at 70% width on mobile | Fixed: New formula `55vw + 216px` resolves to 100% on mobile (392px at 320px viewport, clamped to 100%). Full-width horizon on mobile looks better than 70%. |
