import { useState, useMemo } from 'react';
import { Search, Download, Users, RefreshCw, MessageCircle, Star } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import CustomerDrawer from '../components/CustomerDrawer';
import { crmCustomers, crmTagColors } from '../data/mockData';

const FILTER_CHIPS = [
  { id: 'all',        label: 'ทั้งหมด' },
  { id: 'repeat',     label: 'ซื้อซ้ำ' },
  { id: 'vip',        label: 'VIP' },
  { id: 'new_today',  label: 'ใหม่วันนี้' },
  { id: 'inactive30', label: 'ไม่มีการซื้อ 30 วัน' },
];

const NOW = new Date('2026-03-19T09:00:00');

function relativeTime(iso) {
  const diff = Math.floor((NOW - new Date(iso)) / 1000);
  if (diff < 60) return 'เมื่อกี้';
  if (diff < 3600) return `${Math.floor(diff / 60)} น.ที่แล้ว`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ชม.ที่แล้ว`;
  return `${Math.floor(diff / 86400)} วันที่แล้ว`;
}

function matchesFilter(customer, filter) {
  if (filter === 'all') return true;
  if (filter === 'repeat') return customer.orders > 1;
  if (filter === 'vip') return customer.tags.includes('VIP');
  if (filter === 'new_today') {
    const diff = (NOW - new Date(customer.lastChat)) / 1000;
    return diff < 86400 && customer.orders <= 1;
  }
  if (filter === 'inactive30') {
    const diff = (NOW - new Date(customer.lastChat)) / 86400000;
    return diff > 30;
  }
  return true;
}

export default function Customers({ setSidebarOpen }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return crmCustomers.filter(c => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.lineId.toLowerCase().includes(q);
      return matchSearch && matchesFilter(c, filter);
    });
  }, [search, filter]);

  // Summary stats
  const totalCustomers = crmCustomers.length;
  const repeatRate = Math.round((crmCustomers.filter(c => c.orders > 1).length / totalCustomers) * 100);
  const chatToday = crmCustomers.filter(c => (NOW - new Date(c.lastChat)) / 1000 < 86400).length;
  const vipCount = crmCustomers.filter(c => c.tags.includes('VIP')).length;

  return (
    <PageLayout
      title="ลูกค้า CRM"
      subtitle="ประวัติลูกค้าและความทรงจำ AI"
      setSidebarOpen={setSidebarOpen}
      actions={
        <button className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export
        </button>
      }
    >
      {/* AI Memory info card */}
      <div className="mx-6 lg:mx-8 mt-6 bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-2xl px-5 py-4 flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🧠</span>
        <div>
          <p className="text-white font-semibold text-sm">AI จำลูกค้าได้</p>
          <p className="text-zinc-400 text-xs mt-0.5">
            เมื่อลูกค้าแชทกลับมา บอทจะทักทายด้วยชื่อและรู้ประวัติการซื้อของพวกเขา — ทำให้ทุกการสนทนารู้สึกเป็นส่วนตัว
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-6 lg:px-8 mt-6">
        <StatCard icon="👥" label="ลูกค้าทั้งหมด"     value="1,247" color="blue" />
        <StatCard icon="🔄" label="กลับมาซื้อซ้ำ"    value={`${repeatRate}%`} color="green" />
        <StatCard icon="💬" label="แชทวันนี้"          value={String(chatToday)} color="orange" />
        <StatCard icon="⭐" label="ลูกค้า VIP"         value={String(vipCount)} color="yellow" />
      </div>

      {/* Search + filter */}
      <div className="px-6 lg:px-8 mt-6 space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ค้นหาชื่อ, LINE ID, เบอร์โทร"
            className="w-full pl-11 pr-4 py-3 bg-[#151520] border border-white/[0.06] rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-orange-500/40"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {FILTER_CHIPS.map(chip => (
            <button
              key={chip.id}
              onClick={() => setFilter(chip.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0
                ${filter === chip.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08]'
                }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Customer table */}
      <div className="px-6 lg:px-8 mt-4 pb-8">
        <p className="text-xs text-zinc-600 mb-3">แสดง {filtered.length} จาก {crmCustomers.length} ลูกค้า</p>

        <div className="bg-[#151520] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left px-5 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">ลูกค้า</th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">แชทล่าสุด</th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">ออเดอร์</th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">ยอดรวม</th>
                  <th className="text-left px-5 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Tags</th>
                  <th className="px-5 py-4" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(customer => (
                  <tr
                    key={customer.id}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Avatar + name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${customer.avatarColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                          {customer.avatar}
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{customer.name}</p>
                          <p className="text-zinc-600 text-xs">{customer.lineId}</p>
                        </div>
                      </div>
                    </td>

                    {/* Last chat */}
                    <td className="px-5 py-4">
                      <span className="text-zinc-400 text-sm">{relativeTime(customer.lastChat)}</span>
                    </td>

                    {/* Orders */}
                    <td className="px-5 py-4">
                      <span className="text-white font-semibold">{customer.orders}</span>
                    </td>

                    {/* Total spend */}
                    <td className="px-5 py-4">
                      <span className="text-white font-semibold">฿{customer.totalSpend.toLocaleString()}</span>
                    </td>

                    {/* Tags */}
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5 flex-wrap">
                        {customer.tags.length === 0 && (
                          <span className="text-zinc-700 text-xs">—</span>
                        )}
                        {customer.tags.map(tag => {
                          const c = crmTagColors[tag] ?? { bg: 'bg-zinc-500/20', text: 'text-zinc-400', border: 'border-zinc-500/30' };
                          return (
                            <span
                              key={tag}
                              className={`px-2 py-0.5 text-xs font-medium rounded-full border ${c.bg} ${c.text} ${c.border}`}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setSelected(customer)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors whitespace-nowrap"
                      >
                        ดูประวัติ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Users className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-500 text-sm">ไม่พบลูกค้าที่ตรงกับเงื่อนไข</p>
            </div>
          )}
        </div>
      </div>

      {/* Customer detail drawer */}
      {selected && (
        <CustomerDrawer
          customer={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </PageLayout>
  );
}

function StatCard({ icon, label, value, color }) {
  const colorMap = {
    blue:   'text-blue-400',
    green:  'text-emerald-400',
    orange: 'text-orange-400',
    yellow: 'text-yellow-400',
  };
  return (
    <div className="bg-[#151520] border border-white/[0.06] rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{icon}</span>
      </div>
      <p className={`text-2xl font-bold ${colorMap[color]}`}>{value}</p>
      <p className="text-sm text-zinc-500 mt-1">{label}</p>
    </div>
  );
}
