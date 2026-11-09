// Add your YouTube channel URL here when you're ready.
const YOUTUBE_URL = "";

const youtubeLink = document.querySelector("#youtubeLink");
if (YOUTUBE_URL.trim()) {
  youtubeLink.href = YOUTUBE_URL;
  youtubeLink.hidden = false;
}

// Main category tabs.
const categoryTabs = [...document.querySelectorAll("[data-category]")];
const categoryPanels = [...document.querySelectorAll(".category-panel")];

function activateCategory(category) {
  categoryTabs.forEach((tab) => {
    const selected = tab.dataset.category === category;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });

  categoryPanels.forEach((panel) => {
    panel.hidden = panel.id !== `panel-${category}`;
  });
}

categoryTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateCategory(tab.dataset.category));

  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

    event.preventDefault();

    let next = index;

    if (event.key === "ArrowRight") next = (index + 1) % categoryTabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + categoryTabs.length) % categoryTabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = categoryTabs.length - 1;

    categoryTabs[next].focus();
    activateCategory(categoryTabs[next].dataset.category);
  });
});

// The Solar System's Barycenter: The Code / Uni Talk tabs.
const projectTabs = [...document.querySelectorAll("[data-project-tab]")];

const projectPanels = {
  code: document.querySelector("#codePanel"),
  talk: document.querySelector("#talkPanel")
};

projectTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedPanel = tab.dataset.projectTab;

    projectTabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-selected", String(selected));
    });

    Object.entries(projectPanels).forEach(([name, panel]) => {
      panel.hidden = name !== selectedPanel;
    });
  });
});

// Copy the displayed Python source.
document.querySelector("#copyCodeButton").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  const source = document.querySelector("#pythonCode").textContent;

  try {
    await navigator.clipboard.writeText(source);
    button.textContent = "Copied!";
  } catch {
    button.textContent = "Select code to copy";
  }

  window.setTimeout(() => {
    button.textContent = "Copy code";
  }, 1800);
});