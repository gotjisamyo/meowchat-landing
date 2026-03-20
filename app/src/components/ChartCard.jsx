import { motion } from 'framer-motion';
import { MoreHorizontal } from 'lucide-react';

export default function ChartCard({ title, subtitle, children, delay = 0, action, className = '' }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay / 1000, ease: 'easeOut' }}
      className={`group relative bg-[#12121A] rounded-3xl border border-white/[0.04] overflow-hidden transition-all duration-300 hover:border-orange-500/10 ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between px-8 py-6">
        <div>
          <h3 className="text-base font-bold text-white">{title}</h3>
          {subtitle && <p className="text-xs text-zinc-500 mt-1">{subtitle}</p>}
        </div>
        {action ? (
          action
        ) : (
          <button className="p-2 text-zinc-600 hover:text-white hover:bg-white/[0.04] rounded-xl transition-all opacity-0 group-hover:opacity-100">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {/* Content */}
      <div className="px-8 pb-10">
        {children}
      </div>
      
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
