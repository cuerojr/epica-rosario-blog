import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Configurar Redis + Rate Limit
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(50, "1 m"), // 50 requests/min por IP
});

export default withAuth(async function middleware(req: NextRequestWithAuth) {
  const ip = req.headers.get("x-forwarded-for") || req.ip;
  const path = req.nextUrl.pathname;

  // 1️⃣ Rate limiting solo para home y posts dinámicos
  if (path === "/" || path.match(/^\/[^\/]+$/)) {
    const { success } = await limiter.limit(ip as string);
    if (!success) {
      console.log(`[Rate Limit Middleware] IP bloqueada: ${ip}`);
      return new NextResponse(
        JSON.stringify({ error: "Too many requests" }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  // 2️⃣ Protección por roles
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

  // Continuar request normalmente
  return NextResponse.next();
}, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

// 3️⃣ Matcher: rutas privadas + home + posts dinámicos
export const config = {
  matcher: [
    "/admin/:path*",
    "/",        // home
    "/:id*",    // todas las rutas dinámicas tipo /mi-noticia
  ],
};
