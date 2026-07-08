// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 font-sans p-8">
      <h1 className="text-4xl font-bold text-zinc-900 mb-4">
        مرحباً بك في منصة إدارة المهام الذكية 🚀
      </h1>
      <p className="text-zinc-600 text-lg mb-8 text-center max-w-md">
        هذا المشروع مبني خطوة بخطوة باستخدام Next.js App Router لتعلم المفاهيم المتقدمة.
      </p>
      
      {/* استخدم Link من Next.js للتنقل السريع بين الصفحات بدون عمل Refresh للمتصفح */}
      <Link 
        href="/tasks" 
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        الانتقال إلى لوحة المهام
      </Link>
    </div>
  );
}