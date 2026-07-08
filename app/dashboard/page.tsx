// app/dashboard/page.tsx
"use client";

import React, { useState } from "react";
// النسخة 8 من react-map-gl: يُستورد المكوّن من المسار الفرعي react-map-gl/mapbox
import Map, { type ViewStateChangeEvent } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css"; // ضروري جداً لظهور تنسيقات وأزرار الخريطة بشكل صحيح

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function DashboardPage() {
  // إعدادات العرض الأولية للخريطة (مثلاً على إحداثيات مدينة عمان، الأردن كمثال)
  const [viewState, setViewState] = useState({
    longitude: 35.9106,
    latitude: 31.9539,
    zoom: 11,
  });

  return (
    <div className="flex h-screen w-screen font-sans bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
      
      {/* الشريط الجانبي (Sidebar) لعرض قائمة الأجهزة والآلات تحت التتبع */}
      <aside className="w-80 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col z-10 shadow-lg">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <span>pentrack</span> <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded-full font-medium">لوحة التحكم</span>
          </h1>
          <p className="text-xs text-zinc-500 mt-1">تتبع مباشر للآلات والأشخاص</p>
        </div>
        
        {/* قائمة تجريبية للمستهدفين بالتتبع */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">العناصر النشطة (3)</h3>
          
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-between cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-750 transition-colors">
            <div>
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">الآلة رقم شاحنة-01</p>
              <p className="text-xs text-green-500 flex items-center gap-1 mt-0.5">● متحرك حالياً</p>
            </div>
          </div>

          <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-between cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-750 transition-colors">
            <div>
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">المندوب: أحمد علي</p>
              <p className="text-xs text-amber-500 flex items-center gap-1 mt-0.5">● متوقف مؤقتاً</p>
            </div>
          </div>
        </div>
      </aside>

      {/* منطقة الخريطة الرئيسية */}
      <main className="flex-1 h-full w-full relative">
        {MAPBOX_TOKEN ? (
          <Map
            {...viewState}
            onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/streets-v12" // يمكنك تغيير الثيم إلى dark-v11 أو satellite-v11 لاحقاً
            mapboxAccessToken={MAPBOX_TOKEN}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-200 dark:bg-zinc-900 text-zinc-500 p-4 text-center">
            ⚠️ يرجى إضافة توكن Mapbox (NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) في ملف .env.local لتشغيل الخريطة.
          </div>
        )}
      </main>

    </div>
  );
}