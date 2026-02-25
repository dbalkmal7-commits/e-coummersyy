"use server";

import axios from "axios";
import { API_BASE } from "@/lib/api";
import { getMyToken } from "./getMyToken";

export async function removeCartItem(itemId: string) {
  const token = await getMyToken();
  if (!token) return { status: "fail", message: "Not authenticated" };

  try {
    const { data } = await axios.delete(`${API_BASE}/cart/${itemId}`, {
      headers: { token },
    });
    return data;
  } catch (err: any) {
    return { status: "fail", message: err?.response?.data?.message ?? "Error" };
  }
}
