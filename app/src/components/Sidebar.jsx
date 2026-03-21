import {
  LayoutDashboard, BarChart3, Wallet, Building2, Code2, Settings,
  ChevronLeft, ChevronRight, Cat, Zap, Menu, Users, CreditCard, User, BadgeDollarSign, Sparkles
} from 'lucide-react';
import UserMenu from './auth/UserMenu';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'customers', label: 'Customers', icon: Users, adminOnly: true },
  { id: 'marketing', label: 'Marketing', icon: BarChart3 },
  { id: 'sales',     label: 'Sales',      icon: Wallet },
  { id: 'finance',   label: 'Finance',    icon: Building2 },
  { id: 'api',       label: 'API Usage',  icon: Code2 },
  { id: 'pricing',   label: 'Pricing',    icon: BadgeDollarSign },
  { id: 'subscription', label: 'Subscription', icon: CreditCard },
  { id: 'personality', label: 'บุคลิกบอท', icon: Sparkles },
  { id: 'settings',  label: 'Settings',   icon: Settings },
  { id: 'profile',   label: 'My Account', icon: User },
];

export default function Sidebar({ 
  activePage, setActivePage,
  isOpen, setIsOpen,
  isCollapsed, setIsCollapsed,
  onLogout 
}) {
  const { isAdmin } = useAuth();

  // Filter menu items based on role
  const filteredMenuItems = menuItems.filter(item => {
    if (item.adminOnly && !isAdmin()) return false;
    return true;
  });

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
          menuItems={filteredMenuItems}
          isCollapsed={isCollapsed}
          toggleCollapse={() => setIsCollapsed(!isCollapsed)}
          onClose={() => setIsOpen(false)}
          onLogout={onLogout}
        />
      </aside>
    </>
  );
}

function SidebarContent({ activePage, setActivePage, menuItems, isCollapsed, toggleCollapse, onClose, onLogout }) {
  return (
    <>
      {/* Logo Section */}
      <div className={`
        h-20 flex items-center justify-between px-5 border-b border-white/[0.04] flex-shrink-0
        ${isCollapsed ? 'px-4 justify-center' : ''}
      `}>
        <div className={`flex items-center gap-3 ${isCollapsed ? '' : ''}`}>
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

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {!isCollapsed && (
          <p className="px-4 pb-3 text-[10px] font-bold text-zinc-600 uppercase tracking-[3px]">Menu</p>
        )}
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`
                w-full flex items-center gap-3 px-5 py-5 rounded-2xl transition-all duration-200 group relative leading-relaxed
                ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]'}
                ${isCollapsed ? 'justify-center px-0' : ''}
              `}
              style={isActive ? {
                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.12) 0%, rgba(255, 107, 53, 0.04) 100%)',
                border: '1px solid rgba(255, 107, 53, 0.2)'
              } : {}}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-orange-400' : 'group-hover:text-zinc-400'}`} />
              {!isCollapsed && (
                <>
                  <span className="font-semibold text-sm">{item.label}</span>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-orange-500 rounded-r-full" />
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-white/[0.04] bg-[#0A0A0F]/80 flex-shrink-0">
        <UserMenu isCollapsed={isCollapsed} />
      </div>
    </>
  );
}
