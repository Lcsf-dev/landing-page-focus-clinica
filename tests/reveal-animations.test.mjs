import { test, afterEach, mock } from "node:test";
import assert from "node:assert/strict";
import { initializeRevealAnimations } from "../js/reveal-animations.js";

const originalGlobals = new Map(["window", "document", "IntersectionObserver"].map((name) => [name, Object.getOwnPropertyDescriptor(globalThis, name)]));
afterEach(() => {
  for (const [name, descriptor] of originalGlobals) {
    if (descriptor) Object.defineProperty(globalThis, name, descriptor);
    else delete globalThis[name];
  }
});

test("keeps content visible for reduced motion and unsupported observers", () => {
  const querySelectorAll = mock.fn();
  globalThis.document = { querySelectorAll };
  for (const hasObserver of [false, true]) {
    globalThis.window = { matchMedia: () => ({ matches: true }) };
    if (hasObserver) globalThis.window.IntersectionObserver = class {};
    initializeRevealAnimations();
  }
  assert.equal(querySelectorAll.mock.callCount(), 0);
});

test("reveals intersecting content once and stops observing it", () => {
  let notify;
  const element = { classList: { add: mock.fn(), remove: mock.fn() } };
  const observe = mock.fn();
  const unobserve = mock.fn();
  globalThis.IntersectionObserver = class {
    constructor(callback) { notify = callback; }
    observe = observe;
    unobserve = unobserve;
  };
  globalThis.window = { IntersectionObserver, matchMedia: () => ({ matches: false }) };
  globalThis.document = { querySelectorAll: () => [element] };
  initializeRevealAnimations();
  assert.equal(observe.mock.callCount(), 1);
  notify([{ target: element, isIntersecting: false }]);
  assert.equal(element.classList.remove.mock.callCount(), 0);
  notify([{ target: element, isIntersecting: true }]);
  assert.equal(element.classList.remove.mock.callCount(), 1);
  assert.deepEqual(unobserve.mock.calls[0].arguments, [element]);
});
