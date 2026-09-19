import { usersApi, tasksApi } from "./api.js";

export const state = {
  users: [],
  tasks: [],
};
export const refreshUsers = async () => {
  state.users = await usersApi.getAll();
};
export const refreshTasks = async () => {
  state.tasks = await tasksApi.getAll();
};
export const refreshState = async () => {
  await refreshUsers();
  await refreshTasks();
};
