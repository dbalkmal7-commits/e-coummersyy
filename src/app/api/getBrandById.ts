import { Brand } from "@/types/product.type";
import { API_BASE } from "@/lib/api";

export default async function getBrandById(id: string): Promise<Brand | null> {
  try {
    const res = await fetch(`${API_BASE}/brands/${id}`, {
      method: "GET",
      next: { revalidate: 60 },
    });
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}
