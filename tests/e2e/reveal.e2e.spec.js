import { test, expect } from "./fixtures.js";

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("keeps all content visible", async ({ page }) => {
    await page.goto("/");

    const revealElement = page.locator("[data-reveal]").first();

    await expect(revealElement).toBeVisible();
    await expect(revealElement).not.toHaveClass(/reveal-pending/);
  });
});

test("reveals content when it enters the viewport", async ({ page }) => {
  await page.goto("/");

  const revealElement = page.locator("#access [data-reveal]").first();

  await expect(revealElement).toHaveClass(/reveal-pending/);

  await revealElement.scrollIntoViewIfNeeded();

  await expect(revealElement).not.toHaveClass(/reveal-pending/);
});
