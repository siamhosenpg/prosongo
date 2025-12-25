// components/UserBadge.tsx
import React from "react";
import { HiCheckBadge } from "react-icons/hi2";

interface UserBadgeProps {
  badges?: string[];
  variants?: string;
}
const UserBadge: React.FC<UserBadgeProps> = ({ variants, badges = [] }) => {
  return (
    <span className={`w-fit  ${variants ? "text-white" : "text-accent"}`}>
      {badges.includes("greenmark") && <HiCheckBadge />}
    </span>
  );
};
export default UserBadge;
