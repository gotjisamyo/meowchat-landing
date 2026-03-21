import { BarChart2, MessageSquare, Users, TrendingUp, Globe } from 'lucide-react';

const topBusinessTypes = [
  { type: 'ร้านอาหาร', count: 48, pct: 26, color: 'bg-orange-500' },
  { type: 'แฟชั่น', count: 35, pct: 19, color: 'bg-pink-500' },
  { type: 'บริการ', count: 29, pct: 15, color: 'bg-blue-500' },
  { type: 'สปา/ความงาม', count: 22, pct: 12, color: 'bg-purple-500' },
  { type: 'การศึกษา', count: 18, pct: 10, color: 'bg-green-500' },
  { type: 'อื่นๆ', count: 35, pct: 18, color: 'bg-zinc-500' },
];

const dailyMessages = [
  { day: 'จ', value: 42000 },
  { day: 'อ', value: 51000 },
  { day: 'พ', value: 48000 },
  { day: 'พฤ', value: 53000 },
  { day: 'ศ', value: 61000 },
  { day: 'ส', value: 38000 },
  { day: 'อา', value: 29000 },
];

const maxDaily = Math.max(...dailyMessages.map((d) => d.value));

export default function SAPlatformAnalytics() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Platform Analytics</h1>
        <p className="text-zinc-500 text-sm mt-1">วิเคราะห์การใช้งานและ engagement ของ platform</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <MessageSquare className="w-5 h-5" />, label: 'Total Messages (30d)', value: '1,448,700', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
          { icon: <Users className="w-5 h-5" />, label: 'Active LINE Users', value: '23,410', color: 'text-green-400 bg-green-500/10 border-green-500/20' },
          { icon: <TrendingUp className="w-5 h-5" />, label: 'Avg Session Length', value: '4.2 min', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
          { icon: <Globe className="w-5 h-5" />, label: 'Bot Response Rate', value: '94.8%', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
        ].map((k) => (
          <div key={k.label} className={`bg-white/[0.03] border rounded-2xl p-5 ${k.color.split(' ').slice(1).join(' ')}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${k.color}`}>{k.icon}</div>
            <p className="text-zinc-500 text-xs">{k.label}</p>
            <p className="text-white text-xl font-extrabold mt-0.5">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Daily message volume */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-white font-bold mb-1">Daily Message Volume</h2>
          <p className="text-zinc-500 text-sm mb-6">ข้อความต่อวัน (สัปดาห์นี้)</p>
          <div className="flex items-end gap-3 h-36">
            {dailyMessages.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-zinc-600 text-xs">{Math.round(d.value / 1000)}K</span>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-blue-700 to-blue-500"
                  style={{ height: `${(d.value / maxDaily) * 100}%`, minHeight: '6px' }}
                />
                <span className="text-zinc-400 text-xs">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Business type distribution */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-white font-bold mb-1">Business Type Distribution</h2>
          <p className="text-zinc-500 text-sm mb-6">ประเภทธุรกิจของลูกค้า</p>
          <div className="space-y-3">
            {topBusinessTypes.map((b) => (
              <div key={b.type}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-300">{b.type}</span>
                  <span className="text-zinc-400">{b.count} ร้าน ({b.pct}%)</span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <BarChart2 className="w-5 h-5 text-orange-400" />
          <h2 className="text-white font-bold">Feature Adoption</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { feature: 'AI Auto-Reply', usage: '89%', users: 167 },
            { feature: 'Broadcast', usage: '62%', users: 116 },
            { feature: 'Knowledge Base', usage: '54%', users: 101 },
            { feature: 'Analytics', usage: '71%', users: 133 },
          ].map((f) => (
            <div key={f.feature} className="bg-white/[0.03] rounded-xl p-4 text-center">
              <p className="text-orange-400 text-2xl font-bold">{f.usage}</p>
              <p className="text-white text-sm font-medium mt-1">{f.feature}</p>
              <p className="text-zinc-500 text-xs mt-0.5">{f.users} ร้าน</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
