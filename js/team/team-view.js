/**
 * @param {HTMLAnchorElement} card
 * @param {{ username: string, name: string|null, profileUrl: string, avatarUrl: string|null }} profile
 */
export function renderTeamProfile(card, profile) {
  if (profile.name) card.querySelector(".member-name").textContent = profile.name;
  card.href = profile.profileUrl;
  if (profile.avatarUrl) {
    const image = document.createElement("img");
    image.width = 44;
    image.height = 44;
    image.alt = "";
    image.addEventListener("load", () => {
      card.querySelector(".member-initials").hidden = true;
    }, { once: true });
    image.addEventListener("error", () => image.remove(), { once: true });
    image.src = profile.avatarUrl;
    card.querySelector(".member-avatar").append(image);
  }
  card.dataset.loaded = "true";
}

/**
 * Bind team presentation to its existing static HTML.
 * @param {Document} [root]
 */
export function createTeamView(root = document) {
  const list = root.querySelector("#team-list");
  const status = root.querySelector("#team-status");
  const message = root.querySelector("#team-message");
  const retryButton = root.querySelector("#retry-profiles");

  return {
    list,
    retryButton,
    getPendingCards: () => [...list.querySelectorAll("[data-username]:not([data-loaded])")],
    renderProfile: renderTeamProfile,
    showLoading() {
      list.setAttribute("aria-busy", "true");
      status.hidden = false;
      status.dataset.state = "loading";
      message.textContent = "Carregando perfis da equipe…";
      retryButton.hidden = true;
      retryButton.disabled = true;
    },
    showError(hasPartialResults = false) {
      status.dataset.state = "error";
      message.textContent = hasPartialResults
        ? "Alguns perfis não puderam ser atualizados. Os nomes e links da equipe continuam disponíveis. Tente novamente mais tarde."
        : "Não foi possível atualizar os perfis. Os links da equipe continuam disponíveis.";
      retryButton.hidden = false;
    },
    showSuccess() {
      status.dataset.state = "success";
      message.textContent = "Perfis atualizados pelo GitHub.";
    },
    finishLoading() {
      list.setAttribute("aria-busy", "false");
      retryButton.disabled = false;
    }
  };
}
