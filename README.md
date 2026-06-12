# meditation-vr-web-app

Deployable static web app built with Nexus Vybe Cloud.

## Clarity Room Preview

Clarity Room is a browser-based meditation and vision-board prototype for creative clarity, calm, and safety. The first live preview is fully static and can be opened directly from `index.html` or served by any static web server.

## Files

- `index.html` - app shell and preview-safe navigation
- `styles.css` - responsive visual system and ambient motion
- `src/data.js` - guided session, vision-board themes, and affirmations
- `src/app.js` - in-app interactions for journey steps, theme selection, affirmations, and motion controls
- `assets/` - local generated visual assets for the hero, vision board, and affirmation sections
- `tests/smoke.test.js` - Node smoke test for content counts, required terms, preview-safe controls, and asset references

## Test

```bash
npm test
```
