import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle, Download, MoreHorizontal } from 'lucide-react';

const statusConfig = {
  completed: { 
    color: 'text-emerald-400', 
    bg: 'bg-emerald-500/10', 
    border: 'border-emerald-500/20',
    icon: CheckCircle,
    label: 'สำเร็จ'
  },
  pending: { 
    color: 'text-amber-400', 
    bg: 'bg-amber-500/10', 
    border: 'border-amber-500/20',
    icon: Clock,
    label: 'รอดำเนินการ'
  },
  failed: { 
    color: 'text-red-400', 
    bg: 'bg-red-500/10', 
    border: 'border-red-500/20',
    icon: XCircle,
    label: 'ล้มเหลว'
  },
};

export default function DataTable({ title, columns, data, delay = 0, onExport }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay / 1000, ease: 'easeOut' }}
      className="bg-[#12121A] rounded-3xl border border-white/[0.04] overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-white/[0.04]">
        <h3 className="text-base font-bold text-white">{title}</h3>
        <button 
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 text-orange-400 text-xs font-semibold rounded-xl hover:bg-orange-500/20 transition-colors border border-orange-500/20"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.04]">
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  className="text-left py-6 px-8 text-[11px] font-bold text-zinc-500 uppercase tracking-[1.5px]"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <motion.tr 
                key={rowIdx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (delay + rowIdx * 100) / 1000 }}
                className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors group"
              >
                {Object.entries(row).map(([key, value], colIdx) => {
                  if (key === 'status') {
                    const config = statusConfig[value] || statusConfig.pending;
                    const StatusIcon = config.icon;
                    return (
                      <td key={colIdx} className="py-6 px-8">
                        <span className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold leading-relaxed ${config.bg} ${config.color} ${config.border} border`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {config.label}
                        </span>
                      </td>
                    );
                  }
                  return (
                      <td key={colIdx} className="py-6 px-8 text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                        {value}
                      </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer / Pagination */}
      <div className="flex items-center justify-between px-8 py-6 border-t border-white/[0.04]">
        <p className="text-xs text-zinc-500">Showing {data.length} results</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs text-zinc-500 hover:text-white transition-colors">Previous</button>
          <button className="px-3 py-1.5 text-xs bg-orange-500/10 text-orange-400 rounded-lg">1</button>
          <button className="px-3 py-1.5 text-xs text-zinc-500 hover:text-white transition-colors">2</button>
          <button className="px-3 py-1.5 text-xs text-zinc-500 hover:text-white transition-colors">3</button>
          <button className="px-3 py-1.5 text-xs text-zinc-500 hover:text-white transition-colors">Next</button>
        </div>
      </div>
    </motion.div>
  );
}
