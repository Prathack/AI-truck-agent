import React from 'react';
import { ArrowUpRight, ChevronDown, Filter, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const ComparisonTable = ({ providers }) => {
  const handleExportCSV = () => {
    if (!providers || providers.length === 0) return;
    
    // Define CSV headers
    const headers = ['Rank', 'Provider Name', 'Category', 'Total Price', 'Daily Rate', 'Mileage Cost', 'Status', 'Rating', 'AI Confidence'];
    
    // Map providers to CSV rows
    const rows = providers.map((p, index) => [
      index + 1,
      `"${p.name}"`,
      `"${p.category}"`,
      `"${p.totalPrice}"`,
      `"${p.dailyRate}"`,
      `"${p.mileageCost}"`,
      `"${p.status}"`,
      p.rating,
      p.confidence
    ]);
    
    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');
    
    // Create a Blob and download it
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `fleetsight_providers_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/40" />
          <span className="text-sm font-medium text-white/60">Filtered by: <span className="text-white">All Providers</span></span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExportCSV} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/60 hover:text-white transition-colors">
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/2 bg-navy-900/50">
              {[
                'Rank', 'Provider', 'Total Price', 'Daily Rate', 'Per Mile', 'Vehicle Type', 'Rating', 'AI Confidence', 'Action'
              ].map((header, i) => (
                <th key={i} className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/30 border-b border-white/5">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors group">
                    {header}
                    {header !== 'Action' && <ChevronDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {providers.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-6 py-20 text-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center gap-3"
                  >
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 animate-ping" />
                    </div>
                    <span className="text-white/80 font-bold text-lg">Backend Disconnected</span>
                    <span className="text-sm text-white/40 max-w-sm">Connect to the FleetSight engine on port 8000 to view full provider comparisons.</span>
                  </motion.div>
                </td>
              </tr>
            ) : (
              providers.map((p, i) => (
              <motion.tr 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group hover:bg-white/5 transition-colors cursor-pointer"
              >
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <span className={`font-mono font-bold ${i === 0 ? 'text-neon-green' : 'text-white/40'}`}>
                    {i + 1}
                  </span>
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-white/40 group-hover:bg-electric-500/20 group-hover:text-electric-400 transition-colors">
                      {p.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-white/80 group-hover:text-white transition-colors">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4 font-mono font-bold text-white">{p.totalPrice}</td>
                <td className="px-4 py-3 sm:px-6 sm:py-4 font-mono text-white/60">{p.dailyRate}</td>
                <td className="px-4 py-3 sm:px-6 sm:py-4 font-mono text-white/60">{p.mileageCost}</td>
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] uppercase font-semibold text-white/50">
                    Box Truck
                  </span>
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <div className="flex items-center gap-1.5 text-neon-green font-mono font-bold">
                    {p.rating}.0
                  </div>
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <div className="w-full max-w-[100px] h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${p.confidence}%` }}
                      className={`h-full ${p.confidence > 90 ? 'bg-neon-green' : 'bg-electric-400'}`}
                    />
                  </div>
                </td>
                <td className="px-4 py-3 sm:px-6 sm:py-4">
                  <a href={p.url || '#'} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-electric-500/10 hover:bg-electric-500/20 text-electric-400 opacity-0 group-hover:opacity-100 transition-all inline-block hover:scale-110">
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </td>
              </motion.tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
