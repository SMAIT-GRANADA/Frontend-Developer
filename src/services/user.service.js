import axiosInstance from "../api/axiosInstance";

// Get all users
export const getUsers = async ({ page = 1, limit = 10 }) => {
  const response = await axiosInstance.get(
    `/users?page=${page}&limit=${limit}`
  );
  return response.data;
};

// Get Parents
export const getParents = async () => {
  const response = await axiosInstance.get("/users", {
    params: {
      roleId: 4, // PARENT role
      isActive: true,
    },
  });
  return response.data;
};

// Add user
export const addUser = async (userData) => {
  const response = await axiosInstance.post("/users", userData);
  return response.data;
};

// Get user by ID
export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

// Update user
export const updateUser = async ({ id, data }) => {
  const response = await axiosInstance.put(`/users/${id}`, data);
  return response.data;
};

// Delete user
export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};
