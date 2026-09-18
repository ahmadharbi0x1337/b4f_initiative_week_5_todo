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
  })
    .then((response) => response.json())
    .catch((e) => {
      console.error(e);
    });
  return addedUser;
};

// export const updateUser = async (id, userData) => {
//   const updatedUser = await fetch(baseUrl + `/users/${id}`, {
//     method: "PATCH", //  PUT is Complete Replacement (Copies and Compares) , Where as PATCH is Partial Only Adds Updated Data
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   }).then((response) => response.json());

//   return updatedUser;
// };

export const deleteUser = async (id) => {
  await fetch(baseUrl + `/users/${id}`, {
    method: "DELETE",
  });
};

// #endregion

// #region Tasks REST APIs
export const getAllTasks = async () => {
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
    method: "PATCH",
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

// FOR REFACTORING LATER (Centralized Error Handling, and Factory Pattern)
// NOTE: Error Handling Requires Knowing How The Backend Will Respond To Different Failure Cases
// #region Refactoring
// // --- Centralized Error Handler ---
// class ApiError extends Error {
//   constructor(message, status, data) {
//     super(message);
//     this.name = "ApiError";
//     this.status = status;
//     this.data = data;
//   }
// }

// // --- Core Client Function ---
// const request = async (endpoint, options = {}) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       ...options.headers,
//     },
//     ...options,
//   };

//   if (config.body && typeof config.body !== "string") {
//     config.body = JSON.stringify(config.body);
//   }

//   try {
//     const response = await fetch(`${BASE_URL}${endpoint}`, config);

//     // Parse response body safely
//     const data =
//       response.status !== 204 ? await response.json().catch(() => null) : null;

//     if (!response.ok) {
//       throw new ApiError(
//         data?.message || `HTTP Error ${response.status}`,
//         response.status,
//         data,
//       );
//     }

//     return data;
//   } catch (error) {
//     // Re-throw custom API errors or network failures so calling UI code can react appropriately
//     if (error instanceof ApiError) throw error;
//     throw new ApiError(error.message || "Network failure", 0, null);
//   }
// };

// // --- CRUD Factory Creator ---
// const createCrudService = (endpoint) => ({
//   getAll: () => request(endpoint),
//   getById: (id) => request(`${endpoint}/${id}`),
//   create: (data) => request(endpoint, { method: "POST", body: data }),
//   update: (id, data) =>
//     request(`${endpoint}/${id}`, { method: "PATCH", body: data }),
//   delete: (id) => request(`${endpoint}/${id}`, { method: "DELETE" }),
// });

// // --- Exported API Services ---
// export const usersApi = createCrudService("/users");
// export const tasksApi = createCrudService("/todos");
// #endregion
