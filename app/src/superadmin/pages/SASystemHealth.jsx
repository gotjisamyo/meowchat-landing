import { CheckCircle2, AlertTriangle, XCircle, RefreshCw, Activity, Zap, Clock, AlertOctagon } from 'lucide-react';
import { useState } from 'react';

const services = [
  { name: 'LINE Webhook', status: 'ok', latency: '112ms', uptime: '99.98%', lastCheck: '30 วินาทีที่แล้ว' },
  { name: 'Omise Payment', status: 'ok', latency: '89ms', uptime: '99.99%', lastCheck: '1 นาทีที่แล้ว' },
  { name: 'Database (PostgreSQL)', status: 'ok', latency: '8ms', uptime: '99.97%', lastCheck: '15 วินาทีที่แล้ว' },
  { name: 'CDN (Cloudflare)', status: 'ok', latency: '22ms', uptime: '100%', lastCheck: '2 นาทีที่แล้ว' },
  { name: 'OpenAI API', status: 'ok', latency: '380ms', uptime: '99.91%', lastCheck: '1 นาทีที่แล้ว' },
  { name: 'Redis Cache', status: 'ok', latency: '3ms', uptime: '99.99%', lastCheck: '10 วินาทีที่แล้ว' },
];

const failedWebhooks = [
  { id: 'WH-8821', shop: 'หอพักดาวรุ่ง', error: 'Connection timeout', time: '14:32:05', retries: 3 },
  { id: 'WH-8734', shop: 'เสื้อผ้าฝ้าย', error: 'LINE API rate limit', time: '11:18:44', retries: 2 },
  { id: 'WH-8601', shop: 'ซ่อมมือถือโอ', error: 'Invalid signature', time: '09:05:12', retries: 1 },
];

const responsePercentiles = [
  { label: 'avg', value: 142, max: 1000, color: 'bg-green-500' },
  { label: 'p50', value: 98, max: 1000, color: 'bg-green-500' },
  { label: 'p75', value: 215, max: 1000, color: 'bg-yellow-500' },
  { label: 'p95', value: 380, max: 1000, color: 'bg-orange-500' },
  { label: 'p99', value: 820, max: 1000, color: 'bg-red-500' },
];

export default function SASystemHealth() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">System Health</h1>
          <p className="text-zinc-500 text-sm mt-1">สถานะระบบและ infrastructure · Real-time monitoring</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Overall status banner */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-2xl px-6 py-4 flex items-center gap-4">
        <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <p className="text-green-400 font-bold">All Systems Operational</p>
          <p className="text-zinc-500 text-sm">ทุกระบบทำงานปกติ · Uptime 99.97% (30 วัน) · Error rate 0.3%</p>
        </div>
        <div className="ml-auto text-right hidden sm:block">
          <p className="text-green-400 font-bold text-2xl">99.97%</p>
          <p className="text-zinc-500 text-xs">30-day uptime</p>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <HealthKpi icon={<Activity className="w-5 h-5" />} label="Messages Today" value="48,290" color="blue" />
        <HealthKpi icon={<Zap className="w-5 h-5" />} label="Avg Response" value="142ms" color="green" />
        <HealthKpi icon={<AlertTriangle className="w-5 h-5" />} label="Error Rate" value="0.3%" color="yellow" />
        <HealthKpi icon={<AlertOctagon className="w-5 h-5" />} label="Failed Webhooks" value="3" color="red" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Services status */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4">Service Status</h2>
          <div className="space-y-3">
            {services.map((s) => (
              <div key={s.name} className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors">
                <StatusDot status={s.status} />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">{s.name}</p>
                  <p className="text-zinc-600 text-xs">{s.lastCheck}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-zinc-300 text-sm font-medium">{s.latency}</p>
                  <p className="text-green-500 text-xs">{s.uptime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Response times */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-white font-bold mb-1">Response Times</h2>
          <p className="text-zinc-500 text-sm mb-6">API latency percentiles (ms)</p>
          <div className="space-y-4">
            {responsePercentiles.map((p) => (
              <div key={p.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-400 font-mono uppercase text-xs">{p.label}</span>
                  <span className="text-white font-semibold">{p.value}ms</span>
                </div>
                <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${p.color} rounded-full transition-all`}
                    style={{ width: `${(p.value / p.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-white font-bold">0.3%</p>
              <p className="text-zinc-500 text-xs">Error Rate</p>
            </div>
            <div>
              <p className="text-white font-bold">48,290</p>
              <p className="text-zinc-500 text-xs">Req Today</p>
            </div>
            <div>
              <p className="text-white font-bold">99.97%</p>
              <p className="text-zinc-500 text-xs">Uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Failed Webhooks */}
      <div className="bg-white/[0.03] border border-red-500/20 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-red-500/20 rounded-xl flex items-center justify-center">
            <XCircle className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <h2 className="text-white font-bold">Failed Webhooks (Today)</h2>
            <p className="text-zinc-500 text-xs">3 webhooks ส่งไม่สำเร็จ · ทุกรายอยู่ใน retry queue</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-zinc-500 text-xs border-b border-white/[0.06]">
                <th className="text-left pb-3">ID</th>
                <th className="text-left pb-3">ร้าน</th>
                <th className="text-left pb-3">Error</th>
                <th className="text-center pb-3">Retries</th>
                <th className="text-right pb-3">เวลา</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {failedWebhooks.map((w) => (
                <tr key={w.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 font-mono text-zinc-400 text-xs">{w.id}</td>
                  <td className="py-3 text-zinc-200">{w.shop}</td>
                  <td className="py-3 text-red-400 text-xs">{w.error}</td>
                  <td className="py-3 text-center">
                    <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs px-2 py-0.5 rounded-full">
                      {w.retries}x
                    </span>
                  </td>
                  <td className="py-3 text-right text-zinc-500 font-mono text-xs">{w.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex gap-3">
          <button className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm font-medium transition-all">
            Retry All
          </button>
          <button className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-400 px-4 py-2 rounded-xl text-sm font-medium transition-all">
            View Logs
          </button>
        </div>
      </div>

      {/* Uptime timeline */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold">Uptime (Last 30 Days)</h2>
          <span className="text-green-400 text-sm font-semibold">99.97%</span>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 30 }).map((_, i) => {
            // Simulate a couple of brief incidents
            const isDown = i === 7 || i === 22;
            const isDegraded = i === 14;
            return (
              <div
                key={i}
                title={`Day ${i + 1}: ${isDown ? 'Incident' : isDegraded ? 'Degraded' : 'Operational'}`}
                className={`flex-1 h-8 rounded-sm cursor-pointer transition-opacity hover:opacity-80 ${
                  isDown ? 'bg-red-500' : isDegraded ? 'bg-yellow-500' : 'bg-green-500'
                }`}
              />
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-green-500 inline-block" />Operational</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-yellow-500 inline-block" />Degraded</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-500 inline-block" />Incident</span>
        </div>
      </div>
    </div>
  );
}

function StatusDot({ status }) {
  if (status === 'ok') return <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500/50 flex-shrink-0" />;
  if (status === 'degraded') return <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 flex-shrink-0" />;
  return <div className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />;
}

function HealthKpi({ icon, label, value, color }) {
  const colorMap = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    green: 'text-green-400 bg-green-500/10 border-green-500/20',
    yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    red: 'text-red-400 bg-red-500/10 border-red-500/20',
  };
  const [textC, bgC, borderC] = colorMap[color].split(' ');
  return (
    <div className={`bg-white/[0.03] border ${borderC} rounded-2xl p-5`}>
      <div className={`w-9 h-9 ${bgC} rounded-xl flex items-center justify-center ${textC} mb-3`}>{icon}</div>
      <p className="text-zinc-500 text-xs">{label}</p>
      <p className="text-white text-2xl font-extrabold mt-0.5">{value}</p>
    </div>
  );
}
