(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  const API_URL = "https://script.google.com/macros/s/AKfycbzNfp7atfzwHhxM4kI0Hb4WqSXDBQtPUJeEi4bewzkPyG2GsNVV4Q08WiIjAEuOCRqu/exec";

  function isValidEmail(email) {
    // Enhanced email validation pattern
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
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

        // Check if response is ok before parsing JSON
        if (!res.ok) {
          console.error('Server error:', res.status, res.statusText);
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (data.success) {
          btn.textContent = 'You\'re in';
          input.value = '';
        } else {
          console.error('API error:', data.error || 'Unknown error');
          throw new Error(data.error || 'Submission failed');
        }

      } catch (err) {
        console.error('CTA Error:', err.message);
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
    let animationId = null;

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

        // Fix: Clamp position before reversing direction to prevent particles getting stuck
        if (p.x < 0 || p.x > canvas.width) {
          p.x = Math.max(0, Math.min(p.x, canvas.width));
          p.dx *= -1;
        }
        if (p.y < 0 || p.y > canvas.height) {
          p.y = Math.max(0, Math.min(p.y, canvas.height));
          p.dy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    }

    function stop() {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      window.removeEventListener('resize', handleResize);
    }

    function handleResize() {
      resize();
      createParticles();
    }

    resize();
    createParticles();
    draw();
    
    // Fix: Add window resize listener to update canvas on window resize
    window.addEventListener('resize', handleResize);

    // Return cleanup function to prevent memory leaks
    return stop;
  }

  function boot() {
    const stopParticles = initParticles();
    initCTA();

    // Cleanup on page unload
    window.addEventListener('beforeunload', stopParticles);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();