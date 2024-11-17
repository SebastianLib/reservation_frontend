"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftSquareIcon, ArrowRightSquareIcon } from "lucide-react";
import React, { useState } from "react";
import InvitePeople from "./InvitePeople";

const BusinessSidebar = () => {
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div
      className={cn(
        "w-full max-w-[250px] bg-white h-screen fixed transition-all duration-300 ease-in-out pt-24", // Animacja dla przesunięcia
        open ? "left-0" : "-left-[210px] sm:-left-0"
      )}
    >
      <div className="flex justify-end absolute -right-1 top-[50%] -translate-y-[50%] sm:hidden">
        <div
          onClick={toggleSidebar}
          className="p-2 text-cyan-500 rounded-md w-fit"
        >
          {open ? (
            <ArrowLeftSquareIcon size={30} />
          ) : (
            <ArrowRightSquareIcon size={30} />
          )}
        </div>
      </div>

      <div className="ml-2">
        <InvitePeople/>
      </div>
    </div>
  );
};

export default BusinessSidebar;
