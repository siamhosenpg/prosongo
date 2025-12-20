import React from "react";

const Lists = [
  { id: 1, name: "About", link: "about" },
  { id: 2, name: "Follower", link: "follower" },
  { id: 3, name: "Photos", link: "photos" },
  { id: 4, name: "Videos", link: "video" },
];
const ProfileSectionlist = () => {
  return (
    <div>
      <div className="flex items-center px-6 lg:px-12 py-4 bg-background rounded-lg w-full mb-4 gap-8">
        {Lists.map((list) => (
          <div
            key={list.id}
            className="text-loose  font-semibold text-sm cursor-pointer"
          >
            {list.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSectionlist;
