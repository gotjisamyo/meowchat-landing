import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, HelpCircle, Store, Bot,
  Plus, Pencil, Trash2, Upload, Send, Search,
  CheckCircle, ToggleLeft, ToggleRight,
  ChevronDown, Save,
} from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { storeProducts as initialProducts, storeFAQs as initialFAQs } from '../data/mockData';

// ─── helpers ───────────────────────────────────────────────────────────────

const HOURS = Array.from({ length: 17 }, (_, i) => {
  const h = i + 6;
  return `${String(h).padStart(2, '0')}:00`;
});

const DAYS = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'];

const TABS = [
  { id: 'products', label: 'สินค้า/บริการ', icon: Package },
  { id: 'faq',      label: 'FAQ / คำถามที่พบบ่อย', icon: HelpCircle },
  { id: 'store',    label: 'ข้อมูลร้าน', icon: Store },
  { id: 'ai',       label: 'ทดสอบ AI', icon: Bot },
];

function inputCls(extra = '') {
  return `w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50 transition-all ${extra}`;
}

function labelCls() {
  return 'block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5';
}

// ─── mock AI responder ──────────────────────────────────────────────────────

// Helper: find a product whose name (or any word >2 chars) appears in the query
function findProductInQuery(q, products) {
  for (const p of products) {
    const nameLower = p.name.toLowerCase();
    if (q.includes(nameLower)) return p;
    // Also match individual words (length > 2) so "เสื้อยืด" matches "เสื้อยืด Oversize"
    const words = nameLower.split(/\s+/).filter((w) => w.length > 2);
    if (words.some((w) => q.includes(w))) return p;
  }
  return null;
}

function mockAIAnswer(question, products, faqs, storeInfo) {
  const q = question.toLowerCase().trim();

  // ── Pattern: "ราคา [product]" ─────────────────────────────────────────────
  if (q.startsWith('ราคา') || q.includes('ราคา ')) {
    const matched = findProductInQuery(q, products);
    if (matched) {
      if (!matched.active || matched.stock === 0) {
        return `❌ ${matched.name} หมดสต็อกแล้วครับ ราคาปกติ ฿${matched.price.toLocaleString()}/${matched.unit}`;
      }
      return `💰 ${matched.name} ราคา ฿${matched.price.toLocaleString()}/${matched.unit} ครับ (สต็อกเหลือ ${matched.stock} ${matched.unit})`;
    }
    // Generic price list
    const available = products.filter((p) => p.active && p.stock > 0);
    if (available.length === 0) return 'ขออภัยครับ ตอนนี้ไม่มีสินค้าพร้อมขาย';
    const list = available.map((p) => `• ${p.name}: ฿${p.price.toLocaleString()}/${p.unit}`).join('\n');
    return `💰 ราคาสินค้าของเรา:\n${list}`;
  }

  // ── Pattern: "มี [product] ไหม" ──────────────────────────────────────────
  if (q.startsWith('มี') && (q.includes('ไหม') || q.includes('บ้าง') || q.includes('มั้ย'))) {
    const matched = findProductInQuery(q, products);
    if (matched) {
      if (!matched.active || matched.stock === 0) {
        return `❌ ${matched.name} หมดแล้วครับ ตอนนี้ไม่มีในสต็อก`;
      }
      return `✅ มีครับ ${matched.name} เหลือ ${matched.stock} ${matched.unit} ครับ`;
    }
    // No specific product — list all available
    const available = products.filter((p) => p.active && p.stock > 0);
    return available.length > 0
      ? `📦 สินค้าที่พร้อมส่ง: ${available.map((p) => p.name).join(', ')} ครับ`
      : 'ขออภัยครับ ตอนนี้สินค้าหมดทุกรายการ';
  }

  // ── Pattern: "เปิดกี่โมง" / store hours ──────────────────────────────────
  if (q.includes('เปิดกี่โมง') || q.includes('กี่โมง') || q.includes('เปิด') || q.includes('ปิด') || q.includes('เวลา')) {
    if (storeInfo.openTime && storeInfo.closeTime) {
      return `🏪 ร้านเปิด ${storeInfo.openTime} - ${storeInfo.closeTime} น. ครับ`;
    }
    return 'กรุณากรอกเวลาเปิด-ปิดในแท็บ "ข้อมูลร้าน" ก่อนนะครับ';
  }

  // ── Check FAQ first (keyword match) ──────────────────────────────────────
  for (const faq of faqs) {
    const keywords = faq.q.toLowerCase().split(/[\s?/,]+/).filter(Boolean);
    const hit = keywords.some((kw) => kw.length > 1 && q.includes(kw));
    if (hit) return `📋 จาก FAQ: ${faq.a}`;
  }

  // ── Check product name mention ────────────────────────────────────────────
  const matchedProduct = findProductInQuery(q, products);
  if (matchedProduct) {
    if (!matchedProduct.active || matchedProduct.stock === 0) {
      return `❌ ${matchedProduct.name} หมดสต็อกแล้วครับ`;
    }
    return `✅ ${matchedProduct.name} ราคา ฿${matchedProduct.price.toLocaleString()}/${matchedProduct.unit} — สต็อกเหลือ ${matchedProduct.stock} ${matchedProduct.unit} ครับ`;
  }

  // ── Generic "มีไหม" / stock query ────────────────────────────────────────
  if (q.includes('มีไหม') || q.includes('สต็อก') || q.includes('ของมี')) {
    const available = products.filter((p) => p.active && p.stock > 0);
    return available.length > 0
      ? `📦 สินค้าที่พร้อมส่ง: ${available.map((p) => p.name).join(', ')} ครับ`
      : 'ขออภัยครับ ตอนนี้สินค้าหมดทุกรายการ';
  }

  // ── Generic price question ────────────────────────────────────────────────
  if (q.includes('เท่าไหร่') || q.includes('เท่าไร')) {
    const available = products.filter((p) => p.active && p.stock > 0);
    if (available.length === 0) return 'ขออภัยครับ ตอนนี้ไม่มีสินค้าพร้อมขาย';
    const list = available.map((p) => `• ${p.name}: ฿${p.price.toLocaleString()}/${p.unit}`).join('\n');
    return `💰 ราคาสินค้าของเรา:\n${list}`;
  }

  return 'ขออภัยครับ ยังไม่พบข้อมูลที่ตรงกับคำถามนี้ในคลังความรู้ของร้าน กรุณาติดต่อร้านโดยตรงครับ';
}

// ─── Tab: Store Info ────────────────────────────────────────────────────────

function StoreTab({ storeInfo, setStoreInfo }) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggle = (day) => {
    const days = storeInfo.closedDays || [];
    setStoreInfo({
      ...storeInfo,
      closedDays: days.includes(day) ? days.filter((d) => d !== day) : [...days, day],
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelCls()}>ชื่อร้าน</label>
          <input className={inputCls()} placeholder="เช่น ร้านเสื้อผ้า Fashion Street" value={storeInfo.name || ''} onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })} />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls()}>ที่อยู่ / ตำบล / จังหวัด</label>
          <input className={inputCls()} placeholder="เช่น 123/4 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110" value={storeInfo.address || ''} onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })} />
        </div>

        {/* Hours */}
        <div>
          <label className={labelCls()}>เวลาเปิด</label>
          <div className="relative">
            <select
              className={inputCls('appearance-none pr-10 cursor-pointer')}
              value={storeInfo.openTime || '09:00'}
              onChange={(e) => setStoreInfo({ ...storeInfo, openTime: e.target.value })}
            >
              {HOURS.map((h) => <option key={h} value={h}>{h} น.</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className={labelCls()}>เวลาปิด</label>
          <div className="relative">
            <select
              className={inputCls('appearance-none pr-10 cursor-pointer')}
              value={storeInfo.closeTime || '21:00'}
              onChange={(e) => setStoreInfo({ ...storeInfo, closeTime: e.target.value })}
            >
              {HOURS.map((h) => <option key={h} value={h}>{h} น.</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          </div>
        </div>

        {/* Closed Days */}
        <div className="md:col-span-2">
          <label className={labelCls()}>วันหยุด</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {DAYS.map((day) => {
              const checked = (storeInfo.closedDays || []).includes(day);
              return (
                <button
                  key={day}
                  onClick={() => toggle(day)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    checked
                      ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                      : 'bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:border-white/20'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contact */}
        <div>
          <label className={labelCls()}>เบอร์โทร</label>
          <input className={inputCls()} placeholder="0XX-XXX-XXXX" value={storeInfo.phone || ''} onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })} />
        </div>
        <div>
          <label className={labelCls()}>LINE ID</label>
          <input className={inputCls()} placeholder="@yourshop" value={storeInfo.lineId || ''} onChange={(e) => setStoreInfo({ ...storeInfo, lineId: e.target.value })} />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls()}>Facebook Page</label>
          <input className={inputCls()} placeholder="https://facebook.com/yourpage" value={storeInfo.facebook || ''} onChange={(e) => setStoreInfo({ ...storeInfo, facebook: e.target.value })} />
        </div>

        {/* Policy */}
        <div className="md:col-span-2">
          <label className={labelCls()}>นโยบายร้าน</label>
          <textarea
            className={inputCls('resize-none')}
            rows={4}
            placeholder="เช่น ไม่รับคืนสินค้าที่ผ่านการใช้งานแล้ว, ชำระก่อนส่งของ..."
            value={storeInfo.policy || ''}
            onChange={(e) => setStoreInfo({ ...storeInfo, policy: e.target.value })}
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl text-sm text-white font-semibold transition-all"
      >
        {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
        {saved ? 'บันทึกแล้ว!' : 'บันทึกข้อมูลร้าน'}
      </button>
    </div>
  );
}

// ─── Tab: AI Test ───────────────────────────────────────────────────────────

function AITestTab({ products, faqs, storeInfo }) {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'สวัสดีครับ! ทดสอบถามอะไรก็ได้เลยครับ เช่น "ของชิ้นนี้ราคาเท่าไหร่?" หรือ "ส่งได้ที่ไหนบ้าง?"',
    },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  const send = () => {
    const q = input.trim();
    if (!q) return;
    const answer = mockAIAnswer(q, products, faqs, storeInfo);
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: q },
      { role: 'bot', text: answer },
    ]);
    setInput('');
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const SUGGESTIONS = [
    'ราคา เสื้อยืด Oversize',
    'มี กางเกง Jogger ไหม',
    'เปิดกี่โมง',
    'ส่งได้ที่ไหนบ้าง?',
  ];

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl px-4 py-3 flex items-start gap-3">
        <Bot className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-orange-300 leading-relaxed">
          ทดสอบว่า AI จะตอบลูกค้ายังไงจากข้อมูลที่คุณใส่ไป — FAQ, สินค้า, และข้อมูลร้าน
        </p>
      </div>

      {/* Chat window */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col" style={{ height: '380px' }}>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-orange-500 text-white rounded-br-sm'
                    : 'bg-white/[0.06] text-zinc-300 rounded-bl-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/[0.06] p-3 flex gap-2">
          <input
            className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50 transition-all"
            placeholder="พิมพ์คำถาม แล้วกด Enter..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="p-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-white transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick suggestions */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-zinc-600 self-center">ลองถาม:</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => { setInput(s); }}
            className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] hover:border-orange-500/30 rounded-xl text-xs text-zinc-400 hover:text-zinc-200 transition-all"
          >
            {s}
          </button>
        ))}
      </div>

      {/* ─── AI Product Search Demo ─── */}
      <AIProductSearchDemo products={products} />
    </div>
  );
}

// Demo section: show how bot replies when customer types a product name
function AIProductSearchDemo({ products }) {
  const DEMO_QUERIES = [
    { label: 'เสื้อยืด', answer: null },
    { label: 'กางเกง Jogger', answer: null },
    { label: 'ถุงผ้า', answer: null },
  ];

  function buildAnswer(query) {
    const q = query.toLowerCase();
    // Find a matching product using the same helper logic as mockAIAnswer
    for (const p of products) {
      const nameLower = p.name.toLowerCase();
      const words = nameLower.split(/\s+/).filter((w) => w.length > 1);
      if (nameLower.includes(q) || q.includes(nameLower) || words.some((w) => q.includes(w))) {
        if (!p.active || p.stock === 0) {
          return `❌ ${p.name} หมดสต็อกแล้วครับ ราคาปกติ ฿${p.price.toLocaleString()}/${p.unit}`;
        }
        return `${p.name} ราคา ฿${p.price.toLocaleString()} มีสต็อก ${p.stock} ${p.unit} ต้องการสั่งซื้อไหมครับ? 🛍️`;
      }
    }
    return 'ขออภัยครับ ไม่พบสินค้าที่ตรงกัน';
  }

  const rows = DEMO_QUERIES.map((dq) => ({ ...dq, answer: buildAnswer(dq.label) }));

  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 space-y-4 max-w-2xl">
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-orange-400" />
        <p className="text-sm font-bold text-white">ทดสอบค้นหา AI</p>
      </div>
      <p className="text-xs text-zinc-500 leading-relaxed">
        เมื่อลูกค้าพิมพ์ชื่อสินค้า บอทจะตอบกลับพร้อมราคาและสต็อกทันที — เหมาะสำหรับร้านค้า B2B, อะไหล่รถ, และสินค้า FMCG
      </p>
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-1.5">
            {/* Customer message */}
            <div className="flex justify-end">
              <div className="bg-orange-500 text-white text-sm px-4 py-2 rounded-2xl rounded-br-sm max-w-[70%]">
                {row.label}
              </div>
            </div>
            {/* Bot reply */}
            <div className="flex justify-start">
              <div className="bg-white/[0.06] text-zinc-300 text-sm px-4 py-2 rounded-2xl rounded-bl-sm max-w-[80%] whitespace-pre-line">
                <span className="text-[10px] text-zinc-500 block mb-0.5">🤖 บอท</span>
                {row.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function KnowledgeBase({ setSidebarOpen }) {
  const [activeTab, setActiveTab] = useState('products');

  // Shared state so AI tab can see latest products/FAQs
  const [products, setProducts] = useState(initialProducts);
  const [faqs, setFaqs] = useState(initialFAQs);
  const [storeInfo, setStoreInfo] = useState({
    name: '',
    address: '',
    openTime: '09:00',
    closeTime: '21:00',
    closedDays: ['อาทิตย์'],
    phone: '',
    lineId: '',
    facebook: '',
    policy: '',
  });

  const renderTab = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsTabConnected products={products} setProducts={setProducts} />;
      case 'faq':
        return <FAQTabConnected faqs={faqs} setFaqs={setFaqs} />;
      case 'store':
        return <StoreTab storeInfo={storeInfo} setStoreInfo={setStoreInfo} />;
      case 'ai':
        return <AITestTab products={products} faqs={faqs} storeInfo={storeInfo} />;
      default:
        return null;
    }
  };

  return (
    <PageLayout
      title="คลังความรู้"
      subtitle="ข้อมูลสินค้า, FAQ, และข้อมูลร้านที่ AI ใช้ตอบลูกค้า"
      setSidebarOpen={setSidebarOpen}
    >
      <div className="content-area py-6 space-y-6">
        {/* Tab Bar */}
        <div className="flex gap-1 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-1.5 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageLayout>
  );
}

// Connected versions that use the shared state lifted to the parent
function ProductsTabConnected({ products, setProducts }) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const fileRef = useRef(null);
  const emptyForm = { name: '', price: '', unit: '', category: '', description: '', stock: '' };
  const [form, setForm] = useState(emptyForm);
  // Search & category filter state
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ทั้งหมด');

  const handleSubmit = () => {
    if (!form.name || !form.price) return;
    if (editId !== null) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editId
            ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) }
            : p
        )
      );
      setEditId(null);
    } else {
      setProducts((prev) => [
        ...prev,
        { id: Date.now(), ...form, price: Number(form.price), stock: Number(form.stock), active: true },
      ]);
    }
    setForm(emptyForm);
    setShowForm(false);
  };

  const startEdit = (p) => {
    setForm({ name: p.name, price: String(p.price), unit: p.unit, category: p.category, description: p.description, stock: String(p.stock) });
    setEditId(p.id);
    setShowForm(true);
  };

  const toggleActive = (id) => setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  const deleteProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  // Derive unique category list from current products
  const categories = ['ทั้งหมด', ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))];

  // Apply search + category filter
  const visibleProducts = products.filter((p) => {
    const matchSearch = productSearch.trim() === '' || p.name.toLowerCase().includes(productSearch.toLowerCase());
    const matchCat = categoryFilter === 'ทั้งหมด' || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <p className="text-sm text-zinc-400">{products.length} รายการ</p>
        <div className="flex gap-2">
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/[0.08] hover:border-orange-500/40 rounded-xl text-sm text-zinc-300 hover:text-white transition-all"
          >
            <Upload className="w-4 h-4" />
            นำเข้าจาก CSV
          </button>
          <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={() => {}} />
          <button
            onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-xl text-sm text-white font-semibold transition-all"
          >
            <Plus className="w-4 h-4" />
            เพิ่มสินค้า
          </button>
        </div>
      </div>

      {/* Search + category filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            placeholder="ค้นหาสินค้า..."
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/50 transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                categoryFilter === cat
                  ? 'bg-orange-500/20 border-orange-500/40 text-orange-300'
                  : 'bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:border-white/20 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-white/[0.03] border border-orange-500/20 rounded-2xl p-5 space-y-4"
          >
            <p className="text-sm font-bold text-white">{editId ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div><label className={labelCls()}>ชื่อสินค้า *</label><input className={inputCls()} placeholder="เช่น เสื้อยืด Oversize" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div><label className={labelCls()}>ราคา (฿) *</label><input className={inputCls()} type="number" placeholder="299" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
              <div><label className={labelCls()}>หน่วย</label><input className={inputCls()} placeholder="ตัว / ชิ้น / ชุด" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} /></div>
              <div><label className={labelCls()}>หมวดหมู่</label><input className={inputCls()} placeholder="เสื้อผ้า / อุปกรณ์เสริม" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
              <div><label className={labelCls()}>สต็อก</label><input className={inputCls()} type="number" placeholder="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></div>
              <div><label className={labelCls()}>คำอธิบาย</label><input className={inputCls()} placeholder="รายละเอียดสินค้า" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">ยกเลิก</button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-xl text-sm text-white font-semibold transition-all">{editId ? 'บันทึก' : 'เพิ่มสินค้า'}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-x-auto rounded-2xl border border-white/[0.06]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
              {['ชื่อ', 'ราคา', 'สต็อก', 'หมวดหมู่', 'สถานะ', ''].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-bold text-zinc-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {visibleProducts.map((p) => (
              <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 text-white font-medium">{p.name}</td>
                <td className="px-4 py-3 text-zinc-300">฿{p.price.toLocaleString()}/{p.unit}</td>
                <td className="px-4 py-3 text-zinc-300">{p.stock}</td>
                <td className="px-4 py-3 text-zinc-400">{p.category}</td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleActive(p.id)} className="flex items-center gap-1.5">
                    {p.active && p.stock > 0
                      ? <><ToggleRight className="w-5 h-5 text-emerald-400" /><span className="text-xs text-emerald-400">ขายอยู่</span></>
                      : <><ToggleLeft className="w-5 h-5 text-zinc-600" /><span className="text-xs text-zinc-500">หมด</span></>
                    }
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => startEdit(p)} className="p-1.5 text-zinc-500 hover:text-orange-400 transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => deleteProduct(p.id)} className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visibleProducts.length === 0 && (
          <p className="text-center py-12 text-zinc-600 text-sm">
            {products.length === 0 ? 'ยังไม่มีสินค้า — กด "เพิ่มสินค้า" เพื่อเริ่มต้น' : 'ไม่พบสินค้าที่ตรงกับการค้นหา'}
          </p>
        )}
      </div>
    </div>
  );
}

function FAQTabConnected({ faqs, setFaqs }) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ q: '', a: '' });

  const handleSubmit = () => {
    if (!form.q || !form.a) return;
    if (editId !== null) {
      setFaqs((prev) => prev.map((f) => (f.id === editId ? { ...f, ...form } : f)));
      setEditId(null);
    } else {
      setFaqs((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    setForm({ q: '', a: '' });
    setShowForm(false);
  };

  const startEdit = (f) => { setForm({ q: f.q, a: f.a }); setEditId(f.id); setShowForm(true); };
  const deleteFaq = (id) => setFaqs((prev) => prev.filter((f) => f.id !== id));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">{faqs.length} คำถาม</p>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm({ q: '', a: '' }); }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-xl text-sm text-white font-semibold transition-all"
        >
          <Plus className="w-4 h-4" />
          เพิ่มคำถาม
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-white/[0.03] border border-orange-500/20 rounded-2xl p-5 space-y-4"
          >
            <p className="text-sm font-bold text-white">{editId ? 'แก้ไขคำถาม' : 'เพิ่มคำถามใหม่'}</p>
            <div>
              <label className={labelCls()}>คำถาม *</label>
              <input className={inputCls()} placeholder="เช่น สินค้าส่งนานไหม?" value={form.q} onChange={(e) => setForm({ ...form, q: e.target.value })} />
            </div>
            <div>
              <label className={labelCls()}>คำตอบ *</label>
              <textarea className={inputCls('resize-none')} rows={3} placeholder="คำตอบที่ AI จะใช้ตอบลูกค้า" value={form.a} onChange={(e) => setForm({ ...form, a: e.target.value })} />
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">ยกเลิก</button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-xl text-sm text-white font-semibold transition-all">{editId ? 'บันทึก' : 'เพิ่มคำถาม'}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-x-auto rounded-2xl border border-white/[0.06]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
              {['คำถาม', 'คำตอบ', ''].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-bold text-zinc-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {faqs.map((f) => (
              <tr key={f.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 text-white font-medium max-w-[220px]">{f.q}</td>
                <td className="px-4 py-3 text-zinc-400 max-w-xs">{f.a}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => startEdit(f)} className="p-1.5 text-zinc-500 hover:text-orange-400 transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => deleteFaq(f.id)} className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {faqs.length === 0 && <p className="text-center py-12 text-zinc-600 text-sm">ยังไม่มีคำถาม — กด "เพิ่มคำถาม" เพื่อเริ่มต้น</p>}
      </div>
    </div>
  );
}
