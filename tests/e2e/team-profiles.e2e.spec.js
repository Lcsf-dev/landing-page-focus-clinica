import {
  test,
  expect,
  githubProfile,
  usernameFromRequest,
} from "./fixtures.js";

const USERS = ["Lcsf-dev", "thaamiresffranca", "genzo-dev", "DumbRyder"];

function respondWithProfile(route, username) {
  return route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify(githubProfile(username)),
  });
}

test("updates every profile after scrolling to the footer", async ({
  page,
}) => {
  await page.route("https://api.github.com/users/**", (route) =>
    respondWithProfile(route, usernameFromRequest(route.request())),
  );

  await page.goto("/");
  await page.locator("#team-list").scrollIntoViewIfNeeded();

  await expect(page.locator("#team-status")).toHaveAttribute(
    "data-state",
    "success",
  );
  await expect(page.locator("#team-list")).toHaveAttribute(
    "aria-busy",
    "false",
  );
  await expect(page.locator("#retry-profiles")).toBeHidden();

  for (const username of USERS) {
    const card = page.locator(`[data-username="${username}"]`);

    await expect(card).toHaveAttribute("data-loaded", "true");
    await expect(card.locator(".member-name")).toHaveText(
      `Public ${username}`,
    );
    await expect(card).toHaveAttribute(
      "href",
      `https://github.com/${username}`,
    );
    await expect(card.locator(".member-avatar img")).toHaveCount(1);
  }
});

test("preserves failed cards and retries only pending profiles", async ({
  page,
}) => {
  const failing = new Set(["genzo-dev", "DumbRyder"]);
  const requestedUsernames = [];

  await page.route("https://api.github.com/users/**", (route) => {
    const username = usernameFromRequest(route.request());

    requestedUsernames.push(username);

    if (failing.has(username)) {
      return route.fulfill({ status: 503, body: "Service Unavailable" });
    }

    return respondWithProfile(route, username);
  });

  await page.goto("/");
  await page.locator("#team-list").scrollIntoViewIfNeeded();

  await expect(page.locator("#team-status")).toHaveAttribute(
    "data-state",
    "error",
  );
  await expect(page.locator("#team-message")).toContainText("nomes e links");
  await expect(page.locator("#retry-profiles")).toBeVisible();

  for (const username of ["Lcsf-dev", "thaamiresffranca"]) {
    await expect(
      page.locator(`[data-username="${username}"]`),
    ).toHaveAttribute("data-loaded", "true");
  }

  for (const username of ["genzo-dev", "DumbRyder"]) {
    const card = page.locator(`[data-username="${username}"]`);

    await expect(card).not.toHaveAttribute("data-loaded");
    await expect(card).toHaveAttribute(
      "href",
      `https://github.com/${username}`,
    );
  }

  failing.clear();
  await page.locator("#retry-profiles").click();

  await expect(page.locator("#team-status")).toHaveAttribute(
    "data-state",
    "success",
  );

  for (const username of ["genzo-dev", "DumbRyder"]) {
    await expect(
      page.locator(`[data-username="${username}"]`),
    ).toHaveAttribute("data-loaded", "true");
  }

  expect(
    requestedUsernames.filter((username) => username === "Lcsf-dev"),
  ).toHaveLength(1);
  expect(
    requestedUsernames.filter((username) => username === "genzo-dev"),
  ).toHaveLength(2);
});

test("keeps initials when the avatar fails to load", async ({ page }) => {
  await page.route("https://api.github.com/users/**", (route) =>
    respondWithProfile(route, usernameFromRequest(route.request())),
  );
  await page.route("https://avatars.githubusercontent.com/**", (route) =>
    route.fulfill({ status: 404, body: "" }),
  );

  await page.goto("/");
  await page.locator("#team-list").scrollIntoViewIfNeeded();

  await expect(page.locator("#team-status")).toHaveAttribute(
    "data-state",
    "success",
  );

  const card = page.locator('[data-username="Lcsf-dev"]');

  await expect(card).toHaveAttribute("data-loaded", "true");
  await expect(card.locator(".member-avatar img")).toHaveCount(0);
  await expect(card.locator(".member-initials")).toBeVisible();
});
