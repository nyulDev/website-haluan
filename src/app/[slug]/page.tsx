import { ArrowLeft, Package, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

// Client component wrapper for image selection modal if needed, 
// but for simplicity we will just render the grid server-side.
// We can use a simple modal with standard HTML/CSS or just render images.

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const category = await db.category.findUnique({
    where: { slug: params.slug },
    include: {
      products: true,
    }
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2 text-slate-600">
            <Package className="w-5 h-5" />
            <span className="font-medium text-sm hidden sm:inline">
              {category.products.length} Products
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{category.name}</h1>
          <p className="text-slate-500">
            Browse our complete selection of high-quality {category.name.toLowerCase()} for your maritime needs.
          </p>
        </div>

        {category.products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-slate-100">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900">No products found</h3>
            <p className="text-slate-500">Check back later for updates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.products.map((product) => (
              <Link
                key={product.id}
                href={`/${params.slug}/${product.id}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100 p-4 flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="object-contain w-full h-full mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                      <span className="text-sm">No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-semibold text-slate-900 leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  {product.description && (
                    <p className="text-sm text-slate-500 line-clamp-2 mt-auto">
                      {product.description}
                    </p>
                  )}
                  <span className="mt-4 text-xs font-semibold text-blue-600 group-hover:underline">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
