import { initTasks } from "./tasks.js";
import { initUsers } from "./users.js";

window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  if (path == "/" || path == "/index.html") {
    initTasks();
  }
  if (path == "/users.html") {
    initUsers();
  }
});
