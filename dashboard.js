/* ═══════════════════════════════════════════════════
   SKILLCRAFTERS — dashboard.js
   Dashboard data · Rendering · Interactions
   ═══════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════════
   DATA CATALOGUE
   ══════════════════════════════════════════════════ */

const ALL_COURSES = [
  { id: 'c1', name: 'English for Professionals',  cat: 'Languages',   modules: 12, color: '#F2BDC8', instructor: 'Dr. Sarah Miles',
    svgIcon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 5h16M3 9h10M3 13h13M3 17h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>` },
  { id: 'c2', name: 'Full-Stack Development',      cat: 'Programming', modules: 28, color: '#8B8FD4', instructor: 'Alex Chen',
    svgIcon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M6 8l-4 3 4 3M16 8l4 3-4 3M13 5l-4 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  { id: 'c3', name: 'Social Media Marketing',      cat: 'Marketing',   modules: 18, color: '#85B4D4', instructor: 'Nadia Hassan',
    svgIcon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="5" cy="11" r="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="5" r="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="17" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M7.5 10L14.5 6.5M7.5 12L14.5 15.5" stroke="currentColor" stroke-width="1.4"/></svg>` },
  { id: 'c4', name: 'UI/UX Design Mastery',        cat: 'Design',      modules: 22, color: '#9B9EC4', instructor: 'Marcus Lee',
    svgIcon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="12" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="12" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="12" y="12" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>` },
  { id: 'c5', name: 'Python & Data Analytics',     cat: 'Data',        modules: 20, color: '#F2BDC8', instructor: 'Yuki Tanaka',
    svgIcon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 16l4-5 4 3 4-6 4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  { id: 'c6', name: 'Content Creation Pro',        cat: 'Content',     modules: 14, color: '#D8DAF5', instructor: 'Amara Diallo',
    svgIcon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M15 4l3 3L7 18H4v-3L15 4z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
];

const ALL_JOBS = [
  { id: 'j1', title: 'UI/UX Designer',       company: 'TechStart Agency', type: 'Remote',    salary: '$1,200-$1,800/mo',
    svgIcon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="11" y="2" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="2" y="11" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="11" y="11" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/></svg>` },
  { id: 'j2', title: 'Junior Developer',      company: 'Nova Digital',     type: 'Hybrid',    salary: '$800-$1,200/mo',
    svgIcon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 7l-3 2 3 2M13 7l3 2-3 2M11 4l-4 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  { id: 'j3', title: 'Content Strategist',    company: 'Bloom Brand Co.',  type: 'Freelance', salary: '$15-$25/hr',
    svgIcon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 4h12M3 8h8M3 12h10M3 15h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>` },
  { id: 'j4', title: 'Data Analyst',          company: 'Insights Hub',     type: 'Remote',    salary: '$1,000-$1,500/mo',
    svgIcon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 13l4-5 3 3 4-6 3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  { id: 'j5', title: 'Social Media Manager',  company: 'BrandWave',        type: 'Part-time', salary: '$600-$900/mo',
    svgIcon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="4" cy="9" r="2" stroke="currentColor" stroke-width="1.4"/><circle cx="14" cy="4" r="2" stroke="currentColor" stroke-width="1.4"/><circle cx="14" cy="14" r="2" stroke="currentColor" stroke-width="1.4"/><path d="M6 8.5L12 5.5M6 9.5L12 12.5" stroke="currentColor" stroke-width="1.3"/></svg>` },
];

const ALL_BADGES = [
  { id: 'b1', name: 'First Step',    desc: 'Enrolled in your first course',  xpRequired: 0,
    svgIcon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2l2.3 6.4H20l-5.4 4 2 6.4L11 15l-5.6 3.8 2-6.4L2 8.4h6.7L11 2z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>` },
  { id: 'b2', name: 'Early Bird',    desc: 'Logged in 3 days in a row',      xpRequired: 50,
    svgIcon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M11 2v2M11 18v2M2 11h2M18 11h2M4.9 4.9l1.4 1.4M15.7 15.7l1.4 1.4M4.9 17.1l1.4-1.4M15.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>` },
  { id: 'b3', name: 'Code Curious',  desc: 'Started a Programming course',   xpRequired: 100,
    svgIcon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M7 9l-4 2 4 2M15 9l4 2-4 2M14 5l-6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  { id: 'b4', name: 'Word Crafter',  desc: 'Completed a Languages module',   xpRequired: 150,
    svgIcon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 6h14M4 10h9M4 14h11M4 18h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>` },
  { id: 'b5', name: 'Pixel Perfect', desc: 'Enrolled in a Design course',    xpRequired: 200,
    svgIcon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M11 3v3M11 16v3M3 11h3M16 11h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>` },
  { id: 'b6', name: 'Data Wizard',   desc: 'Started a Data course',          xpRequired: 300,
    svgIcon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 17l4-6 4 4 4-8 4 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  { id: 'b7', name: 'Career Seeker', desc: 'Applied to your first job',      xpRequired: 400,
    svgIcon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="7" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M7 7V5.5A2.5 2.5 0 019.5 3h3A2.5 2.5 0 0115 5.5V7" stroke="currentColor" stroke-width="1.5"/><path d="M3 12h16" stroke="currentColor" stroke-width="1.3"/></svg>` },
  { id: 'b8', name: 'Consistent',    desc: '7-day learning streak',          xpRequired: 500,
    svgIcon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3c0 4-4 6-4 10a4 4 0 008 0c0-4-4-6-4-10z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 17c0-2 2-3 2-5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>` },
];

/* ══════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  const isDemoMode = sessionStorage.getItem('sc-demo') === '1';
  let user = window.SC && window.SC.Session.getUser();

  if (!user) {
    if (isDemoMode) {
      user = _createDemoUser();
    } else {
      window.location.replace('index.html');
      return;
    }
  }

  /* ── Theme ── */
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('sc-theme');
  if (savedTheme) html.setAttribute('data-theme', savedTheme);
  _syncThemeLabel();

  window.toggleThemeDb = function () {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('sc-theme', next);
    _syncThemeLabel();
  };

  function _syncThemeLabel() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    const lbl = document.getElementById('sbThemeLabel');
    if (lbl) lbl.textContent = isDark ? 'Dark mode' : 'Light mode';
  }

  /* ── Page entry fade ── */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.38s ease';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  }));

  /* ── Seed & render ── */
  _seedUserData(user);

  /* ── Diagnostic: verify email source ── */
  console.log('[SkillCrafters] User email loaded from:', isDemoMode ? 'Demo user (localStorage)' : 'Session (localStorage sc-session)');
  console.log('[SkillCrafters] Email value:', user.email);

  renderAll(user);

  /* ── Mobile nav touch binding (must run after renderAll so DOM is ready) ── */
  _initMobileNav();

  /* ── Search ── */
  const searchInput = document.querySelector('.db-search input');
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', function (e) {
      clearTimeout(searchTimeout);
      const q = e.target.value.trim().toLowerCase();
      if (q.length < 2) return;
      searchTimeout = setTimeout(function () {
        const match = ALL_COURSES.find(function (c) {
          return c.name.toLowerCase().includes(q) || c.cat.toLowerCase().includes(q);
        });
        if (match) {
          showSection('courses');
          showToast('Searching courses for "' + q + '"', 'info');
        }
      }, 300);
    });
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') e.target.value = '';
    });
  }

  /* ── Record session ── */
  _recordActivity(user, 'session', 'Opened dashboard', 5);
});

/* ══════════════════════════════════════════════════
   DEMO USER
   ══════════════════════════════════════════════════ */

function _createDemoUser() {
  var DEMO_ID = 'demo-user-001';
  if (window.SC && window.SC.UserStore) {
    var existing = window.SC.UserStore.findById(DEMO_ID);
    if (existing) {
      window.SC.Session.create(DEMO_ID);
      return existing;
    }
  }
  var user = {
    id:              DEMO_ID,
    firstName:       'Mohcine',
    lastName:        'Lag',
    email:           'Mohcine@skillcrafters.io',
    password:        'Mohcine123',
    displayName:     'Mohcine Lag',
    avatar:          null,
    enrolledCourses: {
      c1: { progress: 33, startedAt: new Date().toISOString(), status: 'active', completedModules: 4 },
      c2: { progress: 10, startedAt: new Date().toISOString(), status: 'active', completedModules: 3 },
    },
    appliedJobs: [
      { id: 'j1', status: 'reviewing', appliedAt: new Date().toISOString() },
    ],
    xp:      240,
    streak:  5,
    activity: [
      { type: 'badge',  text: 'Unlocked the <strong>Early Bird</strong> badge', xp: '+50 XP', time: '2h ago',  ts: Date.now() - 7200000 },
      { type: 'course', text: 'Started <strong>Full-Stack Development</strong>', xp: '+20 XP', time: '1d ago', ts: Date.now() - 86400000 },
      { type: 'job',    text: 'Applied to <strong>UI/UX Designer</strong> at TechStart Agency', xp: '+30 XP', time: '1d ago', ts: Date.now() - 90000000 },
      { type: 'xp',     text: 'Account created - <strong>Welcome bonus!</strong>', xp: '+50 XP', time: '2d ago', ts: Date.now() - 172800000 },
    ],
    joinedAt: new Date().toISOString(),
  };
  if (window.SC && window.SC.UserStore) {
    var all = window.SC.UserStore.getAll();
    var idx = all.findIndex(function (u) { return u.id === DEMO_ID; });
    if (idx === -1) all.push(user);
    else all[idx] = user;
    localStorage.setItem('sc-users', JSON.stringify(all));
    window.SC.Session.create(DEMO_ID);
  }
  return user;
}

/* ══════════════════════════════════════════════════
   SEED DEFAULT DATA
   ══════════════════════════════════════════════════ */

function _seedUserData(user) {
  var updated = false;
  if (!user.enrolledCourses || Object.keys(user.enrolledCourses).length === 0) {
    user.enrolledCourses = {
      c1: { progress: 33, startedAt: new Date().toISOString(), status: 'active', completedModules: 4 },
    };
    updated = true;
  }
  if (!user.xp || user.xp === 0) { user.xp = 120; updated = true; }
  if (typeof user.streak !== 'number') { user.streak = 3; updated = true; }
  if (!user.activity || user.activity.length === 0) {
    var course = ALL_COURSES.find(function (c) { return c.id === 'c1'; });
    user.activity = [
      { type: 'badge',  text: 'Unlocked the <strong>First Step</strong> badge', xp: '+50 XP', time: '1d ago', ts: Date.now() - 86400000 },
      { type: 'course', text: 'Started <strong>' + course.name + '</strong>',   xp: '+20 XP', time: '1d ago', ts: Date.now() - 90000000 },
      { type: 'xp',     text: 'Account created - <strong>Welcome bonus!</strong>',xp:'+50 XP',time: '1d ago', ts: Date.now() - 95000000 },
    ];
    updated = true;
  }
  if (updated && window.SC && window.SC.UserStore) {
    window.SC.UserStore.update(user.id, {
      enrolledCourses: user.enrolledCourses,
      xp:              user.xp,
      streak:          user.streak,
      activity:        user.activity,
    });
  }
}

/* ══════════════════════════════════════════════════
   RENDER ALL
   ══════════════════════════════════════════════════ */

function renderAll(user) {
  renderSidebar(user);
  renderWelcomeStrip(user);
  renderOverviewCourses(user);
  renderStreakCard(user);
  renderXPRing(user);
  renderOverviewActivity(user);
  renderOverviewJobs(user);
  renderRecommended(user);
  renderFullCourses(user);
  renderFullJobs(user);
  renderBadges(user);
  renderActivity(user);
}

/* ══════════════════════════════════════════════════
   RENDER: SIDEBAR
   ══════════════════════════════════════════════════ */

function renderSidebar(user) {
  var initials = _initials(user);
  var level    = _calcLevel(user.xp);
  var xpPct    = _xpPercent(user.xp);

  document.querySelectorAll('#sbAvatar, #topbarAvatar').forEach(function (el) {
    el.textContent = initials;
  });
  _setText('sbUserName', user.firstName + ' ' + user.lastName);
  _setText('sbLevel', level);

  var cap = level * 500;
  _setText('sbXpText', user.xp + ' / ' + cap);

  var xpFill = document.getElementById('sbXpFill');
  if (xpFill) setTimeout(function () { xpFill.style.width = xpPct + '%'; }, 300);

  var enrolled = Object.keys(user.enrolledCourses || {}).length;
  var applied  = (user.appliedJobs || []).length;
  _setText('sbCourseBadge', enrolled);
  _setText('sbJobBadge',    applied);
}

/* ══════════════════════════════════════════════════
   RENDER: WELCOME STRIP
   ══════════════════════════════════════════════════ */

function renderWelcomeStrip(user) {
  _setText('welcomeName', user.firstName);
  var hour     = new Date().getHours();
  var greeting = hour < 12 ? 'Ready for your morning session?'
               : hour < 17 ? 'Keep the momentum going today.'
                            : 'A great evening to learn something new.';
  _setText('welcomeSub', greeting);
  var enrolled = Object.keys(user.enrolledCourses || {}).length;
  var badges   = _earnedBadges(user).length;
  _setText('statCourses', enrolled);
  _setText('statXP',      user.xp);
  _setText('statBadges',  badges);
}

/* ══════════════════════════════════════════════════
   RENDER: OVERVIEW COURSES
   ══════════════════════════════════════════════════ */

function renderOverviewCourses(user) {
  var container = document.getElementById('overviewCoursesList');
  if (!container) return;
  var enrolled = user.enrolledCourses || {};
  var ids = Object.keys(enrolled).slice(0, 2);

  if (ids.length === 0) {
    container.innerHTML = _emptyState('No courses yet', 'Explore the catalogue and enrol today.', "showSection('courses')");
    return;
  }

  container.innerHTML = ids.map(function (id) {
    var course = ALL_COURSES.find(function (c) { return c.id === id; });
    if (!course) return '';
    return '<div style="margin-bottom:18px">' + _courseCardHTML(course, enrolled[id]) + '</div>';
  }).join('');
}

/* ══════════════════════════════════════════════════
   RENDER: STREAK
   ══════════════════════════════════════════════════ */

function renderStreakCard(user) {
  var streak   = user.streak || 0;
  var streakEl = document.getElementById('streakNum');
  if (streakEl) streakEl.textContent = streak + (streak === 1 ? ' day' : ' days');

  var days     = ['M','T','W','T','F','S','S'];
  var today    = new Date().getDay();
  var todayIdx = (today + 6) % 7;
  var container = document.getElementById('streakDays');
  if (!container) return;

  container.innerHTML = days.map(function (d, i) {
    var done    = i < Math.min(streak, todayIdx);
    var isToday = i === todayIdx;
    return '<div class="dbc-day-dot ' + (done ? 'done' : '') + ' ' + (isToday ? 'today' : '') + '">' +
      '<div class="dbc-day-dot-circle">' +
        (done
          ? '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5 5.5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
          : isToday
          ? '<div style="width:5px;height:5px;border-radius:50%;background:var(--c-purple)"></div>'
          : '') +
      '</div>' +
      '<div class="dbc-day-label">' + d + '</div>' +
    '</div>';
  }).join('');
}

/* ══════════════════════════════════════════════════
   RENDER: XP RING
   ══════════════════════════════════════════════════ */

function renderXPRing(user) {
  var level         = _calcLevel(user.xp);
  var pct           = _xpPercent(user.xp) / 100;
  var circumference = 2 * Math.PI * 30;
  var dashOffset    = circumference * (1 - pct);

  function applyRing(fillId, numId, levelLabelId, nextLabelId) {
    var fill = document.getElementById(fillId);
    if (fill) setTimeout(function () { fill.style.strokeDashoffset = dashOffset; }, 400);
    _setText(numId, user.xp);
    _setText(levelLabelId, 'Level ' + level);
    var need = level * 500 - user.xp;
    var el   = document.getElementById(nextLabelId);
    if (el) el.innerHTML = 'Earn <strong>' + need + ' XP</strong> to reach Level ' + (level + 1) + '.<br>Keep going!';
  }

  applyRing('xpRingFill',  'xpRingNum',  'xpLevelLabel',  'xpNextLabel');
  applyRing('xpRingFill2', 'xpRingNum2', 'xpLevelLabel2', 'xpNextLabel2');
}

/* ══════════════════════════════════════════════════
   RENDER: OVERVIEW ACTIVITY
   ══════════════════════════════════════════════════ */

function renderOverviewActivity(user) {
  var el = document.getElementById('overviewActivityList');
  if (!el) return;
  var items = (user.activity || []).slice(0, 4);
  if (!items.length) {
    el.innerHTML = _emptyState('No activity yet', 'Start a course to see your progress here.');
    return;
  }
  el.innerHTML = items.map(_activityItemHTML).join('');
}

/* ══════════════════════════════════════════════════
   RENDER: OVERVIEW JOBS
   ══════════════════════════════════════════════════ */

function renderOverviewJobs(user) {
  var el = document.getElementById('overviewJobsList');
  if (!el) return;
  var applied = user.appliedJobs || [];
  if (!applied.length) {
    el.innerHTML = _emptyState('No applications yet', 'Browse job listings and apply to get started.', "showSection('jobs')");
    return;
  }
  var list = document.createElement('div');
  list.className = 'dbc-job-list';
  list.innerHTML = applied.slice(0, 3).map(function (jid) {
    var job = ALL_JOBS.find(function (j) { return j.id === jid.id; });
    if (!job) return '';
    return _jobItemHTML(job, jid.status);
  }).join('');
  el.innerHTML = '';
  el.appendChild(list);
}

/* ══════════════════════════════════════════════════
   RENDER: RECOMMENDED
   ══════════════════════════════════════════════════ */

function renderRecommended(user) {
  _renderEnrolList('recommendedList', user, 3);
}

/* ══════════════════════════════════════════════════
   RENDER: FULL COURSES
   ══════════════════════════════════════════════════ */

function renderFullCourses(user) {
  var enrolled = user.enrolledCourses || {};
  var ids      = Object.keys(enrolled);
  var el       = document.getElementById('fullCoursesList');

  if (el) {
    if (!ids.length) {
      el.innerHTML = '<div class="db-card" style="grid-column:1/-1">' + _emptyState('No courses enrolled yet', 'Use the catalogue below to find your first course.') + '</div>';
    } else {
      el.innerHTML = ids.map(function (id, i) {
        var course = ALL_COURSES.find(function (c) { return c.id === id; });
        if (!course) return '';
        return '<div class="db-card dbc-course" style="animation-delay:' + (i * .08) + 's">' + _courseCardHTML(course, enrolled[id]) + '</div>';
      }).join('');
    }
  }
  _renderEnrolList('fullEnrolList', user, 6);
}

/* ══════════════════════════════════════════════════
   RENDER: FULL JOBS
   ══════════════════════════════════════════════════ */

function renderFullJobs(user) {
  var el = document.getElementById('fullJobsList');
  if (!el) return;
  el.innerHTML = ALL_JOBS.map(function (job, i) {
    var appliedEntry = (user.appliedJobs || []).find(function (j) { return j.id === job.id; });
    var isApplied    = !!appliedEntry;
    return '<div class="db-card" style="animation-delay:' + (i * .08) + 's">' +
      '<div class="db-section-head" style="margin-bottom:14px">' +
        '<div class="dbc-job-logo" style="width:42px;height:42px;border-radius:12px;background:var(--g-brand);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff">' +
          job.svgIcon +
        '</div>' +
        (isApplied ? '<span class="dbc-job-status ' + _jobStatusClass(appliedEntry.status) + '">' + _jobStatusLabel(appliedEntry.status) + '</span>' : '') +
      '</div>' +
      '<div style="font-family:var(--db-f-head);font-size:15px;font-weight:700;margin-bottom:5px">' + job.title + '</div>' +
      '<div style="font-size:13px;color:var(--t-muted);margin-bottom:14px"><strong>' + job.company + '</strong> &middot; ' + job.type + '</div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">' +
        '<span style="font-size:11px;background:var(--db-accent-b);color:var(--c-purple);padding:3px 10px;border-radius:99px;font-weight:600">' + job.type + '</span>' +
        '<span style="font-size:11px;background:var(--db-surface-2);color:var(--t-muted);padding:3px 10px;border-radius:99px;border:1px solid var(--db-border)">' + job.salary + '</span>' +
      '</div>' +
      '<button class="btn-continue" id="applyBtn-' + job.id + '"' +
        (isApplied ? ' style="background:rgba(109,201,122,.15);color:#4DA85E;box-shadow:none;background-image:none;animation:none;"' : '') +
        ' onclick="applyJob(\'' + job.id + '\',\'' + job.title.replace(/'/g, "\\'") + '\',\'' + job.company.replace(/'/g, "\\'") + '\')">' +
        (isApplied
          ? '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5 5.5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg> Applied'
          : 'Apply Now <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>') +
      '</button>' +
    '</div>';
  }).join('');
}

/* ══════════════════════════════════════════════════
   RENDER: BADGES
   ══════════════════════════════════════════════════ */

function renderBadges(user) {
  var earned = _earnedBadges(user);
  var el = document.getElementById('fullBadgesList');
  if (!el) return;
  el.innerHTML = ALL_BADGES.map(function (b) {
    var isEarned = earned.some(function (e) { return e.id === b.id; });
    return '<div class="dbc-badge ' + (isEarned ? 'earned' : 'locked') + '" title="' + b.desc + (isEarned ? '' : ' - Locked') + '">' +
      '<div class="dbc-badge-ico" style="color:' + (isEarned ? 'var(--c-purple)' : 'var(--t-faint)') + '">' + b.svgIcon + '</div>' +
      '<div class="dbc-badge-name">' + b.name + '</div>' +
      (!isEarned ? '<div style="font-size:9.5px;color:var(--t-faint);margin-top:1px">' + b.xpRequired + ' XP</div>' : '') +
    '</div>';
  }).join('');
}

/* ══════════════════════════════════════════════════
   RENDER: FULL ACTIVITY
   ══════════════════════════════════════════════════ */

function renderActivity(user) {
  var el = document.getElementById('fullActivityList');
  if (!el) return;
  var items = user.activity || [];
  if (!items.length) {
    el.innerHTML = _emptyState('No activity recorded', 'Start learning to see your history here.');
    return;
  }
  el.innerHTML = items.map(_activityItemHTML).join('');
}

/* ══════════════════════════════════════════════════
   ACTIONS
   ══════════════════════════════════════════════════ */

window.enrolCourse = function (courseId, courseName) {
  var user = _getUser();
  if (!user) return;
  var enrolled = Object.assign({}, user.enrolledCourses || {});
  if (enrolled[courseId]) { showToast('Already enrolled in ' + courseName, 'info'); return; }
  enrolled[courseId] = { progress: 0, startedAt: new Date().toISOString(), status: 'active', completedModules: 0 };
  var newXp    = (user.xp || 0) + 20;
  var activity = [{ type: 'course', text: 'Enrolled in <strong>' + courseName + '</strong>', xp: '+20 XP', time: 'Just now', ts: Date.now() }].concat(user.activity || []);
  _updateUser(user.id, { enrolledCourses: enrolled, xp: newXp, activity: activity });
  showToast('Enrolled in ' + courseName + '!', 'success');
  _refreshDashboard();
};

window.continueCourse = function (courseId, courseName) {
  var user = _getUser();
  if (!user) return;
  var enrolled = Object.assign({}, user.enrolledCourses || {});
  if (!enrolled[courseId]) return;
  var course  = ALL_COURSES.find(function (c) { return c.id === courseId; });
  var maxMods = course ? course.modules : 10;
  var prev    = enrolled[courseId].completedModules || 0;
  var newMods = Math.min(prev + 1, maxMods);
  var newPct  = Math.round((newMods / maxMods) * 100);
  enrolled[courseId] = Object.assign({}, enrolled[courseId], { progress: newPct, completedModules: newMods });
  var newXp    = (user.xp || 0) + 15;
  var activity = [{ type: 'course', text: 'Completed a module in <strong>' + courseName + '</strong>', xp: '+15 XP', time: 'Just now', ts: Date.now() }].concat(user.activity || []);
  _updateUser(user.id, { enrolledCourses: enrolled, xp: newXp, activity: activity });
  if (newPct >= 100) showToast(courseName + ' completed!', 'success', 4000);
  else               showToast('+15 XP - Module complete!', 'success');
  _refreshDashboard();
};

window.applyJob = function (jobId, title, company) {
  var user = _getUser();
  if (!user) return;
  var applied = (user.appliedJobs || []).slice();
  if (applied.find(function (j) { return j.id === jobId; })) { showToast('Already applied to ' + title, 'info'); return; }
  applied.push({ id: jobId, status: 'reviewing', appliedAt: new Date().toISOString() });
  var newXp    = (user.xp || 0) + 30;
  var activity = [{ type: 'job', text: 'Applied to <strong>' + title + '</strong> at ' + company, xp: '+30 XP', time: 'Just now', ts: Date.now() }].concat(user.activity || []);
  _updateUser(user.id, { appliedJobs: applied, xp: newXp, activity: activity });
  showToast('Application sent to ' + company + '!', 'success');
  _refreshDashboard();
};

/* ══════════════════════════════════════════════════
   SECTION NAVIGATION
   ══════════════════════════════════════════════════ */

var SECTIONS       = ['overview', 'courses', 'jobs', 'badges', 'activity', 'profile'];
var SECTION_LABELS = { overview: 'Overview', courses: 'My Courses', jobs: 'Opportunities', badges: 'Badges', activity: 'Activity Log', profile: 'Profile' };

window.showSection = function (name) {
  /* 1. Show target section, hide all others */
  SECTIONS.forEach(function (s) {
    var sec = document.getElementById('sec-' + s);
    if (sec) sec.style.display = s === name ? '' : 'none';
  });

  /* 2. Update active state on nav items */
  document.querySelectorAll('.sb-nav-item').forEach(function (item) {
    var sec = item.getAttribute('data-section') || '';
    if (!sec) {
      var m = (item.getAttribute('onclick') || '').match(/showSection\(['"]([^'"]+)['"]\)/);
      sec = m ? m[1] : '';
    }
    item.classList.toggle('active', sec === name);
  });

  /* 3. Update topbar title */
  _setText('topbarTitle', SECTION_LABELS[name] || name);

  /* 4. Scroll main content to top */
  var main = document.getElementById('dbMain');
  if (main) main.scrollTop = 0;

  /* 5. CRITICAL: close sidebar AFTER a brief delay.
        Calling closeSidebar() synchronously inside a touch handler mutates
        the DOM (removes .open / .visible classes, triggers CSS transitions)
        before the touchend event fully resolves. Mobile browsers (iOS Safari,
        Android Chrome) interpret this DOM change as the touch target
        disappearing and silently cancel the click — making every nav tap
        appear to do nothing. The 60ms delay lets the event chain complete. */
  setTimeout(function () { closeSidebar(); }, 60);

  /* 6. Populate profile section on demand */
  if (name === 'profile') {
    var u = window.SC && window.SC.Session.getUser();
    if (!u) return;
    var initials = (u.firstName || '?')[0].toUpperCase() + (u.lastName || '?')[0].toUpperCase();
    var fullName = (u.firstName || '') + ' ' + (u.lastName || '');
    var level    = Math.floor((u.xp || 0) / 500) + 1;
    var courses  = Object.keys(u.enrolledCourses || {}).length;
    var badges   = (u.earnedBadges || []).length;
    var streak   = u.streak || 0;
    var elById = function (id) { return document.getElementById(id); };
    ['profileAvatar', 'profileFullName'].forEach(function (id) {
      var node = elById(id);
      if (!node) return;
      if (id === 'profileAvatar')   node.textContent = initials;
      if (id === 'profileFullName') node.textContent = fullName.trim() || 'Learner';
    });
    if (elById('profileEmail'))       elById('profileEmail').textContent       = u.email || '—';
    if (elById('profileNameField'))   elById('profileNameField').textContent   = fullName.trim() || '—';
    if (elById('profileEmailField'))  elById('profileEmailField').textContent  = u.email || '—';
    if (elById('profileLevel'))       elById('profileLevel').textContent       = 'Level ' + level;
    if (elById('profileXP'))          elById('profileXP').textContent          = (u.xp || 0) + ' XP';
    if (elById('profileStatCourses')) elById('profileStatCourses').textContent = courses;
    if (elById('profileStatXP'))      elById('profileStatXP').textContent      = u.xp || 0;
    if (elById('profileStatBadges'))  elById('profileStatBadges').textContent  = badges;
    if (elById('profileStatStreak'))  elById('profileStatStreak').textContent  = streak;
  }
};

window.openSidebar = function () {
  var sb = document.getElementById('dbSidebar');
  var ov = document.getElementById('sbOverlay');
  if (sb) sb.classList.add('open');
  if (ov) ov.classList.add('visible');
  /* Prevent background scroll while sidebar is open on mobile */
  document.body.style.overflow = 'hidden';
};

window.closeSidebar = function () {
  var sb = document.getElementById('dbSidebar');
  var ov = document.getElementById('sbOverlay');
  if (sb) sb.classList.remove('open');
  if (ov) ov.classList.remove('visible');
  document.body.style.overflow = '';
};

/* ─────────────────────────────────────────────────────────────
   MOBILE NAV BINDING
   ─────────────────────────────────────────────────────────────
   Why we can't rely solely on inline onclick + href="#":

   1. href="#" fires the browser's hash-navigation on mobile BEFORE onclick,
      causing a scroll-to-top that interrupts the touch sequence.

   2. return false in an inline onclick string does NOT reliably prevent
      default on all mobile browsers — it only works if the handler is a
      function that returns false, not an expression in an attribute.

   3. When showSection() mutates the DOM synchronously (hiding/showing
      sections, removing .active), mobile WebKit cancels any pending click
      event on elements that move or change during the touch — so even if
      onclick fires, the section switch appears to not happen.

   Solution: addEventListener with touchend (fires immediately on finger
   lift, before the 300ms click delay) + click (desktop fallback).
   touchend calls preventDefault() to stop href="#" from running.
   A _touchHandled flag prevents double-fire when both events occur.
   ───────────────────────────────────────────────────────────── */
function _initMobileNav() {
  document.querySelectorAll('.sb-nav-item').forEach(function (item) {
    /* Stamp data-section for reliable matching (avoids fragile onclick parsing) */
    if (!item.getAttribute('data-section')) {
      var m = (item.getAttribute('onclick') || '').match(/showSection\(['"]([^'"]+)['"]\)/);
      if (m) item.setAttribute('data-section', m[1]);
    }

    function _activate(e) {
      var section = item.getAttribute('data-section');
      if (!section) return;

      /* Prevent href="#" from triggering hash navigation / scroll */
      e.preventDefault();
      e.stopPropagation();

      /* Double-fire guard: touchend sets flag, click checks it */
      if (e.type === 'touchend') {
        item._navTouchFired = true;
        clearTimeout(item._navTouchTimer);
        item._navTouchTimer = setTimeout(function () {
          item._navTouchFired = false;
        }, 600);
      } else if (e.type === 'click' && item._navTouchFired) {
        item._navTouchFired = false;
        return;
      }

      showSection(section);
    }

    item.addEventListener('touchend', _activate, { passive: false });
    item.addEventListener('click',    _activate);
  });

  /* Overlay: close on tap */
  var overlay = document.getElementById('sbOverlay');
  if (overlay) {
    overlay.addEventListener('touchend', function (e) {
      e.preventDefault();
      closeSidebar();
    }, { passive: false });
  }

  /* Escape key to close sidebar */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSidebar();
  });
}

/* ══════════════════════════════════════════════════
   HTML BUILDERS
   ══════════════════════════════════════════════════ */

function _courseCardHTML(course, data) {
  var pct   = data.progress || 0;
  var mods  = data.completedModules || 0;
  var left  = course.modules - mods;
  var status = pct >= 100 ? 'complete' : (data.status === 'active' ? 'active' : 'paused');
  var statusLabel = pct >= 100 ? 'Complete' : (status === 'active' ? 'In progress' : 'Paused');
  var checkSvg = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5 5.5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var arrowSvg = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  return '<div style="display:flex;flex-direction:column;gap:14px">' +
    '<div class="dbc-course-header">' +
      '<div class="dbc-course-thumb" style="background:linear-gradient(135deg,' + course.color + '88,' + course.color + ');color:#fff">' +
        course.svgIcon +
      '</div>' +
      '<div class="dbc-course-meta">' +
        '<div class="dbc-course-cat">' + course.cat + '</div>' +
        '<div class="dbc-course-name">' + course.name + '</div>' +
        '<div class="dbc-course-instructor">' + course.instructor + '</div>' +
      '</div>' +
      '<span class="dbc-status-pill ' + status + '">' + statusLabel + '</span>' +
    '</div>' +
    '<div class="dbc-progress">' +
      '<div class="dbc-progress-row">' +
        '<span>' + mods + ' of ' + course.modules + ' modules</span>' +
        '<span>' + pct + '%</span>' +
      '</div>' +
      '<div class="dbc-progress-track">' +
        '<div class="dbc-progress-fill" style="width:' + pct + '%"></div>' +
      '</div>' +
    '</div>' +
    '<div class="dbc-course-foot">' +
      '<div class="dbc-modules-left"><span>' + left + '</span> modules left</div>' +
      (pct < 100
        ? '<button class="btn-continue" onclick="continueCourse(\'' + course.id + '\',\'' + course.name.replace(/'/g, "\\'") + '\')">Continue ' + arrowSvg + '</button>'
        : '<span style="font-size:12px;color:#4DA85E;font-weight:700;display:flex;align-items:center;gap:5px">' + checkSvg + ' Completed</span>') +
    '</div>' +
  '</div>';
}

function _activityItemHTML(item) {
  var icons = {
    course:  '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h8M2 12h10" stroke="var(--c-purple)" stroke-width="1.3" stroke-linecap="round"/></svg>',
    badge:   '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="4" stroke="var(--c-pink-deep)" stroke-width="1.3"/><path d="M5 10l-1.5 5 4.5-2.5 4.5 2.5L11 10" stroke="var(--c-pink-deep)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    xp:      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2l1.8 5H15l-4.5 3 1.8 5L8 12.5 3.7 15l1.8-5L1 7h5.2L8 2z" stroke="var(--c-blue)" stroke-width="1.1" fill="none"/></svg>',
    job:     '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="5" width="12" height="9" rx="1.5" stroke="var(--c-blue-deep)" stroke-width="1.3"/><path d="M5 5V3.5A1.5 1.5 0 016.5 2h3A1.5 1.5 0 0111 3.5V5" stroke="var(--c-blue-deep)" stroke-width="1.3"/></svg>',
    session: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="var(--c-purple)" stroke-width="1.3"/><path d="M8 5v3l2 2" stroke="var(--c-purple)" stroke-width="1.3" stroke-linecap="round"/></svg>',
  };
  var typeClass = { course: 'ico-course', badge: 'ico-badge', xp: 'ico-xp', job: 'ico-job', session: 'ico-course' };
  return '<div class="dbc-activity-item">' +
    '<div class="dbc-activity-ico ' + (typeClass[item.type] || 'ico-course') + '">' + (icons[item.type] || icons.course) + '</div>' +
    '<div class="dbc-activity-body">' +
      '<div class="dbc-activity-text">' + item.text + '</div>' +
      '<div class="dbc-activity-time">' + item.time + '</div>' +
    '</div>' +
    '<span class="dbc-activity-xp">' + item.xp + '</span>' +
  '</div>';
}

function _jobItemHTML(job, status) {
  return '<div class="dbc-job-item">' +
    '<div class="dbc-job-logo" style="color:#fff">' + job.svgIcon + '</div>' +
    '<div class="dbc-job-info">' +
      '<div class="dbc-job-title">' + job.title + '</div>' +
      '<div class="dbc-job-co">' + job.company + ' &middot; ' + job.type + '</div>' +
    '</div>' +
    '<span class="dbc-job-status ' + _jobStatusClass(status) + '">' + _jobStatusLabel(status) + '</span>' +
  '</div>';
}

function _renderEnrolList(containerId, user, limit) {
  var el = document.getElementById(containerId);
  if (!el) return;
  var enrolled  = user.enrolledCourses || {};
  var available = ALL_COURSES.filter(function (c) { return !enrolled[c.id]; }).slice(0, limit);
  if (!available.length) {
    el.innerHTML = '<div class="db-empty"><p>You\'re enrolled in all available courses!</p></div>';
    return;
  }
  el.innerHTML = available.map(function (c) {
    return '<div class="dbc-enrol-item">' +
      '<div class="dbc-enrol-thumb" style="background:linear-gradient(135deg,' + c.color + '66,' + c.color + 'aa);color:var(--t-ink)">' + c.svgIcon + '</div>' +
      '<div class="dbc-enrol-info">' +
        '<div class="dbc-enrol-name">' + c.name + '</div>' +
        '<div class="dbc-enrol-meta">' + c.cat + ' &middot; ' + c.modules + ' modules</div>' +
      '</div>' +
      '<button class="btn-enrol" onclick="enrolCourse(\'' + c.id + '\',\'' + c.name.replace(/'/g, "\\'") + '\')">Enrol</button>' +
    '</div>';
  }).join('');
}

function _emptyState(title, sub, action) {
  return '<div class="db-empty">' +
    '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" style="margin:0 auto 10px;opacity:.25;display:block">' +
      '<circle cx="16" cy="16" r="13" stroke="currentColor" stroke-width="1.2"/>' +
      '<path d="M10 16h12M16 10v12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>' +
    '</svg>' +
    '<p><strong>' + title + '</strong><br>' + sub +
      (action ? ' <a onclick="' + action + '" style="cursor:pointer">Start now &rarr;</a>' : '') +
    '</p>' +
  '</div>';
}

/* ══════════════════════════════════════════════════
   UTILITIES
   ══════════════════════════════════════════════════ */

function _calcLevel(xp)  { return Math.floor((xp || 0) / 500) + 1; }
function _xpPercent(xp) {
  var level = _calcLevel(xp);
  var base  = (level - 1) * 500;
  var cap   = level * 500;
  return Math.min(100, Math.round(((xp - base) / (cap - base)) * 100));
}
function _initials(user) {
  return ((user.firstName || '')[0] + (user.lastName || '')[0]).toUpperCase() || 'SC';
}
function _earnedBadges(user) {
  return ALL_BADGES.filter(function (b) { return (user.xp || 0) >= b.xpRequired; });
}
function _jobStatusClass(s) {
  return s === 'interview' ? 'interview' : s === 'reviewing' ? 'reviewing' : 'applied';
}
function _jobStatusLabel(s) {
  return s === 'interview' ? 'Interview' : s === 'reviewing' ? 'In Review' : 'Applied';
}
function _setText(id, val) {
  var el = document.getElementById(id);
  if (el) el.textContent = val;
}
function _getUser() {
  var user = window.SC && window.SC.Session && window.SC.Session.getUser();
  if (!user && sessionStorage.getItem('sc-demo') === '1') return _createDemoUser();
  return user;
}
function _updateUser(id, patch) {
  if (window.SC && window.SC.UserStore) {
    window.SC.UserStore.update(id, patch);
  }
  var all = JSON.parse(localStorage.getItem('sc-users') || '[]');
  var idx = all.findIndex(function (u) { return u.id === id; });
  if (idx !== -1) {
    Object.assign(all[idx], patch);
    localStorage.setItem('sc-users', JSON.stringify(all));
  }
}
function _recordActivity(user, type, text, xpNum) {
  var acts = [{ type: type, text: text, xp: '+' + xpNum + ' XP', time: 'Just now', ts: Date.now() }]
    .concat(user.activity || []).slice(0, 50);
  _updateUser(user.id, { activity: acts });
}
function _refreshDashboard() {
  var user = _getUser();
  if (!user) return;
  renderAll(user);
}