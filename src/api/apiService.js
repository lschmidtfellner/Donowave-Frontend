import api from "./apiConfig";

export const registerUser = async (registerData) => {
  try {
    const resp = await api.post("/api/register/", registerData);
    return resp;
  } catch (error) {
    console.error("Registration Failed:", error);
    throw error;
  }
};

export const loginUser = async (loginData) => {
  const resp = await api.post("/api/login/", loginData);
  if (resp.status === 200) {
    localStorage.setItem("authToken", resp.data.token);
    localStorage.setItem("user", resp.data.user_id);
    return resp.data;
  }
  throw new Error("Invalid login credentials");
};

export const isTokenValid = async () => {
  try {
    const response = await api.get("/api/is_token_valid/");
    return response.data.valid;
  } catch (error) {
    throw new Error("Error checking token validity");
  }
};

export const removeToken = () => {
  localStorage.removeItem("authToken");
};

export const removeUser = () => {
  localStorage.removeItem("user");
};