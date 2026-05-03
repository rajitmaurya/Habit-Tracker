import React from 'react';
import { motion } from 'framer-motion';
import { Check, Flame, Calendar } from 'lucide-react';
import { cn } from '../utils/utils';

const HabitItem = ({ habit, onToggle }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-4 flex items-center justify-between group"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => onToggle(habit.id)}
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border",
            habit.completed
              ? "bg-indigo-500 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
              : "bg-white/5 border-white/10 hover:border-white/20"
          )}
        >
          {habit.completed ? (
            <Check className="w-6 h-6 text-white" />
          ) : (
            <div className="w-3 h-3 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors" />
          )}
        </button>
        
        <div>
          <h4 className={cn(
            "text-lg font-semibold transition-all duration-300",
            habit.completed ? "text-slate-400 line-through" : "text-white"
          )}>
            {habit.title}
          </h4>
          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-500" />
              {habit.streak} day streak
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {habit.frequency}
            </span>
          </div>
        </div>
      </div>

      <div className="flex -space-x-2">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className={cn(
              "w-2 h-8 rounded-full border border-slate-900",
              i === 4 ? "bg-indigo-500/80" : "bg-indigo-500/20"
            )}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default HabitItem;
