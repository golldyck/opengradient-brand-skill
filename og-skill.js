/**
 * OpenGradient Brand Skill v3.0.0
 * Applies real OpenGradient visual identity to any project.
 * Usage: <script src="https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-skill.js"></script>
 *
 * NEW in v3.0:
 *  - Real OpenGradient logo SVG (official wordmark from opengradient.ai)
 *  - Real brand colors (#24bce3 primary, #0e4b5b dark, #0a0f19 navy)
 *  - Geist font (official OG font via Google Fonts)
 *  - Image brand overlay (.og-img-overlay)
 *  - Light theme support (.og-light)
 *  - Clean code (removed excessive indentation from v2.0)
 *
 * @license MIT
 * @repo github.com/golldyck/opengradient-brand-skill
 */

(function (global) {
  'use strict';

  /* ============================================================
     CONFIG
  ============================================================ */
  var REPO_BASE = 'https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main';
  var CSS_URL   = REPO_BASE + '/og-brand.css';
  var FONT_URL  = 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap';

  /* ============================================================
     LOGO SVG — FULL WORDMARK (official from opengradient.ai)
     Uses currentColor — set CSS `color` property to control hue.
  ============================================================ */
  var LOGO_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 643 121">' +
    '<g clip-path="url(#og-logo-clip)">' +
    '<path fill="currentColor" d="M513.463 30.217c-4.058 0-6.238 2.105-6.238 5.865 0 3.91 2.255 6.09 6.238 6.09s6.238-2.18 6.238-6.09c0-3.76-2.255-5.865-6.238-5.865m28.766 17.37c-10.897 0-18.487 7.82-18.487 19.4 0 11.429 7.515 18.948 18.788 18.948 8.266 0 14.052-3.233 16.533-9.624l-8.267-3.008c-1.804 3.91-3.682 5.189-8.041 5.189-5.787 0-8.492-2.557-9.093-8.723h26.152c.075-1.504.075-2.332.075-3.534 0-11.354-7.139-18.648-17.66-18.648m-8.567 15.64c.676-5.94 3.306-8.421 8.642-8.421 5.411 0 7.966 2.18 8.117 8.42zm53.85-15.64c-6.613 0-10.371 3.383-12.174 9.324v-8.572h-9.544v36.844h9.544V67.588c0-7.594 3.306-11.354 8.642-11.354 4.584 0 7.139 2.481 7.139 7.444v21.505h9.544V63.152c0-10.377-4.434-15.565-13.151-15.565m50.98-10.721a4.514 4.514 0 0 0-4.507 4.51 4.514 4.514 0 0 0 4.507 4.51 4.514 4.514 0 0 0 4.508-4.51 4.514 4.514 0 0 0-4.508-4.51m0 7.932a3.426 3.426 0 0 1-3.42-3.422 3.426 3.426 0 0 1 3.42-3.422 3.426 3.426 0 0 1 3.421 3.422 3.425 3.425 0 0 1-3.421 3.422m-17.706-7.438h-9.544v10.98h-7.064v8.421h7.064v16.994c0 6.843 4.584 11.43 11.423 11.43h7.891v-8.422h-9.77V56.76h10.671v-8.42h-10.671zm18.57 4.445c.622-.19.972-.673.972-1.335 0-.851-.604-1.423-1.639-1.423h-1.963v4.45h1.162V41.9h.597l.598 1.595h1.346l-.705-1.31zm-.769-.87h-.699v-.89h.699c.426 0 .585.127.585.438 0 .33-.159.452-.585.452m-374.669 6.652c-10.898 0-18.488 7.82-18.488 19.4 0 11.429 7.515 18.948 18.788 18.948 8.267 0 14.053-3.233 16.533-9.624l-8.266-3.008c-1.804 3.91-3.683 5.189-8.042 5.189-5.786 0-8.491-2.557-9.093-8.723h26.153c.075-1.504.075-2.332.075-3.534 0-11.354-7.14-18.648-17.66-18.648m-8.568 15.64c.677-5.94 3.307-8.421 8.643-8.421 5.411 0 7.966 2.18 8.116 8.42zM102.823 36.71a14.4 14.4 0 0 0-10.109-4.12H88.36v-4.358c0-3.801-1.462-7.393-4.116-10.114L70.82 4.363A14.36 14.36 0 0 0 60.466 0c-3.93 0-7.606 1.55-10.352 4.363L36.69 18.12a14.4 14.4 0 0 0-4.117 10.114v4.359h-4.356c-3.8 0-7.39 1.463-10.108 4.119L4.36 50.142A14.37 14.37 0 0 0 0 60.501a14.37 14.37 0 0 0 4.36 10.358L18.11 84.29a14.39 14.39 0 0 0 10.107 4.12h4.356v4.356a14.4 14.4 0 0 0 4.117 10.114l13.424 13.757A14.35 14.35 0 0 0 60.466 121c3.93 0 7.607-1.549 10.353-4.363l13.424-13.757a14.4 14.4 0 0 0 4.116-10.114V88.41h4.355c3.8 0 7.39-1.463 10.109-4.119l13.749-13.431a14.37 14.37 0 0 0 4.36-10.358c0-3.932-1.549-7.611-4.36-10.359l-13.749-13.431Zm-61.131 5.004h5.397c1.405 0 2.733.54 3.738 1.523l3.114 3.041-3.254 3.18a14 14 0 0 0-.574.556l-.128.128c-.19.187-.376.377-.535.552l-3.197 3.276-3.04-3.114a5.33 5.33 0 0 1-1.521-3.741zm0 32.17a5.32 5.32 0 0 1 1.522-3.74l3.04-3.116 3.166 3.246q.274.297.566.583l.127.127c.183.188.371.37.543.528l3.285 3.209-3.113 3.04a5.32 5.32 0 0 1-3.739 1.524h-5.397zM36.69 63.77a14.4 14.4 0 0 0-4.117 10.113v5.402h-4.356a5.32 5.32 0 0 1-3.738-1.523L10.73 64.332A5.31 5.31 0 0 1 9.118 60.5c0-1.454.573-2.815 1.613-3.831l13.748-13.432a5.32 5.32 0 0 1 3.738-1.523h4.356v5.4c0 3.803 1.463 7.395 4.117 10.114l3.191 3.271-3.19 3.27Zm42.552 28.995a5.32 5.32 0 0 1-1.523 3.741l-13.423 13.757a5.3 5.3 0 0 1-3.829 1.614 5.3 5.3 0 0 1-3.83-1.615L43.214 96.507a5.33 5.33 0 0 1-1.522-3.74v-4.358h5.397c3.799 0 7.389-1.463 10.109-4.119l3.268-3.193 3.269 3.194a14.4 14.4 0 0 0 10.108 4.118h5.399v4.357ZM54.407 60.5a6.07 6.07 0 0 1 6.06-6.063c3.34 0 6.059 2.72 6.059 6.063a6.07 6.07 0 0 1-6.06 6.063 6.067 6.067 0 0 1-6.059-6.063m24.835 18.786h-5.4a5.32 5.32 0 0 1-3.737-1.523l-3.114-3.041 3.255-3.18q.294-.27.568-.552l.133-.133c.192-.187.376-.378.534-.55l3.199-3.278 3.04 3.115a5.33 5.33 0 0 1 1.522 3.74zm0-32.17a5.33 5.33 0 0 1-1.523 3.74l-3.04 3.115-3.188-3.267a14 14 0 0 0-.545-.561l-.128-.13c-.19-.194-.384-.382-.562-.545l-3.265-3.189 3.113-3.041a5.32 5.32 0 0 1 3.739-1.523h5.399v5.4Zm0-14.524h-5.4a14.39 14.39 0 0 0-10.108 4.119l-3.268 3.193-3.269-3.193a14.39 14.39 0 0 0-10.108-4.12h-5.397v-4.358c0-1.406.54-2.735 1.522-3.74l13.423-13.756a5.3 5.3 0 0 1 3.83-1.614 5.3 5.3 0 0 1 3.829 1.614l13.423 13.755a5.33 5.33 0 0 1 1.523 3.741zm30.959 31.74-13.748 13.43a5.32 5.32 0 0 1-3.739 1.524H88.36v-5.402a14.4 14.4 0 0 0-4.116-10.114l-3.192-3.27 3.192-3.27a14.4 14.4 0 0 0 4.116-10.114v-5.401h4.355a5.32 5.32 0 0 1 3.74 1.523L110.2 56.67a5.31 5.31 0 0 1 1.613 3.831 5.31 5.31 0 0 1-1.613 3.83Zm335.917-7.722c-2.33-5.79-6.914-9.023-13.228-9.023-10.295 0-16.307 7.67-16.307 19.25 0 11.429 6.237 19.098 16.759 19.098 6.087 0 10.521-3.158 12.776-8.797v8.045h9.544V48.34h-9.544v8.271Zm-9.921 20.678c-6.763 0-9.995-3.384-9.995-10.451 0-7.22 3.232-10.603 9.995-10.603 6.989 0 10.221 3.384 10.221 10.602 0 7.068-3.232 10.452-10.221 10.452m-79.608-11.73h15.18c-.977 7.745-7.14 11.805-15.331 11.805-11.799 0-17.886-6.09-17.886-18.573 0-11.73 6.087-17.97 17.661-17.97 7.891 0 13.076 3.533 15.331 12.406l9.093-3.985c-2.555-11.129-12.4-17.445-24.199-17.445-16.308 0-28.106 11.054-28.106 26.994 0 16.017 11.798 27.145 25.926 27.145 6.238 0 15.031-1.88 18.338-12.18v11.428h8.642V57.212h-24.649zm42.697-6.768V48.34h-9.545v36.844h9.545V69.92c0-9.324 4.208-13.384 10.22-13.384 2.405 0 3.608.225 4.96.752v-9.023c-1.352-.527-3.081-.527-4.434-.527-7.064 0-9.77 5.49-10.746 11.053Zm-90.085-11.203c-6.613 0-10.371 3.383-12.175 9.324v-8.572h-9.544v36.844h9.544V67.588c0-7.594 3.307-11.354 8.643-11.354 4.584 0 7.139 2.481 7.139 7.444v21.505h9.544V63.152c0-10.377-4.434-15.565-13.151-15.565m-140.096-15.79c-14.88 0-27.054 10.902-27.054 27.068 0 16.017 12.174 27.07 27.054 27.07 14.955 0 27.129-11.053 27.129-27.07 0-16.166-12.174-27.069-27.129-27.069Zm0 45.115c-11.123 0-16.759-6.166-16.759-18.122 0-11.88 5.636-17.97 16.759-17.97 11.197 0 16.833 6.09 16.833 17.97 0 11.956-5.636 18.122-16.833 18.122m339.624 8.271h9.544V48.34h-9.544zM491.153 56.61c-2.33-5.79-6.914-9.023-13.227-9.023-10.295 0-16.307 7.67-16.307 19.25 0 11.429 6.237 19.098 16.759 19.098 6.087 0 10.52-3.158 12.775-8.797v8.045h9.545V32.548h-9.545zm-9.92 20.678c-6.764 0-9.995-3.384-9.995-10.451 0-7.22 3.231-10.603 9.995-10.603 6.989 0 10.221 3.384 10.221 10.602 0 7.068-3.232 10.452-10.221 10.452M225.57 47.587c-6.237 0-10.897 3.158-13.226 8.872v-8.12H202.8v49.627h9.544V77.288c2.329 5.564 6.688 8.648 12.7 8.648 10.521 0 16.759-7.67 16.759-19.1 0-11.58-6.012-19.25-16.233-19.25Zm-3.382 29.701c-6.989 0-10.22-3.384-10.22-10.451 0-7.22 3.231-10.603 10.22-10.603 6.839 0 9.995 3.384 9.995 10.602 0 7.068-3.156 10.452-9.995 10.452"/>' +
    '</g>' +
    '<defs><clipPath id="og-logo-clip"><path fill="currentColor" d="M0 0h643v121H0z"/></clipPath></defs>' +
    '</svg>';

  /* ============================================================
     LOGO SVG — MARK ONLY (icon, 121×121 viewport crop)
  ============================================================ */
  var LOGO_MARK =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 121 121">' +
    '<path fill="currentColor" d="M102.823 36.71a14.4 14.4 0 0 0-10.109-4.12H88.36v-4.358c0-3.801-1.462-7.393-4.116-10.114L70.82 4.363A14.36 14.36 0 0 0 60.466 0c-3.93 0-7.606 1.55-10.352 4.363L36.69 18.12a14.4 14.4 0 0 0-4.117 10.114v4.359h-4.356c-3.8 0-7.39 1.463-10.108 4.119L4.36 50.142A14.37 14.37 0 0 0 0 60.501a14.37 14.37 0 0 0 4.36 10.358L18.11 84.29a14.39 14.39 0 0 0 10.107 4.12h4.356v4.356a14.4 14.4 0 0 0 4.117 10.114l13.424 13.757A14.35 14.35 0 0 0 60.466 121c3.93 0 7.607-1.549 10.353-4.363l13.424-13.757a14.4 14.4 0 0 0 4.116-10.114V88.41h4.355c3.8 0 7.39-1.463 10.109-4.119l13.749-13.431a14.37 14.37 0 0 0 4.36-10.358c0-3.932-1.549-7.611-4.36-10.359l-13.749-13.431Z"/>' +
    '</svg>';

  /* ============================================================
     LOAD CSS
  ============================================================ */
  function loadCSS(url) {
    if (document.querySelector('link[data-og-brand]')) return;
    var link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = url;
    link.setAttribute('data-og-brand', 'css');
    document.head.appendChild(link);
  }

  /* ============================================================
     LOAD GOOGLE FONTS (Geist)
  ============================================================ */
  function loadFonts(url) {
    if (document.querySelector('link[data-og-font]')) return;
    var preconn = document.createElement('link');
    preconn.rel  = 'preconnect';
    preconn.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconn);

    var preconn2 = document.createElement('link');
    preconn2.rel         = 'preconnect';
    preconn2.href        = 'https://fonts.gstatic.com';
    preconn2.crossOrigin = 'anonymous';
    document.head.appendChild(preconn2);

    var link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = url;
    link.setAttribute('data-og-font', 'geist');
    document.head.appendChild(link);
  }

  /* ============================================================
     INJECT LOGO into [data-og-logo]
     Variants: "wordmark" (default), "mark", "wordmark-dark", "mark-dark"
  ============================================================ */
  function injectLogos() {
    var els = document.querySelectorAll('[data-og-logo]');
    els.forEach(function (el) {
      if (el.getAttribute('data-og-injected')) return;
      var variant = el.getAttribute('data-og-logo') || 'wordmark';
      var ismark  = variant === 'mark' || variant === 'mark-dark';
      var isdark  = variant === 'wordmark-dark' || variant === 'mark-dark';

      var container = document.createElement('a');
      container.className = 'og-logo' + (isdark ? ' og-logo--dark' : '');
      container.href = el.getAttribute('data-og-href') || 'https://opengradient.ai';
      container.style.color = isdark ? '#0e4b5b' : '#ffffff';
      container.innerHTML = ismark ? LOGO_MARK : LOGO_SVG;

      el.innerHTML = '';
      el.appendChild(container);
      el.setAttribute('data-og-injected', 'true');
    });
  }

  /* ============================================================
     SCROLL REVEAL
  ============================================================ */
  function initScrollReveal() {
    var els = document.querySelectorAll('.og-reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('og-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('og-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { observer.observe(el); });
  }

  /* ============================================================
     MOBILE NAV
  ============================================================ */
  function initMobileNav() {
    var burger = document.querySelector('.og-nav__burger');
    var links  = document.querySelector('.og-nav__links');
    if (!burger || !links) return;
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('og-nav__links--open');
      burger.setAttribute('aria-expanded', String(open));
      burger.textContent = open ? '✕' : '☰';
    });
  }

  /* ============================================================
     BUILD FULL PAGE (data-og-build on <body>)
  ============================================================ */
  function buildPage(root) {
    var title   = root.getAttribute('data-og-title')   || 'OpenGradient';
    var tagline = root.getAttribute('data-og-tagline') || 'The open platform for decentralized AI inference.';
    var cta     = root.getAttribute('data-og-cta')     || 'Get Started';
    var ctaUrl  = root.getAttribute('data-og-cta-url') || 'https://opengradient.ai';

    root.classList.add('og-scope');

    root.innerHTML =
      '<!-- NAV -->' +
      '<nav class="og-nav">' +
        '<div class="og-nav__inner">' +
          '<div data-og-logo="wordmark"></div>' +
          '<button class="og-nav__burger" aria-label="Toggle menu" aria-expanded="false">☰</button>' +
          '<ul class="og-nav__links">' +
            '<li><a href="#" class="og-nav__link">Docs</a></li>' +
            '<li><a href="#" class="og-nav__link">Model Hub</a></li>' +
            '<li><a href="#" class="og-nav__link">Network</a></li>' +
            '<li><a href="' + ctaUrl + '" class="og-btn og-btn-primary og-btn-sm">' + cta + '</a></li>' +
          '</ul>' +
        '</div>' +
      '</nav>' +

      '<!-- HERO -->' +
      '<section class="og-hero">' +
        '<div class="og-hero__content og-reveal">' +
          '<div class="og-badge og-badge-primary og-mb-24">Decentralized AI</div>' +
          '<h1 class="og-h1 og-mb-24">' + title + '</h1>' +
          '<p class="og-body og-mb-32">' + tagline + '</p>' +
          '<div class="og-flex og-justify-center og-gap-16">' +
            '<a href="' + ctaUrl + '" class="og-btn og-btn-primary og-btn-lg">' + cta + '</a>' +
            '<a href="https://opengradient.ai/docs" class="og-btn og-btn-secondary og-btn-lg">View Docs</a>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<!-- STATS -->' +
      '<section class="og-section og-bg-navy">' +
        '<div class="og-container">' +
          '<div class="og-grid og-grid-4">' +
            '<div class="og-stat og-reveal"><div class="og-stat__value">10M+</div><div class="og-stat__label">Inferences</div></div>' +
            '<div class="og-stat og-reveal"><div class="og-stat__value">500+</div><div class="og-stat__label">Models</div></div>' +
            '<div class="og-stat og-reveal"><div class="og-stat__value">99.9%</div><div class="og-stat__label">Uptime</div></div>' +
            '<div class="og-stat og-reveal"><div class="og-stat__value">< 10ms</div><div class="og-stat__label">Latency</div></div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<!-- FEATURES -->' +
      '<section class="og-section">' +
        '<div class="og-container">' +
          '<div class="og-text-center og-mb-48 og-reveal">' +
            '<div class="og-label og-mb-16">Platform</div>' +
            '<h2 class="og-h2">Built for on-chain AI</h2>' +
          '</div>' +
          '<div class="og-grid og-grid-3">' +
            '<div class="og-card og-card-glow og-reveal">' +
              '<div class="og-label og-text-primary og-mb-16">Run</div>' +
              '<h3 class="og-h4 og-mb-16">Model Inference</h3>' +
              '<p class="og-body">Execute ML models on decentralized compute with cryptographic verification.</p>' +
            '</div>' +
            '<div class="og-card og-card-glow og-reveal">' +
              '<div class="og-label og-text-primary og-mb-16">Verify</div>' +
              '<h3 class="og-h4 og-mb-16">Proof of Compute</h3>' +
              '<p class="og-body">Every inference is verifiable on-chain. No trust required — only math.</p>' +
            '</div>' +
            '<div class="og-card og-card-glow og-reveal">' +
              '<div class="og-label og-text-primary og-mb-16">Monetize</div>' +
              '<h3 class="og-h4 og-mb-16">Model Hub</h3>' +
              '<p class="og-body">Publish models and earn from every verified inference, permissionlessly.</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<!-- CTA BANNER -->' +
      '<section class="og-cta-banner">' +
        '<div class="og-cta-banner__inner">' +
          '<div class="og-reveal">' +
            '<h2 class="og-h3 og-mb-16">Ready to run AI on-chain?</h2>' +
            '<p class="og-body">Join developers building the verifiable AI future.</p>' +
          '</div>' +
          '<div class="og-flex og-gap-16 og-reveal">' +
            '<a href="' + ctaUrl + '" class="og-btn og-btn-primary og-btn-lg">' + cta + '</a>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<!-- FOOTER -->' +
      '<footer class="og-footer">' +
        '<div class="og-footer__inner">' +
          '<div data-og-logo="wordmark"></div>' +
          '<p class="og-caption" style="color:var(--og-neutral-400)">© ' + new Date().getFullYear() + ' OpenGradient. All rights reserved.</p>' +
        '</div>' +
      '</footer>';

    injectLogos();
    initMobileNav();
    initScrollReveal();
  }

  /* ============================================================
     PARTIAL SECTION INJECT (data-og-section)
  ============================================================ */
  function buildSections() {
    var els = document.querySelectorAll('[data-og-section]');
    els.forEach(function (el) {
      var s = el.getAttribute('data-og-section');

      if (s === 'nav') {
        el.classList.add('og-nav');
        el.innerHTML =
          '<div class="og-nav__inner">' +
            '<div data-og-logo="wordmark"></div>' +
            '<button class="og-nav__burger" aria-label="Toggle menu" aria-expanded="false">☰</button>' +
            '<ul class="og-nav__links"></ul>' +
          '</div>';
        injectLogos();
        initMobileNav();
      }

      if (s === 'footer') {
        el.classList.add('og-footer');
        el.innerHTML =
          '<div class="og-footer__inner">' +
            '<div data-og-logo="wordmark"></div>' +
            '<p class="og-caption" style="color:var(--og-neutral-400)">© ' + new Date().getFullYear() + ' OpenGradient</p>' +
          '</div>';
        injectLogos();
      }

      if (s === 'hero') {
        el.classList.add('og-hero');
        el.innerHTML =
          '<div class="og-hero__content og-reveal">' +
            '<h1 class="og-h1">' + (el.getAttribute('data-og-title') || 'OpenGradient') + '</h1>' +
            '<p class="og-body og-mt-24">' + (el.getAttribute('data-og-tagline') || '') + '</p>' +
          '</div>';
        initScrollReveal();
      }
    });
  }

  /* ============================================================
     TABS
     Auto-initializes .og-tabs components.
     Usage: <div class="og-tabs"> with .og-tabs__tab and .og-tabs__panel children.
     Tabs and panels are matched by index order.
  ============================================================ */
  function initTabs() {
    var containers = document.querySelectorAll('.og-tabs');
    containers.forEach(function (container) {
      if (container.getAttribute('data-og-tabs-init')) return;
      var tabs   = container.querySelectorAll('.og-tabs__tab');
      var panels = container.querySelectorAll('.og-tabs__panel');
      if (!tabs.length) return;

      function activate(idx) {
        tabs.forEach(function (t, i) {
          t.classList.toggle('og-tabs__tab--active', i === idx);
          t.setAttribute('aria-selected', i === idx ? 'true' : 'false');
        });
        panels.forEach(function (p, i) {
          p.classList.toggle('og-tabs__panel--active', i === idx);
        });
      }

      tabs.forEach(function (tab, idx) {
        tab.addEventListener('click', function () { activate(idx); });
        tab.setAttribute('role', 'tab');
        tab.setAttribute('tabindex', idx === 0 ? '0' : '-1');
      });

      activate(0);
      container.setAttribute('data-og-tabs-init', 'true');
    });
  }

  /* ============================================================
     INIT
  ============================================================ */
  function init() {
    loadCSS(CSS_URL);
    loadFonts(FONT_URL);

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run();
    }
  }

  function run() {
    var root = document.querySelector('[data-og-build]');
    if (root) {
      buildPage(root);
    } else {
      buildSections();
      injectLogos();
      initScrollReveal();
      initMobileNav();
    }
    initTabs();
  }

  /* ============================================================
     PUBLIC API
  ============================================================ */
  var OGBrand = {
    VERSION:          '3.1.0',
    LOGO_SVG:         LOGO_SVG,
    LOGO_MARK:        LOGO_MARK,
    loadCSS:          loadCSS,
    loadFonts:        loadFonts,
    injectLogos:      injectLogos,
    initScrollReveal: initScrollReveal,
    initMobileNav:    initMobileNav,
    initTabs:         initTabs,
    buildPage:        buildPage,
    buildSections:    buildSections,
    COLORS: {
      primary:   '#24bce3',
      dark:      '#0e4b5b',
      navy:      '#0a0f19',
      light:     '#e9f8fc',
      primary400: '#50c9e9',
      primary600: '#1d96b6',
      primary800: '#0e4b5b',
    }
  };

  global.OGBrand = OGBrand;
  init();

}(typeof window !== 'undefined' ? window : this));
