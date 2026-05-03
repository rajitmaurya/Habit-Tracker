import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Analytics from './pages/Analytics';
import AIChatbot from './components/AIChatbot';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  if (!isAuthenticated) {
    return <Auth onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="flex-1 lg:ml-72 p-4 md:p-8 lg:p-12 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activePage === 'dashboard' && <Dashboard />}
            {activePage === 'habits' && (
              <div className="flex flex-col items-center justify-center h-[60vh]">
                <h2 className="text-2xl font-bold text-slate-400">Habits Page Coming Soon</h2>
              </div>
            )}
            {activePage === 'analytics' && <Analytics />}
            {activePage === 'settings' && (
              <div className="flex flex-col items-center justify-center h-[60vh]">
                <h2 className="text-2xl font-bold text-slate-400">Settings Page Coming Soon</h2>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        <AIChatbot />
      </main>
    </div>
  );
}

export default App;
