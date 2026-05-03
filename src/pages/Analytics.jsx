import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  Target,
  Brain,
  ChevronDown
} from 'lucide-react';

const weeklyData = [
  { name: 'Mon', completion: 80, intensity: 60 },
  { name: 'Tue', completion: 65, intensity: 45 },
  { name: 'Wed', completion: 90, intensity: 80 },
  { name: 'Thu', completion: 70, intensity: 50 },
  { name: 'Fri', completion: 85, intensity: 75 },
  { name: 'Sat', completion: 40, intensity: 30 },
  { name: 'Sun', completion: 95, intensity: 90 },
];

const categoryData = [
  { name: 'Health', value: 400, color: '#10b981' },
  { name: 'Mind', value: 300, color: '#3b82f6' },
  { name: 'Work', value: 300, color: '#8b5cf6' },
  { name: 'Finance', value: 200, color: '#f59e0b' },
];

const Analytics = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Performance Insights</h1>
          <p className="text-slate-400 mt-1">Deep dive into your habits and consistency</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
          Last 30 Days <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* AI Insight Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      >
        <div className="glass-card p-8 bg-slate-950/80 backdrop-blur-2xl rounded-[22px] flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
            <Brain className="w-10 h-10 text-indigo-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              AI Consistency Insight
              <Sparkles className="w-5 h-5 text-amber-400" />
            </h3>
            <p className="text-slate-300 mt-2 leading-relaxed">
              "Rajit, your meditation habit is 40% more consistent on days when you complete your workout first. 
              Try stacking these habits in the morning to maintain your 12-day streak."
            </p>
          </div>
          <button className="px-6 py-3 bg-white text-slate-950 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-colors">
            Optimize Routine
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Completion Rate Chart */}
        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-white">Completion Rate</h3>
              <p className="text-sm text-slate-500">Weekly progress vs intensity</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-xs text-slate-400">Done</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-purple-500/30" />
                <span className="text-xs text-slate-400">Focus</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px'
                  }}
                />
                <Bar dataKey="completion" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="intensity" fill="rgba(168, 85, 247, 0.2)" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="glass-card p-8">
          <h3 className="text-lg font-bold text-white mb-8">Focus Distribution</h3>
          <div className="h-[300px] flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-1/2 space-y-4">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-sm text-slate-400">{cat.name}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{Math.round(cat.value/1200 * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="glass-card p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-white">Monthly Consistency</h3>
            <p className="text-sm text-slate-500">Long-term habit formation trend</p>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
            <TrendingUp className="w-4 h-4" />
            +18% from last month
          </div>
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" hide />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="completion" 
                stroke="#6366f1" 
                strokeWidth={4} 
                dot={{ fill: '#6366f1', strokeWidth: 2, r: 6 }} 
                activeDot={{ r: 8, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
