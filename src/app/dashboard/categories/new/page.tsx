import { createCategory } from "@/app/actions/category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/categories" className="text-slate-500 hover:text-slate-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold tracking-tight">Add Category</h2>
      </div>

      <form action={createCategory} className="bg-white p-6 rounded-md border max-w-lg space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Nama Kategori</Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="e.g. Rigging Equipment"
            autoFocus
          />
          <p className="text-xs text-slate-500">Slug akan dibuat otomatis dari nama kategori.</p>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/dashboard/categories">
            <Button type="button" variant="outline">Batal</Button>
          </Link>
          <Button type="submit">Simpan Kategori</Button>
        </div>
      </form>
    </div>
  );
}
