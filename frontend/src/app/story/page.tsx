import StoryPageContent from "@/components/layouts/storypage/StoryPageContent";
import StoryPageLeft from "@/components/layouts/storypage/StoryPageLeft";
import React from "react";

const story = () => {
  return (
    <div className="pt-4">
      <div className="w-full Pagearea flex items-center h-[calc(100vh_-_106px)]  gap-22">
        <div className="left w-[400px] shrink-0  h-auto max-h-full">
          <StoryPageLeft />
        </div>
        <div className="right w-full h-full ">
          <StoryPageContent />
        </div>
      </div>
    </div>
  );
};

export default story;
