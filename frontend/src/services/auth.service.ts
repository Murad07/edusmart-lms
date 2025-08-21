import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000/api/auth";

const register = async (userData: any) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (userData: any) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const updateProfile = async (userData: any, config: any) => {
  const response = await axios.put(`${API_URL.replace('/auth', '/users')}/me`, userData, config);
  return response.data;
};

const forgotPassword = async (email: string) => {
  const response = await axios.post(`${API_URL}/forgotpassword`, { email });
  return response.data;
};

const resetPassword = async (token: string, password: string) => {
  const response = await axios.put(`${API_URL}/resetpassword/${token}`, { password });
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  updateProfile,
  forgotPassword,
  resetPassword,
};

export default authService;
