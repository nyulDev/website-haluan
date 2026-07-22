"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const SESSION_COOKIE = "dashboard_session";

async function signToken(payload: string): Promise<string> {
  const secret = process.env.SESSION_SECRET || "fallback-secret";
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const sig = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${payload}.${sig}`;
}

function verifyToken(token: string): boolean {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;
  const payload = token.slice(0, lastDot);
  const expected = signToken(payload);
  return token === expected;
}

export async function login(prevState: { error?: string }, formData: FormData) {
  const email = formData.get("username") as string;
  const password = formData.get("password") as string;

  let userId: string;

  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user || !user.password || user.password !== password) {
      return { error: "Email atau password salah." };
    }

    userId = user.id;
  } catch (error) {
    return { error: "Terjadi kesalahan sistem saat login." };
  }

  const payload = `${userId}:${Date.now()}`;
  const token = await signToken(payload);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
    path: "/",
  });

  redirect("/dashboard");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/login");
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  if (!verifyToken(token)) return null;
  return { authenticated: true };
}
