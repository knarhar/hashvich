// Checks the built site in dist/: every internal link points at a file that
// exists, and every page is linked from at least one other page (no
// orphans). The bare root (a redirect) and 404.html are exempt from the
// second rule. Exits non-zero on any problem. No dependencies.
//
//   node scripts/check-links.mjs [dist]

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.argv[2] ?? "dist";
const base = (process.env.BASE_PATH ?? "").replace(/\/$/, "");

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith(".html") ? [path] : [];
  });
}

/** "/ru/nalogi/" for dist/ru/nalogi/index.html. */
function urlOf(file) {
  const rel = "/" + relative(root, file).split(sep).join("/");
  return rel.endsWith("/index.html") ? rel.slice(0, -"index.html".length) : rel;
}

function fileFor(url) {
  const path = url.slice(base.length) || "/";
  return path.endsWith("/") ? join(root, path, "index.html") : join(root, path);
}

const pages = htmlFiles(root);
const inbound = new Map(pages.map((file) => [urlOf(file), new Set()]));
const broken = [];

for (const file of pages) {
  const from = urlOf(file);
  const html = readFileSync(file, "utf8");
  for (const [, raw] of html.matchAll(/\shref="([^"]+)"/g)) {
    if (!raw.startsWith("/") || raw.startsWith("//")) continue;
    const url = raw.replace(/[?#].*$/, "");
    if (!existsSync(fileFor(url))) {
      broken.push(`${from} -> ${raw}`);
      continue;
    }
    const target = url.slice(base.length) || "/";
    if (target !== from) inbound.get(target)?.add(from);
  }
}

const orphans = [...inbound]
  .filter(([url, from]) => url !== "/" && url !== "/404.html" && from.size === 0)
  .map(([url]) => url);

for (const link of broken) console.error(`Broken link: ${link}`);
for (const url of orphans) console.error(`Orphan page (no page links to it): ${url}`);

if (broken.length || orphans.length) process.exit(1);
console.log(`Links OK: ${pages.length} pages, no broken internal links, no orphans.`);
