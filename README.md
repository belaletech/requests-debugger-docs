# TestMu AI Requests Debugger – documentation website

A static website (plain HTML, CSS and JavaScript, no build step) published with GitHub Pages.

Live site: https://belaletech.github.io/requests-debugger-docs/

## Files

| Path | What it is |
|---|---|
| `index.html` | The whole site (one page with a sidebar) |
| `assets/style.css` | Styles |
| `assets/site.js` | Tabs, copy buttons, screenshot zoom, mobile menu, OS detection for downloads |
| `assets/img/` | Screenshots and logo |
| `assets/video/` | Demo video (MP4 + WebM) and its poster image |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

## Common edits

**Replace the demo video.** Put the new files in `assets/video/` with the same names (keep each well under 100 MB). To use YouTube or Loom instead, replace the `<div class="video">` block in `index.html` with their embed iframe.

**New release.** In `index.html`, update the version (search for `1.1.0-beta.3`) and the Google Drive links in the `Download` table.

**CLI download link.** Search for `11KyyTWl` (it appears twice) and replace the Drive file ID.

**Replace a screenshot.** Save a PNG with the same name in `assets/img/`. Make sure no username, access key or personal data is visible.

Preview locally: open `index.html` in a browser.
