"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { updateCartItem } from "../api/updateCartItem";
import { removeCartItem } from "../api/removeCartItem";
import { createCheckoutSession } from "../api/checkout";
import { toast } from "sonner";
import { CartItem as CartItemType } from "@/types/cart.type";
import type { CartMutationResponse } from "@/types/api";
import { useState } from "react";

export default function CartContent({
  cartId,
  items,
  totalCartPrice,
}: {
  cartId: string;
  items: CartItemType[];
  totalCartPrice: number;
}) {
  const [cartItems, setCartItems] = useState(items);
  const [total, setTotal] = useState(totalCartPrice);
  const [loading, setLoading] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  async function handleUpdate(itemId: string, count: number) {
    if (count < 1) return;
    setLoading(itemId);
    const res = await updateCartItem(itemId, count);
    setLoading(null);
    const typedRes = res as CartMutationResponse | undefined;
    if (typedRes?.status === "success" && typedRes?.data) {
      const cart = typedRes.data.cart ?? typedRes.data;
      setCartItems(cart.products ?? []);
      setTotal(cart.totalCartPrice ?? total);
      toast.success("تم تحديث الكمية");
    } else {
      toast.error(typedRes?.message ?? "حدث خطأ");
    }
  }

  async function handleRemove(itemId: string) {
    setLoading(itemId);
    const res = await removeCartItem(itemId);
    setLoading(null);
    const typedRes = res as CartMutationResponse | undefined;
    if (typedRes?.status === "success" && typedRes?.data) {
      const cart = typedRes.data.cart ?? typedRes.data;
      setCartItems(cart.products ?? []);
      setTotal(cart.totalCartPrice ?? 0);
      toast.success("تم الحذف من السلة");
    } else {
      toast.error(typedRes?.message ?? "حدث خطأ");
    }
  }

  async function handleCheckout() {
    setCheckoutLoading(true);
    const res = await createCheckoutSession(cartId);
    setCheckoutLoading(false);
    if (res?.url) {
      window.location.href = res.url;
    } else {
      toast.error(res?.message ?? "تعذر إنشاء جلسة الدفع");
    }
  }

  return (
    <>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-wrap items-center gap-4 rounded-xl border bg-card p-4"
          >
            <Link
              href={`/products/${item.product._id}`}
              className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg"
            >
              <Image
                src={item.product.imageCover}
                alt={item.product.title}
                fill
                className="object-cover"
              />
            </Link>
            <div className="min-w-0 flex-1">
              <Link
                href={`/products/${item.product._id}`}
                className="font-semibold line-clamp-1 hover:underline"
              >
                {item.product.title}
              </Link>
              <p className="text-sm text-muted-foreground">
                {item.price} EGP × {item.count}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                disabled={loading === item._id || item.count <= 1}
                onClick={() => handleUpdate(item._id, item.count - 1)}
              >
                −
              </Button>
              <span className="min-w-[2rem] text-center">{item.count}</span>
              <Button
                size="icon"
                variant="outline"
                disabled={loading === item._id}
                onClick={() => handleUpdate(item._id, item.count + 1)}
              >
                +
              </Button>
            </div>
            <Button
              size="sm"
              variant="destructive"
              disabled={loading === item._id}
              onClick={() => handleRemove(item._id)}
            >
              حذف
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card p-6">
        <p className="text-lg font-bold">
          الإجمالي: <span className="text-primary">{total}</span> EGP
        </p>
        <Button
          onClick={handleCheckout}
          disabled={checkoutLoading}
          className="min-w-[200px]"
        >
          {checkoutLoading ? "جاري التوجيه للدفع..." : "إتمام الطلب (الدفع)"}
        </Button>
      </div>
    </>
  );
}
