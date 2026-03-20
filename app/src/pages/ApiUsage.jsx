import { 
  Activity, Zap, Clock, ShieldAlert, 
  ArrowUpRight, BarChart as BarChartIcon, 
  LineChart as LineChartIcon, RefreshCw, Download, Eye
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer
} from 'recharts';
import PageLayout from '../components/PageLayout';
import ChartCard from '../components/ChartCard';
import { apiUsageData, apiEndpointUsage } from '../data/mockData';

export default function ApiUsage({ setSidebarOpen }) {
  const stats = [
    { label: 'Total Requests', value: '2.4M', icon: Zap, color: 'orange' },
    { label: 'Avg. Latency', value: '45ms', icon: Clock, color: 'yellow' },
    { label: 'Uptime', value: '100.0%', icon: Activity, color: 'green' },
    { label: 'Error Rate', value: '0.04%', icon: ShieldAlert, color: 'purple' },
  ];

  return (
    <PageLayout 
      title="API Usage" 
      subtitle="Real-time performance and endpoint metrics" 
      setSidebarOpen={setSidebarOpen}
      actions={
        <>
          {/* API Usage Summary */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">Quota</p>
              <p className="text-sm font-bold text-white">2.4M / 5M</p>
            </div>
            <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
              <p className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Uptime</p>
              <p className="text-sm font-bold text-white">100%</p>
            </div>
          </div>
          
          {/* Export Logs Button */}
          <button className="btn-secondary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
             <Download className="w-4 h-4" /> Export Logs
          </button>
          
          {/* View Details Button */}
          <button className="btn-secondary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
             <Eye className="w-4 h-4" /> View Details
          </button>
          
          {/* Refresh Metrics Button */}
          <button className="btn-secondary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
             <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </>
      }
    >
      {/* API Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="group bg-[#12121A] rounded-3xl p-8 border border-white/[0.04] hover:border-orange-500/20 transition-all relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${
              stat.color === 'orange' ? 'from-orange-500/10' :
              stat.color === 'yellow' ? 'from-yellow-500/10' :
              stat.color === 'green' ? 'from-emerald-500/10' :
              'from-purple-500/10'
            } to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
            
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${
                stat.color === 'orange' ? 'from-orange-500/20 to-orange-600/5' :
                stat.color === 'yellow' ? 'from-yellow-500/20 to-yellow-600/5' :
                stat.color === 'green' ? 'from-emerald-500/20 to-emerald-600/5' :
                'from-purple-500/20 to-purple-600/5'
              } border border-white/[0.06]`}>
                <stat.icon className={`w-5 h-5 ${
                  stat.color === 'orange' ? 'text-orange-400' :
                  stat.color === 'yellow' ? 'text-yellow-400' :
                  stat.color === 'green' ? 'text-emerald-400' :
                  'text-purple-400'
                }`} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider leading-relaxed">{stat.label}</p>
                <h3 className="text-2xl font-extrabold text-white mt-0.5 leading-normal">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* API Requests Distribution */}
        <div className="bg-[#12121A] rounded-3xl border border-white/[0.04] p-6 pb-8">
          <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-3 leading-relaxed">
             <BarChartIcon className="w-5 h-5 text-orange-400" /> Requests (Last 7 Days)
          </h4>
          <div className="h-[340px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={apiUsageData}>
                <defs>
                   <linearGradient id="apiGradNew" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#FF6B35" stopOpacity={0}/>
                   </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#52525B', fontSize: 12}} dy={12} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#52525B', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A24', border: 'none', borderRadius: '14px' }}
                  formatter={(v) => [v.toLocaleString(), 'Calls']}
                />
                <Area 
                  type="monotone" 
                  dataKey="calls" 
                  stroke="#FF6B35" 
                  strokeWidth={3.5} 
                  fillOpacity={1} 
                  fill="url(#apiGradNew)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Latency Distribution */}
        <div className="bg-[#12121A] rounded-3xl border border-white/[0.04] p-6 pb-8">
          <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-3 leading-relaxed">
             <Clock className="w-5 h-5 text-yellow-400" /> Latency Distribution
          </h4>
          <div className="h-[340px] w-full mt-2 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke="url(#latencyGrad)" strokeWidth="12" 
                  strokeLinecap="round"
                  strokeDasharray="188.5"
                  strokeDashoffset="47"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="latencyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="50%" stopColor="#F7C548" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-white">45ms</span>
                <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Avg Latency</span>
              </div>
            </div>
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs text-zinc-500">Fast (&lt;50ms)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="text-xs text-zinc-500">Normal (50-100ms)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <span className="text-xs text-zinc-500">Slow (&gt;100ms)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Endpoint Usage Table */}
      <div className="bg-[#12121A] rounded-3xl border border-white/[0.04] overflow-hidden">
         <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.04]">
            <h4 className="text-lg font-bold text-white">Endpoint Performance</h4>
            <div className="flex items-center gap-4 text-xs font-semibold text-zinc-500">
               <span className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-yellow-400" />
                 P95 Latency
               </span>
               <span className="w-px h-4 bg-white/[0.1]" />
               <span className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-orange-400" />
                 Errors &gt; 0.1%
               </span>
            </div>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="border-b border-white/[0.04]">
                     <th className="text-left py-5 px-6 text-[11px] font-bold text-zinc-500 uppercase tracking-[1.5px]">Endpoint</th>
                     <th className="text-left py-5 px-6 text-[11px] font-bold text-zinc-500 uppercase tracking-[1.5px]">Requests</th>
                     <th className="text-left py-5 px-6 text-[11px] font-bold text-zinc-500 uppercase tracking-[1.5px]">Avg Latency</th>
                     <th className="text-left py-5 px-6 text-[11px] font-bold text-zinc-500 uppercase tracking-[1.5px]">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/[0.02]">
                  {apiEndpointUsage.map((item, i) => (
                     <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="py-5 px-6">
                           <p className="text-sm font-semibold text-white tracking-tight leading-relaxed">{item.endpoint}</p>
                        </td>
                        <td className="py-5 px-6">
                           <p className="text-sm font-bold text-white leading-relaxed">{item.calls.toLocaleString()}</p>
                        </td>
                        <td className="py-5 px-6">
                           <p className="text-sm font-semibold text-zinc-400 leading-relaxed">{item.avgTime}</p>
                        </td>
                        <td className="py-5 px-6">
                           <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider leading-relaxed">Active</span>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </PageLayout>
  );
}
