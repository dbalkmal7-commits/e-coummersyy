import { Category } from "@/types/product.type";
import { API_BASE } from "@/lib/api";

export default async function getAllCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/categories`, {
    method: "GET",
    next: { revalidate: 60 },
  });
  const json = await res.json();
  return json?.data ?? [];
}