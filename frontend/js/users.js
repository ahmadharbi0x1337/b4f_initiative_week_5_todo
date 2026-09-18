import { getUsers, addUser } from "/js/api.js";
import { CustomBtn, getFormData, hideBSModal } from "./utils.js";
import { renderTable } from "./tableBuilder.js";
const actions = (idx) => {
  return {
    delete: CustomBtn("Delete", `delete-btn-${idx}`, "btn-danger"),
  };
};

const modifyUsers = async () => {
  const users = await getUsers();
  const modifiedUsers = users.map((user, idx) => {
    return {
      "First Name": user["firstName"],
      "Last Name": user["lastName"],
      Age: user["age"],
      actions: actions(idx),
    };
  });
  return modifiedUsers;
};

const renderUsersTable = async () => {
  const modifiedUsers = await modifyUsers();
  renderTable("table", modifiedUsers);
};

export const initUsers = async () => {
  await renderUsersTable();
  // Form
  const userForm = document.getElementById("user-form");

  // #region OLD CODE
  // Form Input Fields
  // -- // Users Info

  // const userFormInputs = {
  //   firstName: "first-name-input",
  //   lastName: "last-name-input",
  //   age: "age-input",
  // };
  // const userFirstName = document.getElementById("first-name-input");
  // const userLastName = document.getElementById("last-name-input");
  // const userAge = document.getElementById("age-input");
  // #endregion
  userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // validate
    userForm.classList.add("was-validated");
    if (!userForm.checkValidity()) {
      return;
    }
    // #region OLD CODE
    // create object
    // const userData = {
    //   firstName: userFirstName.value,
    //   lastName: userLastName.value,
    //   age: userAge.value,
    // };
    //  #endregion

    const userData = getFormData(userForm);

    const res = await addUser(userData);
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
