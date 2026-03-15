import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ toasts, removeToast }) => {
  return (
    /* bottom-4 right-4 on mobile, bottom-6 right-6 on desktop */
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col gap-2 sm:gap-3 pointer-events-none max-w-[calc(100vw-2rem)] sm:max-w-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className={`pointer-events-auto flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl glass-panel border shadow-2xl w-full sm:min-w-[300px] sm:max-w-[360px] ${
              toast.type === 'success' ? 'border-neon-green/30' :
              toast.type === 'error'   ? 'border-red-500/30'    : 'border-electric-500/30'
            }`}
          >
            {/* Icon */}
            <div className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${
              toast.type === 'success' ? 'bg-neon-green/10  text-neon-green'   :
              toast.type === 'error'   ? 'bg-red-500/10     text-red-500'      :
                                         'bg-electric-500/10 text-electric-400'
            }`}>
              {toast.type === 'success' && <CheckCircle  className="w-4 h-4 sm:w-5 sm:h-5" />}
              {toast.type === 'error'   && <AlertCircle  className="w-4 h-4 sm:w-5 sm:h-5" />}
              {toast.type === 'info'    && <Info         className="w-4 h-4 sm:w-5 sm:h-5" />}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white capitalize">{toast.type}</h4>
              <p className="text-[10px] sm:text-xs text-white/60 leading-relaxed break-words">{toast.message}</p>
            </div>

            {/* Close */}
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-white/5 rounded-lg transition-colors text-white/30 hover:text-white flex-shrink-0"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;