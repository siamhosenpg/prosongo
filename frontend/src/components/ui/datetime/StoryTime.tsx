"use client";

import React from "react";
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

interface StoryTimeProps {
  date: string | Date;
}

const StoryTime: React.FC<StoryTimeProps> = ({ date }) => {
  const created = new Date(date);
  const now = new Date();

  const minutes = differenceInMinutes(now, created);
  const hours = differenceInHours(now, created);
  const days = differenceInDays(now, created);

  // 1️⃣ Less than 1 minute
  if (minutes < 1) return <span>Just now</span>;

  // 2️⃣ Less than 1 hour
  if (minutes < 60) return <span>{minutes} minutes ago</span>;

  // 3️⃣ Less than 24 hours
  if (hours < 24) return <span>{hours} hours ago</span>;

  // 4️⃣ Less than 7 days
  if (days < 7)
    return (
      <span>
        {days} {days === 1 ? "day" : "days"} ago
      </span>
    );

  // 5️⃣ Above 7 days (nothing show)
  return null;
};

export default StoryTime;
