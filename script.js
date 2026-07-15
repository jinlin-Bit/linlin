const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
let shootingStars = [];
let animationId;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.3;
        this.alphaChange = (Math.random() - 0.5) * 0.015;
        this.speedX = (Math.random() - 0.3) * 0.3;
        this.speedY = Math.random() * 0.2 + 0.1;
        this.gold = Math.random() > 0.92;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinklePhase = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.twinklePhase += this.twinkleSpeed;
        this.alpha = 0.3 + Math.sin(this.twinklePhase) * 0.4;

        if (this.alpha <= 0.1) this.alpha = 0.1;
        if (this.alpha >= 0.9) this.alpha = 0.9;

        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y > height + 10) {
            this.y = -10;
            this.x = Math.random() * width;
        }
        if (this.y < -10) this.y = height + 10;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        if (this.gold) {
            ctx.fillStyle = `rgba(255, 215, 0, ${this.alpha})`;
            ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
            ctx.shadowBlur = 10;
        } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
            ctx.shadowBlur = 5;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;

        if (this.gold && this.alpha > 0.6) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 215, 0, ${this.alpha * 0.15})`;
            ctx.fill();
        }
    }
}

class ShootingStar {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height * 0.3;
        this.length = Math.random() * 120 + 60;
        this.speed = Math.random() * 15 + 12;
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
        this.alpha = 1;
        this.active = true;
        this.gold = Math.random() > 0.6;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha -= 0.008;

        if (this.alpha <= 0 || this.x > width + 100 || this.y > height + 100) {
            this.active = false;
        }
    }

    draw() {
        const gradient = ctx.createLinearGradient(
            this.x - Math.cos(this.angle) * this.length,
            this.y - Math.sin(this.angle) * this.length,
            this.x,
            this.y
        );

        if (this.gold) {
            gradient.addColorStop(0, `rgba(255, 215, 0, 0)`);
            gradient.addColorStop(0.4, `rgba(255, 215, 0, ${this.alpha * 0.3})`);
            gradient.addColorStop(0.8, `rgba(255, 215, 0, ${this.alpha * 0.6})`);
            gradient.addColorStop(1, `rgba(255, 215, 0, ${this.alpha})`);
        } else {
            gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
            gradient.addColorStop(0.4, `rgba(255, 255, 255, ${this.alpha * 0.3})`);
            gradient.addColorStop(0.8, `rgba(255, 255, 255, ${this.alpha * 0.6})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, ${this.alpha})`);
        }

        ctx.beginPath();
        ctx.moveTo(
            this.x - Math.cos(this.angle) * this.length,
            this.y - Math.sin(this.angle) * this.length
        );
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = this.gold ? `rgba(255, 215, 0, ${this.alpha})` : `rgba(255, 255, 255, ${this.alpha})`;
        ctx.shadowColor = this.gold ? 'rgba(255, 215, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

class Nebula {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 150 + 100;
        this.alpha = Math.random() * 0.05 + 0.02;
        this.speedX = (Math.random() - 0.5) * 0.03;
        this.speedY = (Math.random() - 0.5) * 0.03;
        this.color = Math.random() > 0.5 ? 'purple' : 'blue';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < -this.radius) this.x = width + this.radius;
        if (this.x > width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = height + this.radius;
        if (this.y > height + this.radius) this.y = -this.radius;
    }

    draw() {
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.radius
        );

        if (this.color === 'purple') {
            gradient.addColorStop(0, `rgba(180, 140, 255, ${this.alpha})`);
            gradient.addColorStop(0.5, `rgba(160, 120, 230, ${this.alpha * 0.5})`);
            gradient.addColorStop(1, 'rgba(140, 100, 200, 0)');
        } else {
            gradient.addColorStop(0, `rgba(100, 160, 255, ${this.alpha})`);
            gradient.addColorStop(0.5, `rgba(80, 140, 230, ${this.alpha * 0.5})`);
            gradient.addColorStop(1, 'rgba(60, 120, 200, 0)');
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    }
}

let nebulas = [];

function initStars() {
    stars = [];
    nebulas = [];
    const starCount = Math.floor((width * height) / 1500);
    
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }

    for (let i = 0; i < 5; i++) {
        nebulas.push(new Nebula());
    }
}

function update() {
    ctx.fillStyle = 'rgba(10, 10, 30, 0.15)';
    ctx.fillRect(0, 0, width, height);

    nebulas.forEach(nebula => {
        nebula.update();
        nebula.draw();
    });

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    if (Math.random() < 0.015) {
        shootingStars.push(new ShootingStar());
    }

    shootingStars = shootingStars.filter(star => star.active);
    shootingStars.forEach(star => {
        star.update();
        star.draw();
    });

    animationId = requestAnimationFrame(update);
}

function startAnimation() {
    resizeCanvas();
    initStars();
    update();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initStars();
    });
}

let currentScene = 'home';

function createCakeSparkles() {
    const container = document.getElementById('cake-sparkles');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < 60; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 4 + 's';
        sparkle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        sparkle.style.width = (Math.random() * 8 + 4) + 'px';
        sparkle.style.height = sparkle.style.width;
        sparkle.style.background = ['#ffd700', '#ff6b9d', '#ff9ff3', '#ffffff'][Math.floor(Math.random() * 4)];
        container.appendChild(sparkle);
    }
}

function createCakeStars() {
    const container = document.getElementById('cake-stars');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'cake-star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 60 + '%';
        star.style.fontSize = (Math.random() * 12 + 8) + 'px';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.textContent = ['⭐', '✨', '🌟', '💫'][Math.floor(Math.random() * 4)];
        container.appendChild(star);
    }
}

function createCakePetals() {
    const container = document.getElementById('cake-petals');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        petal.className = 'cake-petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDelay = Math.random() * 6 + 's';
        petal.style.animationDuration = (Math.random() * 4 + 4) + 's';
        petal.style.width = (Math.random() * 10 + 15) + 'px';
        petal.style.height = (Math.random() * 10 + 20) + 'px';
        petal.style.background = ['linear-gradient(135deg, #ffcad4 0%, #ffb3c1 50%, #ff8fab 100%)',
                                 'linear-gradient(135deg, #fff0f5 0%, #ffe4e1 50%, #fae0e4 100%)',
                                 'linear-gradient(135deg, #e8daef 0%, #d7bde2 50%, #c39bd3 100%)'][Math.floor(Math.random() * 3)];
        container.appendChild(petal);
    }
}

function createCakeLights() {
    const container = document.getElementById('cake-lights');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < 15; i++) {
        const light = document.createElement('div');
        light.className = 'cake-light';
        light.style.left = Math.random() * 100 + '%';
        light.style.top = Math.random() * 40 + '%';
        light.style.animationDelay = Math.random() * 2 + 's';
        light.style.width = (Math.random() * 10 + 10) + 'px';
        light.style.height = light.style.width;
        container.appendChild(light);
    }
}

function goToScene(sceneName) {
    const current = document.getElementById(`scene-${currentScene}`);
    const next = document.getElementById(`scene-${sceneName}`);

    if (!current || !next) {
        console.error('Scene not found:', currentScene, sceneName);
        return;
    }

    current.classList.remove('active');
    
    setTimeout(() => {
        current.style.display = 'none';
        next.style.display = 'flex';
        
        setTimeout(() => {
            next.classList.add('active');
            currentScene = sceneName;
            
            if (sceneName === 'cake') {
                createCakeSparkles();
                createCakeStars();
                createCakePetals();
                createCakeLights();
            }
        }, 50);
    }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    startAnimation();
    
    document.querySelectorAll('.scene').forEach(scene => {
        if (!scene.classList.contains('active')) {
            scene.style.display = 'none';
        }
    });
});