import { useState } from 'react';
import { Ticket, Clock, CheckCircle2, AlertCircle, X, MessageSquare } from 'lucide-react';

const TICKETS = [
  { id: 'T-1042', shop: 'ครัวป้าบอล', owner: 'พี่บอล วิชัย', subject: 'AI ตอบผิดเรื่องราคาอาหาร', priority: 'high', status: 'open', created: '2026-03-21 14:20', plan: 'pro' },
  { id: 'T-1041', shop: 'สปาออย', owner: 'น้องออย', subject: 'ต้องการเพิ่ม LINE OA อีก 1 ช่อง', priority: 'medium', status: 'open', created: '2026-03-21 11:05', plan: 'pro' },
  { id: 'T-1040', shop: 'ร้านแนน Fashion', owner: 'คุณแนน สมิตา', subject: 'Report ยอดขายไม่ตรงกับ actual', priority: 'high', status: 'in-progress', created: '2026-03-20 16:45', plan: 'enterprise' },
  { id: 'T-1039', shop: 'เสื้อผ้าฝ้าย', owner: 'น้องฝ้าย', subject: 'สมัครใหม่แล้ว LINE ยังไม่ connect', priority: 'low', status: 'resolved', created: '2026-03-19 09:12', plan: 'free' },
  { id: 'T-1038', shop: 'ทัวร์เชียงใหม่', owner: 'คุณกอล์ฟ', subject: 'อยากอัปเกรดจาก Pro เป็น Enterprise', priority: 'low', status: 'resolved', created: '2026-03-18 15:30', plan: 'pro' },
];

const priorityColors = {
  high: 'bg-red-500/20 text-red-400 border-red-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  low: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
};

const statusColors = {
  open: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  resolved: 'bg-green-500/20 text-green-400 border-green-500/30',
};

export default function SASupport() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState('');

  const filtered = TICKETS.filter((t) => filter === 'all' || t.status === filter);
  const open = TICKETS.filter((t) => t.status === 'open').length;
  const inProgress = TICKETS.filter((t) => t.status === 'in-progress').length;
  const resolved = TICKETS.filter((t) => t.status === 'resolved').length;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Support Tickets</h1>
        <p className="text-zinc-500 text-sm mt-1">จัดการ support tickets จากลูกค้า</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-center">
          <p className="text-orange-400 text-2xl font-bold">{open}</p>
          <p className="text-zinc-500 text-xs mt-1">Open</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
          <p className="text-blue-400 text-2xl font-bold">{inProgress}</p>
          <p className="text-zinc-500 text-xs mt-1">In Progress</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
          <p className="text-green-400 text-2xl font-bold">{resolved}</p>
          <p className="text-zinc-500 text-xs mt-1">Resolved</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'open', 'in-progress', 'resolved'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
              filter === f
                ? 'bg-orange-500 text-white'
                : 'bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08]'
            }`}
          >
            {f === 'all' ? 'All' : f === 'in-progress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Tickets list */}
      <div className="space-y-3">
        {filtered.map((t) => (
          <div
            key={t.id}
            onClick={() => setSelected(t)}
            className="bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.10] rounded-2xl p-5 cursor-pointer transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-zinc-500 text-xs font-mono">{t.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityColors[t.priority]}`}>{t.priority}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[t.status]}`}>{t.status}</span>
                </div>
                <p className="text-white font-medium">{t.subject}</p>
                <p className="text-zinc-500 text-sm mt-1">{t.shop} · {t.owner}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-zinc-600 text-xs">{t.created}</p>
                <p className={`text-xs mt-1 ${t.plan === 'enterprise' ? 'text-purple-400' : t.plan === 'pro' ? 'text-orange-400' : 'text-zinc-500'}`}>
                  {t.plan.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#141418] border border-white/[0.08] rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <div>
                <p className="text-zinc-500 text-xs font-mono">{selected.id}</p>
                <h3 className="text-white font-bold">{selected.subject}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="text-zinc-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full border ${priorityColors[selected.priority]}`}>{selected.priority}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[selected.status]}`}>{selected.status}</span>
              </div>
              <p className="text-zinc-400 text-sm">{selected.shop} · {selected.owner}</p>
              <p className="text-zinc-600 text-xs">{selected.created}</p>
              <div className="bg-white/[0.03] rounded-xl p-4 mt-2">
                <p className="text-zinc-400 text-sm">ลูกค้าแจ้งปัญหา: <span className="text-zinc-200">{selected.subject}</span></p>
              </div>
              <div>
                <label className="text-zinc-400 text-sm mb-2 block">ตอบกลับ</label>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={3}
                  placeholder="พิมพ์คำตอบสำหรับลูกค้า..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-orange-500/40 resize-none"
                />
              </div>
            </div>
            <div className="p-6 pt-0 flex gap-3">
              <button
                onClick={() => { setReply(''); setSelected(null); }}
                className="flex-1 flex items-center justify-center gap-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 rounded-xl py-2.5 text-sm font-medium transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Send Reply
              </button>
              <button
                onClick={() => setSelected(null)}
                className="flex-1 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 border border-white/[0.08] rounded-xl py-2.5 text-sm font-medium transition-all"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
