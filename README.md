# Bajpai Labs Documentation

Primary source of documentation for our open-source community.

**Published at:** [postquantumlabs.com/docs](https://postquantumlabs.com/docs/)

## Structure

```
docs/
├── index.md              # Documentation portal (VitePress home)
├── .vitepress/           # Site theme, config, Bajpai Labs branding
├── vortex-pqc/           # VORTEX-256 (synced from bajpai-labs/vortex-pqc)
└── kyber-pqc/            # Kyber-PQC (synced from bajpai-labs/kyber-pqc)
```

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173/docs/](http://localhost:5173/docs/) (VitePress dev server).

## Build

```bash
npm run build
```

Output:

- `dist/docs/` — VitePress site (served at `/docs/` on postquantumlabs.com)
- `dist/index.html` — root redirect to `/docs/`

## How docs are published

| Step | What happens |
|:-----|:---------------|
| 1 | A project repo (e.g. `vortex-pqc`) pushes changes to its `docs/` folder on `main` |
| 2 | GitHub Actions syncs into `documentation/docs/<project>/` |
| 3 | This repo's deploy workflow rebuilds and publishes to **postquantumlabs.com/docs** |

| Source | Destination | URL |
|:-------|:------------|:----|
| [bajpai-labs/vortex-pqc](https://github.com/bajpai-labs/vortex-pqc) | `docs/vortex-pqc/` | [postquantumlabs.com/docs/vortex-pqc](https://postquantumlabs.com/docs/vortex-pqc/) |
| [bajpai-labs/kyber-pqc](https://github.com/bajpai-labs/kyber-pqc) | `docs/kyber-pqc/` | [postquantumlabs.com/docs/kyber-pqc](https://postquantumlabs.com/docs/kyber-pqc/) |

## Deploy (Cloudflare Pages)

The site deploys automatically on every push to `main`. For manual deploy:

```bash
npm run deploy:pages
```

Requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` (same Cloudflare account as bajpailabs.com).

Create a Cloudflare Pages project named `postquantumlabs-docs` and attach the `postquantumlabs.com` custom domain.

## Design

The documentation site uses Bajpai Labs branding from the [website](https://github.com/bajpai-labs/website) repository — vellum/parchment palette, gold accents, Playfair Display + Inter typography, and the lab logo.
