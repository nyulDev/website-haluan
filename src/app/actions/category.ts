"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function generateSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createCategory(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();

  if (!name) return { error: "Nama kategori wajib diisi." };

  const slug = generateSlug(name);

  try {
    await db.category.create({ data: { name, slug } });
  } catch (e: any) {
    if (e.code === "P2002") return { error: "Kategori dengan nama atau slug tersebut sudah ada." };
    return { error: "Gagal membuat kategori." };
  }

  revalidatePath("/dashboard/categories");
  revalidatePath("/dashboard/products/new");
  redirect("/dashboard/categories");
}

export async function updateCategory(id: string, formData: FormData) {
  const name = (formData.get("name") as string)?.trim();

  if (!name) return { error: "Nama kategori wajib diisi." };

  const slug = generateSlug(name);

  try {
    await db.category.update({ where: { id }, data: { name, slug } });
  } catch (e: any) {
    if (e.code === "P2002") return { error: "Kategori dengan nama atau slug tersebut sudah ada." };
    return { error: "Gagal mengupdate kategori." };
  }

  revalidatePath("/dashboard/categories");
  revalidatePath("/dashboard/products/new");
  redirect("/dashboard/categories");
}

export async function deleteCategory(id: string) {
  try {
    await db.category.delete({ where: { id } });
  } catch {
    return { error: "Gagal menghapus kategori. Pastikan tidak ada produk yang menggunakan kategori ini." };
  }

  revalidatePath("/dashboard/categories");
  revalidatePath("/dashboard/products/new");
  return { success: true };
}
