import { useState, useMemo } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  Users, Code2, CreditCard, TrendingUp, UserPlus, UserMinus,
  ChevronRight, RefreshCw, Calendar, Crown, Zap,
  AlertTriangle, ArrowUpRight, ShoppingCart, Send, ToggleLeft, ToggleRight, ClipboardList
} from 'lucide-react';
import PageLayout from '../components/PageLayout';
import StatsCard from '../components/StatsCard';
import ChartCard from '../components/ChartCard';
import DataTable from '../components/DataTable';
import { useAuth } from '../context/AuthContext';
import {
  revenueData,
  apiUsageData,
  salesByCategory,
  userGrowthData,
  recentTransactions,
  subscriptionStats,
  customersData,
  ordersData,
  storeProducts,
} from '../data/mockData';

// ── AI Insights helpers ───────────────────────────────────────────────────────

const insightTypeStyles = {
  up:      { border: 'border-emerald-500/40', dot: 'bg-emerald-500', btn: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/25' },
  warning: { border: 'border-yellow-500/40',  dot: 'bg-yellow-500',  btn: 'bg-yellow-500/15  text-yellow-400  border-yellow-500/25  hover:bg-yellow-500/25'  },
  info:    { border: 'border-blue-500/40',    dot: 'bg-blue-500',    btn: 'bg-blue-500/15    text-blue-400    border-blue-500/25    hover:bg-blue-500/25'    },
};

function InsightItem({ type, text, action }) {
  const s = insightTypeStyles[type] ?? insightTypeStyles.info;
  return (
    <div className={`flex items-start gap-3 border-l-2 pl-3 py-0.5 ${s.border}`}>
      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${s.dot}`} />
      <p className="text-sm text-zinc-300 flex-1 leading-snug">{text}</p>
      <button className={`flex-shrink-0 text-[11px] font-semibold border rounded-lg px-2.5 py-1 transition-colors whitespace-nowrap ${s.btn}`}>
        {action}
      </button>
    </div>
  );
}

function AiInsightsPanel() {
  return (
    <div className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-2xl p-5 mb-6">
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🤖</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white mb-1">AI วิเคราะห์ธุรกิจของคุณ</h3>
          <p className="text-zinc-300 text-sm mb-3">อัพเดทล่าสุด: วันนี้ 09:00 น.</p>
          <div className="space-y-2">
            <InsightItem
              type="up"
              text="ลูกค้าถาม 'ราคา' เพิ่มขึ้น 38% อาทิตย์นี้ — แนะนำส่ง Broadcast โปรโมชั่น"
              action="ส่ง Broadcast"
            />
            <InsightItem
              type="warning"
              text="บอทตอบไม่ได้ 12 ครั้งใน 3 วัน คำถามที่พบบ่อย: 'ส่ง EMS ได้ไหม'"
              action="เพิ่มใน FAQ"
            />
            <InsightItem
              type="info"
              text="ลูกค้า VIP 3 คนไม่ได้แชท 15+ วัน — ลองส่งข้อความหาพวกเขา"
              action="ส่งข้อความ"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Stock Alert Widget ────────────────────────────────────────────────────────

function StockAlertPanel() {
  const lowStockItems = storeProducts.filter((p) => p.stock <= 5 && p.active);
  if (lowStockItems.length === 0) return null;

  return (
    <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-5 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0" />
        <h3 className="font-bold text-white text-sm">
          แจ้งเตือนสต็อก{' '}
          <span className="ml-1 px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full">
            {lowStockItems.length} รายการ
          </span>
        </h3>
      </div>
      <div className="space-y-2">
        {lowStockItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5"
          >
            <div className="flex items-center gap-2 min-w-0">
              <ShoppingCart className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span className="text-sm text-white font-medium truncate">{item.name}</span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-xs text-orange-300 font-semibold">
                เหลือ {item.stock} ชิ้น
              </span>
              <button className="px-3 py-1 bg-orange-500 hover:bg-orange-600 rounded-lg text-xs text-white font-semibold transition-colors">
                สั่งเพิ่ม
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Daily Menu Widget ─────────────────────────────────────────────────────────

function DailyMenuPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Pick 3 active products as today's featured items
  const featuredItems = storeProducts.filter((p) => p.active && p.stock > 0).slice(0, 3);

  const handleBroadcast = () => {
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-orange-400 flex-shrink-0" />
          <h3 className="font-bold text-white text-sm">เมนู/โปรวันนี้</h3>
        </div>
        {/* Toggle รับออเดอร์ */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            isOpen
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25'
              : 'bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:border-white/20'
          }`}
        >
          {isOpen ? (
            <ToggleRight className="w-4 h-4" />
          ) : (
            <ToggleLeft className="w-4 h-4" />
          )}
          เปิดรับออเดอร์วันนี้
        </button>
      </div>

      {/* Featured products */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {featuredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2.5 flex flex-col gap-1"
          >
            <span className="text-xs text-zinc-400 font-medium">{item.category}</span>
            <span className="text-sm text-white font-semibold">{item.name}</span>
            <span className="text-orange-400 font-bold text-sm">฿{item.price.toLocaleString()}/{item.unit}</span>
          </div>
        ))}
      </div>

      {/* Order count + Broadcast */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-zinc-400">
          สั่งออเดอร์มาแล้ว{' '}
          <span className="text-white font-bold">14 รายการ</span>วันนี้
        </span>
        <button
          onClick={handleBroadcast}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            broadcastSent
              ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
              : 'bg-orange-500 hover:bg-orange-600 text-white'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          {broadcastSent ? 'ส่ง Broadcast ให้ 340 คน แล้ว ✅' : 'ส่ง Broadcast เมนูวันนี้'}
        </button>
      </div>
    </div>
  );
}

export default function Dashboard({ setSidebarOpen }) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const greeting = user?.name ? `สวัสดี ${user.name}! 👋` : 'สวัสดี! 👋';
  const tableColumns = ['ลูกค้า', 'วันที่', 'จำนวน', 'สถานะ'];

  // KPI data for admin vs regular user
  const kpiData = useMemo(() => {
    if (isAdmin) {
      return [
        { title: 'ลูกค้าทั้งหมด', value: subscriptionStats.total.toLocaleString(), change: `+${subscriptionStats.newThisMonth}`, isPositive: true, icon: 'users', color: 'blue' },
        { title: 'ลูกค้าใช้งานอยู่', value: subscriptionStats.active.toLocaleString(), change: '+8.2%', isPositive: true, icon: 'users', color: 'green' },
        { title: 'รายได้ต่อเดือน', value: `฿${(subscriptionStats.revenue.monthly / 1000000).toFixed(1)}M`, change: '+12.5%', isPositive: true, icon: 'wallet', color: 'orange' },
        { title: 'อัตรา Churn', value: `${subscriptionStats.churnRate}%`, change: '-0.3%', isPositive: true, icon: 'trending-up', color: 'red' },
      ];
    }
    return [
      { title: 'ลูกค้าทั้งหมด', value: '8,432', change: '+12.5%', isPositive: true, icon: 'users', color: 'blue' },
      { title: 'API Calls วันนี้', value: '24,891', change: '+8.2%', isPositive: true, icon: 'api', color: 'purple' },
      { title: 'Credits คงเหลือ', value: '฿15,420', change: '+5.7%', isPositive: true, icon: 'credit-card', color: 'yellow' },
      { title: 'อัตราการแปลง', value: '3.2%', change: '-2.3%', isPositive: false, icon: 'trending-up', color: 'green' },
    ];
  }, [isAdmin]);

  // Plan distribution data for admin
  const planDistribution = useMemo(() => {
    if (!isAdmin) return null;
    return [
      { name: 'Free', value: subscriptionStats.byPlan.free, color: '#6B7280' },
      { name: 'Pro', value: subscriptionStats.byPlan.pro, color: '#FF6B35' },
      { name: 'Enterprise', value: subscriptionStats.byPlan.enterprise, color: '#8B5CF6' },
    ];
  }, [isAdmin]);

  // Top customers for admin
  const topCustomers = useMemo(() => {
    if (!isAdmin) return null;
    return [...customersData]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [isAdmin]);

  return (
    <PageLayout
      title={greeting}
      subtitle="ภาพรวมธุรกิจแบบเรียลไทม์"
      setSidebarOpen={setSidebarOpen}
      actions={
        <>
          {/* Date Range Picker */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl">
            <Calendar className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-400">Today</span>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
          </div>

          {/* Refresh Button */}
          <button className="btn-secondary px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            <span className="hidden lg:inline">Refresh</span>
          </button>
        </>
      }
    >
      {/* ── Onboarding Banner ─────────────────────────────────────────────── */}
      {!localStorage.getItem('onboardingComplete') && (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div>
            <p className="font-semibold text-white">⚡ ตั้งค่าให้ครบ รับลูกค้าได้เลย!</p>
            <p className="text-sm text-zinc-400">เชื่อม LINE OA และเพิ่มสินค้าเพื่อเริ่มรับแชท</p>
          </div>
          <a
            href="/onboarding"
            className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-400 transition"
          >
            ตั้งค่าเลย →
          </a>
        </div>
      )}

      {/* Usage Limit Warning — show to non-admin users only when usage >= 70% */}
      {(() => {
        const userMessageUsage = { used: 8430, limit: 10000 }; // will come from real API
        const usagePct = Math.round((userMessageUsage.used / userMessageUsage.limit) * 100);
        if (isAdmin || usagePct < 70) return null;
        return (
          <div className="mb-2 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex flex-wrap items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-sm font-semibold text-amber-300">ข้อความเดือนนี้: {userMessageUsage.used.toLocaleString()} / {userMessageUsage.limit.toLocaleString()}</span>
                <span className="text-xs text-amber-400 font-medium">{usagePct}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: `${usagePct}%` }} />
              </div>
              <p className="text-xs text-amber-400/80">
                เหลืออีก {(userMessageUsage.limit - userMessageUsage.used).toLocaleString()} ข้อความ — อัพเกรดเพื่อใช้งานต่อเนื่องโดยไม่สะดุด
              </p>
            </div>
            <a
              href="#"
              onClick={e => { e.preventDefault(); }}
              className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-1 px-3 py-1.5 bg-orange-500 hover:bg-orange-400 text-white text-xs font-bold rounded-lg transition-colors"
            >
              อัพเกรด <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        );
      })()}

      {/* ── AI Insights Panel ─────────────────────────────────────────────── */}
      <AiInsightsPanel />

      {/* ── Stock Alert Widget ────────────────────────────────────────────── */}
      <StockAlertPanel />

      {/* ── Daily Menu / Today's Offer ────────────────────────────────────── */}
      {!isAdmin && <DailyMenuPanel />}

      {/* KPI Cards — Merchant View */}
      {!isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard 
            title="ยอดขายวันนี้"
            value="฿14,250"
            change="+12.5%"
            isPositive={true}
            icon={<CreditCard className="w-5 h-5 text-emerald-400" />}
          />
          <StatsCard 
            title="ออเดอร์ใหม่"
            value="38 รายการ"
            change="+8.2%"
            isPositive={true}
            icon={<ShoppingCart className="w-5 h-5 text-blue-400" />}
          />
          <StatsCard 
            title="AI ช่วยตอบ"
            value="852 ครั้ง"
            change="+15.7%"
            isPositive={true}
            icon={<Zap className="w-5 h-5 text-purple-400" />}
          />
          <StatsCard 
            title="อัตราตอบกลับ"
            value="98.5%"
            change="+0.4%"
            isPositive={true}
            icon={<TrendingUp className="w-5 h-5 text-pink-400" />}
          />
        </div>
      )}

      {/* KPI Cards */}
      {isAdmin && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpiData.map((kpi, idx) => (
            <div key={idx} className="hover:scale-[1.02] transition-transform">
              <StatsCard
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                isPositive={kpi.isPositive}
                icon={kpi.icon}
                color={kpi.color}
                delay={idx * 100}
              />
            </div>
          ))}
        </div>
      )}

      {/* Referral nudge card — non-admin users only */}
      {!isAdmin && (
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-white">🎁 แนะนำเพื่อน รับเดือนฟรี!</p>
            <p className="text-xs text-zinc-400">คุณมีเพื่อน 12 คนที่สมัครแล้ว ได้ฟรี 3 เดือน</p>
          </div>
          <button onClick={() => {}} className="px-3 py-1.5 bg-purple-500 text-white text-xs font-bold rounded-lg">ดูรางวัล</button>
        </div>
      )}

      {/* Admin-specific: Subscription Overview */}
      {isAdmin && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          {/* Subscription Stats */}
          <div className="lg:col-span-2 bg-gradient-to-br from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">สถิติ Subscription</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-black/20 rounded-2xl">
                <UserPlus className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{subscriptionStats.newThisMonth}</p>
                <p className="text-xs text-zinc-400">New This Month</p>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-2xl">
                <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{subscriptionStats.active.toLocaleString()}</p>
                <p className="text-xs text-zinc-400">Active</p>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-2xl">
                <UserMinus className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{subscriptionStats.churned.toLocaleString()}</p>
                <p className="text-xs text-zinc-400">Churned</p>
              </div>
              <div className="text-center p-4 bg-black/20 rounded-2xl">
                <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{subscriptionStats.growthRate}%</p>
                <p className="text-xs text-zinc-400">Growth Rate</p>
              </div>
            </div>
          </div>

          {/* Plan Distribution */}
          <ChartCard title="แผมตามจำนวน" subtitle="Plan distribution" delay={300} className="lg:col-span-1">
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={60}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {planDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} cornerRadius={4} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1A1A24', border: 'none', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-3 mt-2">
              {planDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-zinc-500">{item.name}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Revenue Stats */}
          <div className="bg-[#151520] border border-white/[0.06] rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">รายได้</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">ต่อเดือน</span>
                <span className="text-xl font-bold text-white">฿{(subscriptionStats.revenue.monthly / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">ต่อปี</span>
                <span className="text-xl font-bold text-white">฿{(subscriptionStats.revenue.yearly / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">ต่อ User</span>
                <span className="text-xl font-bold text-orange-400">฿{subscriptionStats.revenue.avgPerUser}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Section — Charts only for merchants OR platform summary for admins */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ChartCard title={isAdmin ? "รายได้ & ต้นทุน (รวม)" : "สถิตยอดขาย & ต้นทุน"} subtitle={isAdmin ? "ภาพรวมทั้งแพลตฟอร์ม" : "เปรียบเทียบ 12 เดือนที่ผ่านมา"}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#FF6B35" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `฿${v/1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="revenue" name={isAdmin ? "รายได้รวม" : "ยอดขาย"} stroke="#FF6B35" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              <Area type="monotone" dataKey="cost" name={isAdmin ? "ต้นทุนระบบ" : "ต้นทุนสินค้า"} stroke="#8b5cf6" strokeWidth={2} fillOpacity={0} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Show category by product for merchant, or by service for admin */}
        <ChartCard title={isAdmin ? "รายได้ตามบริการ" : "ออเดอร์ตามหมวดหมู่"} subtitle={isAdmin ? "สัดส่วนรายได้ API/Bots" : "สัดส่วนสินค้าขายดี"}>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={salesByCategory}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {salesByCategory.map((entry, index) => (
                  <Cell key={index} fill={entry.color} cornerRadius={8} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1A1A24', border: 'none', borderRadius: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {salesByCategory.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-zinc-500">{item.name}</span>
                <span className="text-xs font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Charts Row 2 — Admin only */}
      {isAdmin && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* API Usage */}
          <ChartCard title="การใช้งาน API รายสัปดาห์ (Admin)" delay={600}>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={apiUsageData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="day" stroke="#52525B" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525B" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1A1A24', border: 'none', borderRadius: '12px' }}
                  formatter={(v) => [v.toLocaleString(), 'Calls']}
                />
                <Bar dataKey="calls" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* User Growth */}
          <ChartCard title="การเติบโตของผู้ใช้ (Admin)" subtitle="Monthly active users" delay={700}>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={userGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F7C548" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F7C548" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" stroke="#52525B" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525B" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1A1A24', border: 'none', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="users" stroke="#F7C548" strokeWidth={3} fillOpacity={1} fill="url(#usersGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}

      {/* Admin: Top Customers Table */}
      {isAdmin && topCustomers && (
        <div className="bg-[#151520] border border-white/[0.06] rounded-3xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">ลูกค้ายอดนิยม</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left pb-4 text-sm font-semibold text-zinc-400">ลูกค้า</th>
                  <th className="text-left pb-4 text-sm font-semibold text-zinc-400">แผม</th>
                  <th className="text-left pb-4 text-sm font-semibold text-zinc-400">รายได้รวม</th>
                  <th className="text-left pb-4 text-sm font-semibold text-zinc-400">API Calls</th>
                  <th className="text-left pb-4 text-sm font-semibold text-zinc-400">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-white/[0.04]">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-medium">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-white">{customer.name}</p>
                          <p className="text-sm text-zinc-500">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`
                        px-3 py-1 text-xs font-medium rounded-full capitalize
                        ${customer.plan === 'enterprise' ? 'bg-purple-500/20 text-purple-400' :
                          customer.plan === 'pro' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-zinc-500/20 text-zinc-400'}
                      `}>
                        {customer.plan}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="font-medium text-white">฿{customer.revenue.toLocaleString()}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-zinc-500" />
                        <span className="text-white">{customer.apiCalls.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        customer.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Transactions Table */}
      <DataTable
        title="รายการล่าสุด"
        columns={tableColumns}
        data={recentTransactions}
        delay={800}
      />
    </PageLayout>
  );
}
