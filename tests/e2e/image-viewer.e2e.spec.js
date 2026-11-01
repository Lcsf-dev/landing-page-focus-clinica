import { test, expect } from "./fixtures.js";

const presentationZoom = (page) =>
  page.locator('[data-zoom][href*="presentation-focus-clinica"]');

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("opens the dialog with the selected screenshot", async ({ page }) => {
  await presentationZoom(page).click();

  await expect(page.locator("#image-dialog")).toBeVisible();
  await expect(page.locator("#expanded-image")).toHaveAttribute(
    "src",
    /presentation-focus-clinica\.jpg$/,
  );
  await expect(page.locator("#expanded-image")).toHaveAttribute(
    "alt",
    /Apresentação pública/,
  );
});

test("closes with the close button", async ({ page }) => {
  await presentationZoom(page).click();
  await page.locator("#close-image").click();

  await expect(page.locator("#image-dialog")).toBeHidden();
});

test("closes with Escape", async ({ page }) => {
  await presentationZoom(page).click();
  await page.keyboard.press("Escape");

  await expect(page.locator("#image-dialog")).toBeHidden();
});

test("closes when clicking the backdrop", async ({ page }) => {
  await presentationZoom(page).click();
  await page.mouse.click(5, 5);

  await expect(page.locator("#image-dialog")).toBeHidden();
});

test("returns focus to the link after closing", async ({ page }) => {
  const link = presentationZoom(page);

  await link.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#image-dialog")).toBeVisible();

  await page.locator("#close-image").click();

  await expect(page.locator("#image-dialog")).toBeHidden();
  await expect(link).toBeFocused();
});

test("keeps native navigation for modified clicks", async ({ page }) => {
  const prevented = await presentationZoom(page).evaluate((element) => {
    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      ctrlKey: true,
    });

    return !element.dispatchEvent(event);
  });

  expect(prevented).toBe(false);
  await expect(page.locator("#image-dialog")).toBeHidden();
});
