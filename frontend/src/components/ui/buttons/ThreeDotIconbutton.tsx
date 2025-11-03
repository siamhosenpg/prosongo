"use client";
import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import DialogueBox from "../dialogueBox/DialogueBox";

const ThreeDotIconButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleDialogue = () => setIsOpen((prev) => !prev);

  // 🔹 Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative inline-block">
      <button
        onClick={toggleDialogue}
        className="p-2 rounded-full hover:bg-background-secondary transition"
      >
        <BsThreeDotsVertical className="text-xl text-secondary" />
      </button>

      {isOpen && (
        <div className="absolute right-0  z-40">
          <DialogueBox />
        </div>
      )}
    </div>
  );
};

export default ThreeDotIconButton;
