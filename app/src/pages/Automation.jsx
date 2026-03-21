import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ChevronRight, Trash2, Edit2, ToggleLeft, ToggleRight, Zap } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { automationTemplates } from '../data/mockData';

// ──────────────────────────────────────────────
// Template Card
// ──────────────────────────────────────────────
function TemplateCard({ template }) {
  const [active, setActive] = useState(template.active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 flex flex-col gap-4 hover:border-orange-500/20 transition-all"
    >
      {/* Active badge */}
      {active && (
        <span className="absolute top-3 right-3 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5 uppercase tracking-widest">
          Active
        </span>
      )}

      {/* Icon + title */}
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none mt-0.5">{template.icon}</span>
        <div>
          <p className="font-bold text-white text-sm leading-snug">{template.name}</p>
          <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{template.description}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-auto pt-1 border-t border-white/[0.04]">
        {/* Toggle */}
        <button
          onClick={() => setActive(!active)}
          className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          {active ? (
            <ToggleRight className="w-5 h-5 text-orange-400" />
          ) : (
            <ToggleLeft className="w-5 h-5 text-zinc-600" />
          )}
          {active ? 'เปิดใช้งาน' : 'ปิดอยู่'}
        </button>

        {/* Settings button */}
        <button className="text-xs text-orange-400 hover:text-orange-300 border border-orange-500/20 hover:border-orange-400/40 rounded-lg px-3 py-1.5 transition-all font-medium">
          ตั้งค่า
        </button>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// Flow Builder Modal
// ──────────────────────────────────────────────
const TRIGGERS = [
  { id: 'msg_received', label: 'ลูกค้าส่งข้อความ' },
  { id: 'keyword',      label: 'ลูกค้าพูดถึงคำว่า...' },
  { id: 'new_order',    label: 'มีออเดอร์ใหม่' },
  { id: 'scheduled',   label: 'ถึงเวลาที่กำหนด' },
];

const ACTIONS = [
  { id: 'send_msg',    label: 'ส่งข้อความ' },
  { id: 'send_image',  label: 'ส่งรูปภาพ' },
  { id: 'handoff',     label: 'โอนให้เจ้าของร้าน' },
  { id: 'add_tag',     label: 'เพิ่ม Tag ให้ลูกค้า' },
  { id: 'broadcast',   label: 'ส่ง Broadcast' },
];

function FlowBuilderModal({ onClose, onSave }) {
  const [step, setStep] = useState(1);
  const [trigger, setTrigger] = useState('');
  const [condKeyword, setCondKeyword] = useState('');
  const [condTimeFrom, setCondTimeFrom] = useState('');
  const [condTimeTo, setCondTimeTo] = useState('');
  const [action, setAction] = useState('');
  const [message, setMessage] = useState('');

  const canNext1 = trigger !== '';
  const canNext2 = true; // conditions are optional
  const canSave  = action !== '';

  const handleSave = () => {
    const triggerLabel = TRIGGERS.find(t => t.id === trigger)?.label ?? trigger;
    const actionLabel  = ACTIONS.find(a => a.id === action)?.label ?? action;

    const condParts = [];
    if (condKeyword) condParts.push(`มีคำว่า "${condKeyword}"`);
    if (condTimeFrom && condTimeTo) condParts.push(`เวลา ${condTimeFrom}–${condTimeTo}`);

    const flowName = condParts.length
      ? `${triggerLabel} (${condParts.join(', ')}) → ${actionLabel}`
      : `${triggerLabel} → ${actionLabel}`;

    onSave({ trigger: triggerLabel, action: actionLabel, name: flowName, message });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-lg bg-[#111118] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-orange-400" />
            </div>
            <h2 className="font-bold text-white">สร้าง Flow ใหม่</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/[0.06] rounded-xl text-zinc-500 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-white/[0.04]">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${step === s ? 'bg-orange-500 text-white' : step > s ? 'bg-orange-500/30 text-orange-400' : 'bg-white/[0.06] text-zinc-500'}`}>
                {s}
              </div>
              <span className={`text-xs transition-colors ${step === s ? 'text-white font-semibold' : 'text-zinc-600'}`}>
                {s === 1 ? 'Trigger' : s === 2 ? 'Condition' : 'Action'}
              </span>
              {s < 3 && <ChevronRight className="w-3 h-3 text-zinc-700" />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="px-6 py-5 min-h-[220px]">
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-zinc-300 mb-4">เลือก Trigger — เมื่อไหร่ bot จะทำงาน?</p>
              {TRIGGERS.map(t => (
                <label key={t.id} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="trigger"
                    value={t.id}
                    checked={trigger === t.id}
                    onChange={() => setTrigger(t.id)}
                    className="accent-orange-500 w-4 h-4"
                  />
                  <span className={`text-sm transition-colors ${trigger === t.id ? 'text-white font-medium' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                    {t.label}
                  </span>
                </label>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <p className="text-sm font-semibold text-zinc-300">เลือก Condition <span className="text-zinc-600 font-normal">(ไม่บังคับ)</span></p>
              <div className="space-y-2">
                <label className="text-xs text-zinc-500 uppercase tracking-widest">ถ้าข้อความมีคำว่า</label>
                <input
                  type="text"
                  placeholder="เช่น ราคา, โปร, สั่งซื้อ"
                  value={condKeyword}
                  onChange={e => setCondKeyword(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl py-2.5 px-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-zinc-500 uppercase tracking-widest">ถ้าเวลา</label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={condTimeFrom}
                    onChange={e => setCondTimeFrom(e.target.value)}
                    className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-orange-500/40 transition-all"
                  />
                  <span className="text-zinc-600 text-sm">ถึง</span>
                  <input
                    type="time"
                    value={condTimeTo}
                    onChange={e => setCondTimeTo(e.target.value)}
                    className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-orange-500/40 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm font-semibold text-zinc-300 mb-2">เลือก Action — bot จะทำอะไร?</p>
              <div className="space-y-2">
                {ACTIONS.map(a => (
                  <label key={a.id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="action"
                      value={a.id}
                      checked={action === a.id}
                      onChange={() => setAction(a.id)}
                      className="accent-orange-500 w-4 h-4"
                    />
                    <span className={`text-sm transition-colors ${action === a.id ? 'text-white font-medium' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                      {a.label}
                    </span>
                  </label>
                ))}
              </div>

              {(action === 'send_msg' || action === 'broadcast') && (
                <textarea
                  rows={3}
                  placeholder="พิมพ์ข้อความที่จะส่ง..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl py-2.5 px-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40 transition-all resize-none mt-2"
                />
              )}
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            className="text-sm text-zinc-500 hover:text-white transition-colors"
          >
            {step > 1 ? '← ย้อนกลับ' : 'ยกเลิก'}
          </button>

          {step < 3 ? (
            <button
              disabled={step === 1 && !canNext1}
              onClick={() => setStep(step + 1)}
              className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all"
            >
              ถัดไป →
            </button>
          ) : (
            <button
              disabled={!canSave}
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all"
            >
              บันทึก Flow
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Custom Flow Row
// ──────────────────────────────────────────────
function FlowRow({ flow, onDelete, onToggle }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12 }}
      className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-orange-500/15 transition-all"
    >
      {/* Flow info */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: flow.active ? '#f97316' : '#52525b' }} />
        <div className="min-w-0">
          <p className="text-sm text-white font-medium truncate">{flow.name}</p>
          <p className="text-xs text-zinc-500 mt-0.5">
            <span className="text-zinc-400">{flow.trigger}</span>
            <span className="text-zinc-600 mx-1">→</span>
            <span className="text-zinc-400">{flow.action}</span>
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border
          ${flow.active ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-zinc-500 bg-white/[0.04] border-white/[0.08]'}`}>
          {flow.active ? 'Active' : 'Off'}
        </span>
        <button
          onClick={onToggle}
          className="p-2 hover:bg-white/[0.06] rounded-xl text-zinc-500 hover:text-orange-400 transition-colors"
          title={flow.active ? 'ปิด' : 'เปิด'}
        >
          {flow.active ? <ToggleRight className="w-4 h-4 text-orange-400" /> : <ToggleLeft className="w-4 h-4" />}
        </button>
        <button className="p-2 hover:bg-white/[0.06] rounded-xl text-zinc-500 hover:text-zinc-300 transition-colors">
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 hover:bg-red-500/10 rounded-xl text-zinc-600 hover:text-red-400 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────
const INITIAL_FLOWS = [
  { id: 1, name: 'ลูกค้าพูดว่า ราคา → ส่งรายการราคาสินค้า', trigger: 'ลูกค้าพูดถึงคำว่า...', action: 'ส่งข้อความ', active: true },
  { id: 2, name: 'ทุกวันจันทร์ 8:00 → ส่งโปรโมชั่นประจำสัปดาห์', trigger: 'ถึงเวลาที่กำหนด', action: 'ส่ง Broadcast', active: true },
];

export default function Automation({ setSidebarOpen }) {
  const [templates] = useState(automationTemplates);
  const [flows, setFlows] = useState(INITIAL_FLOWS);
  const [showModal, setShowModal] = useState(false);

  const handleSaveFlow = (flow) => {
    setFlows(prev => [
      ...prev,
      { id: Date.now(), ...flow, active: true },
    ]);
    setShowModal(false);
  };

  const handleDeleteFlow = (id) => {
    setFlows(prev => prev.filter(f => f.id !== id));
  };

  const handleToggleFlow = (id) => {
    setFlows(prev => prev.map(f => f.id === id ? { ...f, active: !f.active } : f));
  };

  const activeCount = flows.filter(f => f.active).length;

  return (
    <PageLayout
      title="Automation & Flow"
      subtitle="ตั้งค่าครั้งเดียว — bot จัดการทุกอย่างเอง"
      setSidebarOpen={setSidebarOpen}
      actions={
        <div className="flex items-center gap-2 text-sm text-zinc-400 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2">
          <Zap className="w-4 h-4 text-orange-400" />
          <span><span className="text-white font-bold">{activeCount}</span> flows active</span>
        </div>
      }
    >
      {/* ─── Section A: Templates ─── */}
      <section className="content-area">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-white">เทมเพลตสำเร็จรูป</h2>
          <p className="text-zinc-500 text-sm mt-1">เปิดใช้งานได้เลย — ไม่ต้องตั้งค่าเพิ่ม</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {templates.map((t, i) => (
            <motion.div key={t.id} transition={{ delay: i * 0.05 }}>
              <TemplateCard template={t} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Section B: Custom Flows ─── */}
      <section className="content-area">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-white">Custom Flows</h2>
            <p className="text-zinc-500 text-sm mt-1">สร้าง flow เองได้ตามต้องการ</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-all shadow-lg shadow-orange-500/20"
          >
            <Plus className="w-4 h-4" />
            สร้าง Flow ใหม่
          </button>
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {flows.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-zinc-600 text-sm"
              >
                <Zap className="w-8 h-8 mb-3 text-zinc-700" />
                <p>ยังไม่มี Custom Flow</p>
                <p className="text-xs mt-1 text-zinc-700">กดปุ่ม "สร้าง Flow ใหม่" เพื่อเริ่มต้น</p>
              </motion.div>
            ) : (
              flows.map(flow => (
                <FlowRow
                  key={flow.id}
                  flow={flow}
                  onDelete={() => handleDeleteFlow(flow.id)}
                  onToggle={() => handleToggleFlow(flow.id)}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <FlowBuilderModal
            onClose={() => setShowModal(false)}
            onSave={handleSaveFlow}
          />
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
