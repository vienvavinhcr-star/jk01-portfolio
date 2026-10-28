# JK/01 — Justin

A compact personal link page with Poppins typography, four individually illustrated shop/project cards, local logos and a CSS shooting-star sky. Static HTML, CSS and JavaScript; no build step.

## Edit content

`site-data.js` is the central content configuration. Edit `person` for name, location and optional local portrait path. Edit project names, one-line subtitles, logo paths and HTTPS URLs in `projects`. Array order controls display order.

Hazelnuttunes' two Facebook links are grouped inside its warm brown shop panel, below a shop-specific support label. They remain separate anchors outside the main shop link. All external links open in a new tab with `noopener noreferrer`. TapNTrust has its own blue support section with Facebook and Instagram links. A JavaScript-free fallback contains all eight destinations.

The footer shows Melbourne, Australia and a live local 24-hour clock, including its current AEST/AEDT timezone. The avatar has a blue halo with a 3.6-second breathing cycle. It stops for reduced-motion preferences and pause while the tab is hidden.

## Sharing and local time

A small “Email Justin” button in the footer links to `mailto:justinpham0101@gmail.com`. It opens the visitor’s configured email app with Justin as the recipient; it does not send a message automatically.

The small share button beside Justin opens the device share sheet when supported. Otherwise it copies the canonical homepage URL and shows “Link copied”. If sharing and clipboard access are unavailable, a dialog offers a selectable URL. Cancelling the share sheet does not trigger copying.

The clock uses `Intl.DateTimeFormat` with `Australia/Melbourne`, updates at minute boundaries and resyncs when the tab becomes visible. No external time API is required. Time is not announced repeatedly to screen readers.

## Motion and accessibility

Cards enter once on page load with a 560 ms fade/16 px rise, staggered by 90 ms. Keyboard focus immediately reveals a card. Reduced-motion preferences skip the entrance entirely. Lexora uses muted moss green with soft ivory text, keeping lime only in its existing logo.

The star field and shooting stars use CSS transforms and opacity. Reduced-motion preferences stop the animation automatically. Background motion also pauses when the tab is hidden. All cards and controls support keyboard focus.

The profile uses the user-supplied image in `assets/justin.jpg`.

## Assets

- `assets/hazelnuttunes.png`: logo embedded in the existing Hazelnuttunes website
- `assets/tapntrust.png`: logo from the existing TapNTrust website
- `assets/lexora.svg`: existing Lexora favicon
- `assets/signaldesk.svg`: the V monogram used by Vestra Capital at the supplied SignalDesk URL
- `favicon.svg`: JK favicon; `og-cover.svg`: social artwork source; `og-cover-v3.jpg`: current 1200 × 630 social preview with Justin’s avatar and all four project logos. `og-cover.jpg` is retained for old cached previews

## Preview and hosting

Run `python3 -m http.server 8000` in the repository root, then open http://localhost:8000.

GitHub Pages publishes `main` / repository root. Preserve `.nojekyll` and the root `CNAME` containing `jk01.runs-at.dev`. DNS is a CNAME to `vienvavinhcr-star.github.io`; Enforce HTTPS is enabled in Pages settings.

Logo spacing is optically balanced: square marks have a little breathing room, TapNTrust uses less internal padding, and the round Hazelnuttunes logo uses the full frame. The original assets are preserved.

The night theme includes a faint crescent, sparse original constellation artwork (`assets/astral-field.svg`) and slowly drifting teal/violet mist. The mist stops with reduced-motion preferences and pauses when the tab is hidden. Shop palettes and logos stay distinct.
