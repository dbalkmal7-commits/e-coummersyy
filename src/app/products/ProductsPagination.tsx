"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductsPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const prev = currentPage > 1 ? currentPage - 1 : null;
  const next = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div className="mt-8 flex justify-center gap-2">
      {prev != null ? (
        <Button asChild variant="outline">
          <Link href={`/products?page=${prev}`}>السابق</Link>
        </Button>
      ) : (
        <Button variant="outline" disabled>
          السابق
        </Button>
      )}
      <span className="flex items-center px-4">
        {currentPage} / {totalPages}
      </span>
      {next != null ? (
        <Button asChild variant="outline">
          <Link href={`/products?page=${next}`}>التالي</Link>
        </Button>
      ) : (
        <Button variant="outline" disabled>
          التالي
        </Button>
      )}
    </div>
  );
}
