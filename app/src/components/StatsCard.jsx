import { motion } from 'framer-motion';
import { 
  Wallet, 
  Users, 
  Code2, 
  CreditCard, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const iconMap = {
  'wallet': Wallet,
  'users': Users,
  'api': Code2,
  'credit-card': CreditCard,
  'trending-up': TrendingUp,
  'activity': Activity,
};

const colorMap = {
  orange: {
    bg: 'from-orange-500/20 to-orange-600/5',
    icon: 'text-orange-400',
    glow: 'shadow-orange-500/20'
  },
  blue: {
    bg: 'from-blue-500/20 to-blue-600/5',
    icon: 'text-blue-400',
    glow: 'shadow-blue-500/20'
  },
  purple: {
    bg: 'from-purple-500/20 to-purple-600/5',
    icon: 'text-purple-400',
    glow: 'shadow-purple-500/20'
  },
  yellow: {
    bg: 'from-yellow-500/20 to-yellow-600/5',
    icon: 'text-yellow-400',
    glow: 'shadow-yellow-500/20'
  },
  green: {
    bg: 'from-emerald-500/20 to-emerald-600/5',
    icon: 'text-emerald-400',
    glow: 'shadow-emerald-500/20'
  },
  pink: {
    bg: 'from-pink-500/20 to-pink-600/5',
    icon: 'text-pink-400',
    glow: 'shadow-pink-500/20'
  },
};

export default function StatsCard({ title, value, change, isPositive, icon, color = 'orange', delay = 0 }) {
  const Icon = iconMap[icon] || Activity;
  const colorStyle = colorMap[color] || colorMap.orange;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay / 1000, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative bg-[#12121A] rounded-3xl p-10 border border-white/[0.04] hover:border-orange-500/20 transition-all duration-300"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorStyle.bg} opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl`} />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-5">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className={`p-3.5 rounded-2xl bg-gradient-to-br ${colorStyle.bg} border border-white/[0.06] ${colorStyle.glow} shadow-lg`}
          >
            <Icon className={`w-5 h-5 ${colorStyle.icon}`} />
          </motion.div>
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
              isPositive 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5" />
            )}
            {change}
          </motion.div>
        </div>
        
        <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2 leading-relaxed">{title}</h3>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (delay + 200) / 1000 }}
          className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-normal"
        >
          {value}
        </motion.p>
      </div>
      
      {/* Corner Accent */}
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${colorStyle.bg} opacity-0 group-hover:opacity-50 transition-opacity rounded-tr-3xl -z-10`} />
    </motion.div>
  );
}
