import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";

const publicDirectory = resolve("dist");
const page = readFileSync(resolve(publicDirectory, "index.html"), "utf8");

test("resolves local links, images, fonts and scripts under the GitHub Pages subdirectory", () => {
  const base = new URL("https://lcsf-dev.github.io/landing-page-focus-clinica/");
  const ids = [...page.matchAll(/\bid="([^"]+)"/g)].map((item) => item[1]);
  assert.equal(new Set(ids).size, ids.length, "IDs must be unique.");
  for (const [, reference] of page.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = new URL(reference, base);
    if (url.origin !== base.origin) continue;
    assert.ok(url.pathname.startsWith(base.pathname), `Path outside the project: ${reference}`);
    if (reference.startsWith("#")) {
      assert.ok(ids.includes(reference.slice(1)), `Missing anchor: ${reference}`);
      continue;
    }
    const filePath = resolve(publicDirectory, decodeURIComponent(url.pathname.slice(base.pathname.length)));
    assert.ok(existsSync(filePath) && statSync(filePath).isFile(), `Missing asset: ${reference}`);
  }
  for (const [, reference] of page.matchAll(/\b(?:aria-controls|aria-labelledby)="([^"]+)"/g)) {
    for (const id of reference.split(/\s+/)) {
      assert.ok(ids.includes(id), `Missing accessible reference: ${id}`);
    }
  }
  const stylesheetUrl = new URL("css/styles.css", base);
  const styles = readFileSync(resolve(publicDirectory, "css/styles.css"), "utf8");
  for (const [, reference] of styles.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
    const url = new URL(reference, stylesheetUrl);
    if (url.origin !== base.origin) continue;
    assert.ok(url.pathname.startsWith(base.pathname), `CSS asset outside the project: ${reference}`);
    const filePath = resolve(publicDirectory, decodeURIComponent(url.pathname.slice(base.pathname.length)));
    assert.ok(existsSync(filePath) && statSync(filePath).isFile(), `Missing CSS asset: ${reference}`);
  }
  assert.ok(existsSync(resolve(publicDirectory, "css/fonts/LICENSE-Inter.txt")), "The font license must be included in the public package.");
});

test("excludes working documents, history and local credentials from the public package", () => {
  for (const name of [".git", ".env", ".github", "docs", "tests", "tmp", "README.md", "package.json", "netlify"]) {
    assert.equal(existsSync(resolve(publicDirectory, name)), false, `Working file in public package: ${name}`);
  }
});

test("includes every relative ES module import and SVG symbol used by the page", () => {
  function verifyModules(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const filePath = join(directory, entry.name);
      if (entry.isDirectory()) {
        verifyModules(filePath);
      } else if (entry.name.endsWith(".js")) {
        const source = readFileSync(filePath, "utf8");
        for (const [, reference] of source.matchAll(/\bfrom\s+["']([^"']+)["']/g)) {
          assert.ok(reference.startsWith("."), `Unexpected external module: ${reference}`);
          assert.ok(existsSync(resolve(dirname(filePath), reference)), `Missing module: ${reference}`);
        }
      }
    }
  }
  verifyModules(resolve(publicDirectory, "js"));
  const sprite = readFileSync(resolve(publicDirectory, "img/icons.svg"), "utf8");
  const symbolIds = [...sprite.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  for (const [, symbolId] of page.matchAll(/img\/icons\.svg#([^"]+)/g)) {
    assert.ok(symbolIds.includes(symbolId), `Missing SVG symbol: ${symbolId}`);
  }
  assert.ok(symbolIds.includes("close"), "The menu close icon must be available.");
});
