import React from "react";

const ShortcutActivityLoading = () => {
  return (
    <div className=" bg-background rounded-lg mt-4  ">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 rounded-md p-2 animate-pulse bg-background"
        >
          <div className="h-12 w-12 rounded-md bg-gray-300"></div>
          <div className="flex flex-col gap-1 w-full">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShortcutActivityLoading;
