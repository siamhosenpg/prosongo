"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from "@/lib/api/authApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserType } from "@/types/userType";

interface UseAuthOptions {
  fetchUser?: boolean;
}

interface AuthResponse {
  user: UserType;
  token: string;
}

export const useAuth = (options?: UseAuthOptions) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fetchUser = options?.fetchUser ?? true;
  const [error, setError] = useState<string | null>(null);

  // useQuery রাখতে হবে — enabled:false আর null return
  // দুটোই useSuspenseQuery-তে সমস্যা করে
  const { data: user, isLoading } = useQuery<AuthResponse | null>({
    queryKey: ["currentUser"],
    enabled: fetchUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // ✅ 5 min — বারবার fetch বন্ধ করো
    queryFn: async () => {
      try {
        return await getCurrentUser();
      } catch (err: any) {
        if (err.response?.status === 401) return null;
        throw err;
      }
    },
  });

  // Login
  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      router.push("/");
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Login failed");
    },
  });

  // Register
  const register = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      router.push("/");
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Registration failed");
    },
  });

  // Logout
  const logout = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
      router.push("/login");
    },
    onError: (err: any) => {
      console.error("Logout error:", err);
    },
  });

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    error,
    setError,
  };
};
