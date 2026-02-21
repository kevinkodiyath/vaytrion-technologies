#Built for teams that want clarity where Phase 1 — Scaffold & Layout

> **Goal:** Static page with correct structure, fonts, colors, and content
> positioned correctly. No animations, no effects — just the skeleton.

## Status: `done`

---

## Tasks

### 1. Create `index.html`
- [x] HTML5 boilerplate with proper `<meta>` tags (charset, viewport)
- [x] Page title: "Vaytrion Technologies"
- [x] Google Fonts imports: `Plus Jakarta Sans` (weight 500), `Inter` (weights 400, 600)
- [x] Link `styles.css`
- [x] Script `main.js` (deferred)
- [x] Layered DOM structure:
  - `div.background-layer` — will hold sphere, glow, particles (empty for now)
  - `div.content-layer` — holds all visible text + CTA
- [x] Header text split into 4 lines:
  - Line 1: "Security That Thinks."
  - Line 2: "Not louder."
  - Line 3: "Not reactive."
  - Line 4: "Not ordinary."
- [x] Subheader paragraph
- [x] CTA form group:
  - `<input>` with placeholder "Your email address"
  - `<button>` with text "Get Notified"

### 2. Create `styles.css`
- [x] CSS reset (box-sizing, margin, padding)
- [x] Root variables: `--bg: #0A0A0A`, `--text: #FFFFFF`
- [x] `body` and `html`: full height, no scroll, bg color, font defaults
- [x] `.hero` container: `100vh`, `100vw`, relative positioning
- [x] `.background-layer`: absolute, full size, z-index 0
- [x] `.content-layer`: relative, z-index 10, flex column, centered both axes
- [x] Header styling:
  - `Plus Jakarta Sans`, 500 weight
  - 3.5rem font size
  - letter-spacing: -0.05em
  - Centered text, line-height 1.2
  - Each line as a block element
  - Lines tightened by -10px margin
- [x] Subheader styling:
  - `Inter`, 400 weight
  - 16px font size
  - letter-spacing: -0.04em
  - Muted white (opacity 0.7)
  - max-width: 300px
- [x] CTA container:
  - Inline-flex row layout
  - Border: 1px solid #333, border-radius: 10px
  - Inner padding (0.35rem around button, 1.2rem left for input)
  - Dark bg with backdrop-filter: blur(10px)
- [x] CTA input:
  - Transparent background (inherits container)
  - No border
  - White text, placeholder in grey
  - 260px width
- [x] CTA button:
  - Background: #FFFFFF
  - Color: #000000 (via --bg)
  - No border
  - border-radius: 4px
  - `Inter` font, 600 weight
  - Cursor pointer
  - Hover state: slight opacity reduction

### 3. Create `main.js`
- [x] Placeholder file with phase comments

### 4. Verify
- [x] Content is centered vertically and horizontally
- [x] Fonts render correctly (Plus Jakarta Sans for header, Inter for subheader)
- [x] CTA: outer container with border, input transparent inside, button as rounded box
- [x] No horizontal scroll
- [x] Background is solid #0A0A0A

---

## Refinements Applied

Changes made during review after initial implementation:

1. **Header lines split**: "Not reactive. Not ordinary." → two separate lines (4 lines total)
2. **Subheader width**: reduced to `max-width: 300px`
3. **Header font-weight**: 700 → 500 (lighter)
4. **Header letter-spacing**: -0.02em → -0.05em
5. **Subheader letter-spacing**: added -0.04em
6. **Subheader font-size**: 1.2rem → 16px
7. **Header line spacing**: -10px margin between spans
8. **CTA layout**: redesigned from fused input+button to container with inner padding and separate rounded button
9. **Button border-radius**: 7px → 4px

---

## Checkpoint

> Open in browser — you should see static white text on a black background, centered, with a styled email input and "Get Notified" button inside a bordered container. No animations, no sphere, no glow, no particles.
