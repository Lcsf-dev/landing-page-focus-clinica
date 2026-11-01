import { test as base, expect } from "@playwright/test";

const AVATAR_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>';

export function githubProfile(username) {
  return {
    login: username,
    name: `Public ${username}`,
    html_url: `https://github.com/${username}`,
    avatar_url: `https://avatars.githubusercontent.com/${username}.png`,
  };
}

export function usernameFromRequest(request) {
  return decodeURIComponent(new URL(request.url()).pathname.split("/").pop());
}

export const test = base.extend({});

test.beforeEach(async ({ page }) => {
  await page.route("https://api.github.com/**", (route) =>
    route.fulfill({
      status: 503,
      contentType: "text/plain",
      body: "Service Unavailable",
    }),
  );

  await page.route("https://avatars.githubusercontent.com/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "image/svg+xml",
      body: AVATAR_SVG,
    }),
  );
});

export { expect };
