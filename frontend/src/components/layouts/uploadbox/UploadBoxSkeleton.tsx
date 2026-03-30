import React from "react";

const UploadBoxSkeleton = () => {
  return (
    <div className="w-full bg-background rounded-none lg:rounded-lg px-4 sm:px-6 py-3 sm:py-4 flex flex-col items-center justify-center mb-2 sm:mb-4">
      {/* Top row — avatar + input */}
      <div className="flex items-center justify-between w-full gap-4 mb-2 sm:mb-4  pb-2 sm:pb-4">
        {/* Avatar skeleton */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-background-secondary animate-pulse" />

        {/* Input skeleton */}
        <div className="w-full h-9 sm:h-11 rounded-full bg-background-secondary animate-pulse" />
      </div>

      {/* Bottom row — 3 buttons */}
      <div className="flex items-center justify-between w-full gap-4">
        {/* Image button skeleton */}
        <div className="w-2/6 h-9 rounded-lg bg-background-secondary animate-pulse" />

        {/* Video button skeleton */}
        <div className="w-2/6 h-9 rounded-lg bg-background-secondary animate-pulse" />

        {/* Voice button skeleton */}
        <div className="w-2/6 h-9 rounded-lg bg-background-secondary animate-pulse" />
      </div>
    </div>
  );
};

export default UploadBoxSkeleton;
