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

export const useAuth = (options?: UseAuthOptions) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fetchUser = options?.fetchUser ?? true;

  const [error, setError] = useState<string | null>(null);

  // ===================== Current User =====================
  const { data: user, isLoading } = useQuery<UserType | null>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: fetchUser,
    retry: false,
    onError: (err: any) => {
      if (err.response?.status === 401) {
        queryClient.setQueryData(["currentUser"], null);
      }
    },
  });

  // ===================== Login =====================
  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
      router.push("/");
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
    },
  });

  // ===================== Register =====================
  const register = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
      router.push("/home");
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
    },
  });

  // ===================== Logout =====================
  const logout = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // 🔥 Clear ALL react-query cache

      queryClient.setQueryData(["currentUser"], null);
      // 🔥 Clear ALL react-query cache
      queryClient.clear();
      router.push("/login");
    },
    onError: (err: any) => {
      console.error("Logout error:", err);
    },
  });

  return { user, isLoading, login, register, logout, error, setError };
};
