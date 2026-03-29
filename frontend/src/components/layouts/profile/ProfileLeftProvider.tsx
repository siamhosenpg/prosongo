"use client";
import React, { useRef, useEffect, useState } from "react";

interface ProfileLeftProviderProps {
  children: React.ReactNode;
}

const ProfileLeftProvider = ({ children }: ProfileLeftProviderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [topValue, setTopValue] = useState(0);

  useEffect(() => {
    const calculateTop = () => {
      const el = ref.current;
      if (!el) return;

      const containerHeight = el.offsetHeight; // faster than getBoundingClientRect
      const viewportHeight = window.innerHeight;

      let newTop = 0;

      if (containerHeight > viewportHeight) {
        newTop = viewportHeight - containerHeight;
      }

      setTopValue(newTop);
    };

    // initial run
    calculateTop();

    // resize + content change safe
    window.addEventListener("resize", calculateTop);

    // optional: observe content changes (🔥 pro feature)
    const resizeObserver = new ResizeObserver(calculateTop);
    if (ref.current) resizeObserver.observe(ref.current);

    return () => {
      window.removeEventListener("resize", calculateTop);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ top: `${topValue}px` }}
      className="w-full lg:w-7/12 static lg:sticky space-y-4 transition-all duration-300"
    >
      {children}
    </div>
  );
};

export default ProfileLeftProvider;
