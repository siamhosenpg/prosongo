"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Suspense,
} from "react";
import ClipsBox from "@/components/ui/clipscard/ClipsBox";
import { useVideoPosts } from "@/hook/post/useVideoPosts";
import ClipsBoxSkeleton from "@/components/ui/clipscard/ClipsBoxSkeleton";
import { PostTypes } from "@/types/postType";

type PostWithRatio = {
  post: PostTypes;
  isPortrait: boolean;
};

export default function ReelsPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useVideoPosts();

  const [posts, setPosts] = useState<PostWithRatio[]>([]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!data?.pages?.length) return;

    const map = new Map<string, PostWithRatio>();
    posts.forEach((p) => map.set(p.post._id, p));

    const allPosts = data.pages.flatMap((page) => page.posts);

    (async () => {
      for (const post of allPosts) {
        if (map.has(post._id)) continue;
        const isPortrait = await checkVideoRatio(post.content.media);
        map.set(post._id, { post, isPortrait });
      }
      setPosts(Array.from(map.values()));
    })();
  }, [data]);

  const observeLast = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !hasNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) fetchNextPage();
        },
        { root: scrollRef.current, rootMargin: "200px", threshold: 0.1 },
      );

      observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage],
  );

  if (posts.length === 0) return <ClipsBoxSkeleton />;

  return (
    <div>
      <Suspense fallback={<ClipsBoxSkeleton />}>
        <main
          ref={scrollRef}
          className="h-[calc(100vh-104px)] lg:h-[calc(100vh-72px)]
        overflow-y-scroll snap-y snap-mandatory scroll-smooth"
        >
          {posts.map(({ post, isPortrait }, index) => (
            <ClipsBox
              key={post._id}
              ref={index === posts.length - 1 ? observeLast : null}
              post={post}
              isPortrait={isPortrait}
            />
          ))}

          {isFetchingNextPage && <ClipsBoxSkeleton />}
        </main>
      </Suspense>
    </div>
  );
}

function checkVideoRatio(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = src;
    video.preload = "metadata";
    video.onloadedmetadata = () =>
      resolve(video.videoWidth / video.videoHeight <= 9 / 16);
    video.onerror = () => resolve(false);
  });
}
