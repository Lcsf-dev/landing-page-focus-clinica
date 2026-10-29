export function initializeImageViewer() {
  const dialog = document.querySelector("#image-dialog");
  if (typeof dialog.showModal !== "function") return;

  const expandedImage = document.querySelector("#expanded-image");
  document.querySelectorAll("[data-zoom]").forEach((link) => {
    link.addEventListener("click", (event) => {
      // Preserve native navigation when a modifier key is pressed.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const image = link.querySelector("img");
      expandedImage.src = link.href;
      expandedImage.alt = image.alt;
      dialog.showModal();
    });
  });
  document.querySelector("#close-image").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}
