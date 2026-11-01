import { beforeAll, describe, expect, it } from "vitest";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join, resolve, sep } from "node:path";

const DIST_DIR = resolve(import.meta.dirname, "../../dist");
const INDEX_FILE = join(DIST_DIR, "index.html");
const DEPLOYMENT_BASE = new URL("https://example.netlify.app/");

const FORBIDDEN_PUBLIC_PATHS = [
  ".git",
  ".env",
  ".env.local",
  ".github",
  "coverage",
  "docs",
  "tests",
  "tmp",
  "README.md",
  "package.json",
  "package-lock.json",
  "netlify.toml",
  "vite.config.js",
];

let html;

beforeAll(() => {
  if (!existsSync(INDEX_FILE)) {
    throw new Error(
      "dist/index.html não encontrado. Execute `npm run build` antes de `npm run test:build`.",
    );
  }

  html = readFileSync(INDEX_FILE, "utf8");
});

function getAttributeValues(source, attributePattern) {
  const pattern = new RegExp(`\\b(?:${attributePattern})="([^"]+)"`, "g");

  return [...source.matchAll(pattern)].map(([, value]) => value);
}

function resolveLocalReference(reference, baseUrl = DEPLOYMENT_BASE) {
  let url;

  try {
    url = new URL(reference, baseUrl);
  } catch {
    return { reference, invalid: true };
  }

  if (url.origin !== DEPLOYMENT_BASE.origin) return null;

  const relativePath = decodeURIComponent(
    url.pathname.slice(DEPLOYMENT_BASE.pathname.length),
  );
  const filePath = resolve(DIST_DIR, relativePath);
  const insideDist =
    filePath === DIST_DIR || filePath.startsWith(`${DIST_DIR}${sep}`);

  return { reference, url, filePath, insideDist };
}

function isExistingFile(filePath) {
  return existsSync(filePath) && statSync(filePath).isFile();
}

function extractCssUrls(css) {
  return [...css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)].map(
    ([, url]) => url,
  );
}

function extractSvgReferences(source) {
  return [...source.matchAll(/(?:href|src)="([^"#]+\.svg)#([^"]+)"/g)].map(
    ([, fileReference, symbolId]) => ({ fileReference, symbolId }),
  );
}

function extractSymbolIds(svg) {
  return new Set([...svg.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id));
}

function getUniqueIds(source) {
  return getAttributeValues(source, "id");
}

describe("public package", () => {
  it.each(FORBIDDEN_PUBLIC_PATHS)("does not publish %s", (name) => {
    const filePath = join(DIST_DIR, name);

    const published = existsSync(filePath);

    expect(published, `Working file in public package: ${name}`).toBe(false);
  });
});

describe("HTML references", () => {
  it("declares unique ids", () => {
    const ids = getUniqueIds(html);

    const uniqueIds = new Set(ids);

    expect
      .soft(ids, "The page must declare at least one id")
      .not.toHaveLength(0);
    expect.soft(uniqueIds.size, "Duplicate id found").toBe(ids.length);
  });

  it("resolves every local href and src inside dist", () => {
    const references = getAttributeValues(html, "href|src").filter(
      (reference) => !reference.startsWith("#"),
    );

    const localReferences = references
      .map((reference) => resolveLocalReference(reference))
      .filter(Boolean);

    expect
      .soft(localReferences.length, "No local references found")
      .toBeGreaterThan(0);

    for (const {
      reference,
      invalid,
      filePath,
      insideDist,
    } of localReferences) {
      expect.soft(invalid, `Invalid URL: ${reference}`).toBeFalsy();
      if (invalid) continue;

      expect.soft(insideDist, `Asset outside dist/: ${reference}`).toBe(true);
      expect
        .soft(isExistingFile(filePath), `Missing asset: ${reference}`)
        .toBe(true);
    }
  });

  it("points every internal anchor to an existing id", () => {
    const ids = new Set(getUniqueIds(html));
    const anchors = getAttributeValues(html, "href").filter((reference) =>
      reference.startsWith("#"),
    );

    const missingAnchors = anchors.filter(
      (anchor) => !ids.has(anchor.slice(1)),
    );

    expect.soft(anchors.length, "No internal anchors found").toBeGreaterThan(0);
    expect
      .soft(missingAnchors, `Missing anchors: ${missingAnchors.join(", ")}`)
      .toEqual([]);
  });

  it("resolves accessible id references", () => {
    const ids = new Set(getUniqueIds(html));
    const references = getAttributeValues(
      html,
      "aria-controls|aria-labelledby",
    ).flatMap((value) => value.split(/\s+/));

    const missingIds = references.filter((id) => !ids.has(id));

    expect
      .soft(
        missingIds,
        `Missing accessible references: ${missingIds.join(", ")}`,
      )
      .toEqual([]);
  });
});

describe("CSS references", () => {
  it("resolves every local url() from referenced stylesheets", () => {
    const stylesheets = getAttributeValues(html, "href")
      .filter((reference) => /\.css(?:\?[^"]*)?$/.test(reference))
      .map((reference) => resolveLocalReference(reference))
      .filter((stylesheet) => stylesheet && !stylesheet.invalid);

    const cssAssets = stylesheets.flatMap((stylesheet) => {
      if (!isExistingFile(stylesheet.filePath)) return [];

      const css = readFileSync(stylesheet.filePath, "utf8");

      return extractCssUrls(css)
        .map((reference) => resolveLocalReference(reference, stylesheet.url))
        .filter(Boolean);
    });

    expect.soft(stylesheets.length, "No stylesheets found").toBeGreaterThan(0);

    for (const asset of cssAssets) {
      expect
        .soft(asset.invalid, `Invalid CSS asset: ${asset.reference}`)
        .toBeFalsy();
      if (asset.invalid) continue;

      expect
        .soft(asset.insideDist, `CSS asset outside dist/: ${asset.reference}`)
        .toBe(true);
      expect
        .soft(
          isExistingFile(asset.filePath),
          `Missing CSS asset: ${asset.reference}`,
        )
        .toBe(true);
    }
  });
});

describe("SVG sprite", () => {
  it("contains every symbol referenced by the page", () => {
    const references = extractSvgReferences(html);
    const spriteIds = new Map();

    for (const { fileReference } of references) {
      if (spriteIds.has(fileReference)) continue;

      const sprite = resolveLocalReference(fileReference);
      const filePath = sprite && !sprite.invalid ? sprite.filePath : null;

      spriteIds.set(
        fileReference,
        filePath && isExistingFile(filePath)
          ? extractSymbolIds(readFileSync(filePath, "utf8"))
          : null,
      );
    }

    expect
      .soft(references.length, "No SVG symbols referenced")
      .toBeGreaterThan(0);

    for (const { fileReference, symbolId } of references) {
      const symbolIds = spriteIds.get(fileReference);

      expect.soft(symbolIds, `Missing sprite: ${fileReference}`).not.toBeNull();
      expect
        .soft(
          symbolIds?.has(symbolId),
          `Missing symbol: ${fileReference}#${symbolId}`,
        )
        .toBe(true);
    }
  });
});
