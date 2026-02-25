import React from "react";
import { notFound } from "next/navigation";
import getBrandById from "../../api/getBrandById";
import getProductsByBrand from "../../api/getProductsByBrand";
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
import AddToCardBtn from "@/app/products/AddToCardBtn";

export default async function BrandProductsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [brand, products] = await Promise.all([
    getBrandById(id),
    getProductsByBrand(id),
  ]);

  if (!brand) notFound();

  return (
    <div className="container mx-auto md:w-[80%] py-8">
      <h1 className="text-2xl font-bold mb-2">العلامة: {brand.name}</h1>
      <p className="text-muted-foreground mb-6">
        {products.length} منتج
      </p>
      <div className="flex flex-wrap gap-4">
        {products.map((product: Product) => (
          <Card
            key={product._id}
            className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.5rem)] lg:w-[calc(25%-0.5rem)] flex flex-col"
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
                <CardDescription>{product.brand?.name ?? product.category?.name}</CardDescription>
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
      {products.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          لا توجد منتجات لهذه العلامة.
        </p>
      )}
    </div>
  );
}
