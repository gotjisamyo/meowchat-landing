import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  BarChart2,
  Bot,
  Megaphone,
  Ticket,
  Flag,
  Activity,
  Shield,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import SuperAdminLogin from './SuperAdminLogin';
import SAOverview from './pages/SAOverview';
import SACustomers from './pages/SACustomers';
import SARevenue from './pages/SARevenue';
import SAPlatformAnalytics from './pages/SAPlatformAnalytics';
import SAAIPerformance from './pages/SAAIPerformance';
import SABroadcast from './pages/SABroadcast';
import SASupport from './pages/SASupport';
import SAFeatureFlags from './pages/SAFeatureFlags';
import SASystemHealth from './pages/SASystemHealth';

const NAV_ITEMS = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'customers', icon: Users, label: 'ลูกค้าทั้งหมด' },
  { id: 'revenue', icon: DollarSign, label: 'Revenue & MRR' },
  { id: 'analytics', icon: BarChart2, label: 'Platform Analytics' },
  { id: 'ai', icon: Bot, label: 'AI Performance' },
  { id: 'broadcast', icon: Megaphone, label: 'Broadcast to All' },
  { id: 'support', icon: Ticket, label: 'Support Tickets' },
  { id: 'flags', icon: Flag, label: 'Feature Flags' },
  { id: 'health', icon: Activity, label: 'System Health' },
];

function SuperAdminSidebar({ activePage, setActivePage, isOpen, setIsOpen }) {
  const handleLogout = () => {
    localStorage.removeItem('superadminToken');
    window.location.reload();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#0d0d12] border-r border-white/[0.06] flex flex-col
          transform transition-transform duration-300
          md:relative md:translate-x-0 md:flex
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">MeowChat</p>
              <p className="text-red-400 text-xs font-medium">Super Admin</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-zinc-500 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); setIsOpen(false); }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left
                  ${active
                    ? 'bg-red-500/15 text-red-400 border border-red-500/20'
                    : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200'
                  }
                `}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-red-400' : ''}`} />
                <span className="truncate">{item.label}</span>
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto text-red-400/50" />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-3 border-t border-white/[0.06] space-y-1">
          <div className="px-3 py-2 rounded-xl bg-white/[0.02]">
            <p className="text-zinc-500 text-xs">Logged in as</p>
            <p className="text-white text-sm font-medium">Super Admin</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

function PageContent({ activePage }) {
  switch (activePage) {
    case 'overview':   return <SAOverview />;
    case 'customers':  return <SACustomers />;
    case 'revenue':    return <SARevenue />;
    case 'analytics':  return <SAPlatformAnalytics />;
    case 'ai':         return <SAAIPerformance />;
    case 'broadcast':  return <SABroadcast />;
    case 'support':    return <SASupport />;
    case 'flags':      return <SAFeatureFlags />;
    case 'health':     return <SASystemHealth />;
    default:           return <SAOverview />;
  }
}

export default function SuperAdminApp() {
  const [authed, setAuthed] = useState(
    localStorage.getItem('superadminToken') === 'meowchat-admin-2026'
  );
  const [activePage, setActivePage] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authed) {
    return <SuperAdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0A0A0F]">
      <SuperAdminSidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile topbar */}
        <header className="h-14 flex items-center gap-3 px-4 bg-[#0A0A0F]/95 backdrop-blur-xl border-b border-white/[0.04] sticky top-0 z-30 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-white/[0.06] rounded-xl text-zinc-400 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-white text-sm">Super Admin</span>
          </div>
          <div className="ml-auto">
            <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-xs px-2 py-0.5 rounded-full">
              INTERNAL
            </span>
          </div>
        </header>

        {/* Desktop admin badge */}
        <div className="hidden md:flex items-center gap-2 px-6 py-2 bg-red-500/5 border-b border-red-500/10">
          <Shield className="w-3.5 h-3.5 text-red-400" />
          <p className="text-red-400 text-xs font-medium">Super Admin Panel — Internal Use Only</p>
        </div>

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <PageContent activePage={activePage} />
        </main>
      </div>
    </div>
  );
}
