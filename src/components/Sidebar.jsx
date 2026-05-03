import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/utils';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 group",
        active 
          ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" 
          : "text-slate-400 hover:text-white hover:bg-white/5"
      )}
    >
      <Icon className={cn("w-5 h-5", active ? "text-indigo-400" : "group-hover:text-white")} />
      <span className="font-medium">{label}</span>
      {active && (
        <motion.div
          layoutId="active-indicator"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]"
        />
      )}
    </motion.button>
  );
};

const Sidebar = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'habits', icon: CheckCircle2, label: 'Habits' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'goals', icon: Target, label: 'Goals' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-900 border border-white/10"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-slate-950/50 backdrop-blur-xl border-r border-white/5 z-45 transition-all duration-500 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              HabitAI
            </h1>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.id}
                {...item}
                active={activePage === item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setIsOpen(false);
                }}
              />
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5">
            <SidebarItem icon={LogOut} label="Sign Out" onClick={() => {}} />
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5">
              <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-semibold">Pro Plan</p>
              <p className="text-sm text-slate-200 mb-3">Get advanced AI insights and unlimited habits.</p>
              <button className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-medium transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
