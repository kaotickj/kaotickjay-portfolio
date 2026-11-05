# Verification record

This initial QA record was prepared before public release. Following owner approval, the repository was made public and GitHub Pages was configured from `main` / `(root)`. GitHub’s deployment history is the source for live deployment status; no paid hosting upgrade or custom workflow was added.

Verified 2026-11-05 against the final source with Node.js 24.22.1 and the available Chromium browser.

## Automated checks

- `npm test`: **22/22 tests passed**. Covers command normalization, empty/help/clear behavior, every allowed navigation command, category filtering, all-filter reset, prototype names, inert HTML-like input, inert shell-like input, and immutable configuration.
- `npm run check`: **passed**. JavaScript syntax and static structural/integrity checks: unique IDs; fragment/control targets; local assets; safe new-tab links; page language; a single h1; viewport; skip link; current THM and HTB URLs; absence of private contact data and unverified domain ownership; six project records; no dynamic HTML injection or execution; no remote script dependency.
- `npm run build`: **passed**. Five static delivery files. No package installation or external build service.

## Browser checks performed

- Desktop visual inspection at the available 1180px viewport.
- Real iframe viewport reflow checks at **320, 390, 768 and 1440px**. No page-level horizontal overflow or overflowing main project/credential/hero elements at those widths. Iframe checks validate responsive CSS in Chromium; they do not replace real iOS/Android device tests.
- Visual inspection of 320/390px hero and 390px selected-work layout.
- All project filters return the expected counts: all 6, tools 3, research 1, guides 2.
- Research context disclosure expands correctly.
- Terminal opens, shows help, clears output, handles unknown commands as text, and navigates to the correct filtered section.
- An HTML-like unknown command remained text; it did not create image/HTML elements.
- Escape closes the terminal and restores focus to its trigger. Navigation commands close it and move focus to the destination section.
- Browser Back/Forward restores the expected section hashes after terminal navigation.
- Mobile menu opens and closes by keyboard, closes after choosing a link, and closes with Escape. A click interaction was also exercised successfully at 320px.
- Footer motion control changes the page to `data-motion="off"`. System reduced-motion handling exists in both CSS and JavaScript; OS-level preference emulation was not available in this browser surface.
- No app-origin warning/error entries appeared in the inspected browser log. The browser extension itself emitted metadata errors, which were not website errors.

## Accessibility and privacy review

- Semantic headings, navigation, landmarks, native links/buttons/details/dialog, labeled input, skip link, focus indicators, announced filter count and terminal output.
- Essential content and source/profile links are in static HTML; interactive controls start hidden until their JavaScript handlers are available.
- Main text/accent tokens exceed WCAG AA normal-text contrast against their respective dark surfaces (e.g. muted `#a2ad9c` on `#101510`, secondary `#7e8b79` on `#101510`, and lime `#b7ff5a` on `#141c11`). This is token checking, not a complete automated accessibility audit.
- No contact form, tracking, third-party fonts, cookies, local storage, credential data, or API integrations.
- The terminal is an allowlisted portfolio navigator, not a system shell.

## Remaining limits

- Not tested on Safari, Firefox, physical mobile devices, a screen reader, forced-colors mode, or an actual production host.
- No Lighthouse or axe audit was run.
- Linked project descriptions were verified against public source documentation. Those security tools themselves were not executed or audited as part of the portfolio build.
- HTB/THM standings and current certifications are owner-supplied, not independently verified or live-updated. The page includes that qualification.
- Back to School CTF lacks a verified public source and was omitted pending an approved link/description.
- No custom GitHub Actions workflow was installed. The public release uses GitHub’s native Pages build/deployment workflow; no paid build service was added.
- No domain purchase or DNS change was performed. The authorized public release uses GitHub’s default Pages domain.
