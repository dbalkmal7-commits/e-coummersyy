import { Brand } from "@/types/product.type";
import { API_BASE } from "@/lib/api";

export default async function getBrands(): Promise<Brand[]> {
  const res = await fetch(`${API_BASE}/brands`, {
    method: "GET",
    next: { revalidate: 60 },
  });
  const json = await res.json();
  return json?.data ?? [];
}
