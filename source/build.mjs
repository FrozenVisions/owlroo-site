// Swap the brand in ONE place: edit brand.json, then run `node build.mjs`.
// Copies src/ -> dist/, replacing {{KEY}} tokens in text files.
import fs from "node:fs"; import path from "node:path";
const brand = JSON.parse(fs.readFileSync("brand.json", "utf8"));
const src = "src", out = "dist";
fs.rmSync(out, { recursive: true, force: true });
const textExt = new Set([".html", ".css", ".js", ".svg", ".txt", ".xml", ".json", ".webmanifest"]);
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f), o = path.join(out, path.relative(src, p));
    if (fs.statSync(p).isDirectory()) { fs.mkdirSync(o, { recursive: true }); walk(p); continue; }
    fs.mkdirSync(path.dirname(o), { recursive: true });
    if (textExt.has(path.extname(f))) {
      let t = fs.readFileSync(p, "utf8");
      t = t.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in brand ? brand[k] : m));
      const left = t.match(/\{\{\w+\}\}/g); if (left) console.warn("Unreplaced in", p, left);
      fs.writeFileSync(o, t);
    } else fs.copyFileSync(p, o);
  }
})(src);
console.log("Built dist/ for", brand.BRAND);
