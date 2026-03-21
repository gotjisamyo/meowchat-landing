import { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';

const mockNotifications = [
  { id: 1, type: 'urgent', icon: '🔴', text: 'พี่โอ้ ต้องการคุยกับคน', time: '5 นาทีที่แล้ว', action: 'รับสาย', read: false },
  { id: 2, type: 'warning', icon: '🟡', text: 'บอทตอบไม่ได้ 5 ครั้งวันนี้', time: '1 ชม.ที่แล้ว', action: 'เพิ่ม FAQ', read: false },
  { id: 3, type: 'info', icon: '🟢', text: 'มีสมาชิกใหม่ 12 คนวันนี้', time: 'วันนี้', action: 'ดู CRM', read: false },
];

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const unread = notifications.filter(n => !n.read).length;
  const containerRef = useRef(null);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  // Click-outside handler to close the dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => {
          setOpen(!open);
          if (!open) markAllRead();
        }}
        className="relative p-2 rounded-xl hover:bg-white/[0.06] text-zinc-400 hover:text-white transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-[#1A1A24] border border-white/[0.08] rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
            <h3 className="font-semibold text-white text-sm">การแจ้งเตือน</h3>
            <span className="text-xs text-zinc-500">ทั้งหมดอ่านแล้ว</span>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {notifications.map(n => (
              <div key={n.id} className="p-4 hover:bg-white/[0.03] cursor-pointer">
                <div className="flex items-start gap-3">
                  <span className="text-lg">{n.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white leading-snug">{n.text}</p>
                    <p className="text-xs text-zinc-500 mt-1">{n.time}</p>
                  </div>
                  <button className="text-xs text-orange-400 hover:text-orange-300 shrink-0 font-medium">
                    {n.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 text-center border-t border-white/[0.06]">
            <button className="text-xs text-zinc-500 hover:text-white">ดูทั้งหมด</button>
          </div>
        </div>
      )}
    </div>
  );
}
