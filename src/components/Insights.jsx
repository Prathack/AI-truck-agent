import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, PieChart, Activity, Info } from 'lucide-react';

const Insights = () => {
  const chartData = [
    { label: 'National', value: 75 },
    { label: 'Regional', value: 45 },
    { label: 'P2P', value: 90 },
    { label: 'Specialty', value: 30 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col gap-6 shadow-2xl hover:border-white/10 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Price Distribution</h3>
            <p className="text-sm text-white/40">Market analysis for Chicago to Detroit</p>
          </div>
          <div className="bg-electric-500/10 p-2 rounded-xl border border-electric-500/20 text-electric-400">
            <PieChart className="w-5 h-5" />
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-around py-8">
           {chartData.map((item, i) => (
             <div key={i} className="flex flex-col items-center gap-4">
               <div className="relative w-16 h-40 bg-white/5 rounded-2xl overflow-hidden border border-white/5 flex flex-col justify-end">
                 <motion.div
                   initial={{ height: 0 }}
                   animate={{ height: `${item.value}%` }}
                   transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                   className={`w-full ${i % 2 === 0 ? 'bg-electric-500' : 'bg-cyan-400'} rounded-t-lg shadow-lg shadow-blue-500/20`}
                 />
                 <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-t from-navy-900/40 to-transparent" />
               </div>
               <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{item.label}</span>
             </div>
           ))}
        </div>
      </motion.div>

      <div className="flex flex-col gap-6">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-8 rounded-3xl border border-white/5 flex items-center gap-6 shadow-2xl hover:border-white/10 transition-colors bg-gradient-to-br from-neon-green/5 to-transparent"
        >
          <div className="bg-neon-green/10 p-4 rounded-2xl border border-neon-green/20 text-neon-green">
            <TrendingDown className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-1">Potential Savings</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold font-mono text-white">$145.50</span>
              <span className="text-xs text-neon-green font-bold">(-28%)</span>
            </div>
            <p className="text-xs text-white/30 mt-1">Based on peer-to-peer provider averages</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-8 rounded-3xl border border-white/5 shadow-2xl hover:border-white/10 transition-colors"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest">Market Insights</h3>
            <Activity className="w-4 h-4 text-white/20" />
          </div>
          <div className="space-y-4">
            {[
              "Strong availability detected for Box Trucks in Chicago.",
              "Prices are 12% lower than historical average for October.",
              "Wait times for National providers increasing (+1.2m).",
              "New provider 'FleetFlow' offering introductory rates."
            ].map((text, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer shadow-lg"
              >
                <Info className="w-4 h-4 text-electric-400 shrink-0 mt-0.5" />
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
