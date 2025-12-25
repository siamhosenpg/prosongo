"use client";

import React, { useState } from "react";
import { useCreateStory } from "@/hook/useStory";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hook/useAuth";

export default function CreateStoryPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { mutate: createStory, isPending } = useCreateStory();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState("24");

  // -------------------------
  // File Select Handler
  // -------------------------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  // -------------------------
  // Submit Story
  // -------------------------
  const handleSubmit = () => {
    if (!user) return alert("User not logged in");
    if (!file) return alert("Please select an image or video");

    const expireDate = new Date(
      Date.now() + Number(expiresAt) * 60 * 60 * 1000
    ).toISOString();

    createStory(
      {
        file,
        expiresAt: expireDate,
      },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Create Story</h1>

        {/* Upload Box */}
        <label className="relative flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {!preview ? (
            <div className="text-center space-y-2">
              <div className="text-4xl">📤</div>
              <p className="font-medium">Upload Image or Video</p>
              <p className="text-sm text-gray-500">
                Image (max 10MB) • Video (max 50MB)
              </p>
            </div>
          ) : (
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              {file?.type.startsWith("video") ? (
                <video
                  src={preview}
                  className="w-full h-full object-cover"
                  controls
                />
              ) : (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}
        </label>

        {/* Expire Time */}
        <div className="space-y-2">
          <label className="font-medium">Story Expire Time</label>
          <select
            className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500"
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
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition disabled:bg-blue-400 flex justify-center"
        >
          {isPending ? (
            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Share Story"
          )}
        </button>
      </div>
    </main>
  );
}
