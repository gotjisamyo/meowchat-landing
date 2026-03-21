import { TrendingUp, DollarSign, Users, ArrowUpRight, Rocket } from 'lucide-react';

const planRevenue = [
  { plan: 'Free', color: 'bg-zinc-500', textColor: 'text-zinc-400', borderColor: 'border-zinc-500/30', count: 89, price: 0, total: 0, pct: 0 },
  { plan: 'Pro ฿590', color: 'bg-orange-500', textColor: 'text-orange-400', borderColor: 'border-orange-500/30', count: 78, price: 590, total: 46020, pct: 54 },
  { plan: 'Enterprise ฿1,990', color: 'bg-purple-500', textColor: 'text-purple-400', borderColor: 'border-purple-500/30', count: 20, price: 1990, total: 39800, pct: 46 },
];

const monthlyData = [
  { month: 'ต.ค. 2025', mrr: 41000, newCustomers: 18, churn: 1, churnRevenue: 590 },
  { month: 'พ.ย. 2025', mrr: 52000, newCustomers: 22, churn: 2, churnRevenue: 1180 },
  { month: 'ธ.ค. 2025', mrr: 63000, newCustomers: 28, churn: 1, churnRevenue: 590 },
  { month: 'ม.ค. 2026', mrr: 71000, newCustomers: 25, churn: 3, churnRevenue: 1770 },
  { month: 'ก.พ. 2026', mrr: 82000, newCustomers: 30, churn: 2, churnRevenue: 1180 },
  { month: 'มี.ค. 2026', mrr: 94810, newCustomers: 34, churn: 4, churnRevenue: 2360 },
];

export default function SARevenue() {
  const totalMRR = 85820;
  const arpu = 507;
  const avgLifeMonths = 14;
  const ltv = arpu * avgLifeMonths;
  const cacMarketing = 8500;
  const newThisMonth = 34;
  const cac = Math.round(cacMarketing / newThisMonth);
  const arr = totalMRR * 12;

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Revenue & MRR</h1>
        <p className="text-zinc-500 text-sm mt-1">รายได้และตัวชี้วัดทางการเงิน · มีนาคม 2026</p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<DollarSign className="w-5 h-5" />}
          label="MRR (March)"
          value="฿94,810"
          sub="+18% MoM"
          color="green"
        />
        <MetricCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Annual Run Rate"
          value={`฿${(arr).toLocaleString()}`}
          sub="฿1,137,840/year"
          color="orange"
          highlight
        />
        <MetricCard
          icon={<Users className="w-5 h-5" />}
          label="LTV (avg)"
          value={`฿${ltv.toLocaleString()}`}
          sub={`${avgLifeMonths} เดือน × ฿${arpu} ARPU`}
          color="purple"
        />
        <MetricCard
          icon={<ArrowUpRight className="w-5 h-5" />}
          label="CAC (March)"
          value={`฿${cac}`}
          sub={`฿${cacMarketing.toLocaleString()} spend / ${newThisMonth} users`}
          color="blue"
        />
      </div>

      {/* LTV:CAC Ratio */}
      <div className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-2xl p-6 flex items-center gap-6">
        <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Rocket className="w-7 h-7 text-orange-400" />
        </div>
        <div className="flex-1">
          <p className="text-zinc-400 text-sm">LTV : CAC Ratio</p>
          <p className="text-3xl font-extrabold text-white mt-1">
            {(ltv / cac).toFixed(1)}x
          </p>
          <p className="text-zinc-500 text-sm mt-1">฿{ltv.toLocaleString()} LTV ÷ ฿{cac} CAC · เป้าหมาย &gt; 3x ✓</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-zinc-500 text-xs">Payback Period</p>
          <p className="text-white font-bold text-xl mt-1">{(cac / arpu).toFixed(1)} months</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Plan Breakdown */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-white font-bold mb-1">MRR Breakdown by Plan</h2>
          <p className="text-zinc-500 text-sm mb-6">รายได้แยกตาม subscription tier</p>

          <div className="space-y-5">
            {planRevenue.map((p) => (
              <div key={p.plan}>
                <div className="flex justify-between text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${p.color}`} />
                    <span className="text-zinc-300">{p.plan}</span>
                    <span className="text-zinc-600 text-xs">({p.count} users × ฿{p.price.toLocaleString()})</span>
                  </div>
                  <span className={`font-semibold ${p.textColor}`}>
                    {p.total > 0 ? `฿${p.total.toLocaleString()}` : '—'}
                  </span>
                </div>
                {p.total > 0 && (
                  <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className={`h-full ${p.color} rounded-full`} style={{ width: `${p.pct}%` }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Paid MRR (Pro + Enterprise)</span>
              <span className="text-white font-semibold">฿85,820</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">New MRR this month est.</span>
              <span className="text-green-400 font-semibold">+฿8,990</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-white/[0.04]">
              <span className="text-zinc-300 font-semibold">Total MRR (March)</span>
              <span className="text-green-400 font-bold">฿94,810</span>
            </div>
          </div>
        </div>

        {/* Monthly History */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-white font-bold mb-1">Monthly History</h2>
          <p className="text-zinc-500 text-sm mb-6">MRR, new customers, churn impact</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500 text-xs border-b border-white/[0.06]">
                  <th className="text-left pb-3">เดือน</th>
                  <th className="text-right pb-3">MRR</th>
                  <th className="text-right pb-3">New</th>
                  <th className="text-right pb-3">Churn ฿</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {monthlyData.map((m, i) => (
                  <tr key={i} className={`hover:bg-white/[0.02] transition-colors ${i === monthlyData.length - 1 ? 'text-white font-semibold' : ''}`}>
                    <td className="py-2.5 text-zinc-300">{m.month}</td>
                    <td className="py-2.5 text-right text-green-400">฿{m.mrr.toLocaleString()}</td>
                    <td className="py-2.5 text-right text-blue-400">+{m.newCustomers}</td>
                    <td className="py-2.5 text-right text-red-400">-฿{m.churnRevenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Revenue health summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          title="Churn This Month"
          value="-฿2,360"
          detail="4 customers cancelled"
          color="red"
        />
        <SummaryCard
          title="Net New MRR"
          value="+฿12,810"
          detail="Expansion + new signups"
          color="green"
        />
        <SummaryCard
          title="Annual Run Rate"
          value="฿1,137,840"
          detail="On track for ฿1.1M ARR"
          color="orange"
          rocket
        />
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, sub, color, highlight }) {
  const colorMap = {
    green: 'text-green-400 bg-green-500/10 border-green-500/20',
    orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  };
  const [textC, bgC, borderC] = colorMap[color].split(' ');
  return (
    <div className={`bg-white/[0.03] border ${highlight ? 'border-orange-500/30 bg-orange-500/5' : 'border-white/[0.06]'} rounded-2xl p-5`}>
      <div className={`w-9 h-9 ${bgC} ${borderC} border rounded-xl flex items-center justify-center ${textC} mb-3`}>{icon}</div>
      <p className="text-zinc-500 text-xs">{label}</p>
      <p className={`text-xl font-extrabold mt-0.5 ${highlight ? 'text-orange-400' : 'text-white'}`}>{value}</p>
      <p className="text-zinc-600 text-xs mt-1">{sub}</p>
    </div>
  );
}

function SummaryCard({ title, value, detail, color, rocket }) {
  const colorMap = {
    red: 'border-red-500/20 text-red-400',
    green: 'border-green-500/20 text-green-400',
    orange: 'border-orange-500/20 text-orange-400',
  };
  return (
    <div className={`bg-white/[0.03] border ${colorMap[color]} rounded-2xl p-5`}>
      <p className="text-zinc-500 text-sm">{title}</p>
      <p className={`text-2xl font-bold mt-1 ${colorMap[color].split(' ')[1]}`}>
        {value} {rocket && <Rocket className="w-5 h-5 inline ml-1" />}
      </p>
      <p className="text-zinc-600 text-xs mt-1">{detail}</p>
    </div>
  );
}
