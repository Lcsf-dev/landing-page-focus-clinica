export function initializeMenu() {
  const button = document.querySelector(".menu-button");
  const navigation = document.querySelector("#navigation");
  const mobileViewport = window.matchMedia("(max-width: 52rem)");
  let isOpen = false;

  function setMenuOpen(shouldOpen) {
    isOpen = shouldOpen && mobileViewport.matches;
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    button.querySelector("use").setAttribute("href", `img/icons.svg#${isOpen ? "close" : "menu"}`);
    navigation.classList.toggle("is-open", isOpen);
    navigation.inert = mobileViewport.matches && !isOpen;
    if (mobileViewport.matches) {
      navigation.setAttribute("aria-hidden", String(!isOpen));
    } else {
      navigation.removeAttribute("aria-hidden");
    }
  }

  button.hidden = false;
  button.addEventListener("click", () => setMenuOpen(!isOpen));
  mobileViewport.addEventListener("change", () => setMenuOpen(false));
  navigation.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || !mobileViewport.matches) return;
    setMenuOpen(false);
    const target = link.hash && document.getElementById(link.hash.slice(1));
    if (target) {
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen) {
      setMenuOpen(false);
      button.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (isOpen && !navigation.contains(event.target) && !button.contains(event.target)) {
      setMenuOpen(false);
    }
  });
  setMenuOpen(false);
}
