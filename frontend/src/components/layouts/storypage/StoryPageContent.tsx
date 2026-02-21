import StoryPrevewCard from "@/components/ui/storycard/StoryPrevewCard";
import React from "react";

import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { StoryType } from "@/types/storyType";

import { useEffect } from "react";
import { useStoryViewer } from "@/store/useStoryViewer";

const StoryPageContent = () => {
  const { stories, currentIndex, next, prev } = useStoryViewer();

  const story = stories[currentIndex];

  // 15 sec auto next
  useEffect(() => {
    if (!story) return;

    const timer = setTimeout(() => {
      next();
    }, 15000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  if (!story) return null;
  return (
    <div className="flex items-center h-full">
      <div className=" shrink-0 w-fit h-full">
        <StoryPrevewCard story={story} />
      </div>
      <div className=" hidden lg:flex flex-col gap-3 ml-22">
        <button
          onClick={prev}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-background border border-border "
        >
          <FaCaretUp className="text-xl" />
        </button>
        <button
          onClick={next}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-background border border-border "
        >
          <FaCaretDown className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default StoryPageContent;
