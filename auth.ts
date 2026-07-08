// ./auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
import { authConfig } from "./auth.config";
import { db } from "@/lib/db";
import { loginSchema } from "@/lib/validations";

// هاش وهمي ثابت نقارن به عندما لا يوجد مستخدم، حتى يبقى زمن الاستجابة
// متماثلاً ولا يكشف ما إذا كان البريد مسجّلاً (مقاومة User Enumeration / Timing).
const DUMMY_HASH = "$2b$12$QpSrUFpI2hQnLL3jN8xbMenANJOGYTI9ItwF.jE.U11kzDO6hCTTy";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. التحقق من صحة المدخلات
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // 2. جلب المستخدم من قاعدة بيانات pentrack
        const user = await db.user.findUnique({ where: { email } });

        // 3. مقارنة كلمة المرور مع الهاش. نقارن دائماً (حتى لو لم يوجد
        //    مستخدم) لإبقاء الزمن ثابتاً ومنع كشف البريد المسجّل.
        const passwordMatches = await compare(
          password,
          user?.password ?? DUMMY_HASH
        );

        if (!user || !passwordMatches) return null;

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
});
