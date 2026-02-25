import ProductDetails from "@/app/api/productdetails";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import AddToCardBtn from "../AddToCardBtn";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ details: string }>;
}) {
  const { details } = await params;
  const data = await ProductDetails(details);

  if (!data) notFound();

  return (
    <div className="container mx-auto md:w-[80%] py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
          <Image
            src={data.imageCover}
            alt={data.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
          <p className="text-muted-foreground mb-4">{data.description}</p>
          <p className="mb-2">
            <span className="font-medium">التصنيف:</span> {data.category?.name}
          </p>
          {data.brand && (
            <p className="mb-4">
              <span className="font-medium">العلامة:</span> {data.brand.name}
            </p>
          )}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xl font-bold text-primary">
              {data.price} EGP
            </span>
            <span>
              <i className="fas fa-star text-amber-300" /> {data.ratingsAverage}
            </span>
          </div>
          <AddToCardBtn productId={data._id} />
        </div>
      </div>
    </div>
  );
}
