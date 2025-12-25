import PeoplesArea from "@/components/layouts/peoples/PeoplesArea";
import { ProtectedRoute } from "@/components/Protected/ProtectedRoute";
import React from "react";

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
