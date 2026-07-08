// lib/validations.ts
// مخططات التحقق من المدخلات (Input Validation) لطبقة الأمان.
import { z } from "zod";

// سياسة كلمة المرور: 8 أحرف على الأقل، وحد أقصى 72 بايت (حد خوارزمية bcrypt).
// نتبع توصية NIST 800-63B: التركيز على الطول بدل قواعد التعقيد المعقّدة.
const passwordSchema = z
  .string()
  .min(8, { message: "كلمة المرور يجب أن تكون 8 أحرف على الأقل." })
  .max(72, { message: "كلمة المرور طويلة جداً (الحد الأقصى 72 حرفاً)." });

const emailSchema = z
  .email({ message: "صيغة البريد الإلكتروني غير صحيحة." })
  .trim()
  .toLowerCase();

export const registerSchema = z.object({
  name: z.string().trim().min(1, { message: "الاسم مطلوب." }).max(120).optional(),
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: "كلمة المرور مطلوبة." }).max(72),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
