import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "dashboard_session";

async function verifyToken(token: string): Promise<boolean> {
  try {
    const secret = process.env.SESSION_SECRET || "fallback-secret";
    const lastDot = token.lastIndexOf(".");
    if (lastDot === -1) return false;

    const payload = token.slice(0, lastDot);
    const sig = token.slice(lastDot + 1);

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(payload)
    );

    // Convert ArrayBuffer to hex string (no Buffer in Edge Runtime)
    const expectedSig = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return sig === expectedSig;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;

    if (!token || !(await verifyToken(token))) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect logged-in users away from /login
  if (pathname === "/login") {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (token && (await verifyToken(token))) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
