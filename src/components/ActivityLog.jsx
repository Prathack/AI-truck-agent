import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, CheckCircle, AlertTriangle, AlertCircle, Clock } from 'lucide-react';

const ActivityLog = ({ logs }) => {
  const getIcon = (level) => {
    switch (level) {
      case 'success': return <CheckCircle className="w-4 h-4 text-neon-green" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Info className="w-4 h-4 text-electric-400" />;
    }
  };

  return (
    <div className="glass-panel rounded-3xl border border-white/5 overflow-hidden flex flex-col h-[min(60vh,600px)] md:h-[600px]">
      <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-white/30" />
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest">Live System Logs</h3>
        </div>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-[10px] font-mono text-white/40">CONNECTED</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar bg-black/40">
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-4 p-3 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 transition-colors group"
            >
              <span className="text-[10px] font-mono text-white/20 whitespace-nowrap mt-0.5">
                [{log.timestamp}]
              </span>
              <div className="shrink-0 mt-0.5">
                {getIcon(log.level)}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-white/80 mr-2 uppercase tracking-tighter">
                  {log.provider || 'SYSTEM'}
                </span>
                <p className="text-xs text-white/50 inline">{log.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActivityLog;
