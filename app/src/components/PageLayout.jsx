import { motion } from 'framer-motion';
import { Menu, Bell, Search, Cat } from 'lucide-react';

export default function PageLayout({ title, subtitle, setSidebarOpen, children, actions }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-screen w-full min-w-0"
    >
      {/* Mobile Header */}
      <header className="h-14 flex items-center justify-between px-4 bg-[#0A0A0F]/95 backdrop-blur-xl border-b border-white/[0.04] sticky top-0 z-30 md:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 hover:bg-white/[0.06] rounded-xl text-zinc-400 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center">
            <Cat className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-sm">MeowChat</span>
        </div>
        <button className="relative p-2 hover:bg-white/[0.06] rounded-xl text-zinc-400 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full" />
        </button>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:flex items-center justify-between gap-4 px-6 lg:px-8 py-6 flex-shrink-0 border-b border-white/[0.04] overflow-hidden">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">{title}</h1>
          {subtitle && <p className="text-zinc-500 mt-1 text-sm">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end min-w-0">
          {/* Search */}
          <div className="relative hidden lg:block group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-orange-400 transition-colors" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-52 bg-white/[0.03] border border-white/[0.06] rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/40 transition-all"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full" />
          </button>

          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
      </header>

      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex-1 w-full min-w-0 content-area"
      >
        <div className="space-y-6 w-full min-w-0">
          {children}
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="content-area py-5 border-t border-white/[0.04] mt-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-zinc-600 text-xs">
          <p>© 2026 MeowChat Admin. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Help</a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
