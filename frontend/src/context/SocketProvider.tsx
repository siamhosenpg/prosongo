"use client";

import { ReactNode, useEffect } from "react";
import { getSocket } from "../lib/socket";

type Props = {
  children: ReactNode;
};

export const SocketProvider = ({ children }: Props) => {
  useEffect(() => {
    getSocket(); // শুধু connect করবে

    // ⚠️ এখানে disconnect করবে না
  }, []);

  return <>{children}</>;
};
