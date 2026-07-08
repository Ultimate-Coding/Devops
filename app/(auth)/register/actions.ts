// app/(auth)/register/actions.ts
"use server";

import { hash } from "bcrypt-ts";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/validations";

// عدد جولات الـ salt لخوارزمية bcrypt (12 توازن جيد بين الأمان والأداء).
const SALT_ROUNDS = 12;

export async function registerUser(formData: FormData) {
  // 1. التحقق من صحة المدخلات وتطبيعها (Input Validation)
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    // نعيد أول رسالة خطأ واضحة للمستخدم
    return { error: parsed.error.issues[0]?.message ?? "بيانات غير صالحة." };
  }

  const { name, email, password } = parsed.data;

  try {
    // 2. التحقق مما إذا كان الإيميل مسجلاً مسبقاً
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "هذا البريد الإلكتروني مسجل بالفعل!" };
    }

    // 3. تشفير كلمة المرور قبل التخزين (لا نخزّن كلمة المرور كنص واضح أبداً)
    const hashedPassword = await hash(password, SALT_ROUNDS);

    // 4. إنشاء المستخدم الجديد في PostgreSQL
    await db.user.create({
      data: { name, email, password: hashedPassword },
    });

    return { success: true };
  } catch (error) {
    // يُطبع الخطأ الحقيقي في الـ Terminal للتشخيص فقط
    console.error("🔴 REGISTER BACKEND ERROR:", error);
    return { error: "حدث خطأ غير متوقع أثناء إنشاء الحساب." };
  }
}
