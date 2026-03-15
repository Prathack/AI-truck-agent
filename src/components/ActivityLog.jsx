import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, CheckCircle, AlertTriangle, AlertCircle, Clock } from 'lucide-react';

const ActivityLog = ({ logs }) => {
  const getIcon = (level) => {
    const cls = 'w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0';
    switch (level) {
      case 'success': return <CheckCircle   className={`${cls} text-neon-green`} />;
      case 'warning': return <AlertTriangle className={`${cls} text-yellow-500`} />;
      case 'error':   return <AlertCircle   className={`${cls} text-red-500`} />;
      default:        return <Info          className={`${cls} text-electric-400`} />;
    }
  };

  return (
  <div className="glass-panel rounded-lg sm:rounded-xl lg:rounded-2xl xl:rounded-3xl border border-white/5 overflow-hidden flex flex-col h-[380px] sm:h-[460px] md:h-[520px] lg:h-[600px]">
  {/* Header */}
  <div className="px-3 py-2 sm:px-4 sm:py-3 lg:px-5 border-b border-white/5 bg-white/5 flex items-center justify-between flex-shrink-0">
    <div className="flex items-center gap-2 sm:gap-2.5">
      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white/30 flex-shrink-0" />
      <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-white/60 uppercase tracking-widest">
        Live System Logs
      </h3>
    </div>

    <div className="flex items-center gap-1.5 sm:gap-2">
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-neon-green animate-pulse" />
      <span className="text-[8px] sm:text-[9px] md:text-[10px] font-mono text-white/40">
        CONNECTED
      </span>
    </div>
  </div>

  {/* Log stream */}
  <div className="flex-1 overflow-y-auto px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 space-y-1.5 sm:space-y-2 custom-scrollbar bg-black/40">
    <AnimatePresence initial={false}>
      {logs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center h-full gap-3 text-center py-8 sm:py-10 md:py-12"
        >
          <Clock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white/10" />
          <p className="text-[10px] sm:text-xs md:text-sm text-white/30 max-w-[240px] sm:max-w-xs">
            No activity yet. Run a search to see live logs.
          </p>
        </motion.div>
      ) : (
        logs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-2 sm:gap-3 md:gap-4 p-2 sm:p-2.5 md:p-3 rounded-md sm:rounded-lg md:rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 transition-colors group"
          >
            {/* Timestamp */}
            <span className="hidden sm:block text-[8px] sm:text-[9px] md:text-[10px] font-mono text-white/20 whitespace-nowrap mt-0.5 flex-shrink-0">
              [{log.timestamp}]
            </span>

            <div className="flex-shrink-0 mt-0.5">
              {getIcon(log.level)}
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-[8px] sm:text-[9px] md:text-xs font-bold text-white/80 mr-1.5 sm:mr-2 uppercase tracking-tight">
                {log.provider || 'SYSTEM'}
              </span>

              <p className="text-[9px] sm:text-[10px] md:text-xs text-white/50 inline break-words">
                {log.message}
              </p>
            </div>
          </motion.div>
        ))
      )}
    </AnimatePresence>
  </div>
</div>
  );
};

export default ActivityLog;