// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"; // إذا كان لديك Alias للـ @ أو استخدم المسار النسبي ../../../../auth
export const { GET, POST } = handlers;