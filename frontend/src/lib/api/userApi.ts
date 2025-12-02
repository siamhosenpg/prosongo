import axiosInstance from "../axios";

export interface UpdateProfileData {
  userid: number;
  name?: string;
  username?: string;
  bio?: string;
  profileImage?: string;
  coverImage?: string;
  aboutText?: string;
  gender?: string;
  work?: string;
  location?: string;
  educations?: string;
  password?: string;
}

// Update current user's profile
export const updateUserProfile = async (data: UpdateProfileData) => {
  const res = await axiosInstance.put(`/users/${data.userid}`, data);
  return res.data;
};

// Get current user profile
export const getCurrentUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data.user;
};
