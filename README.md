# Johnny Watts // Kaotick Jay

A personal cybersecurity portfolio with an editorial, terminal-inspired visual identity: near-black backgrounds, acid-green accents, original wireframe graphics, project filters, and a keyboard-accessible navigation terminal.

**Hosting:** built for GitHub Pages from `main` / `(root)`. The root `.nojekyll` file serves the static source without Jekyll processing. No custom Actions workflow, paid build service, analytics, contact form, or domain purchase is required. The potential `kaotickjay.com` domain is not assumed to be owned and is not set as a canonical URL.

## Run locally

Requires Node.js 20+ for checks and packaging. There are no runtime or development dependencies to install.

```sh
npm test
npm run check
npm run build
python3 -m http.server 8000 --directory dist
```

Visit `http://localhost:8000`. The site is static HTML, CSS, and JavaScript modules. Serve through HTTP rather than opening `index.html` as a local file so module imports work. All substantive content and links remain available if JavaScript is disabled.

## Structure

- `index.html`: all portfolio content, public source/profile links, and semantic markup.
- `styles.css`: responsive layout, original visual treatment, reduced-motion and print styles.
- `app.js`: project filters, mobile navigation, accessible terminal, and motion controls.
- `core.js`: pure command/filter helpers with an explicit allowlist.
- `assets/favicon.svg`: original KJ monogram.
- `scripts/check.mjs`: static content, privacy, link-target, and structural checks.
- `scripts/build.mjs`: copies the static delivery files into `dist/`.
- `tests/core.test.mjs`: automated unit tests, using the built-in Node test runner.
- `docs/content-sources.md`: claim provenance and editorial boundaries.
- `docs/qa.md`: actual verification performed and remaining limits.

## Interactions

- **Project filters:** All work, Tools, Research, Field guides. Visible count is announced to assistive technology.
- **Portfolio terminal:** Open with the visible button or `/` when not typing. Commands are `help`, `whoami`, `work`, `tools`, `research`, `guides`, `credentials`, `connect`, and `clear`. Up/Down recalls history; Escape closes. This is a navigation interface only: it never executes system commands or fetches remote code.
- **Motion:** The footer toggle pauses decorative motion. OS reduced-motion preferences disable animations automatically.
- **Mobile navigation:** Keyboard operable; closes on selection, Escape, or switching to desktop layout.
- **Research context:** Native expandable disclosure keeps qualifications close to the XAMPP write-up.

## Edit content

Edit the HTML, update `docs/content-sources.md` when changing claims, then run all three verification commands. Keep project categories consistent with `core.js`. External links are explicit and use `noopener noreferrer` when opening a new tab.

HTB and THM top 1% standings and active certifications are owner-supplied, not live integrations or independently verified badges. The site says so. Do not add exact ranks, credential numbers, endorsement badges, client logos, unverified vulnerability claims, or invented metrics. Contact currently uses public GitHub/HTB/THM links; private email and phone data are intentionally absent.

## Publication and maintenance

1. Have Johnny review the wording, current role, certifications, and profile standings.
2. Confirm all profile links are current and choose any additional public contact method deliberately.
3. GitHub Pages can serve `main` / `(root)` directly. No custom deployment workflow is included; GitHub manages its native Pages deployment.
4. Confirm domain ownership before adding a canonical URL, social-image URL, or DNS settings.
5. The development-only `noindex, nofollow` meta tag was removed for the authorized public release. Robots tags are indexing preferences, **not access control**.
6. Re-run tests and browser checks against the actual production host, including mobile and assistive-technology checks.

## Security and privacy

No cookies, local storage, trackers, remote fonts, CDNs, API calls, user-submitted contact data, or secrets are required. Browser state is memory-only. All terminal responses are inserted with `textContent`; unknown commands are inert text. When hosting is approved, configure host-level security headers such as Content-Security-Policy and Referrer-Policy. The site contains external links, not live network or vulnerability tooling.

No software license is granted by default. Choose an appropriate license before distributing or inviting reuse of the website source. Linked projects retain their own licenses.
