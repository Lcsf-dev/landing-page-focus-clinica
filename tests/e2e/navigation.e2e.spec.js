import { test, expect } from "./fixtures.js";

test("moves focus to the main content through the skip link", async ({
  page,
}) => {
  await page.goto("/");

  await page.locator(".skip-link").focus();
  await page.keyboard.press("Enter");

  await expect(page.locator("#content")).toBeFocused();
});

test("keeps the menu hidden on desktop", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".menu-button")).toBeHidden();
  await expect(page.locator("#navigation")).toBeVisible();
  await expect(page.locator("#navigation")).not.toHaveAttribute("aria-hidden");
});

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("opens and closes with accessible state", async ({ page }) => {
    await page.goto("/");

    const button = page.locator(".menu-button");
    const navigation = page.locator("#navigation");

    await expect(button).toBeVisible();
    await expect(navigation).toHaveAttribute("aria-hidden", "true");
    await expect(navigation).toHaveJSProperty("inert", true);

    await button.click();

    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(button).toHaveAttribute("aria-label", "Fechar menu");
    await expect(navigation).toHaveClass(/is-open/);
    await expect(navigation).toHaveAttribute("aria-hidden", "false");
    await expect(navigation).toHaveJSProperty("inert", false);

    await button.click();

    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(navigation).not.toHaveClass(/is-open/);
  });

  test("closes on Escape and returns focus to the button", async ({ page }) => {
    await page.goto("/");

    const button = page.locator(".menu-button");
    await button.click();
    await page.keyboard.press("Escape");

    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(button).toBeFocused();
  });

  test("closes when clicking outside the menu", async ({ page }) => {
    await page.goto("/");

    const button = page.locator(".menu-button");
    await button.click();
    await page.mouse.click(5, 700);

    await expect(button).toHaveAttribute("aria-expanded", "false");
  });

  test("closes on navigation and focuses the target section", async ({
    page,
  }) => {
    await page.goto("/");

    const button = page.locator(".menu-button");
    await button.click();
    await page.locator('#navigation a[href="#features"]').click();

    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#features")).toBeFocused();
  });

  test("resets when the viewport becomes desktop", async ({ page }) => {
    await page.goto("/");

    const button = page.locator(".menu-button");
    const navigation = page.locator("#navigation");

    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");

    await page.setViewportSize({ width: 1280, height: 800 });

    await expect(button).toBeHidden();
    await expect(navigation).not.toHaveAttribute("aria-hidden");
    await expect(navigation).toHaveJSProperty("inert", false);
  });
});
