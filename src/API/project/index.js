//API_URL from env
const API_URL = process.env.REACT_APP_API_URL;

export const getProjectById = async (projectId) => {
  const response = await fetch(`${API_URL}/find-project`, {
    method: "POST",
    body: JSON.stringify(projectId),
  });
  const data = await response.json();
  return data;
};

export const getAllProject = async () => {
  const response = await fetch(`${API_URL}/projects`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const createProject = async (project) => {
  const response = await fetch(`${API_URL}/project`, {
    method: "POST",
    body: JSON.stringify(project),
  });
  return response.json();
};

export const editProject = async (project) => {
  const response = await fetch(`${API_URL}/edit-project`, {
    method: "PATCH",
    body: JSON.stringify(project),
  });
  return response.json();
};

export const deleteProject = async (projectId) => {
  const response = await fetch(`${API_URL}/delete-project`, {
    method: "DELETE",
    body: JSON.stringify(projectId),
  });
  return response.json();
};
