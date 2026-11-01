import { afterEach, describe, expect, it, vi } from "vitest";
import { normalizeGithubProfile } from "../../utils/normalizeGithubProfile";
import { fetchGithubProfile } from "../../js/api/github";

const mockProfile = () => ({
  login: "team-member",
  name: "  Team Member  ",
  html_url: "https://github.com/team-member",
  avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Verifica se os dados retornados do Github estão normalizados", () => {
  it("should normalize profile github date", () => {
    const profile = normalizeGithubProfile(mockProfile());

    expect(profile).toEqual({
      username: "team-member",
      name: "Team Member",
      profileUrl: "https://github.com/team-member",
      avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
    });
  });

  it("should handles missing optional profile data", () => {
    const profile = normalizeGithubProfile({
      ...mockProfile(),
      name: "   ",
      avatar_url: null,
    });

    expect(profile.name).toBeNull();
    expect(profile.avatarUrl).toBeNull();
  });
});

describe("Verifica se o fetch do Github está funcionando corretamente", () => {
  it("should fetches the Github profile from the correct endpoint", async () => {
    const profileUsername = mockProfile().login;
    const expectedUrl = `https://api.github.com/users/${profileUsername}`;

    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockProfile(),
    });

    await fetchGithubProfile(profileUsername);

    expect(fetchSpy).toHaveBeenCalledWith(expectedUrl, {
      signal: expect.any(AbortSignal),
      headers: { Accept: "application/vnd.github+json" },
    });
  });

  it("should reject when Github returns an unsuccessful HTTP response", async () => {
    const profileUsername = "vai-falhar";

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
    });

    const result = fetchGithubProfile(profileUsername);

    await expect(result).rejects.toThrow("Falha HTTP 404");
  });

  it("should clears the timeout after completing the request", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockProfile(),
    });

    const clearTimeoutSpy = vi.spyOn(globalThis, "clearTimeout");

    await fetchGithubProfile(mockProfile().login);

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it("should clears the timeout after completing the request", async () => {
    vi.spyOn(globalThis, "fetch", async (_url, { signal }) => {
      return new Promise((_resolve, reject) => {
        signal.addEventListener(
          "abort",
          () => reject(new DOMException("Tempo excedido", "AbortError")),
          { once: true },
        );
      });
    });

    const result = fetchGithubProfile(mockProfile().login, { timeoutMs: 10 });

    await expect(result).rejects.toThrow("This operation was aborted");
  });
});
