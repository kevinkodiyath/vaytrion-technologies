// Glow Backdrop System
const glowBackdrop = document.getElementById('glow-backdrop');

function createGlowBackdrop() {
    glowBackdrop.style.boxShadow = '0 0 100px rgba(255, 255, 255, 0.5)';
    glowBackdrop.style.transition = 'box-shadow 1s ease';
}

createGlowBackdrop();

// Text Animations
const header = document.querySelector('.header-line');
const subheader = document.querySelector('.subheader');

function animateText() {
    header.style.opacity = 0;
    header.style.transition = 'opacity 1s ease-in-out';
    setTimeout(() => {
        header.style.opacity = 1;
    }, 500);
    
    subheader.style.opacity = 0;
    subheader.style.transition = 'opacity 1s ease-in-out';
    setTimeout(() => {
        subheader.style.opacity = 1;
    }, 1000);
}

animateText();

// Particle System
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedY = Math.random() * 5 - 2.5;
        this.speedX = Math.random() * 5 - 2.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

init();
animate();
setInterval(animate, 100);
