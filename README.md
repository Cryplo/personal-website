# Dylan Li

A personal website made with plain HTML and CSS. No dependencies, build step, or environment variables.

## Edit

- `public/index.html`: bio and links
- `public/style.css`: layout and colors (follows your device’s light/dark setting)
- `public/resume.pdf`: downloadable resume

## Preview

Run `python3 -m http.server 4173 --directory public` and open http://localhost:4173.

## Deploy

Vercel serves `public/` directly. `vercel.json` overrides the previous Next.js build configuration. Push `main` to deploy production, or use `vercel deploy` for a preview.

## Previous website

The full Next.js site, including the local blog drafts, is preserved on the local branch `archive/full-site-2026-09-23`. Switch to that branch to restore it. The archive has not been pushed, so unpublished drafts remain local.
