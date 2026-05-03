import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  Zap, 
  CheckCircle2, 
  TrendingUp, 
  Plus, 
  Search, 
  Bell,
  ChevronRight
} from 'lucide-react';
import StatsCard from '../components/StatsCard';
import HabitItem from '../components/HabitItem';
import AddHabitModal from '../components/AddHabitModal';

const data = [
  { name: 'Mon', value: 4 },
  { name: 'Tue', value: 3 },
  { name: 'Wed', value: 5 },
  { name: 'Thu', value: 2 },
  { name: 'Fri', value: 6 },
  { name: 'Sat', value: 8 },
  { name: 'Sun', value: 7 },
];

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habits, setHabits] = useState([
    { id: 1, title: 'Drink 2L Water', streak: 12, frequency: 'Daily', completed: true },
    { id: 2, title: 'Morning Meditation', streak: 5, frequency: 'Daily', completed: false },
    { id: 3, title: 'Read 20 Pages', streak: 8, frequency: 'Daily', completed: true },
    { id: 4, title: 'Evening Workout', streak: 3, frequency: '3x Week', completed: false },
  ]);

  const toggleHabit = (id) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const addHabit = (newHabit) => {
    setHabits([newHabit, ...habits]);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Good Morning, Rajit 👋</h1>
          <p className="text-slate-400 mt-1">You have 4 habits to complete today.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search habits..." 
              className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 w-64"
            />
          </div>
          <button className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors relative">
            <Bell className="w-5 h-5 text-slate-400" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-900" />
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/20 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Habit
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Daily Goal" 
          value="75%" 
          trend={12} 
          icon={CheckCircle2} 
          color="bg-indigo-500" 
        />
        <StatsCard 
          title="Current Streak" 
          value="12 Days" 
          trend={8} 
          icon={Zap} 
          color="bg-orange-500" 
        />
        <StatsCard 
          title="Consistency" 
          value="92%" 
          trend={5} 
          icon={TrendingUp} 
          color="bg-emerald-500" 
        />
        <StatsCard 
          title="Habits Done" 
          value="24" 
          trend={-2} 
          icon={CheckCircle2} 
          color="bg-purple-500" 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Habits List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Today's Focus</h2>
            <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {habits.map((habit) => (
              <HabitItem key={habit.id} habit={habit} onToggle={toggleHabit} />
            ))}
          </div>
        </div>

        {/* Activity Chart */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Activity</h2>
          <div className="glass-card p-6 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(8px)'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-slate-400">Completion</span>
              </div>
              <span className="text-white font-semibold">+24% vs last week</span>
            </div>
          </div>
        </div>
      </div>

      <AddHabitModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addHabit}
      />
    </div>
  );
};

export default Dashboard;
