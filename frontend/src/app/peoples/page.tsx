import PeoplesArea from "@/components/layouts/peoples/PeoplesArea";
import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";
import React from "react";

export const metadata = {
  title: "Peoples - Prosongo",
  description:
    "Discover and connect with people on Prosongo, a full-stack social media platform. Explore profiles, follow friends, and engage with a vibrant community. Join Prosongo today to share your moments and connect with others!",
};

const Peoples = () => {
  return (
    <ProtectedRoute>
      <div className="Pagearea">
        <PeoplesArea />
      </div>
    </ProtectedRoute>
  );
};

export default Peoples;
