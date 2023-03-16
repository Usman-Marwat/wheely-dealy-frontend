import client from "./httpClient";

const endpoint = "/auth";

const register = (data) => client.post(`${endpoint}/signup`, data);

const login = (userInfo) => client.post(`${endpoint}/login`, userInfo);

const getAccountTypes = () => client.get(`${endpoint}/getaccounttypes`);

const getUserData = (user_id) => client.get(`users/profile/${user_id}`);

const updateProfile = (user_id, profileData) =>
  client.put(`users/profile/${user_id}`, profileData);

const refreshUserToken = (user_id, actor) =>
  client.get(`/auth/${user_id}/${actor}/refreshToken`);

export default {
  getAccountTypes,
  getUserData,
  login,
  refreshUserToken,
  register,
  updateProfile,
};
