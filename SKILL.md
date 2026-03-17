---
name: og-brand
description: Generate a complete OpenGradient-branded website with bold design, micro-animations, and scroll effects. Writes an HTML file and opens it in the browser.
trigger: User wants to build an OpenGradient-branded HTML page, landing page, marketing site, demo, or UI component. Trigger phrases include "build a", "create a", "make a", "generate a" site/page/landing/dashboard followed by a product or feature description, OR when the user explicitly invokes /og-brand. Also triggers when the user says they want to use the og-brand skill or test the skill.
---

## Objective

Generate a production-ready, visually distinctive single HTML file using the OpenGradient brand skill (`og-skill.js` via CDN). Parse the user's description, choose a bold design direction, write complete HTML with animations, and open it in the browser immediately.

## CDN Setup (always required)

```html
<script src="https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-skill.js"></script>
```

This single script auto-loads `og-brand.css` and injects the official logo SVG wherever `data-og-logo="wordmark"` is found.

## Theme Selection

Choose the theme based on the product context:

| Theme class on `<body>` | Use when |
|---|---|
| `og-scope` | Dark navy — AI/tech products, infra, nodes, developer tools |
| `og-scope og-light` | White/teal — matches real opengradient.ai; use for OG marketing pages, grants, ecosystem sites |
| `og-scope og-finance` | Dark + mono data — trading, analytics, dashboards, leaderboards |
| `og-scope og-minimal` | Ultra-clean white — consumer apps, SaaS, MemSync-style |

## Logo Rule (critical)

**Always** use `<div data-og-logo="wordmark" style="height:30px;"></div>` in the nav.

- On **light backgrounds** (`og-light`, `og-minimal`): add `filter: brightness(0)` to make the white SVG dark.
- On **dark backgrounds** (`og-scope`, `og-finance`): no filter needed.
- **Never** write custom inline SVG as a logo.
- **Never** use text "OpenGradient" styled as a logo.
- Footer logo: `style="height:22px; opacity:.4;"` (+ `filter: brightness(0)` on light themes).

## Brand Tokens

```css
/* Core palette */
--og-blue:       #24bce3   /* primary accent */
--og-navy:       #0a0f19   /* dark bg */
--og-navy-mid:   #141e32   /* cards */
--og-teal-dark:  #0e4b5b   /* dark text on light */
--og-green:      #41c885   /* success / finance gains */
--og-red:        #f05168   /* error / finance losses */

/* Hub tokens */
--og-hub-blue:       #11558e
--og-hub-pink:       #e74771
--og-hub-blue-light: #CEE5F9
--og-hub-bg-darkest: #03111c
```

## Component Classes

Use these from `og-brand.css`:

```
og-scope, og-light, og-finance, og-minimal, og-hub
og-h1 … og-h4, og-body, og-caption
og-btn og-btn-primary, og-btn-secondary, og-btn-lg, og-btn-sm
og-btn-dark, og-btn-mono    ← for og-light theme (UPPERCASE pill buttons)
og-card, og-grid, og-badge, og-badge-primary
og-divider, og-nav, og-hero, og-container, og-section
og-text-gradient             ← static cyan gradient text
og-reveal                    ← scroll-triggered fade+slide up
og-float                     ← gentle float animation
og-levitate                  ← slower premium levitate with shadow
og-pulse-glow                ← radial glow pulse (for badges, CTAs)
og-shimmer                   ← shimmer sweep
og-tilt                      ← 3D tilt on hover (cards)
og-stagger, og-stagger-fast  ← stagger children entrance
og-marquee + og-marquee__track + og-marquee__item   ← infinite scroll ticker
og-table-wrap + og-table     ← data table with hover rows
og-tabs + og-tabs__nav + og-tabs__tab + og-tabs__panel
og-timeline + og-timeline__item
og-progress + og-progress__bar
og-alert (--info, --success, --warning, --error)
og-count-up                  ← number counter on scroll (data-target="2400")
```

## Animation Patterns (embed in `<style>`)

```css
@keyframes ogFadeUp {
  from { opacity:0; transform:translateY(24px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes ogHeroIn {
  from { opacity:0; transform:translateY(32px) scale(0.98); }
  to   { opacity:1; transform:translateY(0) scale(1); }
}
@keyframes ogFloat {
  0%,100% { transform:translateY(0px); }
  50%      { transform:translateY(-10px); }
}
@keyframes ogGlowPulse {
  0%,100% { box-shadow:0 0 12px rgba(36,188,227,.3); }
  50%      { box-shadow:0 0 32px rgba(36,188,227,.65),0 0 60px rgba(36,188,227,.2); }
}
@keyframes ogGradientShift {
  0%,100% { background-position:0% 50%; }
  50%      { background-position:100% 50%; }
}
@keyframes ogBlink { 50% { opacity:0; } }

.og-stagger > * { opacity:0; transform:translateY(24px); animation:ogFadeUp 0.65s cubic-bezier(0.16,1,0.3,1) both; }
.og-stagger > *:nth-child(1) { animation-delay:.05s; }
.og-stagger > *:nth-child(2) { animation-delay:.15s; }
.og-stagger > *:nth-child(3) { animation-delay:.25s; }
.og-stagger > *:nth-child(4) { animation-delay:.35s; }

.og-float { animation: ogFloat 5s ease-in-out infinite; }
.og-pulse-glow { animation: ogGlowPulse 2.5s ease-in-out infinite; }

.og-text-gradient-animate {
  background: linear-gradient(270deg,#24bce3,#50c9e9,#bdebf7,#24bce3);
  background-size:300% 300%;
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  animation: ogGradientShift 5s ease infinite;
}
.og-border-glow { border:1px solid rgba(36,188,227,.15); transition:border-color .3s,box-shadow .3s; }
.og-border-glow:hover { border-color:rgba(36,188,227,.45); box-shadow:0 0 24px rgba(36,188,227,.1); }
.og-tilt { transform-style:preserve-3d; transition:transform .15s ease; }
.og-btn-glow { transition:box-shadow .2s,filter .2s; }
.og-btn-glow:hover { box-shadow:0 0 24px rgba(36,188,227,.5); filter:brightness(1.1); }
.og-cursor { display:inline-block;width:2px;height:1em;background:#24bce3;margin-left:2px;vertical-align:text-bottom;animation:ogBlink .9s step-end infinite; }

@media (prefers-reduced-motion:reduce) {
  *,*::before,*::after { animation-duration:.01ms !important; transition-duration:.01ms !important; }
}
```

## JS Patterns (add before `</body>`)

```js
// Count-up on scroll
document.querySelectorAll('[data-target]').forEach(el => {
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    const target = +el.dataset.target, suffix = el.dataset.suffix || '';
    let v = 0; const step = target / 60;
    const t = setInterval(() => { v = Math.min(v+step, target); el.textContent = Math.floor(v).toLocaleString() + suffix; if (v >= target) clearInterval(t); }, 16);
    io.disconnect();
  });
  io.observe(el);
});

// 3D tilt on cards
document.querySelectorAll('.og-tilt').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x*12}deg) rotateX(${-y*12}deg) scale(1.03)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});
```

## Page Structure Rules

1. **One file only** — everything inline, no external CSS/JS beyond `og-skill.js`.
2. **Filename** — `og-[slug].html` saved in the current working directory.
3. **Auto-open** — run `open og-[slug].html` after writing.
4. **No lorem ipsum** — real copy relevant to the description.
5. **Hero entrance** — h1 gets `animation: ogHeroIn .8s cubic-bezier(.16,1,.3,1) both .2s`, subtext `0.45s delay`, CTA `0.6s delay`.
6. **Every grid** — wrap children in `og-stagger`, add `og-tilt` to feature cards.
7. **Every button** — add `og-btn-glow` and `og-pulse-glow` to primary CTAs.
8. **Sections** — separated by `<div class="og-divider"></div>` or gradient borders.
9. **Floating hero elements** — add `og-float` or `og-levitate` to mockups, icons, dashboard widgets.

## Design Directions (pick one per build)

- **Editorial dark tech** — big type, stark contrast, minimal color
- **Terminal finance** — mono fonts everywhere, green/red heat data, scan-line effects
- **Stripe API docs** — white left sidebar + dark code panels right
- **Glassmorphism depth** — backdrop-filter panels, layered transparency
- **Minimal levitate** — ultra-clean whitespace, single floating UI mockup
- **Infra dark** — hex grid bg, node maps, data flow visualizations
- **Bold stat-forward** — massive count-up numbers, podium leaderboards

State the chosen direction in a CSS comment at the top of `<style>`.

## Self-Review Checklist (before saving)

- ✓ `<script src=".../og-skill.js">` in `<head>`
- ✓ `<body class="og-scope ...">` has theme class
- ✓ `<div data-og-logo="wordmark">` in nav — NOT custom SVG or text
- ✓ On light theme: `filter: brightness(0)` on logo div
- ✓ No custom inline `<svg>` written as logo
- ✓ `og-stagger` on all feature/card grids
- ✓ Count-up JS present if stats section exists
- ✓ Tilt JS present if `og-tilt` cards exist
- ✓ File saved and `open` command run

## Output Format

After generating the file, respond with:
- **Filename**
- **Theme** used (one word)
- **Design direction** (one phrase)
- **Key sections** (bullet list)
