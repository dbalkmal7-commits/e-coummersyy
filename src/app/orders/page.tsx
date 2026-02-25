import React from "react";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/lib/nextauth.config";
import Link from "next/link";
import { getUserOrders } from "../api/getUserOrders";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function OrdersPage() {
  const session = await getServerSession(nextAuthConfig);
  const ordersRes = await getUserOrders();

  if (!session) {
    return (
      <div className="container mx-auto md:w-[80%] py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">طلباتي</h1>
        <p className="text-muted-foreground mb-6">
          يرجى تسجيل الدخول لعرض الطلبات.
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

  const orders = ordersRes?.data ?? [];

  return (
    <div className="container mx-auto md:w-[80%] py-8">
      <h1 className="text-2xl font-bold mb-6">طلباتي</h1>
      {orders.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          لا توجد طلبات حتى الآن.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order._id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">
                  طلب #{order._id.slice(-6).toUpperCase()}
                </CardTitle>
                <CardDescription>
                  {new Date(order.createdAt).toLocaleDateString("ar-EG")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 justify-between">
                  <span className="font-semibold">
                    الإجمالي: {order.totalOrderPrice} EGP
                  </span>
                  <span
                    className={
                      order.isPaid
                        ? "text-green-600"
                        : "text-amber-600"
                    }
                  >
                    {order.isPaid ? "مدفوع" : "في الانتظار"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
