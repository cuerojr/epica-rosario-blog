// middleware-auth.ts
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const path = req.nextUrl.pathname;

    if (path.startsWith("/admin") && req.nextauth.token?.role !== "ADMIN") {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }

    if (
      (path.startsWith("/bienvenido") ||
        path.startsWith("/finalizado") ||
        path.startsWith("/estado")) &&
      req.nextauth.token?.role !== "USER"
    ) {
      return NextResponse.rewrite(new URL("/admin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: { authorized: ({ token }) => !!token },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/bienvenido",
    "/finalizado",
    "/estado",
  ],
};
