import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  expiresAt: string;
}

interface Token {
  id: string;
  email: string;
  name: string;
  image: string;
  loginExpiredAt: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          return data.user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: Token;
      user?: User;
      account?: any;
    }) {
      if (account?.provider === "google" && user?.email) {
        const res = await fetch("http://localhost:3000/api/auth/google-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          token.id = data.user.id;
          token.email = data.user.email;
          token.name = data.user.name;
          token.image = data.user.image;
          token.loginExpiredAt = data.user.expiresAt;
        }
      }

      // For credentials login or fallback
      if (user && !token.id) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.loginExpiredAt = user.expiresAt;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
      }
      session.expires = token.loginExpiredAt as string;
      return session;
    },
  },
});
