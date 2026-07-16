import { ProductForm } from "@/components/ProductForm";
import { db } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NewProductPage() {
  const categories = await db.category.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/products" className="text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">Add New Product</h2>
      </div>
      
      <ProductForm categories={categories} />
    </div>
  );
}
