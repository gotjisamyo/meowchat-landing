import { useState } from 'react';
import {
  Package, ChevronRight, X, Copy, Send, Bell,
  Clock, CheckCircle, Truck, ShoppingBag, LayoutList, Columns
} from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { ordersData } from '../data/mockData';

const STATUS_CONFIG = {
  new:       { label: 'รับออเดอร์แล้ว', icon: '🆕', headerColor: '#F97316', bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400' },
  preparing: { label: 'กำลังเตรียม',     icon: '🍳', headerColor: '#EAB308', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400' },
  shipped:   { label: 'ส่งแล้ว',          icon: '🚚', headerColor: '#3B82F6', bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   text: 'text-blue-400'   },
  done:      { label: 'เสร็จสิ้น',        icon: '✅', headerColor: '#10B981', bg: 'bg-emerald-500/10',border: 'border-emerald-500/20', text: 'text-emerald-400'},
};

const STATUS_ORDER = ['new', 'preparing', 'shipped', 'done'];

function Toast({ message, onDone }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] animate-fade-in">
      <div className="bg-[#1A1A24] border border-emerald-500/30 text-emerald-400 px-5 py-3 rounded-2xl text-sm font-semibold shadow-2xl flex items-center gap-2">
        <CheckCircle className="w-4 h-4 flex-shrink-0" />
        {message}
      </div>
    </div>
  );
}

function OrderCard({ order, onMoveNext, onNotify, onClick }) {
  const cfg = STATUS_CONFIG[order.status];
  const canMove = order.status !== 'done';

  return (
    <div
      className="bg-[#12121A] border border-white/[0.06] rounded-2xl p-4 space-y-3 cursor-pointer hover:border-white/10 transition-all group"
      onClick={onClick}
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-zinc-500 tracking-wider">#{order.id}</span>
        <span className="text-[11px] font-semibold text-zinc-500 flex items-center gap-1">
          <Clock className="w-3 h-3" /> {order.time} น.
        </span>
      </div>

      {/* Customer */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ background: order.color }}
        >
          {order.avatar}
        </div>
        <span className="font-semibold text-white text-sm group-hover:text-orange-400 transition-colors">
          {order.customer}
        </span>
      </div>

      {/* Items */}
      <p className="text-xs text-zinc-400 leading-relaxed">{order.items}</p>

      {/* Total */}
      <div className="flex items-center justify-between pt-1 border-t border-white/[0.04]">
        <span className="text-base font-bold text-white">฿{order.total.toLocaleString()}</span>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 pt-1" onClick={e => e.stopPropagation()}>
        {canMove && (
          <button
            onClick={() => onMoveNext(order.id)}
            className="flex-1 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold hover:bg-orange-500/20 transition-colors flex items-center justify-center gap-1"
          >
            <ChevronRight className="w-3.5 h-3.5" /> ขั้นต่อไป
          </button>
        )}
        <button
          onClick={() => onNotify(order)}
          className="flex-1 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold hover:bg-blue-500/20 transition-colors flex items-center justify-center gap-1"
        >
          <Bell className="w-3.5 h-3.5" /> แจ้งลูกค้า
        </button>
      </div>
    </div>
  );
}

function StatusTimeline({ status }) {
  const steps = [
    { key: 'new',       label: 'รับออเดอร์' },
    { key: 'preparing', label: 'กำลังเตรียม' },
    { key: 'shipped',   label: 'ส่งแล้ว' },
    { key: 'done',      label: 'เสร็จ' },
  ];
  const currentIdx = STATUS_ORDER.indexOf(status);

  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => {
        const done = i <= currentIdx;
        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${done ? 'bg-emerald-500 text-white' : 'bg-white/[0.06] text-zinc-600'}`}>
                {done ? '✓' : '○'}
              </div>
              <span className={`text-[10px] whitespace-nowrap ${done ? 'text-emerald-400' : 'text-zinc-600'}`}>{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 h-0.5 mb-4 mx-1 ${i < currentIdx ? 'bg-emerald-500' : 'bg-white/[0.06]'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function OrderModal({ order, onClose, onMoveNext, onNotify }) {
  const [tracking, setTracking] = useState(order.tracking || '');
  const [copied, setCopied] = useState(false);
  const cfg = STATUS_CONFIG[order.status];
  const canMove = order.status !== 'done';

  const copyAddress = () => {
    navigator.clipboard.writeText(order.address).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const messagePreview = `สวัสดีค่ะ คุณ${order.customer} 😊\nออเดอร์ #${order.id} ของคุณ${cfg.label}แล้วนะคะ${order.tracking ? `\nเลขพัสดุ: ${order.tracking}` : ''}\nขอบคุณมากค่ะ 🙏`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-[#12121A] border border-white/[0.08] rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
          <div>
            <h3 className="text-lg font-bold text-white">#{order.id}</h3>
            <div className={`inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.border} border ${cfg.text}`}>
              {cfg.icon} {cfg.label}
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/[0.06] rounded-xl text-zinc-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Customer info */}
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
              style={{ background: order.color }}
            >
              {order.avatar}
            </div>
            <div>
              <p className="font-bold text-white">{order.customer}</p>
              <p className="text-sm text-zinc-400">{order.time} น.</p>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">ที่อยู่จัดส่ง</span>
              <button
                onClick={copyAddress}
                className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? 'คัดลอกแล้ว ✅' : 'คัดลอกที่อยู่'}
              </button>
            </div>
            <p className="text-sm text-zinc-300">{order.address}</p>
          </div>

          {/* Items */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-3">รายการสินค้า</span>
            <p className="text-sm text-zinc-300 mb-3">{order.items}</p>
            <div className="flex justify-between items-center pt-3 border-t border-white/[0.06]">
              <span className="text-sm font-semibold text-zinc-400">ยอดรวม</span>
              <span className="text-lg font-bold text-white">฿{order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Status timeline */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-4">สถานะออเดอร์</span>
            <StatusTimeline status={order.status} />
          </div>

          {/* Tracking */}
          <div>
            <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-2">เลขพัสดุ</label>
            <input
              type="text"
              value={tracking}
              onChange={e => setTracking(e.target.value)}
              placeholder="KEX123456789"
              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40 transition-all"
            />
          </div>

          {/* Message preview */}
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4">
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block mb-2">ตัวอย่างข้อความแจ้งลูกค้า</span>
            <pre className="text-xs text-zinc-300 whitespace-pre-wrap font-sans leading-relaxed">{messagePreview}</pre>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            {canMove && (
              <button
                onClick={() => { onMoveNext(order.id); onClose(); }}
                className="flex-1 py-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold hover:bg-orange-500/20 transition-colors flex items-center justify-center gap-2"
              >
                <ChevronRight className="w-4 h-4" /> ขั้นต่อไป
              </button>
            )}
            <button
              onClick={() => { onNotify(order); onClose(); }}
              className="flex-1 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold hover:bg-blue-500/20 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> แจ้งลูกค้า
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Orders({ setSidebarOpen }) {
  const [orders, setOrders] = useState(ordersData);
  const [view, setView] = useState('kanban'); // 'kanban' | 'table'
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [toast, setToast] = useState(null);
  const [sortCol, setSortCol] = useState('time');
  const [sortDir, setSortDir] = useState('asc');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const moveNext = (orderId) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      const idx = STATUS_ORDER.indexOf(o.status);
      if (idx >= STATUS_ORDER.length - 1) return o;
      return { ...o, status: STATUS_ORDER[idx + 1] };
    }));
  };

  const notify = (order) => {
    showToast(`ส่งข้อความให้ ${order.customer} แล้ว ✅`);
  };

  // Stats
  const todayCount = orders.length;
  const pendingCount = orders.filter(o => o.status === 'new').length;
  const shippedCount = orders.filter(o => o.status === 'shipped').length;
  const doneCount = orders.filter(o => o.status === 'done').length;

  const stats = [
    { label: 'ออเดอร์วันนี้', value: todayCount,    icon: '📦', color: 'text-white',        bg: 'bg-white/[0.04]',        border: 'border-white/[0.06]' },
    { label: 'รอดำเนินการ',   value: pendingCount,  icon: '⏳', color: 'text-orange-400',   bg: 'bg-orange-500/10',       border: 'border-orange-500/20' },
    { label: 'กำลังส่ง',      value: shippedCount,  icon: '🚚', color: 'text-blue-400',     bg: 'bg-blue-500/10',         border: 'border-blue-500/20' },
    { label: 'เสร็จแล้ว',     value: doneCount,     icon: '✅', color: 'text-emerald-400',  bg: 'bg-emerald-500/10',      border: 'border-emerald-500/20' },
  ];

  const handleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
  };

  const sortedOrders = [...orders].sort((a, b) => {
    let av = a[sortCol], bv = b[sortCol];
    if (sortCol === 'total') { av = Number(av); bv = Number(bv); }
    if (sortCol === 'status') { av = STATUS_ORDER.indexOf(av); bv = STATUS_ORDER.indexOf(bv); }
    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ col }) => {
    if (sortCol !== col) return <span className="text-zinc-700 ml-1">↕</span>;
    return <span className="text-orange-400 ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <PageLayout
      title="ออเดอร์"
      subtitle="จัดการและติดตามสถานะออเดอร์ทั้งหมด"
      setSidebarOpen={setSidebarOpen}
      actions={
        <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-xl p-1">
          <button
            onClick={() => setView('kanban')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${view === 'kanban' ? 'bg-orange-500 text-white shadow-lg' : 'text-zinc-400 hover:text-white'}`}
          >
            <Columns className="w-4 h-4" /> Kanban
          </button>
          <button
            onClick={() => setView('table')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${view === 'table' ? 'bg-orange-500 text-white shadow-lg' : 'text-zinc-400 hover:text-white'}`}
          >
            <LayoutList className="w-4 h-4" /> ตาราง
          </button>
        </div>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`${s.bg} border ${s.border} rounded-2xl p-5`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{s.icon}</span>
              <Package className="w-4 h-4 text-zinc-600" />
            </div>
            <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-xs font-semibold text-zinc-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Kanban View */}
      {view === 'kanban' && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-5 min-w-[900px]">
            {STATUS_ORDER.map(status => {
              const cfg = STATUS_CONFIG[status];
              const col = orders.filter(o => o.status === status);
              return (
                <div key={status} className="flex-1 min-w-[220px]">
                  {/* Column header */}
                  <div
                    className="flex items-center gap-2 px-4 py-3 rounded-2xl mb-4"
                    style={{ background: `${cfg.headerColor}18`, border: `1px solid ${cfg.headerColor}30` }}
                  >
                    <span className="text-base">{cfg.icon}</span>
                    <span className="font-bold text-sm text-white flex-1">{cfg.label}</span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: cfg.headerColor }}
                    >
                      {col.length}
                    </span>
                  </div>

                  {/* Cards */}
                  <div className="space-y-3">
                    {col.length === 0 && (
                      <div className="border-2 border-dashed border-white/[0.06] rounded-2xl p-6 text-center text-zinc-600 text-xs font-semibold">
                        ไม่มีออเดอร์
                      </div>
                    )}
                    {col.map(order => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onMoveNext={moveNext}
                        onNotify={notify}
                        onClick={() => setSelectedOrder(order)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Table View */}
      {view === 'table' && (
        <div className="bg-[#12121A] rounded-3xl border border-white/[0.04] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {[
                    { key: 'id',       label: 'ออเดอร์' },
                    { key: 'customer', label: 'ลูกค้า' },
                    { key: 'items',    label: 'รายการ' },
                    { key: 'total',    label: 'ยอด' },
                    { key: 'status',   label: 'สถานะ' },
                    { key: 'time',     label: 'เวลา' },
                  ].map(col => (
                    <th
                      key={col.key}
                      className="px-5 py-4 text-left text-[11px] font-bold text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-white transition-colors select-none"
                      onClick={() => handleSort(col.key)}
                    >
                      {col.label}<SortIcon col={col.key} />
                    </th>
                  ))}
                  <th className="px-5 py-4" />
                </tr>
              </thead>
              <tbody>
                {sortedOrders.map((order, i) => {
                  const cfg = STATUS_CONFIG[order.status];
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-white/[0.03] hover:bg-white/[0.02] cursor-pointer transition-colors group"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="px-5 py-4 text-xs font-bold text-zinc-500">#{order.id}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                            style={{ background: order.color }}
                          >
                            {order.avatar}
                          </div>
                          <span className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colors">
                            {order.customer}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs text-zinc-400 max-w-[180px] truncate">{order.items}</td>
                      <td className="px-5 py-4 text-sm font-bold text-white">฿{order.total.toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.border} border ${cfg.text}`}>
                          {cfg.icon} {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-zinc-500">{order.time} น.</td>
                      <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                        <div className="flex gap-1.5">
                          {order.status !== 'done' && (
                            <button
                              onClick={() => moveNext(order.id)}
                              className="px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold hover:bg-orange-500/20 transition-colors"
                            >
                              →
                            </button>
                          )}
                          <button
                            onClick={() => notify(order)}
                            className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold hover:bg-blue-500/20 transition-colors"
                          >
                            <Bell className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedOrder && (
        <OrderModal
          order={orders.find(o => o.id === selectedOrder.id) || selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onMoveNext={moveNext}
          onNotify={notify}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast} />}
    </PageLayout>
  );
}
