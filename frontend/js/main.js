import { renderFilter } from "./filter.js";
import { initTasks } from "./tasks.js";
import { initUsers } from "./users.js";

window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  if (path == "/" || path == "/index.html") {
    initTasks();
    renderFilter("status-filter");
  }
  if (path == "/users.html") {
    initUsers();
  }
});
