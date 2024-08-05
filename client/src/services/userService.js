import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const API_URL = "http://localhost:4000/users";

// Función para obtener usuarios con paginación y filtros
export const getUsers = async ({ search, status, limit, offset } = {}) => {
  let url = API_URL;
  const params = new URLSearchParams();

  if (search) params.append("q", search);
  if (status) params.append("status", status);
  if (limit) params.append("_limit", limit);
  if (offset) params.append("_start", offset);

  if (params.toString()) url += `?${params.toString()}`;

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.get(url);
        resolve({
          users: response.data,
          total: parseInt(response.headers["x-total-count"], 10) || 0,
        });
      } catch (error) {
        console.error("Error fetching users:", error);
        reject(error);
      }
    }, 500); // Simula 500ms de tiempo de carga
  });
};

// Función para crear un nuevo usuario
export const createUser = async (user) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        const newUser = { ...user, id: uuidv4() };
        const response = await axios.post(API_URL, newUser);
        resolve(response.data);
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    }, 500); // Simula 500ms de tiempo de carga
  });
};

// Función para actualizar un usuario existente
export const updateUser = async (id, user) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.put(`${API_URL}/${id}`, user);
        resolve(response.data);
      } catch (error) {
        console.error("Error updating user:", error);
        reject(error);
      }
    }, 500); // Simula 500ms de tiempo de carga
  });
};

// Función para eliminar un usuario
export const deleteUser = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        await axios.delete(`${API_URL}/${id}`);
        resolve();
      } catch (error) {
        console.error("Error deleting user:", error);
        reject(error);
      }
    }, 500); // Simula 500ms de tiempo de carga
  });
};
