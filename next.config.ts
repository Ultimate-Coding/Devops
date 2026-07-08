import type { NextConfig } from "next";

// طبقة رؤوس الأمان (Security Headers) — تُطبَّق على كل المسارات.
// مرجع: توصيات OWASP Secure Headers + توثيق Next.js.
const securityHeaders = [
  // يفرض استخدام HTTPS لمدة سنتين ويشمل النطاقات الفرعية (فعّال في الإنتاج عبر HTTPS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // يمنع تضمين الموقع داخل iframe (حماية من Clickjacking)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // يمنع المتصفح من تخمين نوع المحتوى (حماية من MIME sniffing)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // يتحكم بكمية معلومات الـ Referrer المُرسلة للمواقع الأخرى
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // يعطّل واجهات حسّاسة لا نستخدمها افتراضياً
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // إخفاء رأس X-Powered-By الذي يكشف أن الخادم يعمل بـ Next.js (بصمة أقل)
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
