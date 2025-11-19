import React from "react";

const StoryPageLeft = () => {
  const users = [
    {
      id: 1,
      name: "Siam Hosen",
      title: "Website Developer",
      img: "/images/profile.jpg",
    },
    {
      id: 2,
      name: "Sabnur Hasniyara",
      title: "Content Creator | Designer",
      img: "/images/profile.jpg",
    },
    {
      id: 3,
      name: "Rofique Akbar",
      title: "Project Manager",
      img: "/images/profile.jpg",
    },
    {
      id: 4,
      name: "Asif Mahmud",
      title: "Website Developer",
      img: "/images/profile.jpg",
    },
  ];

  return (
    <div className="w-full h-auto max-h-full bg-background rounded-lg overflow-hidden p-4 flex flex-col gap-1">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-2 px-3 py-3 hover:bg-background-secondary rounded-lg"
        >
          <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-[#06af3e] via-[#01b88a] to-[#8bd401] rounded-full overflow-hidden p-[3px]">
            <div className="p-[3px] bg-background rounded-full">
              <img
                loading="lazy"
                className="aspect-square w-full h-full block rounded-full bg-background-secondary object-cover"
                src={user.img}
                alt={user.name}
              />
            </div>
          </div>
          <div>
            <span className="font-bold block">{user.name}</span>
            <span>{user.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoryPageLeft;
