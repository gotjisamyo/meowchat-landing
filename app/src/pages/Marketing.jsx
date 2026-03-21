import { useState } from 'react';
import { Send, Eye, ShoppingCart, DollarSign, Users, Clock, CheckCircle, Calendar } from 'lucide-react';
import PageLayout from '../components/PageLayout';

// ─── Broadcast history mock data ───────────────────────────────────────────
const broadcastHistory = [
  { date: '19 มี.ค. 09:00', msg: '🔥 Flash Sale! ลด 20% ทุกรายการ', sent: 1247, readPct: 82, clickPct: 15, status: 'ส่งแล้ว' },
  { date: '18 มี.ค. 08:00', msg: '🍱 เมนูวันนี้: ข้าวหมูแดง ฿55', sent: 340, readPct: 85, clickPct: 22, status: 'ส่งแล้ว' },
  { date: '17 มี.ค. 20:00', msg: '🎉 สินค้าใหม่เข้าแล้ว! ดูเลย', sent: 1247, readPct: 75, clickPct: 16, status: 'ส่งแล้ว' },
  { date: '20 มี.ค. 08:00', msg: '☕ เมนูพรุ่งนี้ ข้าวไข่เจียว ฿45', sent: 340, readPct: 0, clickPct: 0, status: 'กำหนดการ' },
  { date: '21 มี.ค. 10:00', msg: '🛍️ ซื้อครบ 500 ฟรีค่าส่ง!', sent: 1247, readPct: 0, clickPct: 0, status: 'กำหนดการ' },
];

// ─── Templates ─────────────────────────────────────────────────────────────
const templates = [
  { icon: '🌅', label: 'เมนูเช้า', text: '🌅 เมนูเช้าวันนี้พร้อมแล้ว! มาอุดหนุนกันนะคะ เปิด 07:00–09:00 น. 🍳☕' },
  { icon: '🔥', label: 'Flash Sale', text: '🔥 Flash Sale! ลด 20% ทุกรายการ วันนี้วันเดียวเท่านั้น! รีบเลยนะคะ ⏰' },
  { icon: '🎂', label: 'วันเกิด', text: '🎂 สุขสันต์วันเกิดนะคะ! เป็นของขวัญจากเรา รับส่วนลด 15% วันนี้เลย 🎁' },
  { icon: '📦', label: 'สินค้าใหม่', text: '📦 สินค้าใหม่เข้าแล้ว! คอลเลกชันล่าสุดพร้อมให้สั่งได้เลย ดูเลย 👉' },
  { icon: '⚠️', label: 'แจ้งปิดร้าน', text: '⚠️ แจ้งปิดร้านชั่วคราว วันนี้ปิดเร็วเวลา 17:00 น. ขออภัยในความไม่สะดวกค่ะ 🙏' },
  { icon: '🎁', label: 'VIP โปร', text: '🎁 โปรพิเศษสำหรับลูกค้า VIP! ซื้อครบ ฿500 รับฟรีของแถม แค่วันนี้เท่านั้น 👑' },
];

// ─── Audience groups ────────────────────────────────────────────────────────
const audiences = [
  { id: 'all', label: 'ทุกคน', count: 1247 },
  { id: 'vip', label: 'ลูกค้า VIP', count: 89 },
  { id: 'new', label: 'ลูกค้าใหม่ <30 วัน', count: 203 },
  { id: 'inactive', label: 'ไม่ได้ซื้อ 30+ วัน', count: 156 },
];

// ─── Stats cards data ───────────────────────────────────────────────────────
const stats = [
  { label: 'ส่งแล้วเดือนนี้', value: '4,230', icon: Send, color: 'orange', emoji: '📤' },
  { label: 'อ่านแล้ว', value: '78%', icon: Eye, color: 'blue', emoji: '👁️' },
  { label: 'คลิก/ซื้อ', value: '12%', icon: ShoppingCart, color: 'purple', emoji: '🛒' },
  { label: 'รายได้จาก Broadcast', value: '฿14,280', icon: DollarSign, color: 'green', emoji: '💰' },
];

const colorMap = {
  orange: { bg: 'from-orange-500/20 to-orange-600/5', icon: 'text-orange-400', border: 'border-orange-500/20' },
  blue:   { bg: 'from-blue-500/20 to-blue-600/5',     icon: 'text-blue-400',   border: 'border-blue-500/20'   },
  purple: { bg: 'from-purple-500/20 to-purple-600/5', icon: 'text-purple-400', border: 'border-purple-500/20' },
  green:  { bg: 'from-emerald-500/20 to-emerald-600/5', icon: 'text-emerald-400', border: 'border-emerald-500/20' },
};

// ─── Quick schedule helpers ─────────────────────────────────────────────────
const quickSlots = [
  { label: 'พรุ่งนี้ 8:00 น.', date: '2026-03-23', time: '08:00' },
  { label: 'วันเสาร์ 10:00 น.', date: '2026-03-28', time: '10:00' },
];

export default function Marketing({ setSidebarOpen }) {
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState('all');
  const [scheduleMode, setScheduleMode] = useState('now'); // 'now' | 'schedule'
  const [schedDate, setSchedDate] = useState('');
  const [schedTime, setSchedTime] = useState('');
  const [toast, setToast] = useState(null);

  const selectedAudience = audiences.find(a => a.id === audience);
  const recipientCount = selectedAudience?.count ?? 0;

  function handleSend() {
    if (!message.trim()) return;
    setToast(`✅ จัดคิวแล้ว จะส่งให้ ~${recipientCount.toLocaleString()} คน`);
    setTimeout(() => setToast(null), 3500);
    setMessage('');
  }

  function applyTemplate(text) {
    setMessage(text);
  }

  function applyQuickSlot(slot) {
    setScheduleMode('schedule');
    setSchedDate(slot.date);
    setSchedTime(slot.time);
  }

  return (
    <PageLayout
      title="Broadcast"
      subtitle="ส่งข้อความหาลูกค้าจำนวนมากพร้อมกัน"
      setSidebarOpen={setSidebarOpen}
    >
      {/* ── Toast ──────────────────────────────────────────────────────────── */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white font-semibold px-6 py-3 rounded-2xl shadow-2xl shadow-emerald-500/30 text-sm animate-bounce">
          {toast}
        </div>
      )}

      {/* ── Section 1: Stats ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const c = colorMap[stat.color];
          return (
            <div
              key={i}
              className={`group bg-[#12121A] rounded-3xl p-6 border border-white/[0.04] hover:${c.border} transition-all`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${c.bg} border border-white/[0.06]`}>
                  <stat.icon className={`w-4 h-4 ${c.icon}`} />
                </div>
                <span className="text-lg">{stat.emoji}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white leading-tight">{stat.value}</h3>
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* ── Section 2: Compose Broadcast ──────────────────────────────────── */}
      <div className="bg-[#12121A] rounded-3xl border border-white/[0.04] p-6 space-y-6">
        <h4 className="text-lg font-bold text-white flex items-center gap-2">
          <Send className="w-5 h-5 text-orange-400" /> สร้าง Broadcast ใหม่
        </h4>

        {/* Step A — เนื้อหา */}
        <div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
            ขั้นตอนที่ 1 — เนื้อหาข้อความ
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Textarea */}
            <div className="relative">
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value.slice(0, 500))}
                placeholder="พิมพ์ข้อความที่จะส่ง..."
                rows={6}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40 transition-all resize-none"
              />
              <span className={`absolute bottom-3 right-4 text-xs font-bold ${message.length >= 480 ? 'text-red-400' : 'text-zinc-500'}`}>
                {message.length}/500
              </span>
            </div>

            {/* Live preview */}
            <div className="bg-[#1a1a28] rounded-2xl p-4 flex flex-col gap-2">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">ตัวอย่างข้อความ</p>
              <div className="flex-1 flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5">
                  M
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[260px] shadow-md">
                  <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {message || <span className="text-gray-400 italic">ข้อความจะแสดงที่นี่...</span>}
                  </p>
                </div>
              </div>
              <p className="text-[10px] text-zinc-600 mt-auto">Preview: LINE chat bubble</p>
            </div>
          </div>
        </div>

        {/* Step B — กลุ่มเป้าหมาย */}
        <div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
            ขั้นตอนที่ 2 — กลุ่มเป้าหมาย
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {audiences.map(a => (
              <label
                key={a.id}
                className={`flex flex-col gap-1 p-4 rounded-2xl border cursor-pointer transition-all ${
                  audience === a.id
                    ? 'border-orange-500/50 bg-orange-500/10'
                    : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]'
                }`}
              >
                <input
                  type="radio"
                  name="audience"
                  value={a.id}
                  checked={audience === a.id}
                  onChange={() => setAudience(a.id)}
                  className="sr-only"
                />
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                    audience === a.id ? 'border-orange-500' : 'border-zinc-600'
                  }`}>
                    {audience === a.id && <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                  </div>
                  <span className="text-xs font-semibold text-white">{a.label}</span>
                </div>
                <span className="text-[10px] text-zinc-500 pl-5">{a.count.toLocaleString()} คน</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-zinc-400 mt-3">
            จะส่งถึง <span className="text-orange-400 font-bold">~{recipientCount.toLocaleString()} คน</span>
          </p>
        </div>

        {/* Step C — เวลาส่ง */}
        <div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
            ขั้นตอนที่ 3 — เวลาส่ง
          </p>
          <div className="flex flex-wrap gap-3 mb-3">
            {[
              { id: 'now', label: 'ส่งทันที', icon: Send },
              { id: 'schedule', label: 'กำหนดเวลา', icon: Calendar },
            ].map(opt => (
              <label
                key={opt.id}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                  scheduleMode === opt.id
                    ? 'border-orange-500/50 bg-orange-500/10 text-white'
                    : 'border-white/[0.06] bg-white/[0.02] text-zinc-400 hover:border-white/[0.12]'
                }`}
              >
                <input
                  type="radio"
                  name="schedule"
                  value={opt.id}
                  checked={scheduleMode === opt.id}
                  onChange={() => setScheduleMode(opt.id)}
                  className="sr-only"
                />
                <opt.icon className="w-4 h-4" />
                <span className="text-sm font-semibold">{opt.label}</span>
              </label>
            ))}
          </div>

          {scheduleMode === 'schedule' && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-3">
                <input
                  type="date"
                  value={schedDate}
                  onChange={e => setSchedDate(e.target.value)}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500/40 transition-all"
                />
                <input
                  type="time"
                  value={schedTime}
                  onChange={e => setSchedTime(e.target.value)}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500/40 transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-zinc-500 self-center mr-1">Quick:</span>
                {quickSlots.map(slot => (
                  <button
                    key={slot.label}
                    onClick={() => applyQuickSlot(slot)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/[0.04] border border-white/[0.06] text-zinc-300 hover:text-white hover:border-orange-500/30 transition-all"
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 disabled:from-zinc-700 disabled:to-zinc-600 disabled:cursor-not-allowed text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" /> ส่ง Broadcast
        </button>
      </div>

      {/* ── Section 3: Templates ───────────────────────────────────────────── */}
      <div>
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-orange-400">✦</span> เทมเพลตข้อความ
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {templates.map((tpl, i) => (
            <button
              key={i}
              onClick={() => applyTemplate(tpl.text)}
              className="group bg-[#12121A] hover:bg-[#1a1a28] border border-white/[0.04] hover:border-orange-500/30 rounded-2xl p-4 text-left transition-all"
            >
              <div className="text-2xl mb-2">{tpl.icon}</div>
              <p className="text-xs font-bold text-white mb-1">{tpl.label}</p>
              <p className="text-[10px] text-zinc-500 leading-relaxed line-clamp-2">{tpl.text}</p>
              <p className="text-[10px] text-orange-400 font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                คลิกเพื่อใช้
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Section 4: History table ───────────────────────────────────────── */}
      <div className="bg-[#12121A] rounded-3xl border border-white/[0.04] overflow-hidden">
        <div className="px-6 py-5 border-b border-white/[0.04] flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-400" />
          <h4 className="text-lg font-bold text-white">ประวัติ Broadcast</h4>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {['วันที่', 'ข้อความ', 'ส่งถึง', 'อ่าน%', 'คลิก%', 'สถานะ'].map(col => (
                  <th key={col} className="px-6 py-3 text-left text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {broadcastHistory.map((row, i) => (
                <tr key={i} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-xs text-zinc-400 whitespace-nowrap">{row.date}</td>
                  <td className="px-6 py-4 text-sm text-white max-w-[220px]">
                    <span className="block truncate" title={row.msg}>
                      {row.msg.length > 40 ? row.msg.slice(0, 40) + '…' : row.msg}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white whitespace-nowrap">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-zinc-500" />
                      {row.sent.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {row.readPct > 0 ? (
                      <span className="text-blue-400 font-semibold">{row.readPct}%</span>
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {row.clickPct > 0 ? (
                      <span className="text-emerald-400 font-semibold">{row.clickPct}%</span>
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-white/[0.04]">
          {broadcastHistory.map((row, i) => (
            <div key={i} className="px-4 py-4 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-white font-medium truncate flex-1">{row.msg}</p>
                <StatusBadge status={row.status} />
              </div>
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <span>{row.date}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{row.sent.toLocaleString()}</span>
                {row.readPct > 0 && <span className="text-blue-400">{row.readPct}% อ่าน</span>}
                {row.clickPct > 0 && <span className="text-emerald-400">{row.clickPct}% คลิก</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

// ─── StatusBadge helper ─────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const isSent = status === 'ส่งแล้ว';
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
      isSent
        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
    }`}>
      {isSent ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
      {status}
    </span>
  );
}
