import React, { useState } from 'react';
import { Truck, Box, Eye, Settings, Terminal, Zap, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ activeTab, setActiveTab, backendStatus = 'online' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'overview',    label: 'Overview',         icon: Box },
    { id: 'comparison',  label: 'Full Comparison',  icon: Zap },
    { id: 'insights',    label: 'Insights',         icon: Eye },
    { id: 'activity',    label: 'Activity',         icon: Terminal },
  ];

  const handleTab = (id) => { setActiveTab(id); setMobileMenuOpen(false); };

  return (
    <>
      <nav className="sticky top-0 z-50 glass-panel border-b border-white/5 py-3 px-4 sm:py-4 sm:px-8 flex items-center justify-between">

        {/* ── Brand ── */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="bg-electric-500/20 p-1.5 sm:p-2 rounded-xl border border-electric-500/30">
            <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-electric-400" />
          </div>
          <span className="text-base sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
            FleetSight
            <span className="text-[9px] sm:text-[10px] bg-white/10 px-1.5 py-0.5 rounded font-mono text-white/50 border border-white/5">v5</span>
          </span>
        </div>

        {/* ── Desktop tab strip ── */}
        <div className="hidden md:flex items-center bg-white/5 rounded-full p-1 border border-white/5">
          {tabs.map(({ id, label, icon: Icon }) => {
            const on = activeTab === id;
            return (
              <button key={id} onClick={() => handleTab(id)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${on ? 'text-white' : 'text-white/50 hover:text-white/80'}`}>
                {on && (
                  <motion.div layoutId="activeTab"
                    className="absolute inset-0 bg-electric-500/20 border border-electric-500/30 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
                )}
                <Icon className="w-4 h-4" />
                {label}
              </button>
            );
          })}
        </div>

        {/* ── Right cluster ── */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Status badge */}
          <div className={`flex items-center gap-1.5 sm:gap-3 bg-white/5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-white/5 ${backendStatus === 'online' ? 'border-neon-green/30' : 'border-red-500/30'}`}>
            <div className="relative flex-shrink-0">
              <div className={`w-2 h-2 rounded-full ${backendStatus === 'online' ? 'bg-neon-green animate-pulse' : 'bg-red-500'}`} />
              {backendStatus === 'online' && <div className="absolute inset-0 w-2 h-2 bg-neon-green rounded-full animate-ping opacity-75" />}
            </div>
            <span className={`hidden sm:block text-[10px] font-semibold uppercase tracking-widest ${backendStatus === 'online' ? 'text-neon-green' : 'text-red-500'}`}>
              {backendStatus === 'checking' ? 'Connecting' : backendStatus === 'online' ? 'Ready' : 'Offline'}
            </span>
          </div>

          {/* Settings — desktop */}
          <button onClick={() => handleTab('settings')}
            className={`hidden md:block transition-colors ${activeTab === 'settings' ? 'text-electric-400' : 'text-white/50 hover:text-white'}`}>
            <Settings className="w-5 h-5" />
          </button>

          {/* Hamburger — mobile */}
          <button onClick={() => setMobileMenuOpen(v => !v)}
            className="md:hidden p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white transition-colors">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile slide-down menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="md:hidden sticky top-[53px] z-40 glass-panel border-b border-white/5 px-4 py-3 flex flex-col gap-1">
            {[...tabs, { id: 'settings', label: 'Settings', icon: Settings }].map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => handleTab(id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                  activeTab === id ? 'bg-electric-500/15 border border-electric-500/25 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/80'}`}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;