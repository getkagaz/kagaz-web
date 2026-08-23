# Deployment

The site is a static bundle hosted on **Cloudflare Pages**, deployed from Git.
Pick **one** of the two methods below — don't run both (they'd double-deploy).

## Option A — Native Git integration (recommended)

No CI, no secrets. In the Cloudflare dashboard:

1. **Workers & Pages → Create → Pages → Connect to Git**, select this repo.
2. Build command: **(leave empty)** · Output directory: **`/`**
   (also declared in [`wrangler.toml`](wrangler.toml)).
3. **Custom domains → Set up a domain → `getkagaz.app`.**

Every push to `main` deploys production; pull requests get preview URLs.
If you use this option, delete `.github/workflows/deploy.yml` so Actions
doesn't deploy a second time.

## Option B — GitHub Actions

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) deploys on push
to `main` via `wrangler`. Add two repository secrets
(**Settings → Secrets and variables → Actions**):

| Secret | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | API token with the **Cloudflare Pages → Edit** permission |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID from the Cloudflare dashboard sidebar |

The first run creates the `kagaz-web` Pages project; then add `getkagaz.app`
as a custom domain in the dashboard.

## Notes

- `_headers` (CSP, HSTS, cache rules) and `.assetsignore` are read by
  Cloudflare Pages automatically — no extra configuration.
- `.app` is an HTTPS-only TLD; Cloudflare issues the certificate and the
  `Strict-Transport-Security` header in `_headers` applies on first load.
- After go-live, submit `https://getkagaz.app/sitemap.xml` to Google Search
  Console.
