import { getUsers, getUser, addTask, getAllTasks } from "/js/api.js";
import { renderTable } from "./tableBuilder.js";
import { CustomBtn } from "./utils.js";

const actions = (idx) => {
  return {
    update: CustomBtn("Update", `${idx}`, "btn-success", "UPDATE"), // Only Updates Status (Linearly Each Step At Time Compolsary)
    delete: CustomBtn("Delete", `${idx}`, "btn-danger", "DELETE"), // Deletes a Task
    view: CustomBtn("View", `${idx}`, "btn-primary", "VIEW"), // View Details (Like Description, Full List of Assigned Users)
  };
};

const modifyTasks = async () => {
  const tasks = await getAllTasks();
  // Note: we used Promise.all() because map returns an array of Promises, and one of the ways to resolve this issue was to rap the array of promises in Promise.all
  // Promise.all()  returns an array of the fulfillment values
  // try to unwrap it and see what the console.log(modifiedTasks) will be [promise <fulfill>]
  const modifiedTasks = await Promise.all(
    tasks.map(async (task, idx) => {
      const user = await getUser(task["userId"]);
      const userName = user["firstName"] + " " + user["lastName"];
      // console.log(userName); // if the keys don't exist the output will be "NaN"
      return {
        username: userName,
        title: task["title"],
        status: task["status"],
        actions: actions(idx),
      };
    }),
  );
  return modifiedTasks;
};

const renderTasksTable = async () => {
  const tasks = await modifyTasks();
  renderTable("table", tasks);
};

export const initTasks = async () => {
  await renderTasksTable();
  // Form

  const taskForm = document.getElementById("task-form");
  // Form Input Fields
  // #region
  // -- // User Input
  const usersList = document.getElementById("ul-users-list");
  const userInput = document.getElementById("user-input");

  // --- // Title Input
  const titleInput = document.getElementById("title-input");
  // Description Input
  const descriptionInput = document.getElementById("description-input");
  // --- // Status
  const STATS = ["pending", "in-progress", "completed"];

  // -- // Submit Button, submit event is better performed on form not the submit button itself
  // const submitBtn = document.getElementById("submit-task");

  // #endregion

  // Handlers
  // #region
  // -- // Users Dropdown
  const handleAddUsersToListAndSelect = async () => {
    const users = await getUsers();
    users.map((user) => {
      const listItem = document.createElement("li");
      const anchorItem = document.createElement("a");
      const fullName = user["firstName"] + " " + user["lastName"];
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

  // -- // Handles Form Submission (Task-Creation)
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    taskForm.classList.add("was-validated");
    if (!taskForm.checkValidity()) {
      return;
    }

    const taskData = {
      userId: userInput.getAttribute("id-value"),
      status: "pending",
      title: titleInput.value,
      description: descriptionInput.value,
    };

    userInput.setAttribute("id-value", "");
    userInput.value = "";
    titleInput.value = "";
    descriptionInput.value = "";
    taskForm.classList.remove("was-validated");

    const res = await addTask(taskData);
    // console.log(res);
    const taskModal = document.getElementById("task-modal");
    const modalInstance = bootstrap.Modal.getInstance(taskModal);
    if (modalInstance) {
      modalInstance.hide();
    }
    await renderTasksTable(); // need to create an update method rather than rendering the whole table
  });

  // #endregion
};

export const viewTask = (task) => {};
