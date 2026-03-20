import { 
  TrendingUp, ShoppingBag, CreditCard, ChevronRight, 
  ArrowUpRight, DollarSign, Package, Plus, Download, FileText
} from 'lucide-react';
import { 
  AreaChart, Area, CartesianGrid, Tooltip, 
  ResponsiveContainer, XAxis, YAxis
} from 'recharts';
import PageLayout from '../components/PageLayout';
import ChartCard from '../components/ChartCard';
import { revenueData } from '../data/mockData';

export default function Sales({ setSidebarOpen }) {
  const topProducts = [
    { name: 'AI Chatbot Premium', sales: 1240, growth: '+15%', color: '#FF6B35' },
    { name: 'API Enterprise Plan', sales: 850, growth: '+12%', color: '#F7C548' },
    { name: 'Custom Integration', sales: 420, growth: '+8%', color: '#8B5CF6' },
  ];

  return (
    <PageLayout 
      title="Sales" 
      subtitle="Detailed revenue and product performance" 
      setSidebarOpen={setSidebarOpen}
      actions={
        <>
          {/* Sales Summary Pills */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Today</p>
              <p className="text-sm font-bold text-white">฿42,580</p>
            </div>
            <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">This Month</p>
              <p className="text-sm font-bold text-white">฿1.28M</p>
            </div>
            <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">This Year</p>
              <p className="text-sm font-bold text-white">฿15.4M</p>
            </div>
          </div>
          
          {/* Add Sale Button */}
          <button className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2">
             <Plus className="w-4 h-4" /> Add Sale
          </button>
          
          {/* Export Report Button */}
          <button className="btn-secondary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
             <Download className="w-4 h-4" /> Export
          </button>
          
          {/* View Invoices Button */}
          <button className="btn-secondary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
             <FileText className="w-4 h-4" /> View Invoices
          </button>
        </>
      }
    >
      {/* Sales Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Sales Trend */}
        <div className="lg:col-span-2 bg-[#12121A] rounded-3xl border border-white/[0.04] p-6 pb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-bold text-white leading-relaxed">Revenue Stream</h4>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Daily income performance across all channels</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">+18.4%</span>
            </div>
          </div>
          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="salesGradNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#FF6B35" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#52525B', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#52525B', fontSize: 11}} />
                <Tooltip contentStyle={{ backgroundColor: '#1A1A24', border: 'none', borderRadius: '14px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#FF6B35" strokeWidth={3.5} fillOpacity={1} fill="url(#salesGradNew)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-[#12121A] rounded-3xl border border-white/[0.04] p-6 pb-8 flex flex-col">
          <h4 className="text-lg font-bold text-white mb-6 leading-relaxed">Top Products</h4>
          <div className="space-y-4 flex-1">
            {topProducts.map((product, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/[0.03] transition-colors group cursor-pointer border border-transparent hover:border-white/[0.04]">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-lg"
                    style={{ background: product.color, boxShadow: `0 4px 16px ${product.color}30` }}
                  >
                    {product.name[0]}
                  </div>
                  <div>
                    <h5 className="font-semibold text-white text-sm group-hover:text-orange-400 transition-colors">{product.name}</h5>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{product.growth} Growth</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-white">{product.sales.toLocaleString()}</p>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-[2px] mt-0.5">Sold</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-3.5 rounded-xl bg-orange-500/10 text-orange-400 text-sm font-semibold border border-orange-500/20 hover:bg-orange-500/20 transition-colors">
             Full Inventory Report
          </button>
        </div>
      </div>

      {/* Transaction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {[
          { label: 'Avg. Order Value', value: '฿1,850', icon: ShoppingBag, color: 'orange' },
          { label: 'Payment Gateway', value: '99.9%', icon: CreditCard, color: 'yellow' },
          { label: 'Churn Rate', value: '1.2%', icon: TrendingUp, color: 'purple' },
        ].map((item, i) => (
          <div key={i} className="group bg-[#12121A] rounded-3xl p-8 border border-white/[0.04] hover:border-orange-500/20 transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${
                  item.color === 'orange' ? 'from-orange-500/20 to-orange-600/5' :
                  item.color === 'yellow' ? 'from-yellow-500/20 to-yellow-600/5' :
                  'from-purple-500/20 to-purple-600/5'
                } border border-white/[0.06]`}>
                  <item.icon className={`w-5 h-5 ${
                    item.color === 'orange' ? 'text-orange-400' :
                    item.color === 'yellow' ? 'text-yellow-400' :
                    'text-purple-400'
                  }`} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider leading-relaxed">{item.label}</p>
                  <h4 className="text-xl font-extrabold text-white mt-0.5 leading-normal">{item.value}</h4>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
