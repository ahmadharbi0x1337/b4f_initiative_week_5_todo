import { getUsers } from "/js/api.js";

// const usresListBtn = document.getElementById("users-list-btn");
const usersList = document.getElementById("ul-users-list");
const userSelect = document.getElementById("user-select");

const addUsresToList = async (userSelect) => {
  const users = await getUsers();
  users.map((user) => {
    const listItem = document.createElement("li");
    const anchorItem = document.createElement("a");
    const fullName = user["username"] + " " + user["family"];
    anchorItem.innerHTML = fullName;
    anchorItem.classList.add("dropdown-item");
    listItem.append(anchorItem);
    listItem.addEventListener("click", () => {
      userSelect.value = fullName;
      userSelect.setAttribute("id-value", user["id"]);
    });
    usersList.append(listItem);
  });
};

addUsresToList(userSelect);

// usresListBtn.addEventListener("click", async () => {
//   const users = await getUsers();
//   users.map((user) => {
//     const userName = document.createElement("li");
//     userName.innerHTML = user["username"] + " " + user["family"];
//     usersList.append(userName);
//   });
// });
