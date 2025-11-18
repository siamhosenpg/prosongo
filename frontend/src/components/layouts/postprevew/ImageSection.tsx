"use client";

import React from "react";
import { FaBackspace } from "react-icons/fa";
import { VscScreenFull } from "react-icons/vsc";

interface ImageSectionProps {
  media: string[];
}

const ImageSection: React.FC<ImageSectionProps> = ({ media }) => {
  const handelBack = (): void => {
    window.history.back();
  };

  const FullScreenImage = (): void => {
    const imgElement = document.querySelector(
      ".leftArea img"
    ) as HTMLElement | null;

    if (imgElement) {
      if (!document.fullscreenElement) {
        imgElement.requestFullscreen?.().catch((err: any) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="leftArea w-full md:w-8/12 h-[calc(100vh_-_110px)] relative flex items-center bg-background-secondary rounded-none sm:rounded-lg overflow-hidden justify-center">
      <div className="absolute z-30 left-0 top-0 flex items-center justify-center gap-3 p-3">
        {/* Back Button */}
        <button
          onClick={handelBack}
          className="w-10 h-10 p-1 flex items-center justify-center bg-[#0000002d] rounded-full shadow-md transition duration-300 ease-in-out"
        >
          <FaBackspace className="text-2xl text-white text-shadow-md" />
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={FullScreenImage}
          className="w-10 h-10 p-1 flex items-center justify-center bg-[#0000002d] rounded-full shadow-md transition duration-300 ease-in-out"
        >
          <VscScreenFull className="text-2xl text-white text-shadow-md" />
        </button>
      </div>

      <img
        className="max-w-full max-h-full relative z-20 object-contain"
        src={media[0]}
        alt=""
        loading="lazy"
      />

      <img
        className="absolute z[-10] max-w-full max-h-full object-contain blur-xl scale-200"
        src={media[0]}
        alt=""
        loading="lazy"
      />
    </div>
  );
};

export default ImageSection;
