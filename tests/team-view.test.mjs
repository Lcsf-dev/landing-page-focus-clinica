import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { renderTeamProfile } from "../js/team/team-view.js";

const originalDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
afterEach(() => {
  if (originalDocument) Object.defineProperty(globalThis, "document", originalDocument);
  else delete globalThis.document;
});

function createCard() {
  const listeners = new Map();
  const image = {
    addEventListener: (event, listener) => listeners.set(event, listener),
    remove() { this.isRemoved = true; }
  };
  const name = { textContent: "Nome estático" };
  const initials = { hidden: false };
  const avatar = { append: (element) => { avatar.image = element; } };
  const elements = { ".member-name": name, ".member-initials": initials, ".member-avatar": avatar };
  globalThis.document = { createElement: () => image };
  return { dataset: {}, querySelector: (selector) => elements[selector], name, initials, avatar, image, listeners };
}

const profile = {
  username: "team-member", name: "Nome público",
  profileUrl: "https://github.com/team-member",
  avatarUrl: "https://avatars.githubusercontent.com/u/1"
};

test("preserves static initials when the avatar fails to load", () => {
  const card = createCard();
  renderTeamProfile(card, profile);
  card.listeners.get("error")();
  assert.equal(card.initials.hidden, false);
  assert.equal(card.image.isRemoved, true);
  assert.equal(card.href, profile.profileUrl);
  assert.equal(card.dataset.loaded, "true");
});

test("renders public names as text and hides initials only after the avatar loads", () => {
  const card = createCard();
  const publicName = '<img src="invalid" onerror="alert(1)">';
  renderTeamProfile(card, { ...profile, name: publicName });
  assert.equal(card.name.textContent, publicName);
  assert.equal(card.name.innerHTML, undefined);
  assert.equal(card.initials.hidden, false);
  assert.equal(card.image.alt, "");
  assert.equal(card.image.width, 44);
  assert.equal(card.image.height, 44);
  card.listeners.get("load")();
  assert.equal(card.initials.hidden, true);
});
