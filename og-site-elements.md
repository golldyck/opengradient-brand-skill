# OpenGradient Site Elements — Extracted from opengradient.ai

> Auto-extracted design elements from the live OpenGradient website (opengradient.ai) — all pages.
> Use these as reference for building pixel-accurate OG-branded sites.

---

## 🎨 Color Tokens (extracted from CSS computed styles)

These are the **exact** CSS custom properties used by the live opengradient.ai site (Tailwind v4 design tokens):

```css
/* Brand Primary Scale */
--color-brand-primary-100: #e9f8fc   /* Pale surface */
--color-brand-primary-200: #bdebf7   /* Light accent / body text on dark */
--color-brand-primary-400: #50c9e9   /* Soft blue accent */
--color-brand-primary-500: #24bce3   /* MAIN brand blue — CTAs, headlines, icons */
--color-brand-primary-600: #1d96b6   /* Darker blue */
--color-brand-primary-700: #167188   /* Deep blue */
--color-brand-primary-800: #0e4b5b   /* Dark teal — dark text on light, tertiary bg */
--color-brand-primary-900: #041317   /* Deepest teal */

/* Brand Secondary (Navy) Scale */
--color-brand-secondary-700: #1d2c4b  /* Mid navy */
--color-brand-secondary-800: #141e32  /* Card background */
--color-brand-secondary-950: #0a0f19  /* Deepest navy — main dark background */

/* Surface Colors */
--color-surface-primary:   #ffffff    /* White background (light mode) */
--color-surface-secondary: #e9f8fc   /* Light blue surface */
--color-surface-tertiary:  #0e4b5b   /* Dark teal surface */

/* Status Colors */
--color-green-400: #05df72   /* Success / live indicator */
--color-green-500: #00c758   /* Success darker */
--color-red-500:   #fb2c36   /* Error */
--color-yellow-500: #edb200  /* Warning */
```

---

## 🖋 Typography

```css
/* Fonts (loaded via Next.js font optimization) */
--font-sans: "Geist", "Geist Fallback", system-ui, sans-serif
--font-mono: "Geist Mono", "Geist Mono Fallback", ui-monospace, monospace

/* Type Scale */
--text-xs:   0.75rem   /* 12px */
--text-sm:   0.875rem  /* 14px */
--text-base: 1rem      /* 16px */
--text-lg:   1.125rem  /* 18px */
--text-xl:   1.25rem   /* 20px */
--text-2xl:  1.5rem    /* 24px */
--text-3xl:  1.875rem  /* 30px */
--text-4xl:  2.25rem   /* 36px */
--text-5xl:  3rem      /* 48px */
--text-6xl:  3.75rem   /* 60px */
--text-7xl:  4.5rem    /* 72px */

/* Heading style: font-weight 300, letter-spacing -0.025em */
/* Body style: font-weight 400, color brand-primary-800 on light / brand-primary-200 on dark */
/* Monospace used for: button labels (uppercase), code, stats */
```

---

## 📐 Layout — fluid-container

The OG site uses a custom `fluid-container` class (not standard Tailwind `container`):

```css
/* Responsive fluid container */
.fluid-container {
  width: 100%;
    margin: 0 auto;
      padding: 0 16px;        /* mobile */
      }
      @media (min-width: 640px)  { .fluid-container { padding: 0 24px; } }
      @media (min-width: 768px)  { .fluid-container { padding: 0 32px; } }
      @media (min-width: 1024px) { .fluid-container { padding: 0 40px; } }
      @media (min-width: 1536px) { .fluid-container { max-width: 1488px; padding: 0 40px; } }
      ```

      ---

      ## 🎬 Animations (CSS keyframes from opengradient.ai)

      ```css
      /* Infinite horizontal scroll — used for logo marquees, ticker strips */
      @keyframes scroll {
        0%   { transform: translate(0px); }
          100% { transform: translate(-100%); }
          }

          /* Blinking cursor — used for "Testnet Is Live" badge dot */
          @keyframes blink {
            0%, 100% { opacity: 1; }
              50%       { opacity: 0; }
              }

              /* Spinner — loading states */
              @keyframes spin {
                100% { transform: rotate(360deg); }
                }

                /* Pulse — subtle pulsing elements */
                @keyframes pulse {
                  50% { opacity: 0.5; }
                  }

                  /* Bounce — bouncing indicators */
                  @keyframes bounce {
                    0%, 100% {
                        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
                            transform: translateY(-25%);
                              }
                                50% {
                                    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
                                        transform: none;
                                          }
                                          }
                                          ```

                                          ---

                                          ## 🧩 Page Sections — Homepage Structure

                                          The main opengradient.ai homepage contains these sections in order:

                                          1. **Nav** — Fixed glassmorphism navbar with wordmark + desktop nav links + "Explore Models" CTA button
                                          2. **Hero** — Full-viewport hero with headline "The Network for Open Intelligence", subtitle, two CTAs ("Enter Portal" + "Explore Models"), animated globe image, "Testnet Is Live" badge (bottom-right)
                                          3. **NVIDIA Banner** — Thin banner: "OpenGradient has been accepted into the NVIDIA Inception Program →"
                                          4. **Stats Section** — Key metrics: "100% EVM Compatible", "1500 Models", "2 Million+ Verifiable AI Inferences", "500K+ zkML Proofs + TEE Attestations"
                                          5. **Products Section** — "OpenGradient Products" header + 6 product cards: OpenGradient Network, Model Hub, On-Chain AI SDK, MemSync, Digital Twins, BitQuant
                                          6. **Research Highlights** — 4 research paper cards with category badge, title, description
                                          7. **Backers Section** — "We Are Backed by the Best" — logos: a16z, Coinbase, SVA, Foresight, NVIDIA, SALT, Symbolic, Canonical, Black Dragon, Celestia, NEAR, Thanefield + 5 testimonials
                                          8. **Blog/News** — "What's New" — 3 featured blog post cards
                                          9. **Footer** — Newsletter signup + social links + careers + nav links

                                          ### /opengradient-network page sections:
                                          1. Hero (dark gradient bg): large "OpenGradient Network" title + "BUILD NOW" CTA
                                          2. Technology Stack (light bg): accordion tabs — Ecosystem / Blockchain Network / Heterogeneous AI Compute / Model Hosting & Storage
                                          3. Features Grid: Full Stack / Seamless / Secure / Performant
                                          4. CTA Banner: "Start Building" → docs

                                          ### /memsync page sections:
                                          1. Hero (dark gradient): MemSync product hero
                                          2. Features (light bg): unified memory features
                                          3. App integrations
                                          4. CTA footer

                                          ### /bitquant page sections:
                                          1. Hero: BitQuant AI quantitative analyst
                                          2. Features: portfolio analysis, signals, data
                                          3. CTA

                                          ---

                                          ## 🔲 UI Components Observed on Site

                                          ### Navbar
                                          - Fixed position, glassmorphism blur (`backdrop-blur-lg`)
                                          - Background: `bg-white/14` or `bg-brand-secondary-950` depending on scroll
                                          - Logo: SVG wordmark (643×121 viewBox), color: `currentColor`
                                          - Nav links: font-mono uppercase, `text-brand-primary-800` on light
                                          - CTA button: dark pill `bg-brand-secondary-950 text-white` with font-mono uppercase
                                          - Mobile: hamburger menu (3 lines SVG icon), slide-in overlay

                                          ### Buttons
                                          ```html
                                          <!-- Primary CTA (dark, on light sections) -->
                                          <button class="bg-brand-secondary-950 text-white font-mono uppercase text-xs tracking-widest px-6 py-3 rounded-full">
                                            ENTER PORTAL
                                            </button>

                                            <!-- Secondary CTA (white outline, on light sections) -->
                                            <button class="border border-brand-secondary-950 text-brand-secondary-950 font-mono uppercase text-xs px-6 py-3 rounded-full">
                                              EXPLORE MODELS
                                              </button>

                                              <!-- Light CTA (white, on dark sections) -->
                                              <button class="bg-white text-brand-secondary-950 font-mono uppercase text-xs px-6 py-3 rounded-full">
                                                BUILD NOW
                                                </button>
                                                ```

                                                ### Product Cards
                                                ```html
                                                <!-- Dark product card -->
                                                <div class="bg-brand-secondary-800 rounded-2xl p-6 hover:bg-brand-secondary-700 transition-colors">
                                                  <img src="[product-icon]" class="h-8 w-8 mb-4" />
                                                    <h3 class="text-white font-sans text-lg font-medium">[Product Name]</h3>
                                                      <p class="text-brand-primary-200 text-sm mt-2">[Description]</p>
                                                      </div>

                                                      <!-- Light product card (on white bg) -->
                                                      <div class="bg-surface-secondary rounded-2xl p-6 hover:bg-brand-primary-200 transition-colors">
                                                        ...
                                                        </div>
                                                        ```

                                                        ### "Live" Status Badge
                                                        ```html
                                                        <!-- Green dot + "TESTNET IS LIVE" — bottom-right hero -->
                                                        <div class="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-xs font-mono uppercase">
                                                          <span class="w-2 h-2 rounded-full bg-[#00de0f] animate-pulse"></span>
                                                            TESTNET IS LIVE
                                                            </div>
                                                            ```

                                                            ### Category Badge (Blog/Research)
                                                            ```html
                                                            <span class="text-xs font-mono uppercase tracking-widest text-brand-primary-500">
                                                              Infrastructure
                                                              </span>
                                                              ```

                                                              ### Stats Display
                                                              ```html
                                                              <div class="text-center">
                                                                <p class="text-5xl font-sans font-light text-brand-primary-800">1500</p>
                                                                  <p class="text-sm font-mono uppercase tracking-wider text-brand-primary-600">Models</p>
                                                                  </div>
                                                                  ```

                                                                  ---

                                                                  ## 🖼 SVG Icons (32×32, stroke="currentColor", stroke-width="1.2")

                                                                  All product/feature icons use: `viewBox="0 0 32 32"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="1.2"`, `stroke-linecap="round"`, `stroke-linejoin="round"`

                                                                  ```html
                                                                  <!-- On-chain SDK / Copy-check icon -->
                                                                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M20 12V9.2C20 8.0799 20 7.51984 19.782 7.09202C19.5903 6.71569 19.2843 6.40973 18.908 6.21799C18.4802 6 17.9201 6 16.8 6H9.2C8.0799 6 7.51984 6 7.09202 6.21799C6.71569 6.40973 6.40973 6.71569 6.21799 7.09202C6 7.51984 6 8.0799 6 9.2V16.8C6 17.9201 6 18.4802 6.21799 18.908C6.40973 19.2843 6.71569 19.5903 7.09202 19.782C7.51984 20 8.0799 20 9.2 20H12M16 19L18 21L22.5 16.5M15.2 26H22.8C23.9201 26 24.4802 26 24.908 25.782C25.2843 25.5903 25.5903 25.2843 25.782 24.908C26 24.4802 26 23.9201 26 22.8V15.2C26 14.0799 26 13.5198 25.782 13.092C25.5903 12.7157 25.2843 12.4097 24.908 12.218C24.4802 12 23.9201 12 22.8 12H15.2C14.0799 12 13.5198 12 13.092 12.218C12.7157 12.4097 12.4097 12.7157 12.218 13.092C12 13.5198 12 14.0799 12 15.2V22.8C12 23.9201 12 24.4802 12.218 24.908C12.4097 25.2843 12.7157 25.5903 13.092 25.782C13.5198 26 14.0799 26 15.2 26Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                                                                    </svg>

                                                                    <!-- Network / Layers icon -->
                                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                      <path d="M16 12.9999L8.06386 18.1584C7.37601 18.6055 7.03209 18.8291 6.91297 19.1126C6.80888 19.3603 6.80888 19.6396 6.91297 19.8873M16 12.9999L23.9361 18.1584C24.624 18.6055 24.9679 18.8291 25.087 19.1126C25.1911 19.3603 25.1911 19.6396 25.087 19.8873M16 12.9999V6.49994M16 18.9999L8.06386 13.8415C7.37601 13.3944 7.03209 13.1708 6.91297 12.8873C6.80888 12.6396 6.80888 12.3604 6.91297 12.1126L16 6.49994L25.087 12.1126C25.1911 12.3604 25.1911 12.6396 25.087 12.8873C24.9679 13.1708 24.624 13.3944 23.9361 13.8415L16 18.9999ZM16 18.9999V25.4999M16 25.4999L8.06386 20.3415C7.37601 19.8944 7.03209 19.6708 6.91297 19.3873C6.80888 19.1396 6.80888 18.8603 6.91297 18.6126M16 25.4999L23.9361 20.3415C24.624 19.8944 24.9679 19.6708 25.087 19.3873C25.1911 19.1396 25.1911 18.8603 25.087 18.6126" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                                                                      </svg>

                                                                      <!-- UI Icons (24×24, Lucide-style) -->
                                                                      <!-- Hamburger menu -->
                                                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                                                                        <path d="M6 12H18M6 8H18M6 16H18"/>
                                                                        </svg>

                                                                        <!-- Chevron down -->
                                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                                          <path d="m6 9 6 6 6-6"/>
                                                                          </svg>

                                                                          <!-- Arrow right -->
                                                                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                                            <path d="M5 12h14M12 5l7 7-7 7"/>
                                                                            </svg>
                                                                            ```

                                                                            ---

                                                                            ## 🌈 Gradients (observed on site)

                                                                            ```css
                                                                            /* Hero background gradient (light theme pages like homepage) */
                                                                            background: linear-gradient(to bottom, #97deed 0%, #7adeed 30%, #e9f8fc 60%, #ffffff 100%);

                                                                            /* Hero background gradient (dark theme pages like /opengradient-network) */
                                                                            background: linear-gradient(135deg, #0a0f19 0%, #141e32 50%, #0e4b5b 100%);

                                                                            /* Brand text gradient */
                                                                            background: linear-gradient(90deg, #24bce3, #50c9e9);
                                                                            -webkit-background-clip: text;
                                                                            -webkit-text-fill-color: transparent;

                                                                            /* Section separator gradient */
                                                                            background: linear-gradient(to bottom, #e9f8fc, #ffffff);

                                                                            /* Card hover glow */
                                                                            box-shadow: 0 0 40px rgba(36, 188, 227, 0.15);

                                                                            /* Grid overlay (tech feel) */
                                                                            background-image: linear-gradient(rgba(36,188,227,0.04) 1px, transparent 1px),
                                                                                              linear-gradient(90deg, rgba(36,188,227,0.04) 1px, transparent 1px);
                                                                                              background-size: 40px 40px;
                                                                                              ```

                                                                                              ---

                                                                                              ## 🎯 Design Patterns

                                                                                              ### Light Theme (matches actual opengradient.ai homepage)
                                                                                              - **Background**: `#ffffff` / `#e9f8fc`
                                                                                              - **Hero bg**: gradient from `#97deed` → `#7adeed` → `#e9f8fc` → white
                                                                                              - **Headings**: `#0e4b5b` (dark teal), font-weight 300-400
                                                                                              - **Body text**: `#0e4b5b` or `#167188`
                                                                                              - **Buttons**: Dark pill, font-mono uppercase, `bg-brand-secondary-950 text-white`
                                                                                              - **Nav**: Semi-transparent white blur, dark text

                                                                                              ### Dark Theme (subpages like /opengradient-network)
                                                                                              - **Background**: `#0a0f19` to `#0e4b5b` gradient
                                                                                              - **Text**: `#ffffff` and `#bdebf7`
                                                                                              - **Buttons**: White pill on dark
                                                                                              - **Hero**: Centered text, no images

                                                                                              ### Mixed Pattern (product detail pages)
                                                                                              - Top section: Dark gradient hero
                                                                                              - Below fold: White/light bg with teal text

                                                                                              ---

                                                                                              ## 📋 HTML Patterns — Copy-Paste Ready

                                                                                              ### Complete Page Shell (light theme matching opengradient.ai)
                                                                                              ```html
                                                                                              <!DOCTYPE html>
                                                                                              <html lang="en">
                                                                                              <head>
                                                                                                <meta charset="UTF-8">
                                                                                                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                                                                                    <title>[Your Title] | OpenGradient</title>
                                                                                                      <script src="https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-skill.js"></script>
                                                                                                      </head>
                                                                                                      <body class="og-scope og-light">
                                                                                                      
                                                                                                        <!-- NAVBAR -->
                                                                                                          <nav class="og-nav">
                                                                                                              <div class="og-container" style="display:flex;align-items:center;justify-content:space-between;padding:1rem 2rem;">
                                                                                                                    <div data-og-logo="wordmark" style="height:30px;"></div>
                                                                                                                          <div style="display:flex;align-items:center;gap:1.5rem;">
                                                                                                                                  <a href="#" style="font-family:'Geist Mono',monospace;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;color:#0e4b5b;text-decoration:none;">Products</a>
                                                                                                                                          <a href="#" style="font-family:'Geist Mono',monospace;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;color:#0e4b5b;text-decoration:none;">About</a>
                                                                                                                                                  <a href="#" class="og-btn og-btn-dark og-btn-sm">Explore Models</a>
                                                                                                                                                        </div>
                                                                                                                                                            </div>
                                                                                                                                                              </nav>
                                                                                                                                                              
                                                                                                                                                                <!-- HERO (light gradient) -->
                                                                                                                                                                  <section style="min-height:90vh;display:flex;align-items:center;background:linear-gradient(to bottom, #97deed, #7adeed 30%, #e9f8fc 60%, #fff);padding-top:80px;">
                                                                                                                                                                      <div class="og-container" style="padding:4rem 2rem;">
                                                                                                                                                                            <h1 class="og-h1" style="color:#0e4b5b;font-weight:300;letter-spacing:-0.025em;max-width:640px;">[Headline]</h1>
                                                                                                                                                                                  <p style="color:#167188;font-size:1.1rem;max-width:540px;margin:1.5rem 0 2.5rem;">[Subtitle]</p>
                                                                                                                                                                                        <div style="display:flex;gap:1rem;flex-wrap:wrap;">
                                                                                                                                                                                                <a href="#" class="og-btn og-btn-dark">ENTER PORTAL</a>
                                                                                                                                                                                                        <a href="#" class="og-btn og-btn-secondary">EXPLORE MODELS</a>
                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                    </section>
                                                                                                                                                                                                                    
                                                                                                                                                                                                                      <!-- STATS BAR -->
                                                                                                                                                                                                                        <section style="padding:4rem 0;background:#fff;">
                                                                                                                                                                                                                            <div class="og-container og-grid og-grid-4" style="text-align:center;gap:2rem;">
                                                                                                                                                                                                                                  <div>
                                                                                                                                                                                                                                          <p style="font-size:3rem;font-weight:300;color:#0e4b5b;" data-target="100" data-suffix="%">100%</p>
                                                                                                                                                                                                                                                  <p style="font-size:0.75rem;font-family:'Geist Mono',monospace;text-transform:uppercase;letter-spacing:0.1em;color:#167188;">EVM Compatible</p>
                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                              <div>
                                                                                                                                                                                                                                                                      <p style="font-size:3rem;font-weight:300;color:#0e4b5b;" data-target="1500">1500</p>
                                                                                                                                                                                                                                                                              <p style="font-size:0.75rem;font-family:'Geist Mono',monospace;text-transform:uppercase;letter-spacing:0.1em;color:#167188;">Models</p>
                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                          </section>
                                                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                                            <!-- FOOTER -->
                                                                                                                                                                                                                                                                                              <footer style="padding:3rem 2rem;border-top:1px solid #e9f8fc;">
                                                                                                                                                                                                                                                                                                  <div class="og-container" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
                                                                                                                                                                                                                                                                                                        <div data-og-logo="wordmark" style="height:22px;opacity:0.5;"></div>
                                                                                                                                                                                                                                                                                                              <p style="font-size:0.75rem;color:#bdebf7;">© 2026 OpenGradient</p>
                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                    </footer>
                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                    </body>
                                                                                                                                                                                                                                                                                                                    </html>
                                                                                                                                                                                                                                                                                                                    ```
                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                    ---
                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                    ## 🗂 Site Pages Reference
                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                    | Page | URL | Theme | Key Visual |
                                                                                                                                                                                                                                                                                                                    |------|-----|-------|------------|
                                                                                                                                                                                                                                                                                                                    | Homepage | `/` | Light (white + teal gradient) | Globe animation hero |
                                                                                                                                                                                                                                                                                                                    | OG Network | `/opengradient-network` | Dark (navy gradient) | Centered headline |
                                                                                                                                                                                                                                                                                                                    | MemSync | `/memsync` | Mixed | Minimal, lots of whitespace |
                                                                                                                                                                                                                                                                                                                    | BitQuant | `/bitquant` | Mixed | Finance dashboard feel |
                                                                                                                                                                                                                                                                                                                    | Blog | `/blog` | Light | Card grid |
                                                                                                                                                                                                                                                                                                                    | Careers | `/careers` | Light | Job listings |
                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                    ---
                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                    ## 🔗 CDN Assets
                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                    ```
                                                                                                                                                                                                                                                                                                                    og-skill.js:     https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-skill.js
                                                                                                                                                                                                                                                                                                                    og-brand.css:    https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-brand.css
                                                                                                                                                                                                                                                                                                                    brand_rules.json: https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/brand_rules.json
                                                                                                                                                                                                                                                                                                                    ```
                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                    ---
                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                    *Extracted from live opengradient.ai — March 2026*
