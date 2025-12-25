import React from "react";

const StoryCardSkeleton = () => {
  return (
    <div className="flex flex-col max-w-20 w-17.5 sm:w-20 items-center shrink-0 animate-pulse">
      {/* Circle Avatar Skeleton */}
      <div className="w-14 h-14 rounded-full bg-background-tertiary p-0.5">
        <div className="w-full h-full rounded-full" />
      </div>

      {/* Username Skeleton */}
      <div className="mt-2 h-3 w-10 rounded bg-background-tertiary" />
    </div>
  );
};

export default StoryCardSkeleton;
