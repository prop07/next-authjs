import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: User;
    loginExpires?: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    expiresAt: string;
  }

  interface JWT {
    id?: string;
    loginExpiredAt?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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
    async jwt({ token, user, account }) {
      // Handle Google login
      if (account?.provider === "google" && account.id_token) {
        try {
          const res = await fetch(
            "http://localhost:3000/api/auth/google-login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id_token: account.id_token }),
            }
          );

          const data = await res.json();
          console.log("Google login response:", data);

          if (res.ok && data.success) {
            // Store all user data in token
            token.id = data.user.id;
            token.email = data.user.email;
            token.name = data.user.name;
            token.image = data.user.image;
            token.loginExpiredAt = data.user.expiresAt;
          } else {
            throw new Error(data.message || "Google login failed");
          }
        } catch (error) {
          throw error;
        }
      }

      // Handle credentials login (first time login)
      if (user && account?.provider === "credentials") {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.loginExpiredAt = user.expiresAt;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
        // Set custom loginExpires field
        session.expires = token.loginExpiredAt as Date & string;
      }

      return session;
    },
  },
});
