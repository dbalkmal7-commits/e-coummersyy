"use server";

import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/lib/nextauth.config";
import { API_BASE } from "@/lib/api";
import { getMyToken } from "./getMyToken";
import { OrdersApiResponse } from "@/types/order.type";

export async function getUserOrders(): Promise<OrdersApiResponse | null> {
  const token = await getMyToken();
  const session = await getServerSession(nextAuthConfig);
  const userId = (session as any)?.userId;
  if (!token || !userId) return null;

  try {
    const res = await fetch(`${API_BASE}/orders/user/${userId}`, {
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
