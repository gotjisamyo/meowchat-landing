import { 
  Megaphone, Target, Share2, MousePointer2, 
  ArrowUpRight, BarChart as BarChartIcon, Users, Plus, BarChart2
} from 'lucide-react';
import PageLayout from '../components/PageLayout';
import ChartCard from '../components/ChartCard';
import { marketingData } from '../data/mockData';

export default function Marketing({ setSidebarOpen }) {
  const stats = [
    { label: 'Total Reach', value: '1.2M', icon: Megaphone, color: 'orange' },
    { label: 'Active Campaigns', value: '12', icon: Target, color: 'yellow' },
    { label: 'Engagement Rate', value: '4.8%', icon: Share2, color: 'purple' },
    { label: 'Click-thrus', value: '48.2K', icon: MousePointer2, color: 'green' },
  ];

  return (
    <PageLayout 
      title="Marketing" 
      subtitle="Campaign performance and outreach metrics" 
      setSidebarOpen={setSidebarOpen}
      actions={
        <>
          {/* Marketing Stats Summary */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">Reach</p>
              <p className="text-sm font-bold text-white">1.2M</p>
            </div>
            <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Engagement</p>
              <p className="text-sm font-bold text-white">4.8%</p>
            </div>
          </div>
          
          {/* View Reports Button */}
          <button className="btn-secondary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
             <BarChart2 className="w-4 h-4" /> View Reports
          </button>
          
          {/* New Campaign Button */}
          <button className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2">
             <Plus className="w-4 h-4" /> New Campaign
          </button>
        </>
      }
    >
      {/* Marketing Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="group bg-[#12121A] rounded-3xl p-8 border border-white/[0.04] hover:border-orange-500/20 transition-all">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${
                stat.color === 'orange' ? 'from-orange-500/20 to-orange-600/5' :
                stat.color === 'yellow' ? 'from-yellow-500/20 to-yellow-600/5' :
                stat.color === 'purple' ? 'from-purple-500/20 to-purple-600/5' :
                'from-emerald-500/20 to-emerald-600/5'
              } border border-white/[0.06]`}>
                <stat.icon className={`w-5 h-5 ${
                  stat.color === 'orange' ? 'text-orange-400' :
                  stat.color === 'yellow' ? 'text-yellow-400' :
                  stat.color === 'purple' ? 'text-purple-400' :
                  'text-emerald-400'
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

      {/* Active Campaigns */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
           <h4 className="text-lg font-bold text-white flex items-center gap-3">
             <BarChartIcon className="w-5 h-5 text-orange-400" /> Active Campaigns
           </h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {marketingData.campaigns.map((campaign, i) => (
            <div key={i} className="group bg-[#12121A] rounded-3xl p-8 pb-8 border border-white/[0.04] hover:border-orange-500/20 transition-all relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-tl from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center font-bold text-white shadow-lg shadow-orange-500/20">
                    {campaign.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-white leading-relaxed">{campaign.name}</h5>
                    <span className={`text-[10px] font-bold uppercase tracking-wider leading-relaxed ${
                      campaign.status === 'active' ? 'text-emerald-400' : 'text-zinc-500'
                    }`}>{campaign.status}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-white">{campaign.leads.toLocaleString()}</p>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-[2px] mt-0.5">Leads</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-5">
                <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2.5">
                  <span>Conversion Rate</span>
                  <span className="text-white">{campaign.conversion}%</span>
                </div>
                <div className="h-2.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full shadow-[0_0_12px_rgba(255,107,53,0.4)]" 
                    style={{ width: `${(campaign.conversion / 10) * 100}%` }}
                  />
                </div>
              </div>

              {/* Team & Action */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                <div className="flex -space-x-2">
                  {[1,2,3].map(j => (
                    <div key={j} className="w-7 h-7 rounded-full border-2 border-[#12121A] bg-zinc-700 flex items-center justify-center text-[9px] font-bold text-white uppercase">
                      {String.fromCharCode(64 + i + j)}
                    </div>
                  ))}
                  <div className="w-7 h-7 rounded-full border-2 border-[#12121A] bg-orange-500/20 flex items-center justify-center text-[9px] font-bold text-orange-400">
                    +5
                  </div>
                </div>
                <button className="text-xs font-semibold px-4 py-2 rounded-lg border border-white/[0.06] hover:bg-white/[0.04] text-zinc-400 hover:text-white transition-all">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Channel Distribution */}
      <div className="bg-[#12121A] rounded-3xl border border-white/[0.04] p-6 pb-8">
        <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-3 leading-relaxed">
          <Users className="w-5 h-5 text-orange-400" /> Channel Distribution
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {marketingData.channels.map((channel, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-orange-500/20 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white leading-relaxed">{channel.name}</span>
                <span className="text-lg font-bold text-white leading-relaxed">{channel.percentage}%</span>
              </div>
              <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full" 
                  style={{ width: `${channel.percentage}%` }}
                />
              </div>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">{channel.users.toLocaleString()} users</p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
