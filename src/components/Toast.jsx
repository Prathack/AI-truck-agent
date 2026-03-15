import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className={`pointer-events-auto flex items-center gap-4 p-4 rounded-2xl glass-panel border shadow-2xl min-w-[280px] md:min-w-[320px] ${
              toast.type === 'success' ? 'border-neon-green/30' :
              toast.type === 'error' ? 'border-red-500/30' : 'border-electric-500/30'
            }`}
          >
            <div className={`p-2 rounded-xl ${
              toast.type === 'success' ? 'bg-neon-green/10 text-neon-green' :
              toast.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-electric-500/10 text-electric-400'
            }`}>
              {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
              {toast.type === 'info' && <Info className="w-5 h-5" />}
            </div>
            
            <div className="flex-1">
              <h4 className="text-sm font-bold text-white capitalize">{toast.type}</h4>
              <p className="text-xs text-white/60">{toast.message}</p>
            </div>

            <button 
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-white/5 rounded-lg transition-colors text-white/30 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
