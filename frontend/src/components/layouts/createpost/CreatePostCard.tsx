"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ImCross } from "react-icons/im";
import { FaPlus } from "react-icons/fa";

import { useAuth } from "@/hook/useAuth";

import { usePost } from "@/hook/usePost";
import { UserType } from "@/types/userType";
import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";
import ModalPortal from "../ModalPortal";

import { motion, AnimatePresence } from "framer-motion";

interface PostData {
  content: {
    caption: string;
    media?: string[];
    type: "image" | "video" | "text";
    location?: string;
    tags?: string[];
    mentions?: string[];
  };
  privacy: "public" | "private" | "friends";
}

// =============================
// 🟦 SANITIZE FUNCTION
// =============================
const sanitizeCaption = (text: string) => {
  if (typeof text !== "string") return text;
  return text.replace(/\n{3,}/g, "\n\n").replace(/ {6,}/g, "     ");
};

interface CreatePostCardProps {
  onClose: () => void;
}

const CreatePostCard = ({ onClose }: CreatePostCardProps) => {
  const { user, isLoading } = useAuth() as {
    user: UserType | null;
    isLoading: boolean;
  };

  const router = useRouter();
  const { createPost, createPostLoading } = usePost();

  // ----------------------------
  // 🧠 Local States
  // ----------------------------
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [mediaList, setMediaList] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState<"public" | "private" | "friends">(
    "public"
  );

  // ----------------------------
  // Helpers
  // ----------------------------
  const handleAddImage = () => {
    if (!imageUrl.trim()) return;
    setMediaList((prev) => [...prev, imageUrl]);
    setImageUrl("");
  };

  const detectPostType = (): "image" | "video" | "text" => {
    if (mediaList.length > 0) {
      const first = mediaList[0];
      return /\.(mp4|mov|mkv)$/i.test(first) ? "video" : "image";
    }
    return "text";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalCaption = sanitizeCaption(caption);

    if (!finalCaption.trim() && mediaList.length === 0) {
      alert("Post cannot be empty!");
      return;
    }

    const body: PostData = {
      content: {
        caption: finalCaption,
        media: mediaList,
        type: detectPostType(),
        location,
        tags: [],
        mentions: [],
      },
      privacy,
    };

    createPost(body, {
      onSuccess: () => {
        setCaption("");
        setImageUrl("");
        setMediaList([]);
        setLocation("");
        onClose(); // ✅ modal hide
        router.push("/"); // ✅ redirect
      },
      onError: (err: any) => {
        alert(err?.message || "Failed to create post");
      },
    });
  };

  // ----------------------------
  // Auth Handling
  // ----------------------------
  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="p-4 text-center text-red-500 font-semibold">
        Please login to create a post.
      </div>
    );
  }

  // ----------------------------
  // UI
  // ----------------------------

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      y: 80,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: "easeOut" as any,
      },
    },
    exit: {
      y: 80,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: "easeIn" as any,
      },
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
            className="fixed inset-0 z-60 flex items-end lg:items-center justify-center  bg-background-tertiary/80 backdrop-blur-xs"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="-mt-12 w-full lg:w-2/6 rounded-2xl rounded-b-none lg:rounded-b-2xl  border border-white/30 bg-background p-6 shadow-2xl"
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-bold gap-2 flex items-center">
                  <FaPlus />
                  Create a Post
                </h2>
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary"
                >
                  <ImCross />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Caption */}
                <textarea
                  rows={5}
                  placeholder={`What's on your mind, ${user.name}?`}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="rounded-lg border border-border bg-white/70 p-4 text-gray-900 
              transition-all focus:ring-2 focus:ring-blue-400"
                />

                {/* Location */}
                <input
                  type="text"
                  placeholder="📍 Add location (optional)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="rounded-lg border border-border bg-white/70 p-3 text-gray-900 
              transition-all focus:ring-2 focus:ring-purple-400"
                />

                {/* Add Image */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Image URL"
                    className="w-full rounded-lg border border-border bg-white/70 p-3 text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="rounded-lg bg-accent px-4 py-2 text-white active:scale-95"
                  >
                    Add
                  </button>
                </div>

                {/* Media Preview */}
                {mediaList.length > 0 && (
                  <div className="w-full rounded-xl border border-white/40 bg-white/50">
                    {detectPostType() === "image" ? (
                      <div className="flex gap-3 overflow-x-auto p-2">
                        {mediaList.map((url, i) => (
                          <img
                            key={i}
                            src={url}
                            className="w-2/6 rounded-xl border"
                          />
                        ))}
                      </div>
                    ) : (
                      <video
                        src={mediaList[0]}
                        controls
                        className="w-full rounded-xl border"
                      />
                    )}
                  </div>
                )}

                {/* Bottom Controls */}
                <div className="flex items-center justify-between">
                  <select
                    value={privacy}
                    onChange={(e) =>
                      setPrivacy(
                        e.target.value as "public" | "private" | "friends"
                      )
                    }
                    className="w-[45%] rounded-lg border border-border bg-white/70 p-3 text-gray-900"
                  >
                    <option value="public">🌍 Public</option>
                    <option value="friends">👥 Friends</option>
                    <option value="private">🔒 Private</option>
                  </select>

                  <button
                    type="submit"
                    disabled={createPostLoading}
                    className="rounded-lg bg-accent px-8 py-3 text-white 
                transition-all hover:scale-105 active:scale-95"
                  >
                    {createPostLoading ? "Posting..." : "Share"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </ModalPortal>
    </ProtectedRoute>
  );
};

export default CreatePostCard;
