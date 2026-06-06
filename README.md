# Prerika Singh — Marketing Portfolio

A single-page, scroll-driven portfolio website. Light editorial aesthetic
(Warm Cream / Dusty Blue / Mustard Gold), with smooth scrolling, scroll-triggered
animations, a side stage-indicator bar, a background hover spotlight, and an
interactive "Golden Oreo Report Card".

## Run it locally

The site is static. The only runtime dependencies (GSAP + Lenis) load from a CDN,
so you need an internet connection when viewing.

```bash
node server.js
# → http://localhost:8123
```

Or just open `index.html` directly in a browser.

## Structure

```
index.html        — all content / sections
css/style.css     — all styling
js/main.js        — Lenis smooth scroll, GSAP animations, cursor, report card
server.js         — tiny static dev server (no dependencies)
assets/
  img/            — curated photos & campaign visuals
  Prerika_Singh_CV.pdf
images/           — original source images (not all used)
```

## Sections (the "10 stages")

1. Hero  2. About  3. Fun Facts (horizontal scroll)  4. Journey (education + experience)
5. Skills, Tools & Certificates  6. Oreo "Still Golden" campaign (+ interactive report card)
7. Mokobara analysis  8. Jacquemus analysis  9. Work Styles (flip cards)  10. Contact

## Editing notes

- **Swap a photo:** replace the file in `assets/img/` (keep the same name) or update
  the `<img src>` in `index.html`.
- **Placeholder-free:** every image is a real asset. To add more, drop files in
  `assets/img/` and reference them.
- **Colours:** all defined as CSS variables at the top of `css/style.css` (`:root`).
- **Text:** edit directly in `index.html`.

## Deploy (GitHub Pages)

Push the folder to a repo and enable Pages on the root. The CDN scripts work over
https. No build step required.
