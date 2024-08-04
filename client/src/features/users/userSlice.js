import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../services/userService";

// Thunks para realizar solicitudes asíncronas a la API
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ search, status } = {}) => {
    const response = await getUsers({ search, status });
    return response;
  }
);

export const addUser = createAsyncThunk("users/addUser", async (user) => {
  const response = await createUser(user);
  return response;
});

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ id, user }) => {
    const response = await updateUser(id, user);
    return response;
  }
);

export const removeUser = createAsyncThunk("users/removeUser", async (id) => {
  await deleteUser(id);
  return id;
});

// Estado inicial del slice
const initialState = {
  users: [],
  loading: false,
  error: null,
};

// Definición del slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        state.users[index] = action.payload;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
