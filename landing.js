/* ═══════════════════════════════════════════════════
   SKILLCRAFTERS — landing.js
   Landing page UI · Auth modal · Interactions
   ═══════════════════════════════════════════════════ */

'use strict';

/* ── Wait for DOM ───────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* ═══════════════════════════════════════════════
     THEME
     ═══════════════════════════════════════════════ */
  const html      = document.documentElement;
  const themeBtn  = document.getElementById('themeBtn');
  const saved     = localStorage.getItem('sc-theme');
  if (saved) html.setAttribute('data-theme', saved);

  themeBtn?.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('sc-theme', next);
  });


  /* ═══════════════════════════════════════════════
     PAGE LOADER
     ═══════════════════════════════════════════════ */
  const ldFill = document.getElementById('ldFill');
  const loader  = document.getElementById('loader');

  if (loader) {
    if (window.location.hash) {
      /* Navigated directly to a section (e.g. index.html#disciplines) —
         skip the loader entirely so there is no intermediate screen.     */
      loader.style.display = 'none';
      window.addEventListener('load', () => {
        _initReveal();
        _initParticles();
      });
    } else {
      document.body.style.overflow = 'hidden';
      let lp = 0;
      const lti = setInterval(() => {
        lp = Math.min(lp + Math.random() * 18 + 4, 100);
        if (ldFill) ldFill.style.width = lp + '%';
        if (lp >= 100) clearInterval(lti);
      }, 85);

      window.addEventListener('load', () => {
        setTimeout(() => {
          loader.style.transition = 'opacity 0.55s ease';
          loader.style.opacity    = '0';
          setTimeout(() => {
            loader.style.display = 'none';
            document.body.style.overflow = '';
            _initReveal();
            _initParticles();
          }, 570);
        }, 400);
      });
    }
  }


  /* ═══════════════════════════════════════════════
     AUTH MODAL
     ═══════════════════════════════════════════════ */
  const authModal = document.getElementById('authModal');

  /* Open modal — tab: 'in' (sign in) or 'up' (register) */
  window.openAuth = function(tab = 'in') {
    _switchTab(tab);
    authModal?.classList.add('open');
    /* Focus first input for accessibility */
    setTimeout(() => {
      const first = authModal?.querySelector(`#panel${tab === 'in' ? 'In' : 'Up'} input`);
      first?.focus();
    }, 160);
  };

  /* Close modal */
  window.closeAuth = function() {
    authModal?.classList.remove('open');
    _clearErrors();
  };

  /* Switch between Sign-in and Sign-up panels */
  window.switchAuthTab = _switchTab;
  function _switchTab(mode) {
    document.getElementById('tabSignIn')?.classList.toggle('active', mode === 'in');
    document.getElementById('tabSignUp')?.classList.toggle('active', mode === 'up');
    document.getElementById('panelIn')  ?.classList.toggle('hidden', mode !== 'in');
    document.getElementById('panelUp')  ?.classList.toggle('hidden', mode !== 'up');
    _clearErrors();
  }

  /* Close on backdrop click */
  authModal?.addEventListener('click', e => {
    if (e.target === authModal) window.closeAuth();
  });

  /* Close on Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && authModal?.classList.contains('open')) {
      window.closeAuth();
    }
  });

  /* ── Submit: Sign In ─────────────────────────── */
  window.doSignIn = function() {
    const email = document.getElementById('inEmail')?.value.trim()  ?? '';
    const pass  = document.getElementById('inPass')?.value          ?? '';
    const btn   = authModal?.querySelector('#panelIn .btn-modal-submit');

    _setLoading(btn, true);
    /* Micro delay so button state renders before redirect */
    setTimeout(() => {
      const ok = window.SC.Auth.signIn(email, pass);
      if (!ok) _setLoading(btn, false);
    }, 160);
  };

  /* ── Submit: Sign Up ─────────────────────────── */
  window.doSignUp = function() {
    const fn   = document.getElementById('upFirst')?.value.trim()  ?? '';
    const ln   = document.getElementById('upLast')?.value.trim()   ?? '';
    const em   = document.getElementById('upEmail')?.value.trim()  ?? '';
    const pw   = document.getElementById('upPass')?.value          ?? '';
    const btn  = authModal?.querySelector('#panelUp .btn-modal-submit');

    _setLoading(btn, true);
    setTimeout(() => {
      const ok = window.SC.Auth.signUp(fn, ln, em, pw);
      if (!ok) _setLoading(btn, false);
    }, 160);
  };

  /* ── Enter key submits focused panel ─────────── */
  document.getElementById('panelIn')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') window.doSignIn();
  });
  document.getElementById('panelUp')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') window.doSignUp();
  });

  /* ── Field helpers ───────────────────────────── */
  function _setLoading(btn, on) {
    if (!btn) return;
    btn.disabled = on;
    btn.style.opacity = on ? '0.65' : '';
    const original = btn.getAttribute('data-label') || btn.textContent;
    if (on) {
      btn.setAttribute('data-label', original);
      btn.innerHTML = `<span class="btn-spinner"></span>`;
    } else {
      btn.innerHTML = btn.getAttribute('data-label') || original;
    }
  }

  function _clearErrors() {
    authModal?.querySelectorAll('.field-error').forEach(el => el.remove());
    authModal?.querySelectorAll('input.invalid').forEach(el => el.classList.remove('invalid'));
  }

  /* Inject spinner style if absent */
  if (!document.getElementById('lj-spinner-style')) {
    const s = document.createElement('style');
    s.id = 'lj-spinner-style';
    s.textContent = `
      .btn-spinner {
        display: inline-block;
        width: 14px; height: 14px;
        border: 1.8px solid rgba(255,255,255,.35);
        border-top-color: #fff;
        border-radius: 50%;
        animation: spin-btn .7s linear infinite;
        vertical-align: middle;
      }
      @keyframes spin-btn { to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(s);
  }


  /* ═══════════════════════════════════════════════
     CUSTOM CURSOR
     ═══════════════════════════════════════════════ */
  const cDot  = document.getElementById('curDot');
  const cRing = document.getElementById('curRing');

  if (cDot && cRing) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cDot.style.left = mx + 'px';
      cDot.style.top  = my + 'px';
    });

    (function ringLoop() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cRing.style.left = rx + 'px';
      cRing.style.top  = ry + 'px';
      requestAnimationFrame(ringLoop);
    })();

    document.querySelectorAll(
      'a, button, input, .disc-card, .course-card, .job-card, .tes-btn'
    ).forEach(el => {
      el.addEventListener('mouseenter', () => cRing.classList.add('expanded'));
      el.addEventListener('mouseleave', () => cRing.classList.remove('expanded'));
    });
  }


  /* ═══════════════════════════════════════════════
     SCROLL PROGRESS BAR
     ═══════════════════════════════════════════════ */
  const scrollBar = document.getElementById('scroll-bar');
  if (scrollBar) {
    window.addEventListener('scroll', () => {
      const pct = window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      scrollBar.style.width = Math.min(pct * 100, 100) + '%';
    }, { passive: true });
  }


  /* ═══════════════════════════════════════════════
     NAVBAR — scroll behaviour + active link
     ═══════════════════════════════════════════════ */
  const nav     = document.getElementById('nav');
  const secIds  = ['hero', 'disciplines', 'courses', 'jobs', 'testimonials', 'cta'];

  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 44);
    const y = window.scrollY + 100;
    secIds.forEach(id => {
      const sec = document.getElementById(id);
      const lnk = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (!sec || !lnk) return;
      lnk.classList.toggle('on',
        y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight);
    });
  }, { passive: true });

  window.toggleMob = function() {
    const drawer = document.getElementById('mobNav');
    const ham    = document.getElementById('navHam');
    if (!drawer || !ham) return;
    const sp   = ham.querySelectorAll('span');
    const open = drawer.classList.toggle('open');
    sp[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)'  : '';
    sp[1].style.opacity   = open ? '0'                                  : '1';
    sp[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  };

  window.closeMob = function() {
    document.getElementById('mobNav')?.classList.remove('open');
    const sp = document.getElementById('navHam')?.querySelectorAll('span') ?? [];
    sp[0] && (sp[0].style.transform = '');
    sp[1] && (sp[1].style.opacity   = '1');
    sp[2] && (sp[2].style.transform = '');
  };


  /* ═══════════════════════════════════════════════
     SMOOTH-SCROLL — all # links
     ═══════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ═══════════════════════════════════════════════
     MAGNETIC BUTTONS
     ═══════════════════════════════════════════════ */
  document.querySelectorAll('.mag').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r  = el.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) * 0.26;
      const dy = (e.clientY - r.top  - r.height / 2) * 0.26;
      el.style.transform = `translate(${dx}px,${dy}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });


  /* ═══════════════════════════════════════════════
     HERO PARALLAX (mouse)
     ═══════════════════════════════════════════════ */
  const heroEl    = document.getElementById('hero');
  const heroGlows = heroEl?.querySelectorAll('.hero-glow') ?? [];

  heroEl?.addEventListener('mousemove', e => {
    const r  = heroEl.getBoundingClientRect();
    const xf = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
    const yf = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    heroGlows.forEach((g, i) => {
      g.style.transform = `translate(${xf * (i + 1) * 16}px, ${yf * (i + 1) * 16}px)`;
    });
  });
  heroEl?.addEventListener('mouseleave', () => {
    heroGlows.forEach(g => { g.style.transform = ''; });
  });


  /* ═══════════════════════════════════════════════
     TESTIMONIALS SLIDER
     ═══════════════════════════════════════════════ */
  const tesTrack  = document.getElementById('tesTrack');
  const tesDots   = document.getElementById('tesDots');
  const tesSlides = tesTrack
    ? Array.from(tesTrack.querySelectorAll('.tes-slide'))
    : [];

  if (tesSlides.length) {
    let tesIdx = 0;

    tesSlides.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'tes-dot' + (i === 0 ? ' active' : '');
      d.onclick   = () => goTes(i);
      tesDots?.appendChild(d);
    });

    function goTes(i) {
      tesIdx = i;
      tesTrack.style.transform = `translateX(-${i * 100}%)`;
      document.querySelectorAll('.tes-dot').forEach((d, j) => {
        d.classList.toggle('active', j === i);
      });
    }

    document.getElementById('tesNext')?.addEventListener('click',
      () => goTes((tesIdx + 1) % tesSlides.length));
    document.getElementById('tesPrev')?.addEventListener('click',
      () => goTes((tesIdx - 1 + tesSlides.length) % tesSlides.length));

    setInterval(() => goTes((tesIdx + 1) % tesSlides.length), 5500);

    /* Touch swipe */
    let tsX = 0;
    tesTrack.addEventListener('touchstart', e => { tsX = e.touches[0].clientX; }, { passive: true });
    tesTrack.addEventListener('touchend',   e => {
      const delta = tsX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 40) {
        goTes(delta > 0
          ? (tesIdx + 1) % tesSlides.length
          : (tesIdx - 1 + tesSlides.length) % tesSlides.length);
      }
    });
  }


  /* ═══════════════════════════════════════════════
     SCROLL REVEAL (runs after loader hides)
     ═══════════════════════════════════════════════ */
  function _initReveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const delay = parseInt(
          e.target.style.getPropertyValue('--reveal-delay') || '0'
        );
        setTimeout(() => e.target.classList.add('visible'), delay);
        obs.unobserve(e.target);
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -44px 0px' });

    document.querySelectorAll('.reveal').forEach((el, i) => {
      if (!el.style.getPropertyValue('--reveal-delay'))
        el.style.setProperty('--reveal-delay', (i % 5) * 60 + 'ms');
      obs.observe(el);
    });
  }


  /* ═══════════════════════════════════════════════
     HERO PARTICLE CANVAS
     ═══════════════════════════════════════════════ */
  function _initParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COLORS = ['#F2BDC8', '#8B8FD4', '#85B4D4', '#9B9EC4', '#EDD5E0'];
    const pts = Array.from({ length: 54 }, () => ({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      r:  Math.random() * 2.2 + 0.7,
      c:  COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: (Math.random() - .5) * .30,
      vy: (Math.random() - .5) * .30,
      a:  Math.random() * .38 + .12,
    }));

    let pmx = -999, pmy = -999;
    document.addEventListener('mousemove', e => {
      pmx = e.clientX; pmy = e.clientY;
    }, { passive: true });

    (function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pts.forEach(p => {
        const dx = p.x - pmx, dy = p.y - pmy, d2 = dx * dx + dy * dy;
        if (d2 < 7000) {
          const d = Math.sqrt(d2), f = (84 - d) / 84 * .50;
          p.vx += dx / d * f; p.vy += dy / d * f;
        }
        p.vx *= .984; p.vy *= .984;
        p.x  += p.vx;  p.y  += p.vy;
        if (p.x < 0) p.x = canvas.width;  if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.save();
        ctx.globalAlpha = p.a;
        ctx.fillStyle   = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 80) {
            ctx.save();
            ctx.globalAlpha = (1 - d / 80) * .09;
            ctx.strokeStyle = '#8B8FD4';
            ctx.lineWidth   = .5;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      requestAnimationFrame(draw);
    })();
  }


  /* ═══════════════════════════════════════════════
     PAGE ENTRY TRANSITION
     Fade in on first load (not redirect)
     ═══════════════════════════════════════════════ */
  if (!sessionStorage.getItem('sc-from-redirect')) {
    document.body.style.opacity    = '0';
    document.body.style.transition = 'opacity 0.4s ease 0.1s';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.style.opacity = '1';
      });
    });
  }
  sessionStorage.removeItem('sc-from-redirect');

}); /* end DOMContentLoaded */
