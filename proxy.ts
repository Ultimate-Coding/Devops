// ./proxy.ts
// النسخة 16: أُعيدت تسمية "middleware" إلى "proxy".
// نستخدم إعدادات auth.config الخفيفة (بدون Prisma) لقراءة الجلسة من الـ JWT.
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  // تحديد المسارات التي تحتاج حماية (مثال: لوحة التحكم والتتبع)
  const isDashboardRoute =
    nextUrl.pathname.startsWith("/dashboard") || nextUrl.pathname === "/";
  const isAuthRoute =
    nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/register");

  if (isDashboardRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", nextUrl));
  }
});

// تحديد المسارات التي سيعمل عليها الـ Proxy
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
