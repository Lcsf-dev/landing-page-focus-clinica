import { fetchGithubProfile } from "../../js/api/github.js";
import { afterEach, describe, expect, it, vi } from "vitest";

const mockProfile = () => ({
  login: "team-member",
  name: "  Team Member  ",
  html_url: "https://github.com/team-member",
  avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Testes de Integração da API do GitHub", () => {
  it("should fetch and normalize the GitHub profile", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockProfile(),
    });

    const profile = await fetchGithubProfile(mockProfile().login);

    expect(profile).toMatchObject({
      name: "Team Member",
      username: "team-member",
      profileUrl: "https://github.com/team-member",
      avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
    });
  });
});
