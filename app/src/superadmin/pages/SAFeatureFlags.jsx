import { useState } from 'react';
import { Flag, ToggleLeft, ToggleRight, Info } from 'lucide-react';

const INITIAL_FLAGS = [
  { id: 'ai_v2', name: 'AI Engine v2', desc: 'เปิดใช้ GPT-4o เป็น primary model', enabled: true, target: 'enterprise', impact: 'high' },
  { id: 'broadcast_v2', name: 'Broadcast Scheduler', desc: 'กำหนดเวลา broadcast ล่วงหน้า', enabled: true, target: 'pro+enterprise', impact: 'medium' },
  { id: 'analytics_v3', name: 'Analytics Dashboard v3', desc: 'UI ใหม่สำหรับ analytics พร้อม funnel view', enabled: false, target: 'all', impact: 'low' },
  { id: 'knowledge_graph', name: 'Knowledge Graph', desc: 'ระบบ knowledge base แบบ graph-based', enabled: false, target: 'enterprise', impact: 'high' },
  { id: 'multi_channel', name: 'Multi-Channel Support', desc: 'รองรับ WhatsApp + Messenger นอกจาก LINE', enabled: false, target: 'enterprise', impact: 'high' },
  { id: 'ai_images', name: 'AI Image Generation', desc: 'สร้างรูปภาพสินค้าด้วย AI', enabled: false, target: 'enterprise', impact: 'medium' },
  { id: 'custom_domain', name: 'Custom Domain', desc: 'ใช้ domain ของตัวเองสำหรับ webhook', enabled: true, target: 'enterprise', impact: 'low' },
  { id: 'beta_ui', name: 'Beta UI', desc: 'Design ใหม่ (ยังไม่ production-ready)', enabled: false, target: 'internal', impact: 'low' },
];

const targetColors = {
  enterprise: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'pro+enterprise': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  all: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  internal: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
};

const impactColors = {
  high: 'text-red-400',
  medium: 'text-yellow-400',
  low: 'text-green-400',
};

export default function SAFeatureFlags() {
  const [flags, setFlags] = useState(INITIAL_FLAGS);
  const [toast, setToast] = useState('');

  const toggle = (id) => {
    setFlags((prev) => prev.map((f) => f.id === id ? { ...f, enabled: !f.enabled } : f));
    const flag = flags.find((f) => f.id === id);
    setToast(`${flag.name}: ${flag.enabled ? 'ปิด' : 'เปิด'}แล้ว`);
    setTimeout(() => setToast(''), 2000);
  };

  const enabled = flags.filter((f) => f.enabled).length;

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-orange-500/90 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium">
          {toast}
        </div>
      )}

      <div>
        <h1 className="text-2xl font-extrabold text-white">Feature Flags</h1>
        <p className="text-zinc-500 text-sm mt-1">เปิด/ปิดฟีเจอร์ต่างๆ ของ platform · {enabled}/{flags.length} enabled</p>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 flex items-center gap-3">
        <Info className="w-4 h-4 text-yellow-400 flex-shrink-0" />
        <p className="text-yellow-400 text-sm">การเปลี่ยนแปลง Feature Flags มีผลทันที ระมัดระวังเมื่อ toggle flags ที่มี Impact: High</p>
      </div>

      <div className="space-y-3">
        {flags.map((flag) => (
          <div key={flag.id} className="bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.10] rounded-2xl p-5 flex items-center gap-4 transition-all">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${flag.enabled ? 'bg-orange-500/20' : 'bg-white/[0.04]'}`}>
              <Flag className={`w-5 h-5 ${flag.enabled ? 'text-orange-400' : 'text-zinc-600'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-white font-medium">{flag.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${targetColors[flag.target] || targetColors.all}`}>
                  {flag.target}
                </span>
                <span className={`text-xs ${impactColors[flag.impact]}`}>Impact: {flag.impact}</span>
              </div>
              <p className="text-zinc-500 text-sm mt-0.5 truncate">{flag.desc}</p>
            </div>
            <button
              onClick={() => toggle(flag.id)}
              className="flex-shrink-0 transition-colors"
            >
              {flag.enabled
                ? <ToggleRight className="w-8 h-8 text-orange-400" />
                : <ToggleLeft className="w-8 h-8 text-zinc-600" />
              }
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
