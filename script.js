/* BB Bites — shared interactivity */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
      io.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- menu category filter (menu.html) ---------- */
  const tabs = document.querySelectorAll('.menu-tab');
  const cards = document.querySelectorAll('.menu-card');

  if (tabs.length && cards.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        const filter = tab.dataset.filter;
        cards.forEach(card => {
          const show = filter === 'all' || card.dataset.group === filter;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- QR code (contact.html) ---------- */
  const qrTarget = document.getElementById('qrcode');
  if (qrTarget && window.QRCode) {
    // Points at menu.html relative to wherever this site is hosted.
    // Once you upload the site to your domain, this resolves automatically —
    // no need to touch the code.
    const menuURL = new URL('menu.html', window.location.href).href;

    new QRCode(qrTarget, {
      text: menuURL,
      width: 168,
      height: 168,
      colorDark: '#2b241c',
      colorLight: '#fbf8f1',
      correctLevel: QRCode.CorrectLevel.M
    });

    const link = document.getElementById('qr-url');
    if (link) { link.textContent = menuURL; link.href = menuURL; }
  }

  /* ---------- footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
