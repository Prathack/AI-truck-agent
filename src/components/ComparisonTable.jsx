import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown, Filter, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const ComparisonTable = ({ providers }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleExportCSV = () => {
    if (!providers || providers.length === 0) return;
    const headers = ['Rank', 'Provider Name', 'Category', 'Total Price', 'Daily Rate', 'Mileage Cost', 'Status', 'Rating', 'AI Confidence'];
    const rows = providers.map((p, i) => [
      i + 1, `"${p.name}"`, `"${p.category}"`,
      `"${p.totalPrice}"`, `"${p.dailyRate}"`, `"${p.mileageCost}"`,
      `"${p.status}"`, p.rating, p.confidence,
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', `fleetsight_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const EmptyState = () => (
    <div className="px-4 sm:px-6 py-16 sm:py-20 text-center">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center gap-3">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-500/20 animate-ping" />
        </div>
        <span className="text-white/80 font-bold text-base sm:text-lg">Backend Disconnected</span>
        <span className="text-xs sm:text-sm text-white/40 max-w-xs sm:max-w-sm">
          Connect to the FleetSight engine on port 8000 to view provider comparisons.
        </span>
      </motion.div>
    </div>
  );

  return (
    <div className="glass-panel rounded-xl sm:rounded-2xl border border-white/5 overflow-hidden">
      {/* Toolbar */}
      <div className="p-3 sm:p-4 border-b border-white/5 flex items-center justify-between bg-white/5 gap-2 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <Filter className="w-4 h-4 text-white/40 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-white/60 truncate">
            Filtered: <span className="text-white">All Providers</span>
          </span>
        </div>
        <button onClick={handleExportCSV}
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/60 hover:text-white transition-colors flex-shrink-0">
          <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden xs:inline">Export</span> CSV
        </button>
      </div>

      {/* ── Desktop table (md+) ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/2">
              {['Rank','Provider','Total Price','Daily Rate','Per Mile','Vehicle','Rating','AI Confidence','Action'].map((h, i) => (
                <th key={i} className="px-4 lg:px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/30 border-b border-white/5">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors group">
                    {h}
                    {h !== 'Action' && <ChevronDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {providers.length === 0 ? (
              <tr><td colSpan="9"><EmptyState /></td></tr>
            ) : (
              providers.map((p, i) => (
                <motion.tr key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="group hover:bg-white/5 transition-colors cursor-pointer">
                  <td className="px-4 lg:px-6 py-4">
                    <span className={`font-mono font-bold ${i === 0 ? 'text-neon-green' : 'text-white/40'}`}>{i + 1}</span>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-white/40 group-hover:bg-electric-500/20 group-hover:text-electric-400 transition-colors flex-shrink-0">
                        {p.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-white/80 group-hover:text-white transition-colors truncate max-w-[140px]">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 font-mono font-bold text-white">{p.totalPrice}</td>
                  <td className="px-4 lg:px-6 py-4 font-mono text-white/60">{p.dailyRate}</td>
                  <td className="px-4 lg:px-6 py-4 font-mono text-white/60">{p.mileageCost}</td>
                  <td className="px-4 lg:px-6 py-4">
                    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] uppercase font-semibold text-white/50">
                      Box Truck
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-neon-green font-mono font-bold">{p.rating}.0</td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="w-full max-w-[80px] h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${p.confidence}%` }}
                        className={`h-full ${p.confidence > 90 ? 'bg-neon-green' : 'bg-electric-400'}`} />
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <a href={p.url || '#'} target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-electric-500/10 hover:bg-electric-500/20 text-electric-400 opacity-0 group-hover:opacity-100 transition-all inline-flex hover:scale-110">
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Mobile card list (< md) ── */}
      <div className="md:hidden divide-y divide-white/5">
        {providers.length === 0 ? (
          <EmptyState />
        ) : (
          providers.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}>
              {/* Collapsed row — always visible */}
              <button
                onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/5 transition-colors text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`text-xs font-mono font-bold w-5 flex-shrink-0 ${i === 0 ? 'text-neon-green' : 'text-white/30'}`}>
                    {i + 1}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm font-bold text-white/50 flex-shrink-0">
                    {p.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-white/90 text-sm truncate">{p.name}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider">{p.category}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                  <span className="font-mono font-bold text-white text-sm">{p.totalPrice}</span>
                  <ChevronDown className={`w-4 h-4 text-white/30 transition-transform ${expandedRow === i ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Expanded detail */}
              <AnimatePresence>
                {expandedRow === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 grid grid-cols-2 gap-2.5">
                      {[
                        { label: 'Daily Rate',     value: p.dailyRate },
                        { label: 'Per Mile',       value: p.mileageCost },
                        { label: 'Vehicle',        value: 'Box Truck' },
                        { label: 'Rating',         value: `${p.rating}.0 ★` },
                        { label: 'AI Confidence',  value: `${p.confidence}%` },
                        { label: 'Status',         value: p.status },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                          <div className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">{label}</div>
                          <div className="text-sm font-mono font-semibold text-white/80">{value}</div>
                        </div>
                      ))}
                      <div className="col-span-2">
                        <a href={p.url || '#'} target="_blank" rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-electric-500/10 hover:bg-electric-500/20 border border-electric-500/20 text-electric-400 text-sm font-bold transition-all">
                          Book Provider <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ComparisonTable;