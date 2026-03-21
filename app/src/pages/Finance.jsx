import {
  TrendingUp, Download, RefreshCw, Calendar, ChevronDown
} from 'lucide-react';
import PageLayout from '../components/PageLayout';

// Monthly revenue data for last 6 months
const monthlyRevenue = [
  { month: 'ต.ค.', amount: 28400 },
  { month: 'พ.ย.', amount: 31200 },
  { month: 'ธ.ค.', amount: 38900 },
  { month: 'ม.ค.', amount: 35600 },
  { month: 'ก.พ.', amount: 41200 },
  { month: 'มี.ค.', amount: 48290, isCurrent: true },
];

const maxRevenue = Math.max(...monthlyRevenue.map((d) => d.amount));

const revenueSources = [
  { label: '💬 แชทบอท', pct: 68, amount: 32837, color: '#FF6B35' },
  { label: '👤 เจ้าของตอบ', pct: 22, amount: 10624, color: '#F7C548' },
  { label: '📤 Broadcast', pct: 10, amount: 4829, color: '#8B5CF6' },
];

const topProducts = [
  { name: 'เสื้อยืด Oversize', sold: 89, unit: 'ชิ้น', revenue: 26611, pct: 55 },
  { name: 'กางเกง Jogger', sold: 44, unit: 'ชิ้น', revenue: 20196, pct: 42 },
  { name: 'Set ประหยัด', sold: 18, unit: 'ชุด', revenue: 12582, pct: 26 },
  { name: 'หมวก Cap', sold: 12, unit: 'ใบ', revenue: 2388, pct: 5 },
  { name: 'ถุงผ้า Tote', sold: 31, unit: 'ใบ', revenue: 4619, pct: 10 },
];

export default function Finance({ setSidebarOpen }) {
  const overviewCards = [
    { emoji: '💰', label: 'รายได้เดือนนี้', value: '฿48,290', sub: '+23% vs เดือนก่อน', subColor: 'text-emerald-400' },
    { emoji: '📊', label: 'รายได้เฉลี่ย/วัน', value: '฿1,557', sub: 'เฉลี่ย 31 วัน', subColor: 'text-zinc-400' },
    { emoji: '🛒', label: 'ออเดอร์เดือนนี้', value: '156', sub: 'ออเดอร์', subColor: 'text-zinc-400' },
    { emoji: '💳', label: 'มูลค่าเฉลี่ย/ออเดอร์', value: '฿309', sub: 'ต่อออเดอร์', subColor: 'text-zinc-400' },
  ];

  return (
    <PageLayout
      title="Finance"
      subtitle="สรุปรายได้และการเงินประจำเดือน"
      setSidebarOpen={setSidebarOpen}
      actions={
        <>
          <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl">
            <Calendar className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-400">มีนาคม 2026</span>
            <ChevronDown className="w-4 h-4 text-zinc-600" />
          </div>
          <button className="btn-secondary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="btn-secondary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Sync
          </button>
        </>
      }
    >
      {/* Section 1 — Revenue Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {overviewCards.map((card, i) => (
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

      {/* Section 2 — Monthly Revenue Chart (CSS bars) */}
      <div className="bg-[#12121A] rounded-3xl border border-white/[0.04] p-6 pb-8">
        <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-3 leading-relaxed">
          <TrendingUp className="w-5 h-5 text-orange-400" /> รายได้ย้อนหลัง 6 เดือน
        </h4>
        {/* Bar chart */}
        <div className="flex items-end gap-3 h-48 px-2">
          {monthlyRevenue.map((d, i) => {
            const heightPct = (d.amount / maxRevenue) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] font-semibold text-zinc-400 leading-none">
                  ฿{(d.amount / 1000).toFixed(1)}k
                </span>
                <div className="w-full flex items-end" style={{ height: '140px' }}>
                  <div
                    className="w-full rounded-t-lg transition-all"
                    style={{
                      height: `${heightPct}%`,
                      background: d.isCurrent
                        ? 'linear-gradient(to top, #FF6B35, #FF9A6C)'
                        : 'rgba(255,255,255,0.07)',
                      boxShadow: d.isCurrent ? '0 0 16px rgba(255,107,53,0.4)' : 'none',
                    }}
                  />
                </div>
                <span
                  className={`text-[11px] font-semibold leading-none ${
                    d.isCurrent ? 'text-orange-400' : 'text-zinc-500'
                  }`}
                >
                  {d.month}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm inline-block bg-orange-500" /> เดือนปัจจุบัน
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm inline-block bg-white/10" /> เดือนก่อนหน้า
          </span>
        </div>
      </div>

      {/* Section 3 — Revenue Sources */}
      <div className="bg-[#12121A] rounded-3xl border border-white/[0.04] p-6 pb-8">
        <h4 className="text-lg font-bold text-white mb-6 leading-relaxed">📡 แหล่งที่มาของรายได้</h4>
        <div className="space-y-5">
          {revenueSources.map((src, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-zinc-300 leading-relaxed">{src.label}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-white">฿{src.amount.toLocaleString()}</span>
                  <span className="text-xs font-bold text-zinc-400 w-8 text-right">{src.pct}%</span>
                </div>
              </div>
              {/* Horizontal bar */}
              <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${src.pct}%`, background: src.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4 — Top Products Table */}
      <div className="bg-[#12121A] rounded-3xl border border-white/[0.04] p-6 pb-8">
        <h4 className="text-lg font-bold text-white mb-6 leading-relaxed">🏆 สินค้าขายดีตามรายได้</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['สินค้า', 'ขายได้', 'รายได้', '% ของทั้งหมด'].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[10px] font-bold text-zinc-500 uppercase tracking-[2px] pb-3 pr-6 last:pr-0 leading-relaxed"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, i) => (
                <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 pr-6 font-semibold text-white leading-relaxed">{p.name}</td>
                  <td className="py-4 pr-6 text-zinc-400 leading-relaxed">
                    {p.sold} {p.unit}
                  </td>
                  <td className="py-4 pr-6 font-bold text-white leading-relaxed">฿{p.revenue.toLocaleString()}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden min-w-[60px]">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${p.pct}%`, background: '#FF6B35' }}
                        />
                      </div>
                      <span className="text-xs font-bold text-orange-400 w-8 text-right">{p.pct}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 5 — Subscription & Costs */}
      <div className="bg-[#12121A] rounded-3xl border border-white/[0.04] p-6 pb-8">
        <h4 className="text-lg font-bold text-white mb-6 leading-relaxed">💎 แผนและ ROI</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Plan */}
          <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/[0.05]">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[3px] mb-2 leading-relaxed">แผนปัจจุบัน</p>
            <p className="text-xl font-extrabold text-white leading-normal">Pro</p>
            <p className="text-sm text-zinc-400 mt-1 leading-relaxed">฿590 / เดือน</p>
          </div>
          {/* ROI */}
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-2xl p-5 border border-orange-500/20">
            <p className="text-[10px] font-bold text-orange-400 uppercase tracking-[3px] mb-2 leading-relaxed">ROI</p>
            <p className="text-xl font-extrabold text-white leading-normal">81x 🚀</p>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">ลงทุน ฿590 ได้รายได้ ฿48,290</p>
          </div>
          {/* Time saved */}
          <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/[0.05]">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[3px] mb-2 leading-relaxed">ประหยัดเวลา</p>
            <p className="text-xl font-extrabold text-white leading-normal">~4.2 ชม./วัน</p>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">ที่บอทตอบแทนคุณ</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
