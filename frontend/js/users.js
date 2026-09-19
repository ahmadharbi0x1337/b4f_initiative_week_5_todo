// imports
import { usersApi } from "./api.js";
import { CustomBtn, getFormData, hideBSModal } from "./utils.js";
import { renderTable } from "./tableBuilder.js";
import { refreshUsers, state } from "./storage.js";

const userActions = (idx) => {
  return {
    delete: CustomBtn("Delete", `${idx}`, "btn-danger"),
  };
};

const modifyUsers = async () => {
  await refreshUsers();
  const modified = state.users.map((user) => {
    return {
      "first-name": user["firstName"],
      "last-name": user["lastName"],
      age: user["age"],
      actions: userActions(user["id"]),
    };
  });
  return modified;
};
export const userCrud = async (pointerEvent = PointerEvent) => {
  await refreshUsers();
  const action = pointerEvent.target.getAttribute("data-action");
  const id = pointerEvent.target.getAttribute("id");
  // wrapped in String because of trailing or starting numbers especailly zeros may cause errors
  const user = state.users.find((user) => String(user["id"]) == String(id));

  switch (action) {
    case "UPDATE":
      // update user
      return;
    case "DELETE":
      await usersApi.delete(user["id"]);
      await renderUsersTable();
      return;
    default:
      return "DEFAULT";
  }
};
const renderUsersTable = async () => {
  const modifiedUsers = await modifyUsers();
  renderTable("table", modifiedUsers, userCrud);
};

export const initUsers = async () => {
  await renderUsersTable();
  // Form
  const userForm = document.getElementById("user-form");

  userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // validate
    userForm.classList.add("was-validated");
    if (!userForm.checkValidity()) {
      return;
    }

    const userData = getFormData(userForm);

    const res = await usersApi.create(userData);
    if (res) {
      // Native method to clear fields , bust be called on the Form Element, Not on an individual input elements (will result to error)
      userForm.reset();
      // remove bs validation class and hide modal
      userForm.classList.remove("was-validated");
      hideBSModal("user-modal");
    }

    await renderUsersTable();
  });
};
