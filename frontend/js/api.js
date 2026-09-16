const baseUrl = "http://localhost:3000";
// #region Users REST APIs
const getUsers = async () => {
  const users = await fetch(baseUrl + "/users").then((response) => {
    return response.json();
  });

  return users;
};

const getUser = async (id) => {
  const user = await fetch(baseUrl + `/users/${id}`).then((response) => {
    return response.json();
  });
  return user;
};

const addUser = async (userData) => {
  const addedUser = await fetch(baseUrl + "/users", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then((response) => response.json());
  return addedUser;
};

const updateUser = async (id, userData) => {
  const updatedUser = await fetch(baseUrl + `/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then((response) => response.json());

  return updatedUser;
};

const deleteUser = async (id) => {
  await fetch(baseUrl + `/users/${id}`, {
    method: "DELETE",
  });
};

// #endregion
// #region Tasks REST APIs

const getTasks = async () => {
  const tasks = await fetch(baseUrl + "/todos").then((response) => {
    return response.json();
  });

  return tasks;
};

const getTask = async (id) => {
  const task = await fetch(baseUrl + `/todos/${id}`).then((response) => {
    return response.json();
  });
  return task;
};

const addTask = async (taskData) => {
  const addedTask = await fetch(baseUrl + "/todos", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  }).then((response) => response.json());
  return addedTask;
};

const updateTask = async (id, taskData) => {
  const updatedTask = await fetch(baseUrl + `/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  }).then((response) => response.json());

  return updatedTask;
};

const deleteTask = async (id) => {
  await fetch(baseUrl + `/todos/${id}`, {
    method: "DELETE",
  });
};
