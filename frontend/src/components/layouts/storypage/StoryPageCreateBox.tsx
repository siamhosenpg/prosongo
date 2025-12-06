"use client";
import React from "react";
import { useAuth } from "@/hook/useAuth";
import Link from "next/link";

const StoryPageCreateBox = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  return (
    <Link
      href={`/stories/createstory`}
      className="w-full h-auto max-h-full shrink-0 bg-background rounded-lg cursor-pointer overflow-hidden  flex flex-col gap-1"
    >
      <div className="flex items-center gap-2 px-7 py-3 rounded-lg">
        <div className=" shrink-0 w-12 sm:w-14 h-12 sm:h-14 bg-linear-to-r from-[#06af3e] via-[#01b88a] to-[#8bd401] rounded-full overflow-hidden p-[3px]">
          <div className="p-[3px] bg-background rounded-full">
            <img
              loading="lazy"
              className="aspect-square w-full h-full block rounded-full bg-background-secondary object-cover"
              src={user?.user.profileImage}
              alt={user?.user.name}
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div>
            <span className="font-bold block">Create your Story</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoryPageCreateBox;
