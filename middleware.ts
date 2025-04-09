import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth"; // this should point to lightweight config

const protectedPaths = [
  /^\/shipping-address/,
  /^\/payment-method/,
  /^\/place-order/,
  /^\/profile/,
  /^\/user\/.*/,
  /^\/order\/.*/,
  /^\/admin/,
];

export default auth((req:NextRequest) => {
  const { pathname } = req.nextUrl;

  const isProtected = protectedPaths.some((regex) => regex.test(pathname));

  if (!req.headers.get("authorization") && isProtected) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Only handle cookie generation in full server-side logic (NOT HERE)

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
