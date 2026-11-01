import { test, expect } from "./fixtures.js";

const VIEWPORTS = [
  { width: 360, columns: 1 },
  { width: 390, columns: 1 },
  { width: 768, columns: 2 },
  { width: 1440, columns: 4 },
];

for (const { width, columns } of VIEWPORTS) {
  test(`fits the viewport at ${width}px without horizontal overflow`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const overflow = await page.evaluate(
      () =>
        Math.max(
          document.documentElement.scrollWidth,
          document.body.scrollWidth,
        ) - document.documentElement.clientWidth,
    );

    expect(overflow).toBeLessThanOrEqual(1);

    const gridColumns = await page
      .locator(".feature-grid")
      .evaluate(
        (element) =>
          getComputedStyle(element).gridTemplateColumns
            .split(" ")
            .filter(Boolean).length,
      );

    expect(gridColumns).toBe(columns);
  });
}
