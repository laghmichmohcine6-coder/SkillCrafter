/* ═══════════════════════════════════════════════════
   SKILLCRAFTERS — shared.js
   Auth system · Session management · Redirect logic
   ═══════════════════════════════════════════════════ */

'use strict';

/* ── Storage Keys ──────────────────────────────────── */
const SC_KEYS = {
  USERS:   'sc-users',
  SESSION: 'sc-session',
  UID:     'sc-uid',
  THEME:   'sc-theme',
};

/* ═══════════════════════════════════════════════
   USER STORE
   ═══════════════════════════════════════════════ */
const UserStore = {
  getAll() {
    try { return JSON.parse(localStorage.getItem(SC_KEYS.USERS) || '[]'); }
    catch { return []; }
  },
  save(users) {
    localStorage.setItem(SC_KEYS.USERS, JSON.stringify(users));
  },
  findByEmail(email) {
    return this.getAll().find(u => u.email.toLowerCase() === email.toLowerCase());
  },
  findById(id) {
    return this.getAll().find(u => u.id === id);
  },
  create({ firstName, lastName, email, password }) {
    const users = this.getAll();
    const user = {
      id:              'u' + Date.now() + Math.random().toString(36).slice(2, 6),
      firstName,
      lastName,
      email:           email.toLowerCase().trim(),
      password,
      displayName:     firstName + ' ' + lastName,
      avatar:          null,
      enrolledCourses: {},
      appliedJobs:     [],
      xp:              0,
      streak:          0,
      activity:        [],
      joinedAt:        new Date().toISOString(),
    };
    users.push(user);
    this.save(users);
    return user;
  },
  update(id, patch) {
    const users = this.getAll();
    const idx   = users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...patch };
    this.save(users);
    return users[idx];
  },
};

/* ═══════════════════════════════════════════════
   SESSION MANAGER
   ═══════════════════════════════════════════════ */
const Session = {
  create(userId) {
    const payload = {
      uid:       userId,
      startedAt: Date.now(),
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    };
    localStorage.setItem(SC_KEYS.SESSION, JSON.stringify(payload));
    localStorage.setItem(SC_KEYS.UID,     userId);
    return payload;
  },
  get() {
    try {
      const raw = localStorage.getItem(SC_KEYS.SESSION);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (Date.now() > s.expiresAt) { this.destroy(); return null; }
      return s;
    } catch { return null; }
  },
  getUser() {
    const s = this.get();
    if (!s) return null;
    return UserStore.findById(s.uid) || null;
  },
  isActive() {
    return !!this.get();
  },
  destroy() {
    localStorage.removeItem(SC_KEYS.SESSION);
    localStorage.removeItem(SC_KEYS.UID);
  },
};

/* ═══════════════════════════════════════════════
   REDIRECT LOGIC
   ═══════════════════════════════════════════════ */
(function routeGuard() {
  const page       = window.location.pathname.split('/').pop() || 'index.html';
  const loggedIn   = Session.isActive();
  const isDemoMode = sessionStorage.getItem('sc-demo') === '1';

  if (page === 'index.html' || page === '') {
    if (loggedIn) _redirectTo('dashboard.html');
  } else if (page === 'dashboard.html') {
    if (!loggedIn && !isDemoMode) _redirectTo('index.html');
  }
  /* courses.html intentionally has no guard — browsable when logged out */
})();

/* ═══════════════════════════════════════════════
   TRANSITION REDIRECT
   ═══════════════════════════════════════════════ */
function redirectWithTransition(targetUrl, message = 'Taking you in…') {
  if (window._redirecting) return;
  window._redirecting = true;

  const overlay = document.createElement('div');
  overlay.id = 'sc-redirect-overlay';
  overlay.innerHTML = `
    <div class="sco-inner">
      <svg class="sco-emblem" viewBox="0 0 72 72" fill="none">
        <path d="M36 5L63 20.5V51.5L36 67L9 51.5V20.5L36 5Z"
              stroke="url(#sco-g1)" stroke-width="1.1" fill="none"/>
        <path d="M36 15L57 26.5V47.5L36 59L15 47.5V26.5L36 15Z"
              stroke="url(#sco-g2)" stroke-width="0.7" fill="none" opacity="0.4"/>
        <circle cx="36" cy="36" r="8" stroke="url(#sco-g1)" stroke-width="1.1"/>
        <path d="M31.5 36l3.5 3.5 6-7" stroke="url(#sco-g1)"
              stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
        <defs>
          <linearGradient id="sco-g1" x1="9" y1="5" x2="63" y2="67" gradientUnits="userSpaceOnUse">
            <stop stop-color="#F2BDC8"/><stop offset="0.5" stop-color="#8B8FD4"/><stop offset="1" stop-color="#85B4D4"/>
          </linearGradient>
          <linearGradient id="sco-g2" x1="15" y1="15" x2="57" y2="59" gradientUnits="userSpaceOnUse">
            <stop stop-color="#85B4D4"/><stop offset="1" stop-color="#F2BDC8"/>
          </linearGradient>
        </defs>
      </svg>
      <p class="sco-msg">${message}</p>
      <div class="sco-track"><div class="sco-fill" id="scFill"></div></div>
    </div>`;

  if (!document.getElementById('sc-redirect-styles')) {
    const style = document.createElement('style');
    style.id = 'sc-redirect-styles';
    style.textContent = `
      #sc-redirect-overlay {
        position: fixed; inset: 0; z-index: 99999;
        display: flex; align-items: center; justify-content: center;
        background: var(--bg-base, #FAFAF9);
        opacity: 0; transition: opacity 0.35s ease;
      }
      #sc-redirect-overlay.sco-visible { opacity: 1; }
      .sco-inner {
        display: flex; flex-direction: column; align-items: center; gap: 18px;
        transform: translateY(12px); transition: transform 0.45s cubic-bezier(.22,1,.36,1);
      }
      #sc-redirect-overlay.sco-visible .sco-inner { transform: translateY(0); }
      .sco-emblem {
        width: 58px; height: 58px;
        animation: sco-spin 1.8s linear infinite;
        filter: drop-shadow(0 0 14px rgba(139,143,212,.35));
      }
      @keyframes sco-spin {
        0%   { transform: rotate(0deg) scale(1); }
        50%  { transform: rotate(180deg) scale(1.08); }
        100% { transform: rotate(360deg) scale(1); }
      }
      .sco-msg {
        font-family: 'Outfit', sans-serif; font-size: 13px; letter-spacing: .06em;
        color: var(--t-faint, #9A9A9A); text-transform: uppercase;
      }
      .sco-track {
        width: 160px; height: 2px; background: var(--border, rgba(0,0,0,.07));
        border-radius: 2px; overflow: hidden;
      }
      .sco-fill {
        height: 100%; width: 0%;
        background: linear-gradient(90deg, #F2BDC8, #8B8FD4, #85B4D4);
        border-radius: 2px; transition: width .08s linear;
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(overlay);
  requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('sco-visible')));

  const fill = overlay.querySelector('#scFill');
  let progress = 0;
  const tick = setInterval(() => {
    const step = progress < 70 ? (Math.random() * 12 + 5) : progress < 90 ? (Math.random() * 4 + 1) : 0.5;
    progress = Math.min(progress + step, 95);
    fill.style.width = progress + '%';
  }, 80);

  setTimeout(() => {
    clearInterval(tick);
    fill.style.transition = 'width 0.3s ease';
    fill.style.width = '100%';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.28s ease';
      document.body.style.opacity    = '0';
      setTimeout(() => { window.location.href = targetUrl; }, 300);
    }, 320);
  }, 900);
}

function _redirectTo(url) { window.location.replace(url); }

/* ═══════════════════════════════════════════════
   TOAST UTILITY
   ═══════════════════════════════════════════════ */
function showToast(msg, type = 'info', dur = 3200) {
  const SVG = {
    success: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5 6.5-7" stroke="#6DC97A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    error:   `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="#DC7777" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    info:    `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="url(#tIG)" stroke-width="1.2"/><path d="M7 6v4M7 5v.4" stroke="url(#tIG)" stroke-width="1.2" stroke-linecap="round"/><defs><linearGradient id="tIG" x1="1.5" y1="1.5" x2="12.5" y2="12.5" gradientUnits="userSpaceOnUse"><stop stop-color="#F2BDC8"/><stop offset="1" stop-color="#8B8FD4"/></linearGradient></defs></svg>`,
  };
  let area = document.getElementById('toast-area');
  if (!area) { area = document.createElement('div'); area.id = 'toast-area'; document.body.appendChild(area); }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `${SVG[type] || SVG.info}<span>${msg}</span>`;
  area.appendChild(t);
  setTimeout(() => { t.classList.add('leaving'); setTimeout(() => t.remove(), 320); }, dur);
}

/* ═══════════════════════════════════════════════
   AUTH ACTIONS
   ═══════════════════════════════════════════════ */
const Auth = {
  signIn(email, password) {
    if (!email || !password) { showToast('Both fields are required', 'error'); return false; }
    const user = UserStore.findByEmail(email);
    if (!user || user.password !== password) { showToast('Incorrect email or password', 'error'); return false; }
    Session.create(user.id);
    showToast(`Welcome back, ${user.firstName}!`, 'success');
    setTimeout(() => redirectWithTransition('dashboard.html', 'Entering your dashboard…'), 480);
    return true;
  },
  signUp(firstName, lastName, email, password) {
    if (!firstName || !lastName || !email || !password) { showToast('Please complete all fields', 'error'); return false; }
    if (password.length < 6) { showToast('Password must be at least 6 characters', 'error'); return false; }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) { showToast('Please enter a valid email address', 'error'); return false; }
    if (UserStore.findByEmail(email)) { showToast('An account with that email already exists', 'error'); return false; }
    const user = UserStore.create({ firstName, lastName, email, password });
    Session.create(user.id);
    showToast(`Welcome, ${user.firstName}! Your account is ready.`, 'success');
    setTimeout(() => redirectWithTransition('dashboard.html', 'Setting up your workspace…'), 480);
    return true;
  },
  signOut() {
    Session.destroy();
    sessionStorage.removeItem('sc-demo');
    redirectWithTransition('index.html', 'Signing you out…');
  },
};

/* ── Expose globals ─────────────────────────── */
window.SC        = { UserStore, Session, Auth };
window.showToast = showToast;
window.redirectWithTransition = redirectWithTransition;

/* ═══════════════════════════════════════════════
   SHARED AUTH MODAL HELPERS
   Used on courses.html (shared.js IS loaded there)
   ═══════════════════════════════════════════════ */
window.openAuth = function(tab = 'in') {
  window.switchAuthTab && window.switchAuthTab(tab);
  document.getElementById('authModal')?.classList.add('open');
};
window.closeAuth = function() {
  document.getElementById('authModal')?.classList.remove('open');
};
window.switchAuthTab = function(mode) {
  document.getElementById('tabSignIn')?.classList.toggle('active', mode === 'in');
  document.getElementById('tabSignUp')?.classList.toggle('active', mode === 'up');
  document.getElementById('panelIn')?.classList.toggle('hidden', mode !== 'in');
  document.getElementById('panelUp')?.classList.toggle('hidden', mode !== 'up');
};
window.doSignIn = function() {
  const em = document.getElementById('inEmail')?.value.trim() || '';
  const pw = document.getElementById('inPass')?.value || '';
  Auth.signIn(em, pw);
};
window.doSignUp = function() {
  const fn = document.getElementById('upFirst')?.value.trim() || '';
  const ln = document.getElementById('upLast')?.value.trim()  || '';
  const em = document.getElementById('upEmail')?.value.trim() || '';
  const pw = document.getElementById('upPass')?.value         || '';
  Auth.signUp(fn, ln, em, pw);
};
window.enterDemoMode = function() {
  sessionStorage.setItem('sc-demo', '1');
  redirectWithTransition('dashboard.html', 'Loading demo dashboard…');
};
