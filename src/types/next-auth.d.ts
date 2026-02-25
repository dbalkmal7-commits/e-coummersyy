import "next-auth";

declare module "next-auth" {
  interface Session {
    role?: string;
    backendToken?: string;
    userId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendToken?: string;
    role?: string;
    userId?: string;
  }
}
