(() => {
  'use strict';
  const source = window.JK_DATA;
  if (!source || !Array.isArray(source.projects)) return;
  const $ = s => document.querySelector(s);
  const make = (tag, css = '', label) => { const el = document.createElement(tag); if (css) el.className = css; if (label != null) el.textContent = label; return el; };
  const validUrl = value => { try { const u = new URL(value); return u.protocol === 'https:' ? u.href : ''; } catch { return ''; } };
  const p = source.person || {};
  $('#heroDescription').textContent = p.bio || '';
  $('#aboutText').textContent = p.about || '';
  $('#profileLocation').textContent = p.location || '';
  if (p.photo) {
    const photo = new Image();
    photo.alt = ''; photo.className = 'profile-photo';
    photo.addEventListener('load', () => $('#profileArt').replaceChildren(photo), { once: true });
    photo.src = p.photo;
  }
  $('#currentYear').textContent = String(new Date().getFullYear());
  $('#countAll').textContent = String(source.projects.length).padStart(2, '0');
  const github = validUrl(p.github);
  if (github) $('#githubLink').href = github;

  // Decorative art is self-contained SVG/CSS, designed for each app's visual identity.
  const graphics = {
    signal: `<div class="art art-signal"><div class="signal-browser"><div class="signal-browser-head"><span>SD / TERMINAL</span><span>RESEARCH / EXPLORE</span></div><div class="signal-grid"><div class="signal-tiny">MARKET STUDY <span>ILLUSTRATIVE VIEW</span></div><div class="signal-numbers">Signal<span> / </span>noise <small>RESEARCH FIRST</small></div><svg viewBox="0 0 520 130" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="signalFill" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#c8ef70" stop-opacity=".19"/><stop offset="1" stop-color="#c8ef70" stop-opacity="0"/></linearGradient></defs><path d="M0 100 L30 85 L57 102 L88 54 L114 72 L148 64 L174 91 L198 64 L229 75 L253 47 L287 63 L311 38 L349 56 L379 20 L420 38 L453 14 L484 35 L520 10 L520 130 L0 130Z" fill="url(#signalFill)"/><path d="M0 100 L30 85 L57 102 L88 54 L114 72 L148 64 L174 91 L198 64 L229 75 L253 47 L287 63 L311 38 L349 56 L379 20 L420 38 L453 14 L484 35 L520 10" stroke="#c8ef70" fill="none" stroke-width="2.6"/></svg></div><div class="signal-browser-foot"><span>WATCHLIST_01</span><span>STOCK INTELLIGENCE</span></div></div><div class="signal-orbit-dot"></div></div>`,
    lexora: `<div class="art art-lexora"><div class="lexora-circle"><span>æ</span></div><div class="lexora-example"><small>WORD / 023</small><strong>curiosity</strong><em>/ˌkjʊə.riˈɒs.ə.ti/</em><div><span>discover</span><span>remember</span><span>repeat ↗</span></div></div><div class="lexora-asterisk">✳</div><span class="lexora-edge">A → Z / INFINITE LEARNING</span></div>`,
    tap: `<div class="art art-tap"><div class="tap-ripple tap-r1"></div><div class="tap-ripple tap-r2"></div><div class="tap-ripple tap-r3"></div><div class="tap-card"><div class="tap-card-top"><strong>tap<span>n</span>trust<span class="tap-star">✳</span></strong></div><div class="tap-card-middle"><svg viewBox="0 0 70 70" aria-hidden="true"><path d="M26 21c13 4 18 14 18 28M20 31c7 2 9 6 10 15M39 16c16 6 25 19 25 36" stroke="currentColor" stroke-width="4.5" fill="none" stroke-linecap="round"/><circle cx="14" cy="49" r="4" fill="currentColor"/></svg></div><div class="tap-card-bottom">GOOD EXPERIENCES.<br>GREAT REVIEWS. <span>↗</span></div></div><span class="tap-outline-text">TAP TO CONNECT</span></div>`,
    hazel: `<div class="art art-hazel"><div class="hazel-circle hazel-back"></div><div class="hazel-circle hazel-front"><span class="hazel-inner">h<span>✴</span></span><div class="hazel-smile">good things, online.</div></div><span class="hazel-petal petal-a">✳</span><span class="hazel-petal petal-b">✦</span><span class="hazel-petal petal-c">✷</span><div class="hazel-ticket">SUBSCRIPTIONS<br>& DIGITAL GOODIES <span>↗</span></div></div>`
  };

  const list = $('#projectGrid');
  const render = (filter = 'all') => {
    list.replaceChildren();
    source.projects.filter(project => filter === 'all' || project.group === filter).forEach(project => {
      const url = validUrl(project.url);
      const article = make('article', `project-card theme-${project.id}`);
      const link = make('a', 'project-main');
      link.href = url || '#'; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `${project.status} — opens in a new tab`);
      if (!url) { link.removeAttribute('target'); link.addEventListener('click', e => e.preventDefault()); }
      const copy = make('div', 'project-copy');
      const meta = make('div', 'project-meta');
      meta.append(make('span', 'project-number', `[ ${project.number} ]`), make('span', 'project-category', project.category));
      const title = make('div', 'project-naming');
      title.append(make('h3', 'project-title', project.name), make('p', 'project-summary', project.summary));
      const description = make('p', 'project-description', project.description);
      const action = make('div','project-action');
      action.append(make('span','action-label',url ? project.status : 'COMING SOON'),make('span','action-arrow','↗'));
      copy.append(meta,title,description,action);
      const art = make('div','project-art'); art.setAttribute('aria-hidden','true'); art.innerHTML = graphics[project.graphic] || '';
      link.append(copy,art);
      article.appendChild(link);
      if (Array.isArray(project.extraLinks) && project.extraLinks.length) {
        const related = make('div','related-links');
        const caption = make('div','related-caption','MORE FROM HAZELNUTTUNES'); related.appendChild(caption);
        project.extraLinks.forEach(other => {
          const href = validUrl(other.url); if (!href) return;
          const button = make('a', 'related-link'); button.href = href; button.target = '_blank'; button.rel = 'noopener noreferrer';
          button.setAttribute('aria-label',`${project.name} — ${other.label}, opens in a new tab`);
          const label = make('span','related-name',other.label); const detail = make('small','related-detail',other.detail); const arr = make('span','related-arrow','↗');
          button.append(label,detail,arr); related.appendChild(button);
        });
        article.appendChild(related);
      }
      list.appendChild(article);
    });
    if (!list.children.length) list.appendChild(make('p','no-projects','Nothing here just yet.'));
  };
  render();
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => { const yes = item === button; item.classList.toggle('active',yes); item.setAttribute('aria-pressed',String(yes)); });
    render(button.dataset.filter);
  }));

  const mobileNav = $('#mobileNav'); const menuBtn = $('#menuButton');
  const closeMenu = () => { mobileNav.hidden = true; menuBtn.setAttribute('aria-expanded','false'); menuBtn.setAttribute('aria-label','Open navigation'); };
  menuBtn.addEventListener('click',() => { const show = mobileNav.hidden; mobileNav.hidden = !show; menuBtn.setAttribute('aria-expanded',String(show)); menuBtn.setAttribute('aria-label',show?'Close navigation':'Open navigation'); });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{ if(e.key==='Escape' && !mobileNav.hidden){ closeMenu(); menuBtn.focus(); } });

  const toast = $('#toast'); let toastId;
  const notify = message => { toast.textContent = message; toast.classList.add('visible'); clearTimeout(toastId); toastId=setTimeout(()=>toast.classList.remove('visible'),2600); };
  $('#shareBtn').addEventListener('click',async () => {
    const url = 'https://jk01.runs-at.dev/';
    try { await navigator.clipboard.writeText(url); notify('LINK COPIED ↗'); }
    catch { notify(url); }
  });
})();