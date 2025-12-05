"use client";

import React, { useState } from "react";
import { useCreateStory } from "@/hook/useStory";
import { useAuth } from "@/hook/useAuth";
import { useRouter } from "next/navigation";

export default function CreateStoryPage() {
  const { user } = useAuth();
  const userId = user?.user?._id;
  const { mutate: createStory, isPending } = useCreateStory();

  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [expiresAt, setExpiresAt] = useState("24");
  const router = useRouter();

  const handleSubmit = () => {
    if (!userId) return alert("User not logged in");

    // Validate only 1 URL allowed
    if (imageUrl && videoUrl) {
      return alert("Too many URLs — only one is allowed.");
    }

    const selectedUrl = mediaType === "image" ? imageUrl : videoUrl;

    if (!selectedUrl) {
      return alert(`Please provide a valid ${mediaType} URL`);
    }

    const storyData = {
      userId,
      media: {
        url: selectedUrl,
        type: mediaType,
      },

      expiresAt: new Date(Date.now() + Number(expiresAt) * 60 * 60 * 1000),
    };

    createStory(storyData);
    router.push("/");
  };

  return (
    <main className="min-h-screen flex justify-center px-4 py-10 bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Create New Story</h1>

        {/* Media Type Select */}
        <div className="space-y-2">
          <p className="font-medium">Select Media Type</p>
          <select
            className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-400"
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value as "image" | "video")}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        {/* Image URL Input */}
        <div className="space-y-2">
          <p className="font-medium">Image URL</p>
          <input
            type="text"
            placeholder="Enter image URL"
            className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
            disabled={mediaType !== "image"}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        {/* Video URL Input */}
        <div className="space-y-2">
          <p className="font-medium">Video URL</p>
          <input
            type="text"
            placeholder="Enter video URL"
            className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
            disabled={mediaType !== "video"}
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>

        {/* Expire Time */}
        <div className="space-y-2">
          <p className="font-medium">Story Expire Time</p>
          <select
            className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-400"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
          >
            <option value="6">6 Hours</option>
            <option value="12">12 Hours</option>
            <option value="24">24 Hours</option>
            <option value="48">48 Hours</option>
          </select>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-400 flex justify-center"
        >
          {isPending ? (
            <div className="animate-spin w-5 h-5 border-4 border-white border-t-transparent rounded-full"></div>
          ) : (
            "Create Story"
          )}
        </button>
      </div>
    </main>
  );
}
