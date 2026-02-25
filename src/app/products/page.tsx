import React from "react";
import getAllProducts from "../api/getproducts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product.type";
import AddToCardBtn from "./AddToCardBtn";
import ProductsPagination from "./ProductsPagination";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await (searchParams ?? Promise.resolve({ page: undefined }));
  const page = params?.page;
  const currentPage = Math.max(1, parseInt(page ?? "1", 10));
  const { data, totalPages } = await getAllProducts(currentPage);

  return (
    <div className="container mx-auto md:w-[80%] py-8">
      <h1 className="text-4xl font-bold mb-6">جميع المنتجات</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {data.map((product: Product) => (
          <Card
            key={product._id}
            className="flex flex-col"
          >
            <Link href={`/products/${product._id}`}>
              <CardHeader>
                <div className="relative aspect-square w-full">
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <CardDescription>
                  {product.category?.name ?? ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-bold line-clamp-1">{product.title}</p>
              </CardContent>
              <CardFooter className="flex justify-between mt-auto">
                <span>{product.price} EGP</span>
                <span>
                  <i className="fas fa-star text-amber-300" />{" "}
                  {product.ratingsAverage}
                </span>
              </CardFooter>
            </Link>
            <div className="p-2">
              <AddToCardBtn productId={product._id} />
            </div>
          </Card>
        ))}
      </div>
      {totalPages != null && totalPages > 1 && (
        <ProductsPagination
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
