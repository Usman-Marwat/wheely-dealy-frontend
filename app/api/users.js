import client from "./client";

const register = (data) => client.post("/users", data);

const otp = (userInfo) => client.post("/users/otp", userInfo);

const getUserData = (user_id) => client.get(`users/profile/${user_id}`);

const updateProfile = (user_id, profileData) =>
  client.put(`users/profile/${user_id}`, profileData);

export default {
  register,
  otp,
  getUserData,
  updateProfile,
};
