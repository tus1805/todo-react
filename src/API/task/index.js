//API_URL from env
const API_URL = "http://localhost:8000";

//get task api
export const getTaskById = async (taskId) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  return data;
};

//get all task
export const getAllTask = async () => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

//post task api
export const createTask = async (task) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(task),
  });
  return response.json();
};
