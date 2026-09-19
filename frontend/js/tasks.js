import { tasksApi } from ".//api.js";
import { renderTable } from "./tableBuilder.js";
import { CustomBtn, hideBSModal } from "./utils.js";
import { state, refreshState, refreshTasks, refreshUsers } from "./storage.js";
// Globals

const taskActions = (idx) => {
  return {
    update: CustomBtn("Update", `${idx}`, "btn-success"), // Only Updates Status (Linearly Each Step At Time Compolsary)
    delete: CustomBtn("Delete", `${idx}`, "btn-danger"),
    view: CustomBtn(
      "View",
      `${idx}`,
      "btn-primary",
      `"data-bs-toggle="modal" data-bs-target="#view-task-modal"`,
    ), // View Details (Like Description, Full List of Assigned Users)
  };
};

const modifyTasks = async () => {
  await refreshState();
  const modified = state.tasks.map((task) => {
    const user = state.users.find(
      (user) => String(user["id"]) == String(task["userId"]),
    );
    return {
      username: `${user["firstName"]} ${user["lastName"]}`,
      title: task["title"],
      status: task["status"],
      actions: taskActions(task["id"]),
    };
  });
  // #region
  // OLD CODE BUT HELPFUL FOR FUTURE , ESPECIALLY REGARDING THE Promise.all() and The Note About Network Requests
  // THIS WILL MAKE N+1 Network HTTP Requests, Essentially CAUSING a DDOS ATTACK, HOW CUTE!
  // Note: we used Promise.all() because map returns an array of Promises, and one of the ways to resolve this issue was to rap the array of promises in Promise.all
  // Promise.all()  returns an array of the fulfillment values
  // try to unwrap it and see what the console.log(modifiedTasks) will be [promise <fulfill>]
  // const modifiedTasks = await Promise.all(
  //     const user = await usersApi.getById(task["userId"]);
  //     const userName = user["firstName"] + " " + user["lastName"];
  //     // console.log(userName); // if the keys don't exist the output will be "NaN"
  //     return {
  //       username: userName,
  //       title: task["title"],
  //       status: task["status"],
  // wrong invocation, you can't name a key like a function
  //       actions: actions(idx),
  //     };
  // #endregion
  return modified;
};
const viewTask = (task) => {
  const viewTaskModal = document.getElementById("view-task-modal");
  viewTaskModal.querySelector("h1").innerHTML = task["title"].toUpperCase();
  console.log(task);
  const modalBody = viewTaskModal.querySelector(".modal-body");
  modalBody.innerHTML = "";
  modalBody.innerHTML = `
  <div class="vstack gap-2 bg-light">
    <div class="p-2">
      <div class="input-group mb-3">
        <p class="container-fluid text-bg-primary p-1">Description</p>
        <p class="container-fluid p-1 text-bg-dark">${task["description"]}</p>
      </div>
    </div>
    <div class="p-2"> 
      <div class="input-group mb-3">
        <p class="container-fluid text-bg-success p-1">Status</p>
        <p class="container-fluid p-1 text-bg-secondary">${task["status"]}</p>
      </div>
    </div>
    <div class="p-2">
      <div class="input-group mb-3">
        <p class="container-fluid text-bg-danger p-1">Assigned To</p>
        <p class="container-fluid p-1 text-bg-info">USERS</p>
      </div>
    </div>
  </div>
  `;
  // Show Modal After Inserting Data
  const modalInstance = bootstrap.Modal.getOrCreateInstance(viewTaskModal);
  modalInstance.show();
};

const taskCrud = async (pointerEvent = PointerEvent) => {
  await refreshTasks();
  const action = pointerEvent.target.getAttribute("data-action");
  const id = pointerEvent.target.getAttribute("id");
  const task = state.tasks.find((task) => String(task["id"]) == String(id));
  switch (action) {
    case "UPDATE":
      if (task["status"] == "pending") {
        task["status"] = "in-progress";
        await tasksApi.update(task["id"], task);
        await renderTasksTable();
        return;
      } else if (task["status"] == "in-progress") {
        task["status"] = "completed";
        await tasksApi.update(task["id"], task);
        await renderTasksTable();
        return;
      } else {
        console.log(
          "Completed Is The Final Stage of A Task, You May Delete It If You Want",
        );
        return;
      }

    case "DELETE":
      await tasksApi.delete(task["id"]);
      await renderTasksTable();
      return;

    case "VIEW":
      viewTask(task);
      return;
    default:
      return "DEFAULT";
  }
};

const renderTasksTable = async () => {
  const tasks = await modifyTasks();
  renderTable("table", tasks, taskCrud);
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
    await refreshUsers();
    state.users.forEach((user) => {
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
    taskForm.reset();
    const res = await tasksApi.create(taskData);
    if (res) {
      taskForm.classList.remove("was-validated");
      hideBSModal("task-modal");
      await renderTasksTable(); // need to create an update method rather than rendering the whole table
    }
  });

  // #endregion
};
