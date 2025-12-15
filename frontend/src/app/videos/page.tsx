"use client";

import React, { useEffect, useState } from "react";
import ClipsBox from "@/components/ui/clipscard/ClipsBox";

type VideoItem = {
  src: string;
  isPortrait: boolean; // ✅ ratio result
};

export default function ReelsPage() {
  const videoSources = [
    "/videos/video3.mp4",
    "/videos/video1.mp4",
    "/videos/vd.mp4",
    "/videos/video3.mp4",
    "/videos/video1.mp4",
    "/videos/video.mp4",
  ];

  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      const results: VideoItem[] = [];

      for (const src of videoSources) {
        const isPortrait = await checkVideoRatio(src);
        results.push({ src, isPortrait });
      }

      setVideos(results);
    };

    loadVideos();
  }, []);

  return (
    <div>
      <main className="h-[calc(100vh-120px)] lg:h-[calc(100vh-72px)] overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        {videos.map((video, idx) => (
          <ClipsBox key={idx} src={video.src} isPortrait={video.isPortrait} />
        ))}
      </main>
    </div>
  );
}

/* 🔥 helper function */
function checkVideoRatio(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = src;
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      const ratio = video.videoWidth / video.videoHeight;
      resolve(ratio <= 9 / 16); // true = portrait
    };

    video.onerror = () => resolve(false);
  });
}
