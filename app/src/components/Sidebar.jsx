import {
  LayoutDashboard, BarChart3, Wallet, Building2, Code2, Settings,
  ChevronLeft, ChevronRight, Cat, Zap, Users, CreditCard, User, BadgeDollarSign, Sparkles,
  PieChart, BookOpen, MessageSquare, Package, Library, HelpCircle, Calendar
} from 'lucide-react';
import UserMenu from './auth/UserMenu';
import { useAuth } from '../context/AuthContext';

// Navigation items grouped into sections
const menuSections = [
  {
    label: 'หลัก',
    items: [
      { id: 'dashboard',  label: 'Dashboard',    icon: LayoutDashboard },
      { id: 'inbox',      label: 'กล่องข้อความ',  icon: MessageSquare },
      { id: 'orders',     label: 'ออเดอร์',       icon: Package },
      { id: 'booking',    label: 'นัดหมาย',       icon: Calendar },
      { id: 'customers',  label: 'ลูกค้า CRM',    icon: Users, adminOnly: true },
    ],
  },
  {
    label: 'เครื่องมือ AI',
    items: [
      { id: 'personality', label: 'บุคลิกบอท',    icon: Sparkles },
      { id: 'knowledge',   label: 'คลังความรู้',   icon: BookOpen },
      { id: 'automation',  label: 'Automation',    icon: Zap },
    ],
  },
  {
    label: 'วิเคราะห์',
    items: [
      { id: 'analytics',  label: 'Analytics',     icon: PieChart },
      { id: 'sales',      label: 'Sales',         icon: Wallet },
      { id: 'finance',    label: 'Finance',       icon: Building2 },
      { id: 'marketing',  label: 'Marketing',     icon: BarChart3 },
    ],
  },
  {
    label: 'ระบบ',
    items: [
      { id: 'templates',    label: 'เทมเพลต',      icon: Library },
      { id: 'help',         label: 'ช่วยเหลือ',    icon: HelpCircle },
      { id: 'api',          label: 'API Usage',    icon: Code2 },
      { id: 'pricing',      label: 'Pricing',      icon: BadgeDollarSign },
      { id: 'subscription', label: 'Subscription', icon: CreditCard },
      { id: 'settings',     label: 'Settings',     icon: Settings },
      { id: 'profile',      label: 'My Account',   icon: User },
    ],
  },
];

export default function Sidebar({
  activePage, setActivePage,
  isOpen, setIsOpen,
  isCollapsed, setIsCollapsed,
  onLogout
}) {
  const { isAdmin } = useAuth();

  // Filter menu items based on role and remove empty sections
  const filteredSections = menuSections.map(section => ({
    ...section,
    items: section.items.filter(item => {
      if (item.adminOnly && !isAdmin()) return false;
      return true;
    }),
  })).filter(section => section.items.length > 0);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        h-screen flex flex-col flex-shrink-0 transition-all duration-300 ease-out z-[110]
        ${isCollapsed ? 'w-[88px]' : 'w-[280px]'}
        fixed md:relative left-0 top-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        bg-[#0A0A0F] border-r border-white/[0.04]
      `}>
        <SidebarContent
          activePage={activePage}
          setActivePage={setActivePage}
          sections={filteredSections}
          isCollapsed={isCollapsed}
          toggleCollapse={() => setIsCollapsed(!isCollapsed)}
          onClose={() => setIsOpen(false)}
          onLogout={onLogout}
        />
      </aside>
    </>
  );
}

function SidebarContent({ activePage, setActivePage, sections, isCollapsed, toggleCollapse, onClose, onLogout }) {
  return (
    <>
      {/* Logo Section */}
      <div className={`
        h-20 flex items-center justify-between px-5 border-b border-white/[0.04] flex-shrink-0
        ${isCollapsed ? 'px-4 justify-center' : ''}
      `}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center shadow-lg shadow-orange-500/25 flex-shrink-0">
            <Cat className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="animate-fade-in">
              <span className="font-bold text-lg text-white tracking-tight">MeowChat</span>
              <span className="text-[9px] font-bold text-orange-400 tracking-[3px] uppercase flex items-center gap-1">
                <Zap className="w-2 h-2" /> PRO
              </span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={toggleCollapse}
            className="hidden md:flex p-2 hover:bg-white/[0.06] rounded-xl transition-colors text-zinc-500 hover:text-white"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-white/[0.06] rounded-xl transition-colors text-zinc-500 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation — scrollable flex-1 so items don't overflow on small screens */}
      <nav className="overflow-y-auto flex-1 py-4 px-4">
        {sections.map((section) => (
          <div key={section.label} className="mb-3">
            {/* Section header — hidden in collapsed state */}
            {!isCollapsed && (
              <p className="text-xs text-zinc-600 uppercase tracking-wider px-3 py-2 font-semibold select-none">
                {section.label}
              </p>
            )}

            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative leading-relaxed
                      ${isActive
                        ? 'text-orange-400 bg-orange-500/10 border-l-2 border-orange-500'
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]'}
                      ${isCollapsed ? 'justify-center px-0' : ''}
                    `}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-orange-400' : 'group-hover:text-zinc-400'}`} />
                    {!isCollapsed && (
                      <>
                        <span className="font-semibold text-sm">{item.label}</span>
                        {item.id === 'inbox' && (
                          <span className="ml-auto mr-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0">
                            2
                          </span>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-white/[0.04] bg-[#0A0A0F]/80 flex-shrink-0">
        <UserMenu isCollapsed={isCollapsed} />
      </div>
    </>
  );
}
