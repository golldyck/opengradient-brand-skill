# OG Ecosystem Asset Scrape Report
**Date:** 2026-03-14
**Sites targeted:** opengradient.ai, memsync.ai, bitquant.io, twin.fun

---

## Summary

| Site | Status | Logos/SVGs | Animations | CSS |
|------|--------|-----------|------------|-----|
| opengradient.ai | Fetched (partial) | Wordmark SVG (inline), favicon URL | Unknown (CSS not fetched) | 2 chunk URLs found |
| memsync.ai | Fetched | 1 PNG logo + 4 app-logo SVGs + 9 partner SVGs | `marquee`, `gentle-levitate` | Not fetched |
| bitquant.io | Bot-protected | None | None | None |
| twin.fun | 403 Blocked | None | None | None |

---

## opengradient.ai

**What was found:**
- Inline SVG wordmark: `<svg viewBox="0 0 643 121">` with clip-path id `logo_svg__a` — this is the full "OpenGradient" text lockup in `currentColor`
- Favicon: `/favicon.ico?favicon.4352fedb.ico` (256x256, x-icon)
- Symbol mark: referenced by name as `open-gradient-symbol-white` (178×178px) via brease.io CDN — URL not directly extracted
- Hero image: `/_next/image?url=%2Fimages%2Fhome%2Fhero-globe-mobile.png`
- 2 web fonts (woff2): `797e433ab948586e` and `caa3a2e1cccd8315`
- 2 CSS chunk files (Next.js static)

**What was NOT retrieved:**
- CSS chunk contents (keyframes, CSS variables) — fetching was halted due to context budget
- The full wordmark SVG path data was truncated in the scrape output (the `d=` attribute was cut off mid-path)
- Logo mark SVG (the gradient circle icon) — not found inline, likely in a separate JS chunk

**CSS chunk URLs to fetch manually:**
```
https://www.opengradient.ai/_next/static/chunks/9c042f159284e012.css?dpl=dpl_2V5FgFfXa6WnqdX6ogFi3Jh1d43p
https://www.opengradient.ai/_next/static/chunks/a1fc67b819890b2e.css?dpl=dpl_2V5FgFfXa6WnqdX6ogFi3Jh1d43p
```

---

## memsync.ai

**What was found:**
- Main logo: `_logo.png` (PNG, not SVG)
- 4 app-logo SVGs: `app-logo_1.svg` through `app-logo_4.svg` (likely UI/product screenshots or feature icons)
- 9 partner/integration logo SVGs: `logo_01.svg` through `logo_09.svg`
- 10 backer logos (PNG): `logo_backed_03.png` through `logo_backed_12.png` — includes `a16z.svg`
- 3 icon PNGs: `ic_01.png` through `ic_03.png`
- Background images: `hero-bg.png`, `bg-top.png`, `bg-bottom.png`, `compare-bg.png`, `Light.png`
- 2 confirmed animation keyframe names: **`marquee`** and **`gentle-levitate`**

All assets are on `cdn.prod.website-files.com` under site ID `6885e046690069d5cd04bf79`.

---

## bitquant.io

**Status:** Bot-protected (Cloudflare or similar)
The fetch returned only Google Tag Manager + Google Analytics initialization scripts — no HTML structure, no assets.

**To extract assets manually:**
```bash
# Try with real browser User-Agent
curl -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" \
  -H "Accept: text/html" https://www.bitquant.io/

# Or try direct asset paths
curl https://www.bitquant.io/favicon.ico -o bitquant-favicon.ico
curl https://www.bitquant.io/logo.svg
curl https://www.bitquant.io/assets/logo.svg
```

---

## twin.fun

**Status:** HTTP 403 — blocked immediately
No content was returned. The site likely uses Cloudflare Bot Management or Vercel Edge middleware to block non-browser requests.

**To extract assets manually:**
```bash
curl -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" \
  https://www.twin.fun/

# Or try direct asset paths
curl https://www.twin.fun/favicon.ico -o twin-favicon.ico
curl https://www.twin.fun/logo.svg
```

---

## Files Written

| File | Contents |
|------|----------|
| `design-extracted/logos-and-icons.json` | All logo URLs, SVG markup, CDN asset list, status per site |
| `design-extracted/animations-full.css` | `@keyframes marquee` + `@keyframes gentle-levitate` (memsync.ai); Tailwind placeholder keyframes for OG (pending CSS chunk fetch) |
| `design-extracted/assets-report.md` | This file |

---

## Recommended Next Steps

1. **Fetch the OG CSS chunks** — download both Next.js CSS chunk files from opengradient.ai and grep for `@keyframes` and `--` CSS variables. Append to `animations-full.css` and create a `tokens-from-css.json`.

2. **Get the full OG wordmark SVG path data** — the `d=` attribute in the scraped SVG was truncated. Fetch `https://www.opengradient.ai/` again and extract the complete `<path>` element inside `#logo_svg__a`.

3. **Locate the OG symbol/mark** — search the Next.js JS chunks for `open-gradient-symbol` or `gradient-circle` to find the standalone logomark SVG.

4. **Download memsync app-logo SVGs** — the 4 `app-logo_*.svg` files are likely product UI illustrations or feature icons worth including in the brand kit.

5. **Manual extraction for bitquant.io and twin.fun** — use a headless browser (Puppeteer, Playwright) or a browser extension to capture the rendered HTML and assets.

6. **Add animations to og-brand.css** — the `marquee` and `gentle-levitate` keyframes from memsync.ai are ready to integrate. Consider adding them under a `/* Ecosystem animations */` section.
