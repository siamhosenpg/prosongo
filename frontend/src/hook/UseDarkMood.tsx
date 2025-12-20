"use client";
// hooks/useDarkMode.js
import { useEffect, useState } from "react";

type UseDarkModeReturn = [boolean, () => void];
export const useDarkMode = (): UseDarkModeReturn => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
    if (saved) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle function
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return [darkMode, toggleDarkMode];
};
