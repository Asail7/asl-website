# ASL — Web Design & Development

A bilingual (Arabic-first, RTL-native) service website for the **ASL** personal brand.
Built with Next.js App Router, TypeScript, Tailwind CSS v4, and Motion.

---

## 1. Running it

```bash
npm install
cp .env.example .env.local     # then paste your Web3Forms key
npm run dev                    # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

Node 18.18+ is required (Node 20 or 22 recommended).

---

## 2. The contact form

The form posts to **Web3Forms** — free, no backend, submissions land in your inbox.

1. Go to <https://web3forms.com>, enter your email, and copy the access key they send you.
2. Put it in `.env.local`:

   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=your-key-here
   ```

3. Redeploy. That's it.

If the key is missing, the form degrades gracefully: it validates the input and
then opens the visitor's mail client with the message pre-filled, so nothing is lost.

A hidden `botcheck` honeypot field is already wired up for spam.

---

## 3. Languages

- Routes are `/ar` (default) and `/en`.
- `src/middleware.ts` sends `/` to the visitor's saved language, then their
  browser language, then Arabic.
- The choice is stored in an `asl_locale` cookie for one year.
- Direction, alignment, animation direction, the select-arrow side, the marquee
  direction, and the type scale all flip with the locale. RTL is handled with CSS
  **logical properties** (`margin-inline`, `inset-inline`, `border-inline`) rather
  than mirrored overrides, so it is a native layout and not a flipped one.
- `hreflang` alternates and per-locale Open Graph metadata are generated in
  `src/app/[locale]/layout.tsx`.

### Editing content

**All copy for both languages lives in one file:** `src/i18n/content.json`.

Nothing is hardcoded in the components. Change a heading, a service, an FAQ
answer, or a project description there and it updates everywhere — including the
JSON-LD structured data and the standalone preview.

The `shared` block at the bottom holds the email, phone, social links, and
`siteUrl` — **update `siteUrl` to your real domain before going live**, since the
sitemap, canonical URLs, and Open Graph tags are built from it.

---

## 4. Fonts — please read

The site is set in **thmanyah** (خط ثمانية): *thmanyah sans* for the interface and
*thmanyah serif display* for headlines, in **both** languages. The typeface covers
full Latin as well as Arabic, which is what lets the two locales share one identity
instead of looking like two different sites.

Files live in `public/fonts/` and are declared with `@font-face` in
`src/styles/asl.css`. The two most critical faces are preloaded in the layout.

⚠️ **Licence note.** thmanyah's licence permits commercial use, but it also says the
font may be embedded in websites *"only as part of a compiled, packaged, or
obfuscated product"* and prohibits making the files available in a way that lets
third parties download them as font files. Serving `.woff2` from a public
`/fonts/` path — which is what this project does by default, and what nearly every
site does — is worth clearing with them first. Both licence PDFs are included in
`public/fonts/` for reference; their contact is `ask@thmanyah.com`.

If you would rather not ship the files at all, change the two `--font-*` tokens at
the top of `src/styles/asl.css` and delete the `@font-face` blocks:

```css
--font-sans: "IBM Plex Sans Arabic", ui-sans-serif, system-ui, sans-serif;
--font-display: "IBM Plex Sans Arabic", ui-sans-serif, system-ui, sans-serif;
```

The whole design system keys off those two variables, so nothing else changes.

---

## 5. Structure

```
src/
├─ app/
│  ├─ [locale]/
│  │  ├─ layout.tsx        root layout: <html dir>, metadata, JSON-LD
│  │  └─ page.tsx          composes every section
│  ├─ globals.css          Tailwind + design tokens exposed to utilities
│  ├─ not-found.tsx        bilingual 404
│  ├─ robots.ts
│  ├─ sitemap.ts
│  └─ icon.svg
├─ components/
│  ├─ LocaleProvider.tsx   locale, direction, motion axis, dictionary
│  ├─ Navbar.tsx           sticky, scroll-spy, mobile sheet
│  ├─ HeroVisual.tsx       the idea → design → code → website composition
│  ├─ LanguageSwitcher.tsx
│  ├─ sections/            Hero, TrustStrip, Services, ValueProps, Process,
│  │                       Projects, About, TechStack, FAQ, FinalCTA,
│  │                       Contact, Footer
│  └─ ui/                  Reveal, SectionHead, Artwork
├─ i18n/content.json       ← every word on the site, in both languages
├─ lib/i18n.ts             locale helpers
├─ styles/asl.css          the design system
└─ middleware.ts           locale routing
```

### Why the CSS is not all Tailwind classes

The design tokens and the component layer live in `src/styles/asl.css` as real CSS
custom properties. `globals.css` maps those same tokens into Tailwind's `@theme`, so
`text-ink`, `bg-paper`, `border-line` and friends resolve against one source of truth
and Tailwind utilities are available anywhere you want them.

Two reasons for this split: RTL needs logical properties and direction-aware
`transform` values that read far better as CSS than as long utility strings; and
the same stylesheet drives the standalone `asl-preview.html`, so the preview and
the real site can never drift apart.

---

## 6. Design system

| Token | Value | Used for |
| --- | --- | --- |
| `--paper` | `#F8F5F0` | page background (warm off-white) |
| `--paper-raised` | `#FFFFFF` | cards, form |
| `--paper-deep` | `#EFEAE2` | alternate bands |
| `--ink` | `#16151A` | headings, dark sections |
| `--ink-soft` | `#45434B` | body copy |
| `--ink-mute` | `#6E6B75` | secondary copy (4.8:1 on paper) |
| `--line` / `--line-strong` | `#E4DED4` / `#D5CDC0` | hairlines, borders |
| `--accent` | `#6A4A9C` | CTAs, links, highlights (6.3:1 on paper) |
| `--accent-light` | `#C3A9EC` | accent on dark (8.8:1 on ink) |

Three colours, plus derived tones. Nothing else.

Motion is `0.22s`–`0.7s` on `cubic-bezier(0.22, 1, 0.36, 1)`, and every animation
is disabled under `prefers-reduced-motion`.

`--dir` is `1` in LTR and `-1` in RTL; horizontal transforms multiply by it, so
arrows and slide-ins always travel with the reading direction.

---

## 7. Accessibility

- Semantic landmarks, a single `h1`, ordered heading levels
- Skip link, visible focus rings, full keyboard operation
- FAQ built on real buttons with `aria-expanded` / `aria-controls`
- Form: labels tied to inputs, `aria-invalid`, `role="alert"` errors, focus moved
  to the first invalid field, focus moved to the success message after sending
- Body text meets WCAG AA contrast; decorative artwork is `aria-hidden`
- `prefers-reduced-motion` honoured throughout

---

## 8. Deploying

**Vercel** is the shortest path:

1. Push this folder to a Git repository.
2. Import it at <https://vercel.com/new> — the framework is detected automatically.
3. Add `NEXT_PUBLIC_WEB3FORMS_KEY` under *Settings → Environment Variables*.
4. Add your domain, then set `shared.siteUrl` in `src/i18n/content.json` to match
   and redeploy.

Anything that runs Node works too (`npm run build && npm start`).

---

## 9. Before launch

- [ ] Set `shared.siteUrl` in `src/i18n/content.json` to the real domain
- [ ] Add the Web3Forms key and send yourself a test submission
- [ ] Confirm the font licence position with thmanyah (section 4)
- [ ] Replace `public/og.png` if you want different share artwork
- [ ] Add real links for the Ofoq, Infrastructure, SunGuard and TADAWI projects
      (`work.items[].link` in `content.json`) — the button appears automatically
- [ ] Add a testimonials section only once you have real quotes; it was left out
      on purpose rather than filled with invented ones
