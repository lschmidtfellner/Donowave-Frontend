import api from "./apiConfig";

export const getUsers = async () => {
  const response = await api.get("/api/users/");
  return response.data;
};

export const getUser = async (id) => {
  const response = await api.get(`/api/users/${id}/`);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/api/users/${id}/`, userData, {
    headers: {
      'Authorization': `Token ${localStorage.getItem("authToken")}`
    }
  });
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/api/users/${id}/`);
  return response.data;
};

export const getUserDonations = async (id) => {
  const response = await api.get(`/api/users/${id}/donations/`);
  return response.data;
};

export const getUserCampaigns = async (id) => {
  const response = await api.get(`/api/users/${id}/campaigns/`);
  return response.data;
};
