"use client";

import React from "react";
import {
  format,
  isToday,
  isYesterday,
  differenceInDays,
  differenceInMinutes,
  differenceInHours,
} from "date-fns";

interface DateTimeProps {
  date: string | Date;
}

const DateTime: React.FC<DateTimeProps> = ({ date }) => {
  const parsedDate = new Date(date);
  const now = new Date();

  const minutes = differenceInMinutes(now, parsedDate);
  const hours = differenceInHours(now, parsedDate);

  // 1️⃣ Just now (0–1 min)
  if (minutes < 1) {
    return <span>Just now</span>;
  }

  // 2️⃣ Under 60 minutes
  if (minutes < 60) {
    return <span>{minutes} minutes ago</span>;
  }

  // 3️⃣ Under 12 hours
  if (hours < 12) {
    return <span>{hours} hours ago</span>;
  }

  // 4️⃣ After 12 hours → your old logic starts

  // Today
  if (isToday(parsedDate)) {
    return <span>Today, {format(parsedDate, "h:mm a")}</span>;
  }

  // Yesterday
  if (isYesterday(parsedDate)) {
    return <span>Yesterday, {format(parsedDate, "h:mm a")}</span>;
  }

  const daysDiff = differenceInDays(now, parsedDate);

  // Within last 7 days
  if (daysDiff < 7) {
    return <span>{format(parsedDate, "EEEE, h:mm a")}</span>;
  }

  // Within this year
  if (parsedDate.getFullYear() === now.getFullYear()) {
    return <span>{format(parsedDate, "MMM d, h:mm a")}</span>;
  }

  // Older
  return <span>{format(parsedDate, "MMM d, yyyy")}</span>;
};

export default DateTime;
