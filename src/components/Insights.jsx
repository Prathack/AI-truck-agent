import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, PieChart, Activity, Info } from 'lucide-react';

const Insights = () => {
  const chartData = [
    { label: 'National', value: 75 },
    { label: 'Regional', value: 45 },
    { label: 'P2P',      value: 90 },
    { label: 'Specialty',value: 30 },
  ];

  const insights = [
    'Strong availability detected for Box Trucks in Chicago.',
    'Prices are 12% lower than historical average for October.',
    'Wait times for National providers increasing (+1.2m).',
    "New provider 'FleetFlow' offering introductory rates.",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
    >
      {/* ── Bar chart card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/5 flex flex-col gap-4 sm:gap-6 shadow-2xl hover:border-white/10 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-xl font-bold text-white mb-1">Price Distribution</h3>
            <p className="text-xs sm:text-sm text-white/40">Market analysis — Chicago to Detroit</p>
          </div>
          <div className="bg-electric-500/10 p-2 rounded-xl border border-electric-500/20 text-electric-400 flex-shrink-0">
            <PieChart className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Chart — horizontal bars on mobile, vertical bars on desktop */}
        <div className="flex-1">
          {/* Mobile: horizontal bars */}
          <div className="flex flex-col gap-3 sm:hidden">
            {chartData.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 w-14 flex-shrink-0">{item.label}</span>
                <div className="flex-1 h-7 bg-white/5 rounded-lg overflow-hidden border border-white/5 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                    className={`h-full ${i % 2 === 0 ? 'bg-electric-500' : 'bg-cyan-400'} rounded-lg flex items-center justify-end pr-2`}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/70">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: vertical bars */}
          <div className="hidden sm:flex items-end justify-around py-6 gap-3">
            {chartData.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-4 flex-1">
                <div className="relative w-14 lg:w-16 h-36 bg-white/5 rounded-2xl overflow-hidden border border-white/5 flex flex-col justify-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${item.value}%` }}
                    transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                    className={`w-full ${i % 2 === 0 ? 'bg-electric-500' : 'bg-cyan-400'} rounded-t-lg shadow-lg shadow-blue-500/20`}
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-navy-900/40 to-transparent" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Right column ── */}
      <div className="flex flex-col gap-4 sm:gap-6">

        {/* Savings card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/5 flex items-center gap-4 sm:gap-6 shadow-2xl hover:border-white/10 transition-colors bg-gradient-to-br from-neon-green/5 to-transparent"
        >
          <div className="bg-neon-green/10 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-neon-green/20 text-neon-green flex-shrink-0">
            <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-white/40 uppercase tracking-widest mb-1">Potential Savings</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-4xl font-bold font-mono text-white">$145.50</span>
              <span className="text-xs text-neon-green font-bold">(-28%)</span>
            </div>
            <p className="text-xs text-white/30 mt-1">Based on peer-to-peer averages</p>
          </div>
        </motion.div>

        {/* Market insights */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/5 shadow-2xl hover:border-white/10 transition-colors"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-xs sm:text-sm font-semibold text-white/40 uppercase tracking-widest">Market Insights</h3>
            <Activity className="w-4 h-4 text-white/20" />
          </div>
          <div className="space-y-2.5 sm:space-y-4">
            {insights.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ scale: 1.01, x: 4 }}
                className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer shadow-lg"
              >
                <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-electric-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-white/80 leading-relaxed font-medium">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Insights;