import React from "react";
import getBrands from "../api/getBrands";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="container mx-auto md:w-[80%] py-8">
      <h1 className="text-2xl font-bold mb-6">العلامات التجارية</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {brands.map((brand) => (
          <Link key={brand._id} href={`/brands/${brand._id}`}>
            <Card className="overflow-hidden transition hover:shadow-md">
              <CardHeader className="p-0">
                <div className="relative aspect-square w-full bg-muted">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <CardTitle className="p-3 text-center text-base">
                  {brand.name}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
