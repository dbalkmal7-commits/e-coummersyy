import { NextResponse } from "next/server";
import { getCart } from "../getCart";

export async function GET() {
  const cartRes = await getCart();
  const count =
    cartRes?.data?.numOfCartItems ??
    cartRes?.data?.products?.reduce(
      (sum, item) => sum + (item.count ?? 0),
      0
    ) ??
    0;

  return NextResponse.json({ count });
}

