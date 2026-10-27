# JK/01 — Justin's Digital Space

A responsive personal project hub for **Justin / JustKing**, hosted using free GitHub Pages and the claimed `jk01.runs-at.dev` subdomain. Built with plain HTML, CSS and JavaScript—no dependencies or build step.

## Projects

| Project / link | Destination |
| --- | --- |
| SignalDesk | https://signaldesk-vestracapital.pages.dev/ |
| Lexora | https://lexora-pte.pages.dev/ |
| TapNTrust | https://tapntrust.com/ |
| Hazelnuttunes Shop | https://hazelnuttunes.com/ |
| Hazelnuttunes Support 24/7 | https://www.facebook.com/profile.php?id=61576748497882 |
| Hazelnuttunes Fanpage | https://www.facebook.com/profile.php?id=61591800332459 |

Each project has a bespoke theme. Main cards open their official destination in a new tab. Hazelnuttunes includes two additional Facebook links.

## Publish to `jk01.runs-at.dev`

The website source and the `CNAME` file are committed. **Repository publication does not automatically enable GitHub Pages or configure DNS.** The account owner must complete these steps:

1. In [repository Settings → Pages](https://github.com/vienvavinhcr-star/jk01-portfolio/settings/pages), choose **Build and deployment → Deploy from a branch**, **Branch: main**, **Folder: /(root)** and **Save**.
2. In [runs-at.dev/manage](https://runs-at.dev/manage), open claimed name **jk01** → **Point to my hosting** → **GitHub Pages** → **Save**. DNS CNAME target: `vienvavinhcr-star.github.io` (no protocol or repository path).
3. In **Settings → Pages** confirm **Custom domain** is `jk01.runs-at.dev` and save if required. (The `CNAME` file already exists in the root.)
4. After GitHub's DNS check succeeds, select **Enforce HTTPS**. Visit https://jk01.runs-at.dev/ to confirm it is live.

Official provider guide: https://runs-at.dev/docs/guides/github-pages

## Edit profile and links

Edit **`site-data.js`** to change project titles, descriptions, official URLs or the personal bio. Edit **`styles.css`** for themes, **`app.js`** for interactions, and **`index.html`** for the site layout.

## Development

Serve the repository locally: `python3 -m http.server 8000` and browse `http://localhost:8000`.

All hosting files are in the repository root. There is no package manager, build pipeline, database, analytics script or credentials stored in this repository.
