// app/(auth)/login/page.tsx
"use client"; // نحتاج الـ Client هنا للتعامل مع الـ Forms والـ State

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "./actions";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      // نجح الدخول! وجّه المستخدم للوحة التحكم
      router.push("/dashboard");
      router.refresh(); // لتحديث حالة الجلسة على الخادم
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 text-center mb-2">
        تسجيل الدخول
      </h3>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg text-center font-medium">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          البريد الإلكتروني
        </label>
        <input
          name="email"
          type="email"
          required
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="name@company.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          كلمة المرور
        </label>
        <input
          name="password"
          type="password"
          required
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors shadow-sm"
      >
        {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
      </button>

      <p className="text-sm text-center text-zinc-600 dark:text-zinc-400 mt-4">
        ليس لديك حساب؟{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          إنشاء حساب جديد
        </Link>
      </p>
    </form>
  );
}
