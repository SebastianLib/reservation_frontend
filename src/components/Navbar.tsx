"use client";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import MobileNavbar from "./MobileNavbar";
import { ROLES } from "@/models/user";
import JoinToTeam from "./JoinToTeam";

const Navbar = () => {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <header className=" bg-white py-4 fixed left-0 top-0 w-full z-50">
        <div className=" flex items-center justify-between gap-4 container mx-auto">
          <Link className="transition-colors hover:text-blue-500" href={"/"}>
            <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          </Link>
          <div className="flex gap-6">
            <Skeleton className="h-8 w-[100px]" />
            <Skeleton className="h-8 w-[100px]" />
            <Skeleton className="h-8 w-[120px] rounded-md" />
          </div>
        </div>
      </header>
    );

  return (
    <header className=" bg-white py-4 fixed left-0 top-0 w-full z-50 shadow-xl">
      <div className=" flex items-center justify-between gap-4 container mx-auto">
        <Link className="transition-colors hover:text-blue-500" href={"/"}>
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        </Link>

        {!session?.user ? (
          <div className="hidden md:flex gap-10 items-center">
            <Link
              href={"/api/auth/signin"}
              className="flex gap-4 text-xl font-semibold text-black/70 transition-colors hover:text-black"
            >
              Logowanie
            </Link>
            <Link
              href={"/signup"}
              className="flex gap-4 text-xl font-semibold text-black/70 transition-colors hover:text-black"
            >
              Rejestracja
            </Link>
            <Link
              href={"/signup-business"}
              className="flex gap-4 text-xl font-semibold text-cyan-500 py-2 px-4 rounded border-2 border-cyan-500 transition-colors
            hover:bg-cyan-500 hover:text-white"
            >
              Dodaj salon
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex gap-10 items-center">
            {session?.user.role === ROLES.WORKER && (
                <JoinToTeam />
            )}
            <Link
              href="/profile"
              className="flex gap-4 text-xl font-semibold text-black/70 transition-colors hover:text-black"
            >
              Mój Profil
            </Link>
            <button
              onClick={() => signOut()}
              className="flex gap-4 text-xl font-semibold text-red-500 transition-colors hover:text-red-400"
            >
              Wyloguj
            </button>
          </div>
        )}
        <div className="md:hidden">
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
