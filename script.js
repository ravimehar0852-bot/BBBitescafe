// ==========================================================================
// BB BITES — shared behaviour
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- mobile nav toggle ---- */
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- highlight current page in nav ---- */
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- menu category tab filter (menu.html) ---- */
  const tabs = document.querySelectorAll('.menu-tab');
  const categories = document.querySelectorAll('.menu-category');

  if (tabs.length && categories.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.target;

        if (target === 'all') {
          categories.forEach(c => c.style.display = '');
        } else {
          categories.forEach(c => {
            c.style.display = c.id === target ? '' : 'none';
          });
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ---- QR code generation (contact.html) ---- */
  const qrBox = document.getElementById('menu-qr');
  if (qrBox && window.QRCode) {
    const menuURL = window.location.origin + window.location.pathname.replace(/[^/]*$/, 'menu.html');
    new QRCode(qrBox, {
      text: menuURL,
      width: 166,
      height: 166,
      colorDark: '#241C13',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });
  }

  /* ---- reveal-on-scroll for cards/sections ---- */
  const revealEls = document.querySelectorAll('.card, .dish, .menu-category, .gallery-item, .story-figure');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      io.observe(el);
    });
  }
});

