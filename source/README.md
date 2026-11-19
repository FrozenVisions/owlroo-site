# Owlroo website (static)

- Change the brand in ONE place: `brand.json` (BRAND, DOMAIN, EMAIL, TAGLINE, YEAR). The logo is image-based (src/assets/owl-mark, owlroo-wordmark, owlroo-logo, favicons), cut out of /workspace/100day/brand/owlroo-logo.jpg. A rename means regenerating those images.
- Build: `node build.mjs` turns `src/` into `dist/` (all `{{TOKENS}}` get replaced).
- Deploy dist/ to Cloudflare: `cd ../cf && npx wrangler deploy` (worker name: owlroo) (wrangler.jsonc points at ../site/dist).
- Deploy dist/ to Vercel (once the CLI is logged in): `cd dist && vercel deploy --prod --name owlroo`
- Screenshots: `python3 shoot.py <url>` writes files to shots/

## TODO
- Form: the audit form opens the visitor's email app (a mailto link to EMAIL). Swap it for Formspree or Tally once an account exists.
- hello@owlroo.com doesn't exist yet. The domain isn't bought and no mailbox is set up.
- Testimonials are clearly marked example slots. Replace them with real reviews only.
- The 30-day money-back on setup and the "live in 7 days" promise need Chris to confirm he's happy to commit to them.
- Strikethrough "standard" setup prices (£497/£797/£1,497) only stay honest if those really are the prices after the founding spots go.
- VAT wording, privacy policy, terms, and company/ICO details are needed before taking money.
- AI phone answering is listed as a quote-only add-on, because minutes cost money.
