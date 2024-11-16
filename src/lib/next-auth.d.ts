import { UserEntity } from "@/models/user";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: UserEntity
    accessToken: string;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: UserEntity;
    accessToken: string;
  }
}
