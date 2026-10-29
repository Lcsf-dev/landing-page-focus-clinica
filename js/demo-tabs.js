export function initializeDemoTabs() {
  const tabList = document.querySelector(".tabs");
  const tabs = [...tabList.querySelectorAll('[role="tab"]')];

  function selectTab(index, shouldFocus = false) {
    tabs.forEach((tab, position) => {
      const isSelected = position === index;
      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
      document.getElementById(tab.getAttribute("aria-controls")).hidden = !isSelected;
    });
    if (shouldFocus) tabs[index].focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(index));
    tab.addEventListener("keydown", (event) => {
      let nextIndex;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      if (nextIndex === undefined) return;
      event.preventDefault();
      selectTab(nextIndex, true);
    });
  });
  selectTab(0);
  tabList.hidden = false;
}
