import { link } from "fs";
import React from "react";

import { RiHeartAdd2Line } from "react-icons/ri"; // Icon for Interested button
import { TbHeartX } from "react-icons/tb"; // Icon for Not Interested button
import { MdBookmarkBorder } from "react-icons/md"; // Icon for bookmark
import { RiUserFollowLine } from "react-icons/ri"; // Icon for Follow Post Author
import { RiStopCircleLine } from "react-icons/ri"; // Icon for Mute Post Author
import { LuCopyCheck } from "react-icons/lu"; // Icon for Copy Link to Post
import { ImEmbed2 } from "react-icons/im"; // Icon for Embed Post
import { MdNotificationsNone } from "react-icons/md"; // Icon for Turn on Post Notifications
import { RiFlagLine } from "react-icons/ri"; // Icon for Report Post
import { MdDeleteOutline } from "react-icons/md"; // Icon for Delete Post
import { MdEditNote } from "react-icons/md"; // Icon for Edit Post

const dialougedata = [
  {
    title: "Interested",
    links: "",
    icon: RiHeartAdd2Line,
  },
  {
    title: "Not Interested",
    links: "",
    icon: TbHeartX,
  },
  {
    title: "Save Post",
    links: "",
    icon: MdBookmarkBorder,
  },
  {
    title: "Follow Post Author",
    links: "",
    icon: RiUserFollowLine,
  },
  {
    title: "Mute Post Author",
    links: "",
    icon: RiStopCircleLine,
  },
  {
    title: "Copy Link to Post",
    links: "",
    icon: LuCopyCheck,
  },
  {
    title: "Embed Post",
    links: "",
    icon: ImEmbed2,
  },
  {
    title: "Turn on Notifications",
    links: "",
    icon: MdNotificationsNone,
  },

  {
    title: "Report Post",
    links: "",
    icon: RiFlagLine,
  },
  {
    title: "Delete Post",
    links: "",
    icon: MdDeleteOutline,
  },
  {
    title: "Edit Post",
    links: "",
    icon: MdEditNote,
  },
];

const DialogueBox = () => {
  return (
    <div className=" absolute text-left z-40 right-3 border-border border bg-background rounded-lg  w-fit max-w-[400px] min-w-[300px] py-2">
      <div className="px-2">
        <div className=" px-4 py-2 border-b border-border text-secondary font-semibold">
          <strong className="block font-semibold">
            Why am I seeing this post?
          </strong>
          <span className="font-medium text-[13px]">
            Becouse this this user you followed
          </span>
        </div>
      </div>
      <ul className="p-2">
        {dialougedata.map((data, index) => {
          const Icon = data.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 px-6  py-3 hover:bg-background-secondary cursor-pointer rounded-md"
            >
              <div className="text-xl text-secondary ">
                <Icon />
              </div>
              <strong className="font-semibold">{data.title}</strong>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default DialogueBox;
