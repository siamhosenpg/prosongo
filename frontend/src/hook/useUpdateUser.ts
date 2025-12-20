"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/lib/api/userApi";
import { useRouter } from "next/navigation";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: any) => updateUserProfile(data), // <-- এখানে data.userid যাবে
    onSuccess: ({ user, message }) => {
      // cache update
      queryClient.setQueryData(["currentUser"], user);

      // ✅ Direct redirect to home page
      router.push("/");
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || "Something went wrong");
    },
  });
}
