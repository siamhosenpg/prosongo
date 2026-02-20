import React from "react";
import { getAllStories } from "@/lib/storys/storyData";
import { StoryType } from "@/types/storyType";
import DateTime from "@/components/ui/datetime/DateTime";
import { HiDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import UserBadge from "@/components/ui/text/UserBadge";
import Image from "next/image";

const StoryPageLeft = async () => {
  const { stories }: { stories: StoryType[] } = await getAllStories();
  if (!stories || stories.length === 0) return <div> No stories</div>;

  return (
    <div className=" ScrollSystem w-full h-auto max-h-[calc(100vh-270px)] bg-background rounded-lg overflow-y-auto p-4 flex flex-col gap-1">
      {stories.map((story) => (
        <Link
          href={`/stories/${story._id}`}
          key={story._id}
          className="flex items-center gap-2 px-3 py-2 hover:bg-background-secondary rounded-lg"
        >
          <div className=" shrink-0 w-12 sm:w-14 h-12 sm:h-14 bg-linear-to-r from-[#06af3e] via-[#01b88a] to-[#8bd401] rounded-full overflow-hidden p-[3px]">
            <div className="p-[3px] bg-background rounded-full">
              <Image
                width={100}
                height={100}
                loading="lazy"
                className="aspect-square w-full h-full block rounded-full bg-background-secondary object-cover border border-border"
                src={
                  story.userId?.profileImage
                    ? story.userId.profileImage
                    : story.userId?.gender === "female"
                      ? "/images/femaleprofile.jpg"
                      : "/images/profile.jpg" // male or default
                }
                alt={story.userId?.name || "Prosongo User"}
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <div>
              <span className="font-bold flex items-center gap-1">
                {story.userId?.name || "Prosongo User"}
                <UserBadge badges={story.userId?.badges} />
              </span>
              <div className="smalltext">
                <DateTime date={story.expiresAt} />
              </div>
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background cursor-pointer">
              <HiDotsHorizontal className="text-xl" />
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default StoryPageLeft;
