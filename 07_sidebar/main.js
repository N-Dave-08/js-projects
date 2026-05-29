const sidebarItems = document.querySelectorAll("[data-sidebar-item-id]");
const sidebarContents = document.querySelectorAll("[data-sidebar-content]");

sidebarItems.forEach((item) => {
  item.addEventListener("click", () => {
    const sidebarItemId = document.querySelector(item.dataset.sidebarItemId);

    sidebarContents.forEach((content) => content.classList.remove("active"));
    sidebarItems.forEach((item) => item.classList.remove("active"));

    item.classList.add("active");
    sidebarItemId.classList.add("active");
  });
});
