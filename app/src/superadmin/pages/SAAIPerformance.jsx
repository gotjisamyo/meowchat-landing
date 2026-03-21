import { Bot, Zap, ThumbsUp, AlertCircle, TrendingUp } from 'lucide-react';

const modelStats = [
  { model: 'GPT-4o (Primary)', requests: 38200, avgLatency: '890ms', successRate: '99.1%', cost: '฿12,840' },
  { model: 'GPT-4o-mini (Fallback)', requests: 9800, avgLatency: '320ms', successRate: '99.7%', cost: '฿890' },
  { model: 'Claude Haiku', requests: 2100, avgLatency: '280ms', successRate: '99.8%', cost: '฿420' },
];

const intentBreakdown = [
  { intent: 'สอบถามสินค้า/บริการ', pct: 34, color: 'bg-orange-500' },
  { intent: 'สอบถามราคา', pct: 22, color: 'bg-blue-500' },
  { intent: 'สั่งซื้อ/จอง', pct: 18, color: 'bg-green-500' },
  { intent: 'ติดตามออเดอร์', pct: 12, color: 'bg-purple-500' },
  { intent: 'แจ้งปัญหา', pct: 8, color: 'bg-red-500' },
  { intent: 'อื่นๆ', pct: 6, color: 'bg-zinc-500' },
];

export default function SAAIPerformance() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white">AI Performance</h1>
        <p className="text-zinc-500 text-sm mt-1">ประสิทธิภาพ AI models และ cost tracking</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <Bot className="w-5 h-5" />, label: 'Total AI Requests (30d)', value: '50,100', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
          { icon: <ThumbsUp className="w-5 h-5" />, label: 'Satisfaction Rate', value: '91.4%', color: 'text-green-400 bg-green-500/10 border-green-500/20' },
          { icon: <Zap className="w-5 h-5" />, label: 'Avg Response Time', value: '780ms', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
          { icon: <AlertCircle className="w-5 h-5" />, label: 'Escalated to Human', value: '5.6%', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
        ].map((k) => (
          <div key={k.label} className={`bg-white/[0.03] border rounded-2xl p-5 ${k.color.split(' ').slice(1).join(' ')}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${k.color}`}>{k.icon}</div>
            <p className="text-zinc-500 text-xs">{k.label}</p>
            <p className="text-white text-xl font-extrabold mt-0.5">{k.value}</p>
          </div>
        ))}
      </div>

      {/* AI Cost this month */}
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <h2 className="text-white font-bold">AI Cost This Month</h2>
        </div>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-purple-400 text-2xl font-bold">฿14,150</p>
            <p className="text-zinc-500 text-sm">Total AI Cost</p>
          </div>
          <div>
            <p className="text-white text-2xl font-bold">฿75.67</p>
            <p className="text-zinc-500 text-sm">Cost / Customer</p>
          </div>
          <div>
            <p className="text-green-400 text-2xl font-bold">฿0.28</p>
            <p className="text-zinc-500 text-sm">Cost / Message</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Model breakdown table */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4">Model Usage Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500 text-xs border-b border-white/[0.06]">
                  <th className="text-left pb-3">Model</th>
                  <th className="text-right pb-3">Requests</th>
                  <th className="text-right pb-3">Latency</th>
                  <th className="text-right pb-3">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {modelStats.map((m) => (
                  <tr key={m.model} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 text-zinc-200">{m.model}</td>
                    <td className="py-3 text-right text-zinc-400">{m.requests.toLocaleString()}</td>
                    <td className="py-3 text-right text-zinc-400">{m.avgLatency}</td>
                    <td className="py-3 text-right text-orange-400 font-medium">{m.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Intent breakdown */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-white font-bold mb-1">User Intent Breakdown</h2>
          <p className="text-zinc-500 text-sm mb-5">ประเภทคำถามที่ผู้ใช้ถามมากที่สุด</p>
          <div className="space-y-3">
            {intentBreakdown.map((b) => (
              <div key={b.intent}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-zinc-300">{b.intent}</span>
                  <span className="text-zinc-400">{b.pct}%</span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.pct * 2.94}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
