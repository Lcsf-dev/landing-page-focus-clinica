// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTeamProfileLoader } from "../../js/team/team-profiles.js";
import { createTeamView, renderTeamProfile } from "../../js/team/team-view.js";

const TEAM_FIXTURE = `
  <div class="team-grid" id="team-list" aria-busy="false">
    <a class="team-member" data-username="team-member" href="https://github.com/team-member">
      <span class="member-avatar"><span class="member-initials" aria-hidden="true">TM</span></span>
      <span><strong class="member-name">Nome estático</strong></span>
    </a>
  </div>
  <div class="api-status" id="team-status" role="status" aria-live="polite" hidden>
    <span id="team-message"></span>
    <button class="button" id="retry-profiles" type="button" hidden disabled>Tentar novamente</button>
  </div>
`;

const profile = {
  username: "team-member",
  name: "Nome público",
  profileUrl: "https://github.com/team-member",
  avatarUrl: "https://avatars.githubusercontent.com/u/1",
};

function createFakeView() {
  const cards = ["first-member", "second-member"].map((username) => ({
    dataset: { username },
    name: "Nome estático",
    href: `https://github.com/${username}`,
  }));

  return {
    cards,
    getPendingCards: () => cards.filter((card) => !card.dataset.loaded),
    renderProfile: vi.fn((card, loadedProfile) => {
      card.profile = loadedProfile;
      card.dataset.loaded = "true";
    }),
    showLoading: vi.fn(),
    showError: vi.fn(),
    showSuccess: vi.fn(),
    finishLoading: vi.fn(),
  };
}

function getCard() {
  return document.querySelector(".team-member");
}

describe("createTeamProfileLoader (without DOM)", () => {
  it("marks every card as loaded and reports success when all profiles resolve", async () => {
    const view = createFakeView();
    const fetchProfile = vi.fn(async (username) => ({ username }));
    const loadTeamProfiles = createTeamProfileLoader(view, fetchProfile);

    await loadTeamProfiles();

    expect(fetchProfile).toHaveBeenCalledTimes(2);
    expect(view.renderProfile).toHaveBeenCalledTimes(2);
    expect(view.cards.every((card) => card.dataset.loaded === "true")).toBe(
      true,
    );
    expect(view.showLoading).toHaveBeenCalledTimes(1);
    expect(view.showError).not.toHaveBeenCalled();
    expect(view.showSuccess).toHaveBeenCalledTimes(1);
    expect(view.finishLoading).toHaveBeenCalledTimes(1);
  });

  it("keeps successful cards and reports partial failure", async () => {
    const view = createFakeView();
    const fetchProfile = vi.fn(async (username) => {
      if (username === "second-member") throw new Error("Falha HTTP 503");
      return { username };
    });
    const loadTeamProfiles = createTeamProfileLoader(view, fetchProfile);

    await loadTeamProfiles();

    expect(view.showError).toHaveBeenCalledWith(true);
    expect(view.showSuccess).not.toHaveBeenCalled();
    expect(view.cards[0].dataset.loaded).toBe("true");
    expect(view.cards[1].dataset.loaded).toBeUndefined();
    expect(view.cards[1].name).toBe("Nome estático");
    expect(view.cards[1].href).toBe("https://github.com/second-member");
  });

  it("retries only pending cards after a partial failure", async () => {
    const view = createFakeView();
    let shouldFail = true;
    const fetchProfile = vi.fn(async (username) => {
      if (shouldFail && username === "second-member") {
        throw new Error("Falha HTTP 503");
      }
      return { username };
    });
    const loadTeamProfiles = createTeamProfileLoader(view, fetchProfile);

    await loadTeamProfiles();
    shouldFail = false;
    await loadTeamProfiles();

    expect(fetchProfile.mock.calls.map(([username]) => username)).toEqual([
      "first-member",
      "second-member",
      "second-member",
    ]);
    expect(view.showSuccess).toHaveBeenCalledTimes(1);
    expect(view.finishLoading).toHaveBeenCalledTimes(2);
  });

  it("blocks overlapping loads and releases the lock after a failure", async () => {
    const view = createFakeView();
    let rejectRequest;
    const pendingRequest = new Promise((_resolve, reject) => {
      rejectRequest = reject;
    });
    const fetchProfile = vi.fn(() => pendingRequest);
    const loadTeamProfiles = createTeamProfileLoader(view, fetchProfile);

    const firstLoad = loadTeamProfiles();
    await loadTeamProfiles();
    const callsWhileLoading = fetchProfile.mock.calls.length;
    const showLoadingWhileLoading = view.showLoading.mock.calls.length;

    rejectRequest(new Error("Rede indisponível"));
    await firstLoad;
    await loadTeamProfiles();

    expect(callsWhileLoading).toBe(2);
    expect(showLoadingWhileLoading).toBe(1);
    expect(fetchProfile).toHaveBeenCalledTimes(4);
    expect(view.finishLoading).toHaveBeenCalledTimes(2);
  });

  it("finishes loading and allows retry after an unexpected presentation failure", async () => {
    for (const method of ["getPendingCards", "showLoading"]) {
      const view = createFakeView();
      view[method] = () => {
        throw new Error("Falha de apresentação");
      };
      const loadTeamProfiles = createTeamProfileLoader(view);

      await loadTeamProfiles();
      await loadTeamProfiles();

      expect(view.showError).toHaveBeenCalledTimes(2);
      expect(view.finishLoading).toHaveBeenCalledTimes(2);
    }
  });
});

describe("team view (DOM)", () => {
  beforeEach(() => {
    document.body.innerHTML = TEAM_FIXTURE;
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("inserts the public name as text instead of HTML", () => {
    const card = getCard();
    const publicName = '<img src="invalid" onerror="alert(1)">';

    renderTeamProfile(card, { ...profile, name: publicName });

    const name = card.querySelector(".member-name");
    expect(name.textContent).toBe(publicName);
    expect(name.children).toHaveLength(0);
    expect(name.querySelector("img")).toBeNull();
  });

  it("hides the initials only after the avatar loads", () => {
    const card = getCard();

    renderTeamProfile(card, profile);

    const image = card.querySelector(".member-avatar img");
    const initials = card.querySelector(".member-initials");
    expect(image).not.toBeNull();
    expect(image.width).toBe(44);
    expect(image.height).toBe(44);
    expect(image.alt).toBe("");
    expect(initials.hidden).toBe(false);

    image.dispatchEvent(new Event("load"));

    expect(initials.hidden).toBe(true);
  });

  it("removes the avatar and keeps the initials when it fails to load", () => {
    const card = getCard();
    renderTeamProfile(card, profile);
    const image = card.querySelector(".member-avatar img");

    image.dispatchEvent(new Event("error"));

    expect(card.querySelector(".member-avatar img")).toBeNull();
    expect(card.querySelector(".member-initials").hidden).toBe(false);
    expect(card.href).toBe(profile.profileUrl);
    expect(card.dataset.loaded).toBe("true");
  });

  it("preserves static names and initials when optional fields are absent", () => {
    const card = getCard();

    renderTeamProfile(card, {
      name: null,
      avatarUrl: null,
      profileUrl: card.href,
    });

    expect(card.querySelector(".member-name").textContent).toBe(
      "Nome estático",
    );
    expect(card.querySelector(".member-avatar img")).toBeNull();
    expect(card.querySelector(".member-initials").hidden).toBe(false);
    expect(card.dataset.loaded).toBe("true");
  });

  it("marks the list busy and disables retry while loading", () => {
    const view = createTeamView();

    view.showLoading();

    const status = document.querySelector("#team-status");
    expect(view.list.getAttribute("aria-busy")).toBe("true");
    expect(status.hidden).toBe(false);
    expect(status.dataset.state).toBe("loading");
    expect(document.querySelector("#team-message").textContent).toBe(
      "Carregando perfis da equipe…",
    );
    expect(view.retryButton.hidden).toBe(true);
    expect(view.retryButton.disabled).toBe(true);
  });

  it("shows the partial-failure message and reveals retry", () => {
    const view = createTeamView();

    view.showError(true);

    const status = document.querySelector("#team-status");
    expect(status.dataset.state).toBe("error");
    expect(document.querySelector("#team-message").textContent).toMatch(
      /nomes e links/,
    );
    expect(view.retryButton.hidden).toBe(false);
  });

  it("shows the generic failure message when no profile loaded", () => {
    const view = createTeamView();

    view.showError();

    expect(document.querySelector("#team-message").textContent).toBe(
      "Não foi possível atualizar os perfis. Os links da equipe continuam disponíveis.",
    );
    expect(view.retryButton.hidden).toBe(false);
  });

  it("reports success and finishes loading", () => {
    const view = createTeamView();
    view.showLoading();

    view.showSuccess();
    view.finishLoading();

    const status = document.querySelector("#team-status");
    expect(status.dataset.state).toBe("success");
    expect(document.querySelector("#team-message").textContent).toBe(
      "Perfis atualizados pelo GitHub.",
    );
    expect(view.list.getAttribute("aria-busy")).toBe("false");
    expect(view.retryButton.disabled).toBe(false);
  });

  it("returns only cards that were not loaded yet", () => {
    const view = createTeamView();
    const card = getCard();

    const pendingBeforeLoad = view.getPendingCards();
    card.dataset.loaded = "true";
    const pendingAfterLoad = view.getPendingCards();

    expect(pendingBeforeLoad).toEqual([card]);
    expect(pendingAfterLoad).toEqual([]);
  });
});
