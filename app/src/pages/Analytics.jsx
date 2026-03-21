import { useState } from 'react';
import { TrendingUp, CheckCircle, Clock, ArrowRightLeft, AlertTriangle, Plus } from 'lucide-react';
import PageLayout from '../components/PageLayout';

// ── Section A stats ──────────────────────────────────────────────────────────
const chatStats = [
  {
    icon: '💬',
    label: 'แชทวันนี้',
    value: '127',
    change: '+12% vs เมื่อวาน',
    isPositive: true,
    color: 'blue',
  },
  {
    icon: '✅',
    label: 'ตอบอัตโนมัติ',
    value: '94%',
    change: 'บอทจัดการได้',
    isPositive: true,
    color: 'emerald',
  },
  {
    icon: '⏱️',
    label: 'เวลาตอบเฉลี่ย',
    value: '0.3 วิ',
    change: 'เร็วกว่าเมื่อวาน 5%',
    isPositive: true,
    color: 'purple',
  },
  {
    icon: '🔀',
    label: 'โอนให้เจ้าของ',
    value: '8 ครั้ง',
    change: 'วันนี้',
    isPositive: null,
    color: 'orange',
  },
];

// ── Section B — top questions ────────────────────────────────────────────────
const topQuestions = [
  { q: 'ราคาเท่าไหร่?',       count: 45, pct: 100, color: 'from-orange-500 to-orange-400' },
  { q: 'ของมีไหม?',           count: 38, pct: 84,  color: 'from-amber-500 to-yellow-400'  },
  { q: 'ส่งได้ที่ไหน?',       count: 29, pct: 64,  color: 'from-blue-500 to-cyan-400'     },
  { q: 'จ่ายยังไง?',          count: 22, pct: 49,  color: 'from-violet-500 to-purple-400' },
  { q: 'คืนสินค้าได้ไหม?',    count: 14, pct: 31,  color: 'from-emerald-500 to-teal-400'  },
];

// ── Section C — unanswered ───────────────────────────────────────────────────
const unansweredQuestions = [
  { q: 'ส่ง EMS ได้ไหม?',        count: 5 },
  { q: 'มีหน้าร้านไหม?',         count: 4 },
  { q: 'เปิดวันอาทิตย์ไหม?',     count: 3 },
];

// ── Section E — AI score breakdown ──────────────────────────────────────────
const scoreBreakdown = [
  { label: 'ความแม่นยำ',          pct: 92, color: 'bg-orange-500' },
  { label: 'ความเร็ว',            pct: 98, color: 'bg-emerald-500' },
  { label: 'ความครอบคลุม FAQ',    pct: 78, color: 'bg-blue-500'   },
  { label: 'ความพึงพอใจลูกค้า',  pct: 84, color: 'bg-purple-500' },
];

// ── Color helpers ────────────────────────────────────────────────────────────
const colorMap = {
  blue:    { card: 'bg-blue-500/10 border-blue-500/20',    text: 'text-blue-400'    },
  emerald: { card: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-400' },
  purple:  { card: 'bg-purple-500/10 border-purple-500/20', text: 'text-purple-400' },
  orange:  { card: 'bg-orange-500/10 border-orange-500/20', text: 'text-orange-400' },
};

// ── Circular gauge (CSS only) ────────────────────────────────────────────────
function CircularGauge({ score, max = 100 }) {
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const pct = score / max;
  const dashOffset = circumference * (1 - pct);

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
        {/* track */}
        <circle
          cx="80" cy="80" r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="12"
        />
        {/* progress */}
        <circle
          cx="80" cy="80" r={radius}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-white">{score}</span>
        <span className="text-xs text-zinc-400">/ {max}</span>
      </div>
    </div>
  );
}

export default function Analytics({ setSidebarOpen }) {
  const [addedFAQ, setAddedFAQ] = useState({});

  const handleAddFAQ = (idx) => {
    setAddedFAQ((prev) => ({ ...prev, [idx]: true }));
  };

  return (
    <PageLayout
      title="Analytics"
      subtitle="วิเคราะห์แชทและประสิทธิภาพ AI ของคุณ"
      setSidebarOpen={setSidebarOpen}
    >
      {/* ── Section A: Chat Stats ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {chatStats.map((stat, i) => {
          const c = colorMap[stat.color];
          return (
            <div
              key={i}
              className={`border rounded-2xl p-5 flex flex-col gap-3 ${c.card}`}
            >
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-xs text-zinc-500 mb-1">{stat.label}</p>
                <p className={`text-2xl font-black ${c.text}`}>{stat.value}</p>
              </div>
              <p className={`text-xs ${stat.isPositive === false ? 'text-red-400' : stat.isPositive ? 'text-emerald-400' : 'text-zinc-500'}`}>
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Section B: Top Questions ──────────────────────────────────────── */}
      <div className="bg-[#151520] border border-white/[0.06] rounded-3xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-white">คำถามที่ลูกค้าถามบ่อย</h3>
            <p className="text-xs text-zinc-500 mt-0.5">สัปดาห์นี้</p>
          </div>
          <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded-full px-3 py-1.5">
            ✅ ตอบอัตโนมัติทั้งหมด
          </span>
        </div>

        <div className="space-y-4">
          {topQuestions.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-sm text-zinc-400 w-36 flex-shrink-0 truncate">{item.q}</span>
              <div className="flex-1 bg-white/[0.04] rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
              <span className="text-xs text-zinc-400 w-14 text-right flex-shrink-0">
                {item.count} ครั้ง
              </span>
              <span className="text-xs text-zinc-600 w-10 text-right flex-shrink-0">
                {item.pct}%
              </span>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs text-zinc-500">
          คำถามเหล่านี้ถูกตอบอัตโนมัติโดย AI ทั้งหมด ✅
        </p>
      </div>

      {/* ── Section C: Unanswered + D: Revenue — side by side ─────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Section C */}
        <div className="bg-[#151520] border border-white/[0.06] rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <h3 className="text-lg font-bold text-white">คำถามที่บอทตอบไม่ได้</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] text-zinc-500">
                  <th className="text-left pb-3 font-semibold">คำถาม</th>
                  <th className="text-center pb-3 font-semibold">ครั้ง</th>
                  <th className="text-right pb-3 font-semibold">แนะนำ</th>
                </tr>
              </thead>
              <tbody>
                {unansweredQuestions.map((row, i) => (
                  <tr key={i} className="border-b border-white/[0.04]">
                    <td className="py-3 text-zinc-300">{row.q}</td>
                    <td className="py-3 text-center text-yellow-400 font-bold">{row.count}</td>
                    <td className="py-3 text-right">
                      {addedFAQ[i] ? (
                        <span className="text-xs text-emerald-400 font-semibold flex items-center justify-end gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> เพิ่มแล้ว
                        </span>
                      ) : (
                        <button
                          onClick={() => handleAddFAQ(i)}
                          className="text-xs bg-orange-500/15 hover:bg-orange-500/25 text-orange-400 border border-orange-500/25 rounded-lg px-2.5 py-1 transition-colors flex items-center gap-1 ml-auto"
                        >
                          <Plus className="w-3 h-3" /> เพิ่ม FAQ
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section D: Revenue Attribution */}
        <div className="bg-[#151520] border border-white/[0.06] rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <h3 className="text-lg font-bold text-white">รายได้จากแชท</h3>
          </div>
          <p className="text-xs text-zinc-500 mb-5">คำนวณจากออเดอร์ที่มาจากแชทบอท</p>

          <div className="text-center mb-6">
            <p className="text-4xl font-black text-emerald-400">฿28,450</p>
            <p className="text-sm text-zinc-400 mt-1">สร้างรายได้ผ่านแชท เดือนนี้</p>
          </div>

          {/* Comparison bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-400 mb-1">
              <span>แชทบอท</span>
              <span>เจ้าของตอบ</span>
            </div>
            <div className="flex h-5 rounded-full overflow-hidden gap-0.5">
              <div
                className="bg-gradient-to-r from-orange-500 to-orange-400 flex items-center justify-center text-[10px] font-bold text-white rounded-l-full"
                style={{ width: '68%' }}
              >
                68%
              </div>
              <div
                className="bg-gradient-to-r from-zinc-600 to-zinc-500 flex items-center justify-center text-[10px] font-bold text-white rounded-r-full"
                style={{ width: '32%' }}
              >
                32%
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                <span className="text-xs text-zinc-400">แชทบอท</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-500" />
                <span className="text-xs text-zinc-400">เจ้าของตอบ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section E: AI Performance Score ──────────────────────────────── */}
      <div className="bg-[#151520] border border-white/[0.06] rounded-3xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">AI Performance Score</h3>
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Gauge */}
          <div className="flex flex-col items-center gap-3 flex-shrink-0">
            <CircularGauge score={87} />
            <p className="text-sm font-semibold text-white">คะแนน AI ของคุณ</p>
            <span className="text-xs bg-orange-500/15 text-orange-400 border border-orange-500/25 rounded-full px-3 py-1">
              ระดับดีมาก
            </span>
          </div>

          {/* Breakdown bars */}
          <div className="flex-1 w-full space-y-5">
            {scoreBreakdown.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm text-zinc-300">{item.label}</span>
                  <span className="text-sm font-bold text-white">{item.pct}%</span>
                </div>
                <div className="h-2.5 bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
