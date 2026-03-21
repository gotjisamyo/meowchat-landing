import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MessageCircle, Mail, BookOpen, Send, CheckCircle } from 'lucide-react';
import PageLayout from '../components/PageLayout';

// ─── Getting Started Steps ───────────────────────────────────────────────────
const steps = [
  {
    num: 1,
    title: 'สมัครสมาชิก & เลือกแผน',
    desc: 'สร้างบัญชีใหม่และเลือกแผนที่เหมาะกับธุรกิจของคุณ ตั้งแต่ Free ไปจนถึง Enterprise',
  },
  {
    num: 2,
    title: 'เชื่อมต่อ LINE Official Account',
    desc: 'นำ Channel Access Token และ Channel Secret จาก LINE Developers Console มาวางในหน้า Settings',
  },
  {
    num: 3,
    title: 'ตั้งชื่อและบุคลิกบอท',
    desc: 'กำหนดชื่อ โทนเสียง และสไตล์การตอบของบอทให้ตรงกับแบรนด์ของคุณ',
  },
  {
    num: 4,
    title: 'เพิ่มสินค้าและ FAQ',
    desc: 'อัปโหลดข้อมูลสินค้า ราคา และคำถามที่พบบ่อยลงใน Knowledge Base เพื่อให้บอทตอบได้แม่นยำ',
  },
  {
    num: 5,
    title: 'ทดสอบบอทก่อน Go Live',
    desc: 'ใช้ฟีเจอร์ Test Chat เพื่อสนทนากับบอทจำลอง ตรวจสอบการตอบก่อนเปิดให้ลูกค้าใช้จริง',
  },
  {
    num: 6,
    title: 'ดู Dashboard และปรับปรุง',
    desc: 'ติดตามสถิติการสนทนา อัตราการแปลง และ Feedback เพื่อปรับปรุงบอทอย่างต่อเนื่อง',
  },
];

// ─── FAQ Items ────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'เชื่อมต่อ LINE OA ยังไง?',
    a: 'ไปที่ Settings → Integrations → LINE Official Account แล้วกรอก Channel ID, Channel Secret และ Channel Access Token จาก LINE Developers Console (console.line.biz) จากนั้นกด Save และระบบจะทดสอบการเชื่อมต่อให้อัตโนมัติ',
  },
  {
    q: 'บอทตอบผิด ทำยังไง?',
    a: 'เพิ่มคำถามและคำตอบที่ถูกต้องลงใน FAQ หรือ Knowledge Base แล้วบอทจะเรียนรู้และตอบได้แม่นยำขึ้น นอกจากนี้ยังสามารถกด "แก้ไขคำตอบ" ได้โดยตรงจากหน้า Inbox เมื่อเห็นการตอบที่ไม่ถูกต้อง',
  },
  {
    q: 'ลูกค้าคุยกับบอทแล้วอยากให้คนตอบแทนได้ไหม?',
    a: 'ได้เลย! ฟีเจอร์ Human Handoff พร้อมใช้งานใน Pro plan ขึ้นไป ลูกค้าพิมพ์ "คุยกับเจ้าหน้าที่" หรือบอทตรวจพบว่าปัญหาเกินขอบเขต AI จะโอนสายให้ทีมของคุณทันทีพร้อมแจ้งเตือน',
  },
  {
    q: 'ยกเลิก subscription ยังไง?',
    a: 'ไปที่ Settings → Subscription → Cancel Plan แล้วทำตามขั้นตอน ระบบจะเก็บข้อมูลไว้ 30 วันหลังยกเลิก และคุณยังใช้งานได้จนหมดรอบบิลปัจจุบัน',
  },
  {
    q: 'ข้อมูลลูกค้าปลอดภัยไหม?',
    a: 'ข้อมูลทุกอย่างเข้ารหัสด้วย AES-256 ทั้งขณะส่งและจัดเก็บ เราไม่ขายข้อมูลให้บุคคลที่สาม และระบบรองรับ PDPA (พรบ.คุ้มครองข้อมูลส่วนบุคคล) ครบถ้วน',
  },
  {
    q: 'ใช้กับ Facebook/Instagram ได้ไหม?',
    a: 'กำลังพัฒนาอยู่ครับ คาดว่าจะรองรับ Facebook Messenger และ Instagram DM ภายใน Q2 2026 ติดตามอัปเดตได้ที่ changelog ในแอปหรือ Facebook Page ของเรา',
  },
  {
    q: 'บอทรองรับกี่ภาษา?',
    a: 'ปัจจุบันรองรับภาษาไทยและภาษาอังกฤษได้อย่างเต็มประสิทธิภาพ โดยบอทจะตรวจจับภาษาที่ลูกค้าใช้แล้วตอบกลับในภาษาเดียวกันโดยอัตโนมัติ',
  },
  {
    q: 'ทดลองใช้ฟรีได้ไหม?',
    a: 'ได้เลย! MeowChat มี Free plan ให้ใช้ตลอดไปโดยไม่ต้องใส่บัตรเครดิต รองรับสนทนาสูงสุด 200 ครั้ง/เดือน สามารถอัปเกรดเป็น Pro ได้ทุกเมื่อ',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function StepCard({ step }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: step.num * 0.06 }}
      className="flex gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-orange-500/20 hover:bg-white/[0.05] transition-all group"
    >
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/20">
        {step.num}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white text-sm mb-1">{step.title}</h3>
        <p className="text-zinc-500 text-xs leading-relaxed">{step.desc}</p>
        <a href="#" className="inline-block mt-2 text-orange-400 text-xs font-medium hover:text-orange-300 transition-colors">
          ดูวิธีทำ →
        </a>
      </div>
    </motion.div>
  );
}

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-white/[0.06] rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
      >
        <span className="font-semibold text-white text-sm">{item.q}</span>
        {isOpen
          ? <ChevronUp className="w-4 h-4 text-orange-400 flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-zinc-500 flex-shrink-0" />
        }
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-zinc-400 text-sm leading-relaxed border-t border-white/[0.04] pt-3">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Tab definitions ──────────────────────────────────────────────────────────
const TABS = [
  { id: 'start',   label: '🚀 เริ่มต้นใช้งาน' },
  { id: 'faq',     label: '❓ คำถามที่พบบ่อย' },
  { id: 'contact', label: '📞 ติดต่อเรา' },
];

// ─── Main page ────────────────────────────────────────────────────────────────
export default function HelpCenter({ setSidebarOpen }) {
  const [activeTab, setActiveTab] = useState('start');
  const [openFaq, setOpenFaq] = useState(null);

  // Contact form state
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <PageLayout
      title="ศูนย์ช่วยเหลือ"
      subtitle="คู่มือการใช้งาน, คำถามที่พบบ่อย และช่องทางติดต่อทีมงาน"
      setSidebarOpen={setSidebarOpen}
    >
      <div className="content-area pb-10">
        {/* Tab bar */}
        <div className="flex gap-1 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-1 mb-6 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Tab 1: Getting Started ── */}
        {activeTab === 'start' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((step) => (
              <StepCard key={step.num} step={step} />
            ))}
          </div>
        )}

        {/* ── Tab 2: FAQ ── */}
        {activeTab === 'faq' && (
          <div className="space-y-3 max-w-2xl">
            {faqs.map((item, i) => (
              <FaqItem
                key={i}
                item={item}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        )}

        {/* ── Tab 3: Contact ── */}
        {activeTab === 'contact' && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Support channels */}
            <div className="flex flex-col gap-4 lg:w-72 flex-shrink-0">
              {[
                {
                  icon: '💬',
                  title: 'LINE',
                  handle: '@meowchat',
                  note: 'ตอบกลับภายใน 2 ชม. (เวลาทำการ)',
                  color: 'from-green-500/20 to-green-600/5',
                  border: 'border-green-500/20',
                },
                {
                  icon: '📧',
                  title: 'Email',
                  handle: 'support@meowchat.store',
                  note: 'ตอบกลับภายใน 24 ชม.',
                  color: 'from-blue-500/20 to-blue-600/5',
                  border: 'border-blue-500/20',
                },
                {
                  icon: '📚',
                  title: 'Docs',
                  handle: 'meowchat.store/docs',
                  note: 'คู่มือ Self-serve ครบจบในที่เดียว',
                  color: 'from-orange-500/20 to-orange-600/5',
                  border: 'border-orange-500/20',
                },
              ].map((ch) => (
                <div
                  key={ch.title}
                  className={`flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br ${ch.color} border ${ch.border}`}
                >
                  <span className="text-2xl flex-shrink-0">{ch.icon}</span>
                  <div>
                    <p className="text-white font-semibold text-sm">{ch.title}</p>
                    <p className="text-orange-300 text-xs font-medium">{ch.handle}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{ch.note}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
              <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                <Send className="w-4 h-4 text-orange-400" />
                ส่งข้อความหาทีมงาน
              </h3>

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-xl px-4 py-3 mb-4"
                >
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  ส่งข้อความสำเร็จแล้ว! ทีมงานจะติดต่อกลับเร็ว ๆ นี้
                </motion.div>
              )}

              <form onSubmit={handleSend} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1 font-medium">ชื่อ</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="ชื่อของคุณ"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1 font-medium">อีเมล</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium">หัวข้อ</label>
                  <input
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="หัวข้อปัญหาหรือคำถาม"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 font-medium">ข้อความ</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="อธิบายปัญหาหรือคำถามของคุณ..."
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/40 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-lg shadow-orange-500/20"
                >
                  <Send className="w-4 h-4" />
                  ส่งข้อความ
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
