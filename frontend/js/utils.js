import { getAllTasks, updateTask, deleteTask } from "./api.js";
import { initTasks, viewTask } from "./tasks.js";
// Note: FormData uses the name attribute on the input element not the id
export const getFormData = (formElement) => {
  const formData = new FormData(formElement);
  return Object.fromEntries(formData.entries());
};

export const hideBSModal = (id) => {
  const modal = document.getElementById(id);
  const modalInstance = bootstrap.Modal.getInstance(modal);
  if (modalInstance) {
    modalInstance.hide();
  }
};

// by default the type is button and there is a class called btn
export const CustomBtn = (name = "", id = "", classes = "") => {
  return `
  <button type="button" class="btn ${classes}" id=${id} data-action=${name.toUpperCase()}>${name}</button>
  `;
};
export const taskCrud = async (pointerEvent = PointerEvent) => {
  const tasks = await getAllTasks();
  const action = pointerEvent.target.getAttribute("data-action");
  const id = pointerEvent.target.getAttribute("id");
  const task = tasks[id];
  switch (action) {
    case "UPDATE":
      if (task["status"] == "pending") {
        task["status"] = "in-progress";
        await updateTask(task["id"], task);
        initTasks();
      } else if (task["status"] == "in-progress") {
        task["status"] = "completed";
        await updateTask(task["id"], task);
        initTasks();
      } else {
        console.log(
          "Completed Is The Final Stage of A Task, You May Delete It If You Want",
        );
        initTasks();
      }
      break;

    case "DELETE":
      await deleteTask(task["id"]);
      initTasks();
      break;

    case "VIEW":
      viewTask();
      initTasks();
      break;
  }
};

export const filterLogic = (pointerEvent = PointerEvent) => {
  // First Query All Rows in an Array, then Hide ones that doesn't match status string
  const status = pointerEvent.target.textContent.toLowerCase();
  const [headers, ...rows] = Array.from(document.querySelectorAll("tr"));
  if (status == "all") {
    // loop and remove the hidden or display none style, or re-Render the Table again
    rows.map((row) => {
      row.style.display = "";
    });
    return;
  } else {
    // console.log(headers);
    const updatedTable = rows.map((row) => {
      const rawData = Array.from(row.children).map((td) => {
        return td.textContent;
      });
      console.log(rawData);
      if (!rawData.includes(status)) {
        row.style.display = "none";
      } else {
        row.style.display = "";
      }
    });
  }
};
// el is an element with multiple direct childs inside it and we want to add event listeners to all of them
// console.log(el instanceof HTMLElement); // output true
export const addListenersToChildren = (
  el = HTMLElement,
  callBackLogic = async () => {},
) => {
  // assume that el.children returns an HTMLCollection which is an array of Elements
  const children = Array.from(el.children);
  children.forEach((child) => {
    child.addEventListener("click", async (e) => {
      callBackLogic(e);
    });
  });
};
