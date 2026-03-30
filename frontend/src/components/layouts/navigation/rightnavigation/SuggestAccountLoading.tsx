import React from "react";

const SuggestAccountLoading = () => {
  return (
    <div className="space-y-2 bg-background rounded-lg p-3 mb-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between mb-1 px-3 py-2 rounded-lg animate-pulse bg-background/50"
        >
          <div className="flex items-center gap-2">
            {/* Profile Image Skeleton */}
            <div className="w-10 h-10 rounded-full bg-background-secondary border border-border" />

            <div className="flex flex-col gap-1">
              {/* Name Skeleton */}
              <div className="w-24 h-4 bg-background-secondary rounded-md" />
              {/* Username Skeleton */}
              <div className="w-16 h-3 bg-background-secondary rounded-md" />
            </div>
          </div>

          {/* Follow Button Skeleton */}
          <div className="w-16 h-8 bg-background-secondary rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default SuggestAccountLoading;
