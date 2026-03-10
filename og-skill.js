/**
 * OpenGradient Brand Skill v1.0.0
 * Auto-loads brand assets from GitHub and applies OG visual identity
 * Usage: <script src="https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-skill.js"></script>
 *
 * @license MIT
 * @repo github.com/golldyck/opengradient-brand-skill
 */

(function (global) {
    'use strict';

   /* ============================================================
       CONFIG — change REPO_BASE to point to your own fork if needed
       ============================================================ */
   var REPO_BASE = 'https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main';
    var CSS_URL   = REPO_BASE + '/og-brand.css';
    var FONT_URL  = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap';

   /* ============================================================
       INLINE LOGO SVG (no external image request needed)
       ============================================================ */
   var LOGO_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">'
      + '<path d="M60 10 C60 10 90 30 90 60 C90 90 60 110 60 110 C60 110 30 90 30 60 C30 30 60 10 60 10Z" stroke="url(#og-g1)" stroke-width="4" fill="none"/>'
      + '<path d="M10 60 C10 60 30 30 60 30 C90 30 110 60 110 60 C110 60 90 90 60 90 C30 90 10 60 10 60Z" stroke="url(#og-g2)" stroke-width="4" fill="none"/>'
      + '<circle cx="60" cy="60" r="12" stroke="url(#og-g3)" stroke-width="3" fill="none"/>'
      + '<defs>'
      + '<linearGradient id="og-g1" x1="60" y1="10" x2="60" y2="110" gradientUnits="userSpaceOnUse">'
      + '<stop offset="0%" stop-color="#00D4E8"/>'
      + '<stop offset="100%" stop-color="#D4FF00"/>'
      + '</linearGradient>'
      + '<linearGradient id="og-g2" x1="10" y1="60" x2="110" y2="60" gradientUnits="userSpaceOnUse">'
      + '<stop offset="0%" stop-color="#D4FF00"/>'
      + '<stop offset="100%" stop-color="#00D4E8"/>'
      + '</linearGradient>'
      + '<linearGradient id="og-g3" x1="48" y1="48" x2="72" y2="72" gradientUnits="userSpaceOnUse">'
      + '<stop offset="0%" stop-color="#00D4E8"/>'
      + '<stop offset="100%" stop-color="#D4FF00"/>'
      + '</linearGradient>'
      + '</defs>'
      + '</svg>';

   /* ============================================================
       LOGO SVG — CYAN (single color for nav/footer)
       ============================================================ */
   var LOGO_SVG_CYAN = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">'
      + '<path d="M60 10 C60 10 90 30 90 60 C90 90 60 110 60 110 C60 110 30 90 30 60 C30 30 60 10 60 10Z" stroke="#00D4E8" stroke-width="4" fill="none"/>'
      + '<path d="M10 60 C10 60 30 30 60 30 C90 30 110 60 110 60 C110 60 90 90 60 90 C30 90 10 60 10 60Z" stroke="#00D4E8" stroke-width="4" fill="none"/>'
      + '<circle cx="60" cy="60" r="12" stroke="#00D4E8" stroke-width="3" fill="none"/>'
      + '</svg>';

   /* ============================================================
       LOAD CSS
       ============================================================ */
   function loadCSS(url) {
         if (document.querySelector('link[data-og-brand]')) return;
         var link = document.createElement('link');
         link.rel = 'stylesheet';
         link.href = url;
         link.setAttribute('data-og-brand', 'css');
         document.head.appendChild(link);
   }

   /* ============================================================
       LOAD GOOGLE FONTS
       ============================================================ */
   function loadFonts(url) {
         if (document.querySelector('link[data-og-font]')) return;
         var preconn = document.createElement('link');
         preconn.rel = 'preconnect';
         preconn.href = 'https://fonts.googleapis.com';
         document.head.appendChild(preconn);

      var preconn2 = document.createElement('link');
         preconn2.rel = 'preconnect';
         preconn2.href = 'https://fonts.gstatic.com';
         preconn2.crossOrigin = 'anonymous';
         document.head.appendChild(preconn2);

      var link = document.createElement('link');
         link.rel = 'stylesheet';
         link.href = url;
         link.setAttribute('data-og-font', 'roboto');
         document.head.appendChild(link);
   }

   /* ============================================================
       INJECT LOGO into elements with [data-og-logo]
       ============================================================ */
   function injectLogos() {
         var els = document.querySelectorAll('[data-og-logo]');
         els.forEach(function (el) {
                 var variant = el.getAttribute('data-og-logo') || 'color';
                 var mark = variant === 'cyan' ? LOGO_SVG_CYAN : LOGO_SVG;

                           var container = document.createElement('span');
                 container.className = 'og-logo';
                 container.innerHTML =
                           '<span class="og-logo__mark">' + mark + '</span>'
                   + '<span class="og-logo__wordmark">OpenGradient</span>';

                           el.innerHTML = '';
                 el.appendChild(container);
         });
   }

   /* ============================================================
       BUILD PAGE — if data-og-build is set on <body> or a wrapper,
       auto-scaffold a full branded page skeleton
       ============================================================ */
   function buildPage(root) {
         var title   = root.getAttribute('data-og-title') || 'OpenGradient';
         var tagline = root.getAttribute('data-og-tagline') || 'Decentralized AI Infrastructure';
         var cta     = root.getAttribute('data-og-cta') || 'Get Started';
         var ctaUrl  = root.getAttribute('data-og-cta-url') || '#';

      root.classList.add('og-scope');

      root.innerHTML =

              /* NAV */
              '<nav class="og-nav">'
           + '<div class="og-nav__inner">'
           + '  <a href="/" class="og-logo" data-og-logo="cyan"></a>'
           + '  <ul class="og-nav__links">'
           + '    <li><a class="og-nav__link" href="#">Docs</a></li>'
           + '    <li><a class="og-nav__link" href="#">Models</a></li>'
           + '    <li><a class="og-nav__link" href="#">Community</a></li>'
           + '    <li><a class="og-btn og-btn-primary og-btn-sm" href="' + ctaUrl + '">' + cta + '</a></li>'
           + '  </ul>'
           + '</div>'
           + '</nav>'

        /* HERO */
        + '<section class="og-hero">'
           + '<div class="og-hero__content">'
           + '  <div class="og-mb-24"><span class="og-badge og-badge-cyan">↗ Now Live</span></div>'
           + '  <h1 class="og-h1"><span class="og-text-gradient">' + title + '</span></h1>'
           + '  <p class="og-body og-mt-24" style="max-width:560px;margin-left:auto;margin-right:auto">' + tagline + '</p>'
           + '  <div class="og-flex og-justify-center og-gap-16 og-mt-32">'
           + '    <a href="' + ctaUrl + '" class="og-btn og-btn-primary og-btn-lg">' + cta + '</a>'
           + '    <a href="#" class="og-btn og-btn-secondary og-btn-lg">Learn More</a>'
           + '  </div>'
           + '</div>'
           + '</section>'

        /* STATS */
        + '<section class="og-section og-bg-dark">'
           + '<div class="og-container">'
           + '  <div class="og-grid og-grid-4">'
           + '    <div class="og-stat"><div class="og-stat__value">1M+</div><div class="og-stat__label">Model Calls</div></div>'
           + '    <div class="og-stat"><div class="og-stat__value">500+</div><div class="og-stat__label">AI Models</div></div>'
           + '    <div class="og-stat"><div class="og-stat__value">99.9%</div><div class="og-stat__label">Uptime</div></div>'
           + '    <div class="og-stat"><div class="og-stat__value">50ms</div><div class="og-stat__label">Avg Latency</div></div>'
           + '  </div>'
           + '</div>'
           + '</section>'

        /* FEATURES */
        + '<section class="og-section">'
           + '<div class="og-container">'
           + '  <div class="og-text-center og-mb-48">'
           + '    <span class="og-label">Features</span>'
           + '    <h2 class="og-h2 og-mt-16">Built for <span class="og-text-gradient">Developers</span></h2>'
           + '  </div>'
           + '  <div class="og-grid og-grid-3">'
           + '    <div class="og-card og-card-glow">'
           + '      <div class="og-badge og-badge-cyan og-mb-16">SDK</div>'
           + '      <h3 class="og-h4">Model Hub</h3>'
           + '      <p class="og-body og-mt-8">Access hundreds of AI models through a unified API with simple SDK integration.</p>'
           + '    </div>'
           + '    <div class="og-card og-card-glow">'
           + '      <div class="og-badge og-badge-lime og-mb-16">Infra</div>'
           + '      <h3 class="og-h4">Decentralized Compute</h3>'
           + '      <p class="og-body og-mt-8">Run inference on a global network of nodes with cryptographic verification.</p>'
           + '    </div>'
           + '    <div class="og-card og-card-glow">'
           + '      <div class="og-badge og-badge-cyan og-mb-16">On-Chain</div>'
           + '      <h3 class="og-h4">AI Contracts</h3>'
           + '      <p class="og-body og-mt-8">Deploy AI-powered smart contracts that call models directly from the blockchain.</p>'
           + '    </div>'
           + '  </div>'
           + '</div>'
           + '</section>'

        /* CODE EMBED EXAMPLE */
        + '<section class="og-section og-bg-dark">'
           + '<div class="og-container og-text-center">'
           + '  <span class="og-label">Quick Start</span>'
           + '  <h2 class="og-h2 og-mt-16 og-mb-32">One line to <span class="og-text-cyan">integrate</span></h2>'
           + '  <pre class="og-code" style="text-align:left;max-width:700px;margin:0 auto">'
           + '<code>import opengradient as og\n\nog.init("YOUR_API_KEY")\n\nresult = og.infer(\n  model="meta-llama/Llama-3-70b",\n  messages=[{"role": "user", "content": "Hello!"}]\n)\nprint(result.output)</code>'
           + '</pre>'
           + '  <a href="' + ctaUrl + '" class="og-btn og-btn-primary og-btn-lg og-mt-32">' + cta + '</a>'
           + '</div>'
           + '</section>'

        /* DIVIDER */
        + '<hr class="og-divider" style="margin:0"/>'

        /* FOOTER */
        + '<footer class="og-footer">'
           + '<div class="og-footer__inner">'
           + '  <a href="/" class="og-logo" data-og-logo="cyan"></a>'
           + '  <p class="og-caption">© ' + new Date().getFullYear() + ' OpenGradient. All rights reserved.</p>'
           + '  <div class="og-flex og-gap-24">'
           + '    <a class="og-caption" href="#" style="color:inherit;text-decoration:none">Privacy</a>'
           + '    <a class="og-caption" href="#" style="color:inherit;text-decoration:none">Terms</a>'
           + '    <a class="og-caption" href="#" style="color:inherit;text-decoration:none">Docs</a>'
           + '  </div>'
           + '</div>'
           + '</footer>';

      injectLogos();
   }

   /* ============================================================
       INIT
       ============================================================ */
   function init() {
         loadFonts(FONT_URL);
         loadCSS(CSS_URL);

      /* Wait for DOM if needed */
      if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', run);
      } else {
              run();
      }
   }

   function run() {
         /* Auto-build if body has data-og-build attribute */
      var buildTarget = document.querySelector('[data-og-build]');
         if (buildTarget) {
                 buildPage(buildTarget);
                 return;
         }

      /* Otherwise just inject logos */
      injectLogos();
   }

   /* ============================================================
       PUBLIC API
       ============================================================ */
   global.OGBrand = {
         init:        init,
         buildPage:   buildPage,
         injectLogos: injectLogos,
         loadCSS:     loadCSS,
         LOGO_SVG:    LOGO_SVG,
         LOGO_SVG_CYAN: LOGO_SVG_CYAN
   };

   /* Auto-init */
   init();

}(typeof window !== 'undefined' ? window : this));
