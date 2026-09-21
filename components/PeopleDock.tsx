'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Person } from '@/data/mockData';

interface PeopleDockProps {
  people: Person[];
  selectedPersonId: string | null;
  onSelectPerson: (id: string) => void;
}
// qqqd
export const PeopleDock: React.FC<PeopleDockProps> = ({
  people,
  selectedPersonId,
  onSelectPerson,
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/80 border border-slate-800 backdrop-blur-xl px-4 py-3 rounded-full flex items-center gap-3 shadow-2xl z-50">
      {people.map((person) => {
        const isSelected = selectedPersonId === person.id;

        return (
          <motion.button
            key={person.id}
            onClick={() => onSelectPerson(person.id)}
            whileHover={{ y: -5 }}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isSelected
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span className="text-base">{person.avatar}</span>
            <span>{person.name}</span>

            {/* مؤشر بصري تحت الاسم المكتشف */}
            {isSelected && (
              <motion.div
                layoutId="activeDockTab"
                className="absolute -bottom-1 left-4 right-4 h-0.5 bg-indigo-400 rounded-full"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};