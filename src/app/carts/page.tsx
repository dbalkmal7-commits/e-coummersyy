import React from "react";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/lib/nextauth.config";
import Link from "next/link";
import { getCart } from "../api/getCart";
import CartContent from "./CartContent";

export default async function CartsPage() {
  const session = await getServerSession(nextAuthConfig);
  const cartRes = await getCart();

  if (!session) {
    return (
      <div className="container mx-auto md:w-[80%] py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">سلة المشتريات</h1>
        <p className="text-muted-foreground mb-6">
          يرجى تسجيل الدخول لعرض السلة وإتمام الطلب.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90"
        >
          تسجيل الدخول
        </Link>
      </div>
    );
  }

  if (!cartRes?.data?.products?.length) {
    return (
      <div className="container mx-auto md:w-[80%] py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">سلة المشتريات</h1>
        <p className="text-muted-foreground mb-6">السلة فارغة.</p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90"
        >
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto md:w-[80%] py-8">
      <h1 className="text-2xl font-bold mb-6">سلة المشتريات</h1>
      <CartContent
        cartId={cartRes.data._id}
        items={cartRes.data.products}
        totalCartPrice={cartRes.data.totalCartPrice}
      />
    </div>
  );
}
