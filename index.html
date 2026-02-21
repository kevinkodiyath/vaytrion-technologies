/**
 * main.js — Vaytrion Technologies "Coming Soon" Landing Page
 *
 * Vanilla JS, zero dependencies. Runs as a single IIFE.
 *
 * Systems:
 *   1. Glow Backdrop  — Picks a random color from a 5-color palette, fades it in
 *                        behind all content as a radial gradient, then cross-fades
 *                        to a new random color every 25s via CSS transition.
 *
 *   2. Text Animations — Splits header and subheader text into <span class="word">
 *                        elements at runtime, then staggers a .revealed class onto
 *                        each word with configurable delays. Uses a double
 *                        requestAnimationFrame to guarantee the browser paints the
 *                        hidden state before transitioning.
 *
 *   3. Particles       — 60 white dots on a full-viewport canvas. Each star has
 *                        slow positional drift, sinusoidal twinkle (3-7s cycles),
 *                        and uniform mouse parallax (+-15px, lerped). Delta-time
 *                        normalized, devicePixelRatio-aware, debounced on resize.
 *
 * Boot sequence:
 *   boot() -> initGlow() fires immediately
 *          -> after 500ms overlap, runAnimations() starts text reveal
 *          -> initParticles() runs alongside from the start
 *
 * No-JS fallback:
 *   <html> starts with class="no-js". This script removes it on load.
 *   If the script fails, CSS rules on html.no-js make all content visible.
 */

(function () {
  'use strict';

  // Remove no-js fallback class
  document.documentElement.classList.remove('no-js');

  // ===========================
  // Glow Backdrop
  // ===========================

  var GLOW_COLORS = ['#932EFF', '#3C2EFF', '#428EFF', '#39A29A', '#27A043'];
  var GLOW_HOLD_DURATION = 25000;     // ms to hold each color before transitioning
  var GLOW_TEXT_OVERLAP = 500;         // ms into glow entrance before text animations start

  /**
   * Convert hex to rgba string at a given alpha.
   */
  function hexToRgba(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  /**
   * Pick a random index from the color array, excluding a given index.
   */
  function randomColorIndex(excludeIndex) {
    var idx;
    do {
      idx = Math.floor(Math.random() * GLOW_COLORS.length);
    } while (idx === excludeIndex && GLOW_COLORS.length > 1);
    return idx;
  }

  /**
   * Initialize the glow backdrop: pick color, entrance animation, start drift.
   * Calls onOverlap after GLOW_TEXT_OVERLAP ms so text animations can start
   * while the glow entrance is still running (overlapped timing).
   */
  function initGlow(onOverlap) {
    var el = document.getElementById('glow-backdrop');
    if (!el) {
      onOverlap();
      return;
    }

    // Pick initial random color
    var currentIndex = randomColorIndex(-1);
    el.style.setProperty('--glow-color', hexToRgba(GLOW_COLORS[currentIndex], 0.2));

    // Trigger entrance (scale + fade) on next frame so the initial state is painted
    requestAnimationFrame(function () {
      el.classList.add('visible');
    });

    // Start text animations overlapping at GLOW_TEXT_OVERLAP into the entrance
    setTimeout(onOverlap, GLOW_TEXT_OVERLAP);

    // Color drift: swap to next random color every GLOW_HOLD_DURATION
    // The CSS transition on `background` (5s ease) handles the cross-fade
    setInterval(function () {
      currentIndex = randomColorIndex(currentIndex);
      el.style.setProperty('--glow-color', hexToRgba(GLOW_COLORS[currentIndex], 0.2));
    }, GLOW_HOLD_DURATION);
  }

  // ===========================
  // Text Animations
  // ===========================

  // Timing configuration (ms)
  var WORD_DELAY = 36;           // Between words within a header line
  var LINE_GAP = 50;             // Between header lines
  var SUBHEADER_WORD_DELAY = 14; // Between words in subheader
  var INITIAL_DELAY = 150;       // Before first word appears

  /**
   * Wrap each word in a <span class="word">.
   * Returns an array of the created word span elements.
   */
  function splitIntoWords(element) {
    var text = element.textContent;
    var words = text.split(/\s+/).filter(function (w) { return w.length > 0; });
    var spans = [];

    // Clear the element
    element.textContent = '';

    words.forEach(function (word, i) {
      var span = document.createElement('span');
      span.className = 'word';
      span.textContent = word;

      element.appendChild(span);

      // Add space between words (except after last word)
      if (i < words.length - 1) {
        element.appendChild(document.createTextNode(' '));
      }

      spans.push(span);
    });

    return spans;
  }

  /**
   * Build the full animation timeline and execute it.
   */
  function runAnimations() {
    var headerLines = document.querySelectorAll('.header-line');
    var subheader = document.querySelector('.subheader');
    var cta = document.querySelector('.cta');

    // Collect all word spans grouped by element
    var timeline = []; // Array of { el: HTMLElement, delay: number }
    var cursor = INITIAL_DELAY;

    // Header lines: word-by-word with gaps between lines
    headerLines.forEach(function (line, lineIndex) {
      var wordSpans = splitIntoWords(line);

      wordSpans.forEach(function (span, wordIndex) {
        timeline.push({ el: span, delay: cursor + wordIndex * WORD_DELAY });
      });

      // Move cursor past this line's words + gap before next line
      cursor += wordSpans.length * WORD_DELAY + LINE_GAP;
    });

    // Header is now fully scheduled — save this timestamp
    var headerEndTime = cursor;

    // Subheader: starts immediately after header finishes, word-by-word
    if (subheader) {
      var subCursor = headerEndTime;
      var subWords = splitIntoWords(subheader);

      subWords.forEach(function (span, wordIndex) {
        timeline.push({ el: span, delay: subCursor + wordIndex * SUBHEADER_WORD_DELAY });
      });
    }

    // CTA: starts right after header finishes, slow gentle fade
    if (cta) {
      timeline.push({ el: cta, delay: headerEndTime });
    }

    // Force the browser to paint the initial hidden state before scheduling reveals.
    // Without this, the browser may batch span creation + class addition into one
    // frame, skipping the transition entirely.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        timeline.forEach(function (entry) {
          setTimeout(function () {
            entry.el.classList.add('revealed');
          }, entry.delay);
        });
      });
    });
  }

  // ===========================
  // Particle System (Starry Night)
  // ===========================

  var P_COUNT = 60;              // Fixed particle count
  var P_MIN_RADIUS = 0.8;       // Min star radius (px)
  var P_MAX_RADIUS = 2;         // Max star radius (px)
  var P_MIN_OPACITY = 0.1;      // Min peak opacity
  var P_MAX_OPACITY = 0.35;     // Max peak opacity
  var P_MIN_DRIFT = -0.08;      // Min drift speed per axis (px per 16.67ms frame)
  var P_MAX_DRIFT = 0.08;       // Max drift speed per axis
  var P_MIN_TWINKLE = 3000;     // Min twinkle cycle duration (ms)
  var P_MAX_TWINKLE = 7000;     // Max twinkle cycle duration (ms)
  var P_SPAWN_CEILING = 0.0;    // Top of spawn zone (fraction of viewport height)
  var P_SPAWN_FLOOR = 0.75;     // Bottom of spawn zone (fraction — above horizon)
  var P_REF_DT = 16.67;         // Reference frame duration for speed normalization (ms)
  var P_MOUSE_STRENGTH = 15;    // Max px offset when mouse is at viewport edge
  var P_MOUSE_EASE = 0.04;      // Lerp factor per frame (0-1, lower = smoother)

  /**
   * Random float in [min, max].
   */
  function randRange(min, max) {
    return min + Math.random() * (max - min);
  }

  /**
   * Initialize and run the starry night particle system.
   */
  function initParticles() {
    var canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var particles = [];
    var dpr = window.devicePixelRatio || 1;
    var canvasW = 0;
    var canvasH = 0;

    // Mouse parallax: uniform offset applied to all particles
    var offsetX = 0;             // Current smoothed offset (px)
    var offsetY = 0;
    var targetOffsetX = 0;       // Target offset based on mouse
    var targetOffsetY = 0;

    /**
     * Resize the canvas to match the viewport.
     */
    function resizeCanvas() {
      dpr = window.devicePixelRatio || 1;
      canvasW = window.innerWidth;
      canvasH = window.innerHeight;
      canvas.width = canvasW * dpr;
      canvas.height = canvasH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    /**
     * Create a single star particle at a random position in the spawn zone.
     */
    function createParticle() {
      return {
        x: Math.random() * canvasW,
        y: randRange(P_SPAWN_CEILING * canvasH, P_SPAWN_FLOOR * canvasH),
        vx: randRange(P_MIN_DRIFT, P_MAX_DRIFT),
        vy: randRange(P_MIN_DRIFT, P_MAX_DRIFT),
        radius: randRange(P_MIN_RADIUS, P_MAX_RADIUS),
        maxOpacity: randRange(P_MIN_OPACITY, P_MAX_OPACITY),
        twinkleDuration: randRange(P_MIN_TWINKLE, P_MAX_TWINKLE),
        twinkleOffset: Math.random() * Math.PI * 2  // Random phase so they don't sync
      };
    }

    /**
     * Compute current opacity via smooth sinusoidal twinkle.
     */
    function particleOpacity(p, time) {
      // sin gives -1..1, map to 0..1, then scale by maxOpacity
      var phase = (time / p.twinkleDuration) * Math.PI * 2 + p.twinkleOffset;
      var t = (Math.sin(phase) + 1) * 0.5; // 0..1
      // Don't go fully invisible — keep a floor at 20% of maxOpacity
      return p.maxOpacity * (0.2 + 0.8 * t);
    }

    /**
     * Main animation frame.
     */
    var lastTime = 0;

    function frame(timestamp) {
      if (!lastTime) lastTime = timestamp;
      var dt = timestamp - lastTime;
      lastTime = timestamp;

      // Cap dt to prevent huge jumps after tab switch
      if (dt > 100) dt = P_REF_DT;

      var dtScale = dt / P_REF_DT;

      // Smooth the mouse offset toward target (lerp)
      offsetX += (targetOffsetX - offsetX) * P_MOUSE_EASE * dtScale;
      offsetY += (targetOffsetY - offsetY) * P_MOUSE_EASE * dtScale;

      // Clear
      ctx.clearRect(0, 0, canvasW, canvasH);

      // Update and draw particles
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        // Drift
        p.x += p.vx * dtScale;
        p.y += p.vy * dtScale;

        // Wrap around edges with padding so they don't pop
        if (p.x < -10) p.x = canvasW + 10;
        if (p.x > canvasW + 10) p.x = -10;
        if (p.y < -10) p.y = P_SPAWN_FLOOR * canvasH;
        if (p.y > P_SPAWN_FLOOR * canvasH + 10) p.y = -10;

        // Twinkle opacity
        var opacity = particleOpacity(p, timestamp);
        if (opacity <= 0) continue;

        // Draw at particle position + uniform mouse offset
        ctx.beginPath();
        ctx.arc(p.x + offsetX, p.y + offsetY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + opacity.toFixed(3) + ')';
        ctx.fill();
      }

      requestAnimationFrame(frame);
    }

    // Setup
    resizeCanvas();

    // Create initial particle pool
    for (var i = 0; i < P_COUNT; i++) {
      particles.push(createParticle());
    }

    // Debounced resize handler
    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        resizeCanvas();
      }, 150);
    });

    // Mouse tracking for parallax offset
    window.addEventListener('mousemove', function (e) {
      // Normalize to -1..1 (center = 0), then invert for parallax
      var normX = (e.clientX / canvasW) * 2 - 1;
      var normY = (e.clientY / canvasH) * 2 - 1;
      targetOffsetX = -normX * P_MOUSE_STRENGTH;
      targetOffsetY = -normY * P_MOUSE_STRENGTH;
    });

    // Start the loop
    requestAnimationFrame(frame);
  }

  // ===========================
  // Entry Point
  // ===========================

  function boot() {
    // Glow starts immediately; text animations begin 500ms into glow entrance
    initGlow(function () {
      runAnimations();
    });
    // Particles start immediately alongside glow
    initParticles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
