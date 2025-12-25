"use client";

import React, { useEffect, useRef, useState } from "react";

interface ExpandableTextProps {
  text: string;
  maxLines?: number; // default 4
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  maxLines = 4,
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // ----------------------------
  // Check if text exceeds lines
  // ----------------------------
  useEffect(() => {
    if (!textRef.current) return;

    const el = textRef.current;

    // Temporarily remove clamp to measure real height
    el.classList.remove("line-clamp-" + maxLines);

    const fullHeight = el.scrollHeight;

    // Re-apply clamp
    el.classList.add("line-clamp-" + maxLines);

    const clampedHeight = el.clientHeight;

    setIsOverflowing(fullHeight > clampedHeight);
  }, [text, maxLines]);

  return (
    <div className="space-y-1">
      <p
        ref={textRef}
        className={`text-sm text-gray-800 leading-relaxed whitespace-pre-line ${
          !isExpanded ? `line-clamp-${maxLines}` : ""
        }`}
      >
        {text}
      </p>

      {/* See More / Show Less */}
      {isOverflowing && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          {isExpanded ? "Show less" : "See more"}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
