/* ===== CURSOR ===== */
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
if (cursor && trail) {
  let mx = 0, my = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animCursor() {
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    tx += (mx - tx) * 0.18;
    ty += (my - ty) * 0.18;
    trail.style.left = tx + 'px';
    trail.style.top = ty + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();
}

/* ===== BURGER MENU ===== */
const burger = document.getElementById('burger');
const overlay = document.getElementById('menuOverlay');
if (burger && overlay) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  });
  overlay.querySelectorAll('.menu-link').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ===== SCROLL REVEAL ===== */
const revEls = document.querySelectorAll('.reveal, .reveal-left');
if (revEls.length) {
  const ro = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (i % 3 * 0.1) + 's';
        e.target.classList.add('visible');
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revEls.forEach(el => ro.observe(el));
}

/* ===== SKILL BAR ANIMATION ===== */
const bars = document.querySelectorAll('.sk-fill');
if (bars.length) {
  const bo = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width;
        bo.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => bo.observe(b));
}

/* ===== PROJECT FILTER ===== */
const filterBtns = document.querySelectorAll('.pf-btn');
const cards = document.querySelectorAll('.pm-card');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      cards.forEach(card => {
        const match = cat === 'all' || card.dataset.cat === cat;
        card.classList.toggle('hidden', !match);
      });
    });
  });
}

/* ===== COUNTER ANIMATION ===== */
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const co = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseFloat(e.target.dataset.count);
        const isDecimal = String(target).includes('.');
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          e.target.textContent = isDecimal ? current.toFixed(2) : Math.floor(current) + (e.target.dataset.suffix || '');
          if (current >= target) clearInterval(timer);
        }, 16);
        co.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => co.observe(c));
}

/* ===== FORM VALIDATION ===== */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    document.querySelectorAll('.cf-error').forEach(el => el.style.display = 'none');

    const name = document.getElementById('cf-name');
    const email = document.getElementById('cf-email');
    const msg = document.getElementById('cf-msg');

    if (!name.value.trim()) {
      document.getElementById('err-name').style.display = 'block'; ok = false;
    }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      document.getElementById('err-email').style.display = 'block'; ok = false;
    }
    if (!msg.value.trim() || msg.value.length < 10) {
      document.getElementById('err-msg').style.display = 'block'; ok = false;
    }

    if (ok) {
      const suc = document.getElementById('cf-success');
      suc.style.display = 'block';
      form.reset();
      setTimeout(() => suc.style.display = 'none', 5000);
    }
  });
}

/* ===== NAV SCROLL STYLE ===== */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 40 ? 'var(--p3)' : 'var(--p2)';
  });
}

/* ===== HORIZONTAL SCROLL ORG TIMELINE (drag) ===== */
const orgTimeline = document.querySelector('.org-timeline');
if (orgTimeline) {
  let isDown = false, startX, scrollLeft;
  orgTimeline.addEventListener('mousedown', e => {
    isDown = true;
    orgTimeline.style.cursor = 'grabbing';
    startX = e.pageX - orgTimeline.offsetLeft;
    scrollLeft = orgTimeline.scrollLeft;
  });
  orgTimeline.addEventListener('mouseleave', () => { isDown = false; orgTimeline.style.cursor = 'grab'; });
  orgTimeline.addEventListener('mouseup', () => { isDown = false; orgTimeline.style.cursor = 'grab'; });
  orgTimeline.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - orgTimeline.offsetLeft;
    orgTimeline.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
  orgTimeline.style.cursor = 'grab';
}
