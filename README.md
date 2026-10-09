# Dylan Li

A personal website with plain HTML and CSS. A small Node script turns plain-text posts into static HTML. No packages or environment variables are needed. Satoshi is loaded from Fontshare’s official CDN.

## Edit a post

Edit `content/writings/intentional-living.txt`:

```text
Title: Intentional Living
Date: 2026-10-09

Your text goes here.

Use a blank line between paragraphs.
```

The filename determines the URL: `intentional-living.txt` becomes `/writings/intentional-living/`. To add a post, create another `.txt` file in the same format. To change its URL, rename the file. Titles, dates, links, and the sitemap update automatically. Text is plain text, not HTML or Markdown.

- `public/index.html`: homepage bio and links
- `content/writings/`: editable writings posts
- `templates/writings.html`: shared writings page layout
- `scripts/build-writings.mjs`: generates the writings listing and post pages
- `public/style.css`: layout and colors
- `public/resume.pdf`: downloadable resume

`public/writings/` is generated; edit the text files rather than the generated HTML.

## Preview

Run `node scripts/build-writings.mjs --watch` in one terminal, and `python3 -m http.server 4173 --directory public` in another. Open http://localhost:4173. Save a text file and refresh the browser to see changes.

## Deploy

Vercel runs the writings generator and serves `public/` directly. Push `main` to deploy production, or use `vercel deploy` for a preview.

## Previous website

The full Next.js site, including the local writings drafts, is preserved on the local branch `archive/full-site-2026-09-23`. Switch to that branch to restore it. The archive has not been pushed, so unpublished drafts remain local.
