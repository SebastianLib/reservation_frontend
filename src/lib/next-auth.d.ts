import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null | undefined; 
      surname: string | null | undefined; 
      phone: string | null | undefined;
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
