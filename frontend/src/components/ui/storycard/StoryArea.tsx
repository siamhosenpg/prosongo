import React from "react";
import StoryCard from "./StoryCard";
import { StoryType } from "@/types/storyType";

interface StoryAreaProps {
  stories: StoryType[];
}

const StoryArea: React.FC<StoryAreaProps> = ({ stories }) => {
  return (
    <div className="flex w-full items-center gap-2">
      {stories.map((story) => (
        <StoryCard stories={story} key={story._id} />
      ))}
    </div>
  );
};

export default StoryArea;
