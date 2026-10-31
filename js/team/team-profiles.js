import { fetchGithubProfile } from "../api/github.js";
import { createTeamView } from "./team-view.js";

/**
 * Serialize load attempts and retry only cards that have not been updated.
 * @param {ReturnType<typeof createTeamView>} view
 * @param {typeof fetchGithubProfile} [fetchProfile]
 * @returns {() => Promise<void>}
 */
export function createTeamProfileLoader(
  view,
  fetchProfile = fetchGithubProfile,
) {
  let isLoading = false;

  return async function loadTeamProfiles() {
    if (isLoading) return;
    isLoading = true;
    try {
      view.showLoading();
      const pendingCards = view.getPendingCards();
      const results = await Promise.allSettled(
        pendingCards.map(async (card) => {
          const profile = await fetchProfile(card.dataset.username);
          view.renderProfile(card, profile);
        }),
      );
      const hasErrors = results.some((result) => result.status === "rejected");
      if (hasErrors) {
        view.showError(true);
      } else {
        view.showSuccess();
      }
    } catch {
      view.showError();
    } finally {
      isLoading = false;
      view.finishLoading();
    }
  };
}

export function initializeTeamProfiles() {
  const view = createTeamView();
  const loadTeamProfiles = createTeamProfileLoader(view);
  view.retryButton.addEventListener("click", loadTeamProfiles);

  // Defer the four public requests until the footer approaches the viewport.
  if (!("IntersectionObserver" in window)) {
    void loadTeamProfiles();
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      void loadTeamProfiles();
    },
    { rootMargin: "200px" },
  );
  observer.observe(view.list);
}
