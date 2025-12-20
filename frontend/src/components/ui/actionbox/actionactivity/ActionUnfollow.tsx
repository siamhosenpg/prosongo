import React from "react";
import { useUnfollowUser } from "@/hook/useFollow";
import { RiUserFollowLine } from "react-icons/ri";

const ActionUnfollow = ({ userId, Name }: { userId: string; Name: string }) => {
  const { mutate: unfollow, isPending, isError } = useUnfollowUser();
  const handleUnfollow = () => {
    unfollow(userId, {
      onSuccess: () => {
        console.log(`You have unfollowed ${Name}`);
      },
      onError: (error) => {
        console.error("Unfollow failed:", error);
      },
    });
  };
  return (
    <button
      onClick={handleUnfollow}
      disabled={isPending}
      className="user-card w-full font-semibold flex items-center gap-2 px-6 py-3 hover:bg-background-secondary cursor-pointer rounded-md"
    >
      <RiUserFollowLine className="text-xl " />
      <div>
        {isPending ? "Unfollowing..." : "Unfollow"} {Name}
      </div>
      {isError && <p className="error">Something went wrong!</p>}
    </button>
  );
};

export default ActionUnfollow;
