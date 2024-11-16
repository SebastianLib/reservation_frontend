import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Phone",
      credentials: {
        phone: { label: "Numer telefonu", type: "text" }, 
        password: { label: "Hasło", type: "password" },
        role: { label: "Rola", type: "text" },
      },
      async authorize(credentials, req) {
        const { phone, password, role } = credentials!;
        
        if (!phone || !password || !role) return null;

        // Logowanie użytkownika
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signin`, {
          method: "POST",
          body: JSON.stringify({ phone, password, role }), 
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          return null;
        }

        const user = await res.json();
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, session,trigger }) {

      if(trigger === "update" && session?.status){                
      token.user.status = session.status;
      }

      return { ...token, ...user };
    },

    async session({ session, token }) {      
      session.accessToken = token.accessToken;
      session.user = token.user;

      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
