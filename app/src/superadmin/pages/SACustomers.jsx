import { useState } from 'react';
import { Search, ChevronDown, Eye, ArrowUpCircle, MessageSquare, Ban, CheckCircle, KeyRound, X, Download } from 'lucide-react';

const CUSTOMERS = [
  { id: 1, shop: 'ร้านแนน Fashion', owner: 'คุณแนน สมิตา', email: 'nan@gmail.com', plan: 'enterprise', type: 'แฟชั่น', messages: 45230, limit: 999999, revenue: 3900, joined: '2025-08-15', status: 'active' },
  { id: 2, shop: 'ครัวป้าบอล', owner: 'พี่บอล วิชัย', email: 'ball@gmail.com', plan: 'pro', type: 'ร้านอาหาร', messages: 9847, limit: 10000, revenue: 590, joined: '2025-09-01', status: 'active' },
  { id: 3, shop: 'สปาออย', owner: 'น้องออย', email: 'oy@gmail.com', plan: 'pro', type: 'สปา/ความงาม', messages: 7234, limit: 10000, revenue: 590, joined: '2025-10-12', status: 'active' },
  { id: 4, shop: 'เสื้อผ้าฝ้าย', owner: 'น้องฝ้าย', email: 'fai@gmail.com', plan: 'free', type: 'แฟชั่น', messages: 87, limit: 100, revenue: 0, joined: '2025-11-20', status: 'active' },
  { id: 5, shop: 'ช่างแอร์บัว', owner: 'พี่บัว', email: 'bua@gmail.com', plan: 'pro', type: 'บริการ', messages: 5621, limit: 10000, revenue: 590, joined: '2025-12-01', status: 'active' },
  { id: 6, shop: 'คอร์ส Excel Pro', owner: 'อาจารย์นิด', email: 'nid@gmail.com', plan: 'enterprise', type: 'การศึกษา', messages: 38492, limit: 999999, revenue: 3900, joined: '2026-01-05', status: 'active' },
  { id: 7, shop: 'ทัวร์เชียงใหม่', owner: 'คุณกอล์ฟ', email: 'golf@gmail.com', plan: 'pro', type: 'ท่องเที่ยว', messages: 4103, limit: 10000, revenue: 590, joined: '2026-01-18', status: 'active' },
  { id: 8, shop: 'หอพักดาวรุ่ง', owner: 'คุณดาว', email: 'dao@gmail.com', plan: 'free', type: 'อสังหา', messages: 43, limit: 100, revenue: 0, joined: '2026-02-10', status: 'active' },
  { id: 9, shop: 'ขนมไทยป้ามา', owner: 'ป้ามา', email: 'ma@gmail.com', plan: 'pro', type: 'ร้านอาหาร', messages: 8901, limit: 10000, revenue: 590, joined: '2026-02-28', status: 'active' },
  { id: 10, shop: 'ซ่อมมือถือโอ', owner: 'น้องโอ', email: 'o@gmail.com', plan: 'free', type: 'บริการ', messages: 12, limit: 100, revenue: 0, joined: '2026-03-10', status: 'churned' },
];

const planBadge = {
  enterprise: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  pro: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  free: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
};

const planLabel = { enterprise: 'Enterprise', pro: 'Pro', free: 'Free' };

export default function SACustomers() {
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [customers, setCustomers] = useState(CUSTOMERS);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const exportCSV = () => {
    const headers = ['ID', 'Shop', 'Owner', 'Email', 'Plan', 'Type', 'Messages', 'MRR (฿)', 'Joined', 'Status'];
    const rows = customers.map((c) => [
      c.id,
      c.shop,
      c.owner,
      c.email,
      planLabel[c.plan],
      c.type,
      c.messages,
      c.revenue,
      c.joined,
      c.status,
    ]);
    const csvString = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `meowchat-customers-${date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('ส่งออก CSV เรียบร้อย');
  };

  const allTypes = [...new Set(CUSTOMERS.map((c) => c.type))];

  const filtered = customers.filter((c) => {
    const matchSearch =
      search === '' ||
      c.shop.includes(search) ||
      c.owner.includes(search) ||
      c.email.includes(search);
    const matchPlan = planFilter === 'all' || c.plan === planFilter;
    const matchType = typeFilter === 'all' || c.type === typeFilter;
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchPlan && matchType && matchStatus;
  });

  const toggleStatus = (id) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'active' ? 'suspended' : 'active' } : c
      )
    );
    showToast('อัปเดตสถานะบัญชีแล้ว');
  };

  const statusBadge = (status) => {
    if (status === 'active') return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (status === 'churned') return 'bg-red-500/20 text-red-400 border-red-500/30';
    return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  };

  const statusLabel = (status) => ({ active: 'Active', churned: 'Churned', suspended: 'Suspended' }[status] || status);

  const usagePct = (c) => (c.limit >= 999999 ? 100 : Math.round((c.messages / c.limit) * 100));

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-green-500/90 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium">
          {toast}
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">ลูกค้าทั้งหมด</h1>
          <p className="text-zinc-500 text-sm mt-1">จัดการ Shop Owners ทุกราย · {customers.length} accounts</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex-shrink-0"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: customers.length, color: 'text-white' },
          { label: 'Enterprise', value: customers.filter((c) => c.plan === 'enterprise').length, color: 'text-purple-400' },
          { label: 'Pro', value: customers.filter((c) => c.plan === 'pro').length, color: 'text-orange-400' },
          { label: 'Free', value: customers.filter((c) => c.plan === 'free').length, color: 'text-zinc-400' },
        ].map((s) => (
          <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-zinc-500 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาร้าน, เจ้าของ, อีเมล..."
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40"
          />
        </div>

        <SelectFilter value={planFilter} onChange={setPlanFilter} options={[
          { value: 'all', label: 'All Plans' },
          { value: 'enterprise', label: 'Enterprise' },
          { value: 'pro', label: 'Pro' },
          { value: 'free', label: 'Free' },
        ]} />

        <SelectFilter value={typeFilter} onChange={setTypeFilter} options={[
          { value: 'all', label: 'All Types' },
          ...allTypes.map((t) => ({ value: t, label: t })),
        ]} />

        <SelectFilter value={statusFilter} onChange={setStatusFilter} options={[
          { value: 'all', label: 'All Status' },
          { value: 'active', label: 'Active' },
          { value: 'churned', label: 'Churned' },
          { value: 'suspended', label: 'Suspended' },
        ]} />
      </div>

      {/* Table */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="text-zinc-500 text-xs border-b border-white/[0.06] bg-white/[0.02]">
                <th className="text-left px-4 py-3">ID</th>
                <th className="text-left px-4 py-3">ชื่อร้าน</th>
                <th className="text-left px-4 py-3">เจ้าของ</th>
                <th className="text-left px-4 py-3">แผน</th>
                <th className="text-left px-4 py-3">Messages</th>
                <th className="text-right px-4 py-3">ยอด/เดือน</th>
                <th className="text-left px-4 py-3">วันสมัคร</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-center px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-4 py-3 text-zinc-600">#{c.id}</td>
                  <td className="px-4 py-3 text-white font-medium">{c.shop}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-zinc-200 text-sm">{c.owner}</p>
                      <p className="text-zinc-600 text-xs">{c.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${planBadge[c.plan]}`}>
                      {planLabel[c.plan]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <p className="text-zinc-300 text-xs">
                        {c.messages.toLocaleString()} / {c.limit >= 999999 ? '∞' : c.limit.toLocaleString()}
                      </p>
                      <div className="h-1.5 w-24 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${usagePct(c) > 90 ? 'bg-red-500' : 'bg-orange-500'}`}
                          style={{ width: `${Math.min(usagePct(c), 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-green-400 font-semibold">
                    {c.revenue > 0 ? `฿${c.revenue.toLocaleString()}` : <span className="text-zinc-600">—</span>}
                  </td>
                  <td className="px-4 py-3 text-zinc-400 text-xs">{c.joined}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${statusBadge(c.status)}`}>
                      {statusLabel(c.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <ActionBtn icon={<Eye className="w-3.5 h-3.5" />} title="View Details" onClick={() => setSelected(c)} color="text-blue-400 hover:bg-blue-500/10" />
                      <ActionBtn icon={<ArrowUpCircle className="w-3.5 h-3.5" />} title="Upgrade/Downgrade" onClick={() => showToast(`เปลี่ยน plan ของ ${c.shop}`)} color="text-orange-400 hover:bg-orange-500/10" />
                      <ActionBtn icon={<MessageSquare className="w-3.5 h-3.5" />} title="Send Message" onClick={() => showToast(`ส่งข้อความถึง ${c.owner}`)} color="text-green-400 hover:bg-green-500/10" />
                      <ActionBtn icon={c.status === 'suspended' ? <CheckCircle className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />} title={c.status === 'suspended' ? 'Activate' : 'Suspend'} onClick={() => toggleStatus(c.id)} color="text-red-400 hover:bg-red-500/10" />
                      <ActionBtn icon={<KeyRound className="w-3.5 h-3.5" />} title="Reset Password" onClick={() => showToast(`ส่ง reset password ให้ ${c.email} แล้ว`)} color="text-zinc-400 hover:bg-zinc-500/10" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-zinc-600">ไม่พบลูกค้าที่ตรงกับการค้นหา</div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#141418] border border-white/[0.08] rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <h3 className="text-white font-bold text-lg">{selected.shop}</h3>
              <button onClick={() => setSelected(null)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <Row label="เจ้าของ" value={selected.owner} />
              <Row label="อีเมล" value={selected.email} />
              <Row label="ประเภทธุรกิจ" value={selected.type} />
              <Row label="แผน" value={<span className={`text-xs px-2 py-0.5 rounded-full border ${planBadge[selected.plan]}`}>{planLabel[selected.plan]}</span>} />
              <Row label="Messages" value={`${selected.messages.toLocaleString()} / ${selected.limit >= 999999 ? '∞' : selected.limit.toLocaleString()}`} />
              <Row label="ยอดรายได้/เดือน" value={selected.revenue > 0 ? `฿${selected.revenue.toLocaleString()}` : '—'} />
              <Row label="วันสมัคร" value={selected.joined} />
              <Row label="Status" value={<span className={`text-xs px-2 py-0.5 rounded-full border ${statusBadge(selected.status)}`}>{statusLabel(selected.status)}</span>} />
            </div>
            <div className="p-6 pt-0 flex gap-3">
              <button
                onClick={() => { showToast(`ส่ง reset password ให้ ${selected.email}`); setSelected(null); }}
                className="flex-1 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 rounded-xl py-2.5 text-sm font-medium transition-all"
              >
                Reset Password
              </button>
              <button
                onClick={() => setSelected(null)}
                className="flex-1 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 border border-white/[0.08] rounded-xl py-2.5 text-sm font-medium transition-all"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionBtn({ icon, title, onClick, color }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-lg transition-colors ${color}`}
    >
      {icon}
    </button>
  );
}

function SelectFilter({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 pr-8 text-sm text-zinc-300 focus:outline-none focus:border-orange-500/40 cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#1a1a1f]">{o.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-zinc-500 text-sm">{label}</span>
      <span className="text-zinc-200 text-sm font-medium">{value}</span>
    </div>
  );
}
