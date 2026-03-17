/**
 * OpenGradient Image Skill v1.0.0
 * Generates brand-consistent images via Gemini Flash Image (gemini-2.0-flash-preview-image-generation)
 *
 * Usage (browser or Node.js):
 *   const result = await OGImage.generate("Draw a capybara at a laptop", { ratio: "16:9" });
 *   document.getElementById("output").src = result.imageUrl;
 *
 * Or drop the widget on any page:
 *   <script src="og-image-skill.js"></script>
 *   <div data-og-image-widget></div>
 */

(function (global) {
  'use strict';

  /* ============================================================
     BRAND CORE — the permanent style wrapper injected into every prompt
  ============================================================ */
  var BRAND_GUIDELINES = [
    'OpenGradient brand visual style',
    'dark navy background (#0a0f19 or #141e32)',
    'brand blue (#24bce3) as primary accent color, glow, and light source',
    'cool blue color temperature with teal undertones',
    'clean geometric shapes, subtle 1px grid lines',
    'professional AI/blockchain/Web3 aesthetic',
    'glass morphism panels with dark semi-transparent backgrounds',
    'radial brand-blue glow from below or behind subject',
    'cinematic studio lighting with blue-teal key light',
    '3D render quality, sharp details, high production value',
    'Geist font for any text elements',
    'subtle depth of field, clean composition'
  ].join(', ');

  var NEGATIVE_PROMPT = [
    'photorealism of humans',
    'watercolor',
    '2D flat vector',
    'lime green',
    'yellow',
    'neon cyberpunk',
    'warm tones',
    'orange',
    'red accents',
    'dirty colors',
    'low quality',
    'blurry',
    'Roboto font',
    'pure black background'
  ].join(', ');

  /* ============================================================
     ASPECT RATIO PRESETS
  ============================================================ */
  var RATIOS = {
    '1:1':  { width: 1024, height: 1024, label: 'Square (avatar, meme)' },
    '16:9': { width: 1280, height: 720,  label: 'Landscape (post, hero)' },
    '9:16': { width: 720,  height: 1280, label: 'Portrait (story, mobile)' },
    '4:3':  { width: 1024, height: 768,  label: 'Standard (presentation)' },
    '3:2':  { width: 1200, height: 800,  label: 'Wide (banner)' },
  };

  /* ============================================================
     CONTENT TYPE PRESETS — extra prompt additions per use case
  ============================================================ */
  var CONTENT_TYPES = {
    photo:    'photographic style, realistic brand overlay, professional photography',
    meme:     'meme format, bold text space at top and bottom, humorous composition, high contrast',
    ui:       'UI/UX design mockup, clean interface, device frame, software screenshot style',
    hero:     'hero banner composition, centered subject, wide cinematic aspect, dramatic lighting',
    avatar:   'profile picture composition, centered portrait, circular crop friendly, character design',
    slide:    'presentation slide layout, clear hierarchy, left-aligned text area, icon accent',
    logo:     'logo design, vector style, minimal geometric mark, scalable composition',
    diagram:  'technical diagram, node graph, network visualization, clean lines and labels',
  };

  /* ============================================================
     PROMPT BUILDER — wraps user input with brand context
  ============================================================ */
  function buildPrompt(userRequest, options) {
    options = options || {};
    var type    = options.type   || 'photo';
    var context = options.context || '';

    var typeExtra = CONTENT_TYPES[type] || '';
    var parts = [
      userRequest,
      'Style: ' + BRAND_GUIDELINES,
      typeExtra ? 'Format: ' + typeExtra : '',
      context ? 'Additional context: ' + context : '',
    ].filter(Boolean);

    return parts.join('. ');
  }

  /* ============================================================
     GEMINI FLASH IMAGE API CALL
  ============================================================ */
  async function callGeminiImage(prompt, apiKey, options) {
    options = options || {};
    var ratio    = options.ratio || '1:1';
    var dims     = RATIOS[ratio] || RATIOS['1:1'];

    var endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=' + apiKey;

    var body = {
      contents: [{
        parts: [{
          text: prompt + '\n\nNegative prompt (avoid): ' + NEGATIVE_PROMPT
        }]
      }],
      generationConfig: {
        responseModalities: ['IMAGE', 'TEXT'],
        imageGenerationConfig: {
          numberOfImages: 1,
          aspectRatio: ratio,
        }
      }
    };

    var response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      var err = await response.json();
      throw new Error('Gemini API error: ' + (err.error && err.error.message || response.status));
    }

    var data = await response.json();

    // Extract image from response
    var imageData = null;
    var textData  = null;
    var parts = data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts || [];

    parts.forEach(function (part) {
      if (part.inlineData && part.inlineData.mimeType && part.inlineData.mimeType.startsWith('image/')) {
        imageData = part.inlineData;
      }
      if (part.text) textData = part.text;
    });

    if (!imageData) throw new Error('No image returned from Gemini');

    return {
      imageUrl:  'data:' + imageData.mimeType + ';base64,' + imageData.data,
      imageData: imageData,
      text:      textData,
      prompt:    prompt,
      ratio:     ratio,
    };
  }

  /* ============================================================
     MAIN GENERATE FUNCTION
  ============================================================ */
  async function generate(userRequest, options) {
    options = options || {};

    var apiKey = options.apiKey || (global.OGImageConfig && global.OGImageConfig.apiKey);
    if (!apiKey) throw new Error('OGImage: apiKey required. Pass as options.apiKey or set OGImageConfig.apiKey');

    var finalPrompt = buildPrompt(userRequest, options);

    console.log('[OGImage] Generating:', userRequest);
    console.log('[OGImage] Full prompt:', finalPrompt);

    var result = await callGeminiImage(finalPrompt, apiKey, options);
    result.userRequest = userRequest;
    return result;
  }

  /* ============================================================
     AUTO WIDGET — renders UI for [data-og-image-widget] elements
  ============================================================ */
  function initWidget(el) {
    var apiKey = el.getAttribute('data-api-key') || (global.OGImageConfig && global.OGImageConfig.apiKey) || '';

    el.innerHTML = [
      '<div style="font-family:system-ui,sans-serif;background:#141e32;border:1px solid rgba(36,188,227,0.2);border-radius:16px;padding:24px;max-width:600px;color:#fff">',
        '<div style="font-size:0.7rem;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:#24bce3;margin-bottom:8px">OpenGradient Image Generator</div>',
        '<div style="font-size:1.2rem;font-weight:300;margin-bottom:20px">Create brand images with AI</div>',

        // API key input (if not set)
        !apiKey ? '<input data-og-apikey placeholder="Gemini API Key" style="width:100%;padding:10px 14px;background:#0a0f19;border:1px solid rgba(36,188,227,0.2);border-radius:8px;color:#fff;font-size:0.85rem;margin-bottom:12px;outline:none" />' : '',

        // Prompt input
        '<textarea data-og-prompt placeholder="Describe what you want to create..." rows="3" style="width:100%;padding:12px 14px;background:#0a0f19;border:1px solid rgba(36,188,227,0.2);border-radius:8px;color:#fff;font-size:0.9rem;resize:vertical;outline:none;font-family:inherit"></textarea>',

        // Options row
        '<div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap">',
          '<select data-og-ratio style="padding:8px 12px;background:#0a0f19;border:1px solid rgba(36,188,227,0.2);border-radius:8px;color:#fff;font-size:0.8rem;flex:1">',
            Object.keys(RATIOS).map(function(r){ return '<option value="'+r+'">'+r+' — '+RATIOS[r].label+'</option>'; }).join(''),
          '</select>',
          '<select data-og-type style="padding:8px 12px;background:#0a0f19;border:1px solid rgba(36,188,227,0.2);border-radius:8px;color:#fff;font-size:0.8rem;flex:1">',
            Object.keys(CONTENT_TYPES).map(function(t){ return '<option value="'+t+'">'+t.charAt(0).toUpperCase()+t.slice(1)+'</option>'; }).join(''),
          '</select>',
        '</div>',

        // Generate button
        '<button data-og-generate style="margin-top:12px;width:100%;padding:12px;background:#24bce3;color:#fff;border:none;border-radius:10px;font-size:0.95rem;font-weight:500;cursor:pointer;font-family:inherit">Generate Image</button>',

        // Status
        '<div data-og-status style="font-size:0.8rem;color:#bdebf7;margin-top:10px;min-height:20px"></div>',

        // Output
        '<div data-og-output style="margin-top:16px"></div>',
      '</div>'
    ].join('');

    var btn     = el.querySelector('[data-og-generate]');
    var status  = el.querySelector('[data-og-status]');
    var output  = el.querySelector('[data-og-output]');
    var promptEl = el.querySelector('[data-og-prompt]');
    var ratioEl  = el.querySelector('[data-og-ratio]');
    var typeEl   = el.querySelector('[data-og-type]');
    var keyEl    = el.querySelector('[data-og-apikey]');

    btn.addEventListener('click', async function () {
      var key    = (keyEl && keyEl.value) || apiKey;
      var prompt = promptEl.value.trim();
      if (!key)    { status.textContent = 'Enter your Gemini API key'; return; }
      if (!prompt) { status.textContent = 'Enter a description'; return; }

      btn.disabled = true;
      btn.textContent = 'Generating...';
      status.textContent = 'Sending to Gemini Flash Image...';
      output.innerHTML = '';

      try {
        var result = await generate(prompt, {
          apiKey: key,
          ratio:  ratioEl.value,
          type:   typeEl.value,
        });

        var img = document.createElement('img');
        img.src = result.imageUrl;
        img.style.cssText = 'width:100%;border-radius:10px;border:1px solid rgba(36,188,227,0.2)';

        var dl = document.createElement('a');
        dl.href = result.imageUrl;
        dl.download = 'opengradient-' + Date.now() + '.png';
        dl.textContent = 'Download image';
        dl.style.cssText = 'display:block;margin-top:10px;font-size:0.8rem;color:#24bce3;text-decoration:none';

        output.appendChild(img);
        output.appendChild(dl);
        status.textContent = 'Done!';
      } catch (e) {
        status.textContent = 'Error: ' + e.message;
      } finally {
        btn.disabled = false;
        btn.textContent = 'Generate Image';
      }
    });
  }

  function initWidgets() {
    document.querySelectorAll('[data-og-image-widget]').forEach(function (el) {
      if (!el.getAttribute('data-og-widget-init')) {
        el.setAttribute('data-og-widget-init', 'true');
        initWidget(el);
      }
    });
  }

  /* ============================================================
     PUBLIC API
  ============================================================ */
  var OGImage = {
    VERSION:      '1.0.0',
    generate:     generate,
    buildPrompt:  buildPrompt,
    BRAND:        BRAND_GUIDELINES,
    NEGATIVE:     NEGATIVE_PROMPT,
    RATIOS:       RATIOS,
    TYPES:        CONTENT_TYPES,
    initWidgets:  initWidgets,
  };

  global.OGImage = OGImage;

  if (document && document.readyState !== 'loading') {
    initWidgets();
  } else if (document) {
    document.addEventListener('DOMContentLoaded', initWidgets);
  }

}(typeof window !== 'undefined' ? window : this));
