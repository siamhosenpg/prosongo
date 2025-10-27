import Feed from "@/components/layouts/feed/Feed";
import ProfileAbout from "@/components/layouts/profile/ProfileAbout";
import ProfileFollower from "@/components/layouts/profile/ProfileFollower";
import ProfilePhotoslist from "@/components/layouts/profile/ProfilePhotoslist";
import ProfileSectionlist from "@/components/layouts/profile/ProfileSectionlist";
import ProfileTopimage from "@/components/layouts/profile/ProfileTopimage";
import ProfileVideos from "@/components/layouts/profile/ProfileVideos";
import UploadBox from "@/components/layouts/uploadbox/UploadBox";
import React from "react";

const Profile = () => {
  return (
    <div className="bg-background-secondary">
      <div className="Pagearea">
        <div className=" pt-0 md:pt-4 flex flex-col lg:flex-row gap-6 items-start justify-between overflow-visible">
          <div className="  w-full lg:w-7/12 static lg:sticky space-y-4">
            <ProfileTopimage />
            <ProfileSectionlist />
            <ProfileAbout />
            <ProfileFollower />
            <ProfilePhotoslist />
            <ProfileVideos />
          </div>

          <div className=" flex-1 w-full lg:w-5/12">
            <UploadBox />

            <ul className="mt-4">
              <div className="">
                <Feed />;
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
