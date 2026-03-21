import { 
  Building2, ArrowUpRight, ArrowDownRight, 
  DollarSign, PieChart as PieChartIcon, 
  BarChart3, RefreshCw, TrendingUp, TrendingDown, Calendar, ChevronDown, Download
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import PageLayout from '../components/PageLayout';
import ChartCard from '../components/ChartCard';
import { revenueData, financeData } from '../data/mockData';

const COLORS = ['#FF6B35', '#F7C548', '#8B5CF6', '#10B981', '#3B82F6'];

export default function Finance({ setSidebarOpen }) {
  const summaries = [
    { label: 'Total Revenue', value: `฿${(financeData.totalRevenue / 1000000).toFixed(1)}M`, trend: '+18.4%', isUp: true, icon: TrendingUp },
    { label: 'Total Expenses', value: `฿${(financeData.totalCost / 1000000).toFixed(1)}M`, trend: '-2.1%', isUp: false, icon: TrendingDown },
    { label: 'Net Profit', value: `฿${(financeData.netProfit / 1000000).toFixed(1)}M`, trend: `+${financeData.profitMargin}%`, isUp: true, icon: TrendingUp },
    { label: 'Cash on Hand', value: '฿850K', trend: '+5.4%', isUp: true, icon: TrendingUp },
  ];

  return (
    <PageLayout 
      title="Finance" 
      subtitle="Comprehensive financial health and breakdown" 
      setSidebarOpen={setSidebarOpen}
      actions={
        <>
          {/* Date Filter */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl">
            <Calendar className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-400">Last 30 Days</span>
            <ChevronDown className="w-4 h-4 text-zinc-600" />
          </div>
          
          {/* Export Button */}
          <button className="btn-secondary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
             <Download className="w-4 h-4" /> Export
          </button>
          
          {/* Re-sync Ledger Button */}
          <button className="btn-secondary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
             <RefreshCw className="w-4 h-4" /> Re-sync Ledger
          </button>
        </>
      }
    >
      {/* Financial Summaries */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {summaries.map((item, i) => (
          <div key={i} className="group bg-[#12121A] rounded-3xl p-8 pb-8 border border-white/[0.04] hover:border-orange-500/20 transition-all relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl ${
              item.isUp ? 'from-orange-500/10' : 'from-purple-500/10'
            } to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
            
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[3px] mb-2 leading-relaxed">{item.label}</p>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight mb-4 leading-normal">{item.value}</h3>
            
            <div className={`flex items-center gap-2 text-xs font-semibold leading-relaxed ${
              item.isUp ? 'text-emerald-400' : 'text-purple-400'
            }`}>
              <item.icon className="w-4 h-4" />
              {item.trend} vs last month
            </div>
          </div>
        ))}
      </div>

      {/* Finance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue vs Cost Bar Chart */}
        <div className="lg:col-span-2 bg-[#12121A] rounded-3xl border border-white/[0.04] p-6 pb-8">
          <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-3 leading-relaxed">
             <BarChart3 className="w-5 h-5 text-orange-400" /> Revenue vs Cost
          </h4>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#52525B', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#52525B', fontSize: 11}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A24', border: 'none', borderRadius: '14px' }} 
                  formatter={(v) => `฿${v.toLocaleString()}`}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '24px', fontSize: '12px' }} />
                <Bar dataKey="revenue" fill="#FF6B35" radius={[6, 6, 0, 0]} name="Revenue" />
                <Bar dataKey="cost" fill="#8B5CF6" radius={[6, 6, 0, 0]} name="Cost" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Breakdown Pie Chart */}
        <div className="bg-[#12121A] rounded-3xl border border-white/[0.04] p-6 pb-8">
          <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-3 leading-relaxed">
             <PieChartIcon className="w-5 h-5 text-yellow-400" /> Expenses
          </h4>
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={financeData.monthlyExpenses}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="amount"
                >
                  {financeData.monthlyExpenses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={10} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A24', border: 'none', borderRadius: '14px' }}
                  formatter={(v) => `฿${v.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total</p>
                <p className="text-3xl font-extrabold text-white mt-1">฿{(financeData.totalCost / 1000000).toFixed(1)}M</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
             {financeData.monthlyExpenses.slice(0, 4).map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                   <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                      <span className="text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors leading-relaxed">{item.category}</span>
                   </div>
                   <span className="text-sm font-bold text-white leading-relaxed">฿{item.amount.toLocaleString()}</span>
                </div>
             ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
