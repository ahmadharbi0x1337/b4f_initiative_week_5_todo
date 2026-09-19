const baseUrl = "http://localhost:3000";
// #region Refactored Version (Factory Pattern)

// Generic Request Builder
const request = async (endpoint, options = {}) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };
  if (config.body && typeof config.body !== "string") {
    config.body = JSON.stringify(config.body);
  }
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, config);
    if (!response.ok) {
      throw new Error("API ERROR, NOT A SERVER ERROR");
    }
    return response.json();
  } catch (err) {
    console.error("Server Err:" + err);
  }
};
// CRUD Creator (Factory Pattern)
// Notes, used Arrow Functions Here Because We Are Not Using the "this" keyword
// in other word, no unexpected behavior will happen.
const createCrudService = (endpoint) => ({
  getAll: () => request(endpoint),
  getById: (id) => request(`${endpoint}/${id}`),
  create: (data) => request(endpoint, { method: "POST", body: data }),
  update: (id, data) =>
    request(`${endpoint}/${id}`, { method: "PATCH", body: data }),
  delete: (id) => request(`${endpoint}/${id}`, { method: "DELETE" }),
});

export const usersApi = createCrudService("/users");
export const tasksApi = createCrudService("/todos");
// #endregion
