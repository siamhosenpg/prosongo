import { useState } from "react";
import { IoVolumeMute } from "react-icons/io5";
import { FiVolume2 } from "react-icons/fi";

const GlobalSoundToggle = () => {
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);

    window.dispatchEvent(
      new CustomEvent("reels-sound-toggle", {
        detail: next, // true = muted, false = unmuted
      })
    );
  };

  return (
    <button
      onClick={toggleSound}
      className={`absolute   bg-transparent  top-0 right-0 z-50 w-12 h-12 p-2 flex items-center justify-center  text-shadow-2xs rounded-full cursor-pointer 
       `}
    >
      <div className="text-white border rounded-full p-0.5 text-shadow-lg  text-shadow-black  border-white ">
        {" "}
        {muted ? (
          <IoVolumeMute className="text-base text-shadow-2xs" />
        ) : (
          <FiVolume2 className="text-base text-shadow-2xs" />
        )}
      </div>
    </button>
  );
};

export default GlobalSoundToggle;
