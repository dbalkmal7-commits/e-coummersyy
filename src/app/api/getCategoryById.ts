import { Category } from "@/types/product.type";
import { API_BASE } from "@/lib/api";

export default async function getCategoryById(
  id: string
): Promise<Category | null> {
  try {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      method: "GET",
      next: { revalidate: 60 },
    });
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}
