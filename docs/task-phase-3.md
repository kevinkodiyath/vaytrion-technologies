# Phase 3 — Text Animations

> **Goal:** Word-by-word fade-in with blur effect across all content elements. Each word transitions from invisible + blurred to fully visible + sharp, creating a refined reveal sequence.

## Status: `done`

---

## Design Decisions

- **Approach**: Vanilla JS — wrap each word in a `<span>`, animate via CSS transitions triggered by class addition
- **Effect per word**: `opacity: 0` + `filter: blur(8px)` → `opacity: 1` + `filter: blur(0px)`
- **No external dependencies**: Pure CSS transitions + JS orchestration
- **Accessibility**: `prefers-reduced-motion` media query skips animations, shows all content immediately
- **Initial state**: All text content hidden via CSS (opacity: 0, blur) until JS runs
- **Fallback**: `html.no-js` class keeps content visible when JS fails (JS removes the class on load)

---

## Animation Sequence

Staggered reveal — each group starts after the previous group finishes (with slight overlap for flow).

| Step | Element | Words | Delay between words | Group start |
|------|---------|-------|---------------------|-------------|
| 1 | Header line 1: "Security That Thinks." | 3 | 80ms | 300ms (page load) |
| 2 | Header line 2: "Not louder." | 2 | 80ms | after step 1 + 100ms gap |
| 3 | Header line 3: "Not reactive." | 2 | 80ms | after step 2 + 100ms gap |
| 4 | Header line 4: "Not ordinary." | 2 | 80ms | after step 3 + 100ms gap |
| 5 | Subheader (full sentence) | 12 | 40ms | after step 4 + 200ms gap |
| 6 | CTA (fade in as single unit) | — | — | after step 5 + 300ms gap |

### Timing Estimate

- Header lines: 300ms + (3×80) + 100 + (2×80) + 100 + (2×80) + 100 + (2×80) = ~1240ms
- Subheader: +200ms gap + (12×40) = ~680ms delay start, ~480ms to reveal
- CTA: +300ms gap, single fade-in ~500ms
- **Total sequence: ~2.7s** from page load to fully revealed

---

## Tasks

### 1. CSS — Animation States
- [x] `.word` base style: `opacity: 0; filter: blur(8px); transition: opacity 0.4s ease, filter 0.4s ease`
- [x] `.word.revealed` style: `opacity: 1; filter: blur(0px)`
- [x] `.cta` initial state: `opacity: 0; filter: blur(6px); transition: opacity 0.5s ease, filter 0.5s ease`
- [x] `.cta.revealed` style: `opacity: 1; filter: blur(0px)`
- [x] `@media (prefers-reduced-motion: reduce)` — all elements immediately visible, no transitions
- [x] Fallback: `html.no-js` class with styles that show everything (JS removes this class on load)

### 2. JS — Word Splitting
- [x] On `DOMContentLoaded`, select all `.header-line` spans and `.subheader`
- [x] For each element, split `textContent` into words
- [x] Replace content with `<span class="word">word</span>` for each word
- [x] Spaces preserved via `document.createTextNode(' ')` between word spans

### 3. JS — Animation Orchestration
- [x] Build a flat timeline array: `[{ el, delay }]` for each word span + CTA
- [x] Use `setTimeout` to add `.revealed` class at each scheduled delay
- [x] Header line 1 starts at 300ms after DOMContentLoaded
- [x] Each subsequent header line starts 100ms after the previous line's last word
- [x] Subheader starts 200ms after header line 4's last word
- [x] CTA starts 300ms after subheader's last word
- [x] Check `prefers-reduced-motion` — if reduced, add `.revealed` to all immediately

### 4. HTML Changes
- [x] Add `class="no-js"` to `<html>` element
- [x] No other HTML changes needed (JS handles word wrapping at runtime)

### 5. Verify
- [ ] Words fade in left-to-right within each line
- [ ] Blur dissolves smoothly (no harsh edges or flicker)
- [ ] Timing feels natural — not too fast, not dragging
- [ ] CTA appears last and is immediately interactive
- [ ] `prefers-reduced-motion` shows everything instantly
- [ ] No layout shift during word-span injection (element dimensions unchanged)
- [ ] No flash of unstyled/visible text before animation starts
- [ ] Works on mobile (no performance issues with blur filter)
- [ ] Page still looks correct if JS fails to load

---

## Implementation Details

### Files Changed

| File | Changes |
|------|---------|
| `styles.css` | Added `.word`, `.word.revealed`, `.cta` animation overrides, `.cta.revealed`, `html.no-js` fallback, `prefers-reduced-motion` media query (~45 lines) |
| `index.html` | Added `class="no-js"` to `<html>` element |
| `main.js` | Full implementation: IIFE with word splitting, timeline builder, staggered setTimeout orchestration (~120 lines) |

### Configuration Constants (in `main.js`)

| Constant | Value | Purpose |
|----------|-------|---------|
| `WORD_DELAY` | 80ms | Gap between words in header lines |
| `SUBHEADER_WORD_DELAY` | 40ms | Gap between words in subheader (faster) |
| `LINE_GAP` | 100ms | Gap between header lines |
| `SUBHEADER_GAP` | 200ms | Gap before subheader starts |
| `CTA_GAP` | 300ms | Gap before CTA appears |
| `INITIAL_DELAY` | 300ms | Delay after page load before first word |

### How No-JS Fallback Works

1. `<html>` starts with `class="no-js"`
2. CSS rule `html.no-js .word, html.no-js .cta` sets `opacity: 1; filter: none`
3. JS immediately removes `no-js` class on execution
4. Without JS: `.word` spans never exist (text stays as plain text, naturally visible), `.cta` stays visible via `html.no-js .cta` rule

---

## Technical Notes

### Why CSS `filter: blur()` instead of `text-shadow`
- `filter: blur()` affects the actual rendered text, creating a true defocus effect
- `text-shadow` would add a blurred copy behind sharp text — different visual
- `filter` is GPU-accelerated on modern browsers
- Transition from `blur(8px)` to `blur(0px)` is smooth and interpolatable

### Performance Considerations
- `filter: blur()` triggers compositing but is GPU-accelerated
- Each word is a separate composited layer during transition — max ~21 simultaneous (12 subheader words if they overlap)
- `will-change: filter, opacity` can be added to `.word` during animation, removed after
- On low-end mobile, blur transitions may drop frames — `prefers-reduced-motion` covers this

### Layout Stability
- Word spans use `display: inline-block` to prevent blur from bleeding between words
- Spaces between words preserved via text nodes (not CSS margins)
- Line breaks occur at the same positions after span injection since inline-block wraps identically to inline text with spaces
