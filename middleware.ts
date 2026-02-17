// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login"];

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const { pathname } = req.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // If no token and trying to access protected route → redirect to login
  if (!accessToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If token exists and trying to access login → redirect to home
  if (accessToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
