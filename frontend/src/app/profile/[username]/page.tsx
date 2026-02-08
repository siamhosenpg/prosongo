import ProfileFeed from "@/components/layouts/feed/ProfileFeed";
import ProfileAbout from "@/components/layouts/profile/ProfileAbout";
import ProfileFollower from "@/components/layouts/profile/ProfileFollower";
import ProfilePhotoslist from "@/components/layouts/profile/ProfilePhotoslist";
import ProfileTopimage from "@/components/layouts/profile/ProfileTopimage";
import UploadBox from "@/components/layouts/uploadbox/UploadBox";
import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";

import { getUserByUsername } from "@/lib/user/userData";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}
export async function generateMetadata({ params }: PageProps) {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    return {
      title: "User Not Found - Prosongo",
      description: "This user does not exist on Prosongo.",
    };
  }
  return {
    title: `${user.name} (@${user.username}) - Prosongo Profile`,
    description: `View the profile of ${user.name} (@${user.username}) on Prosongo, a full-stack social media platform. Explore their posts, followers, and photos.`,
  };
}

const Profile = async ({ params }: PageProps) => {
  const { username } = await params;

  const user = await getUserByUsername(username);

  if (!user) {
    return <div className="text-center mt-10">User not found </div>;
  }

  return (
    <ProtectedRoute>
      <div className="bg-background-secondary">
        <div className="Pagearea">
          <div className="pt-0 md:pt-4 flex flex-col lg:flex-row gap-6 items-start justify-between overflow-visible">
            {/* LEFT SIDE */}
            <div className="w-full lg:w-7/12 static lg:sticky space-y-4">
              <ProfileTopimage user={user} />

              <ProfileAbout user={user} />
              <ProfileFollower userId={user._id} />
              <ProfilePhotoslist userId={user._id} />
            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 w-full lg:w-5/12">
              <UploadBox />

              <ul className="mt-4">
                <div className="pb-18">
                  <ProfileFeed userid={user?._id} />
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
