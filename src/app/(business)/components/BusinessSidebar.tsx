"use client";
import React, { useState } from "react";
import LoadingSidebar from "@/components/LoadingSidebar";
import InvitePeople from "./InvitePeople";
import { cn } from "@/lib/utils";
import { ArrowLeftSquareIcon, ArrowRightSquareIcon } from "lucide-react";
import { useBusinessAuthorization } from "@/hooks/useBusinessAuthorization";
import { ROLES } from "@/models/user";
import { useParams } from "next/navigation";
import { BusinessSidebarLinks } from "@/lib/BusinessSidebarLinks";
import Link from "next/link";
import { useSession } from "next-auth/react";

const BusinessSidebar = () => {
  const { id } = useParams();
  // const { business, session, loading, isOwner } = useBusinessAuthorization(
  //   id as string
  // );
  const { data: session, status: sessionStatus } = useSession();
  const [open, setOpen] = useState(false);
 
  if (sessionStatus === "loading") return <LoadingSidebar open={open} />;

  const toggleSidebar = () => setOpen((prev) => !prev);

  const filteredLinks = BusinessSidebarLinks.filter((link) =>
    link.access.includes(session?.user?.role!)
  );

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
        <ul className="flex flex-col gap-4">
        {session?.user.role === ROLES.OWNER && (
              <li className="text-lg font-semibold flex items-center gap-2 cursor-pointer">
                <InvitePeople />
              </li>
          )}
          {filteredLinks.map((label, index) => (
            <Link href={`/business/${id}/${label.link}`}>
              <li
                key={index}
                className="text-lg font-semibold flex items-center gap-2 cursor-pointer"
              >
                <label.icon size={20} />
                <span>{label.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BusinessSidebar;
