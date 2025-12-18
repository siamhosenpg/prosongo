import axiosInstance from "../axios";
import { UserType } from "@/types/userType";
/**
 * 🔹 Fetch all users
 */
export const getAllUsers = async (): Promise<UserType[]> => {
  try {
    const response = await axiosInstance.get<UserType[]>("/users/user");
    return response.data;
  } catch (err: any) {
    console.error("Error fetching users:", err.message);
    return [];
  }
};

export const getUserByUsername = async (
  username: string
): Promise<UserType | null> => {
  try {
    const response = await axiosInstance.get<UserType>(
      `/users/user/${encodeURIComponent(username)}`
    );

    return response.data;
  } catch (err: any) {
    console.error("Error fetching user by username:", err.message);
    return null;
  }
};

export const getSuggestedUsers = async (): Promise<UserType[]> => {
  try {
    const response = await axiosInstance.get("/users/suggested");
    return response.data.users; // IMPORTANT ✔
  } catch (err: any) {
    console.error("Error fetching users:", err.message);
    return [];
  }
};
