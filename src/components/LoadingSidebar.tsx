import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function LoadingSidebar() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-8 w-[140px]" />
      <Skeleton className="h-8 w-[170px]" />
      <Skeleton className="h-8 w-[140px]" />
      <Skeleton className="h-8 w-[150px]" />
    </div>
  );
}
