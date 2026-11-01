# Portfolio UI

- Treat phone portrait and landscape layouts as first-class views when changing navigation or layout. Keep the Resume viewer within the viewport and avoid horizontal page overflow.
- Detect direct-tap navigation through `(hover: none) and (pointer: coarse)`, not window width. A narrow desktop window must retain mouse hover; touch users should navigate with one tap on either a radial label or its artwork region.
- Use the shared `navigate()` function for internal links. Assigning `location.hash` causes native anchor scrolling to compete with scene animations.
- Keep the mountain background covering the viewport throughout Experience transitions. Returning home should reveal a landscape already in place.
- Check reduced motion, idle artwork clicks into More, Back, and rapid navigation when changing transitions.
