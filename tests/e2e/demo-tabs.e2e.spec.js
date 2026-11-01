import { test, expect } from "./fixtures.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("selects the first tab by default", async ({ page }) => {
  await expect(page.locator(".tabs")).toBeVisible();
  await expect(page.locator("#presentation-tab")).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.locator("#login-tab")).toHaveAttribute(
    "aria-selected",
    "false",
  );
  await expect(page.locator("#presentation-panel")).toBeVisible();
  await expect(page.locator("#login-panel")).toBeHidden();
});

test("switches panels on click", async ({ page }) => {
  await page.locator("#login-tab").click();

  await expect(page.locator("#login-tab")).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.locator("#presentation-tab")).toHaveAttribute(
    "aria-selected",
    "false",
  );
  await expect(page.locator("#login-panel")).toBeVisible();
  await expect(page.locator("#presentation-panel")).toBeHidden();
});

test("supports keyboard navigation", async ({ page }) => {
  const presentation = page.locator("#presentation-tab");
  const login = page.locator("#login-tab");

  await presentation.focus();

  await page.keyboard.press("ArrowRight");
  await expect(login).toHaveAttribute("aria-selected", "true");
  await expect(login).toBeFocused();

  await page.keyboard.press("ArrowRight");
  await expect(presentation).toHaveAttribute("aria-selected", "true");
  await expect(presentation).toBeFocused();

  await page.keyboard.press("ArrowLeft");
  await expect(login).toHaveAttribute("aria-selected", "true");
  await expect(login).toBeFocused();

  await page.keyboard.press("Home");
  await expect(presentation).toHaveAttribute("aria-selected", "true");
  await expect(presentation).toBeFocused();

  await page.keyboard.press("End");
  await expect(login).toHaveAttribute("aria-selected", "true");
  await expect(login).toBeFocused();
});
