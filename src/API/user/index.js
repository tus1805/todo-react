//API_URL from env
import { API_URL } from "../../constants/validate";

export const getUserById = async (userId) => {
  const response = await fetch(`${API_URL}/find-user`, {
    method: "POST",
    body: JSON.stringify(userId),
  });
  const data = await response.json();
  return data;
};

export const getAllUser = async () => {
  const response = await fetch(`${API_URL}/users`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const createUser = async (user) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    body: JSON.stringify(user),
  });
  return response.json();
};

export const editUser = async (user) => {
  const response = await fetch(`${API_URL}/edit-user`, {
    method: "PATCH",
    body: JSON.stringify(user),
  });
  return response.json();
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${API_URL}/delete-user`, {
    method: "DELETE",
    body: JSON.stringify(userId),
  });
  return response.json();
};


export const signUp = async (user) => {
  const response = await fetch(`${API_URL}/sign-up`, {
    method: "POST",
    body: JSON.stringify(user),
  });
  return response.json();
};

export const signIn = async (user) => {
  const response = await fetch(`${API_URL}/sign-in`, {
    method: "POST",
    body: JSON.stringify(user),
  });
  return response.json();
};