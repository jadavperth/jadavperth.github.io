/* ===========================
   NAVIGATION: Scroll state + mobile toggle
=========================== */
const navbar = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

/* ===========================
   SCROLL REVEAL
=========================== */
const revealElements = document.querySelectorAll(
  '.work-card, .about-text p, .about-stats .stat, .skill-group, .contact-item, .stat'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children of a grid
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ===========================
   STAGGERED REVEAL FOR GRIDS
=========================== */
function staggerObserve(selector, delay = 100) {
  const parent = document.querySelector(selector);
  if (!parent) return;

  const children = Array.from(parent.children);
  children.forEach(child => child.classList.add('reveal'));

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      children.forEach((child, i) => {
        setTimeout(() => child.classList.add('visible'), i * delay);
      });
      obs.unobserve(parent);
    }
  }, { threshold: 0.1 });

  obs.observe(parent);
}

staggerObserve('.work-grid', 120);
staggerObserve('.skills-columns', 100);

/* ===========================
   ACTIVE NAV HIGHLIGHTING
=========================== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.opacity = a.getAttribute('href') === `#${id}` ? '1' : '0.7';
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--rust)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
