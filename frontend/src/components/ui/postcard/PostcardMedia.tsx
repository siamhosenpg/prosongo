"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { AiFillLike } from "react-icons/ai";

// 👉 Type for image data
type ImageType = string;

type Props = {
  imagedata: ImageType[];
};

const PostcardMedia: React.FC<Props> = ({ imagedata }) => {
  const [message, setMessage] = useState<string>("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const longPressed = useRef<boolean>(false);

  const handleMouseDown = () => {
    longPressed.current = false;

    timerRef.current = setTimeout(() => {
      longPressed.current = true;

      setMessage("Liked");
      setTimeout(() => setMessage(""), 1000);
    }, 500);
  };

  const handleMouseUp = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (longPressed.current) {
      e.preventDefault(); // stop navigation on long press
    }
  };

  return (
    <div>
      {imagedata &&
        imagedata.map((image: string, i: number) => (
          <Link
            key={i}
            href="/post"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onClick={handleClick}
            className="media flex items-center justify-center w-full px-0 sm:px-6 h-auto overflow-hidden"
          >
            <img
              loading="lazy"
              className="rounded-none sm:rounded-lg mt-2 w-full h-auto min-h-[200px] min-w-[100px] bg-gray-100 max-h-[700px]"
              src={image} // 👉 TypeScript safe
              alt="Post Image"
            />

            {message && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1.2, 1, 0.8],
                  rotate: [-20, 20, -15, 10],
                  y: [0, -20, -60, -100, -150],
                }}
                transition={{
                  duration: 1.6,
                  ease: "easeOut",
                  times: [0, 0.2, 0.4, 0.6, 1],
                }}
                className="absolute mt-4 text-green-500 text-8xl drop-shadow-2xl"
              >
                <AiFillLike />
              </motion.div>
            )}
          </Link>
        ))}
    </div>
  );
};

export default PostcardMedia;
