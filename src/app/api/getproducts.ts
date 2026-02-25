import { Product } from "@/types/product.type";
import { API_BASE } from "@/lib/api";

export default async function getAllProducts(
  page: number = 1
): Promise<{ data: Product[]; totalPages?: number }> {
  const res = await fetch(`${API_BASE}/products?page=${page}`, {
    method: "GET",
    next: { revalidate: 30 },
  });
  const json = await res.json();
  return {
    data: json?.data ?? [],
    totalPages: json?.totalPages,
  };
}