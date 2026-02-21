# Viewport: Tablet (480px – 1200px)

> Laptops, tablets landscape/portrait, small desktops.

## Key Test Widths

| Width | Device Example |
|-------|---------------|
| 480px | Small tablet / large phone landscape |
| 768px | iPad portrait |
| 1024px | iPad landscape / small laptop |
| 1200px | Upper boundary (laptop) |

---

## Computed Values

Values shown are what each `clamp()` resolves to at the given viewport width. Assumes default 16px root font-size.

### Content

| Property | CSS | @480px | @768px | @1024px | @1200px |
|----------|-----|--------|--------|---------|---------|
| Header font-size | `clamp(32px, 5vw, 60px)` | 32px | 38.4px | 51.2px | 60px |
| Header-line gap | `clamp(-10px, -0.8vw, -6px)` | -6px | -6.14px | -8.19px | -9.6px |
| Subheader font-size | `clamp(14px, 1.5vw, 16px)` | 14px | 14px | 15.36px | 16px |
| Subheader margin-top | `clamp(8px, 1.5vw, 11px)` | 8px | 11px | 11px | 11px |
| Content padding | `clamp(1rem, 3vw, 2rem)` | 16px | 23px | 30.7px | 32px |

### CTA (horizontal layout -- above 480px)

| Property | CSS | @480px | @768px | @1024px | @1200px |
|----------|-----|--------|--------|---------|---------|
| CTA width | `clamp(280px, 40vw, 420px)` | 280px | 307.2px | 409.6px | 420px |
| CTA margin-top | `clamp(14px, 3vw, 21px)` | 14.4px | 21px | 21px | 21px |
| CTA gap | `clamp(0.3rem, 0.8vw, 0.5rem)` | 4.8px | 6.14px | 8px | 8px |
| CTA border-radius | `clamp(4px, 0.6vw, 6px)` | 4px | 4.61px | 6px | 6px |
| CTA padding | `clamp(0.25rem, 0.5vw, 0.35rem)` | 4px | 4px | 5.12px | 5.6px |
| CTA padding-left | `clamp(0.8rem, 1.5vw, 1.2rem)` | 12.8px | 12.8px | 15.36px | 18px |
| Input font-size | `clamp(0.85rem, 1.2vw, 0.95rem)` | 13.6px | 13.6px | 13.6px | 14.4px |
| Button font-size | `clamp(0.85rem, 1.2vw, 0.95rem)` | 13.6px | 13.6px | 13.6px | 14.4px |
| Button padding | `clamp(0.5rem, 1vw, 0.7rem) clamp(0.9rem, 1.8vw, 1.4rem)` | 8px 14.4px | 8px 14.4px | 10.24px 18.43px | 11.2px 21.6px |

### Horizon SVG

Values assume a typical viewport height of ~800px for vh calculations.

| Property | CSS | @480px | @768px | @1024px | @1200px |
|----------|-----|--------|--------|---------|---------|
| Width | `clamp(70%, 55vw + 216px, 100%)` | 480px (100%) | 638.4px (83.1%) | 779.2px (76.1%) | 876px (73%) |
| Height | `clamp(15vh, 3vh + 12vw, 30vh)` | 15vh | ~15vh | ~24vh | ~30vh |
| Bottom | `clamp(10%, 2vw + 8%, 19%)` | ~17.6% | 19% | 19% | 19% |

---

## Verification Checklist

### Header
- [x] Font-size scales visibly from 32px (480px) to 60px (1200px)
- [x] Text wrapping looks clean at all widths -- no orphaned words
- [x] Header-line gap (-6px to -9.6px) keeps lines visually grouped
- [x] Header doesn't feel too small at 480px (32px)

### Subheader
- [x] 14px font-size readable at 480px-768px
- [x] Text wrapping within 300px max-width clean at all widths
- [x] 8px margin from header at 480px doesn't feel cramped

### CTA
- [x] 280px CTA width at 480px fits input + button without overflow
- [x] Input placeholder text visible at 13.6px font-size
- [x] Button label "Get Notified" fits at 13.6px without clipping
- [x] Horizontal layout holds together at 480px (just above stacking breakpoint)
- [x] CTA scales up proportionally through the tablet range

### Horizon
- [x] Arc at 100% width (480px) transitions smoothly to ~73% at 1200px
- [x] Arc curvature flattens gracefully as height decreases
- [x] Glow doesn't bleed into content area
- [x] Transition from 100% to ~73% width is smooth across the range
- [x] Bottom position (17.6%-19%) keeps arc well below content

### Layout
- [x] Content vertically centered with adequate spacing at all widths
- [x] No horizontal scrollbar
- [x] Content doesn't overlap horizon arc at any width
- [x] Smooth visual transition when resizing across the tablet range

---

## Resolved Issues

| Issue | Resolution |
|-------|-----------|
| CTA input/button font at 12.8px | Fixed: Raised minimum from 0.8rem (12.8px) to 0.85rem (13.6px). +0.8px improvement across tablet range. |
| Horizon at 70% width through 480-768px | Fixed: New formula `55vw + 216px` gives 100% at 480px, 83% at 768px. Smoother transition than the old formula. |
