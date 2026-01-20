import React, { useState } from "react";
import CommentsSection from "@/components/layouts/postprevew/CommentsSection";
import CommentsInput from "../comments/CommentsInput";

import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";
import ModalPortal from "@/components/layouts/ModalPortal";
import { ImCross } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";
import { CommentType } from "@/types/commentType";

interface CommentsMobileSectionProps {
  post: string;
  onClose: () => void;
}
const CommentsMobileSection: React.FC<CommentsMobileSectionProps> = ({
  post,
  onClose,
}) => {
  const [parentComment, setparentComment] = useState<CommentType | null>(null);

  // ----------------------------
  // Animations
  // ----------------------------
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeOut" as any },
    },
    exit: {
      y: 80,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeIn" as any },
    },
  };
  return (
    <ProtectedRoute>
      <ModalPortal>
        <AnimatePresence>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-60 flex items-end lg:items-center justify-center bg-background-tertiary/80 backdrop-blur-xs"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className=" w-full  "
            >
              <div className=" h-[calc(100vh-110px)] bg-background rounded-lg flex flex-col justify-between">
                {/* User Info */}
                <div className="mb-4 flex h-fit items-center justify-between border-b border-border px-6 py-2 shrink-0">
                  <h2 className="text-base font-bold gap-2 flex items-center">
                    Comments
                  </h2>
                  <button
                    onClick={onClose}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary cursor-pointer"
                  >
                    <ImCross />
                  </button>
                </div>
                {/* Comments Section */}
                <div className="w-full h-full overflow-y-auto px-4 sm:px-6">
                  <CommentsSection
                    postId={post}
                    setparentComment={setparentComment}
                  />
                </div>

                <div className="h-fit shrink-0">
                  {/* Input Box */}
                  <CommentsInput
                    postId={post}
                    setparentComment={setparentComment}
                    parentComment={parentComment}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </ModalPortal>
    </ProtectedRoute>
  );
};

export default CommentsMobileSection;
