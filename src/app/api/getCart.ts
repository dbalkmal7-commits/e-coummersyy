"use server";

import { API_BASE } from "@/lib/api";
import { getMyToken } from "./getMyToken";
import { CartApiResponse } from "@/types/cart.type";

export async function getCart(): Promise<CartApiResponse | null> {
  const token = await getMyToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API_BASE}/cart`, {
      method: "GET",
      headers: { token },
      cache: "no-store",
    });
    const json = await res.json();
    if (json.status !== "success") return null;
    return json;
  } catch {
    return null;
  }
}
