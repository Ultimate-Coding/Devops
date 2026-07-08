// app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-100 font-sans dark:bg-zinc-900 justify-center items-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 tracking-tight">
            pentrack 📍
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm">
            نظام تتبع الأشخاص والآلات الذكي
          </p>
        </div>
        
        {/* هنا سيتم عرض محتوى صفحة الدخول أو التسجيل */}
        {children}
      </div>
    </div>
  );
}