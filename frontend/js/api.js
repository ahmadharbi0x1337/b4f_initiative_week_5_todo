const baseUrl = "http://localhost:3000";
// #region Users REST APIs
export const getUsers = async () => {
  const users = await fetch(baseUrl + "/users").then((response) => {
    return response.json();
  });

  return users;
};

export const getUser = async (id) => {
  const user = await fetch(baseUrl + `/users/${id}`).then((response) => {
    return response.json();
  });
  return user;
};

export const addUser = async (userData) => {
  const addedUser = await fetch(baseUrl + "/users", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then((response) => response.json());
  return addedUser;
};

export const updateUser = async (id, userData) => {
  const updatedUser = await fetch(baseUrl + `/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then((response) => response.json());

  return updatedUser;
};

export const deleteUser = async (id) => {
  await fetch(baseUrl + `/users/${id}`, {
    method: "DELETE",
  });
};

// #endregion

// #region Tasks REST APIs
export const getTasks = async () => {
  const tasks = await fetch(baseUrl + "/todos").then((response) => {
    return response.json();
  });

  return tasks;
};

export const getTask = async (id) => {
  const task = await fetch(baseUrl + `/todos/${id}`).then((response) => {
    return response.json();
  });
  return task;
};

export const addTask = async (taskData) => {
  try {
    const response = await fetch(baseUrl + "/todos", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error("API ERROR: NOT SERVER ERROR");
    }
    return response.json();
  } catch (error) {
    console.log("SERVER ERROR", error);
  }
};

export const updateTask = async (id, taskData) => {
  const updatedTask = await fetch(baseUrl + `/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  }).then((response) => response.json());

  return updatedTask;
};

export const deleteTask = async (id) => {
  await fetch(baseUrl + `/todos/${id}`, {
    method: "DELETE",
  });
};
// #endregion
