import { useSuspenseQuery } from "@tanstack/react-query";
import { getSuggestedUsers } from "@/lib/user/userData";

export const useSuggestedUsers = () => {
  return useSuspenseQuery({
    queryKey: ["suggested-users"],
    queryFn: getSuggestedUsers,
    staleTime: 1000 * 60 * 2,
  });
};
