import { Product } from "@/types/product.type";
import { API_BASE } from "@/lib/api";

export default async function getProductsByBrand(
  brandId: string
): Promise<Product[]> {
  try {
    const res = await fetch(
      `${API_BASE}/products?brand=${brandId}`,
      { method: "GET", next: { revalidate: 30 } }
    );
    const json = await res.json();
    return json?.data ?? [];
  } catch {
    return [];
  }
}
