import ImageSection from "@/components/layouts/postprevew/ImageSection";
import { getSinglePost } from "@/lib/post/feedPosts";
import PrevewVideoSection from "@/components/layouts/postprevew/PostPrevewVideo";
import PostPrevewRight from "@/components/layouts/postprevew/PostPrevewRight";
import PostMediaAudio from "@/components/ui/postcard/audio/PostMediaAudio";
interface PageProps {
  params: Promise<{ postId: string }>; // Promise না দেওয়া
  searchParams: { [key: string]: string | undefined };
}

// ✅ Dynamic metadata
export async function generateMetadata({ params }: PageProps) {
  const { postId } = await params;
  const post = await getSinglePost(postId);

  if (!post) {
    return {
      title: "Post Not Found - Prosongo",
      description: "This post does not exist on Prosongo.",
    };
  }

  return {
    title: post.content.caption
      ? `${post.content.caption} - Prosongo`
      : "Post Preview - Prosongo",
    description: `Preview of a single post on Prosongo social media platform.`,
  };
}

const Post = async ({ params, searchParams }: PageProps) => {
  // Convert ID safely
  const { postId } = await params;

  // Convert index safely (fallback = 0)
  const index = Number(searchParams.index) ? Number(searchParams.index) : 0;

  // API Call
  const post = await getSinglePost(postId);

  if (!post) {
    return <div className="text-center mt-10">Post not found</div>;
  }

  return (
    <div className="Pagearea">
      <div className="mt-0 sm:mt-4 flex flex-col md:flex-row items-start justify-between gap-6">
        {/* Left: Image Section */}
        {post.content.type === "image" ? (
          <ImageSection media={post.content.media} index={index} />
        ) : post.content.type === "video" ? (
          <PrevewVideoSection media={post.content.media} />
        ) : post.content.type === "text" ? (
          <div className="leftArea w-full md:w-8/12 h-[calc(100vh-110px)] relative p-6 bg-background border-border border-none lg:border rounded-none sm:rounded-lg overflow-y-auto">
            <p className="posttext  whitespace-pre-wrap font-medium">
              {post.content.caption}
            </p>
          </div>
        ) : post.content.type === "audio" ? (
          <div className="leftArea w-full md:w-8/12 h-[calc(100vh-110px)] relative p-6 bg-background border-border border-none lg:border rounded-none sm:rounded-lg overflow-y-auto">
            <PostMediaAudio audio={post.content.media} />
          </div>
        ) : null}

        {/* Right: Details */}
        <PostPrevewRight post={post} />
      </div>
    </div>
  );
};

export default Post;
