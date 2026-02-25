import { API_BASE } from "@/lib/api";
import { Product } from "@/types/product.type";

export default async function ProductDetails(
  details: string
): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE}/products/${details}`, {
      method: "GET",
      next: { revalidate: 30 },
    });
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}