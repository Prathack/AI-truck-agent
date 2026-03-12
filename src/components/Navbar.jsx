import React from 'react';
import { Truck, Activity, Box, Eye, Settings, Terminal, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ activeTab, setActiveTab, backendStatus = 'online' }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Box },
    { id: 'comparison', label: 'Full Comparison', icon: Zap },
    { id: 'insights', label: 'Insights', icon: Eye },
    { id: 'activity', label: 'Activity', icon: Terminal },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/5 py-4 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-electric-500/20 p-2 rounded-xl border border-electric-500/30">
          <Truck className="w-6 h-6 text-electric-400" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            DityTruck
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded font-mono text-white/50 border border-white/5">v4.0.2</span>
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center bg-white/5 rounded-full p-1 border border-white/5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-electric-500/20 border border-electric-500/30 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-6">
        <div className={`flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 transition-colors ${backendStatus === 'online' ? 'border-neon-green/30' : 'border-red-500/30'}`}>
          <div className="relative">
            <div className={`w-2 h-2 rounded-full ${backendStatus === 'online' ? 'bg-neon-green animate-pulse' : 'bg-red-500'}`} />
            {backendStatus === 'online' && <div className="absolute inset-0 w-2 h-2 bg-neon-green rounded-full animate-ping opacity-75" />}
          </div>
          <span className="text-xs font-mono text-white/70">AI</span>
          <span className={`text-[10px] font-semibold uppercase tracking-widest ${backendStatus === 'online' ? 'text-neon-green' : 'text-red-500'}`}>
            {backendStatus === 'checking' ? 'Connecting...' : backendStatus === 'online' ? 'Ready' : 'Offline'}
          </span>
        </div>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`transition-colors ${activeTab === 'settings' ? 'text-electric-400' : 'text-white/50 hover:text-white'}`}
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
