// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

document.addEventListener('mousemove', e => {
  const x = e.clientX, y = e.clientY;
  cursor.style.left = x + 'px';
  cursor.style.top = y + 'px';
  follower.style.left = x + 'px';
  follower.style.top = y + 'px';
});
document.querySelectorAll('a, button, .tilt-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1.8)';
    follower.style.transform = 'translate(-50%,-50%) scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

// ===== DARK / LIGHT TOGGLE =====
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const saved = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', saved);
themeIcon.className = saved === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

themeToggle.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== TYPED TEXT =====
const words = ['Front End Developer', 'UI Builder', 'Web Designer', 'Creative Coder'];
let wi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');
function type() {
  const w = words[wi];
  typedEl.textContent = deleting ? w.slice(0, ci--) : w.slice(0, ci++);
  if (!deleting && ci > w.length) { deleting = true; setTimeout(type, 1500); return; }
  if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; }
  setTimeout(type, deleting ? 50 : 90);
}
type();

// ===== SCROLL REVEAL =====
document.querySelectorAll(
  '.skill-card, .project-card, .stat-card, .timeline-item, .contact-card, .about-text, .about-stats, .section-header, .contact-form, .contact-lead'
).forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) cur = s.id; });
  navItems.forEach(a => {
    const active = a.getAttribute('href') === `#${cur}`;
    a.style.color = active ? 'var(--primary)' : '';
  });
});

// ===== 3D TILT CARDS =====
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale(1)';
  });
});

// ===== CONTACT FORM =====
function handleSubmit(e) {
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  const btn = e.target.querySelector('button');
  btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
  btn.disabled = true;
  setTimeout(() => {
    msg.textContent = '✅ Message sent! I\'ll get back to you soon.';
    e.target.reset();
    btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    btn.disabled = false;
    setTimeout(() => msg.textContent = '', 4000);
  }, 1200);
}

// ===== PROFILE PHOTO FALLBACK =====
const heroPhoto = document.getElementById('heroPhoto');
if (heroPhoto) {
  heroPhoto.onerror = () => {
    heroPhoto.style.display = 'none';
    const inner = document.querySelector('.photo-card');
    if (inner) {
      inner.style.display = 'flex';
      inner.style.alignItems = 'center';
      inner.style.justifyContent = 'center';
      inner.style.background = 'linear-gradient(135deg, #dbeafe, #ede9fe)';
      inner.style.fontSize = '5rem';
      inner.style.fontWeight = '900';
      inner.style.color = '#4f46e5';
      inner.innerHTML += '<span style="z-index:2">AP</span>';
    }
  };
}

// ===== SMOOTH ENTRANCE =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});
