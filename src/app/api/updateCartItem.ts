"use server";

import axios from "axios";
import { API_BASE } from "@/lib/api";
import { getMyToken } from "./getMyToken";
import { getAxiosErrorMessage } from "@/types/api";

export async function updateCartItem(itemId: string, count: number) {
  const token = await getMyToken();
  if (!token) return { status: "fail", message: "Not authenticated" };

  try {
    const { data } = await axios.put(
      `${API_BASE}/cart/${itemId}`,
      { count },
      { headers: { token } }
    );
    return data;
  } catch (err: unknown) {
    return { status: "fail", message: getAxiosErrorMessage(err) ?? "Error" };
  }
}
