# Contributing

Thanks for helping improve the Kagaz website. Typo fixes, copy tweaks,
accessibility improvements, and performance wins are all welcome.

## Run it locally

No build step, no dependencies — it's hand-authored static HTML/CSS/JS.

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

Any static file server works.

## House rules

- **No framework, no build, no runtime dependencies.** Keep it vanilla.
- **No third-party requests.** Fonts are self-hosted under `assets/fonts/`;
  don't add CDN links, trackers, or external scripts.
- **Keep the strict CSP intact.** No inline `<script>` or inline `style="…"`
  attributes — the Content-Security-Policy forbids them (and enforces
  Trusted Types). Put styles in `styles.css` and behavior in `app.js`.
- **Match the editor config** (`.editorconfig`: UTF-8, LF, 2-space indent).
- **Don't regress the quality gate.** Lighthouse CI must stay green:
  Accessibility / SEO / Best-Practices = 100, Performance ≥ 90.

## Before you open a PR

1. Load the affected page(s) locally and check the browser console is clean.
2. If you have Chrome + Node, run the same audit CI runs:
   ```sh
   CHROME_PATH="/path/to/chrome" npx @lhci/cli@0.14.x autorun
   ```
3. Describe what changed and why. Screenshots help for visual changes.

## Scope

This repo is **only the website** (getkagaz.app). For the CLI itself, its
docs, or bugs in `kagaz`, please use
[getkagaz/kagaz](https://github.com/getkagaz/kagaz).

## Code of Conduct

Be kind and constructive. This project follows the
[Kagaz Code of Conduct](https://github.com/getkagaz/kagaz/blob/main/CODE_OF_CONDUCT.md).
