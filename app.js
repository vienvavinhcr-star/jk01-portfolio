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
    if (person.photo) {
      const photo = new Image(); photo.alt = 'Justin’s chosen profile photo'; photo.className = 'profile-photo';
      photo.addEventListener('load', () => document.querySelector('#avatar').replaceChildren(photo), {once:true});
      photo.src = person.photo;
    }
    const grid = document.querySelector('#projectGrid');
    // Reveal a focused card permanently so tabbing away cannot restart its entrance.
    grid.addEventListener('focusin', event => {
      const group = event.target.closest('.project-group');
      if (group) group.classList.add('is-revealed');
    });
    data.projects.forEach((project, index) => {
      const url = https(project.url); if (!url) return;
      const group = make('article', `project-group theme-${project.id}`);
      group.style.setProperty('--reveal-delay', `${80 + index * 90}ms`);
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

      const art = make('span', `card-art art-${project.id}`);
      art.setAttribute('aria-hidden', 'true');
      const graphics = {
        signaldesk: '<svg viewBox="0 0 200 100" fill="none"><path d="M0 80 23 66 39 74 61 48 78 54 100 24 122 37 146 12 169 29 200 4" stroke="currentColor" stroke-width="1.5"/><path d="M0 98H200M0 74H200M0 50H200M0 26H200M25 0V100M75 0V100M125 0V100M175 0V100" stroke="currentColor" stroke-opacity=".15" stroke-width=".7"/></svg>',
        lexora: '<span>æ</span>',
        tapntrust: '<svg viewBox="0 0 160 100" fill="none"><circle cx="105" cy="55" r="25"/><circle cx="105" cy="55" r="44"/><circle cx="105" cy="55" r="64"/><circle cx="105" cy="55" r="84"/></svg>',
        hazelnuttunes: '<svg viewBox="0 0 180 110" fill="none"><ellipse cx="130" cy="50" rx="57" ry="68" transform="rotate(35 130 50)"/><ellipse cx="130" cy="50" rx="47" ry="58" transform="rotate(35 130 50)"/><path d="m48 23 4 10 11 4-11 4-4 10-4-10-10-4 10-4z" fill="currentColor" stroke="none"/></svg>'
      };
      art.innerHTML = graphics[project.id] || '';
      link.append(art, logoWrap, label); group.append(link);
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
          const icon = make('span', extra.platform === 'instagram' ? 'instagram-mark' : 'facebook-mark');
          icon.setAttribute('aria-hidden', 'true');
          if (extra.platform === 'instagram') {
            icon.innerHTML = '<svg viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="5"/><circle cx="10" cy="10" r="3.5"/><circle cx="15" cy="5" r="1" fill="currentColor" stroke="none"/></svg>';
          } else { icon.textContent = 'f'; }

          secondary.append(icon, make('span', '', extra.label)); related.append(secondary);
        });
        support.append(related); group.append(support);
      }
      grid.append(group);
    });
  }

  // Audio stays disabled until an authorized local clip is configured.
  const audio = document.querySelector('#profileAudio');
  const musicToggle = document.querySelector('#musicToggle');
  const musicProgress = document.querySelector('#musicProgress');
  const musicStatus = document.querySelector('#musicStatus');
  const musicWaveform = document.querySelector('#musicWaveform');
  const musicSource = data?.music?.src;
  if (typeof musicSource === 'string' && musicSource.startsWith('./assets/')) {
    audio.src = musicSource;
    musicToggle.disabled = false;
    musicProgress.hidden = false;
    let isAudible = false;
    const iconPath = document.querySelector('#musicIconPath');
    const bars = Array.from(musicWaveform.children);
    const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
    let envelope, envelopeRequest, waveFrame = 0, lastPaint = 0;
    const levels = new Float32Array(bars.length).fill(.3);
    const stopWaveform = (reset = false) => {
      cancelAnimationFrame(waveFrame); waveFrame = 0; lastPaint = 0;
      if (reset) bars.forEach((bar, i) => {
        levels[i] = .3; bar.style.transform = 'scaleY(.45)'; bar.style.opacity = '.75';
      });
    };
    const drawWaveform = now => {
      waveFrame = 0;
      if (!envelope || !isAudible || audio.paused || audio.ended || document.hidden || motionPreference.matches) return;
      if (!lastPaint || now - lastPaint >= 32) {
        const dt = lastPaint ? Math.min((now - lastPaint) / 1000, .1) : .033;
        const position = Math.min(audio.currentTime * envelope.fps, envelope.frames.length - 1);
        const index = Math.floor(position), fraction = position - index;
        const current = envelope.frames[index], next = envelope.frames[Math.min(index + 1, envelope.frames.length - 1)];
        bars.forEach((bar, i) => {
          const target = (current[i] + (next[i] - current[i]) * fraction) / 255;
          // A gentle attack and slower release follow the actual sound without jitter.
          const tau = target > levels[i] ? .10 : .32;
          levels[i] += (target - levels[i]) * (1 - Math.exp(-dt / tau));
          bar.style.transform = `scaleY(${.22 + levels[i] * .78})`;
          bar.style.opacity = String(.55 + levels[i] * .45);
        });
        lastPaint = now;
      }
      waveFrame = requestAnimationFrame(drawWaveform);
    };
    const startWaveform = () => {
      if (!waveFrame && envelope && isAudible && !audio.paused && !document.hidden && !motionPreference.matches) {
        waveFrame = requestAnimationFrame(drawWaveform);
      }
    };
    const loadWaveform = () => {
      if (envelopeRequest || typeof data.music.waveform !== 'string' || !data.music.waveform.startsWith('./assets/')) return;
      // Precomputed frequency levels avoid routing iPhone audio through an AudioContext.
      envelopeRequest = fetch(data.music.waveform).then(response => {
        if (!response.ok) throw new Error('Waveform unavailable');
        return response.json();
      }).then(value => {
        if (value.fps > 0 && value.bands === bars.length && Array.isArray(value.frames) && value.frames.length && value.frames.every(row => Array.isArray(row) && row.length === bars.length && row.every(Number.isFinite))) {
          envelope = value; startWaveform();
        }
      }).catch(() => { /* Audio remains playable if the decorative data cannot load. */ });
    };
    document.addEventListener('visibilitychange', () => document.hidden ? stopWaveform() : startWaveform());
    motionPreference.addEventListener('change', () => motionPreference.matches ? stopWaveform(true) : startWaveform());
    const syncMusic = () => {
      const playing = !audio.paused && !audio.ended && !audio.error;
      musicWaveform.dataset.playing = String(isAudible && playing);
      musicToggle.setAttribute('aria-pressed', String(playing));
      musicToggle.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} Low Life`);
      iconPath.setAttribute('d', playing ? 'M7 5h4v14H7zm6 0h4v14h-4z' : 'm9 5 11 7-11 7z');
      musicToggle.title = playing ? 'Pause music' : 'Play music';
      if (isAudible && playing) startWaveform(); else stopWaveform();
    };
    let starting = false;
    musicToggle.addEventListener('click', async () => {
      if (!audio.paused) { audio.pause(); return; }
      if (starting) return;
      loadWaveform();
      starting = true;
      musicStatus.textContent = '';
      try {
        if (audio.ended) audio.currentTime = 0;
        await audio.play();
      } catch (error) {
        if (error.name !== 'AbortError') musicStatus.textContent = 'Couldn’t play the music. Tap Play to try again.';
      } finally { starting = false; syncMusic(); }
    });
    audio.addEventListener('play', syncMusic);
    audio.addEventListener('playing', () => { isAudible = true; syncMusic(); });
    for (const event of ['pause', 'waiting', 'stalled', 'ended', 'error']) {
      audio.addEventListener(event, () => { isAudible = false; syncMusic(); });
    }
    audio.addEventListener('ended', () => { syncMusic(); stopWaveform(true); musicProgress.value = 0; });
    audio.addEventListener('timeupdate', () => {
      musicProgress.value = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.currentTime / audio.duration : 0;
    });
    audio.addEventListener('error', () => {
      musicStatus.textContent = 'Music is unavailable right now. Please try again later.';
      syncMusic();
    });
  }

  if (!musicSource) {
    musicStatus.textContent = 'Audio coming soon';
    musicToggle.title = 'Audio clip coming soon';
    musicToggle.setAttribute('aria-describedby', 'musicStatus');
  }

  // Share the canonical address, without query strings used for deployment checks.
  const shareButton = document.querySelector('#shareButton');
  const shareStatus = document.querySelector('#shareStatus');
  const shareUrl = 'https://jk01.runs-at.dev/';
  let statusTimer;
  const notify = message => {
    clearTimeout(statusTimer);
    shareStatus.textContent = message;
    shareStatus.classList.add('visible');
    statusTimer = setTimeout(() => shareStatus.classList.remove('visible'), 2800);
  };
  shareButton.hidden = false;
  let sharing = false;
  shareButton.addEventListener('click', async () => {
    if (sharing) return;
    sharing = true;
    try {
      if (typeof navigator.share === 'function') {
        try {
          await navigator.share({ title: 'JK/01 — Justin', url: shareUrl });
          return;
        } catch (error) {
          if (error.name === 'AbortError') return; // Cancelling never copies or sends anything.
        }
      }
      try {
        await navigator.clipboard.writeText(shareUrl);
        notify('Link copied');
      } catch {
        const dialog = document.querySelector('#shareDialog');
        const input = document.querySelector('#shareUrl');
        dialog.showModal();
        input.focus(); input.select();
      }
    } finally { sharing = false; }
  });

  // IANA timezone handles Melbourne daylight saving, regardless of the visitor’s zone.
  const clock = document.querySelector('#melbourneTime');
  const divider = document.querySelector('#clockDivider');
  const clockFormat = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Melbourne', hour: '2-digit', minute: '2-digit',
    hourCycle: 'h23', timeZoneName: 'short'
  });
  let clockTimer;
  const updateClock = () => {
    const now = new Date();
    clock.textContent = clockFormat.format(now);
    clock.dateTime = now.toISOString();
    clock.hidden = false; divider.hidden = false;
    clock.setAttribute('aria-label', `Melbourne local time: ${clock.textContent}`);
    clearTimeout(clockTimer);
    if (!document.hidden) clockTimer = setTimeout(updateClock, 60000 - Date.now() % 60000);
  };
  document.addEventListener('visibilitychange', () => {
    clearTimeout(clockTimer);
    if (!document.hidden) updateClock();
  });
  updateClock();

  // Deterministic, lightweight CSS stars. No canvas, video or animation library.
  let seed = 101;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const stars = document.querySelector('#stars');
  for (let i = 0; i < 95; i++) {
    const star = make('i', i % 4 === 0 ? 'star twinkle' : 'star');
    star.style.cssText = `left:${random()*100}%;top:${random()*100}%;--size:${i%9===0?2:1}px;--opacity:${.15+random()*.55};animation-delay:-${random()*8}s`;
    stars.append(star);
  }
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const syncMotion = () => {
    document.body.classList.toggle('sky-paused', preference.matches || document.hidden);
  };
  preference.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', syncMotion);
  syncMotion();
})();
