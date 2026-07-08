// app/(auth)/register/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "./actions";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await registerUser(formData);

    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      // نجح التسجيل! وجه المستخدم لصفحة الدخول
      router.push("/login?registered=true");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-200 text-center mb-2">إنشاء حساب جديد</h3>
      
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg text-center font-medium">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          الاسم الكامل / اسم الشركة
        </label>
        <input
          name="name"
          type="text"
          required
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="أحمد ملقاوي"
        />
      </div>

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
        {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
      </button>

      <p className="text-sm text-center text-zinc-600 dark:text-zinc-400 mt-4">
        لديك حساب بالفعل؟{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          تسجيل الدخول
        </Link>
      </p>
    </form>
  );
}