import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { db } from "@/lib/db";
import Link from "next/link";
import { deleteProduct } from "@/app/actions/product";

export default async function ProductsPage() {
  const products = await db.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Products</h2>
        <Link href="/dashboard/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-md border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b text-slate-700">
            <tr>
              <th className="px-6 py-3 font-medium">Image</th>
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    {product.image ? (
                      <div className="w-12 h-12 relative rounded-md overflow-hidden bg-slate-100 border">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-slate-100 rounded-md border flex items-center justify-center text-slate-400 text-xs">
                        No img
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {product.title}
                    {product.description && (
                      <p className="text-xs text-slate-500 font-normal truncate max-w-xs mt-1">
                        {product.description}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {product.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <div className="flex items-center justify-end space-x-2">
                      <Link href={`/dashboard/products/${product.id}/edit`}>
                        <Button variant="outline" size="sm" className="h-8 px-2">
                          <Edit className="w-4 h-4 text-slate-600" />
                        </Button>
                      </Link>
                      <form action={deleteProduct.bind(null, product.id)}>
                        <Button type="submit" variant="outline" size="sm" className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
