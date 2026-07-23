"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function findOrCreateCategory(name: string): Promise<string> {
  const trimmed = name.trim();
  const slug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const existing = await db.category.findFirst({
    where: { name: { equals: trimmed, mode: "insensitive" } },
  });
  if (existing) return existing.id;

  const created = await db.category.create({
    data: { name: trimmed, slug },
  });
  return created.id;
}

export async function deleteProduct(id: string) {
  try {
    await db.product.delete({
      where: { id },
    });
    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete product" };
  }
}

export async function createProduct(formData: FormData) {
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || null;
  const image = (formData.get("image") as string) || null;
  const categoryName = formData.get("categoryName") as string;

  if (!categoryName?.trim()) {
    return { success: false, error: "Category is required" };
  }

  try {
    const categoryId = await findOrCreateCategory(categoryName);
    await db.product.create({
      data: { title, description, image, categoryId },
    });
  } catch (error) {
    return { success: false, error: "Failed to create product" };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || null;
  const image = (formData.get("image") as string) || null;
  const categoryName = formData.get("categoryName") as string;

  if (!categoryName?.trim()) {
    return { success: false, error: "Category is required" };
  }

  try {
    const categoryId = await findOrCreateCategory(categoryName);
    await db.product.update({
      where: { id },
      data: { title, description, image, categoryId },
    });
  } catch (error) {
    return { success: false, error: "Failed to update product" };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}
