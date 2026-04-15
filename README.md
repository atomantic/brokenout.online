# brokenout.online

**BrokenOut — The Professional Network for People Who Broke Out.**

A static demo site for a LinkedIn parody aimed at people who've been laid off,
restructured, or blissfully retired. It's LinkedIn, but honest.

Live at **[brokenout.online](https://brokenout.online)**.

## What's here

- `index.html` — the site
- `styles.css` — visual design
- `app.js` — routing, feed data, interactions
- `demo.js` — guided tour script ("Start Guided Tour" button in the demo bar)
- `record.js` — headless Playwright recorder (`node record.js` → writes a WebM to `videos/`)
- `CNAME` — GitHub Pages custom domain binding
- `home-initial.png` — OpenGraph preview image

## Running locally

No build step. Serve the folder with anything:

```bash
python3 -m http.server 8765
# then open http://localhost:8765/
```

Or use the bundled Playwright tooling to record a demo video:

```bash
npm install
node record.js
```

## Email signup

The waitlist card in the right column posts to a [Kit](https://kit.com) form
(`form id 9328582`). Subscribers land in the BrokenOut Kit account.

## Deployment

Pushing to `main` publishes automatically via GitHub Pages (legacy build from
the root of the branch). DNS is managed at DreamHost — four `A` records and
four `AAAA` records pointing at GitHub Pages' anycast IPs.
