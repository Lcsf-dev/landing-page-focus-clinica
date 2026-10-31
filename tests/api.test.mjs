import { test, afterEach, mock } from "node:test";
import assert from "node:assert/strict";
import { fetchGithubProfile } from "../js/api/github.js";
import { normalizeGithubProfile } from "../js/github/github-profile.js";

const sampleProfile = {
  login: "team-member",
  name: "Team Member",
  html_url: "https://github.com/team-member",
  avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
};
afterEach(() => mock.restoreAll());

test("rejects invalid usernames before making a network request", async () => {
  const request = mock.method(globalThis, "fetch");
  for (const username of [
    null,
    undefined,
    {},
    123,
    "",
    "-member",
    "member-",
    "member/name",
    "a".repeat(40),
  ]) {
    await assert.rejects(
      fetchGithubProfile(username),
      /Usuário do GitHub inválido/,
    );
  }
  assert.equal(request.mock.callCount(), 0);
});

test("normalizes case, whitespace and absent optional avatars", () => {
  for (const avatar_url of [undefined, null, ""]) {
    const profile = normalizeGithubProfile(
      {
        ...sampleProfile,
        login: "TEAM-MEMBER",
        name: "  Team Member  ",
        avatar_url,
      },
      "team-member",
    );
    assert.equal(profile.name, "Team Member");
    assert.equal(profile.username, "TEAM-MEMBER");
    assert.equal(profile.avatarUrl, null);
  }
  assert.equal(
    normalizeGithubProfile({ ...sampleProfile, name: "   " }, "team-member")
      .name,
    null,
  );
});

test("rejects incompatible names and optional avatar types", () => {
  for (const name of [undefined, false, 42, [], {}]) {
    assert.throws(
      () => normalizeGithubProfile({ ...sampleProfile, name }, "team-member"),
      /inválida/,
    );
  }
  for (const avatar_url of [false, 0, [], {}]) {
    assert.throws(
      () =>
        normalizeGithubProfile({ ...sampleProfile, avatar_url }, "team-member"),
      /inválido/,
    );
  }
});

test("rejects malformed URLs, credentials, wrong schemes, hosts and profile paths", () => {
  const invalidProfiles = [
    null,
    {},
    "invalid",
    "/team-member",
    "javascript:alert(1)",
    "http://github.com/team-member",
    "https://github.com.evil.invalid/team-member",
    "https://github.com/other-member",
    "https://github.com/team-member/extra",
    "https://user:password@github.com/team-member",
  ];
  for (const html_url of invalidProfiles) {
    assert.throws(
      () =>
        normalizeGithubProfile({ ...sampleProfile, html_url }, "team-member"),
      /inválido/,
    );
  }
  for (const avatar_url of [
    "invalid",
    "http://avatars.githubusercontent.com/u/1",
    "https://user@avatars.githubusercontent.com/u/1",
  ]) {
    assert.throws(
      () =>
        normalizeGithubProfile({ ...sampleProfile, avatar_url }, "team-member"),
      /inválido/,
    );
  }
});

test("propagates invalid JSON and clears the timeout after failure", async () => {
  mock.method(globalThis, "fetch", () =>
    Promise.resolve(new Response("{invalid")),
  );
  const clearTimeoutSpy = mock.method(globalThis, "clearTimeout");
  await assert.rejects(fetchGithubProfile("team-member"), SyntaxError);
  assert.equal(clearTimeoutSpy.mock.callCount(), 1);
});

test("clears the timeout after successful normalization", async () => {
  mock.method(globalThis, "fetch", () =>
    Promise.resolve(Response.json(sampleProfile)),
  );
  const clearTimeoutSpy = mock.method(globalThis, "clearTimeout");
  await fetchGithubProfile("team-member");
  assert.equal(clearTimeoutSpy.mock.callCount(), 1);
});

test("keeps the timeout active while the response body is read", async () => {
  mock.method(globalThis, "fetch", async (_url, { signal }) => ({
    ok: true,
    json: () =>
      new Promise((_resolve, reject) => {
        signal.addEventListener(
          "abort",
          () => reject(new DOMException("Tempo excedido", "AbortError")),
          { once: true },
        );
      }),
  }));
  await assert.rejects(fetchGithubProfile("team-member", { timeoutMs: 10 }), {
    name: "AbortError",
  });
});

test("fetches the public endpoint and normalizes only the fields used by the page", async () => {
  const request = mock.method(globalThis, "fetch", () =>
    Promise.resolve(Response.json(sampleProfile)),
  );
  const profile = await fetchGithubProfile("team-member");
  assert.equal(
    request.mock.calls[0].arguments[0],
    "https://api.github.com/users/team-member",
  );
  assert.equal(profile.name, "Team Member");
  assert.equal(profile.profileUrl, sampleProfile.html_url);
  assert.equal(profile.avatarUrl, sampleProfile.avatar_url);
});

test("preserves the static name and initials when optional profile data is null", async () => {
  mock.method(globalThis, "fetch", () =>
    Promise.resolve(
      Response.json({ ...sampleProfile, name: null, avatar_url: null }),
    ),
  );
  const profile = await fetchGithubProfile("team-member");
  assert.equal(profile.name, null);
  assert.equal(profile.avatarUrl, null);
});

test("rejects missing profiles, rate limits and service failures", async () => {
  for (const status of [404, 403, 429, 500]) {
    mock.method(globalThis, "fetch", () =>
      Promise.resolve(new Response("Falha", { status })),
    );
    await assert.rejects(
      fetchGithubProfile("team-member"),
      new RegExp(`HTTP ${status}`),
    );
    mock.restoreAll();
  }
});

test("rejects empty, incomplete and mismatched profile responses", async () => {
  for (const data of [
    null,
    {},
    [],
    { ...sampleProfile, login: "other-member" },
  ]) {
    mock.method(globalThis, "fetch", () =>
      Promise.resolve(Response.json(data)),
    );
    await assert.rejects(fetchGithubProfile("team-member"), /inválida/);
    mock.restoreAll();
  }
});

test("rejects unexpected external profile and avatar URLs", async () => {
  for (const field of ["html_url", "avatar_url"]) {
    mock.method(globalThis, "fetch", () =>
      Promise.resolve(
        Response.json({
          ...sampleProfile,
          [field]: "https://example.invalid/profile",
        }),
      ),
    );
    await assert.rejects(fetchGithubProfile("team-member"), /inválido/);
    mock.restoreAll();
  }
});

test("propagates network failures to the interface", async () => {
  mock.method(globalThis, "fetch", () =>
    Promise.reject(new TypeError("Conexão indisponível")),
  );
  await assert.rejects(
    fetchGithubProfile("team-member"),
    /Conexão indisponível/,
  );
});

test("aborts requests that exceed the configured timeout", async () => {
  mock.method(
    globalThis,
    "fetch",
    (_url, options) =>
      new Promise((_resolve, reject) => {
        options.signal.addEventListener(
          "abort",
          () => reject(new DOMException("Tempo excedido", "AbortError")),
          { once: true },
        );
      }),
  );
  await assert.rejects(fetchGithubProfile("team-member", { timeoutMs: 10 }), {
    name: "AbortError",
  });
});
