---
name: og-brand
description: Generate a complete OpenGradient-branded website from a one-line description. Writes an HTML file and opens it in the browser.
argument-hint: "<description of the site to build>"
allowed-tools:
  - Write
  - Bash
  - Read
---

<objective>
Generate a complete, production-ready HTML page using the OpenGradient brand skill (`og-skill.js` via CDN).

The user's argument (`$ARGUMENTS`) is a short description of the site to build.
If no argument is given, build a generic OpenGradient showcase page.

**Output:** a single self-contained `.html` file, opened in the browser immediately.
</objective>

<rules>
1. **One file only** — everything in one `.html` file. No separate CSS/JS files.
2. **Always load og-skill.js first** — `<script src="https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-skill.js"></script>` in `<head>`.
3. **Use brand classes** — `og-scope`, `og-h1`, `og-btn og-btn-primary`, `og-card`, `og-grid`, etc. from og-brand.css (auto-loaded by the skill).
4. **Dark theme by default** — `<body class="og-scope">`. Add `og-light` only if user explicitly asks for light theme.
5. **Filename** — save as `og-[slug].html` in the current working directory, where slug is derived from the user's description.
6. **Auto-open** — run `open og-[slug].html` (macOS) after writing.
7. **No placeholders** — fill in all content based on the description. Make it look real and complete.
8. **Sections to include** (adapt based on description):
   - Navbar with logo (`data-og-logo="wordmark"`) + nav links
   - Hero with headline, subtext, CTA button
   - At least one content section (cards, stats, features, or grid)
   - Footer with logo mark + links
9. **Content quality** — write real copy relevant to the description. Not "Lorem ipsum". Not generic filler.
10. **Interactivity** — use `og-reveal` for scroll animations. The skill handles the rest automatically.
</rules>

<approach>
1. Parse `$ARGUMENTS` to understand: what is the site for, who is the audience, what's the key message.
2. Plan the page structure (sections, headlines, CTA copy) in your head before writing.
3. Write the complete HTML file in one shot.
4. Save it and open it.
5. Report the filename and a 1-line summary of what was built.
</approach>

<html_template>
Use this structure as your base — expand and customize it fully based on the description:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[TITLE]</title>
  <script src="https://cdn.jsdelivr.net/gh/golldyck/opengradient-brand-skill@main/og-skill.js"></script>
  <style>
    /* Add only page-specific styles here, not brand styles */
  </style>
</head>
<body class="og-scope">

  <!-- NAV -->
  <nav class="og-nav">
    <div class="og-container" style="display:flex;align-items:center;justify-content:space-between;padding:1rem 2rem;">
      <div data-og-logo="wordmark" style="height:32px;"></div>
      <div style="display:flex;gap:2rem;">
        <a href="#" class="og-body" style="color:var(--og-primary-200);text-decoration:none;">Docs</a>
        <a href="#" class="og-body" style="color:var(--og-primary-200);text-decoration:none;">GitHub</a>
        <a href="#" class="og-btn og-btn-primary og-btn-sm">Get Started</a>
      </div>
    </div>
  </nav>

  <!-- HERO -->
  <section class="og-hero" style="padding-top:120px;">
    <div class="og-container" style="text-align:center;padding:4rem 2rem;">
      <span class="og-badge og-badge-primary og-reveal" style="margin-bottom:1.5rem;display:inline-block;">[BADGE TEXT]</span>
      <h1 class="og-h1 og-text-gradient og-reveal">[HEADLINE]</h1>
      <p class="og-body og-reveal" style="max-width:600px;margin:1.5rem auto 2.5rem;font-size:1.2rem;color:var(--og-primary-200);">[SUBTEXT]</p>
      <div class="og-reveal" style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
        <a href="#" class="og-btn og-btn-primary og-btn-lg">[CTA PRIMARY]</a>
        <a href="#" class="og-btn og-btn-secondary og-btn-lg">[CTA SECONDARY]</a>
      </div>
    </div>
  </section>

  <!-- CONTENT SECTIONS — expand based on description -->

  <!-- FOOTER -->
  <footer style="padding:3rem 2rem;border-top:1px solid rgba(36,188,227,0.1);">
    <div class="og-container" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
      <div data-og-logo="mark" style="height:28px;opacity:0.6;"></div>
      <p class="og-caption" style="color:var(--og-primary-400);">© 2025 OpenGradient. MIT License.</p>
    </div>
  </footer>

</body>
</html>
```
</html_template>

<response_format>
After writing and opening the file, respond with:
- Filename
- What was built (1 sentence)
- Key sections included
</response_format>
