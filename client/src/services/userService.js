import axios from "axios";

const API_URL = "http://localhost:4000/users";

export const getUsers = async ({ search, status } = {}) => {
  let url = API_URL;
  const params = new URLSearchParams();

  if (search) params.append("q", search);
  if (status) params.append("status", status);

  if (params.toString()) url += `?${params.toString()}`;

  const response = await axios.get(url);
  return response.data;
};

export const createUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await axios.put(`${API_URL}/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
