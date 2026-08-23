<p align="center">
  <img src="assets/logo.svg" width="72" height="72" alt="Kagaz" />
</p>

<h1 align="center">Kagaz — website</h1>

<p align="center">
  The website for <a href="https://github.com/getkagaz/kagaz">Kagaz</a> — an open-source,
  local-first document vault manager for macOS.<br>
  <a href="https://getkagaz.app"><strong>getkagaz.app</strong></a>
</p>

<p align="center">
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-b6552b"></a>
  <img alt="Build: none" src="https://img.shields.io/badge/build-none-3b4a6b">
  <a href="https://github.com/getkagaz/kagaz-web/actions/workflows/lighthouse.yml"><img alt="Lighthouse CI" src="https://github.com/getkagaz/kagaz-web/actions/workflows/lighthouse.yml/badge.svg"></a>
  <img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-b6552b">
</p>

---

This is the source for **[getkagaz.app](https://getkagaz.app)** — the Kagaz
website. It's a small, hand-authored **static site** — no framework, no
build step, no runtime dependencies — kept fast, accessible and
third-party-free on purpose. It's public so the community can read it, open
issues, and send fixes.

## About Kagaz

Kagaz is **open core**:

| Project | What it is | License |
| --- | --- | --- |
| **[getkagaz/kagaz](https://github.com/getkagaz/kagaz)** | The CLI, MCP server and helpers | **MIT — open source, free forever** |
| **Kagaz for Mac** | Optional native menu-bar app over the CLI | Paid · **free during the public beta** (launching soon) |
| **getkagaz/kagaz-web** _(this repo)_ | The website (getkagaz.app) | MIT (code) |

Nothing in the CLI is withheld or degraded to sell the app — the app is
convenience over a CLI that's complete on its own.

## How it's built

- **Zero build.** Plain HTML, CSS and a little vanilla JS — clone and open.
- **No third-party requests.** Fonts (Instrument Sans, IBM Plex Mono) are
  self-hosted; nothing loads from a CDN or tracker.
- **Hardened by default.** Strict Content-Security-Policy with Trusted Types,
  plus HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`
  and COOP (see [`_headers`](_headers)).
- **Accessible & fast.** WCAG AA, light/dark, responsive. Core Web Vitals
  passing; Speculation Rules prerender internal navigation.
- **Lighthouse:** Accessibility 100 · SEO 100 · Best-Practices 100 ·
  Performance 95–97 — enforced in CI on every push.
- **SEO-complete.** Canonical URLs, Open Graph / Twitter cards, JSON-LD
  (Organization, WebSite, SoftwareApplication, FAQPage, BreadcrumbList),
  `sitemap.xml`, `robots.txt` and an `llms.txt` for AI crawlers.

## Structure

```
.
├── index.html            # Landing page
├── commands.html         # CLI command reference
├── 404.html              # Branded not-found page
├── styles.css            # Design system + all styles (no framework)
├── app.js                # Progressive enhancement: theme, nav, copy, reveal
├── theme-init.js         # Pre-paint theme (no flash); external for strict CSP
├── assets/
│   ├── favicon.svg · favicon-32.png · apple-touch-icon.png
│   ├── icon-192.png · icon-512.png        # PWA icons
│   ├── logo.svg · og.png                  # Brand mark + social card
│   └── fonts/                             # Self-hosted woff2 + fonts.css
├── _headers              # Security + cache headers
├── site.webmanifest      # PWA manifest
├── robots.txt · sitemap.xml · llms.txt    # Crawl / SEO
├── lighthouserc.json     # Lighthouse CI thresholds
├── wrangler.toml         # Cloudflare Pages config
└── .github/workflows/    # lighthouse.yml (audit) · deploy.yml (deploy)
```

## Local development

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

Any static file server works — there's nothing to build.

> The `_headers` rules and gzip only apply on the production host, so a local
> Lighthouse performance score reads lower than production.

## Contributing

Issues and pull requests are welcome — typo fixes, copy, accessibility and
performance improvements especially. It's vanilla static files: run
`python3 -m http.server`, keep it dependency-free, and keep the strict CSP
intact (no inline styles or scripts). See **[CONTRIBUTING.md](CONTRIBUTING.md)**.

## Deployment

Hosted on **Cloudflare Pages**, auto-deployed from `main`. Setup is in
**[DEPLOY.md](DEPLOY.md)**.

## Quality gate

[`.github/workflows/lighthouse.yml`](.github/workflows/lighthouse.yml) runs
Lighthouse CI on every push and PR — Accessibility / SEO / Best-Practices must
stay **100** and Performance **≥ 90** (see [`lighthouserc.json`](lighthouserc.json)).

## License

Code is [MIT](LICENSE). Brand assets — the Kagaz name, the **क** logo,
`assets/og.png`, and the app icons — are **not** covered by the MIT license;
please don't reuse them for other projects. Bundled fonts are under the SIL
Open Font License.
