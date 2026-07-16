"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createUser(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  if (!email) {
    return { success: false, error: "Email is required" };
  }

  if (!password) {
    return { success: false, error: "Password is required" };
  }

  try {
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return { success: false, error: "Email sudah terdaftar" };
    }

    await db.user.create({
      data: {
        email,
        name: name || null,
        password,
        role: role || "user",
      },
    });
  } catch (error) {
    return { success: false, error: "Gagal membuat user" };
  }

  revalidatePath("/dashboard/users");
  return { success: true };
}

export async function updateUser(id: string, formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  if (!email) {
    return { success: false, error: "Email is required" };
  }

  try {
    const existing = await db.user.findFirst({
      where: { email, NOT: { id } },
    });
    if (existing) {
      return { success: false, error: "Email sudah digunakan user lain" };
    }

    const updateData: { email: string; name: string | null; role: string; password?: string } = {
      email,
      name: name || null,
      role: role || "user",
    };

    // Only update password if provided
    if (password) {
      updateData.password = password;
    }

    await db.user.update({
      where: { id },
      data: updateData,
    });
  } catch (error) {
    return { success: false, error: "Gagal mengupdate user" };
  }

  revalidatePath("/dashboard/users");
  return { success: true };
}

export async function deleteUser(id: string) {
  try {
    await db.user.delete({
      where: { id },
    });
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Gagal menghapus user" };
  }
}
