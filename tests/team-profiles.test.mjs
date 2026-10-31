import { test, mock } from "node:test";
import assert from "node:assert/strict";
import { createTeamProfileLoader } from "../js/team/team-profiles.js";
import { createTeamView, renderTeamProfile } from "../js/team/team-view.js";

function createView() {
  const cards = ["first-member", "second-member"].map((username) => ({
    dataset: { username }, name: "Nome estático", href: `https://github.com/${username}`
  }));
  return {
    cards,
    getPendingCards: () => cards.filter((card) => !card.dataset.loaded),
    renderProfile: mock.fn((card, profile) => { card.profile = profile; card.dataset.loaded = "true"; }),
    showLoading: mock.fn(), showError: mock.fn(), showSuccess: mock.fn(), finishLoading: mock.fn()
  };
}

test("retries only pending profiles and preserves successful cards", async () => {
  const view = createView();
  let shouldFail = true;
  const fetchProfile = mock.fn(async (username) => {
    if (shouldFail && username === "second-member") throw new Error("Falha HTTP 503");
    return { username };
  });
  const loadTeamProfiles = createTeamProfileLoader(view, fetchProfile);
  await loadTeamProfiles();
  assert.equal(view.showError.mock.callCount(), 1);
  assert.equal(view.cards[0].dataset.loaded, "true");
  assert.equal(view.cards[1].dataset.loaded, undefined);
  assert.equal(view.cards[1].name, "Nome estático");
  assert.equal(view.cards[1].href, "https://github.com/second-member");

  shouldFail = false;
  await loadTeamProfiles();
  assert.deepEqual(fetchProfile.mock.calls.map((call) => call.arguments[0]), ["first-member", "second-member", "second-member"]);
  assert.equal(view.showSuccess.mock.callCount(), 1);
  assert.equal(view.finishLoading.mock.callCount(), 2);
});

test("blocks overlapping loads and releases the lock after failure", async () => {
  const view = createView();
  let rejectRequest;
  const pendingRequest = new Promise((_resolve, reject) => { rejectRequest = reject; });
  const fetchProfile = mock.fn(() => pendingRequest);
  const loadTeamProfiles = createTeamProfileLoader(view, fetchProfile);
  const firstLoad = loadTeamProfiles();
  await loadTeamProfiles();
  assert.equal(fetchProfile.mock.callCount(), 2);
  assert.equal(view.showLoading.mock.callCount(), 1);
  rejectRequest(new Error("Rede indisponível"));
  await firstLoad;
  await loadTeamProfiles();
  assert.equal(fetchProfile.mock.callCount(), 4);
  assert.equal(view.finishLoading.mock.callCount(), 2);
});

test("finishes loading and allows retry after an unexpected presentation failure", async () => {
  for (const method of ["getPendingCards", "showLoading"]) {
    const view = createView();
    view[method] = () => { throw new Error("Falha de apresentação"); };
    const loadTeamProfiles = createTeamProfileLoader(view);
    await loadTeamProfiles();
    await loadTeamProfiles();
    assert.equal(view.showError.mock.callCount(), 2);
    assert.equal(view.finishLoading.mock.callCount(), 2);
  }
});

test("keeps static names and initials when optional profile fields are absent", () => {
  const name = { textContent: "Nome estático" };
  const card = { dataset: {}, href: "https://github.com/member", querySelector: () => name };
  renderTeamProfile(card, { name: null, avatarUrl: null, profileUrl: card.href });
  assert.equal(name.textContent, "Nome estático");
  assert.equal(card.href, "https://github.com/member");
  assert.equal(card.dataset.loaded, "true");
});

test("updates busy, retry and status controls through failure and recovery", () => {
  const elements = {
    "#team-list": { setAttribute: mock.fn() }, "#team-status": { dataset: {} },
    "#team-message": {}, "#retry-profiles": {}
  };
  const view = createTeamView({ querySelector: (selector) => elements[selector] });
  view.showLoading();
  assert.equal(elements["#team-status"].dataset.state, "loading");
  assert.equal(elements["#team-status"].hidden, false);
  assert.equal(view.retryButton.hidden, true);
  assert.equal(view.retryButton.disabled, true);
  view.showError(true);
  view.finishLoading();
  assert.equal(elements["#team-status"].dataset.state, "error");
  assert.equal(view.retryButton.hidden, false);
  assert.equal(view.retryButton.disabled, false);
  assert.match(elements["#team-message"].textContent, /nomes e links/);
  view.showLoading();
  view.showSuccess();
  view.finishLoading();
  assert.equal(elements["#team-status"].dataset.state, "success");
  assert.equal(elements["#team-message"].textContent, "Perfis da equipe atualizados.");
  assert.equal(elements["#team-status"].hidden, false);
  assert.equal(view.retryButton.hidden, true);
  assert.deepEqual(view.list.setAttribute.mock.calls.at(-1).arguments, ["aria-busy", "false"]);
});
