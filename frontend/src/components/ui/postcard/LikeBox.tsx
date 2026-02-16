"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLike } from "react-icons/ai";

type ReactionType = "like" | "love" | "care" | "angry" | "wow" | "sad";

interface LikeIconProps {
  liked: ReactionType | boolean;
  design?: "video" | "post";
  variants?: string;
}

const reactionIcons: Record<ReactionType, string> = {
  like: "/images/icon/reaction/like.png",
  love: "/images/icon/reaction/love.png",
  care: "/images/icon/reaction/care.png",
  angry: "/images/icon/reaction/angry.png",
  wow: "/images/icon/reaction/wow.png",
  sad: "/images/icon/reaction/sad.png",
};

const LikeBoxIcon = ({ liked, variants, design }: LikeIconProps) => {
  const activeReaction =
    typeof liked === "string" ? reactionIcons[liked] : null;

  return (
    <AnimatePresence mode="wait">
      {activeReaction ? (
        <motion.div
          key={String(liked)} // ✅ TS-safe key
          initial={{ scale: 0.6, rotate: -15, opacity: 0 }}
          animate={{
            scale: [0.6, 1.4, 1],
            rotate: [0, 10, 0],
            opacity: 1,
          }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className={`drop-shadow-md   ${
            variants === "video" || design === "video"
              ? "w-7"
              : variants === "lg"
                ? "w-5 text-white lg:text-text"
                : "w-5 -mt-0.5"
          }`}
        >
          <img className="w-full h-full" src={activeReaction} />
        </motion.div>
      ) : (
        <motion.div
          key="unliked"
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="w-full h-full flex items-center justify-center transition-opacity cursor-pointer  py-1 select-none"
        >
          <AiOutlineLike
            className={` ${
              variants === "video" || design === "video"
                ? "text-2xl"
                : variants === "lg"
                  ? "text-2xl text-white lg:text-text"
                  : "text-xl -mt-0.5"
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LikeBoxIcon;
