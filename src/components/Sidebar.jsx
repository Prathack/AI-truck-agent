import React, { useState } from 'react';
import { MapPin, Calendar, Search, BarChart3, TrendingUp, CheckCircle, Clock, ChevronDown, ChevronUp, SlidersHorizontal, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ onSearch }) => {
  // ── Start COLLAPSED on mobile so results are visible immediately ──
  const [collapsed, setCollapsed] = useState(true);
  // Track whether a search has been run (to show the "View Results" nudge)
  const [hasSearched, setHasSearched] = useState(false);

  const providers = [
    { name: 'National Truck',    status: 'Done',       price: '$420', color: 'bg-neon-green'   },
    { name: 'Enterprise Fleet',  status: 'Running',    price: '...',  color: 'bg-electric-400' },
    { name: 'Penske Logistics',  status: 'Extracting', price: '...',  color: 'bg-purple-500'   },
    { name: 'U-Haul Commercial', status: 'Queued',     price: '...',  color: 'bg-gray-500'     },
    { name: 'Ryder Systems',     status: 'Failed',     price: 'ERR',  color: 'bg-red-500'      },
  ];

  const stats = [
    { label: 'Best Price',  value: '$385',  accent: 'text-neon-green',   icon: TrendingUp  },
    { label: 'Max Savings', value: '24%',   accent: 'text-cyan-400',     icon: BarChart3   },
    { label: 'Completed',   value: '18/25', accent: 'text-electric-400', icon: CheckCircle },
    { label: 'Elapsed',     value: '1.2s',  accent: 'text-purple-400',   icon: Clock       },
  ];

  // ── Called when user taps "Search All Providers" ──
  const handleSearch = () => {
    onSearch();
    // Auto-collapse the sidebar so results fill the screen
    setCollapsed(true);
    setHasSearched(true);
  };

  return (
    <>
      {/* ══════════════════════════════════════════
          DESKTOP — fixed left panel (md+)
          Unchanged — always visible
      ══════════════════════════════════════════ */}
      <aside className="hidden md:flex w-[300px] lg:w-[340px] md:h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] overflow-y-auto border-r border-white/5 bg-black/20 backdrop-blur-md p-6 flex-col gap-8 custom-scrollbar flex-shrink-0">
        <SidebarContent
          providers={providers}
          stats={stats}
          onSearch={handleSearch}
        />
      </aside>

      {/* ══════════════════════════════════════════
          MOBILE — collapsible drawer
      ══════════════════════════════════════════ */}
      <div className="md:hidden w-full border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-30">

        {/* ── Toggle header bar ── */}
        <button
          onClick={() => setCollapsed(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 text-white/60 active:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-electric-500/15 border border-electric-500/20">
              <SlidersHorizontal className="w-3.5 h-3.5 text-electric-400" />
            </div>
            <span className="text-sm font-semibold text-white/80">
              {collapsed ? 'Edit Search' : 'Route Search & Pipeline'}
            </span>
            {/* Live dot — shown when collapsed and search is running */}
            {collapsed && hasSearched && (
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-neon-green">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                LIVE
              </span>
            )}
          </div>
          <motion.div
            animate={{ rotate: collapsed ? 0 : 180 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-white/40" />
          </motion.div>
        </button>

        {/* ── Expandable body ── */}
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              key="sidebar-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-5 pt-1 flex flex-col gap-5">
                <SidebarContent
                  providers={providers}
                  stats={stats}
                  onSearch={handleSearch}
                  mobile
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE — "scroll down for results" nudge
          Shown briefly after first search fires
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {hasSearched && collapsed && (
          <motion.div
            key="results-nudge"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="md:hidden flex items-center justify-center gap-2 py-2 bg-electric-500/8 border-b border-electric-500/15"
          >
            <ArrowDown className="w-3 h-3 text-electric-400 animate-bounce" />
            <span className="text-[11px] font-semibold text-electric-400 tracking-wide">
              Results loading below
            </span>
            <ArrowDown className="w-3 h-3 text-electric-400 animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ══════════════════════════════════════════════
   Shared form + pipeline + stats content
══════════════════════════════════════════════ */
const SidebarContent = ({ providers, stats, onSearch, mobile }) => (
  <>
    {/* Route form */}
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">Route Configuration</h3>
      <div className={`grid ${mobile ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'} gap-2.5`}>
        {[
          { label: 'Pickup Location',   icon: MapPin,   value: 'Chicago, IL',      type: 'text'           },
          { label: 'Drop-off Location', icon: MapPin,   value: 'Detroit, MI',      type: 'text'           },
          { label: 'Pickup Date/Time',  icon: Calendar, value: '2026-10-24T08:00', type: 'datetime-local' },
          { label: 'Return Date/Time',  icon: Calendar, value: '2026-10-28T18:00', type: 'datetime-local' },
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

      {/* ── Search button — triggers collapse on mobile ── */}
      <button
        onClick={onSearch}
        className="w-full bg-gradient-to-r from-electric-600 to-electric-400 hover:from-electric-500 hover:to-electric-300 text-white font-bold py-3 rounded-xl shadow-lg shadow-electric-500/20 transition-all hover:scale-[1.02] active:scale-[0.97] flex items-center justify-center gap-2"
      >
        <Search className="w-5 h-5" />
        Search All Providers
      </button>
    </div>

    {/* Provider pipeline */}
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">Provider Pipeline</h3>
        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono text-white/60">LIVE</span>
      </div>
      <div className={`${mobile ? 'grid grid-cols-1 sm:grid-cols-2 gap-2' : 'flex flex-col gap-2'}`}>
        {providers.map((p, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${p.color} ${p.status === 'Running' ? 'animate-pulse' : ''}`} />
              <div className="min-w-0">
                <span className="text-sm font-medium text-white/80 truncate block">{p.name}</span>
                <span className="text-[10px] text-white/40">{p.status}</span>
              </div>
            </div>
            <span className={`text-xs font-mono font-bold flex-shrink-0 ml-2 ${p.status === 'Done' ? 'text-neon-green' : 'text-white/40'}`}>
              {p.price}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Stats */}
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">Session Metrics</h3>
      <div className="grid grid-cols-2 gap-2.5">
        {stats.map((s, i) => (
          <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1">
            <s.icon className={`w-3.5 h-3.5 ${s.accent} opacity-60`} />
            <span className={`text-xl font-bold font-mono ${s.accent}`}>{s.value}</span>
            <span className="text-[10px] text-white/40 uppercase font-semibold leading-tight">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default Sidebar;