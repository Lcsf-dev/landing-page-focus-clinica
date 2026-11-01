// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTeamProfileLoader } from "../../js/team/team-profiles.js";
import { createTeamView } from "../../js/team/team-view.js";

const TEAM_FIXTURE = `
  <div class="team-grid" id="team-list" aria-busy="false">
    <a class="team-member" data-username="first-member" href="https://github.com/first-member">
      <span class="member-avatar"><span class="member-initials" aria-hidden="true">FM</span></span>
      <span><strong class="member-name">First Member</strong></span>
    </a>
    <a class="team-member" data-username="second-member" href="https://github.com/second-member">
      <span class="member-avatar"><span class="member-initials" aria-hidden="true">SM</span></span>
      <span><strong class="member-name">Second Member</strong></span>
    </a>
  </div>
  <div class="api-status" id="team-status" role="status" aria-live="polite" hidden>
    <span id="team-message"></span>
    <button class="button" id="retry-profiles" type="button" hidden disabled>Tentar novamente</button>
  </div>
`;

function githubPayload(username) {
  return {
    login: username,
    name: `Public ${username}`,
    html_url: `https://github.com/${username}`,
    avatar_url: `https://avatars.githubusercontent.com/u/${username}.png`,
  };
}

function jsonResponse(payload) {
  return { ok: true, json: async () => payload };
}

function failureResponse(status = 503) {
  return { ok: false, status };
}

function installFetchMock(responses) {
  const fetchMock = vi.fn(async (url) => {
    const username = decodeURIComponent(String(url).split("/").pop());

    return responses[username];
  });

  vi.stubGlobal("fetch", fetchMock);

  return fetchMock;
}

function getCard(username) {
  return document.querySelector(`[data-username="${username}"]`);
}

function getRequestedUsernames(fetchMock) {
  return fetchMock.mock.calls.map(([url]) =>
    decodeURIComponent(String(url).split("/").pop()),
  );
}

describe("team profiles integration", () => {
  beforeEach(() => {
    document.body.innerHTML = TEAM_FIXTURE;
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("should loads and renders every profile through the real client and view", async () => {
    const fetchMock = installFetchMock({
      "first-member": jsonResponse(githubPayload("first-member")),
      "second-member": jsonResponse(githubPayload("second-member")),
    });
    const view = createTeamView();
    const loadTeamProfiles = createTeamProfileLoader(view);

    await loadTeamProfiles();

    expect(fetchMock).toHaveBeenCalledTimes(2);

    for (const username of ["first-member", "second-member"]) {
      const card = getCard(username);

      expect(card.querySelector(".member-name").textContent).toBe(
        `Public ${username}`,
      );
      expect(card.href).toBe(`https://github.com/${username}`);
      expect(card.querySelector(".member-avatar img").src).toBe(
        `https://avatars.githubusercontent.com/u/${username}.png`,
      );
      expect(card.dataset.loaded).toBe("true");
    }

    expect(view.list.getAttribute("aria-busy")).toBe("false");
    expect(document.querySelector("#team-status").dataset.state).toBe(
      "success",
    );
    expect(document.querySelector("#team-message").textContent).toBe(
      "Perfis atualizados pelo GitHub.",
    );
    expect(view.retryButton.hidden).toBe(true);
  });

  it("should preserve failed cards and retry only the pending profile", async () => {
    const responses = {
      "first-member": jsonResponse(githubPayload("first-member")),
      "second-member": failureResponse(503),
    };
    const fetchMock = installFetchMock(responses);
    const view = createTeamView();
    const loadTeamProfiles = createTeamProfileLoader(view);

    await loadTeamProfiles();

    expect(getCard("first-member").dataset.loaded).toBe("true");
    expect(getCard("second-member").dataset.loaded).toBeUndefined();
    expect(
      getCard("second-member").querySelector(".member-name").textContent,
    ).toBe("Second Member");
    expect(getCard("second-member").href).toBe(
      "https://github.com/second-member",
    );
    expect(document.querySelector("#team-status").dataset.state).toBe("error");
    expect(document.querySelector("#team-message").textContent).toMatch(
      /nomes e links/,
    );
    expect(view.retryButton.hidden).toBe(false);

    responses["second-member"] = jsonResponse(githubPayload("second-member"));
    await loadTeamProfiles();

    const requestedUsernames = getRequestedUsernames(fetchMock);

    expect(
      requestedUsernames.filter((username) => username === "first-member"),
    ).toHaveLength(1);
    expect(
      requestedUsernames.filter((username) => username === "second-member"),
    ).toHaveLength(2);
    expect(getCard("second-member").dataset.loaded).toBe("true");
    expect(document.querySelector("#team-status").dataset.state).toBe(
      "success",
    );
    expect(view.retryButton.hidden).toBe(true);
  });
});
