import { useState, useMemo } from 'react';
import { 
  Search, Filter, Download, MoreVertical, 
  Users, DollarSign, TrendingUp, UserPlus,
  Tag, Mail, Calendar, Zap
} from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { customersData, subscriptionStats, tagColors } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export default function Customers({ setSidebarOpen }) {
  const { isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Get unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    customersData.forEach(customer => {
      customer.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Filter customers
  const filteredCustomers = useMemo(() => {
    return customersData.filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTag === 'all' || customer.tags.includes(selectedTag);
      const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
      
      return matchesSearch && matchesTag && matchesStatus;
    });
  }, [searchQuery, selectedTag, selectedStatus]);

  // Calculate stats
  const stats = {
    totalCustomers: customersData.length,
    activeCustomers: customersData.filter(c => c.status === 'active').length,
    totalRevenue: customersData.reduce((sum, c) => sum + c.revenue, 0),
    vipCustomers: customersData.filter(c => c.tags.includes('VIP')).length,
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `฿${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `฿${(num / 1000).toFixed(0)}K`;
    return `฿${num}`;
  };

  return (
    <PageLayout
      title="Customers"
      subtitle="จัดการลูกค้าและข้อมูล"
      setSidebarOpen={setSidebarOpen}
      actions={
        <button className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export
        </button>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          icon={Users}
          label="ลูกค้าทั้งหมด"
          value={stats.totalCustomers.toLocaleString()}
          change="+12.5%"
          positive
          color="blue"
        />
        <StatCard 
          icon={TrendingUp}
          label="ลูกค้าที่ใช้งานอยู่"
          value={stats.activeCustomers.toLocaleString()}
          change="+8.2%"
          positive
          color="green"
        />
        <StatCard 
          icon={DollarSign}
          label="รายได้รวม"
          value={formatNumber(stats.totalRevenue)}
          change="+15.3%"
          positive
          color="orange"
        />
        <StatCard 
          icon={UserPlus}
          label="ลูกค้า VIP"
          value={stats.vipCustomers.toLocaleString()}
          change="+5"
          positive
          color="purple"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="ค้นหาลูกค้า..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#151520] border border-white/[0.06] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50"
          />
        </div>

        {/* Tag Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <FilterButton 
            label="ทั้งหมด" 
            active={selectedTag === 'all'} 
            onClick={() => setSelectedTag('all')} 
          />
          {allTags.map(tag => (
            <FilterButton 
              key={tag}
              label={tag} 
              active={selectedTag === tag} 
              onClick={() => setSelectedTag(tag)}
              color={tagColors[tag]?.text.replace('text-', '')}
            />
          ))}
        </div>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-3 bg-[#151520] border border-white/[0.06] rounded-xl text-white focus:outline-none focus:border-orange-500/50"
        >
          <option value="all">ทุกสถานะ</option>
          <option value="active">Active</option>
          <option value="new">New</option>
          <option value="churned">Churned</option>
        </select>
      </div>

      {/* Results Count */}
      <p className="text-sm text-zinc-500 mb-4">
        แสดง {filteredCustomers.length} จาก {customersData.length} ลูกค้า
      </p>

      {/* Customer Table */}
      <div className="bg-[#151520] border border-white/[0.06] rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">ลูกค้า</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">แผม</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">Tags</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">รายได้</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">API Calls</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">วันที่สมัคร</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-zinc-400">สถานะ</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, idx) => (
                <tr 
                  key={customer.id}
                  className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4">
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
                  <td className="px-6 py-4">
                    <PlanBadge plan={customer.plan} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {customer.tags.map(tag => (
                        <TagBadge key={tag} tag={tag} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{formatNumber(customer.revenue)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-zinc-500" />
                      <span className="text-white">{customer.apiCalls.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(customer.joinDate)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={customer.status} />
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-white/[0.06] rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-zinc-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-400">ไม่พบลูกค้าที่ตรงกับเงื่อนไข</p>
        </div>
      )}
    </PageLayout>
  );
}

function StatCard({ icon: Icon, label, value, change, positive, color }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-400',
    green: 'from-emerald-500 to-emerald-400',
    orange: 'from-orange-500 to-orange-400',
    purple: 'from-purple-500 to-violet-400',
  };

  return (
    <div className="bg-[#151520] border border-white/[0.06] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className={`text-sm font-medium ${positive ? 'text-emerald-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-zinc-500">{label}</p>
    </div>
  );
}

function FilterButton({ label, active, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
        ${active 
          ? 'bg-orange-500 text-white' 
          : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08]'
        }
      `}
    >
      {label}
    </button>
  );
}

function PlanBadge({ plan }) {
  const colors = {
    free: 'bg-zinc-500/20 text-zinc-400',
    pro: 'bg-orange-500/20 text-orange-400',
    enterprise: 'bg-purple-500/20 text-purple-400',
  };

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${colors[plan]}`}>
      {plan}
    </span>
  );
}

function TagBadge({ tag }) {
  const colors = tagColors[tag] || { bg: 'bg-zinc-500/20', text: 'text-zinc-400', border: 'border-zinc-500/30' };
  
  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
      {tag}
    </span>
  );
}

function StatusBadge({ status }) {
  const colors = {
    active: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'ใช้งาน' },
    new: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'ใหม่' },
    churned: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'ยกเลิก' },
  };

  const style = colors[status] || colors.active;

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}
