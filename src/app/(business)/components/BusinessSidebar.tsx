"use client";
import { cn } from "@/lib/utils";
import { ArrowLeftSquareIcon, ArrowRightSquareIcon } from "lucide-react";
import React, { useState } from "react";
import InvitePeople from "./InvitePeople";
import { useSession } from "next-auth/react";
import LoadingSidebar from "@/components/LoadingSidebar";
import { ROLES } from "@/models/user";
import { redirect, useParams } from "next/navigation";

const BusinessSidebar = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };
  console.log(session?.user);

  const isWorker = session?.user?.businesses.some(business=> business.id === Number(id))
  const isOwner = session?.user?.ownedBusinesses.some(business => business.id === Number(id))
  if (!isWorker && !isOwner) {
    redirect("/");
  }

  return (
    <div
      className={cn(
        "w-full max-w-[250px] bg-white h-screen fixed transition-all duration-300 ease-in-out pt-24",
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
        {status === "loading" ? (
          <LoadingSidebar />
        ) : (
          <ul className="flex flex-col gap-4">
            {session?.user.role === ROLES.OWNER && (
              <li className="text-lg font-semibold flex items-center gap-2 cursor-pointer">
                <InvitePeople />
              </li>
            )}
            <li className="text-lg font-semibold flex items-center gap-2 cursor-pointer">
              <span>Grafiki</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default BusinessSidebar;
