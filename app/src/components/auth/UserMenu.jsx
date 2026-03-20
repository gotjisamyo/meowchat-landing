import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, ChevronDown, Loader2, Zap } from 'lucide-react';

export default function UserMenu({ isCollapsed = false }) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="relative">
      {/* User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-all w-full
          ${isCollapsed ? 'justify-center' : ''}
        `}
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            user.name?.charAt(0).toUpperCase() || 'A'
          )}
        </div>
        {!isCollapsed && (
          <>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name || 'Admin'}</p>
              <p className="text-xs text-gray-400 truncate">{user.email || 'admin@meowchat.com'}</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Menu */}
          <div className={`
            absolute bg-[#151520] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50
            ${isCollapsed ? 'bottom-full left-1/2 -translate-x-1/2 mb-2 w-48' : 'bottom-full left-0 right-0 mb-2'}
          `}>
            <div className="p-3 border-b border-white/10">
              <p className="text-xs text-gray-400">เข้าสู่ระบบในฐานะ</p>
              <p className="text-sm font-medium text-white truncate">{user.name || 'Admin User'}</p>
              <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-pink-500/20 text-pink-400 capitalize">
                {user.role || 'admin'}
              </span>
            </div>
            
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-red-500/10 text-red-400 transition-colors disabled:opacity-50"
            >
              {isLoggingOut ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">ออกจากระบบ</span>
            </button>
          </div>
        </>
      )}

      {/* System Status - Only show when not collapsed */}
      {!isCollapsed && (
        <div className="mt-3 mx-1 p-3 rounded-xl bg-emerald-500/8 border border-emerald-500/15">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400">System Online 99.9%</span>
          </div>
        </div>
      )}
    </div>
  );
}
