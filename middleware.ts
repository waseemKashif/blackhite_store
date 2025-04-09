import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default async function middleware(req: Request) {
  const session = await auth(); // only if needed
  const url = new URL(req.url);

  const protectedPaths = [/\/admin/, /\/profile/, /\/checkout/];
  const isProtected = protectedPaths.some((p) => p.test(url.pathname));

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile", "/checkout"],
};
