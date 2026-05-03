import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Target, Calendar, Plus } from 'lucide-react';
import { cn } from '../utils/utils';

const AddHabitModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('health');
  const [frequency, setFrequency] = useState('Daily');

  const categories = [
    { id: 'health', label: 'Health', color: 'bg-emerald-500' },
    { id: 'mind', label: 'Mind', color: 'bg-blue-500' },
    { id: 'productivity', label: 'Work', color: 'bg-purple-500' },
    { id: 'finance', label: 'Money', color: 'bg-amber-500' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    onAdd({ id: Date.now(), title: name, streak: 0, frequency, completed: false });
    setName('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/20">
                    <Plus className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">New Habit</h2>
                    <p className="text-sm text-slate-400">Set a new goal for yourself</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Habit Name</label>
                  <div className="relative">
                    <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Morning Meditation"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-3 block">Category</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={cn(
                          "py-3 px-2 rounded-2xl border transition-all duration-300 text-sm font-medium flex flex-col items-center gap-2",
                          category === cat.id 
                            ? "bg-indigo-500/20 border-indigo-500/50 text-white" 
                            : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                        )}
                      >
                        <div className={cn("w-2 h-2 rounded-full", cat.color)} />
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Frequency</label>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer"
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Reminder</label>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">8:00 AM</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  Create Habit
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddHabitModal;
