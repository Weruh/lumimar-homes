# Lumimar Homes

Marketing and operations frontend for Lumimar Homes, built with React, TypeScript, Tailwind CSS, and Vite.

## Run Locally

Prerequisite: Node.js 20+

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Build for production: `npm run build`
4. Preview the production build locally: `npm run preview`

## Production Output

The production-ready static site is generated in `dist/`.
Package `dist/` for deployment instead of the full repository to avoid shipping source photos and `node_modules`.

## GitHub Pages Deployment

This repository includes a GitHub Pages workflow at `.github/workflows/deploy.yml`.
It builds the Vite app from `lumimar_homes/` and deploys the generated `dist/` folder whenever `main` is updated.

### One-Time GitHub Setup

1. Push this repository to GitHub.
2. In GitHub, open `Settings > Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. In `Custom domain`, enter `home.lumimarbrand.com` and save.
5. After the first successful deploy, enable `Enforce HTTPS`.

### Hostinger DNS Setup

In Hostinger DNS for `lumimarbrand.com`, add this record:

- `Type`: `CNAME`
- `Name`: `home`
- `Target`: `weruh.github.io`

Remove any conflicting `A`, `AAAA`, or `CNAME` records for `home` before saving.
DNS propagation can take some time, so the domain may not start working immediately.

### Routing Note

The app uses React Router with browser history.
A GitHub Pages fallback page is included so direct visits to routes such as `/about` and `/pricing` still load correctly.
