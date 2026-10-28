(() => {
  'use strict';
  const data = window.JK_DATA;
  const make = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text != null) el.textContent = text;
    return el;
  };
  const https = value => {
    try { const url = new URL(value); return url.protocol === 'https:' ? url.href : ''; }
    catch { return ''; }
  };
  const external = (className, url, label) => {
    const link = make('a', className);
    link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `${label} (opens in a new tab)`);
    return link;
  };
  if (data && Array.isArray(data.projects)) {
    const person = data.person || {};
    const name = document.querySelector('#profileName');
    name.replaceChildren(document.createTextNode(person.name || 'Justin'));
    document.querySelector('#profileLocation').textContent = person.location || '';
    const github = https(person.github);
    if (github) document.querySelector('#githubLink').href = github;
    if (person.photo) {
      const photo = new Image(); photo.alt = 'Justin’s chosen profile photo'; photo.className = 'profile-photo';
      photo.addEventListener('load', () => document.querySelector('#avatar').replaceChildren(photo), {once:true});
      photo.src = person.photo;
    }
    const grid = document.querySelector('#projectGrid');
    data.projects.forEach(project => {
      const url = https(project.url); if (!url) return;
      const group = make('article', `project-group theme-${project.id}`);
      const link = external('project-card', url, project.name);
      const logoWrap = make('span', 'project-logo');
      const fallback = make('span', 'logo-fallback', project.name.slice(0,1));
      const logo = new Image(); logo.alt = ''; logo.width = 54; logo.height = 54;
      logo.decoding = 'async';
      logo.addEventListener('error', () => logo.remove(), {once:true});
      logo.src = project.logo;
      logoWrap.append(fallback, logo);
      const label = make('span', 'project-label');
      label.append(make('h2', '', project.name), make('span', 'project-subtitle', project.subtitle));
      const arrow = make('span', 'card-arrow', '↗'); arrow.setAttribute('aria-hidden', 'true');
      const art = make('span', `card-art art-${project.id}`);
      art.setAttribute('aria-hidden', 'true');
      const graphics = {
        signaldesk: '<svg viewBox="0 0 200 100" fill="none"><path d="M0 80 23 66 39 74 61 48 78 54 100 24 122 37 146 12 169 29 200 4" stroke="currentColor" stroke-width="1.5"/><path d="M0 98H200M0 74H200M0 50H200M0 26H200M25 0V100M75 0V100M125 0V100M175 0V100" stroke="currentColor" stroke-opacity=".15" stroke-width=".7"/></svg>',
        lexora: '<span>æ</span>',
        tapntrust: '<svg viewBox="0 0 160 100" fill="none"><circle cx="105" cy="55" r="25"/><circle cx="105" cy="55" r="44"/><circle cx="105" cy="55" r="64"/><circle cx="105" cy="55" r="84"/></svg>',
        hazelnuttunes: '<svg viewBox="0 0 180 110" fill="none"><ellipse cx="130" cy="50" rx="57" ry="68" transform="rotate(35 130 50)"/><ellipse cx="130" cy="50" rx="47" ry="58" transform="rotate(35 130 50)"/><path d="m48 23 4 10 11 4-11 4-4 10-4-10-10-4 10-4z" fill="currentColor" stroke="none"/></svg>'
      };
      art.innerHTML = graphics[project.id] || '';
      link.append(art, logoWrap, label, arrow); group.append(link);
      if (Array.isArray(project.extraLinks)) {
        group.classList.add('has-related');
        const support = make('div', 'shop-support');
        support.setAttribute('role', 'group');
        support.setAttribute('aria-label', `${project.name} support and community`);
        support.append(make('p', 'support-heading', project.extraHeading || `${project.name} support`));
        const related = make('div', 'related-links');
        project.extraLinks.forEach(extra => {
          const href = https(extra.url); if (!href) return;
          const secondary = external('related-link', href, `${project.name} — ${extra.label}`);
          const icon = make('span', 'facebook-mark', 'f'); icon.setAttribute('aria-hidden', 'true');
          const arrow = make('span', 'related-arrow', '↗'); arrow.setAttribute('aria-hidden', 'true');
          secondary.append(icon, make('span', '', extra.label), arrow); related.append(secondary);
        });
        support.append(related); group.append(support);
      }
      grid.append(group);
    });
  }

  // Deterministic, lightweight CSS stars. No canvas, video or animation library.
  let seed = 101;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const stars = document.querySelector('#stars');
  for (let i = 0; i < 95; i++) {
    const star = make('i', i % 4 === 0 ? 'star twinkle' : 'star');
    star.style.cssText = `left:${random()*100}%;top:${random()*100}%;--size:${i%9===0?2:1}px;--opacity:${.15+random()*.55};animation-delay:-${random()*8}s`;
    stars.append(star);
  }
  const button = document.querySelector('#skyToggle');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  try { paused = sessionStorage.getItem('jk01-sky-paused') === 'true'; } catch { /* Storage may be unavailable. */ }
  const syncMotion = () => {
    const stopped = paused || preference.matches;
    document.body.classList.toggle('sky-paused', stopped || document.hidden);
    button.hidden = preference.matches;
    button.setAttribute('aria-pressed', String(stopped));
    button.querySelector('span').textContent = stopped ? 'Play sky' : 'Pause sky';
  };
  button.addEventListener('click', () => {
    paused = !paused;
    try { sessionStorage.setItem('jk01-sky-paused', String(paused)); } catch { /* Optional preference only. */ }
    syncMotion();
  });
  preference.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', syncMotion);
  syncMotion();
})();
