import React from "react";
import getAllCategories from "../api/getAllCategories";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="container mx-auto md:w-[80%] py-8">
      <h1 className="text-2xl font-bold mb-6">التصنيفات</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <Link key={cat._id} href={`/categories/${cat._id}`}>
            <Card className="overflow-hidden transition hover:shadow-md">
              <CardHeader className="p-0">
                <div className="relative aspect-square w-full">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className="p-3 text-center text-base">
                  {cat.name}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
