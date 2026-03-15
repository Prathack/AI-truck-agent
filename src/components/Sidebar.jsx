import React from 'react';
import { MapPin, Calendar, Search, Loader2, BarChart3, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ onSearch }) => {
  const providers = [
    { name: 'National Truck', status: 'Done', price: '$420', color: 'bg-neon-green' },
    { name: 'Enterprise Fleet', status: 'Running', price: '...', color: 'bg-electric-400' },
    { name: 'Penske Logistics', status: 'Extracting', price: '...', color: 'bg-purple-500' },
    { name: 'U-Haul Commercial', status: 'Queued', price: '...', color: 'bg-gray-500' },
    { name: 'Ryder Systems', status: 'Failed', price: 'ERR', color: 'bg-red-500' },
  ];

  const stats = [
    { label: 'Best Price', value: '$385', accent: 'text-neon-green', icon: TrendingUp },
    { label: 'Max Savings', value: '24%', accent: 'text-cyan-400', icon: BarChart3 },
    { label: 'Completed', value: '18/25', accent: 'text-electric-400', icon: CheckCircle },
    { label: 'Elapsed', value: '1.2s', accent: 'text-purple-400', icon: Clock },
  ];

  return (
    <aside className="w-80 md:w-[340px] h-[calc(100vh-80px)] overflow-y-auto border-r border-white/5 bg-black/20 backdrop-blur-md p-4 md:p-6 flex flex-col gap-8 custom-scrollbar">
      {/* Route Search Form */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Route Configuration</h3>
        <div className="space-y-3">
          {[
            { label: 'Pickup Location', icon: MapPin, value: 'Chicago, IL', type: 'text' },
            { label: 'Drop-off Location', icon: MapPin, value: 'Detroit, MI', type: 'text' },
            { label: 'Pickup Details', icon: Calendar, value: '2026-10-24T08:00', type: 'datetime-local' },
            { label: 'Return Details', icon: Calendar, value: '2026-10-28T18:00', type: 'datetime-local' },
          ].map((field, i) => (
            <div key={i} className="group relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-electric-400 transition-colors pointer-events-none">
                <field.icon className="w-4 h-4" />
              </div>
              <input
                type={field.type}
                defaultValue={field.value}
                placeholder={field.label}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-electric-500/50 focus:bg-electric-500/5 [color-scheme:dark]"
              />
            </div>
          ))}
        </div>
        <button 
          onClick={onSearch}
          className="w-full bg-gradient-to-r from-electric-600 to-electric-400 hover:from-electric-500 hover:to-electric-300 text-white font-bold py-3 rounded-xl shadow-lg shadow-electric-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
        >
          <Search className="w-5 h-5" />
          Search All Providers
        </button>
      </div>

      {/* Provider Pipeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">Provider Pipeline</h3>
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono text-white/60">LIVE</span>
        </div>
        <div className="space-y-2">
          {providers.map((provider, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${provider.color} ${provider.status === 'Running' ? 'animate-pulse' : ''}`} />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white/80">{provider.name}</span>
                  <span className="text-[10px] text-white/40">{provider.status}</span>
                </div>
              </div>
              <span className={`text-xs font-mono font-bold ${provider.status === 'Done' ? 'text-neon-green' : 'text-white/40'}`}>
                {provider.price}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Session Stats */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">Session Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {stats.map((stat, i) => (
            <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1">
              <div className="flex items-center justify-between mb-1">
                <stat.icon className={`w-3.5 h-3.5 ${stat.accent.replace('text-', 'text-opacity-50 text-')}`} />
              </div>
              <span className={`text-xl font-bold font-mono ${stat.accent}`}>{stat.value}</span>
              <span className="text-[10px] text-white/40 uppercase font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
