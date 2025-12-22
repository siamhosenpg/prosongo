"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

interface LikeIconProps {
  liked: boolean;
  variants?: string;
}

const LikeBoxIcon = ({ liked, variants }: LikeIconProps) => {
  return (
    <AnimatePresence mode="wait">
      {liked ? (
        <motion.div
          key="liked"
          initial={{ scale: 0.6, rotate: -15, opacity: 0 }}
          animate={{
            scale: [0.6, 1.4, 1],
            rotate: [0, 10, 0],
            opacity: 1,
          }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
        >
          <AiFillLike
            className={`   drop-shadow-md ${
              variants === "lg"
                ? "text-2xl text-white lg:text-accent"
                : "text-xl text-accent -mt-0.5"
            }`}
          />
        </motion.div>
      ) : (
        <motion.div
          key="unliked"
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <AiOutlineLike
            className={` ${
              variants === "lg"
                ? "text-2xl text-white lg:text-text"
                : "text-xl text-text -mt-0.5"
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LikeBoxIcon;
