// middleware-rate.ts
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(50, "1 m"),
});

export async function middleware(req: Request) {
  const url = new URL(req.url);
  const ip = req.headers.get("x-forwarded-for") || "";

  // Rate limit solo para home y posts
  if (url.pathname === "/" || url.pathname.match(/^\/[^\/]+$/)) {
    const { success } = await limiter.limit(ip);
    if (!success) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests" }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/:id*"],
};
