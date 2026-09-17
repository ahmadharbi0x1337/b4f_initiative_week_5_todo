import { getUsers, addUser } from "/js/api.js";

export const initUsers = async () => {
  // Form
  const userForm = document.getElementById("user-form");

  // Form Input Fields
  // #region
  // -- // Users Info
  const userFirstName = document.getElementById("first-name-input");
  const userLastName = document.getElementById("last-name-input");
  const userAge = document.getElementById("age-input");

  userForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // validate
    userForm.classList.add("was-validated");
    if (!userForm.checkValidity()) {
      return;
    }
    // create object
    const userData = {
      firstName: userFirstName.value,
      lastName: userLastName.value,
      age: userAge.value,
    };

    const res = await addUser(userData);

    // clear fields
    userFirstName.value = "";
    userLastName.value = "";
    userAge.value = "";

    userForm.classList.remove("was-validated");
    const userModal = document.getElementById("user-modal");
    const modalInstance = bootstrap.Modal.getInstance(userModal);
    if (modalInstance) {
      modalInstance.hide();
    }
  });
};

// #endregion
