"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import TanstackProvider from "@/providers/TanstackProvider";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <TanstackProvider>
      <SessionProvider>{children}</SessionProvider>
    </TanstackProvider>
  );
};

export default Providers;
