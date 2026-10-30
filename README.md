# JK/01 — Justin

A compact personal link page with Poppins typography, four individually illustrated shop/project cards, local logos and a CSS shooting-star sky. Static HTML, CSS and JavaScript; no build step.

## Edit content

`site-data.js` is the central content configuration. Edit `person` for name, location and optional local portrait path. Edit project names, one-line subtitles, logo paths and HTTPS URLs in `projects`. Array order controls display order.

Hazelnuttunes' two Facebook links are grouped inside its warm brown shop panel, below a shop-specific support label. They remain separate anchors outside the main shop link. All external links open in a new tab with `noopener noreferrer`. TapNTrust has its own blue support section with Facebook and Instagram links. A JavaScript-free fallback contains all eight destinations.

The footer shows Melbourne, Australia and a live local 24-hour clock, including its current AEST/AEDT timezone. The avatar has a blue halo with a 3.6-second breathing cycle. It stops for reduced-motion preferences and pause while the tab is hidden.

## Sharing and local time

A small “Email” button in the footer links to `mailto:justinpham0101@gmail.com`. It opens the visitor’s configured email app with Justin as the recipient; it does not send a message automatically.

The small share button beside Justin opens the device share sheet when supported. Otherwise it copies the canonical homepage URL and shows “Link copied”. If sharing and clipboard access are unavailable, a dialog offers a selectable URL. Cancelling the share sheet does not trigger copying.

The clock uses `Intl.DateTimeFormat` with `Australia/Melbourne`, updates at minute boundaries and resyncs when the tab becomes visible. No external time API is required. Time is not announced repeatedly to screen readers.

## Motion and accessibility

Cards enter once on page load with a 560 ms fade/16 px rise, staggered by 90 ms. Keyboard focus immediately reveals a card. Reduced-motion preferences skip the entrance entirely. Lexora uses muted moss green with soft ivory text, keeping lime only in its existing logo.

The star field and shooting stars use CSS transforms and opacity. Reduced-motion preferences stop the animation automatically. Background motion also pauses when the tab is hidden. All cards and controls support keyboard focus.

The profile uses the user-supplied image in `assets/justin-profile-v2.jpg`.

## Assets

- `assets/hazelnuttunes.png`: logo embedded in the existing Hazelnuttunes website
- `assets/tapntrust.png`: logo from the existing TapNTrust website
- `assets/lexora.svg`: existing Lexora favicon
- `assets/signaldesk.svg`: the V monogram used by Vestra Capital at the supplied SignalDesk URL
- `favicon.svg`: JK favicon; `og-cover.svg`: social artwork source; `og-cover-v5.jpg`: current 1200 × 630 social preview with Justin’s avatar and all four project logos. `og-cover.jpg` is retained for old cached previews

## Preview and hosting

Run `python3 -m http.server 8000` in the repository root, then open http://localhost:8000.

GitHub Pages publishes `main` / repository root. Preserve `.nojekyll` and the root `CNAME` containing `jk01.runs-at.dev`. DNS is a CNAME to `vienvavinhcr-star.github.io`; Enforce HTTPS is enabled in Pages settings.

Logo spacing is optically balanced: square marks have a little breathing room, TapNTrust uses less internal padding, and the round Hazelnuttunes logo uses the full frame. The original assets are preserved.

The night theme includes a faint crescent, sparse original constellation artwork (`assets/astral-field.svg`) and slowly drifting teal/violet mist. The mist stops with reduced-motion preferences and pauses when the tab is hidden. Shop palettes and logos stay distinct.

## Featured music

A compact card below Justin’s name preserves the EVOL cover, “Low Life (feat. The Weeknd)” title and Future/The Weeknd credits. The title links to the official Spotify track. The cover in `assets/low-life.jpg` is from the track’s official Spotify oEmbed metadata.

The 23-second “Wake up” excerpt is in `assets/low-life-wake-up.m4a`, extracted from the user-supplied screen recording. The initial 1.92 seconds of silence were removed, with short fades at the boundaries. AAC audio is optimized for streaming with metadata stripped; the source video is not published. `music.src` in `site-data.js` enables the native Play/Pause button. To replace the clip, supply an already-trimmed audio file under `assets/` and update that path.

The player loads no audio until interaction, never autoplays or loops, handles failures, updates progress, and returns to Play when the excerpt ends. No provider iframe, external player SDK, credentials or rehosted provider preview is used.

The music card has no background panel, border or shadow, so it blends into the sky. The white waveform sits alongside Play. `assets/low-life-waveform.json` contains 35 frequency-band levels sampled from this exact audio at 20 Hz. Rendering follows the native audio playhead with a 100 ms attack and 320 ms release, instead of a repeating CSS animation. It freezes during pause, buffering or hidden tabs, resets at the end, and respects reduced motion. No AudioContext is required, preserving native playback in iPhone in-app browsers. Regenerate this analysis when replacing the clip.

Play/Pause uses a single SVG path updated with `setAttribute`, so it does not depend on the unsupported `hidden` property on SVG elements. Playback can also be paused while the initial request is loading.

The music row is centered with a 360 px maximum width and inset mobile edges. The artwork, credits, compact waveform and 44 px playback target align on one row without extending to the shop-card edges.

The updated portrait uses a 112 px circular frame on desktop and 104 px on mobile, with the existing gentle blue halo. The original portrait remains available for historical references.
