// ./auth.config.ts
// إعدادات آمنة على Edge runtime (بدون Prisma) — يستوردها الـ middleware.
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login", // مكان صفحة الدخول الخاصة بنا
  },
  providers: [], // مزوّدو الدخول (Credentials) يُضافون في auth.ts فقط
} satisfies NextAuthConfig;
