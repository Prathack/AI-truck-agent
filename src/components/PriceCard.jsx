import React from 'react';
import { Star, CheckCircle2, ArrowUpRight, ShieldCheck, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const PriceCard = ({ provider, isBestPrice, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl transition-all duration-300 flex flex-col justify-between ${
        isBestPrice
          ? 'bg-gradient-to-br from-electric-900/40 to-navy-900/80 border-electric-500/30 ring-1 ring-electric-500/20'
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
      } border backdrop-blur-sm shadow-xl group hover:shadow-electric-500/10`}
    >
      {/* Best value badge */}
      {isBestPrice && (
        <div className="absolute -top-3 -right-3 z-10 px-2.5 py-1 sm:px-3 bg-neon-green text-navy-900 text-[9px] sm:text-[10px] font-bold rounded-full shadow-lg shadow-neon-green/20 uppercase tracking-widest animate-bounce">
          Best Value
        </div>
      )}

      {/* Header row */}
      <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          {/* Avatar */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 border border-white/5 flex items-center justify-center font-bold text-base sm:text-lg text-white/50 group-hover:text-white/80 transition-colors flex-shrink-0">
            {provider.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-white text-base sm:text-lg leading-tight truncate" title={provider.name}>
              {provider.name}
            </h3>
            <span className="text-[10px] sm:text-xs text-white/40 font-medium uppercase tracking-wider block truncate" title={provider.category}>
              {provider.category}
            </span>
          </div>
        </div>
        {/* Stars + confidence */}
        <div className="flex flex-col items-end flex-shrink-0">
          <div className="flex text-neon-green mb-0.5 gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0 ${i < provider.rating ? 'fill-neon-green' : 'opacity-20'}`} />
            ))}
          </div>
          <span className="text-[9px] sm:text-[10px] text-white/30 font-mono uppercase">
            {provider.confidence}% conf
          </span>
        </div>
      </div>

      {/* Price grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="bg-black/20 p-2.5 sm:p-3 rounded-xl border border-white/5 flex flex-col justify-center">
          <span className="text-[10px] text-white/40 uppercase font-semibold block truncate">Total</span>
          <div className="flex items-baseline gap-0.5 min-w-0 mt-0.5">
            <span className="text-lg sm:text-2xl font-bold font-mono text-white tracking-tighter truncate">
              {provider.totalPrice}
            </span>
          </div>
        </div>
        <div className="bg-black/20 p-2.5 sm:p-3 rounded-xl border border-white/5 flex flex-col justify-center">
          <span className="text-[10px] text-white/40 uppercase font-semibold block truncate">Per Day</span>
          <div className="flex items-baseline gap-0.5 min-w-0 mt-0.5">
            <span className="text-base sm:text-xl font-bold font-mono text-white tracking-tighter truncate">
              {provider.dailyRate}
            </span>
          </div>
        </div>
      </div>

      {/* Detail rows */}
      <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/40 flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neon-green flex-shrink-0" />
            Mileage
          </span>
          <span className="text-white/80 font-mono text-right">{provider.mileageCost}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/40 flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 flex-shrink-0" />
            Insurance
          </span>
          <span className="text-white/80 font-mono">Yes</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/40 flex items-center gap-1.5">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400 flex-shrink-0" />
            Availability
          </span>
          <span className="text-neon-green font-semibold text-xs">{provider.status}</span>
        </div>
      </div>

      {/* Book button */}
      <a
        href={provider.url || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full py-2.5 sm:py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
          isBestPrice
            ? 'bg-electric-500 hover:bg-electric-400 text-white shadow-lg shadow-electric-500/20'
            : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10'
        }`}
      >
        Book Provider
        <ArrowUpRight className="w-4 h-4" />
      </a>
    </motion.div>
  );
};

export default PriceCard;