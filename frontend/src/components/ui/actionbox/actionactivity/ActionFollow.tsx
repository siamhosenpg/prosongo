import React from "react";
import { useFollowUser } from "@/hook/useFollow";
import { RiUserFollowLine } from "react-icons/ri";
const ActionFollow = ({ userId, Name }: { userId: string; Name: string }) => {
  const { mutate: follow, isPending, isError } = useFollowUser();
  const handleFollow = () => {
    follow(userId, {
      onSuccess: () => {
        console.log(`You followed ${Name}`);
      },
      onError: (error) => {
        console.error("Follow failed:", error);
      },
    });
  };
  return (
    <button
      onClick={handleFollow}
      disabled={isPending}
      className="user-card w-full font-semibold flex items-center gap-2 px-6 py-3 hover:bg-background-secondary cursor-pointer rounded-md"
    >
      <RiUserFollowLine className="text-xl " />
      <div>
        {isPending ? "Following..." : "Follow"} {Name}
      </div>
      {isError && <p className="error">Something went wrong!</p>}
    </button>
  );
};

export default ActionFollow;
