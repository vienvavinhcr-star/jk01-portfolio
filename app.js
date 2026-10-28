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
    name.append(make('span', '', ` / ${person.alias || 'JustKing'}`));
    document.querySelector('#profileBio').textContent = person.bio || '';
    document.querySelector('#profileLocation').textContent = person.location || '';
    const github = https(person.github);
    if (github) document.querySelector('#githubLink').href = github;
    if (person.photo) {
      const photo = new Image(); photo.alt = ''; photo.className = 'profile-photo';
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
      link.append(logoWrap, label, arrow); group.append(link);
      if (Array.isArray(project.extraLinks)) {
        const related = make('div', 'related-links');
        project.extraLinks.forEach(extra => {
          const href = https(extra.url); if (!href) return;
          const secondary = external('related-link', href, extra.label);
          const icon = make('span', 'facebook-mark', 'f'); icon.setAttribute('aria-hidden', 'true');
          const arrow = make('span', 'related-arrow', '↗'); arrow.setAttribute('aria-hidden', 'true');
          secondary.append(icon, make('span', '', extra.label), arrow); related.append(secondary);
        });
        group.append(related);
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
