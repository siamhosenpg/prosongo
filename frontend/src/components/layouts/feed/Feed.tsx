"use client";
import React, { useRef, useEffect } from "react";
import Postbox from "@/components/ui/postcard/Postcard";
import SharePostCard from "@/components/ui/postcard/SharePostCard/SharePostCard";
import PostcardLoading from "@/components/ui/postcard/PostcardLoading";
import { useFeedPost } from "@/hook/usePost";
import { PostTypes } from "@/types/postType";

const Feed = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFeedPost();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { root: null, rootMargin: "200px", threshold: 1 },
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const allPosts: PostTypes[] = data.pages.flatMap((page) => page.posts);

  if (allPosts.length === 0) return <p>No posts found</p>;

  return (
    <div className="flex flex-col">
      {allPosts.map((post: PostTypes) =>
        post.content?.parentPost ? (
          <SharePostCard key={post._id} post={post} />
        ) : (
          <Postbox key={post._id} post={post} />
        ),
      )}

      <div ref={loadMoreRef} className="h-10" />

      {isFetchingNextPage && (
        <div className="text-center py-2">
          <PostcardLoading />
        </div>
      )}

      {!hasNextPage && allPosts.length > 0 && (
        <p className="text-center text-gray-500 py-22">No more posts</p>
      )}
    </div>
  );
};

export default Feed;
