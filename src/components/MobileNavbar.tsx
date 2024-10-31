"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession(); // Odczytujemy sesję

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu width={30} height={30} />
      </SheetTrigger>
      <SheetContent aria-describedby="menu-navigation-description">
        <SheetHeader className="pt-12">
          <SheetTitle className="text-3xl font-bold text-center text-cyan-500">
            Menu
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-8 px-6 pt-12">
          <ul className="flex flex-col gap-8 items-center">
            <li className="text-xl cursor-pointer transition-color duration-300 font-bold">
              <Link href="/" onClick={closeMenu}>
                Strona Główna
              </Link>
            </li>
            {!session?.user ? (
              <>
                <li className="text-xl cursor-pointer transition-color duration-300 font-bold">
                  <Link href="/api/auth/signin" onClick={closeMenu}>
                    Logowanie
                  </Link>
                </li>
                <li className="text-xl cursor-pointer transition-color duration-300 font-bold">
                  <Link href="/signup" onClick={closeMenu}>
                    Rejestracja
                  </Link>
                </li>
                <li className="text-xl cursor-pointer transition-color duration-300 text-cyan-500 font-bold">
                  <Link href="/signup-business" onClick={closeMenu}>
                    Dodaj Salon
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="text-xl cursor-pointer transition-color duration-300 font-bold">
                  <Link href="/profile" onClick={closeMenu}>
                    Mój Profil
                  </Link>
                </li>
                <li className="text-xl cursor-pointer transition-color duration-300 text-red-500 font-bold">
                  <button onClick={() => {
                    signOut(); 
                    closeMenu();
                  }}>
                    Wyloguj
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
