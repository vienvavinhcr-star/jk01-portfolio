# JK/01 — Justin's Digital Space

A completely static, responsive personal portfolio built with plain HTML, CSS and JavaScript. No npm, no paid hosting, no external database or build step.

## Apps and destinations

| Card | Destination |
|---|---|
| SignalDesk | https://signaldesk-vestracapital.pages.dev/ |
| Lexora | https://lexora-pte.pages.dev/ |
| TapNTrust | https://tapntrust.com/ |
| Hazelnuttunes Shop | https://hazelnuttunes.com/ |
| Hazelnuttunes Support 24/7 | https://www.facebook.com/profile.php?id=61576748497882 |
| Hazelnuttunes Fanpage | https://www.facebook.com/profile.php?id=61591800332459 |

Every card opens its site in a new tab; Hazelnuttunes also has separate Support and Fanpage buttons.

## How to preview

Open `index.html` directly in a browser. For best testing, serve the folder locally (for example `python3 -m http.server 8000`) and visit http://localhost:8000.

## How to change your profile and projects

Edit `site-data.js`, where all the names, URLs, descriptions and extra links are stored. Add objects to the `projects` array to introduce more cards. `graphic` currently supports `signal`, `lexora`, `tap`, and `hazel`. New graphic styles can be added to `app.js` and `styles.css`.

## Publish for free on Cloudflare Pages (direct upload)

1. Sign in to the Cloudflare dashboard. Go to **Workers & Pages** and create a **Pages** project using **Direct Upload**.
2. Give it a project name, e.g. `jk01-portfolio` (if available).
3. Drag the contents of this website folder (or the pre-prepared ZIP) into the upload area and deploy. You will get an address like `jk01-portfolio.pages.dev` — use your actual address in the next steps.
4. Open your Pages project's **Custom domains** tab. Add `jk01.runs-at.dev` to your project. Cloudflare will tell you which DNS record to set.
5. Sign in at https://runs-at.dev/manage , select your claimed `jk01`, choose **Point to my hosting → Cloudflare Pages**, enter the actual `your-project.pages.dev` hostname **without** `https://`, then save.
6. Return to Cloudflare Pages. Wait for domain and HTTPS validation to show as active. Verify https://jk01.runs-at.dev/ opens your portfolio.

Official provider instructions: https://runs-at.dev/docs/guides/cloudflare-pages

**Important:** Claiming a name at runs-at.dev does not publish the site automatically. Cloudflare Pages needs both the custom-domain entry and the matching CNAME in the runs-at.dev registry.

## Notes

- GitHub profile: https://github.com/vienvavinhcr-star
- Fonts load from Google Fonts if online, with built-in fallbacks for offline use.
- No tracking scripts, cookies, authentication, or third-party client API are included.
- This is a static website. Editing its content does not change the live site until you upload or deploy updated files.