//API_URL from env
import { API_URL } from "../../constants/validate";

export const getProjectUserById = async (projectuserId) => {
  const response = await fetch(`${API_URL}/find-project-user`, {
    method: "POST",
    body: JSON.stringify(projectuserId),
  });
  const data = await response.json();
  return data;
};

export const getAllProjectUser = async () => {
  const response = await fetch(`${API_URL}/project-users`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const createProjectUser = async (projectuser) => {
  const response = await fetch(`${API_URL}/project-users`, {
    method: "POST",
    body: JSON.stringify(projectuser),
  });
  return response.json();
};

export const editProjectUser = async (projectuser) => {
  const response = await fetch(`${API_URL}/edit-project-user`, {
    method: "PATCH",
    body: JSON.stringify(projectuser),
  });
  return response.json();
};
