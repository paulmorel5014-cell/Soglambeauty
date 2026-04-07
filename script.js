/* ============================================================
   So Glam Beauty Bar — Scripts
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navigation scroll ──────────────────────────────────── */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load


  /* ── Mobile menu ────────────────────────────────────────── */
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuClose  = document.getElementById('menuClose');
  let menuOpen = false;

  function openMenu() {
    menuOpen = true;
    mobileMenu.classList.add('open');
    mobileMenu.removeAttribute('aria-hidden');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Animate burger into × shape
    const [s1, s2, s3] = burger.querySelectorAll('span');
    s1.style.transform = 'translateY(6.5px) rotate(45deg)';
    s2.style.opacity   = '0';
    s3.style.transform = 'translateY(-6.5px) rotate(-45deg)';
  }

  function closeMenu() {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    const [s1, s2, s3] = burger.querySelectorAll('span');
    s1.style.transform = '';
    s2.style.opacity   = '';
    s3.style.transform = '';
  }

  burger.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());
  menuClose?.addEventListener('click', closeMenu);

  // Close on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });


  /* ── Smooth scroll for anchor links ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY
                     - parseInt(getComputedStyle(document.documentElement)
                         .getPropertyValue('--nav-h') || '72', 10);
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });


  /* ── Scroll-reveal (IntersectionObserver) ───────────────── */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));


  /* ── FAQ accordion ──────────────────────────────────────── */
  document.querySelectorAll('.faq-item__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen  = btn.getAttribute('aria-expanded') === 'true';
      const answer  = btn.nextElementSibling;

      // Close all other items
      document.querySelectorAll('.faq-item__q').forEach(other => {
        if (other === btn) return;
        other.setAttribute('aria-expanded', 'false');
        const otherAnswer = other.nextElementSibling;
        otherAnswer.classList.remove('open');
        otherAnswer.hidden = false; // keep in DOM for animation
      });

      // Toggle current
      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.classList.toggle('open', !isOpen);
    });
  });


  /* ── Active nav link highlight on scroll ───────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => sectionObserver.observe(s));

});
