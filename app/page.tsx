'use client';

import React, { useState } from 'react';
import { FloorPlan } from '@/components/FloorPlan';
import { PeopleDock } from '@/components/PeopleDock';
import { INITIAL_PEOPLE, Person, ROOMS } from '@/data/mockData';
import { X, Activity, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations();
  const [people] = useState<Person[]>(INITIAL_PEOPLE);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);

  const selectedPerson = people.find((p) => p.id === selectedPersonId);

  // البحث عن اسم الغرفة المترجم للشخص الموقت
  const getRoomName = (roomId: string) => {
    const room = ROOMS.find((r) => r.id === roomId);
    return room ? t(room.nameKey) : roomId;
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8 flex flex-col items-center justify-start relative overflow-hidden">
      {/* الشريط العلوي */}
      <header className="w-full max-w-6xl flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('dashboard.title')}</h1>
          <p className="text-sm text-slate-400">{t('dashboard.subtitle')}</p>
        </div>
      </header>

      {/* الخريطة التفاعلية */}
      <section className="w-full max-w-6xl">
        <FloorPlan
          people={people}
          selectedPersonId={selectedPersonId}
          onSelectPerson={setSelectedPersonId}
        />
      </section>

      {/* الشريط السفلي Floating Dock */}
      <PeopleDock
        people={people}
        selectedPersonId={selectedPersonId}
        onSelectPerson={setSelectedPersonId}
      />

      {/* الشريط الجانبي للإحصائيات وسجل الشخص (Side Drawer) */}
      <AnimatePresence>
        {selectedPerson && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-slate-900 border-l border-slate-800 p-6 shadow-2xl z-50 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                  {t('dashboard.liveProfile')}
                </span>
                <button
                  onClick={() => setSelectedPersonId(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="text-5xl mb-3">{selectedPerson.avatar}</div>
                <h2 className="text-xl font-bold">{selectedPerson.name}</h2>
                <p className="text-sm text-slate-400">{selectedPerson.role}</p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="bg-slate-800/50 p-3 rounded-xl flex items-center gap-3">
                  <MapPin className="text-indigo-400" size={18} />
                  <div>
                    <p className="text-xs text-slate-400">{t('dashboard.currentLocation')}</p>
                    <p className="font-semibold">{getRoomName(selectedPerson.roomId)}</p>
                  </div>
                </div>

                <div className="bg-slate-800/50 p-3 rounded-xl flex items-center gap-3">
                  <Clock className="text-indigo-400" size={18} />
                  <div>
                    <p className="text-xs text-slate-400">{t('dashboard.entryTime')}</p>
                    <p className="font-semibold">{selectedPerson.joinedAt}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* زر الانتقال لصفحة الإحصائيات التفصيلية */}
            <button
              onClick={() => alert(`${t('dashboard.viewFullHistory')}: ${selectedPerson.name}`)}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
            >
              <Activity size={18} />
              {t('dashboard.viewFullHistory')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}