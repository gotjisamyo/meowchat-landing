import { useState, useEffect } from 'react';
import { X, Send, Plus, Tag, MessageCircle } from 'lucide-react';
import { crmTagColors } from '../data/mockData';

const ALL_TAGS = ['VIP', 'ขาประจำ', 'ลูกค้าใหม่'];

function formatDateTime(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatRelative(iso) {
  const now = new Date('2026-03-19T09:00:00');
  const diff = Math.floor((now - new Date(iso)) / 1000);
  if (diff < 60) return 'เมื่อกี้';
  if (diff < 3600) return `${Math.floor(diff / 60)} น.ที่แล้ว`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ชม.ที่แล้ว`;
  return `${Math.floor(diff / 86400)} วันที่แล้ว`;
}

export default function CustomerDrawer({ customer, onClose }) {
  const [notes, setNotes] = useState(customer?.notes ?? '');
  const [savedNote, setSavedNote] = useState(false);
  const [tags, setTags] = useState(customer?.tags ?? []);
  const [showTagPicker, setShowTagPicker] = useState(false);

  // Sync state when customer changes
  useEffect(() => {
    if (customer) {
      setNotes(customer.notes ?? '');
      setTags(customer.tags ?? []);
      setSavedNote(false);
      setShowTagPicker(false);
    }
  }, [customer?.id]);

  if (!customer) return null;

  function handleSaveNote() {
    setSavedNote(true);
    setTimeout(() => setSavedNote(false), 2000);
  }

  function toggleTag(tag) {
    setTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0F0F1A] border-l border-white/[0.06] z-[210] flex flex-col shadow-2xl overflow-hidden animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${customer.avatarColor} flex items-center justify-center text-white text-lg font-bold flex-shrink-0`}>
              {customer.avatar}
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">{customer.name}</h2>
              <p className="text-zinc-500 text-sm">{customer.lineId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/[0.06] rounded-xl text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 px-6 py-4 border-b border-white/[0.06] flex-shrink-0">
          <div className="bg-white/[0.03] rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-white">{customer.orders}</p>
            <p className="text-xs text-zinc-500 mt-0.5">ออเดอร์</p>
          </div>
          <div className="bg-white/[0.03] rounded-xl p-3 text-center">
            <p className="text-xl font-bold text-white">฿{customer.totalSpend.toLocaleString()}</p>
            <p className="text-xs text-zinc-500 mt-0.5">ยอดรวม</p>
          </div>
          <div className="bg-white/[0.03] rounded-xl p-3 text-center">
            <p className="text-sm font-medium text-white">{formatRelative(customer.lastChat)}</p>
            <p className="text-xs text-zinc-500 mt-0.5">แชทล่าสุด</p>
          </div>
        </div>

        {/* Tags */}
        <div className="px-6 py-4 border-b border-white/[0.06] flex-shrink-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            {tags.map(tag => {
              const c = crmTagColors[tag] ?? { bg: 'bg-zinc-500/20', text: 'text-zinc-400', border: 'border-zinc-500/30' };
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full border ${c.bg} ${c.text} ${c.border} hover:opacity-70 transition-opacity`}
                  title="คลิกเพื่อลบ"
                >
                  {tag} ×
                </button>
              );
            })}
            <button
              onClick={() => setShowTagPicker(v => !v)}
              className="px-2.5 py-1 text-xs font-medium rounded-full border border-dashed border-white/20 text-zinc-500 hover:text-white hover:border-white/40 transition-colors flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> เพิ่ม tag
            </button>
          </div>
          {showTagPicker && (
            <div className="flex gap-2 flex-wrap mt-2">
              {ALL_TAGS.filter(t => !tags.includes(t)).map(tag => {
                const c = crmTagColors[tag] ?? { bg: 'bg-zinc-500/20', text: 'text-zinc-400', border: 'border-zinc-500/30' };
                return (
                  <button
                    key={tag}
                    onClick={() => { toggleTag(tag); setShowTagPicker(false); }}
                    className={`px-2.5 py-1 text-xs font-medium rounded-full border ${c.bg} ${c.text} ${c.border} hover:opacity-80 transition-opacity`}
                  >
                    + {tag}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Timeline — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-4">ประวัติการติดต่อ</p>
          <div className="relative space-y-0">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/[0.06]" />

            {customer.timeline.map((item, i) => (
              <div key={i} className="flex gap-4 pb-5 relative">
                {/* Icon bubble */}
                <div className="w-8 h-8 rounded-full bg-[#1A1A2E] border border-white/[0.08] flex items-center justify-center text-sm flex-shrink-0 relative z-10">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${item.type === 'order' ? 'text-white' : 'text-zinc-300'}`}>
                    {item.type === 'order' ? (
                      <span className="text-emerald-400 font-semibold">ซื้อ: </span>
                    ) : (
                      <span className="text-blue-400 font-semibold">แชท: </span>
                    )}
                    {item.text}
                  </p>
                  <p className="text-xs text-zinc-600 mt-0.5">{formatDateTime(item.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="px-6 py-4 border-t border-white/[0.06] flex-shrink-0">
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2">บันทึกส่วนตัว</p>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            placeholder="บันทึกส่วนตัว (เจ้าของร้านเห็นคนเดียว)"
            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40 resize-none"
          />
          <div className="flex items-center justify-between mt-2">
            {savedNote ? (
              <span className="text-xs text-emerald-400">บันทึกแล้ว</span>
            ) : (
              <span className="text-xs text-zinc-600">กด "บันทึก" เพื่อบันทึก</span>
            )}
            <button
              onClick={handleSaveNote}
              className="px-4 py-2 text-xs font-semibold bg-orange-500 hover:bg-orange-400 text-white rounded-lg transition-colors"
            >
              บันทึก
            </button>
          </div>
        </div>

        {/* Send message button */}
        <div className="px-6 pb-6 flex-shrink-0">
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/20">
            <MessageCircle className="w-4 h-4" />
            ส่งข้อความ
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
}
