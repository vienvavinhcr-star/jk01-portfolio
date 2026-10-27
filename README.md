# JK/01 — Justin / JustKing

An independent personal index for Justin in Melbourne: digital products, businesses and experiments. Plain HTML, CSS and JavaScript, published from `main` / repository root using GitHub Pages.

## Edit content

Edit `site-data.js` for profile copy, project descriptions, CTAs and URLs. The order of the `projects` array is the display order. `person.photo` accepts an optional local image path; leave it empty to retain the JK monogram. A failed photo load keeps the monogram.

- `index.html`: page structure, metadata and JavaScript-free link fallback
- `styles.css`: editorial typography, responsive layout and four individual project themes
- `app.js`: project rendering, filters, mobile navigation and copy-link interaction
- `favicon.svg`: JK favicon
- `og-cover.svg`: editable social artwork; `og-cover.jpg`: 1200 × 630 social preview

External links open in new tabs with `noopener noreferrer`. The shop and its two Facebook links are sibling anchors; no parent click handler intercepts secondary links. Escape closes mobile navigation and restores focus. Reduced-motion preferences disable motion.

## Local preview

Run `python3 -m http.server 8000` from the repository root, then open http://localhost:8000. No package install or build step is required.

## Hosting

Keep `.nojekyll` and the root `CNAME` containing `jk01.runs-at.dev`.

- GitHub Pages: Deploy from a branch → `main` → `/ (root)`
- Custom domain: `jk01.runs-at.dev`
- runs-at.dev: Point to my hosting → GitHub Pages → `vienvavinhcr-star.github.io`
- Enable Enforce HTTPS in Pages settings after GitHub issues the certificate.

Check current service status in [Pages settings](https://github.com/vienvavinhcr-star/jk01-portfolio/settings/pages) and [domain diagnostics](https://runs-at.dev/debug/jk01). Domain claim, DNS propagation, certificate issuance and deployment are separate states.

Official documentation: [GitHub custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [runs-at.dev GitHub Pages guide](https://runs-at.dev/docs/guides/github-pages).
