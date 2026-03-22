import { useState } from 'react';
import {
  Gift, Link2, Share2, Users, TrendingUp, Copy, CheckCircle
} from 'lucide-react';
import PageLayout from '../components/PageLayout';

const REFERRAL_LINK = 'https://meowchat.store/ref/shopname';
const LINE_SHARE_URL = `https://line.me/R/msg/text/?MeowChat+ช่วยตอบแชทแทนฉัน+ลองดูเลย+${REFERRAL_LINK}`;

const referralHistory = [
  { name: 'คุณสมชาย มีสุข',       joinDate: '1 ม.ค. 2025',  plan: 'Pro',  status: 'active',  reward: '1 เดือนฟรี' },
  { name: 'ร้านขนมวนิลา',         joinDate: '5 ม.ค. 2025',  plan: 'Pro',  status: 'active',  reward: '1 เดือนฟรี' },
  { name: 'คุณนภา เพชรงาม',       joinDate: '10 ม.ค. 2025', plan: 'Pro',  status: 'active',  reward: '1 เดือนฟรี' },
  { name: 'ร้านเสื้อผ้าริมทาง',   joinDate: '15 ม.ค. 2025', plan: 'Pro',  status: 'pending', reward: 'รอยืนยัน' },
  { name: 'คุณวีระ ทองดี',        joinDate: '20 ม.ค. 2025', plan: 'Pro',  status: 'active',  reward: '1 เดือนฟรี' },
  { name: 'ร้านของชำดอนเมือง',    joinDate: '25 ม.ค. 2025', plan: 'Pro',  status: 'churned', reward: 'ไม่ได้รับ' },
  { name: 'คุณมาลี สวัสดี',       joinDate: '1 ก.พ. 2025',  plan: 'Pro',  status: 'active',  reward: '1 เดือนฟรี' },
  { name: 'ร้านนมสดหน้าตลาด',     joinDate: '5 ก.พ. 2025',  plan: 'Pro',  status: 'pending', reward: 'รอยืนยัน' },
];

const statusStyle = {
  active:  { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Active' },
  pending: { bg: 'bg-yellow-500/20',  text: 'text-yellow-400',  label: 'Pending' },
  churned: { bg: 'bg-red-500/20',     text: 'text-red-400',     label: 'Churned' },
};

function StatCard({ icon: Icon, label, value, color }) {
  const colorMap = {
    purple: 'text-purple-400 bg-purple-500/10',
    pink:   'text-pink-400   bg-pink-500/10',
    green:  'text-emerald-400 bg-emerald-500/10',
    orange: 'text-orange-400 bg-orange-500/10',
  };
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs text-zinc-500">{label}</p>
        <p className="text-xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

export default function Referral({ setSidebarOpen }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(REFERRAL_LINK).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAffiliateApply = () => {
    // eslint-disable-next-line no-alert
    alert('ทีมงานจะติดต่อกลับใน 1-2 วันทำการ');
  };

  return (
    <PageLayout
      title="โปรแกรมแนะนำเพื่อน"
      subtitle="แนะนำเพื่อนและรับเดือนใช้งานฟรี"
      setSidebarOpen={setSidebarOpen}
    >
      {/* ── Referral Link & Stats ──────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Gift className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="font-bold text-white text-lg">ลิงก์แนะนำของคุณ</h2>
            <p className="text-zinc-400 text-sm">แชร์ลิงก์นี้ให้เพื่อน — ทั้งคู่ได้รับ 1 เดือนฟรี</p>
          </div>
        </div>

        {/* Referral link input row */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-black/30 border border-white/[0.08] rounded-xl min-w-0">
            <Link2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span className="text-sm text-zinc-300 truncate font-mono">{REFERRAL_LINK}</span>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all flex-shrink-0 ${
              copied
                ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
                : 'bg-purple-500 hover:bg-purple-400 text-white'
            }`}
          >
            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'คัดลอกแล้ว!' : 'คัดลอก'}
          </button>
          <a
            href={LINE_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl text-sm font-semibold transition-colors flex-shrink-0"
          >
            <Share2 className="w-4 h-4" />
            Share to LINE
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon={Users}      label="เพื่อนที่แนะนำ"      value="12"        color="purple" />
          <StatCard icon={CheckCircle} label="Referral ที่ใช้งาน"  value="8"         color="green"  />
          <StatCard icon={Gift}        label="เดือนฟรีที่ได้รับ"   value="3 เดือน"   color="pink"   />
          <StatCard icon={TrendingUp}  label="ประหยัดรวม"          value="฿1,770"    color="orange" />
        </div>
      </div>

      {/* ── Referral History Table ─────────────────────────────────────────── */}
      <div className="bg-[#151520] border border-white/[0.06] rounded-2xl p-6 mb-6">
        <h3 className="text-base font-bold text-white mb-4">ประวัติการแนะนำ</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['เพื่อน', 'วันที่สมัคร', 'แผน', 'สถานะ', 'รางวัลที่ได้'].map((col) => (
                  <th key={col} className="text-left pb-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider pr-4">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {referralHistory.map((row, idx) => {
                const s = statusStyle[row.status];
                return (
                  <tr key={idx} className="border-b border-white/[0.04] last:border-0">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {row.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-white whitespace-nowrap">{row.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-sm text-zinc-400 whitespace-nowrap">{row.joinDate}</td>
                    <td className="py-3 pr-4">
                      <span className="px-2.5 py-1 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-full">
                        {row.plan}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${s.bg} ${s.text}`}>
                        {s.label}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-zinc-300">{row.reward}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Affiliate Program ──────────────────────────────────────────────── */}
      <div className="bg-[#151520] border border-white/[0.06] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h2 className="font-bold text-white text-lg">โปรแกรม Affiliate</h2>
            <p className="text-zinc-400 text-sm">สำหรับ Agency และ KOL — รับ Commission จากทุก Referral</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Commission details */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 space-y-3">
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">รายละเอียด Commission</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">อัตรา Commission</span>
              <span className="text-lg font-bold text-orange-400">20% Recurring</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">ระยะเวลา</span>
              <span className="text-sm font-semibold text-white">6 เดือน ต่อลูกค้า 1 ราย</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">วันจ่าย Payout</span>
              <span className="text-sm font-semibold text-white">โอนเงินเข้าบัญชีทุกวันที่ 15</span>
            </div>
          </div>

          {/* Earnings summary */}
          <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl p-4 space-y-3">
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">รายได้ของคุณ</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">เดือนนี้ (รอ Payout)</span>
              <span className="text-lg font-bold text-orange-400">฿4,720</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">รวมทั้งหมด</span>
              <span className="text-lg font-bold text-white">฿23,600</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-3/5 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full" />
            </div>
          </div>
        </div>

        <button
          onClick={handleAffiliateApply}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20"
        >
          <Gift className="w-5 h-5" />
          สมัคร Affiliate
        </button>
      </div>
    </PageLayout>
  );
}
