import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null | undefined; // Pole może być opcjonalne
      surname: string | null | undefined; // Pole może być opcjonalne
      email: string;
      phone: string | null | undefined; // Pole może być opcjonalne
      role: string;
      image: string | null;
      status: string;
      verificationCode: string | null;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      name: string 
      surname: string 
      email: string;
      phone: string 
      role: string;
      image: string | null;
      status: string;
      verificationCode: string | null;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
  }
}
