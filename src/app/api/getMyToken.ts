"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import type { DecodedToken } from "@/types/api";

export async function getMyToken() {
  const myCookies = await cookies();

  const tokenFromCookies =
    myCookies.get("next-auth.session-token")?.value ??
    myCookies.get("__Secure-next-auth.session-token")?.value;

  console.log("TokenFromCookies", tokenFromCookies);

  if (!tokenFromCookies) {
    console.log("No token found");
    return null;
  }

  const decodedToken = await decode({
    token: tokenFromCookies,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET!,
  });

  console.log("decodedToken", decodedToken);

  const token = decodedToken as DecodedToken;
  return token?.backendToken ?? null;
}