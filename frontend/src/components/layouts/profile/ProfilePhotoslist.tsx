import React from "react";

const ProfilePhotoslist = () => {
  return (
    <div>
      <div className=" px-6 lg:px-12 py-4 bg-background rounded-lg w-full mb-4 gap-8">
        <h2 className="text-lg font-bold text-loose">Photos</h2>
        <div className="grid grid-cols-4 gap-2 lg:gap-5 mt-6">
          <div className="w-full rounded-md overflow-hidden border-border border">
            <img
              src="/public/post/4.jpg"
              className=" aspect-square rounded-md"
              alt=""
            />
          </div>
          <div className="w-full rounded-md overflow-hidden border-border border">
            <img
              src="/public/post/4.jpg"
              className=" aspect-square rounded-md"
              alt=""
            />
          </div>
          <div className="w-full rounded-md overflow-hidden border-border border">
            <img
              src="/public/post/4.jpg"
              className=" aspect-square rounded-md"
              alt=""
            />
          </div>
          <div className="w-full rounded-md overflow-hidden border-border border">
            <img
              src="/public/post/4.jpg"
              className=" aspect-square rounded-md"
              alt=""
            />
          </div>
          <div className="w-full rounded-md overflow-hidden border-border border">
            <img
              src="/public/post/4.jpg"
              className=" aspect-square rounded-md"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoslist;
