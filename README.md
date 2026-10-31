# Jacob Bacus — A Developer’s Adventure

A Skyrim-inspired personal portfolio built with semantic HTML, CSS, and vanilla JavaScript. No runtime dependencies, accounts, API keys, or build framework.

## Run locally

```sh
npm run dev
```

Open http://127.0.0.1:4173. `npm run check` validates JavaScript syntax; `npm run build` creates the deployable `dist/` folder. Node 18+ is sufficient.

## Navigation

- **Skills / Experience:** choose Klaviyo, DALI, or P1, then a star for each accomplishment.
- **Inventory:** filter and inspect eight projects, with original SVG relic illustrations and source/demo links.
- **Magic:** technical skills, coursework, interests, biography, and two optional Easter eggs.
- **Map:** drag to pan, use zoom and recenter controls, or use the ordinary text links underneath.
- Arrow keys select a home-menu direction; Enter opens it. Escape returns home. J opens the quick professional summary. Dialogs support Escape and focus trapping through native HTML dialog behavior.
- Motion respects the OS setting and can be toggled. Touch and keyboard users can use standard links/buttons. The resume works without JavaScript; printing requires JavaScript only for the convenience button (browser Print also works).

## Content & assets

Edit `roles`, `projects`, and `spellContent` in `app.js`; keep `resume.html` in sync. Do not treat fantasy flavor text as additional professional credentials.

Sources: the 2026 recruiting-cycle Master Resume and its linked project destinations, the connected jbacus1 GitHub account and public repositories, and the original site. LinkedIn blocked automated retrieval; the verified profile URL is linked, but no unverified LinkedIn claims were added. No private repository code, personal phone number, application records, or transcript is included in the site.

- `assets/northern-realm.png`: original AI-generated landscape for this site; no game art or music copied.
- `assets/mark.svg` and project relic/map graphics: original code-native artwork.
- `Jacob_Bacus.jpg`: senior-year portrait retained from the original repository.
- `SeaTurtleBrazil.jpg`: original repository’s sea turtle, preserved as a lazy-loaded Easter egg.
- `assets/speech-check.jpg`: local Fun Stuff meme, shown only when the visitor explicitly opens it.
- Cormorant Garamond and Inter load from Google Fonts, with system fallbacks when offline.

## Hosting

This is a static site. The repository root works on GitHub Pages, with the existing `CNAME` preserved. For a Render Static Site use build command `npm run build` and publish directory `dist`. Hash-based navigation does not require rewrite rules. No server process is required in production. Hosting and DNS have not been changed by this implementation.
