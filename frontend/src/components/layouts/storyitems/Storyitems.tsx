"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";

import StoryAdd from "@/components/ui/storycard/StoryAdd";
import StoryCard from "@/components/ui/storycard/StoryCard";
import { useStories } from "@/hook/useStory";
import StoryCardSkeleton from "@/components/ui/storycard/StoryCardSkeleton";

const CARD_WIDTH = 140;
const SCROLL_COUNT = 3;
const SCROLL_AMOUNT = CARD_WIDTH * SCROLL_COUNT;
const THRESHOLD = 2; // px (floating scroll bug fix)

const Storyitems = () => {
  const { data: stories = [], isLoading } = useStories();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  // ==========================
  // Button State Calculation
  // ==========================
  const updateButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setShowLeft(scrollLeft > THRESHOLD);
    setShowRight(scrollLeft + clientWidth < scrollWidth - THRESHOLD);
  }, []);

  // ==========================
  // Scroll Handlers
  // ==========================
  const scrollLeftHandler = () => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });

    requestAnimationFrame(updateButtons);
  };

  const scrollRightHandler = () => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });

    requestAnimationFrame(updateButtons);
  };

  // ==========================
  // Attach Scroll Listener
  // ==========================
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateButtons(); // initial

    el.addEventListener("scroll", updateButtons, { passive: true });

    return () => {
      el.removeEventListener("scroll", updateButtons);
    };
  }, [updateButtons, stories.length]);

  if (!stories.length && !isLoading) return null;

  return (
    <div className="relative flex items-center">
      {/* Left Button */}
      {showLeft && (
        <div className="absolute hidden lg:block left-2 z-40">
          <button
            onClick={scrollLeftHandler}
            className="h-10 w-10 flex items-center justify-center bg-background rounded-full shadow-xl"
          >
            <FaCaretLeft className="text-lg" />
          </button>
        </div>
      )}

      {/* Scroll Area */}
      <div
        ref={scrollRef}
        className="flex w-full items-center gap-2 mb-2 sm:mb-4 bg-background rounded-lg py-3 sm:py-4 px-4 lg:px-6 overflow-x-auto scroll-smooth ScrollbarHide"
      >
        <StoryAdd />

        <div className="flex items-center gap-2">
          {isLoading && (
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <StoryCardSkeleton key={i} />
              ))}
            </div>
          )}

          {stories.map((story) => (
            <StoryCard key={story._id} stories={story} />
          ))}
        </div>
      </div>

      {/* Right Button */}
      {showRight && (
        <div className="absolute hidden lg:block right-2 z-40">
          <button
            onClick={scrollRightHandler}
            className="h-10 w-10 flex items-center justify-center bg-background rounded-full shadow-xl"
          >
            <FaCaretRight className="text-lg" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Storyitems;
