//API_URL from env
const API_URL = "http://localhost:8000";

export const getTaskById = async (taskId) => {
  const response = await fetch(`${API_URL}/find-task`, {
    method: "POST",
    body: JSON.stringify(taskId),
  });
  const data = await response.json();
  return data;
};

export const getAllTask = async () => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const createTask = async (task) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    body: JSON.stringify(task),
  });
  return response.json();
};

//edit task api
export const editTask = async (task) => {
  const response = await fetch(`${API_URL}/edit-task`, {
    method: "PATCH",
    body: JSON.stringify(task),
  });
  return response.json();
};