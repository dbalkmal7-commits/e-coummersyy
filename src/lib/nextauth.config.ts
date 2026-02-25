import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

interface AuthorizeUser {
  _id?: string;
  id: string;
  role?: string;
  backendToken: string;
}

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async function (credentials) {
        const res = await fetch(
          `${process.env.API ?? "https://ecommerce.routemisr.com/api/v1"}/auth/signin`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const finalResponse = await res.json();

        if (finalResponse.message !== "success") return null;

        const apiUser = finalResponse.user ?? {};
        const id: string =
          apiUser._id ??
          apiUser.id ??
          apiUser.email ??
          apiUser.name ??
          "user";

        return {
          ...apiUser,
          id,
          backendToken: finalResponse.token,
        } as AuthorizeUser;
      },
    }),
  ],

  callbacks: {
    jwt(params) {
      if (params.user) {
        const user = params.user as AuthorizeUser;
        const token = params.token as JWT;
        token.backendToken = user.backendToken;
        token.role = user.role ?? "user";
        token.userId = user._id ?? user.id;
      }
      return params.token;
    },

    session(params) {
      const token = params.token as JWT;
      const session = params.session as Session & { role?: string; backendToken?: string; userId?: string };
      session.role = token.role ?? "user";
      session.backendToken = token.backendToken;
      session.userId = token.userId;
      return params.session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,

  pages: {
    signIn: "/login",
  },
};