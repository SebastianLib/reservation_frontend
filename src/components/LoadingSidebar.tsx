import React from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

export default function LoadingSidebar({open}: {open: boolean}) {
  return (
    <div
      className={cn(
        "w-full max-w-[250px] bg-white h-screen fixed transition-all duration-300 ease-in-out pt-24 space-y-4",
        open ? "left-0" : "-left-[210px] sm:-left-0"
      )}
    >
      <Skeleton className="h-8 w-[140px]" />
      <Skeleton className="h-8 w-[170px]" />
      <Skeleton className="h-8 w-[140px]" />
      <Skeleton className="h-8 w-[150px]" />
    </div>
  );
}
