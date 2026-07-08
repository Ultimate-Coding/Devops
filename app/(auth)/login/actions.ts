// app/(auth)/login/actions.ts
"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "البريد الإلكتروني وكلمة المرور مطلوبان!" };
  }

  try {
    // redirect: false ليتولّى العميل التوجيه لـ /dashboard بعد نجاح الجلسة
    await signIn("credentials", { email, password, redirect: false });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "البريد الإلكتروني أو كلمة المرور غير صحيحة." };
    }
    // أي خطأ آخر (مثل NEXT_REDIRECT) يجب إعادة رميه كما هو
    throw error;
  }
}
