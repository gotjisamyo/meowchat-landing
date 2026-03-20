import { motion } from 'framer-motion';
import { Menu, Bell, Search, Cat, X } from 'lucide-react';

export default function PageLayout({ title, subtitle, setSidebarOpen, children, actions }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-screen"
    >
      {/* Mobile Header */}
      <header className="h-16 flex items-center justify-between px-5 bg-[#0A0A0F]/95 backdrop-blur-xl border-b border-white/[0.04] sticky top-0 z-30 md:hidden">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="p-2.5 hover:bg-white/[0.06] rounded-xl text-zinc-400 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Cat className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-sm">MeowChat</span>
        </div>
        <button className="p-2.5 hover:bg-white/[0.06] rounded-xl text-zinc-400 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(255,107,53,0.6)]" />
        </button>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex items-center justify-between px-8 lg:px-12 py-10 flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">{title}</h1>
          {subtitle && <p className="text-zinc-500 mt-2 text-sm font-medium">{subtitle}</p>}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center gap-4 lg:gap-6"
        >
          {/* Search */}
          <div className="relative hidden lg:block group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-orange-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-56 xl:w-64 bg-white/[0.03] border border-white/[0.06] rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/40 focus:bg-white/[0.05] transition-all"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative p-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(255,107,53,0.6)]" />
          </button>
          
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </motion.div>
      </header>

      {/* Page Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex-1 px-6 md:px-10 lg:px-14 py-8 md:py-12 max-w-[1800px] mx-auto w-full"
      >
        <div className="max-w-[1600px] mx-auto space-y-8 md:space-y-10">
          {children}
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="px-5 md:px-8 lg:px-12 py-8 border-t border-white/[0.04] mt-auto">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-600 text-xs">
          <p>© 2026 MeowChat Admin. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Help Center</a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
