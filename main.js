(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  const API_URL = "https://script.google.com/macros/s/AKfycbzNfp7atfzwHhxM4kI0Hb4WqSXDBQtPUJeEi4bewzkPyG2GsNVV4Q08WiIjAEuOCRqu/exec";

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function initCTA() {
    const btn = document.querySelector('.cta-button');
    const input = document.querySelector('.cta-input');

    if (!btn || !input) return;

    btn.addEventListener('click', async function () {
      const email = input.value.trim();

      if (!isValidEmail(email)) {
        alert('Enter a valid email');
        return;
      }

      btn.textContent = 'Sending...';
      btn.disabled = true;

      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (data.success) {
          btn.textContent = 'You’re in';
          input.value = '';
        } else {
          throw new Error();
        }

      } catch (err) {
        btn.textContent = 'Try again';
        btn.disabled = false;
      }
    });
  }

  function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2,
          dx: (Math.random() - 0.5) * 0.2,
          dy: (Math.random() - 0.5) * 0.2,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';

      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();
  }

  function boot() {
    initParticles();
    initCTA();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();

