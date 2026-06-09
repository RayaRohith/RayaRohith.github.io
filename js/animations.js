// ============================================================
// PORTFOLIO ANIMATIONS
// Cyber / AI oriented — purposeful, not overdone
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. TYPEWRITER EFFECT ON HERO TITLE ──
  const titleEl = document.getElementById('hero-title');
  if (titleEl) {
    const text = titleEl.getAttribute('data-text');
    titleEl.textContent = '';
    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    titleEl.appendChild(cursor);
    const type = () => {
      if (i < text.length) {
        titleEl.insertBefore(document.createTextNode(text[i]), cursor);
        i++;
        setTimeout(type, 45);
      }
    };
    setTimeout(type, 400);
  }

  // ── 2. PARTICLE NETWORK CANVAS ──
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles;
    const CYAN = 'rgba(0,212,255,';
    const COUNT = 55;
    const MAX_DIST = 140;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r = Math.random() * 1.5 + 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = CYAN + '0.6)';
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      particles = Array.from({ length: COUNT }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = CYAN + alpha + ')';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => { resize(); });
    init();
    animate();
  }

  // ── 3. SCROLL FADE-IN ──
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => observer.observe(el));

  // ── 4. ANIMATED STAT COUNTERS ──
  const counters = document.querySelectorAll('.stat-number');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        const suffix = entry.target.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = Math.ceil(target / 50);
        const update = () => {
          current = Math.min(current + increment, target);
          entry.target.textContent = current + suffix;
          if (current < target) requestAnimationFrame(update);
        };
        update();
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => countObserver.observe(el));

  // ── 5. TERMINAL BOOT SEQUENCE IN HERO ──
  const terminal = document.getElementById('terminal-lines');
  if (terminal) {
    const lines = [
      '> Initialising security profile...',
      '> Loading threat intelligence feeds... [OK]',
      '> MITRE ATT&CK mapping loaded... [OK]',
      '> Sentinel workspace connected... [OK]',
      '> AI pipeline status: ACTIVE',
      '> Welcome, Rohith.',
    ];
    let lineIndex = 0;
    const addLine = () => {
      if (lineIndex < lines.length) {
        const p = document.createElement('p');
        p.className = 'terminal-line';
        p.textContent = lines[lineIndex];
        terminal.appendChild(p);
        lineIndex++;
        setTimeout(addLine, 380);
      }
    };
    setTimeout(addLine, 800);
  }

  // ── 6. ACTIVE NAV HIGHLIGHT ON SCROLL ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const scrollSpy = () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 80) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('nav-active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('nav-active');
      }
    });
  };
  window.addEventListener('scroll', scrollSpy);

});
