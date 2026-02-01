"use client";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaPause } from "react-icons/fa";

interface PostMediaAudioProps {
  audio: string[];
}

const PostMediaAudio: React.FC<PostMediaAudioProps> = ({ audio }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const waveSurfer = useRef<WaveSurfer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!waveformRef.current) return;

    waveSurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#d1d5db",
      progressColor: "#16CC06",
      cursorColor: "transparent",
      barWidth: 2,
      barRadius: 3,
      height: 40,

      normalize: true,
    });

    waveSurfer.current.load(audio[0]);

    waveSurfer.current.on("finish", () => {
      setIsPlaying(false);
    });

    return () => {
      waveSurfer.current?.destroy();
    };
  }, [audio]);

  const togglePlay = () => {
    if (!waveSurfer.current) return;
    waveSurfer.current.playPause();
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="w-full px-4 rounded-xl border border-border bg-background-secondary py-3">
      <div className="flex items-center gap-3">
        {/* Play / Pause Button */}
        <button
          onClick={togglePlay}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white  transition"
        >
          {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
        </button>

        {/* Waveform */}
        <div className="flex-1">
          <div ref={waveformRef} />
          <div className="mt-1 flex justify-between text-xs text-gray-500"></div>
        </div>
      </div>
    </div>
  );
};

export default PostMediaAudio;
