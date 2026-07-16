import { ArrowLeft, Package, Tag, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

export default async function ProductDetailPage(
  props: { params: Promise<{ slug: string; productId: string }> }
) {
  const params = await props.params;

  const product = await db.product.findUnique({
    where: { id: params.productId },
    include: { category: true },
  });

  if (!product || product.category.slug !== params.slug) {
    notFound();
  }

  // Fetch related products from same category (exclude current)
  const related = await db.product.findMany({
    where: {
      categoryId: product.categoryId,
      NOT: { id: product.id },
    },
    take: 4,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href={`/${params.slug}`}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to {product.category.name}</span>
          </Link>
          <Link href="/" className="text-slate-500 hover:text-slate-800 text-sm">
            Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href={`/${params.slug}`} className="hover:text-blue-600">{product.category.name}</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium line-clamp-1">{product.title}</span>
        </nav>

        {/* Product Detail Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="bg-slate-50 flex items-center justify-center p-10 min-h-72 border-b md:border-b-0 md:border-r border-slate-100">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-72 object-contain w-full mix-blend-multiply"
                />
              ) : (
                <div className="flex flex-col items-center text-slate-300">
                  <ImageIcon className="w-20 h-20 mb-3" />
                  <span className="text-sm">No Image Available</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                {/* Category badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 mb-4">
                  <Tag className="w-3 h-3" />
                  {product.category.name}
                </span>

                {/* Title */}
                <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-4">
                  {product.title}
                </h1>

                {/* Divider */}
                <hr className="border-slate-100 mb-4" />

                {/* Description */}
                {product.description ? (
                  <div className="mb-6">
                    <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Description</h2>
                    <p className="text-slate-700 leading-relaxed">{product.description}</p>
                  </div>
                ) : (
                  <p className="text-slate-400 italic mb-6">No description available.</p>
                )}

                {/* Details */}
                <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Category</span>
                    <span className="font-medium text-slate-800">{product.category.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Product ID</span>
                    <span className="font-mono text-xs text-slate-600 bg-slate-200 px-2 py-0.5 rounded">{product.id.slice(0, 8)}…</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <a
                  href="https://wa.me/+62811821723"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                >
                  <Package className="w-5 h-5" />
                  Request a Quote
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/${params.slug}/${rel.id}`}
                  className="group bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-200"
                >
                  <div className="aspect-square bg-slate-50 flex items-center justify-center p-3">
                    {rel.image ? (
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="object-contain w-full h-full mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-slate-300" />
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium text-slate-800 line-clamp-2 leading-snug">{rel.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
