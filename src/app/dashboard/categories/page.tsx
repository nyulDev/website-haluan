import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";
import { deleteCategory } from "@/app/actions/category";
import { Button } from "@/components/ui/button";

export default async function CategoriesPage() {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
          <p className="text-slate-500 text-sm mt-1">{categories.length} kategori tersedia</p>
        </div>
        <Link href="/dashboard/categories/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Category
          </Button>
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-md border">
          <Tag className="w-10 h-10 text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">Belum ada kategori</p>
          <p className="text-slate-400 text-sm mt-1">Buat kategori pertama untuk mulai mengelompokkan produk.</p>
          <Link href="/dashboard/categories/new" className="mt-4">
            <Button size="sm">Buat Kategori</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="text-left px-4 py-3 font-medium text-slate-600">Nama</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Slug</th>
                <th className="text-center px-4 py-3 font-medium text-slate-600">Produk</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800">{cat.name}</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">{cat.slug}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {cat._count.products}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/dashboard/categories/${cat.id}/edit`}>
                        <button className="p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deleteCategory(cat.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="p-1.5 rounded hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"
                          title={cat._count.products > 0 ? "Tidak bisa dihapus, masih ada produk" : "Hapus kategori"}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
