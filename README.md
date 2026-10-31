# Jacob Bacus portfolio

A static portfolio with a Skyrim-style directional menu. HTML, CSS, and vanilla JavaScript; no runtime dependencies.

## Development

Run `npm run dev` and open http://127.0.0.1:4173. Run `npm run check` for JavaScript syntax and `npm run build` for the static `dist/` output. Render Static Site settings: build command `npm run build`, publish directory `dist`.

## Structure

- `content.js`: resume-grounded experience and project data.
- `app.js`: selectors, shaped constellations, radial hover, animated navigation, and ambient motion.
- `styles.css`: responsive layout and visual styling.
- `assets/Jacob-Bacus-Resume.pdf`: unchanged one-page recruiting resume. Includes the contact details in the original PDF.
- `assets/mountains.png`: generated mountain panorama based on the supplied landscape reference.

Experience uses a separate starfield, with Klaviyo flag, DALI mustache, and P1 hard-hat constellations. Projects are left aligned; Skills & Interests selectors are right aligned. More is a plain list of links. Resume opens an embedded PDF with its title and download link in a compact top bar; the document scrolls inside a viewport-sized viewer. Native browser PDF support varies on phones.

Arrow keys select a home direction; Enter follows the focused link. Escape follows the Back link; the résumé returns to the section it was opened from. Every inner section has a top Back link. Reduced motion follows the system setting and can also be changed at the top left of the home screen. Legacy inventory/magic/map hashes remain supported.

Content comes from the 2026 recruiting resume and verified project/GitHub links. LinkedIn automated retrieval was blocked, so it is linked without adding unverified profile claims. No hosting or DNS settings are changed by the build. The existing GitHub Pages deployment uses the gh-pages branch.
