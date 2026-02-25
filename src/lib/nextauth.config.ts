import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

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

        // نحفظ توكن الباك إند داخل الـ user ليمر إلى jwt callback
        return {
          ...finalResponse.user,
          backendToken: finalResponse.token,
        };
      },
    }),
  ],

  callbacks: {
    jwt(params) {
      if (params.user) {
        const user = params.user as any;
        (params.token as any).backendToken = user.backendToken;
        (params.token as any).role = user.role ?? "user";
        (params.token as any).userId = user._id ?? user.id;
      }
      return params.token;
    },

    session(params) {
      const token = params.token as any;

      (params.session as any).role = token.role ?? "user";
      (params.session as any).backendToken = token.backendToken;
      (params.session as any).userId = token.userId;

      return params.session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,

  pages: {
    signIn: "/login",
  },
};