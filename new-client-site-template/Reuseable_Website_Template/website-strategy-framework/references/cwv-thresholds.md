# Core Web Vitals Reference

Current as of September 2026.

## The metric set

**LCP, INP, CLS.** FID was retired and must never be referenced.

| Metric | Good | Needs improvement | Poor |
|---|---|---|---|
| LCP (Largest Contentful Paint) | ≤ 2.5s | 2.5–4.0s | > 4.0s |
| INP (Interaction to Next Paint) | ≤ 200ms | 200–500ms | > 500ms |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | 0.1–0.25 | > 0.25 |

Field data (real users) is what Google uses for ranking. Lab data (Lighthouse)
is for debugging. Always cross-reference.

## LCP subparts

`LCP = TTFB + Resource Load Delay + Resource Load Time + Element Render Delay`

| Subpart | Target |
|---|---|
| TTFB | < 800ms |
| Resource Load Delay | Minimise |
| Resource Load Time | Depends on resource size |
| Element Render Delay | Minimise |

Use the breakdown to identify which phase is causing a slow LCP.

## Common causes and fixes

### LCP
- Unoptimised hero images → compress, serve WebP/AVIF, size correctly
- Render-blocking CSS/JS → inline critical CSS, defer the rest
- Slow server response (TTFB > 200ms) → caching, CDN
- Third-party scripts blocking → defer analytics, chat widgets
- Web font delay → `font-display: swap` + preload
- Lazy-loaded hero → do not lazy-load the LCP image

### INP
- Long JS tasks → break into tasks under 50ms
- Heavy event handlers → debounce, use `requestAnimationFrame`
- Excessive DOM size (> 1,500 elements is concerning)
- Third-party scripts on the main thread
- Synchronous XHR or storage access
- Layout thrashing from repeated forced reflows

### CLS
- Images/iframes without dimensions → set width/height or aspect-ratio
- Content injected above existing content
- Web font swap shift → preload + `font-display: swap`
- Ads/embeds without reserved space
- Late-loading content pushing the page down

## Priority

1. **LCP** — most impactful for perceived performance
2. **CLS** — most common UX issue
3. **INP** — matters most for interactive sites

## Measurement sources

**Field:** CrUX, PageSpeed Insights, Search Console Core Web Vitals report
**Lab:** Lighthouse, WebPageTest, Chrome DevTools

Notes:
- The standalone **Page Experience report was removed** from Search Console —
  monitor via the Core Web Vitals and HTTPS reports.
- The CrUX Dashboard (Looker Studio) was **shut down end of November 2025**;
  use CrUX Vis or the CrUX API.
- Lighthouse 13.x uses insight-based performance audits; the performance
  *score* remains metric-based.
- The PWA category was removed in Lighthouse 12 — do not parse it.
- The CrUX dataset is perishable. Re-check release notes before quoting pass
  rates.

## SPA caveat

If the site is a React/Vue/Angular/Svelte SPA, current CWV measurement may miss
soft navigations. Treat reported values with caution and test real user
interactions.
