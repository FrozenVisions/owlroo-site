# owlroo-site

Owlroo website: done-for-you AI assistants for UK small businesses. *Up all night, on the hop.*

- **Live (GitHub Pages):** https://frozenvisions.github.io/owlroo-site/
- The repo root is the built static site that Pages serves (`index.html`, `styles.css`, `script.js`, `assets/`, `.nojekyll`). All paths are relative, so it works under `/owlroo-site/` and on a custom domain.
- `source/` holds the editable templates (`source/src`), `brand.json` (brand name, domain, email, tagline) and `build.mjs`.

## Rebuild
1. Copy the root `assets/` folder into `source/src/assets/`. The images aren't duplicated in `source/`.
2. Edit `source/brand.json` or the templates.
3. Run `cd source && node build.mjs`.
4. Copy `source/dist/*` to the repo root and commit.

## Custom domain (owlroo.com)
Add the domain in Settings > Pages, then point DNS at GitHub Pages: A records 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153, plus `www` as a CNAME to frozenvisions.github.io.
