/* ==========================================================================
   KOMPASS — Editorial Edition v3.1
   Multi-file vanilla JS. Icons inline, offline-first, PWA-ready.
   ========================================================================== */
(() => {
  const D = window.KOMPASS_DATA;

  /* ------------------------------------------------------------------------
     Storage
     ---------------------------------------------------------------------- */
  const LS_KEYS = {
    theme:    'kompass.theme',
    onboard:  'kompass.onboard.v2',
    favs:     'kompass.favs.v1',
    linkPref: 'kompass.linkPref',
    checklist:'kompass.checklist.v2',
    tab:      'kompass.tab',
    group:    'kompass.group'
  };
  const LS = {
    get(k, f) { try { const v = localStorage.getItem(k); return v == null ? f : JSON.parse(v); } catch { return f; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };

  const state = {
    tab:         LS.get(LS_KEYS.tab, 'home'),
    theme:       LS.get(LS_KEYS.theme, 'light'),
    onboard:     LS.get(LS_KEYS.onboard, null),
    favs:        LS.get(LS_KEYS.favs, []),
    linkPref:    LS.get(LS_KEYS.linkPref, 'auto'),
    checks:      LS.get(LS_KEYS.checklist, {}),
    activeGroup: LS.get(LS_KEYS.group, 'karriere'),
    searchQ:     ''
  };

  const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  /* ------------------------------------------------------------------------
     DOM helpers
     ---------------------------------------------------------------------- */
  const h = (tag, attrs = {}, children = []) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') el.className = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
      else if (k === 'html') el.innerHTML = v;
      else if (v === true) el.setAttribute(k, '');
      else if (v !== false && v != null) el.setAttribute(k, v);
    }
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (c == null || c === false) return;
      if (typeof c === 'string' || typeof c === 'number') el.appendChild(document.createTextNode(c));
      else el.appendChild(c);
    });
    return el;
  };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  /* ==========================================================================
     ICONS — stroke-based, feather-inspired, hand-tuned for this app
     Usage:  icon('home')             → <span class="icon"><svg…></span>
             icon('home','icon-md')   → with size class
             iconHTML('home')         → raw <svg> string for innerHTML
     ========================================================================== */
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const ICONS = {
    // Navigation
    home:       '<path d="M3 11 12 3l9 8v10a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
    layers:     '<path d="M12 3 2 8l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
    search:     '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    settings:   '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 0 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6h.01A1.7 1.7 0 0 0 10 3.09V3a2 2 0 0 1 4 0v.09a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9v.01c.27.64.87 1.06 1.56 1.03H21a2 2 0 0 1 0 4h-.09a1.7 1.7 0 0 0-1.56 1.03z"/>',
    chevronR:   '<path d="m9 18 6-6-6-6"/>',
    arrowUR:    '<path d="M7 17 17 7M8 7h9v9"/>',
    arrowR:     '<path d="M5 12h14M13 5l7 7-7 7"/>',
    arrowL:     '<path d="M19 12H5M11 19l-7-7 7-7"/>',
    x:          '<path d="M18 6 6 18M6 6l12 12"/>',
    check:      '<path d="m5 12 5 5L20 7"/>',
    plus:       '<path d="M12 5v14M5 12h14"/>',
    dots:       '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',

    // Content / sections
    user:       '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    compass:    '<circle cx="12" cy="12" r="10"/><path d="m16 8-4 8-4-4z"/>',
    target:     '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    trending:   '<path d="M3 17 9 11l4 4 8-8M14 7h7v7"/>',
    package:    '<path d="M16.5 9.4 7.5 4.2M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
    briefcase:  '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    building:   '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
    network:    '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8"/>',
    grid:       '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
    book:       '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5H6.5a2.5 2.5 0 0 0 0 5"/>',
    checkSq:    '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
    calendar:   '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    clock:      '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    refresh:    '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',

    // Actions
    external:   '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    link:       '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
    phone:      '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
    desktop:    '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    eye:        '<path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"/><circle cx="12" cy="12" r="3"/>',
    trash:      '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6"/>',
    download:   '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    play:       '<polygon points="5,3 19,12 5,21"/>',

    // Feedback / state
    star:       '<path d="m12 2 3.1 6.3 7 1-5 4.9 1.2 7-6.3-3.3-6.3 3.3 1.2-7-5-4.9 7-1z"/>',
    starFilled: '<path d="m12 2 3.1 6.3 7 1-5 4.9 1.2 7-6.3-3.3-6.3 3.3 1.2-7-5-4.9 7-1z" fill="currentColor"/>',
    heart:      '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1.1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>',
    flame:      '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.6-2-1.3-2.7L8 8l-.3.4C7 9.2 6 10.4 6 12a4 4 0 0 0 8 0c0-.7-.2-1.5-.4-2.2l-1.3 2a2 2 0 0 1-3.8-.4z"/><path d="M9.3 3.2c0 1.8-1.3 3.3-1.3 5.8 0 2 1.3 3 2 3a2 2 0 0 0 2-2c0-2-1.7-2.6-1.7-4 0-.7.3-1.5.7-2.3a5 5 0 0 1 4 2.3c.9 1.4 1.2 3 .9 4.6C15.4 12 14.8 13 14 14c-.5.5-1 .8-1.7 1.1-.8.3-1.4.3-2.3.3-.8 0-1.5-.1-2.3-.4-.7-.3-1.3-.7-1.8-1.3-1.3-1.5-1.9-3.4-1.9-5.3 0-1.9.5-3.7 1.7-5.2z"/>',
    info:       '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    circle:     '<circle cx="12" cy="12" r="9"/>',
    dot:        '<circle cx="12" cy="12" r="3" fill="currentColor"/>',

    // Theme
    sun:        '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>',
    moon:       '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',

    // Commerce / utility
    globe:      '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    share:      '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
    sparkles:   '<path d="M12 3v3M12 18v3M4.2 6.2l2.1 2.1M17.7 15.7l2.1 2.1M3 12h3M18 12h3M4.2 17.8l2.1-2.1M17.7 8.3l2.1-2.1"/><circle cx="12" cy="12" r="3"/>',
    palette:    '<circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.4 0 2.5-1.1 2.5-2.5 0-.6-.2-1.2-.6-1.6-.4-.4-.6-1-.6-1.6 0-1.4 1.1-2.5 2.5-2.5H17c2.8 0 5-2.2 5-5 0-4.5-4.5-7.8-10-7.8z"/>',
    zap:        '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
    car:        '<path d="M14 16H9m10 0h1a1 1 0 0 0 1-1v-3.6c0-.8-.2-1.7-.7-2.4L19 7h-2M5 17v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1m7 0v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1M14 9H5l-2 4 .5 2h17l.5-2-2-4h-3z"/><circle cx="7" cy="14" r="1" fill="currentColor"/><circle cx="17" cy="14" r="1" fill="currentColor"/>',
    chart:      '<path d="M3 3v18h18M7 14l4-4 4 4 5-5"/>',
    filter:     '<path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3z"/>',
    radio:      '<circle cx="12" cy="12" r="2"/><path d="M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4M19 5a10 10 0 0 1 0 14M5 19a10 10 0 0 1 0-14"/>',
    quote:      '<path d="M3 21c3 0 7-1 7-8V5c0-1-1-2-2-2H4c-1 0-2 1-2 2v6c0 1 1 2 2 2h3c0 3-1 5-4 5v3zM14 21c3 0 7-1 7-8V5c0-1-1-2-2-2h-4c-1 0-2 1-2 2v6c0 1 1 2 2 2h3c0 3-1 5-4 5v3z"/>'
  };

  function iconHTML(name, extraClass) {
    const body = ICONS[name];
    if (!body) return '';
    const cls = 'icon' + (extraClass ? ' ' + extraClass : '');
    // Default: stroke outline, currentColor.
    return `<span class="${cls}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg></span>`;
  }
  function icon(name, extraClass) {
    const wrap = document.createElement('span');
    wrap.innerHTML = iconHTML(name, extraClass);
    return wrap.firstChild;
  }

  /* Category icon mapping */
  const CAT_ICON = {
    AI:       'sparkles',
    Trading:  'trending',
    SEO:      'search',
    Creative: 'palette',
    Business: 'briefcase',
    Google:   'globe',
    Social:   'share',
    Sport:    'zap',
    Car:      'car'
  };

  /* Group icon mapping */
  const GROUP_ICON = {
    identitaet:  'user',
    karriere:    'trending',
    pm:          'package',
    mch:         'building',
    plattformen: 'network',
    apps:        'grid',
    learn:       'book',
    plan:        'checkSq'
  };

  /* ------------------------------------------------------------------------
     Link handling
     ---------------------------------------------------------------------- */
  function openLink(url, scheme) {
    if (!url) return;
    const pref = state.linkPref;
    const wantApp = (pref === 'app' && scheme) || (pref === 'auto' && isMobile() && scheme);
    if (wantApp) {
      const start = Date.now();
      const t = setTimeout(() => { if (Date.now() - start < 2000) window.open(url, '_blank', 'noopener'); }, 900);
      window.location.href = scheme;
      setTimeout(() => clearTimeout(t), 2500);
    } else {
      window.open(url, '_blank', 'noopener');
    }
  }

  function isFav(id) { return state.favs.includes(id); }
  function toggleFav(id) {
    if (isFav(id)) state.favs = state.favs.filter(x => x !== id);
    else state.favs = [...state.favs, id];
    LS.set(LS_KEYS.favs, state.favs);
    try { navigator.vibrate && navigator.vibrate(5); } catch {}
    renderAll();
  }

  function keyCheck(p, i) { return `${p}.${i}`; }
  function isDone(p, i) { return !!state.checks[keyCheck(p, i)]; }
  function toggleCheck(p, i) {
    state.checks[keyCheck(p, i)] = !state.checks[keyCheck(p, i)];
    LS.set(LS_KEYS.checklist, state.checks);
    try { navigator.vibrate && navigator.vibrate(5); } catch {}
    renderAll();
  }
  function phaseProgress(p) {
    const total = D.checklist[p].length;
    const done = D.checklist[p].reduce((s, _, i) => s + (isDone(p, i) ? 1 : 0), 0);
    return { done, total, pct: total ? Math.round(done/total*100) : 0 };
  }

  function setTab(t) {
    state.tab = t;
    LS.set(LS_KEYS.tab, t);
    document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.dataset.screen === t));
    document.querySelectorAll('.tab').forEach(b => b.classList.toggle('active', b.dataset.tab === t));
    try { navigator.vibrate && navigator.vibrate(3); } catch {}
    window.scrollTo({ top: 0 });
    renderAll();
  }

  /* Populate tab-bar icons from data-icon attributes */
  function hydrateTabIcons() {
    document.querySelectorAll('.tab-icon[data-icon]').forEach(el => {
      const name = el.getAttribute('data-icon');
      el.innerHTML = '';
      const iconMap = { home: 'home', layers: 'layers', search: 'search', settings: 'settings' };
      const svg = ICONS[iconMap[name] || name];
      if (svg) el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${svg}</svg>`;
    });
  }

  /* ==========================================================================
     MASTHEAD
     ========================================================================== */
  function mast(leftMeta, rightMeta, opts = {}) {
    const dateStr = new Date().toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' });
    return h('div', { class: 'mast' }, [
      h('div', { class: 'mast-row' }, [
        h('div', { class: 'mast-meta', html: (opts.leftIcon ? iconHTML(opts.leftIcon) : iconHTML('dots')) + ' ' + esc(leftMeta || 'Vol. 01') }),
        h('div', { class: 'mast-brand', html: iconHTML('compass') + 'KOMPASS' }),
        h('div', { class: 'mast-meta r', html: esc(rightMeta || dateStr) + ' ' + iconHTML(opts.rightIcon || 'calendar') })
      ])
    ]);
  }

  /* ==========================================================================
     HOME
     ========================================================================== */
  function renderHome() {
    const el = document.getElementById('screen-home');
    el.innerHTML = '';

    const tag = state.onboard?.tag || 'explorer';
    const tagLabel = {
      'mch-operator': 'MCH Operator',
      'pm-aspirant':  'PM Aspirant',
      'explorer':     'Explorer',
      'builder':      'Builder',
      'learner':      'Learner',
      'strategist':   'Strategist'
    }[tag] || 'Explorer';

    el.append(mast('Issue 04·2026', tagLabel, { leftIcon: 'radio', rightIcon: 'user' }));

    // Hero --------------------------------------------------------------
    const hero = h('div', { class: 'hero' }, []);
    hero.innerHTML = `
      <div class="hero-dots"><span class="on"></span><span></span><span></span><span></span></div>
      <div class="hero-eyebrow">
        <span class="eb-left">${iconHTML('user')} № 01 — Identität</span>
        <span class="eb-right">${tagLabel} ${iconHTML('dot')}</span>
      </div>
      <h1 class="hero-display">
        <span class="cut">Systemischer</span>
        <span class="cut"><em>Generalist.</em></span>
      </h1>
      <div class="hero-sub">
        <div class="hero-sub-num">05</div>
        <div class="hero-sub-text">Kern-Merkmale, die zusammen einen Hebel ergeben — nicht Breite als Ziel, Struktur als Universal-Schlüssel.</div>
      </div>
    `;
    el.append(hero);

    // Stats band --------------------------------------------------------
    const next30 = phaseProgress('30');
    const stats = h('div', { class: 'stats' }, []);
    stats.innerHTML = `
      <div class="stat accent">
        <div class="stat-head"><span class="ibadge" style="width:26px;height:26px;">${iconHTML('checkSq')}</span></div>
        <div class="stat-num">${next30.done}<span class="unit">/${next30.total}</span></div>
        <div class="stat-label">${iconHTML('calendar')} 30-Tage-Plan</div>
      </div>
      <div class="stat">
        <div class="stat-head"><span class="ibadge" style="width:26px;height:26px;">${iconHTML('star')}</span></div>
        <div class="stat-num">${state.favs.length}</div>
        <div class="stat-label">${iconHTML('heart')} Favoriten</div>
      </div>
      <div class="stat">
        <div class="stat-head"><span class="ibadge" style="width:26px;height:26px;">${iconHTML('trending')}</span></div>
        <div class="stat-num">${D.karrierepfade.length}</div>
        <div class="stat-label">${iconHTML('compass')} Karriere-Pfade</div>
      </div>
      <div class="stat ink">
        <div class="stat-head"><span class="ibadge" style="width:26px;height:26px;">${iconHTML('grid')}</span></div>
        <div class="stat-num">${D.apps.length}</div>
        <div class="stat-label">${iconHTML('zap')} Tools im Stack</div>
      </div>
    `;
    el.append(stats);

    // Motor band --------------------------------------------------------
    const motor = h('div', { class: 'band' }, []);
    motor.innerHTML = `
      <div class="band-head">
        <div class="band-head-l">
          <span class="ibadge accent">${iconHTML('target')}</span>
          <span class="kicker">№ 02 — Motor</span>
        </div>
        <span class="count">Essay</span>
      </div>
      <h2 class="band-title">Struktur als<br><em>Universal-Schlüssel.</em></h2>
      <div class="band-body" style="font-size:15px; line-height:1.55; color:var(--ink-2);">${esc(D.profile.motor)}</div>
    `;
    el.append(motor);

    // Kern — ledger -----------------------------------------------------
    const kernBand = h('div', { class: 'band' }, []);
    kernBand.innerHTML = `
      <div class="band-head">
        <div class="band-head-l">
          <span class="ibadge">${iconHTML('sparkles')}</span>
          <span class="kicker">№ 03 — Kern-Merkmale</span>
        </div>
        <span class="count">05</span>
      </div>
    `;
    const kernLedger = h('div', { class: 'ledger' }, D.profile.kern.map((k, i) => {
      const row = h('div', { class: 'row' }, []);
      row.innerHTML = `
        <div class="row-idx">${String(i+1).padStart(2,'0')}</div>
        <div class="row-body">
          <div class="row-title">${esc(k.title)}</div>
          <div class="row-sub wrap">${esc(k.text)}</div>
        </div>
        <div class="row-trail">${iconHTML('chevronR')}</div>
      `;
      return row;
    }));
    kernBand.appendChild(kernLedger);
    el.append(kernBand);

    // Quote — inverse ---------------------------------------------------
    const quote = h('div', { class: 'quote' }, []);
    quote.innerHTML = `
      <div class="quote-mark">"</div>
      <div class="quote-kicker">${iconHTML('info')} Bindungs-Modus — Prüffrage</div>
      <div class="quote-text">${esc(D.profile.bindungsQuote)}</div>
      <div class="quote-sub">${iconHTML('radio')} ${esc(D.profile.bindungsContext)}</div>
    `;
    el.append(quote);

    // Favoriten --------------------------------------------------------
    const favs = resolveFavs();
    if (favs.length) {
      const fb = h('div', { class: 'band' }, []);
      fb.innerHTML = `
        <div class="band-head">
          <div class="band-head-l">
            <span class="ibadge accent">${iconHTML('starFilled')}</span>
            <span class="kicker">№ 04 — Favoriten</span>
          </div>
          <span class="count">${String(favs.length).padStart(2,'0')}</span>
        </div>
      `;
      const led = h('div', { class: 'ledger' }, favs.map((f, i) => {
        const row = h('div', { class: 'row', onclick: () => { state.activeGroup = f.group; LS.set(LS_KEYS.group, f.group); setTab('module'); } }, []);
        row.innerHTML = `
          <div class="row-idx">${String(i+1).padStart(2,'0')}</div>
          <div class="row-body">
            <div class="row-title">${esc(f.title)} <span class="star-tag">${iconHTML('starFilled')}</span></div>
            <div class="row-sub">${esc(f.sub)}</div>
          </div>
          <div class="row-trail accent">${iconHTML('arrowUR')}</div>
        `;
        return row;
      }));
      fb.appendChild(led);
      el.append(fb);
    }

    // Module-Index -----------------------------------------------------
    const groups = [
      { id: 'identitaet',  label: 'Identität',    sub: 'Motor · Werte · Menschen' },
      { id: 'karriere',    label: 'Karriere',     sub: '9 Pfade mit Passung' },
      { id: 'pm',          label: 'Produktmgmt',  sub: 'Deep-Dive · APM · Gehalt' },
      { id: 'mch',         label: 'MCH Media',    sub: 'Hauptprojekt · Ressourcen' },
      { id: 'plattformen', label: 'Kanäle',       sub: 'LinkedIn · Malt · Jobs' },
      { id: 'apps',        label: 'Tool Stack',   sub: `${D.apps.length} Apps täglich` },
      { id: 'learn',       label: 'Learning',     sub: 'Bücher · Podcasts · Kurse' },
      { id: 'plan',        label: 'Plan',         sub: '30 / 60 / 90 / 365' }
    ];
    const qb = h('div', { class: 'band' }, []);
    qb.innerHTML = `
      <div class="band-head">
        <div class="band-head-l">
          <span class="ibadge">${iconHTML('layers')}</span>
          <span class="kicker">№ 05 — Module</span>
        </div>
        <span class="count">${String(groups.length).padStart(2,'0')}</span>
      </div>
    `;
    const ql = h('div', { class: 'ledger' }, groups.map((g, i) => {
      const row = h('div', { class: 'row has-icon', onclick: () => { state.activeGroup = g.id; LS.set(LS_KEYS.group, g.id); setTab('module'); } }, []);
      row.innerHTML = `
        <div class="row-icon">${iconHTML(GROUP_ICON[g.id] || 'dot')}</div>
        <div class="row-body">
          <div class="row-title">${esc(g.label)}</div>
          <div class="row-sub">${esc(g.sub)}</div>
        </div>
        <div class="row-trail">${iconHTML('chevronR')}</div>
      `;
      return row;
    }));
    qb.appendChild(ql);
    el.append(qb);

    // Pathway ----------------------------------------------------------
    const pb = h('div', { class: 'band' }, []);
    pb.innerHTML = `
      <div class="band-head">
        <div class="band-head-l">
          <span class="ibadge accent">${iconHTML('compass')}</span>
          <span class="kicker">№ 06 — Karriere-Kompass</span>
        </div>
        <span class="count">Reihenfolge</span>
      </div>
    `;
    const pathStepIcons = ['checkSq', 'building', 'package', 'target'];
    const p = h('div', { class: 'path' }, D.kompassReihenfolge.map((s, i) => {
      const st = h('div', { class: 'path-step' }, []);
      st.innerHTML = `
        <div class="path-num">${String(s.step).padStart(2,'0')}</div>
        <div>
          <div class="path-title">${iconHTML(pathStepIcons[i] || 'dot')} ${esc(s.title)}</div>
          <div class="path-text">${esc(s.text)}</div>
        </div>
      `;
      return st;
    }));
    pb.appendChild(p);
    el.append(pb);

    // Nordsterne — inverse --------------------------------------------
    const nb = h('div', { class: 'band invert' }, []);
    nb.innerHTML = `
      <div class="band-head">
        <div class="band-head-l">
          <span class="ibadge accent">${iconHTML('target')}</span>
          <span class="kicker">№ 07 — Nordsterne</span>
        </div>
        <span class="count">${D.profile.nordsterne.length}</span>
      </div>
    `;
    const nl = h('div', {}, D.profile.nordsterne.map((n, i) => {
      const row = h('div', { class: 'row' }, []);
      row.innerHTML = `
        <div class="row-idx">${String(i+1).padStart(2,'0')}</div>
        <div class="row-body"><div class="row-title" style="white-space:normal; font-weight:500;">${esc(n)}</div></div>
        <div class="row-trail">${iconHTML('starFilled')}</div>
      `;
      return row;
    }));
    nb.appendChild(nl);
    el.append(nb);

    el.append(h('div', { class: 'spacer' }));
  }

  /* ==========================================================================
     MODULE
     ========================================================================== */
  function renderModule() {
    const el = document.getElementById('screen-module');
    el.innerHTML = '';

    const groups = [
      { id: 'identitaet',  label: 'Identität' },
      { id: 'karriere',    label: 'Karriere' },
      { id: 'pm',          label: 'PM' },
      { id: 'mch',         label: 'MCH' },
      { id: 'plattformen', label: 'Kanäle' },
      { id: 'apps',        label: 'Apps' },
      { id: 'learn',       label: 'Learn' },
      { id: 'plan',        label: 'Plan' }
    ];
    const active = groups.find(g => g.id === state.activeGroup) || groups[1];

    el.append(mast('Modul-Index', active.label.toUpperCase(), { leftIcon: 'layers', rightIcon: GROUP_ICON[active.id] || 'dot' }));

    const sub = h('div', { class: 'subnav' }, groups.map(g => {
      const b = h('button', {
        class: 'sub-btn' + (g.id === active.id ? ' on' : ''),
        onclick: () => { state.activeGroup = g.id; LS.set(LS_KEYS.group, g.id); renderModule(); window.scrollTo({ top: 0 }); }
      }, []);
      b.innerHTML = `${iconHTML(GROUP_ICON[g.id] || 'dot')} ${esc(g.label)}`;
      return b;
    }));
    el.append(sub);

    const renderers = {
      identitaet:  renderIdentitaet,
      karriere:    renderKarriere,
      pm:          renderPM,
      mch:         renderMCH,
      plattformen: renderPlattformen,
      apps:        renderApps,
      learn:       renderLearn,
      plan:        renderPlan
    };
    (renderers[active.id] || renderKarriere)(el);

    el.append(h('div', { class: 'spacer' }));
  }

  /* ---------------- Identität ---------------- */
  function renderIdentitaet(el) {
    const hero = h('div', { class: 'hero' }, []);
    hero.innerHTML = `
      <div class="hero-eyebrow">
        <span class="eb-left">${iconHTML('user')} № 01 — Identität</span>
        <span class="eb-right">Wer ich bin ${iconHTML('eye')}</span>
      </div>
      <h1 class="hero-display"><span class="cut">Abduktion,</span><span class="cut"><em>als Methode.</em></span></h1>
      <div class="hero-sub"><div class="hero-sub-num">04</div><div class="hero-sub-text">Kontexte, in denen mein System anders tickt — vom Beobachter bis zum Bindungs-Modus.</div></div>
    `;
    el.append(hero);

    const kernBand = h('div', { class: 'band' }, []);
    kernBand.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge">${iconHTML('sparkles')}</span><span class="kicker">Kern-Merkmale</span></div>
        <span class="count">05</span>
      </div>
    `;
    const led = h('div', { class: 'ledger' }, D.profile.kern.map((k, i) => {
      const r = h('div', { class: 'row' }, []);
      r.innerHTML = `
        <div class="row-idx">${String(i+1).padStart(2,'0')}</div>
        <div class="row-body">
          <div class="row-title">${esc(k.title)}</div>
          <div class="row-sub wrap">${esc(k.text)}</div>
        </div>
        <div class="row-trail">${iconHTML('chevronR')}</div>
      `;
      return r;
    }));
    kernBand.appendChild(led);
    el.append(kernBand);

    // Menschen-Bewertung — table
    const mb = h('div', { class: 'band' }, []);
    mb.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge">${iconHTML('user')}</span><span class="kicker">Menschen-Bewertung</span></div>
        <span class="count">04</span>
      </div>
    `;
    const body = h('div', {}, D.profile.menschen.map(m => {
      const r = h('div', { class: 'card', style: { padding: '18px', borderBottom: '1px solid var(--line)' } }, []);
      r.innerHTML = `
        <div style="font-family:var(--f-display); font-weight:800; font-size:20px; letter-spacing:-0.02em; margin-bottom:10px;">${esc(m.kontext)}</div>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
          <span class="tag">${iconHTML('radio')} ${esc(m.system)}</span>
          <span class="tag accent">${iconHTML('dot')} ${esc(m.modus)}</span>
        </div>
      `;
      return r;
    }));
    mb.appendChild(body);
    el.append(mb);

    // Lernkanäle
    const lb = h('div', { class: 'band' }, []);
    lb.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge">${iconHTML('book')}</span><span class="kicker">Lernkanäle</span></div>
        <span class="count">03</span>
      </div>
    `;
    const lled = h('div', { class: 'ledger' }, D.profile.lernkanaele.map((t, i) => {
      const r = h('div', { class: 'row' }, []);
      r.innerHTML = `
        <div class="row-idx">${String(i+1).padStart(2,'0')}</div>
        <div class="row-body"><div class="row-title" style="white-space:normal; font-size:15px; line-height:1.35;">${esc(t)}</div></div>
        <div class="row-trail">${iconHTML('arrowR')}</div>
      `;
      return r;
    }));
    lb.appendChild(lled);
    el.append(lb);

    // Was ich nicht bin — inverse
    const nb = h('div', { class: 'band invert' }, []);
    nb.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge accent">${iconHTML('x')}</span><span class="kicker">Was ich nicht bin</span></div>
        <span class="count">05</span>
      </div>
    `;
    const nled = h('div', {}, D.profile.nichtBin.map((t, i) => {
      const r = h('div', { class: 'row' }, []);
      r.innerHTML = `
        <div class="row-idx">${String(i+1).padStart(2,'0')}</div>
        <div class="row-body"><div class="row-title" style="white-space:normal; font-weight:500;">${esc(t)}</div></div>
        <div class="row-trail">${iconHTML('x')}</div>
      `;
      return r;
    }));
    nb.appendChild(nled);
    el.append(nb);

    // Baustellen
    const bb = h('div', { class: 'band' }, []);
    bb.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge soft">${iconHTML('flame')}</span><span class="kicker">Baustellen</span></div>
        <span class="count">${D.profile.baustellen.length}</span>
      </div>
    `;
    D.profile.baustellen.forEach((b, i) => {
      const c = h('div', { class: 'sticky-card' }, []);
      c.innerHTML = `
        <div class="small-meta" style="margin-left:24px;">${iconHTML('flame')} № ${String(i+1).padStart(2,'0')} · Loop</div>
        <div class="sticky-title">${esc(b.title)}</div>
        <div class="sticky-text">${esc(b.text)}</div>
      `;
      bb.appendChild(c);
    });
    el.append(bb);
  }

  /* ---------------- Karriere ---------------- */
  function renderKarriere(el) {
    const hero = h('div', { class: 'hero' }, []);
    hero.innerHTML = `
      <div class="hero-eyebrow">
        <span class="eb-left">${iconHTML('trending')} № 02 — Karriere</span>
        <span class="eb-right">${D.karrierepfade.length} Pfade ${iconHTML('filter')}</span>
      </div>
      <h1 class="hero-display"><span class="cut">Berufspfade</span><span class="cut"><em>mit Passung.</em></span></h1>
      <div class="hero-sub"><div class="hero-sub-num">09</div><div class="hero-sub-text">Gelistet nach Profil-Passung. Favoriten oben gepinnt — Sterne-Rating zeigt Match-Qualität.</div></div>
    `;
    el.append(hero);

    const paths = [...D.karrierepfade].sort((a, b) => {
      const fa = isFav(a.id) ? 1 : 0, fb = isFav(b.id) ? 1 : 0;
      if (fa !== fb) return fb - fa;
      return b.stars - a.stars;
    });

    const cards = h('div', { class: 'band' }, []);
    cards.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge accent">${iconHTML('trending')}</span><span class="kicker">Pfade — Ranked</span></div>
        <span class="count">${paths.length}</span>
      </div>
    `;
    paths.forEach((p, i) => {
      const c = h('div', { class: 'card' }, []);
      c.dataset.pathid = p.id;
      const stars = '★'.repeat(p.stars) + '☆'.repeat(5 - p.stars);
      c.innerHTML = `
        <div class="card-row-top">
          <div class="card-rating">
            <span>№ ${String(i+1).padStart(2,'0')}</span>
            <span class="dot-sep"></span>
            <span class="stars">${stars}</span>
            <span class="dot-sep"></span>
            <span>${esc(p.gehalt)}</span>
          </div>
        </div>
        <h3 class="card-title">${esc(p.title)}</h3>
        <div class="card-desc">${esc(p.desc)}</div>
        <div>${p.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      `;
      const starBtn = h('button', {
        class: 'star-btn' + (isFav(p.id) ? ' on' : ''),
        onclick: (e) => { e.stopPropagation(); toggleFav(p.id); }
      }, []);
      starBtn.innerHTML = iconHTML(isFav(p.id) ? 'starFilled' : 'star');
      c.querySelector('.card-row-top').appendChild(starBtn);

      const related = p.related.map(rid => D.karrierepfade.find(x => x.id === rid)).filter(Boolean);
      if (related.length) {
        const rel = h('div', { class: 'related' }, []);
        rel.innerHTML = `<div class="related-label">${iconHTML('network')} Verwandt</div>`;
        related.forEach(r => {
          const chip = h('button', { class: 'chip', onclick: () => scrollToPathId(r.id) }, []);
          chip.innerHTML = `${iconHTML('arrowUR')} ${esc(r.title)}`;
          rel.appendChild(chip);
        });
        c.appendChild(rel);
      }
      cards.appendChild(c);
    });
    el.append(cards);

    // APM Programme
    const apm = h('div', { class: 'band' }, []);
    apm.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge">${iconHTML('briefcase')}</span><span class="kicker">APM-Programme DACH</span></div>
        <span class="count">${D.apmProgramme.length}</span>
      </div>
    `;
    const al = h('div', { class: 'ledger' }, D.apmProgramme.map((p, i) => {
      const r = h('div', { class: 'row', onclick: () => openLink(p.url) }, []);
      r.innerHTML = `
        <div class="row-idx">${String(i+1).padStart(2,'0')}</div>
        <div class="row-body"><div class="row-title">${esc(p.name)}</div><div class="row-sub">${esc(p.program)}</div></div>
        <div class="row-trail">${iconHTML('external')}</div>
      `;
      return r;
    }));
    apm.appendChild(al);
    el.append(apm);

    // Job-Boards
    const jb = h('div', { class: 'band' }, []);
    jb.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge">${iconHTML('briefcase')}</span><span class="kicker">Job-Boards</span></div>
        <span class="count">${D.jobBoards.length}</span>
      </div>
    `;
    const jl = h('div', { class: 'ledger' }, D.jobBoards.map((j, i) => {
      const r = h('div', { class: 'row', onclick: () => openLink(j.url) }, []);
      r.innerHTML = `
        <div class="row-idx">${String(i+1).padStart(2,'0')}</div>
        <div class="row-body"><div class="row-title">${esc(j.name)}</div><div class="row-sub">${esc(j.focus)}</div></div>
        <div class="row-trail">${iconHTML('external')}</div>
      `;
      return r;
    }));
    jb.appendChild(jl);
    el.append(jb);
  }

  function scrollToPathId(id) {
    const card = document.querySelector(`[data-pathid="${id}"]`);
    if (card) {
      card.scrollIntoView && card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      card.style.transition = 'background .3s';
      card.style.background = 'rgba(255,74,28,0.14)';
      setTimeout(() => { card.style.background = ''; }, 700);
    }
  }

  /* ---------------- PM ---------------- */
  function renderPM(el) {
    const hero = h('div', { class: 'hero' }, []);
    hero.innerHTML = `
      <div class="hero-eyebrow">
        <span class="eb-left">${iconHTML('package')} № 03 — PM Deep-Dive</span>
        <span class="eb-right">Was · Wie · Einstieg</span>
      </div>
      <h1 class="hero-display"><span class="cut">Meet the</span><span class="cut"><em>Product Manager.</em></span></h1>
      <div class="hero-sub"><div class="hero-sub-num">90<span class="pct">%</span></div><div class="hero-sub-text">der Ideen werden abgelehnt, damit die 10% richtig gebaut werden. Strategie statt Taktik.</div></div>
    `;
    el.append(hero);

    // Specs grid
    const specBand = h('div', { class: 'band' }, []);
    specBand.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge accent">${iconHTML('package')}</span><span class="kicker">PM-Spec</span></div>
        <span class="count">Snapshot</span>
      </div>
      <div class="specs" style="margin: 0 18px;">
        <div class="spec">
          <div class="spec-icon">${iconHTML('network')}</div>
          <div class="spec-num">04</div>
          <div class="spec-label">Schnittstellen</div>
        </div>
        <div class="spec">
          <div class="spec-icon">${iconHTML('x')}</div>
          <div class="spec-num">90<span style="font-size:14px; color:var(--ink-3);">%</span></div>
          <div class="spec-label">Nein</div>
        </div>
        <div class="spec">
          <div class="spec-icon">${iconHTML('starFilled')}</div>
          <div class="spec-num" style="color:var(--accent);">★★★★★</div>
          <div class="spec-label">Match</div>
        </div>
      </div>
      <div class="card"><div class="card-desc" style="font-size:15.5px; color:var(--ink-2);">${esc(D.pmDetail.was)}</div></div>
    `;
    el.append(specBand);

    // Aufgaben
    const ab = h('div', { class: 'band' }, []);
    ab.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge">${iconHTML('checkSq')}</span><span class="kicker">Typische Aufgaben</span></div>
        <span class="count">${D.pmDetail.aufgaben.length}</span>
      </div>
    `;
    const taskIcons = ['eye', 'compass', 'package', 'share', 'chart'];
    const al = h('div', { class: 'ledger' }, D.pmDetail.aufgaben.map((a, i) => {
      const r = h('div', { class: 'row has-icon' }, []);
      r.innerHTML = `
        <div class="row-icon">${iconHTML(taskIcons[i] || 'dot')}</div>
        <div class="row-body">
          <div class="row-title">${esc(a.title)}</div>
          <div class="row-sub wrap">${esc(a.text)}</div>
        </div>
        <div class="row-trail">${iconHTML('chevronR')}</div>
      `;
      return r;
    }));
    ab.appendChild(al);
    el.append(ab);

    // Match
    const mb = h('div', { class: 'band invert' }, []);
    mb.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge accent">${iconHTML('check')}</span><span class="kicker">Profil-Match</span></div>
        <span class="count">06</span>
      </div>
    `;
    const ml = h('div', {}, D.pmDetail.match.map((t, i) => {
      const r = h('div', { class: 'row' }, []);
      r.innerHTML = `
        <div class="row-idx">${String(i+1).padStart(2,'0')}</div>
        <div class="row-body"><div class="row-title" style="white-space:normal; font-weight:500;">${esc(t)}</div></div>
        <div class="row-trail">${iconHTML('check')}</div>
      `;
      return r;
    }));
    mb.appendChild(ml);
    el.append(mb);

    // Pfade A/B
    const pB = h('div', { class: 'band' }, []);
    pB.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge">${iconHTML('compass')}</span><span class="kicker">Einstiegspfade</span></div>
        <span class="count">A · B</span>
      </div>
    `;
    [
      { label: 'Pfad A — via MCH',  tag: 'empfohlen',   icon: 'building', steps: D.pmDetail.pfadA },
      { label: 'Pfad B — direkt',   tag: 'alternative', icon: 'zap',      steps: D.pmDetail.pfadB }
    ].forEach(p => {
      const c = h('div', { class: 'card' }, []);
      c.innerHTML = `
        <div class="card-row-top">
          <div class="card-rating">${iconHTML(p.icon)} ${esc(p.tag)}</div>
        </div>
        <h3 class="card-title" style="font-size:28px;">${esc(p.label)}</h3>
      `;
      const path = h('div', { class: 'path', style: { padding: '0' } }, p.steps.map((s, i) => {
        const st = h('div', { class: 'path-step' }, []);
        st.innerHTML = `<div class="path-num">${String(i+1).padStart(2,'0')}</div><div><div class="path-text" style="color:var(--ink); font-size:14px;">${esc(s)}</div></div>`;
        return st;
      }));
      c.appendChild(path);
      pB.appendChild(c);
    });
    el.append(pB);

    // Gehalt
    const gb = h('div', { class: 'band' }, []);
    gb.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge">${iconHTML('trending')}</span><span class="kicker">Gehaltsrahmen DE</span></div>
        <span class="count">2025 / 26</span>
      </div>
    `;
    const gbody = h('div', {}, D.pmDetail.gehalt.map(g => {
      const r = h('div', { class: 'kv' }, []);
      r.innerHTML = `<span class="k">${iconHTML('chart')} ${esc(g.level)}</span><span class="v">${esc(g.range)}</span>`;
      return r;
    }));
    gb.appendChild(gbody);
    el.append(gb);
  }

  /* ---------------- MCH ---------------- */
  function renderMCH(el) {
    const hero = h('div', { class: 'hero' }, []);
    hero.innerHTML = `
      <div class="hero-eyebrow">
        <span class="eb-left">${iconHTML('building')} № 04 — MCH Media</span>
        <span class="eb-right">Hauptprojekt ${iconHTML('flame')}</span>
      </div>
      <h1 class="hero-display"><span class="cut">Digital</span><span class="cut"><em>Agency.</em></span><span class="cut">Schwarzwald.</span></h1>
      <div class="hero-sub"><div class="hero-sub-num">01</div><div class="hero-sub-text">${esc(D.mch.status)}</div></div>
    `;
    el.append(hero);

    // Brand-Palette
    const sb = h('div', { class: 'band' }, []);
    sb.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge">${iconHTML('palette')}</span><span class="kicker">Brand-Palette</span></div>
        <span class="count">03</span>
      </div>
    `;
    const sw = h('div', { style: { padding: '4px 18px 18px' } }, [
      (() => {
        const g = h('div', { class: 'swatches' }, []);
        D.mch.farben.forEach(c => {
          const s = h('div', { class: 'swatch', style: { background: c, color: c === '#EEF3EE' ? '#0D0D0D' : '#fff' } }, c);
          g.appendChild(s);
        });
        return g;
      })()
    ]);
    sb.appendChild(sw);
    el.append(sb);

    // Warum
    const wb = h('div', { class: 'band invert' }, []);
    wb.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge accent">${iconHTML('target')}</span><span class="kicker">Warum Hauptprojekt</span></div>
        <span class="count">${D.mch.warum.length}</span>
      </div>
    `;
    const wl = h('div', {}, D.mch.warum.map((t, i) => {
      const r = h('div', { class: 'row' }, []);
      r.innerHTML = `
        <div class="row-idx">${String(i+1).padStart(2,'0')}</div>
        <div class="row-body"><div class="row-title" style="white-space:normal; font-weight:500;">${esc(t)}</div></div>
        <div class="row-trail">${iconHTML('arrowR')}</div>
      `;
      return r;
    }));
    wb.appendChild(wl);
    el.append(wb);

    // Prioritäten
    const pb = h('div', { class: 'band' }, []);
    pb.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge accent">${iconHTML('flame')}</span><span class="kicker">Prioritäten</span></div>
        <span class="count">${D.mch.prioritaeten.length}</span>
      </div>
    `;
    const priIcons = ['refresh', 'target', 'chart', 'share'];
    const pl = h('div', { class: 'path' }, D.mch.prioritaeten.map((t, i) => {
      const st = h('div', { class: 'path-step' }, []);
      st.innerHTML = `
        <div class="path-num">${String(i+1).padStart(2,'0')}</div>
        <div>
          <div class="path-title">${iconHTML(priIcons[i] || 'dot')} <span style="font-size:14.5px; font-weight:600;">Ziel</span></div>
          <div class="path-text">${esc(t)}</div>
        </div>
      `;
      return st;
    }));
    pb.appendChild(pl);
    el.append(pb);

    // Ressourcen
    const rb = h('div', { class: 'band' }, []);
    rb.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge">${iconHTML('book')}</span><span class="kicker">Agentur-Ressourcen</span></div>
        <span class="count">${D.mch.ressourcen.length}</span>
      </div>
    `;
    const rl = h('div', { class: 'ledger' }, D.mch.ressourcen.map((res, i) => {
      const r = h('div', { class: 'row has-icon', onclick: () => openLink(res.url) }, []);
      r.innerHTML = `
        <div class="row-icon">${iconHTML('book')}</div>
        <div class="row-body"><div class="row-title">${esc(res.title)}</div><div class="row-sub">${esc(res.autor)}</div></div>
        <div class="row-trail">${iconHTML('external')}</div>
      `;
      return r;
    }));
    rb.appendChild(rl);
    el.append(rb);
  }

  /* ---------------- Plattformen ---------------- */
  function renderPlattformen(el) {
    const hero = h('div', { class: 'hero' }, []);
    hero.innerHTML = `
      <div class="hero-eyebrow">
        <span class="eb-left">${iconHTML('network')} № 05 — Kanäle</span>
        <span class="eb-right">Priorisiert ${iconHTML('filter')}</span>
      </div>
      <h1 class="hero-display"><span class="cut">Reihenfolge</span><span class="cut"><em>statt Streuung.</em></span></h1>
      <div class="hero-sub"><div class="hero-sub-num">04</div><div class="hero-sub-text">Plattformen in absteigender Priorität — LinkedIn zuerst, dann Malt, Upwork, Xing.</div></div>
    `;
    el.append(hero);

    const pb = h('div', { class: 'band' }, []);
    pb.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge accent">${iconHTML('network')}</span><span class="kicker">Plattformen</span></div>
        <span class="count">${D.plattformen.length}</span>
      </div>
    `;
    D.plattformen.forEach(p => {
      const c = h('div', { class: 'card' }, []);
      c.innerHTML = `
        <div class="card-row-top">
          <div class="card-rating">${iconHTML('flame')} Priorität № ${String(p.prio).padStart(2,'0')}</div>
        </div>
        <h3 class="card-title">${esc(p.name)}</h3>
        <div class="card-desc">${esc(p.desc)}</div>
      `;
      const star = h('button', {
        class: 'star-btn' + (isFav(p.id) ? ' on' : ''),
        onclick: (e) => { e.stopPropagation(); toggleFav(p.id); }
      }, []);
      star.innerHTML = iconHTML(isFav(p.id) ? 'starFilled' : 'star');
      c.querySelector('.card-row-top').appendChild(star);

      const pillRow = h('div', { class: 'pill-row' }, []);
      const webBtn = h('button', { class: 'pill', onclick: () => openLink(p.url) }, []);
      webBtn.innerHTML = `${iconHTML('desktop')} Web öffnen`;
      pillRow.appendChild(webBtn);
      if (p.scheme) {
        const appBtn = h('button', { class: 'pill accent', onclick: () => openLink(p.url, p.scheme) }, []);
        appBtn.innerHTML = `${iconHTML('phone')} App öffnen`;
        pillRow.appendChild(appBtn);
      }
      c.appendChild(pillRow);
      pb.appendChild(c);
    });
    el.append(pb);
  }

  /* ---------------- Apps ---------------- */
  function renderApps(el) {
    const hero = h('div', { class: 'hero' }, []);
    hero.innerHTML = `
      <div class="hero-eyebrow">
        <span class="eb-left">${iconHTML('grid')} № 06 — Tool Stack</span>
        <span class="eb-right">${D.apps.length} Apps ${iconHTML('zap')}</span>
      </div>
      <h1 class="hero-display"><span class="cut">Daily</span><span class="cut"><em>Arsenal.</em></span></h1>
      <div class="hero-sub"><div class="hero-sub-num">${D.apps.length}</div><div class="hero-sub-text">Täglich genutzte Apps, gruppiert. Tap öffnet je nach Einstellung Web oder App.</div></div>
    `;
    el.append(hero);

    const cats = ['AI', 'Trading', 'SEO', 'Creative', 'Business', 'Google', 'Social', 'Sport', 'Car'];
    cats.forEach(cat => {
      const apps = D.apps.filter(a => a.cat === cat);
      if (!apps.length) return;
      const b = h('div', { class: 'band' }, []);
      b.innerHTML = `
        <div class="band-head">
          <div class="band-head-l">
            <span class="ibadge">${iconHTML(CAT_ICON[cat] || 'grid')}</span>
            <span class="kicker">${esc(cat)}</span>
          </div>
          <span class="count">${String(apps.length).padStart(2,'0')}</span>
        </div>
      `;
      const grid = h('div', { class: 'app-grid' }, apps.map(a => {
        const ic = h('div', { class: 'app-icon' + (a.star ? ' star' : ''), style: { background: a.color, color: a.textColor || '#fff' } }, a.initials);
        return h('button', { class: 'app-tile', onclick: () => openLink(a.url, a.scheme) }, [
          ic,
          h('div', { class: 'app-label' }, a.name)
        ]);
      }));
      // Fill grid to multiple of 4 for clean edges
      const rem = apps.length % 4;
      if (rem) {
        for (let i = 0; i < 4 - rem; i++) {
          const filler = h('div', { class: 'app-tile', style: { pointerEvents: 'none' } }, []);
          grid.appendChild(filler);
        }
      }
      b.appendChild(grid);
      el.append(b);
    });
  }

  /* ---------------- Learn ---------------- */
  function renderLearn(el) {
    const hero = h('div', { class: 'hero' }, []);
    const totalBooks = D.buecherPM.length + D.buecherStrategie.length + D.buecherMarketing.length + D.buecherMindset.length;
    hero.innerHTML = `
      <div class="hero-eyebrow">
        <span class="eb-left">${iconHTML('book')} № 07 — Learning</span>
        <span class="eb-right">Bibliothek ${iconHTML('eye')}</span>
      </div>
      <h1 class="hero-display"><span class="cut">Bücher,</span><span class="cut"><em>Podcasts,</em></span><span class="cut">Kurse.</span></h1>
      <div class="hero-sub"><div class="hero-sub-num">${totalBooks}</div><div class="hero-sub-text">Kernbücher plus Newsletter, Podcasts, Kurse und Referenz-Blogs — alles mit Direktlink.</div></div>
    `;
    el.append(hero);

    const bookSect = (kicker, items, iconName) => {
      const b = h('div', { class: 'band' }, []);
      b.innerHTML = `
        <div class="band-head">
          <div class="band-head-l"><span class="ibadge">${iconHTML(iconName)}</span><span class="kicker">${esc(kicker)}</span></div>
          <span class="count">${String(items.length).padStart(2,'0')}</span>
        </div>
      `;
      const l = h('div', { class: 'ledger' }, items.map((it, i) => {
        const r = h('div', { class: 'row', onclick: () => openLink(it.url) }, []);
        const star = it.star ? `<span class="star-tag">${iconHTML('starFilled')}</span>` : '';
        r.innerHTML = `
          <div class="row-idx">${String(i+1).padStart(2,'0')}</div>
          <div class="row-body">
            <div class="row-title">${esc(it.title || it.name)} ${star}</div>
            <div class="row-sub">${esc(it.autor || it.topic || '')}${it.note ? ' · '+esc(it.note) : ''}</div>
          </div>
          <div class="row-trail">${iconHTML('external')}</div>
        `;
        return r;
      }));
      b.appendChild(l);
      return b;
    };

    el.append(bookSect('Bücher · PM',         D.buecherPM,         'book'));
    el.append(bookSect('Bücher · Strategie',  D.buecherStrategie,  'target'));
    el.append(bookSect('Bücher · Marketing',  D.buecherMarketing,  'trending'));
    el.append(bookSect('Bücher · Mindset',    D.buecherMindset,    'sparkles'));
    el.append(bookSect('Newsletter',          D.newsletter,        'radio'));
    el.append(bookSect('Podcasts',            D.podcasts,          'play'));
    el.append(bookSect('Kurse & Communities', D.kurse,             'briefcase'));
    el.append(bookSect('Referenz-Blogs',      D.blogs,             'link'));
  }

  /* ---------------- Plan ---------------- */
  function renderPlan(el) {
    const total = Object.values(D.checklist).reduce((s, a) => s + a.length, 0);
    const done = Object.keys(state.checks).filter(k => state.checks[k]).length;
    const pct = Math.round(done/total*100) || 0;

    const hero = h('div', { class: 'hero' }, []);
    hero.innerHTML = `
      <div class="hero-eyebrow">
        <span class="eb-left">${iconHTML('checkSq')} № 08 — Plan</span>
        <span class="eb-right">${done} / ${total} ${iconHTML('check')}</span>
      </div>
      <h1 class="hero-display"><span class="cut">Der Kompass</span><span class="cut"><em>in Wochen.</em></span></h1>
      <div class="hero-sub"><div class="hero-sub-num">${pct}<span class="pct">%</span></div><div class="hero-sub-text">Status synchronisiert zwischen Sessions — Tap haptic toggled, Fortschritt bleibt.</div></div>
    `;
    el.append(hero);

    const phases = [
      { key: '30',  label: 'Nächste 30 Tage', icon: 'calendar' },
      { key: '60',  label: '60 Tage',         icon: 'calendar' },
      { key: '90',  label: '90 Tage',         icon: 'calendar' },
      { key: '365', label: '12 Monate',       icon: 'target'   }
    ];
    phases.forEach((p, idx) => {
      const prog = phaseProgress(p.key);
      const invert = idx % 2 === 1;
      const b = h('div', { class: 'band' + (invert ? ' invert' : '') }, []);
      b.innerHTML = `
        <div class="band-head">
          <div class="band-head-l">
            <span class="ibadge ${invert ? 'accent' : ''}">${iconHTML(p.icon)}</span>
            <span class="kicker">${esc(p.label)}</span>
          </div>
          <span class="count">${prog.done} / ${prog.total}</span>
        </div>
        <div style="padding: 0 18px 14px;">
          <div class="progress"><div class="progress-fill" style="width:${prog.pct}%"></div></div>
          <div class="small-meta" style="margin-top:8px;${invert ? 'color:rgba(239,234,225,0.6);' : ''}">${iconHTML('checkSq')} ${prog.pct}% erledigt</div>
        </div>
      `;
      D.checklist[p.key].forEach((t, i) => {
        const r = h('div', { class: 'check-row' + (isDone(p.key, i) ? ' done' : ''), onclick: () => toggleCheck(p.key, i) }, []);
        r.innerHTML = `
          <div class="check-circle"></div>
          <div class="check-text">${esc(t)}</div>
          <div class="check-meta">${p.key === '365' ? '1Y' : p.key + 'D'}</div>
        `;
        b.appendChild(r);
      });
      el.append(b);
    });

    // Review
    const rb = h('div', { class: 'band' }, []);
    rb.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge">${iconHTML('refresh')}</span><span class="kicker">Review-Rhythmus</span></div>
        <span class="count">${D.profile.review.length}</span>
      </div>
    `;
    const rIcons = ['calendar', 'calendar', 'clock', 'refresh'];
    const rl = h('div', { class: 'ledger' }, D.profile.review.map((r, i) => {
      const row = h('div', { class: 'row has-icon' }, []);
      row.innerHTML = `
        <div class="row-icon">${iconHTML(rIcons[i] || 'refresh')}</div>
        <div class="row-body">
          <div class="row-title">${esc(r.cadence)}</div>
          <div class="row-sub wrap">${esc(r.time)} · ${esc(r.task)}</div>
        </div>
        <div class="row-trail">${iconHTML('refresh')}</div>
      `;
      return row;
    }));
    rb.appendChild(rl);
    el.append(rb);
  }

  /* Favoriten resolver */
  function resolveFavs() {
    const res = [];
    for (const id of state.favs) {
      const pfad = D.karrierepfade.find(p => p.id === id);
      if (pfad) { res.push({ id, title: pfad.title, sub: pfad.desc, group: 'karriere' }); continue; }
      const plat = D.plattformen.find(p => p.id === id);
      if (plat) { res.push({ id, title: plat.name, sub: plat.desc, group: 'plattformen' }); continue; }
    }
    return res;
  }

  /* ==========================================================================
     SEARCH
     ========================================================================== */
  function renderSearch() {
    const el = document.getElementById('screen-search');
    el.innerHTML = '';
    el.append(mast('Spotlight', 'Alle Module', { leftIcon: 'search', rightIcon: 'layers' }));

    const hero = h('div', { class: 'hero' }, []);
    hero.innerHTML = `
      <div class="hero-eyebrow">
        <span class="eb-left">${iconHTML('search')} № — Suche</span>
        <span class="eb-right">Live-Filter ${iconHTML('filter')}</span>
      </div>
      <h1 class="hero-display"><span class="cut">Alles,</span><span class="cut"><em>ein Feld.</em></span></h1>
    `;
    el.append(hero);

    const sf = h('div', { class: 'search-field' }, []);
    sf.innerHTML = `
      <div class="search-inner">
        ${iconHTML('search')}
        <input id="search-input" type="text" placeholder="Module, Bücher, Apps, Jobs…" value="${esc(state.searchQ)}" />
        <span class="search-clear" id="search-clear" style="display:${state.searchQ ? 'flex' : 'none'};">${iconHTML('x')}</span>
      </div>
    `;
    el.append(sf);

    const results = h('div', { id: 'search-results' }, []);
    el.append(results);

    sf.querySelector('#search-input').addEventListener('input', e => {
      state.searchQ = e.target.value;
      sf.querySelector('#search-clear').style.display = state.searchQ ? 'flex' : 'none';
      renderSearchResults();
    });
    sf.querySelector('#search-clear').addEventListener('click', () => {
      state.searchQ = '';
      const inp = sf.querySelector('#search-input');
      inp.value = ''; inp.focus();
      sf.querySelector('#search-clear').style.display = 'none';
      renderSearchResults();
    });
    renderSearchResults();
  }

  let _idx = null;
  function buildSearchIndex() {
    const out = [];
    D.karrierepfade.forEach(p  => out.push({ kind: 'Karriere',        iconName: 'trending',  title: p.title, sub: p.desc, tags: p.tags.join(' '), group: 'karriere',    url: null }));
    D.apmProgramme.forEach(p   => out.push({ kind: 'APM-Programm',    iconName: 'briefcase', title: p.name,  sub: p.program, tags: 'pm apm',       group: 'karriere',    url: p.url }));
    D.jobBoards.forEach(j      => out.push({ kind: 'Job-Board',       iconName: 'briefcase', title: j.name,  sub: j.focus, tags: 'jobs',           group: 'karriere',    url: j.url }));
    D.plattformen.forEach(p    => out.push({ kind: 'Plattform',       iconName: 'network',   title: p.name,  sub: p.desc, tags: 'kanal',           group: 'plattformen', url: p.url, scheme: p.scheme }));
    D.apps.forEach(a           => out.push({ kind: 'App · ' + a.cat,  iconName: CAT_ICON[a.cat] || 'grid', title: a.name, sub: '', tags: a.cat,    group: 'apps',        url: a.url, scheme: a.scheme }));
    D.buecherPM.forEach(b       => out.push({ kind: 'Buch · PM',        iconName: 'book',      title: b.title, sub: b.autor, tags: 'buch pm',        group: 'learn',       url: b.url }));
    D.buecherStrategie.forEach(b=> out.push({ kind: 'Buch · Strategie', iconName: 'book',      title: b.title, sub: b.autor, tags: 'buch strategie', group: 'learn',       url: b.url }));
    D.buecherMarketing.forEach(b=> out.push({ kind: 'Buch · Marketing', iconName: 'book',      title: b.title, sub: b.autor, tags: 'buch marketing', group: 'learn',       url: b.url }));
    D.buecherMindset.forEach(b  => out.push({ kind: 'Buch · Mindset',   iconName: 'book',      title: b.title, sub: b.autor, tags: 'buch mindset',   group: 'learn',       url: b.url }));
    D.newsletter.forEach(n      => out.push({ kind: 'Newsletter',       iconName: 'radio',     title: n.name,  sub: n.topic, tags: 'newsletter',     group: 'learn',       url: n.url }));
    D.podcasts.forEach(p        => out.push({ kind: 'Podcast',          iconName: 'play',      title: p.name,  sub: p.topic, tags: 'podcast',        group: 'learn',       url: p.url }));
    D.kurse.forEach(k           => out.push({ kind: 'Kurs',             iconName: 'briefcase', title: k.name,  sub: k.topic, tags: 'kurs',           group: 'learn',       url: k.url }));
    D.blogs.forEach(b           => out.push({ kind: 'Blog',             iconName: 'link',      title: b.name,  sub: '',      tags: 'blog',           group: 'learn',       url: b.url }));
    D.mch.ressourcen.forEach(r  => out.push({ kind: 'MCH-Ressource',    iconName: 'building',  title: r.title, sub: r.autor, tags: 'mch',            group: 'mch',         url: r.url }));
    Object.entries(D.checklist).forEach(([phase, arr]) => {
      arr.forEach(t => out.push({ kind: 'Plan · ' + phase, iconName: 'checkSq', title: t, sub: phase + ' Tage', tags: 'plan', group: 'plan', url: null }));
    });
    return out;
  }

  function renderSearchResults() {
    const q = state.searchQ.trim().toLowerCase();
    const results = document.getElementById('search-results');
    if (!results) return;
    results.innerHTML = '';
    if (!q) {
      const e = h('div', { class: 'search-empty' }, []);
      e.innerHTML = `
        <div class="big-icon">${iconHTML('search')}</div>
        <div class="big">Tippe<br><em>irgendwas.</em></div>
        <div class="small">${iconHTML('book')} Bücher · ${iconHTML('grid')} Apps · ${iconHTML('trending')} Pfade · ${iconHTML('checkSq')} Checks</div>
      `;
      results.appendChild(e);
      return;
    }
    if (!_idx) _idx = buildSearchIndex();
    const matches = _idx.filter(m => {
      const hay = (m.title + ' ' + m.sub + ' ' + m.tags + ' ' + m.kind).toLowerCase();
      return q.split(/\s+/).every(t => hay.includes(t));
    }).slice(0, 80);

    if (!matches.length) {
      const e = h('div', { class: 'search-empty' }, []);
      e.innerHTML = `
        <div class="big-icon">${iconHTML('info')}</div>
        <div class="big"><em>Null</em><br>Treffer.</div>
        <div class="small">Anderes Stichwort probieren</div>
      `;
      results.appendChild(e);
      return;
    }

    const byKind = {};
    matches.forEach(m => { (byKind[m.kind] ||= []).push(m); });
    Object.entries(byKind).forEach(([kind, items]) => {
      const b = h('div', { class: 'band' }, []);
      b.innerHTML = `
        <div class="band-head">
          <div class="band-head-l"><span class="ibadge">${iconHTML(items[0].iconName || 'dot')}</span><span class="kicker">${esc(kind)}</span></div>
          <span class="count">${String(items.length).padStart(2,'0')}</span>
        </div>
      `;
      const l = h('div', { class: 'ledger' }, items.map((m, i) => {
        const r = h('div', {
          class: 'row has-icon',
          onclick: () => {
            if (m.url) openLink(m.url, m.scheme);
            else if (m.group) { state.activeGroup = m.group; LS.set(LS_KEYS.group, m.group); setTab('module'); }
          }
        }, []);
        r.innerHTML = `
          <div class="row-icon">${iconHTML(m.iconName || 'dot')}</div>
          <div class="row-body">
            <div class="row-title">${esc(m.title)}</div>
            ${m.sub ? `<div class="row-sub">${esc(m.sub)}</div>` : ''}
          </div>
          <div class="row-trail">${iconHTML(m.url ? 'external' : 'chevronR')}</div>
        `;
        return r;
      }));
      b.appendChild(l);
      results.appendChild(b);
    });
  }

  /* ==========================================================================
     SETTINGS
     ========================================================================== */
  function renderSettings() {
    const el = document.getElementById('screen-settings');
    el.innerHTML = '';
    el.append(mast('System', 'Einstellungen', { leftIcon: 'settings', rightIcon: 'settings' }));

    const hero = h('div', { class: 'hero' }, []);
    hero.innerHTML = `
      <div class="hero-eyebrow">
        <span class="eb-left">${iconHTML('settings')} № — System</span>
        <span class="eb-right">Konfiguration ${iconHTML('dots')}</span>
      </div>
      <h1 class="hero-display"><span class="cut">Hebel</span><span class="cut"><em>& Regler.</em></span></h1>
    `;
    el.append(hero);

    // Theme -----------------------------------------------------------
    const tb = h('div', { class: 'band' }, []);
    tb.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge">${iconHTML(state.theme === 'dark' ? 'moon' : 'sun')}</span><span class="kicker">Darstellung</span></div>
        <span class="count">Theme</span>
      </div>
    `;
    const trow = h('div', {
      class: 'row has-icon',
      onclick: () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        LS.set(LS_KEYS.theme, state.theme);
        applyTheme();
        renderSettings();
      }
    }, []);
    trow.innerHTML = `
      <div class="row-icon ${state.theme === 'dark' ? 'invert' : ''}">${iconHTML(state.theme === 'dark' ? 'moon' : 'sun')}</div>
      <div class="row-body">
        <div class="row-title">Dark Mode</div>
        <div class="row-sub">${state.theme === 'dark' ? 'aktiv · Nacht-Palette' : 'inaktiv · Papier-Palette'}</div>
      </div>
      <div class="switch${state.theme === 'dark' ? ' on' : ''}"></div>
    `;
    tb.appendChild(trow);
    el.append(tb);

    // Link pref -------------------------------------------------------
    const lb = h('div', { class: 'band' }, []);
    lb.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge">${iconHTML('link')}</span><span class="kicker">Link-Verhalten</span></div>
        <span class="count">Auto · Web · App</span>
      </div>
    `;
    const lbody = h('div', { style: { padding: '4px 18px 18px' } }, []);
    lbody.innerHTML = `<div style="font-size:13.5px; color:var(--ink-2); line-height:1.45; margin-bottom:12px;">Öffnen Links in nativen App-Schemes oder immer im Browser?</div>`;
    const seg = h('div', { class: 'seg' }, []);
    seg.innerHTML = `
      <button class="${state.linkPref === 'auto' ? 'on' : ''}" data-v="auto">${iconHTML('radio')} Auto</button>
      <button class="${state.linkPref === 'web'  ? 'on' : ''}" data-v="web">${iconHTML('desktop')} Web</button>
      <button class="${state.linkPref === 'app'  ? 'on' : ''}" data-v="app">${iconHTML('phone')} App</button>
    `;
    seg.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => setLinkPref(btn.dataset.v));
    });
    lbody.appendChild(seg);
    const note = h('div', { style: { fontFamily: 'var(--f-mono)', fontSize: '10px', letterSpacing: '0.08em', color: 'var(--ink-3)', marginTop: '10px', textTransform: 'uppercase', display:'inline-flex', alignItems:'center', gap:'5px' } }, []);
    note.innerHTML = `${iconHTML('info')} ${
      state.linkPref === 'auto' ? 'Device-basiert — empfohlen' :
      state.linkPref === 'web'  ? 'Immer Browser' :
                                  'Immer App-Scheme'
    }`;
    lbody.appendChild(note);
    lb.appendChild(lbody);
    el.append(lb);

    // Profile tag -----------------------------------------------------
    const pb = h('div', { class: 'band' }, []);
    pb.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge">${iconHTML('user')}</span><span class="kicker">Profil</span></div>
        <span class="count">Onboarding</span>
      </div>
    `;
    const pbody = h('div', { style: { padding: '16px 18px' } }, []);
    const tag = state.onboard?.tag || null;
    pbody.innerHTML = `<div class="small-meta" style="margin-bottom:10px;">${iconHTML('info')} Aktueller Profil-Tag</div>`;
    if (tag) {
      const t = h('span', { class: 'tag accent' }, []);
      t.innerHTML = `${iconHTML('starFilled')} ${esc(tag)}`;
      pbody.appendChild(t);
    } else {
      pbody.appendChild(h('span', { class: 'small-meta' }, '— noch nicht gesetzt —'));
    }
    const restart = h('button', { class: 'pill ghost', style: { marginTop: '14px', height: '44px' }, onclick: () => startOnboard() }, []);
    restart.innerHTML = `${iconHTML('refresh')} Onboarding neu starten`;
    pbody.appendChild(h('div', {}, [restart]));
    pb.appendChild(pbody);
    el.append(pb);

    // Daten -----------------------------------------------------------
    const db = h('div', { class: 'band' }, []);
    db.innerHTML = `
      <div class="band-head">
        <div class="band-head-l"><span class="ibadge">${iconHTML('trash')}</span><span class="kicker">Daten</span></div>
        <span class="count">localStorage</span>
      </div>
    `;
    const dl = h('div', { class: 'ledger' }, [
      (() => {
        const r = h('div', { class: 'row has-icon', onclick: () => { if (confirm('Favoriten zurücksetzen?')) { state.favs = []; LS.set(LS_KEYS.favs, []); renderAll(); } } }, []);
        r.innerHTML = `
          <div class="row-icon">${iconHTML('starFilled')}</div>
          <div class="row-body"><div class="row-title">Favoriten löschen</div><div class="row-sub">${state.favs.length} gespeichert</div></div>
          <div class="row-trail">${iconHTML('trash')}</div>
        `;
        return r;
      })(),
      (() => {
        const r = h('div', { class: 'row has-icon', onclick: () => { if (confirm('Checkliste zurücksetzen?')) { state.checks = {}; LS.set(LS_KEYS.checklist, {}); renderAll(); } } }, []);
        r.innerHTML = `
          <div class="row-icon">${iconHTML('checkSq')}</div>
          <div class="row-body"><div class="row-title">Checkliste zurücksetzen</div><div class="row-sub">30 / 60 / 90 / 365</div></div>
          <div class="row-trail">${iconHTML('trash')}</div>
        `;
        return r;
      })(),
      (() => {
        const r = h('div', { class: 'row has-icon', onclick: () => { if (confirm('Alles löschen?')) { Object.values(LS_KEYS).forEach(k => { try { localStorage.removeItem(k); } catch {} }); location.reload(); } } }, []);
        r.innerHTML = `
          <div class="row-icon soft">${iconHTML('flame')}</div>
          <div class="row-body"><div class="row-title" style="color:var(--accent);">Alles zurücksetzen</div><div class="row-sub">inkl. Onboarding, Theme</div></div>
          <div class="row-trail accent">${iconHTML('trash')}</div>
        `;
        return r;
      })()
    ]);
    db.appendChild(dl);
    el.append(db);

    // Colophon --------------------------------------------------------
    const cb = h('div', { class: 'band invert' }, []);
    cb.innerHTML = `
      <div style="padding:44px 22px; text-align:center;">
        <div style="display:inline-flex; align-items:center; gap:10px; color:var(--accent); margin-bottom:12px;">${iconHTML('compass', 'icon-lg')}</div>
        <div style="font-family:var(--f-display); font-weight:800; font-size:44px; line-height:0.95; letter-spacing:-0.035em; margin-bottom:6px;">KOMPASS</div>
        <div style="font-family:var(--f-serif); font-style:italic; font-size:22px; color:var(--accent); margin-bottom:16px;">editorial edition</div>
        <div class="small-meta" style="color:rgba(239,234,225,0.5); justify-content:center;">${iconHTML('info')} v3.1 · April 2026 · Single-File PWA</div>
      </div>
    `;
    el.append(cb);

    el.append(h('div', { class: 'spacer' }));
  }

  function setLinkPref(p) {
    state.linkPref = p;
    LS.set(LS_KEYS.linkPref, p);
    renderSettings();
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    const mc = document.querySelector('meta[name="theme-color"]');
    if (mc) mc.setAttribute('content', state.theme === 'dark' ? '#0A0906' : '#EFEAE1');
  }

  /* ==========================================================================
     ONBOARDING
     ========================================================================== */
  const questions = [
    {
      kicker: 'Frage 01 / 05',
      q: 'Was <em>treibt</em> dich gerade am meisten?',
      sub: 'Kein Entweder-Oder — wähle, was aktuell am lautesten ist.',
      opts: [
        { key: 'build',    title: 'Etwas <em>bauen.</em>',     sub: 'Projekt, Produkt, Business',  icon: 'package' },
        { key: 'learn',    title: 'Etwas <em>verstehen.</em>', sub: 'Neues Feld, tiefe Skills',    icon: 'book' },
        { key: 'connect',  title: 'Menschen <em>erreichen.</em>', sub: 'Kunden, Community, Netzwerk', icon: 'share' },
        { key: 'clarify',  title: 'Richtung <em>finden.</em>', sub: 'Optionen sortieren',          icon: 'compass' }
      ],
      key: 'driver'
    },
    {
      kicker: 'Frage 02 / 05',
      q: 'Wie <em>denkst</em> du am liebsten?',
      sub: 'Wie verarbeitest du Informationen — nicht was du gerade tust.',
      opts: [
        { key: 'systems', title: 'In <em>Systemen.</em>',   sub: 'Zusammenhänge, Muster',     icon: 'network' },
        { key: 'stories', title: 'In <em>Geschichten.</em>', sub: 'Menschen, Szenen, Motive', icon: 'book' },
        { key: 'numbers', title: 'In <em>Zahlen.</em>',     sub: 'Daten, Wahrscheinlichkeit', icon: 'chart' },
        { key: 'visual',  title: 'In <em>Bildern.</em>',    sub: 'Proportion, Komposition',   icon: 'palette' }
      ],
      key: 'thinking'
    },
    {
      kicker: 'Frage 03 / 05',
      q: 'Was <em>bremst</em> dich?',
      sub: 'Ehrlich — was passiert immer wieder?',
      opts: [
        { key: 'breadth', title: 'Zu <em>viele</em> Baustellen', sub: 'Fokus verliert sich',       icon: 'layers' },
        { key: 'depth',   title: 'Zu <em>wenig</em> Tiefe',      sub: 'Immer bei 50% Stopp',       icon: 'target' },
        { key: 'output',  title: 'Zu <em>wenig</em> im Raum',    sub: 'Gute Arbeit, keiner sieht sie', icon: 'eye' },
        { key: 'nothing', title: 'Nichts, <em>läuft.</em>',      sub: 'Momentum ist da',           icon: 'flame' }
      ],
      key: 'block'
    },
    {
      kicker: 'Frage 04 / 05',
      q: 'Wie sollen <em>Links</em> öffnen?',
      sub: 'Technik-Voreinstellung.',
      opts: [
        { key: 'auto', title: '<em>Auto</em>',        sub: 'Device-basiert entscheiden', icon: 'radio' },
        { key: 'web',  title: 'Immer <em>Web</em>',   sub: 'Browser-Tab',                icon: 'desktop' },
        { key: 'app',  title: 'Immer <em>App</em>',   sub: 'Wo verfügbar, native',       icon: 'phone' }
      ],
      key: 'linkPref'
    },
    {
      kicker: 'Frage 05 / 05',
      q: '<em>Dunkel</em> oder hell?',
      sub: 'Darstellung. Jederzeit umschaltbar.',
      opts: [
        { key: 'light', title: '<em>Papier.</em>', sub: 'Beige / Off-White', icon: 'sun' },
        { key: 'dark',  title: '<em>Nacht.</em>',  sub: 'Schwarz-Basis',      icon: 'moon' }
      ],
      key: 'theme'
    }
  ];

  function computeTag(ans) {
    const d = ans.driver;
    if (d === 'build')   return 'builder';
    if (d === 'learn')   return 'learner';
    if (d === 'connect') return 'strategist';
    return 'explorer';
  }

  function startOnboard() {
    const box = document.getElementById('onboard');
    const step = { i: 0, ans: {} };
    function render() {
      const q = questions[step.i];
      box.innerHTML = '';

      const head = h('div', { class: 'onboard-head' }, []);
      head.innerHTML = `
        <div class="onboard-brand">${iconHTML('compass')} KOMPASS</div>
        <div class="onboard-step">${esc(q.kicker)}</div>
      `;

      // Progress bar
      const prog = h('div', { class: 'onboard-prog' }, []);
      questions.forEach((_, i) => {
        prog.appendChild(h('span', { class: i <= step.i ? 'on' : '' }, []));
      });

      const kicker = h('div', { class: 'onboard-kicker' }, []);
      kicker.innerHTML = `${iconHTML('sparkles')} Profil-Setup`;

      const qEl = h('div', { class: 'onboard-q' }, []);
      qEl.innerHTML = q.q;

      const qsub = h('div', { class: 'onboard-qsub' }, q.sub);

      const opts = h('div', { class: 'onboard-opts' }, q.opts.map(o => {
        const sel = step.ans[q.key] === o.key;
        const b = h('button', {
          class: 'opt' + (sel ? ' sel' : ''),
          onclick: () => { step.ans[q.key] = o.key; render(); }
        }, []);
        b.innerHTML = `
          <div class="opt-body">
            <div class="opt-title">${iconHTML(o.icon)} ${o.title}</div>
            <div class="opt-sub">${esc(o.sub)}</div>
          </div>
          <div class="opt-check">${iconHTML('check')}</div>
        `;
        return b;
      }));

      const back = step.i > 0 ? (() => {
        const b = h('button', { class: 'btn-big ghost', onclick: () => { step.i--; render(); } }, []);
        b.innerHTML = `${iconHTML('arrowL')} Zurück`;
        return b;
      })() : null;
      const next = (() => {
        const b = h('button', { class: 'btn-big', disabled: !step.ans[q.key], onclick: () => {
          if (step.i < questions.length - 1) { step.i++; render(); }
          else finish();
        } }, []);
        const isLast = step.i === questions.length - 1;
        b.innerHTML = isLast ? `Fertig ${iconHTML('check')}` : `Weiter ${iconHTML('arrowR')}`;
        return b;
      })();
      const footer = h('div', { class: 'onboard-footer' }, [back, next].filter(Boolean));

      box.append(head, prog, kicker, qEl, qsub, opts, footer);
    }
    function finish() {
      const tag = computeTag(step.ans);
      state.onboard = { tag, answers: step.ans, ts: Date.now() };
      LS.set(LS_KEYS.onboard, state.onboard);
      if (step.ans.linkPref) { state.linkPref = step.ans.linkPref; LS.set(LS_KEYS.linkPref, state.linkPref); }
      if (step.ans.theme) { state.theme = step.ans.theme; LS.set(LS_KEYS.theme, state.theme); applyTheme(); }
      box.style.display = 'none';
      renderAll();
    }
    box.style.display = 'flex';
    render();
  }

  /* ==========================================================================
     BOOT
     ========================================================================== */
  function renderAll() {
    renderHome();
    renderModule();
    renderSearch();
    renderSettings();
  }

  function boot() {
    applyTheme();
    hydrateTabIcons();
    document.querySelectorAll('.tab').forEach(b => b.addEventListener('click', () => setTab(b.dataset.tab)));
    renderAll();
    setTab(state.tab || 'home');
    if (!state.onboard) startOnboard();
  }
  document.addEventListener('DOMContentLoaded', boot);
})();
