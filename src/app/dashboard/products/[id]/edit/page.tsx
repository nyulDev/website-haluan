import { ProductForm } from "@/components/ProductForm";
import { db } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const [product, categories] = await Promise.all([
    db.product.findUnique({
      where: { id: params.id },
      include: { category: true },
    }),
    db.category.findMany({
      orderBy: { name: 'asc' }
    })
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/products" className="text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">Edit Product</h2>
      </div>
      
      <ProductForm product={product} categories={categories} />
    </div>
  );
}
