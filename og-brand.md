---
name: og-brand
description: Generate a complete OpenGradient-branded website with bold design, micro-animations, and scroll effects. Writes an HTML file and opens it in the browser.
argument-hint: "<description of the site to build>"
allowed-tools:
  - Write
  - Bash
  - Read
---

<objective>
Generate a production-ready, visually distinctive HTML page using the OpenGradient brand skill (`og-skill.js` via CDN).

The user's argument (`$ARGUMENTS`) describes the site. Build it with **intentional design** — bold typography, purposeful animations, and micro-interactions that feel premium. Reject generic AI aesthetics.

**Output:** single `.html` file, opened in the browser immediately.
</objective>

<design_philosophy>
Inspired by the Anthropic frontend-design skill (277k installs) and professional animation toolkits:

1. **Bold intentionality** — every spacing, animation, and color choice has a reason. No Inter + rounded cards + purple gradient defaults.
2. **Motion with purpose** — animate to guide attention, not to show off. Entrance animations stagger from bottom. Hover states respond instantly (< 200ms). Scroll reveals are smooth (0.6s ease).
3. **Spatial surprise** — break the grid occasionally. Overlap elements. Use asymmetric padding. Let headings breathe with negative letter-spacing.
4. **Dark first** — navy `#0a0f19` backgrounds with `#24bce3` as the ONLY accent. No purple, no lime, no warm tones.
5. **Micro-interactions everywhere** — buttons glow on hover, cards lift + border brightens, badges pulse, nav blurs on scroll.

**Real OG ecosystem design patterns (extracted from production sites):**
- opengradient.ai: Actually a **LIGHT THEME** site — white bg, `#0e4b5b` text, buttons are `font-mono UPPERCASE` with pill shape
- bitquant.io: Finance dashboard aesthetic — mono fonts everywhere, data rows, green/red stat colors
- memsync.ai: Ultra-clean minimal — marquee tickers, levitating hero elements, lots of whitespace
</design_philosophy>

<rules>
1. **One file only** — everything in one `.html`. No external CSS/JS beyond og-skill.js.
2. **Always load og-skill.js first** — `<script src="https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-skill.js"></script>` in `<head>`. It auto-loads og-brand.css (brand classes + animation utilities).
3. **Use brand classes** — `og-scope`, `og-h1`…`og-h4`, `og-btn og-btn-primary`, `og-card`, `og-grid`, `og-reveal`, `og-badge`, `og-text-gradient`, etc.
4. **Animation classes from og-brand.css** (use these, they are pre-built):
   - `og-reveal` — scroll-triggered fade+slide up (auto-initialized by og-skill.js)
   - `og-float` — continuous gentle floating (for hero icons, mockups)
   - `og-levitate` — MemSync-style smooth levitate with drop shadow (slower, more premium)
   - `og-pulse-glow` — brand-blue radial glow pulse (for badges, icons)
   - `og-shimmer` — shimmer sweep across text or surface
   - `og-border-glow` — animated border gradient around cards
   - `og-text-glitch` — subtle glitch effect on headlines (use sparingly)
   - `og-count-up` — number counter animation on scroll (add `data-target="2400"`)
   - `og-stagger` — stagger children entrance (add to grid/list parent)
   - `og-tilt` — 3D tilt on hover (for cards and mockups)
   - `og-marquee` + `og-marquee__track` + `og-marquee__item` — horizontal infinite scroll ticker (MemSync-style with edge fade mask)
5. **Choose theme based on context:**
   - `<body class="og-scope">` — dark navy (default, AI/tech products)
   - `<body class="og-scope og-light">` — white/teal (matches real opengradient.ai exactly; buttons become font-mono uppercase pills)
   - `<body class="og-scope og-finance">` — DeFi/data dashboard (mono fonts, data rows, chart bars)
   - `<body class="og-scope og-minimal">` — ultra-clean minimal (MemSync style; use with `og-marquee`, `og-levitate`)

   Use `og-light` when: building something that should look like the actual OG website.
   Use `og-finance` when: financial data, trading, analytics dashboards.
   Use `og-minimal` when: consumer apps, SaaS marketing, ultra-clean landing pages.
6. **Filename** — `og-[slug].html` in current directory.
7. **Auto-open** — `open og-[slug].html` after writing.
8. **No Lorem ipsum** — real copy relevant to the description.
9. **Stagger all grid children** — wrap in `og-stagger` and add `og-reveal` to each child with increasing `style="--delay: 0.1s"` through `--delay: 0.4s`.
10. **Entrance animations on hero** — h1 gets `fadeUp 0.7s ease both 0.2s`, subtext `0.5s delay`, CTA `0.7s delay`.
11. **Every button** — add `og-btn-glow` class for hover glow effect.
12. **Every section** — has a subtle `og-divider` or gradient separator.
</rules>

<animation_patterns>
Use these CSS patterns inline in `<style>` when building the page:

```css
/* Entrance — stagger children */
.og-stagger > * {
  opacity: 0;
  transform: translateY(24px);
  animation: ogFadeUp 0.65s cubic-bezier(0.16,1,0.3,1) both;
}
.og-stagger > *:nth-child(1) { animation-delay: 0.05s; }
.og-stagger > *:nth-child(2) { animation-delay: 0.15s; }
.og-stagger > *:nth-child(3) { animation-delay: 0.25s; }
.og-stagger > *:nth-child(4) { animation-delay: 0.35s; }

@keyframes ogFadeUp {
  from { opacity:0; transform:translateY(24px); }
  to   { opacity:1; transform:translateY(0); }
}

/* Hero text entrance */
@keyframes ogHeroIn {
  from { opacity:0; transform:translateY(32px) scale(0.98); }
  to   { opacity:1; transform:translateY(0) scale(1); }
}

/* Float — for mockups, icons */
@keyframes ogFloat {
  0%,100% { transform:translateY(0px) rotate(0deg); }
  33%      { transform:translateY(-8px) rotate(0.5deg); }
  66%      { transform:translateY(-4px) rotate(-0.3deg); }
}
.og-float { animation: ogFloat 5s ease-in-out infinite; }

/* Glow pulse — for live badges, CTAs */
@keyframes ogGlowPulse {
  0%,100% { box-shadow: 0 0 12px rgba(36,188,227,0.3); }
  50%     { box-shadow: 0 0 28px rgba(36,188,227,0.6), 0 0 50px rgba(36,188,227,0.2); }
}
.og-pulse-glow { animation: ogGlowPulse 2.5s ease-in-out infinite; }

/* Shimmer sweep */
@keyframes ogShimmer {
  from { background-position: -200% center; }
  to   { background-position: 200% center; }
}
.og-shimmer {
  background: linear-gradient(90deg, transparent 0%, rgba(36,188,227,0.4) 50%, transparent 100%);
  background-size: 200% 100%;
  animation: ogShimmer 2.5s linear infinite;
}

/* Animated border gradient */
@keyframes ogBorderSpin {
  from { --angle: 0deg; }
  to   { --angle: 360deg; }
}
.og-border-glow {
  border: 1px solid rgba(36,188,227,0.2);
  transition: border-color 0.3s;
}
.og-border-glow:hover {
  border-color: rgba(36,188,227,0.5);
  box-shadow: 0 0 20px rgba(36,188,227,0.1), inset 0 0 20px rgba(36,188,227,0.03);
}

/* Gradient text animation */
@keyframes ogGradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.og-text-gradient-animate {
  background: linear-gradient(270deg, #24bce3, #50c9e9, #bdebf7, #24bce3);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ogGradientShift 5s ease infinite;
}

/* Count-up number (trigger with JS on scroll) */
.og-count-up { transition: opacity 0.3s; }

/* Card 3D tilt — via inline JS on mousemove */
.og-tilt {
  transform-style: preserve-3d;
  transition: transform 0.15s ease;
}

/* Typing cursor blink */
@keyframes ogBlink { 50% { opacity: 0; } }
.og-cursor {
  display: inline-block; width: 2px; height: 1em;
  background: #24bce3; margin-left: 2px;
  vertical-align: text-bottom;
  animation: ogBlink 0.9s step-end infinite;
}

/* Noise texture overlay (subtle) */
.og-noise::before {
  content: '';
  position: absolute; inset: 0; z-index: 1;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Inline JS for count-up and tilt (add before </body>):**
```js
// Count-up on scroll
document.querySelectorAll('[data-target]').forEach(el => {
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    let v = 0; const step = target / 60;
    const t = setInterval(() => {
      v = Math.min(v + step, target);
      el.textContent = Math.floor(v).toLocaleString() + suffix;
      if (v >= target) clearInterval(t);
    }, 16);
    io.disconnect();
  });
  io.observe(el);
});

// 3D card tilt
document.querySelectorAll('.og-tilt').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x*10}deg) rotateX(${-y*10}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale(1)';
  });
});
```
</animation_patterns>

<approach>
1. Parse `$ARGUMENTS`: site purpose, audience, key message, tone.
2. Choose a **design direction** — don't default to generic. Examples: "editorial dark tech", "minimal brutalist", "glassmorphism depth", "bold stat-forward". State the choice in a comment.
3. Plan sections adapted to the purpose.
4. Write the complete HTML with:
   - Full animation CSS in `<style>` (use patterns above + page-specific)
   - `og-stagger` on all grids
   - `og-tilt` on feature cards
   - `og-float` on hero graphics/mockups
   - `og-pulse-glow` on live badges and CTAs
   - count-up JS for any stats
   - tilt JS for cards
5. Save and open.
</approach>

<html_template>
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[TITLE]</title>
  <script src="https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-skill.js"></script>
  <style>
    /* Design direction: [STATE YOUR CHOICE HERE] */

    /* Page-specific animations */
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
    @keyframes ogShimmer {
      from { background-position:-200% center; }
      to   { background-position:200% center; }
    }
    @keyframes ogBlink { 50% { opacity:0; } }

    .og-stagger > * { opacity:0; transform:translateY(24px); animation:ogFadeUp 0.65s cubic-bezier(0.16,1,0.3,1) both; }
    .og-stagger > *:nth-child(1) { animation-delay:.05s; }
    .og-stagger > *:nth-child(2) { animation-delay:.15s; }
    .og-stagger > *:nth-child(3) { animation-delay:.25s; }
    .og-stagger > *:nth-child(4) { animation-delay:.35s; }

    .og-float { animation:ogFloat 5s ease-in-out infinite; }
    .og-pulse-glow { animation:ogGlowPulse 2.5s ease-in-out infinite; }
    .og-text-gradient-animate {
      background:linear-gradient(270deg,#24bce3,#50c9e9,#bdebf7,#24bce3);
      background-size:300% 300%;
      -webkit-background-clip:text; -webkit-text-fill-color:transparent;
      background-clip:text;
      animation:ogGradientShift 5s ease infinite;
    }
    .og-border-glow { border:1px solid rgba(36,188,227,.15); transition:border-color .3s,box-shadow .3s; }
    .og-border-glow:hover { border-color:rgba(36,188,227,.45); box-shadow:0 0 24px rgba(36,188,227,.1),inset 0 0 20px rgba(36,188,227,.04); }
    .og-tilt { transform-style:preserve-3d; transition:transform .15s ease; }
    .og-btn-glow { transition:box-shadow .2s,filter .2s; }
    .og-btn-glow:hover { box-shadow:0 0 24px rgba(36,188,227,.5); filter:brightness(1.1); }
    .og-cursor { display:inline-block;width:2px;height:1em;background:#24bce3;margin-left:2px;vertical-align:text-bottom;animation:ogBlink .9s step-end infinite; }

    @media (prefers-reduced-motion:reduce) {
      *,*::before,*::after { animation-duration:.01ms !important; transition-duration:.01ms !important; }
    }

    /* [PAGE-SPECIFIC STYLES BELOW] */
  </style>
</head>
<body class="og-scope">

  <!-- NAV -->
  <nav class="og-nav">
    <div class="og-container" style="display:flex;align-items:center;justify-content:space-between;padding:1rem 2rem;">
      <div data-og-logo="wordmark" style="height:30px;"></div>
      <div style="display:flex;align-items:center;gap:2rem;">
        <a href="#" class="og-body" style="color:var(--og-primary-200);text-decoration:none;font-size:.88rem;">[NAV 1]</a>
        <a href="#" class="og-body" style="color:var(--og-primary-200);text-decoration:none;font-size:.88rem;">[NAV 2]</a>
        <a href="#" class="og-btn og-btn-primary og-btn-sm og-btn-glow og-pulse-glow">[CTA NAV]</a>
      </div>
    </div>
  </nav>

  <!-- HERO -->
  <section class="og-hero" style="padding-top:120px;min-height:90vh;display:flex;align-items:center;">
    <div class="og-container" style="text-align:center;padding:3rem 2rem;">
      <span class="og-badge og-badge-primary og-pulse-glow" style="display:inline-block;margin-bottom:1.5rem;animation:ogFadeUp .5s ease both .1s;">[BADGE]</span>
      <h1 class="og-h1 og-text-gradient-animate" style="animation:ogHeroIn .8s cubic-bezier(.16,1,.3,1) both .2s;">[HEADLINE]</h1>
      <p class="og-body" style="max-width:560px;margin:1.5rem auto 2.5rem;font-size:1.1rem;color:var(--og-primary-200);animation:ogFadeUp .7s ease both .45s;">[SUBTEXT]</p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;animation:ogFadeUp .7s ease both .6s;">
        <a href="#" class="og-btn og-btn-primary og-btn-lg og-btn-glow og-pulse-glow">[PRIMARY CTA]</a>
        <a href="#" class="og-btn og-btn-secondary og-btn-lg og-btn-glow">[SECONDARY CTA]</a>
      </div>
    </div>
  </section>

  <div class="og-divider"></div>

  <!-- CONTENT SECTIONS with og-stagger + og-tilt + og-reveal -->

  <!-- FOOTER -->
  <footer style="padding:3rem 2rem;border-top:1px solid rgba(36,188,227,.06);">
    <div class="og-container" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
      <div data-og-logo="mark" style="height:24px;opacity:.4;"></div>
      <p class="og-caption" style="color:rgba(36,188,227,.3);">© 2025 OpenGradient. MIT License.</p>
    </div>
  </footer>

</body>
<script>
// Count-up
document.querySelectorAll('[data-target]').forEach(el => {
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    const target = +el.dataset.target, suffix = el.dataset.suffix||'';
    let v=0; const step=target/60;
    const t=setInterval(()=>{ v=Math.min(v+step,target); el.textContent=Math.floor(v).toLocaleString()+suffix; if(v>=target)clearInterval(t); },16);
    io.disconnect();
  });
  io.observe(el);
});
// Tilt
document.querySelectorAll('.og-tilt').forEach(c => {
  c.addEventListener('mousemove',e=>{ const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5; c.style.transform=`perspective(700px) rotateY(${x*12}deg) rotateX(${-y*12}deg) scale(1.03)`; });
  c.addEventListener('mouseleave',()=>{ c.style.transform=''; });
});
</script>
</html>
```
</html_template>

<response_format>
- Filename
- Design direction chosen (1 phrase)
- Key sections + animation highlights
</response_format>
