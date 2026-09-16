import { getUsers, addTask } from "/js/api.js";
export const initTasks = async () => {
  // Form
  const taskForm = document.getElementById("task-form");
  // Form Input Fields
  // #region
  // -- // User Input
  const usersList = document.getElementById("ul-users-list");
  const userInput = document.getElementById("user-input");
  // userInput.addEventListener("keydown", (e) => {
  //   e.preventDefault();
  // });
  // --- // Title Input
  const titleInput = document.getElementById("title-input");
  // Description Input
  const descriptionInput = document.getElementById("description-input");
  // --- // Status Input
  const STATS = ["pending", "in-progress", "completed"];
  const statusList = document.getElementById("status-list");
  const statusListItems = statusList.querySelectorAll("li a");
  const statusInput = document.getElementById("status-input");
  // statusInput.addEventListener("keydown", (e) => {
  //   e.preventDefault();
  // });
  const statuses = Array.from(statusListItems);

  // -- // Submit Button
  const submitBtn = document.getElementById("submit-task");

  // #endregion
  // Handlers
  // #region
  // -- // Users Dropdown
  const handleAddUsersToListAndSelect = async () => {
    const users = await getUsers();
    users.map((user) => {
      const listItem = document.createElement("li");
      const anchorItem = document.createElement("a");
      const fullName = user["username"] + " " + user["family"];
      anchorItem.innerHTML = fullName;
      anchorItem.classList.add("dropdown-item");
      listItem.append(anchorItem);
      listItem.addEventListener("click", () => {
        userInput.value = fullName;
        userInput.setAttribute("id-value", user["id"]);
      });
      usersList.append(listItem);
    });
  };
  handleAddUsersToListAndSelect();

  // -- // Handles Status Select
  statuses.map((status) => {
    status.addEventListener("click", () => {
      if (STATS.includes(status.innerHTML.toLowerCase()))
        statusInput.value = status.innerHTML;
    });
  });

  // -- // Handles Form Submission (Task-Creation)
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    taskForm.classList.add("was-validated");
    if (!taskForm.checkValidity()) {
      return;
    }

    const taskData = {
      userId: userInput.getAttribute("id-value"),
      status: statusInput.value,
      title: titleInput.value,
      description: descriptionInput.value,
    };

    const res = await addTask(taskData);
    console.log(res);
  });
  // #endregion
};
