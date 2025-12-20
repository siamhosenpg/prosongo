"use client";
import React from "react";

const DiscoverSkeleton = () => {
  return (
    <div className="px-2 lg:px-0 columns-2 md:columns-3 xl:columns-4 2xl:columns-4 gap-2 lg:gap-4">
      <div className=" w-full h-[320px]    mb-2 lg:mb-4 break-inside-avoid rounded-lg overflow-hidden border border-border bg-background-tertiary animate-pulse"></div>
      <div className=" w-full h-[520px]  mb-2 lg:mb-4 break-inside-avoid rounded-lg overflow-hidden border border-border bg-background-tertiary animate-pulse"></div>
      <div className=" w-full h-[360px]   mb-2 lg:mb-4 break-inside-avoid rounded-lg overflow-hidden border border-border bg-background-tertiary animate-pulse"></div>
      <div className=" w-full h-[220px]   mb-2 lg:mb-4 break-inside-avoid rounded-lg overflow-hidden border border-border bg-background-tertiary animate-pulse"></div>
      <div className=" w-full h-[474px]    mb-2 lg:mb-4 break-inside-avoid rounded-lg overflow-hidden border border-border bg-background-tertiary animate-pulse"></div>
      <div className=" w-full h-[486px]    mb-2 lg:mb-4 break-inside-avoid rounded-lg overflow-hidden border border-border bg-background-tertiary animate-pulse"></div>
    </div>
  );
};

export default DiscoverSkeleton;
