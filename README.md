# OpenGradient Brand Skill

> One script tag. Full OpenGradient visual identity — auto-loaded from GitHub CDN.
>
> [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
>
> ---
>
> ## What is this?
>
> **OpenGradient Brand Skill** is a single JavaScript file that:
>
> 1. Loads `og-brand.css` (brand design tokens, components, utilities) from jsDelivr CDN
> 2. 2. Loads Roboto font from Google Fonts
>    3. 3. Injects SVG logo into any `[data-og-logo]` element
>       4. 4. **Optionally auto-builds a complete branded page** from a single `<body>` attribute
>         
>          5. No bundler. No npm. Just paste and go.
>         
>          6. ---
>         
>          7. ## Quick Start (30 seconds)
>
> ### Option A — Auto-Build Full Page
>
> Add one script tag + one attribute:
>
> ```html
> <!DOCTYPE html>
> <html lang="en">
> <head>
>   <meta charset="UTF-8" />
>   <title>My OpenGradient Page</title>
>   <script src="https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-skill.js"></script>
> </head>
> <body
>   data-og-build
>   data-og-title="Your Title Here"
>   data-og-tagline="Your tagline or description."
>   data-og-cta="Get Started"
>   data-og-cta-url="https://yoursite.com"
> >
> </body>
> </html>
> ```
>
> The skill will auto-generate: Navbar + Hero + Stats + Feature Cards + Code Block + Footer — all in OpenGradient brand style.
>
> ---
>
> ### Option B — CSS Classes Only
>
> Load the CSS and use brand classes manually in your existing HTML:
>
> ```html
> <head>
>   <link rel="stylesheet"
>     href="https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-brand.css" />
> </head>
>
> <body class="og-scope">
>   <h1 class="og-h1 og-text-gradient">Hello World</h1>
>   <p class="og-body">Styled with OpenGradient brand system.</p>
>   <a class="og-btn og-btn-primary" href="#">Get Started</a>
> </body>
> ```
>
> ---
>
> ### Option C — Logo Injection Only
>
> ```html
> <script src="https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-skill.js"></script>
>
> <!-- Anywhere in your HTML: -->
> <div data-og-logo="color"></div>   <!-- Gradient color logo -->
> <div data-og-logo="cyan"></div>    <!-- Cyan monochrome logo -->
> ```
>
> ---
>
> ## `data-og-build` Attributes
>
> | Attribute | Default | Description |
> |---|---|---|
> | `data-og-title` | `"OpenGradient"` | Hero headline |
> | `data-og-tagline` | `"Decentralized AI Infrastructure"` | Hero subtext |
> | `data-og-cta` | `"Get Started"` | CTA button label |
> | `data-og-cta-url` | `"#"` | CTA button URL |
>
> ---
>
> ## Brand Tokens (CSS Variables)
>
> ```css
> /* Colors */
> --og-black        #000000
> --og-white        #FFFFFF
> --og-cyan         #00D4E8   /* Primary accent */
> --og-lime         #D4FF00   /* Secondary accent */
> --og-teal         #00B4A0
>
> /* Gradients */
> --og-grad-hero     dark bg with teal glow
> --og-grad-text     cyan → lime (for gradient text)
> --og-grad-mixed    cyan → teal → lime
>
> /* Typography */
> --og-font-primary  'Roboto', sans-serif
> ```
>
> ---
>
> ## CSS Components
>
> | Class | Description |
> |---|---|
> | `og-scope` | Root wrapper (applies font + bg) |
> | `og-container` | Max-width centered container |
> | `og-hero` | Full-height hero section |
> | `og-nav` | Fixed glassmorphism navbar |
> | `og-btn og-btn-primary` | Cyan CTA button |
> | `og-btn og-btn-secondary` | Ghost outline button |
> | `og-btn og-btn-lime` | Lime accent button |
> | `og-card` | Dark card with hover effect |
> | `og-card-glow` | Card with cyan radial glow |
> | `og-badge og-badge-cyan` | Cyan pill badge |
> | `og-badge og-badge-lime` | Lime pill badge |
> | `og-h1` … `og-h4` | Heading scale |
> | `og-body` | Body text style |
> | `og-text-gradient` | Cyan→Lime gradient text |
> | `og-text-cyan` | Cyan colored text |
> | `og-text-lime` | Lime colored text |
> | `og-stat` | Metric/stat display block |
> | `og-code` | Styled code block |
> | `og-input` | Branded input field |
> | `og-divider` | Gradient horizontal rule |
> | `og-grid og-grid-3` | 3-column responsive grid |
>
> ---
>
> ## JavaScript API
>
> ```js
> // Manual control after load:
> OGBrand.buildPage(document.body);       // Build full page
> OGBrand.injectLogos();                  // Inject logos
> OGBrand.loadCSS(url);                   // Load custom CSS
>
> // SVG strings (use inline):
> OGBrand.LOGO_SVG                        // Gradient logo SVG
> OGBrand.LOGO_SVG_CYAN                   // Cyan logo SVG
> ```
>
> ---
>
> ## Files in this repo
>
> | File | Description |
> |---|---|
> | `og-skill.js` | Main skill script — load via CDN |
> | `og-brand.css` | Brand stylesheet — auto-loaded by skill |
> | `demo.html` | Complete demo page (open in browser) |
> | `README.md` | This file |
>
> ---
>
> ## CDN Links (jsDelivr)
>
> ```
> JS:  https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-skill.js
> CSS: https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-brand.css
> ```
>
> > **Note:** jsDelivr CDN may take ~5 minutes to propagate after first push.
> >
> > ---
> >
> > ## Brand Reference
> >
> > Based on the official [OpenGradient Branding Kit](https://opengradient.notion.site/Branding-Kit-b0ed295da43f479dbbd0e603029666b1):
> > - **Colors**: Black `#000`, Cyan `#00D4E8`, Lime `#D4FF00`, Teal `#00B4A0`
> > - - **Font**: Roboto (Light 300, Regular 400, Medium 500)
> >   - - **Style**: Dark backgrounds, gradient accents, minimal geometric logo
> >    
> >     - ---
> >
> > ## License
> >
> > MIT — free to use in any OpenGradient project.
