import { Plus, Download, FileText } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { ordersData } from '../data/mockData';

// Sales funnel data
const funnelSteps = [
  { emoji: '👁️', label: 'เห็น Landing Page', count: 1247, pct: 100, basePct: 100 },
  { emoji: '💬', label: 'เริ่มแชท', count: 342, pct: 27, basePct: 90 },
  { emoji: '❓', label: 'ถามราคา/สินค้า', count: 201, pct: 59, basePct: 75 },
  { emoji: '🛒', label: 'สั่งซื้อ', count: 89, pct: 44, basePct: 55 },
  { emoji: '✅', label: 'ชำระเงิน', count: 78, pct: 88, basePct: 40 },
];

// Recent transactions
const recentTx = [
  { time: '14:32', customer: 'คุณมาลี ส.', product: 'เสื้อยืด Oversize × 2', amount: 598, status: 'completed' },
  { time: '13:55', customer: 'คุณสมชาย ก.', product: 'กางเกง Jogger', amount: 459, status: 'completed' },
  { time: '13:20', customer: 'คุณอรุณ ว.', product: 'Set ประหยัด', amount: 699, status: 'pending' },
  { time: '12:47', customer: 'คุณพิมพ์ น.', product: 'หมวก Cap', amount: 199, status: 'completed' },
  { time: '12:10', customer: 'คุณธนกร พ.', product: 'เสื้อยืด Oversize', amount: 299, status: 'completed' },
  { time: '11:38', customer: 'คุณสุมาลี ช.', product: 'ถุงผ้า Tote × 3', amount: 447, status: 'completed' },
  { time: '11:05', customer: 'คุณวิภา ร.', product: 'กางเกง Jogger × 2', amount: 918, status: 'failed' },
  { time: '10:44', customer: 'คุณนิรันดร์ ท.', product: 'Set ประหยัด × 2', amount: 1398, status: 'completed' },
  { time: '10:12', customer: 'คุณเบญจมาศ ล.', product: 'เสื้อยืด Oversize', amount: 299, status: 'pending' },
  { time: '09:51', customer: 'คุณกมลชนก ม.', product: 'หมวก Cap × 2', amount: 398, status: 'completed' },
];

const statusConfig = {
  completed: { label: 'สำเร็จ', className: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' },
  pending: { label: 'รอดำเนินการ', className: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25' },
  failed: { label: 'ล้มเหลว', className: 'bg-red-500/15 text-red-400 border border-red-500/25' },
};

export default function Sales({ setSidebarOpen }) {
  const todayStats = [
    { emoji: '💵', label: 'ยอดขายวันนี้', value: '฿4,230', sub: '+12% vs เมื่อวาน', subColor: 'text-emerald-400' },
    { emoji: '📦', label: 'ออเดอร์ใหม่', value: '14', sub: 'ออเดอร์', subColor: 'text-zinc-400' },
    { emoji: '👤', label: 'ลูกค้าใหม่', value: '8', sub: 'คนใหม่วันนี้', subColor: 'text-zinc-400' },
    { emoji: '🎯', label: 'Conversion Rate', value: '23%', sub: 'แชท → ซื้อ', subColor: 'text-orange-400' },
  ];

  return (
    <PageLayout
      title="Sales"
      subtitle="ยอดขายและ Pipeline วันนี้"
      setSidebarOpen={setSidebarOpen}
      actions={
        <>
          <div className="hidden lg:flex items-center gap-3">
            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">วันนี้</p>
              <p className="text-sm font-bold text-white">฿4,230</p>
            </div>
            <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">เดือนนี้</p>
              <p className="text-sm font-bold text-white">฿48,290</p>
            </div>
            <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">ออเดอร์</p>
              <p className="text-sm font-bold text-white">156</p>
            </div>
          </div>
          <button className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2">
            <Plus className="w-4 h-4" /> เพิ่มออเดอร์
          </button>
          <button className="btn-secondary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="btn-secondary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
            <FileText className="w-4 h-4" /> ใบเสร็จ
          </button>
        </>
      }
    >
      {/* Section 1 — Today's Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {todayStats.map((card, i) => (
          <div
            key={i}
            className="group bg-[#12121A] rounded-3xl p-7 border border-white/[0.04] hover:border-orange-500/20 transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-3xl mb-3">{card.emoji}</div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[3px] mb-1 leading-relaxed">{card.label}</p>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight mb-2 leading-normal">{card.value}</h3>
            <p className={`text-xs font-semibold ${card.subColor} leading-relaxed`}>{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Section 2 — Sales Funnel */}
      <div className="bg-[#12121A] rounded-3xl border border-white/[0.04] p-6 pb-8">
        <h4 className="text-lg font-bold text-white mb-6 leading-relaxed">🔽 Sales Funnel</h4>
        <div className="flex flex-col gap-3 items-center">
          {funnelSteps.map((step, i) => (
            <div key={i} className="w-full flex flex-col items-center gap-1.5">
              {/* Funnel bar — narrows each step */}
              <div
                className="relative rounded-xl overflow-hidden h-12 flex items-center justify-between px-4 transition-all"
                style={{
                  width: `${step.basePct}%`,
                  background:
                    i === 0
                      ? 'linear-gradient(90deg, #FF6B35, #FF9A6C)'
                      : `rgba(255,255,255,${0.06 - i * 0.007})`,
                  border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <span className="text-sm font-semibold text-white flex items-center gap-2 leading-relaxed">
                  <span>{step.emoji}</span>
                  <span>{step.label}</span>
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white">{step.count.toLocaleString()} คน</span>
                  {i > 0 && (
                    <span className="text-xs font-bold text-zinc-400 bg-white/10 px-2 py-0.5 rounded-full">
                      {step.pct}%
                    </span>
                  )}
                  {i === 0 && (
                    <span className="text-xs font-bold text-orange-200 bg-orange-500/20 px-2 py-0.5 rounded-full">
                      100%
                    </span>
                  )}
                </div>
              </div>
              {/* Connector arrow */}
              {i < funnelSteps.length - 1 && (
                <div className="text-zinc-600 text-xs leading-none">▼</div>
              )}
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-zinc-500 leading-relaxed">
          * % แสดงอัตราการเปลี่ยนจากขั้นก่อนหน้า
        </p>
      </div>

      {/* Section 3 — Recent Orders from ordersData */}
      <div className="bg-[#12121A] rounded-3xl border border-white/[0.04] p-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-bold text-white leading-relaxed">📦 ออเดอร์ล่าสุด</h4>
          <span className="text-xs text-zinc-500">5 รายการล่าสุด</span>
        </div>
        {ordersData.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <span className="text-4xl">📦</span>
            <p className="text-zinc-400 text-sm font-medium">ยังไม่มีออเดอร์</p>
            <p className="text-zinc-600 text-xs leading-relaxed">เมื่อลูกค้าสั่งผ่านแชท จะปรากฏที่นี่</p>
          </div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['ออเดอร์', 'ลูกค้า', 'สินค้า', 'ยอด', 'สถานะ'].map((h) => (
                  <th key={h} className="text-left text-[10px] font-bold text-zinc-500 uppercase tracking-[2px] pb-3 pr-5 last:pr-0 leading-relaxed">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ordersData.slice(-5).reverse().map((order) => {
                const orderStatusMap = {
                  new:       { label: 'รับแล้ว',     className: 'bg-orange-500/15 text-orange-400 border border-orange-500/25' },
                  preparing: { label: 'กำลังเตรียม', className: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25' },
                  shipped:   { label: 'ส่งแล้ว',     className: 'bg-blue-500/15 text-blue-400 border border-blue-500/25' },
                  done:      { label: 'เสร็จสิ้น',   className: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' },
                };
                const sc = orderStatusMap[order.status];
                return (
                  <tr key={order.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 pr-5 text-zinc-500 font-mono text-xs leading-relaxed">#{order.id}</td>
                    <td className="py-3.5 pr-5 leading-relaxed">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0" style={{ background: order.color }}>{order.avatar}</div>
                        <span className="font-semibold text-white text-sm">{order.customer}</span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-5 text-zinc-400 leading-relaxed max-w-[160px] truncate">{order.items}</td>
                    <td className="py-3.5 pr-5 font-bold text-white leading-relaxed">฿{order.total.toLocaleString()}</td>
                    <td className="py-3.5">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider leading-none ${sc.className}`}>{sc.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        )}
      </div>

      {/* Section 4 — Recent Transactions */}
      <div className="bg-[#12121A] rounded-3xl border border-white/[0.04] p-6 pb-8">
        <h4 className="text-lg font-bold text-white mb-6 leading-relaxed">🧾 ออเดอร์ล่าสุดวันนี้</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['เวลา', 'ลูกค้า', 'สินค้า', 'ยอด', 'สถานะ'].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[10px] font-bold text-zinc-500 uppercase tracking-[2px] pb-3 pr-5 last:pr-0 leading-relaxed"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentTx.map((tx, i) => {
                const sc = statusConfig[tx.status];
                return (
                  <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 pr-5 text-zinc-500 font-mono text-xs leading-relaxed">{tx.time}</td>
                    <td className="py-3.5 pr-5 font-semibold text-white leading-relaxed">{tx.customer}</td>
                    <td className="py-3.5 pr-5 text-zinc-400 leading-relaxed">{tx.product}</td>
                    <td className="py-3.5 pr-5 font-bold text-white leading-relaxed">฿{tx.amount.toLocaleString()}</td>
                    <td className="py-3.5">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider leading-none ${sc.className}`}>
                        {sc.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}
