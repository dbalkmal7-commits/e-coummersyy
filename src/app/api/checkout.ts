"use server";

import axios from "axios";
import { API_BASE } from "@/lib/api";
import { getMyToken } from "./getMyToken";

function getHomeUrl(): string {
  const base =
    process.env.NEXT_URL ??
    process.env.NEXTAUTH_URL ??
    process.env.AUTH_URL ??
    "http://localhost:3000";
  return base.replace(/\/$/, "") + "/";
}

export async function createCheckoutSession(cartId: string) {
  const token = await getMyToken();
  if (!token) return { status: "fail", url: null as string | null };

  const successUrl = getHomeUrl();

  try {
    const { data } = await axios.post(
      `${API_BASE}/orders/checkout-session/${cartId}`,
      {
        success_url: successUrl,
        cancel_url: successUrl + "carts",
      },
      { headers: { token } }
    );
    const url = data?.session?.url ?? data?.url ?? null;
    return { status: data?.status ?? "success", url };
  } catch (err: any) {
    return {
      status: "fail",
      url: null,
      message: err?.response?.data?.message ?? "Checkout error",
    };
  }
}
