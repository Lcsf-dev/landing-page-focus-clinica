import { test, expect } from "./fixtures.js";

test("renders the landing page without console errors", async ({ page }) => {
  const errors = [];

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/");

  await expect(page).toHaveTitle(/Focus Clínica/);
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("main#content")).toBeVisible();
  expect(errors).toEqual([]);
});
