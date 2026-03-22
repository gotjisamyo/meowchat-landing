import { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    icon: '🟠',
    title: 'ข้อความใหม่จากลูกค้า',
    description: 'คุณมีข้อความที่ยังไม่ได้อ่าน 3 รายการ',
    time: '5 นาทีที่แล้ว',
    read: false,
  },
  {
    id: 2,
    icon: '🔵',
    title: 'ยืนยันออเดอร์แล้ว',
    description: 'มีออเดอร์ใหม่ 2 รายการรอดำเนินการ',
    time: '20 นาทีที่แล้ว',
    read: false,
  },
  {
    id: 3,
    icon: '🟡',
    title: 'แจ้งเตือนสต็อก',
    description: 'สินค้าเหลือน้อย — กรุณาเติมสต็อก 1 รายการ',
    time: '1 ชม. ที่แล้ว',
    read: false,
  },
  {
    id: 4,
    icon: '🟢',
    title: 'รายงานประสิทธิภาพบอท',
    description: 'ความแม่นยำวันนี้: 94.2% — ทำได้ดีมาก!',
    time: 'วันนี้ 09:00 น.',
    read: true,
  },
  {
    id: 5,
    icon: '🔴',
    title: 'Subscription ใกล้หมดอายุ',
    description: 'เหลืออีก 3 วันก่อนหมดทดลองใช้งาน',
    time: 'เมื่อวาน',
    read: true,
    cta: 'อัพเกรด',
    ctaHref: '/subscription',
  },
];

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const containerRef = useRef(null);

  const unread = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  // Close dropdown on outside click
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
      {/* Bell button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 rounded-xl hover:bg-white/[0.06] text-zinc-400 hover:text-white transition-colors"
        aria-label="การแจ้งเตือน"
      >
        <Bell className="w-5 h-5" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold leading-none">
            {unread}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-[#1A1A24] border border-white/[0.08] rounded-2xl shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/[0.06] bg-[#1A1A24] flex items-center justify-between">
            <h3 className="font-semibold text-white text-sm">
              การแจ้งเตือน
              {unread > 0 && (
                <span className="ml-2 px-1.5 py-0.5 bg-red-500/20 text-red-400 text-[11px] rounded-full font-bold">
                  {unread} ใหม่
                </span>
              )}
            </h3>
            <button
              onClick={markAllRead}
              disabled={unread === 0}
              className="text-xs text-orange-400 hover:text-orange-300 disabled:text-zinc-600 disabled:cursor-not-allowed transition-colors font-medium"
            >
              ทำเครื่องหมายว่าอ่านแล้ว
            </button>
          </div>

          {/* Notification list */}
          <div className="divide-y divide-white/[0.04] bg-[#1A1A24] max-h-[360px] overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="px-4 py-3 hover:bg-white/[0.05] cursor-pointer bg-[#1A1A24] transition-colors"
              >
                <div className="flex items-start gap-3">
                  {/* Emoji icon */}
                  <span className="text-lg flex-shrink-0 mt-0.5">{n.icon}</span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium leading-snug">
                      {n.title}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-snug">
                      {n.description}
                    </p>
                    <p className="text-[11px] text-zinc-600 mt-1">{n.time}</p>
                    {/* Inline upgrade CTA for subscription item */}
                    {n.cta && (
                      <a
                        href={n.ctaHref}
                        className="inline-block mt-1.5 px-2.5 py-1 bg-orange-500 hover:bg-orange-400 text-white text-[11px] font-bold rounded-lg transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        {n.cta} →
                      </a>
                    )}
                  </div>

                  {/* Unread dot */}
                  {!n.read && (
                    <span className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0 mt-1.5" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 text-center border-t border-white/[0.06] bg-[#1A1A24]">
            <a
              href="/notifications"
              className="text-xs text-zinc-400 hover:text-white transition-colors font-medium"
              onClick={() => setOpen(false)}
            >
              ดูทั้งหมด →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
