import axios from "axios";

const API_URL = "http://localhost:4000/users";

// Función para obtener usuarios con posibilidad de búsqueda, filtrado, paginación y ordenación
export const getUsers = async ({ search, status } = {}) => {
  let url = API_URL;
  const params = new URLSearchParams();

  if (search) params.append("q", search);
  if (status) params.append("status", status);

  if (params.toString()) url += `?${params.toString()}`;

  return new Promise((resolve) => {
    setTimeout(async () => {
      const response = await axios.get(url);
      resolve(response.data);
    }, 500); // Simula 500ms de tiempo de carga
  });
};

// Función para crear un nuevo usuario
export const createUser = async (user) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const response = await axios.post(API_URL, user);
      resolve(response.data);
    }, 500); // Simula 500ms de tiempo de carga
  });
};

// Función para actualizar un usuario existente
export const updateUser = async (id, user) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const response = await axios.put(`${API_URL}/${id}`, user);
      resolve(response.data);
    }, 500); // Simula 500ms de tiempo de carga
  });
};

// Función para eliminar un usuario
export const deleteUser = async (id) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      await axios.delete(`${API_URL}/${id}`);
      resolve();
    }, 500); // Simula 500ms de tiempo de carga
  });
};
