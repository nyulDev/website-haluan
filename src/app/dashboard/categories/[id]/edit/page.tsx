import { updateCategory } from "@/app/actions/category";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditCategoryPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const category = await db.category.findUnique({ where: { id } });

  if (!category) notFound();

  const action = updateCategory.bind(null, id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/categories" className="text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">Edit Category</h2>
      </div>

      <form action={action} className="bg-white p-6 rounded-md border max-w-lg space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Nama Kategori</Label>
          <Input
            id="name"
            name="name"
            required
            defaultValue={category.name}
            autoFocus
          />
          <p className="text-xs text-slate-500">
            Slug saat ini: <span className="font-mono">{category.slug}</span> — akan diperbarui otomatis jika nama diubah.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/dashboard/categories">
            <Button type="button" variant="outline">Batal</Button>
          </Link>
          <Button type="submit">Simpan Perubahan</Button>
        </div>
      </form>
    </div>
  );
}
