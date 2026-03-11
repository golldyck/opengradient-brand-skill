# OpenGradient Brand Skill

> One script tag. Full OpenGradient visual identity — auto-loaded from GitHub CDN.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-3.0.0-24bce3.svg)](https://github.com/golldyck/opengradient-brand-skill)

---

## What is this?

**OpenGradient Brand Skill** is a single JavaScript file that:

1. Loads `og-brand.css` (real brand design tokens from opengradient.ai)
2. Loads **Geist** font from Google Fonts (official OG font)
3. Injects the **official OpenGradient SVG logo** into any `[data-og-logo]` element
4. **Optionally auto-builds a complete branded page** from one `<body>` attribute

No bundler. No npm. Just paste and go.

---

## Quick Start (30 seconds)

### Option A — Auto-Build Full Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My OpenGradient Page</title>
  <script src="https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-skill.js"></script>
</head>
<body
  data-og-build
  data-og-title="Your Title Here"
  data-og-tagline="Your tagline or description."
  data-og-cta="Get Started"
  data-og-cta-url="https://yoursite.com"
>
</body>
</html>
```

The skill auto-generates: **Navbar + Hero + Stats + Feature Cards + CTA Banner + Footer** — all in real OpenGradient brand style.

---

### Option B — CSS Classes Only

```html
<head>
  <link rel="stylesheet"
    href="https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-brand.css" />
</head>

<body class="og-scope">
  <h1 class="og-h1 og-text-gradient">Hello World</h1>
  <p class="og-body">Styled with OpenGradient brand system.</p>
  <a class="og-btn og-btn-primary" href="#">Get Started</a>
</body>
```

---

### Option C — Logo Only

```html
<script src="https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-skill.js"></script>

<!-- Full wordmark (white, for dark backgrounds) -->
<div data-og-logo="wordmark"></div>

<!-- Full wordmark (dark, for light backgrounds) -->
<div data-og-logo="wordmark-dark"></div>

<!-- Icon mark only (white) -->
<div data-og-logo="mark"></div>

<!-- Icon mark only (dark) -->
<div data-og-logo="mark-dark"></div>
```

---

### Option D — Image Brand Overlay

Apply OpenGradient brand overlay to any photo or image:

```html
<div class="og-img-overlay">
  <img src="your-photo.jpg" alt="..." />
</div>

<!-- Light overlay variant -->
<div class="og-img-overlay og-img-overlay--light">
  <img src="your-photo.jpg" alt="..." />
</div>
```

---

## `data-og-build` Attributes

| Attribute | Default | Description |
|---|---|---|
| `data-og-title` | `"OpenGradient"` | Hero headline |
| `data-og-tagline` | `"Decentralized AI..."` | Hero subtext |
| `data-og-cta` | `"Get Started"` | CTA button label |
| `data-og-cta-url` | `"https://opengradient.ai"` | CTA button URL |

---

## Brand Colors (Real from opengradient.ai)

| Token | Value | Use |
|---|---|---|
| `--og-primary-500` | `#24bce3` | Main brand blue |
| `--og-primary-800` | `#0e4b5b` | Brand dark teal |
| `--og-secondary-950` | `#0a0f19` | Deepest navy (bg) |
| `--og-secondary-800` | `#141e32` | Card background |
| `--og-primary-100` | `#e9f8fc` | Light surface |
| `--og-primary-200` | `#bdebf7` | Light accent |

```css
/* Core CSS variables */
--og-primary-500:    #24bce3   /* Main brand blue */
--og-primary-800:    #0e4b5b   /* Dark teal */
--og-black:          #0a0f19   /* Brand navy-black */
--og-white:          #ffffff
--og-font-sans:      'Geist', system-ui, sans-serif
--og-font-mono:      'Geist Mono', ui-monospace, monospace

/* Gradients */
--og-grad-hero:      dark navy → teal
--og-grad-text:      #24bce3 → #50c9e9
--og-grad-primary:   #24bce3 → #0e4b5b
```

---

## CSS Components

| Class | Description |
|---|---|
| `og-scope` | Root wrapper (applies font + bg) |
| `og-scope og-light` | Light theme variant |
| `og-container` | Max-width centered container |
| `og-hero` | Full-height hero section |
| `og-nav` | Fixed glassmorphism navbar |
| `og-btn og-btn-primary` | Brand blue CTA button |
| `og-btn og-btn-secondary` | Ghost outline button |
| `og-btn og-btn-dark` | Dark teal button |
| `og-card` | Dark card with hover effect |
| `og-card-glow` | Card with brand radial glow |
| `og-card-featured` | Highlighted/featured card |
| `og-badge og-badge-primary` | Brand blue pill badge |
| `og-h1` … `og-h4` | Heading scale |
| `og-body` | Body text style |
| `og-text-gradient` | Brand gradient text |
| `og-text-primary` | Brand blue colored text |
| `og-stat` | Metric/stat display block |
| `og-code` | Styled code block (Geist Mono) |
| `og-input` | Branded input field |
| `og-divider` | Gradient horizontal rule |
| `og-grid og-grid-3` | 3-column responsive grid |
| `og-img-overlay` | Brand color overlay on images |
| `og-reveal` | Scroll-triggered fade-in animation |
| `og-cta-banner` | Full-width CTA section |
| `og-testimonial` | Testimonial card |

---

## JavaScript API

```js
// Build a full branded page:
OGBrand.buildPage(document.body);

// Inject logos into [data-og-logo] elements:
OGBrand.injectLogos();

// Initialize scroll reveal animations:
OGBrand.initScrollReveal();

// Initialize mobile hamburger nav:
OGBrand.initMobileNav();

// Load CSS/fonts manually:
OGBrand.loadCSS(url);
OGBrand.loadFonts(url);

// SVG strings:
OGBrand.LOGO_SVG    // Official OpenGradient wordmark SVG
OGBrand.LOGO_MARK   // Icon mark only SVG

// Brand color palette:
OGBrand.COLORS.primary   // '#24bce3'
OGBrand.COLORS.dark      // '#0e4b5b'
OGBrand.COLORS.navy      // '#0a0f19'
```

---

## Files

| File | Description |
|---|---|
| `og-skill.js` | Main skill — load via CDN |
| `og-brand.css` | Brand stylesheet — auto-loaded by skill |
| `demo.html` | Full demo page (open in browser) |

---

## CDN Links (jsDelivr)

```
JS:  https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-skill.js
CSS: https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-brand.css
```

> jsDelivr CDN takes ~5 minutes to propagate after first push.

---

## Brand Reference

Based on the official [OpenGradient website](https://opengradient.ai) and [Branding Kit](https://opengradient.notion.site/Branding-Kit-b0ed295da43f479dbbd0e603029666b1):

- **Colors**: Primary `#24bce3`, Dark `#0e4b5b`, Navy `#0a0f19`
- **Font**: Geist (sans) + Geist Mono
- **Logo**: Official wordmark SVG from opengradient.ai (uses `currentColor`)
- **Style**: Dark navy backgrounds, brand blue accents, clean modern design

---

## License

MIT — free to use in any OpenGradient project.
