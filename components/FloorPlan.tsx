'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ROOMS, Person } from '@/data/mockData';

interface FloorPlanProps {
  people: Person[];
  selectedPersonId: string | null;
  onSelectPerson: (id: string) => void;
}

export const FloorPlan: React.FC<FloorPlanProps> = ({
  people,
  selectedPersonId,
  onSelectPerson,
}) => {
  const t = useTranslations();

  return (
    <div className="relative w-full h-[500px] bg-slate-900/60 border border-slate-800 rounded-3xl p-4 overflow-hidden backdrop-blur-md shadow-2xl">
      {/* رسم الغرف */}
      {ROOMS.map((room) => {
        const peopleInRoom = people.filter((p) => p.roomId === room.id);

        return (
          <div
            key={room.id}
            style={room.style}
            className="absolute border border-slate-700/60 bg-slate-800/30 rounded-2xl p-3 flex flex-col justify-between transition-all duration-300 hover:border-slate-500/50"
          >
            {/* قراءة اسم الغرفة عبر مفتاح الترجمة */}
            <span className="text-xs font-semibold text-slate-400 tracking-wider">
              {t(room.nameKey)}
            </span>

            {/* عرض أيقونات الأشخاص داخل الغرفة */}
            <div className="flex flex-wrap gap-2 items-center justify-center my-auto">
              {peopleInRoom.map((person) => {
                const isSelected = selectedPersonId === person.id;

                return (
                  <motion.button
                    key={person.id}
                    onClick={() => onSelectPerson(person.id)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative p-3 rounded-2xl flex items-center justify-center text-2xl transition-all ${
                      isSelected
                        ? 'bg-indigo-600 shadow-lg shadow-indigo-500/50 z-20'
                        : 'bg-slate-800/80 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    {person.avatar}

                    {/* هالة ضوئية عند تحديد الشخص */}
                    {isSelected && (
                      <motion.div
                        layoutId="ping"
                        className="absolute inset-0 rounded-2xl bg-indigo-500/40 -z-10 animate-ping"
                      />
                    )}

                    {/* مؤشر الحالة الصغيرة */}
                    <span
                      className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900 ${
                        person.status === 'warning'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};