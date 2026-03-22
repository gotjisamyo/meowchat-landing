import { useState } from 'react';
import { TrendingUp, Users, UserPlus, AlertTriangle, MessageSquare, DollarSign, ArrowUpRight, Send, Download, FileWarning, RefreshCw } from 'lucide-react';

const mrrData = [
  { month: 'ต.ค.', value: 41000, label: '฿41K' },
  { month: 'พ.ย.', value: 52000, label: '฿52K' },
  { month: 'ธ.ค.', value: 63000, label: '฿63K' },
  { month: 'ม.ค.', value: 71000, label: '฿71K' },
  { month: 'ก.พ.', value: 82000, label: '฿82K' },
  { month: 'มี.ค.', value: 94800, label: '฿94.8K' },
];

const topCustomers = [
  { shop: 'ร้านแนน Fashion', plan: 'Enterprise', messages: 45230, revenue: 1990 },
  { shop: 'คอร์ส Excel Pro', plan: 'Enterprise', messages: 38492, revenue: 1990 },
  { shop: 'ครัวป้าบอล', plan: 'Pro', messages: 9847, revenue: 590 },
  { shop: 'ขนมไทยป้ามา', plan: 'Pro', messages: 8901, revenue: 590 },
  { shop: 'สปาออย', plan: 'Pro', messages: 7234, revenue: 590 },
];

const recentSignups = [
  { name: 'น้องโอ', email: 'o@gmail.com', type: 'บริการ', plan: 'Free', time: '3 ชม. ที่แล้ว' },
  { name: 'ขนมไทยป้ามา', email: 'ma@gmail.com', type: 'ร้านอาหาร', plan: 'Pro', time: '1 วันที่แล้ว' },
  { name: 'หอพักดาวรุ่ง', email: 'dao@gmail.com', type: 'อสังหา', plan: 'Free', time: '1 เดือนที่แล้ว' },
  { name: 'ทัวร์เชียงใหม่', email: 'golf@gmail.com', type: 'ท่องเที่ยว', plan: 'Pro', time: '2 เดือนที่แล้ว' },
  { name: 'คอร์ส Excel Pro', email: 'nid@gmail.com', type: 'การศึกษา', plan: 'Enterprise', time: '3 เดือนที่แล้ว' },
];

const planColors = {
  Enterprise: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Pro: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Free: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
};

const maxMrr = Math.max(...mrrData.map((d) => d.value));

const QUICK_ACTIONS = [
  {
    id: 'broadcast',
    icon: Send,
    label: 'ส่ง Broadcast ทดสอบ',
    color: 'bg-orange-500/15 border-orange-500/30 text-orange-400 hover:bg-orange-500/25',
    toast: 'ส่ง Broadcast ทดสอบสำเร็จแล้ว ✅',
  },
  {
    id: 'export',
    icon: Download,
    label: 'Export ข้อมูลลูกค้า',
    color: 'bg-blue-500/15 border-blue-500/30 text-blue-400 hover:bg-blue-500/25',
    toast: 'กำลัง Export ข้อมูลลูกค้า... ไฟล์จะพร้อมใน 1-2 นาที 📥',
  },
  {
    id: 'errors',
    icon: FileWarning,
    label: 'ดู Error Logs',
    color: 'bg-red-500/15 border-red-500/30 text-red-400 hover:bg-red-500/25',
    toast: 'เปิด Error Logs แล้ว — พบ 3 errors ใน 24 ชม. ที่ผ่านมา ⚠️',
  },
  {
    id: 'restart',
    icon: RefreshCw,
    label: 'รีสตาร์ท AI Worker',
    color: 'bg-purple-500/15 border-purple-500/30 text-purple-400 hover:bg-purple-500/25',
    toast: 'รีสตาร์ท AI Worker สำเร็จ — Worker พร้อมทำงานแล้ว 🚀',
  },
];

function QuickActionsCard() {
  const [toastMsg, setToastMsg] = useState(null);

  const handleAction = (action) => {
    setToastMsg(action.toast);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
      <h2 className="text-white font-bold mb-1">Quick Actions</h2>
      <p className="text-zinc-500 text-sm mb-5">ดำเนินการด่วนสำหรับแอดมิน</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => handleAction(action)}
              className={`flex flex-col items-center gap-2.5 px-3 py-4 rounded-xl border text-sm font-semibold transition-all duration-150 ${action.color}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-center leading-snug">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Inline toast notification */}
      {toastMsg && (
        <div className="mt-4 px-4 py-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-medium transition-all">
          {toastMsg}
        </div>
      )}
    </div>
  );
}

export default function SAOverview() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">Platform Overview</h1>
        <p className="text-zinc-500 text-sm mt-1">ภาพรวมธุรกิจ MeowChat ทั้งหมด · อัปเดตล่าสุด: มีนาคม 2026</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard icon={<DollarSign className="w-5 h-5" />} label="MRR" value="฿94,810" change="+18% MoM" color="green" />
        <KpiCard icon={<Users className="w-5 h-5" />} label="Active Customers" value="187" change="+34 เดือนนี้" color="blue" />
        <KpiCard icon={<UserPlus className="w-5 h-5" />} label="New This Month" value="34" change="+12% vs เดือนก่อน" color="orange" />
        <KpiCard icon={<AlertTriangle className="w-5 h-5" />} label="Churn Rate" value="2.1%" change="-0.3% vs เดือนก่อน" color="red" invert />
        <KpiCard icon={<TrendingUp className="w-5 h-5" />} label="ARPU" value="฿507" change="+฿45 vs เดือนก่อน" color="purple" />
        <KpiCard icon={<MessageSquare className="w-5 h-5" />} label="Messages/Day" value="48,290" change="+8% WoW" color="cyan" />
      </div>

      {/* Quick Actions */}
      <QuickActionsCard />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* MRR Chart */}
        <div className="xl:col-span-2 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white font-bold">MRR Growth</h2>
              <p className="text-zinc-500 text-sm">รายได้ประจำเดือน 6 เดือนล่าสุด</p>
            </div>
            <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" />+131% (6 months)
            </span>
          </div>
          <div className="flex items-end gap-3 h-40">
            {mrrData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-zinc-500 text-xs">{d.label}</span>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-orange-600 to-orange-400 transition-all"
                  style={{ height: `${(d.value / maxMrr) * 100}%`, minHeight: '8px' }}
                />
                <span className="text-zinc-400 text-xs font-medium">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plan Distribution */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-white font-bold mb-1">Plan Distribution</h2>
          <p className="text-zinc-500 text-sm mb-6">187 customers ทั้งหมด</p>

          {/* CSS donut approximation using stacked bars */}
          <div className="space-y-4">
            <PlanBar label="Free" count={89} percent={48} color="bg-zinc-500" textColor="text-zinc-400" />
            <PlanBar label="Pro ฿590" count={78} percent={42} color="bg-orange-500" textColor="text-orange-400" />
            <PlanBar label="Enterprise ฿1,990" count={20} percent={11} color="bg-purple-500" textColor="text-purple-400" />
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Pro Revenue</span>
              <span className="text-orange-400 font-medium">฿46,020/mo</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Enterprise Revenue</span>
              <span className="text-purple-400 font-medium">฿39,800/mo</span>
            </div>
            <div className="flex justify-between text-sm font-semibold pt-1 border-t border-white/[0.04]">
              <span className="text-zinc-300">Total MRR</span>
              <span className="text-green-400">฿85,820/mo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Top Customers */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4">Top 5 Customers by Revenue</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500 text-xs border-b border-white/[0.06]">
                  <th className="text-left pb-3">ร้าน</th>
                  <th className="text-left pb-3">Plan</th>
                  <th className="text-right pb-3">Messages/เดือน</th>
                  <th className="text-right pb-3">ยอด/เดือน</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {topCustomers.map((c, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 text-white font-medium">{c.shop}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${planColors[c.plan]}`}>{c.plan}</span>
                    </td>
                    <td className="py-3 text-right text-zinc-400">{c.messages.toLocaleString()}</td>
                    <td className="py-3 text-right text-green-400 font-semibold">฿{c.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Signups */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4">Recent Signups</h2>
          <div className="space-y-3">
            {recentSignups.map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-sm flex-shrink-0">
                  {s.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{s.name}</p>
                  <p className="text-zinc-500 text-xs truncate">{s.email} · {s.type}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${planColors[s.plan]}`}>{s.plan}</span>
                  <p className="text-zinc-600 text-xs mt-1">{s.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ icon, label, value, change, color, invert }) {
  const colorMap = {
    green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
    orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
    red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
    cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  };
  const c = colorMap[color];
  return (
    <div className={`bg-white/[0.03] border ${c.border} rounded-2xl p-4 flex flex-col gap-3`}>
      <div className={`w-9 h-9 ${c.bg} rounded-xl flex items-center justify-center ${c.text}`}>{icon}</div>
      <div>
        <p className="text-zinc-500 text-xs">{label}</p>
        <p className="text-white text-xl font-extrabold mt-0.5">{value}</p>
        <p className={`text-xs mt-1 ${invert ? 'text-green-400' : c.text}`}>{change}</p>
      </div>
    </div>
  );
}

function PlanBar({ label, count, percent, color, textColor }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-zinc-300">{label}</span>
        <span className={`${textColor} font-medium`}>{count} users ({percent}%)</span>
      </div>
      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
