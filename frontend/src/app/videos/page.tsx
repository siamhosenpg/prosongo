"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import ClipsBox from "@/components/ui/clipscard/ClipsBox";
import { useVideoPosts } from "@/hook/post/useVideoPosts";
import ClipsBoxSkeleton from "@/components/ui/clipscard/ClipsBoxSkeleton";
import { PostTypes } from "@/types/postType";

type PostWithRatio = {
  post: PostTypes;
  isPortrait: boolean;
};

export default function ReelsPage() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useVideoPosts();

  const [posts, setPosts] = useState<PostWithRatio[]>([]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  /* Merge new pages safely */
  useEffect(() => {
    if (!data?.pages?.length) return;

    const allPosts = data.pages.flatMap((page) => page.posts);

    const newPosts = allPosts.filter(
      (p) => !posts.some((old) => old.post._id === p._id),
    );

    if (!newPosts.length) return;

    (async () => {
      const results: PostWithRatio[] = [];

      for (const post of newPosts) {
        const isPortrait = await checkVideoRatio(post.content.media);
        results.push({ post, isPortrait });
      }

      setPosts((prev) => [...prev, ...results]);
    })();
  }, [data, posts]);

  /* Stable Intersection Observer */
  const observeLast = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        {
          root: scrollRef.current,
          threshold: 0.6,
        },
      );

      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  if (isLoading) return <ClipsBoxSkeleton />;
  if (error) return <p>Something went wrong</p>;

  return (
    <div>
      <main
        ref={scrollRef}
        className="h-[calc(100vh-104px)] lg:h-[calc(100vh-72px)]
        overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        {posts.map(({ post, isPortrait }, index) => {
          const triggerIndex = posts.length - 2;

          return (
            <ClipsBox
              key={post._id}
              ref={index === triggerIndex ? observeLast : null}
              post={post}
              isLoading={isLoading}
              isPortrait={isPortrait}
            />
          );
        })}

        {isFetchingNextPage && <ClipsBoxSkeleton />}
      </main>
    </div>
  );
}

/* Video Ratio Checker */
function checkVideoRatio(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = src;
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      const ratio = video.videoWidth / video.videoHeight;
      resolve(ratio <= 9 / 16);
    };

    video.onerror = () => resolve(false);
  });
}
