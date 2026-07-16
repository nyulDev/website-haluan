"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const categoryId = formData.get("categoryId") as string;

  try {
    await db.product.create({
      data: {
        title,
        description,
        image,
        categoryId,
      },
    });
  } catch (error) {
    return { success: false, error: "Failed to create product" };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const categoryId = formData.get("categoryId") as string;

  try {
    await db.product.update({
      where: { id },
      data: {
        title,
        description,
        image,
        categoryId,
      },
    });
  } catch (error) {
    return { success: false, error: "Failed to update product" };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}
