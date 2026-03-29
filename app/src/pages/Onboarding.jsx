import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.meowchat.store';

// ── Step 1: Business Type ─────────────────────────────────────────────────────

const BUSINESS_TYPES = [
  { id: 'food',       icon: '🍱', label: 'ร้านอาหาร/คาเฟ่' },
  { id: 'fashion',    icon: '👗', label: 'แฟชั่น/เครื่องแต่งกาย' },
  { id: 'beauty',     icon: '💆', label: 'ความงาม/สปา' },
  { id: 'clinic',     icon: '🏥', label: 'คลินิก/สุขภาพ' },
  { id: 'hotel',      icon: '🏨', label: 'โรงแรม/ที่พัก' },
  { id: 'education',  icon: '🎓', label: 'การศึกษา/สอนพิเศษ' },
  { id: 'repair',     icon: '🔧', label: 'ซ่อมบำรุง/ช่าง' },
  { id: 'automotive', icon: '🚗', label: 'ยานยนต์' },
  { id: 'b2b',        icon: '🏭', label: 'B2B/ตัวแทนจำหน่าย' },
  { id: 'other',      icon: '✨', label: 'อื่นๆ' },
];

function Step1({ data, setData, onNext }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">เลือกประเภทธุรกิจ</h2>
        <p className="text-zinc-400 text-sm">บอทจะปรับตัวให้เหมาะกับธุรกิจของคุณ</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {BUSINESS_TYPES.map((type) => {
          const selected = data.businessType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => setData((d) => ({ ...d, businessType: type.id }))}
              className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 transition-all duration-150 cursor-pointer
                ${selected
                  ? 'border-orange-500 bg-orange-500/10 text-white'
                  : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:border-orange-500/50 hover:bg-orange-500/5'
                }`}
            >
              <span className="text-3xl">{type.icon}</span>
              <span className="text-sm font-medium text-center leading-tight">{type.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end mt-2">
        <button
          onClick={onNext}
          disabled={!data.businessType}
          className="px-6 py-3 rounded-xl font-semibold text-sm transition-all
            bg-orange-500 text-white hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ถัดไป →
        </button>
      </div>
    </div>
  );
}

// ── Step 2: Shop Info ─────────────────────────────────────────────────────────

const HOURS = Array.from({ length: 17 }, (_, i) => {
  const h = i + 6;
  return `${String(h).padStart(2, '0')}:00`;
});

const PLATFORMS = ['LINE OA', 'Facebook', 'Instagram', 'Shopee', 'Lazada', 'TikTok'];

function Step2({ data, setData, onNext, onBack }) {
  const toggle = (platform) => {
    setData((d) => {
      const set = new Set(d.platforms);
      set.has(platform) ? set.delete(platform) : set.add(platform);
      return { ...d, platforms: set };
    });
  };

  const canNext = data.shopName.trim() && data.contact.trim();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">ข้อมูลร้าน</h2>
        <p className="text-zinc-400 text-sm">กรอกข้อมูลพื้นฐานของร้านคุณ</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Shop name */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            ชื่อร้าน <span className="text-orange-400">*</span>
          </label>
          <input
            type="text"
            placeholder="เช่น ร้านส้มตำป้าแดง"
            value={data.shopName}
            onChange={(e) => setData((d) => ({ ...d, shopName: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/60 transition"
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            เบอร์โทร / LINE ID <span className="text-orange-400">*</span>
          </label>
          <input
            type="text"
            placeholder="เช่น 0812345678 หรือ @myshop"
            value={data.contact}
            onChange={(e) => setData((d) => ({ ...d, contact: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/60 transition"
          />
        </div>

        {/* Hours */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">เวลาเปิด</label>
            <select
              value={data.openTime}
              onChange={(e) => setData((d) => ({ ...d, openTime: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1a2e] border border-white/10 text-white focus:outline-none focus:border-orange-500/60 transition"
            >
              {HOURS.map((h) => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">เวลาปิด</label>
            <select
              value={data.closeTime}
              onChange={(e) => setData((d) => ({ ...d, closeTime: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-[#1a1a2e] border border-white/10 text-white focus:outline-none focus:border-orange-500/60 transition"
            >
              {HOURS.map((h) => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
        </div>

        {/* Platforms */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">แพลตฟอร์ม</label>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => {
              const checked = data.platforms.has(p);
              return (
                <button
                  key={p}
                  onClick={() => toggle(p)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all
                    ${checked
                      ? 'border-orange-500 bg-orange-500/15 text-orange-300'
                      : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-orange-500/40'
                    }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl font-semibold text-sm border border-white/10 text-zinc-300 hover:bg-white/5 transition"
        >
          ← ย้อน
        </button>
        <button
          onClick={onNext}
          disabled={!canNext}
          className="px-6 py-3 rounded-xl font-semibold text-sm transition-all bg-orange-500 text-white hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ถัดไป →
        </button>
      </div>
    </div>
  );
}

// ── Step 3: Bot Personality ───────────────────────────────────────────────────

const BOT_STYLES = [
  {
    id: 'cute',
    icon: '🌸',
    label: 'น่ารัก',
    desc: '"นะคะ", emoji เยอะ',
    greeting: (name) => `สวัสดีค่ะ~ 🌸✨ ยินดีต้อนรับเลยนะคะ! 😊💕 มีอะไรให้ ${name || 'น้องมีม'} ช่วยได้บ้างคะ~?`,
  },
  {
    id: 'pro',
    icon: '💼',
    label: 'มืออาชีพ',
    desc: 'สุภาพ ตรงไปตรงมา',
    greeting: (name) => `สวัสดีครับ ยินดีต้อนรับสู่บริการของเรา ผม${name || 'น้องมีม'} พร้อมให้ความช่วยเหลือคุณครับ`,
  },
  {
    id: 'casual',
    icon: '😎',
    label: 'เป็นกันเอง',
    desc: 'พูดเหมือนเพื่อน',
    greeting: (name) => `เฮ้! สวัสดีจ้า 👋 ${name || 'น้องมีม'} นี่แหละ มีอะไรให้ช่วยมั้ย?`,
  },
  {
    id: 'expert',
    icon: '🤓',
    label: 'ผู้เชี่ยวชาญ',
    desc: 'ข้อมูลละเอียด',
    greeting: (name) => `สวัสดีครับ ผม${name || 'น้องมีม'} ผู้ช่วยอัจฉริยะ ผมพร้อมให้ข้อมูลเชิงลึกและคำแนะนำที่ครบถ้วนสำหรับคุณครับ`,
  },
];

function Step3({ data, setData, onNext, onBack }) {
  const selected = BOT_STYLES.find((s) => s.id === data.botStyle);
  const canNext = data.botStyle;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">บุคลิกบอท</h2>
        <p className="text-zinc-400 text-sm">เลือกสไตล์การตอบที่เหมาะกับแบรนด์คุณ</p>
      </div>

      {/* Bot name */}
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1.5">ชื่อบอท</label>
        <input
          type="text"
          placeholder="น้องมีม"
          value={data.botName}
          onChange={(e) => setData((d) => ({ ...d, botName: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/60 transition"
        />
      </div>

      {/* Style cards */}
      <div className="grid grid-cols-2 gap-3">
        {BOT_STYLES.map((style) => {
          const active = data.botStyle === style.id;
          return (
            <button
              key={style.id}
              onClick={() => setData((d) => ({ ...d, botStyle: style.id }))}
              className={`text-left p-4 rounded-2xl border-2 transition-all
                ${active
                  ? 'border-orange-500 bg-orange-500/10'
                  : 'border-white/10 bg-white/[0.03] hover:border-orange-500/40'
                }`}
            >
              <span className="text-2xl block mb-1">{style.icon}</span>
              <p className={`font-semibold text-sm ${active ? 'text-white' : 'text-zinc-200'}`}>{style.label}</p>
              <p className="text-xs text-zinc-400 mt-0.5">{style.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Preview bubble */}
      {selected && (
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4">
          <p className="text-xs font-medium text-zinc-500 mb-2 uppercase tracking-wide">ตัวอย่างข้อความ</p>
          <div className="flex gap-2 items-start">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-lg flex-shrink-0">
              {selected.icon}
            </div>
            <div className="bg-white/[0.06] rounded-2xl rounded-tl-none px-4 py-3 text-sm text-zinc-200 leading-relaxed max-w-xs">
              {selected.greeting(data.botName)}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-2">
        <button onClick={onBack} className="px-6 py-3 rounded-xl font-semibold text-sm border border-white/10 text-zinc-300 hover:bg-white/5 transition">
          ← ย้อน
        </button>
        <button
          onClick={onNext}
          disabled={!canNext}
          className="px-6 py-3 rounded-xl font-semibold text-sm transition-all bg-orange-500 text-white hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ถัดไป →
        </button>
      </div>
    </div>
  );
}

// ── Step 4: First Product (optional) ─────────────────────────────────────────

function Step4({ data, setData, onNext, onBack }) {
  const [form, setForm] = useState({ name: '', price: '', stock: '' });

  const addItem = () => {
    if (!form.name.trim() || !form.price.trim()) return;
    setData((d) => ({
      ...d,
      products: [...d.products, { ...form, id: Date.now() }],
    }));
    setForm({ name: '', price: '', stock: '' });
  };

  const removeItem = (id) => {
    setData((d) => ({ ...d, products: d.products.filter((p) => p.id !== id) }));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">เพิ่มสินค้าแรก</h2>
          <p className="text-zinc-400 text-sm">บอทจะตอบลูกค้าเรื่องราคาจากข้อมูลนี้</p>
        </div>
        <button
          onClick={onNext}
          className="text-xs text-zinc-400 hover:text-orange-400 transition underline underline-offset-2 mt-1"
        >
          ข้ามก่อน
        </button>
      </div>

      {/* Add form */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="ชื่อสินค้า"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="flex-1 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/60 transition text-sm"
        />
        <input
          type="number"
          placeholder="ราคา (฿)"
          value={form.price}
          onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          className="w-full sm:w-28 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/60 transition text-sm"
        />
        <input
          type="number"
          placeholder="สต็อก"
          value={form.stock}
          onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
          className="w-full sm:w-24 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/60 transition text-sm"
        />
        <button
          onClick={addItem}
          disabled={!form.name.trim() || !form.price.trim()}
          className="px-5 py-3 rounded-xl font-semibold text-sm bg-orange-500 text-white hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          + เพิ่ม
        </button>
      </div>

      {/* Product list */}
      {data.products.length > 0 && (
        <div className="flex flex-col gap-2">
          {data.products.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{item.name}</p>
                <p className="text-xs text-zinc-400">฿{Number(item.price).toLocaleString()} {item.stock ? `· สต็อก ${item.stock}` : ''}</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="ml-3 text-zinc-500 hover:text-red-400 transition text-lg leading-none"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {data.products.length === 0 && (
        <div className="text-center py-6 text-zinc-500 text-sm bg-white/[0.02] rounded-2xl border border-dashed border-white/10">
          ยังไม่มีสินค้า — เพิ่มได้เลยหรือข้ามก่อนก็ได้
        </div>
      )}

      <p className="text-xs text-zinc-500 text-center">
        💡 บอทจะตอบลูกค้าเรื่องราคาจากข้อมูลนี้
      </p>

      <div className="flex justify-between mt-2">
        <button onClick={onBack} className="px-6 py-3 rounded-xl font-semibold text-sm border border-white/10 text-zinc-300 hover:bg-white/5 transition">
          ← ย้อน
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 rounded-xl font-semibold text-sm bg-orange-500 text-white hover:bg-orange-400 transition"
        >
          ถัดไป →
        </button>
      </div>
    </div>
  );
}

// ── Step 5: Connect LINE OA ───────────────────────────────────────────────────

function Step5({ data, setData, onFinish, onBack }) {
  const [showToken, setShowToken] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleTest = async () => {
    // Demo Bypass
    const storedUser = JSON.parse(localStorage.getItem('meowchat_user') || '{}');
    if (storedUser.email === 'omise_test@meowchat.store' || storedUser.email === 'god@meowchat.store') {
      setTesting(true);
      setTimeout(() => {
        setTestResult('success');
        setTesting(false);
      }, 800);
      return;
    }

    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch(`${API_URL}/api/line/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('meowchat_token')}`,
        },
        body: JSON.stringify({
          channelAccessToken: data.lineToken,
          channelSecret: data.lineSecret,
        }),
      });
      if (res.ok) {
        setTestResult('success');
      } else {
        setTestResult('error');
      }
    } catch {
      // Network error or backend not reachable
      setTestResult('error');
    } finally {
      setTesting(false);
    }
  };

  const EyeIcon = ({ show }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {show ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      )}
    </svg>
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">เชื่อมต่อ LINE OA</h2>
          <p className="text-zinc-400 text-sm">เชื่อมบอทกับ LINE Official Account ของคุณ</p>
        </div>
        <button
          onClick={onFinish}
          className="text-xs text-zinc-400 hover:text-orange-400 transition underline underline-offset-2 mt-1"
        >
          ข้ามก่อน ตั้งค่าทีหลัง
        </button>
      </div>

      {/* Instructions card */}
      <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4 space-y-2.5">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-semibold text-blue-300">วิธีเชื่อมต่อ</p>
          <a
            href="/line-setup-guide"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-orange-400 hover:text-orange-300 transition underline underline-offset-2"
          >
            ดูคู่มือแบบละเอียด →
          </a>
        </div>
        {[
          'ไปที่ LINE Official Account Manager',
          'Settings → Messaging API → เปิดใช้งาน',
          'คัดลอก Channel Access Token',
          'วางที่นี่ ↓',
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <p className="text-sm text-zinc-300">{step}</p>
          </div>
        ))}
      </div>

      {/* Token inputs */}
      <div className="flex flex-col gap-3">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">Channel Access Token</label>
          <div className="relative">
            <input
              type={showToken ? 'text' : 'password'}
              placeholder="วาง Channel Access Token ที่นี่"
              value={data.lineToken}
              onChange={(e) => setData((d) => ({ ...d, lineToken: e.target.value }))}
              className="w-full px-4 py-3 pr-11 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/60 transition text-sm"
            />
            <button
              onClick={() => setShowToken((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition"
            >
              <EyeIcon show={showToken} />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">Channel Secret</label>
          <div className="relative">
            <input
              type={showSecret ? 'text' : 'password'}
              placeholder="วาง Channel Secret ที่นี่"
              value={data.lineSecret}
              onChange={(e) => setData((d) => ({ ...d, lineSecret: e.target.value }))}
              className="w-full px-4 py-3 pr-11 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500/60 transition text-sm"
            />
            <button
              onClick={() => setShowSecret((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition"
            >
              <EyeIcon show={showSecret} />
            </button>
          </div>
        </div>
      </div>

      {/* Test button + result */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <button
            onClick={handleTest}
            disabled={!data.lineToken || !data.lineSecret || testing}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm border border-orange-500/50 text-orange-400 hover:bg-orange-500/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {testing ? 'กำลังทดสอบ...' : 'ทดสอบการเชื่อมต่อ'}
          </button>
          {testResult === 'success' && (
            <span className="text-sm font-semibold text-emerald-400">✅ เชื่อมต่อสำเร็จ</span>
          )}
          {testResult === 'error' && (
            <span className="text-sm font-semibold text-red-400">❌ ไม่สามารถเชื่อมต่อได้ กรุณาตรวจสอบ Channel Access Token อีกครั้ง</span>
          )}
        </div>
        <p className="text-xs text-zinc-500">หาก Channel Access Token ไม่ถูกต้อง บอทจะไม่สามารถตอบข้อความได้</p>
        <button
          onClick={onFinish}
          className="self-start text-xs text-zinc-400 hover:text-orange-400 transition underline underline-offset-2"
        >
          ข้ามขั้นตอนนี้ก่อน
        </button>
      </div>

      <div className="flex justify-between mt-2">
        <button onClick={onBack} className="px-6 py-3 rounded-xl font-semibold text-sm border border-white/10 text-zinc-300 hover:bg-white/5 transition">
          ← ย้อน
        </button>
        <button
          onClick={onFinish}
          className="px-6 py-3 rounded-xl font-semibold text-sm bg-orange-500 text-white hover:bg-orange-400 transition"
        >
          เสร็จสิ้น!
        </button>
      </div>
    </div>
  );
}

// ── Completion Screen ─────────────────────────────────────────────────────────

function CompletionScreen({ botName, onboardingData, navigate }) {
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const handleGoDashboard = async () => {
    // Demo Bypass
    const storedUser = JSON.parse(localStorage.getItem('meowchat_user') || '{}');
    if (storedUser.email === 'omise_test@meowchat.store' || storedUser.email === 'god@meowchat.store') {
      setSaving(true);
      setTimeout(() => {
        localStorage.setItem('onboardingComplete', 'true');
        navigate('/dashboard');
        setSaving(false);
      }, 1000);
      return;
    }

    setSaving(true);
    setSaveError(null);
    try {
      const payload = {
        businessType: onboardingData.businessType,
        shopName: onboardingData.shopName,
        contact: onboardingData.contact,
        openTime: onboardingData.openTime,
        closeTime: onboardingData.closeTime,
        platforms: Array.from(onboardingData.platforms),
        botName: onboardingData.botName,
        botStyle: onboardingData.botStyle,
        products: onboardingData.products,
        lineToken: onboardingData.lineToken,
        lineSecret: onboardingData.lineSecret,
      };

      const res = await fetch(`${API_URL}/api/bots/setup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('meowchat_token')}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'บันทึกข้อมูลไม่สำเร็จ');
      }

      localStorage.setItem('onboardingComplete', 'true');
      navigate('/dashboard');
    } catch (err) {
      setSaveError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* Animated emoji */}
      <style>{`
        @keyframes popIn {
          0%   { transform: scale(0.3); opacity: 0; }
          60%  { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .pop-in { animation: popIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>

      <div className="pop-in text-8xl mb-6">🎉</div>

      <h1 className="text-3xl font-bold text-white mb-2">พร้อมรับลูกค้าแล้ว! 🚀</h1>
      <p className="text-zinc-400 mb-8 text-lg">
        บอทของคุณชื่อ{' '}
        <span className="text-orange-400 font-semibold">{botName || 'น้องมีม'}</span>{' '}
        พร้อมตอบแชทแล้ว
      </p>

      {saveError && (
        <div className="mb-4 px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm max-w-sm">
          {saveError}
        </div>
      )}

      <button
        onClick={handleGoDashboard}
        disabled={saving}
        className="px-8 py-4 rounded-2xl font-bold text-lg bg-orange-500 text-white hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-orange-500/25"
      >
        {saving ? 'กำลังบันทึก...' : 'ไปดู Dashboard →'}
      </button>
    </div>
  );
}

// ── Progress Dots ─────────────────────────────────────────────────────────────

function ProgressDots({ step, total }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i < step
              ? 'w-6 h-2.5 bg-orange-500'
              : i === step
              ? 'w-6 h-2.5 bg-orange-400'
              : 'w-2.5 h-2.5 bg-white/15'
          }`}
        />
      ))}
      <span className="ml-2 text-xs text-zinc-500 font-medium">
        {step + 1} / {total}
      </span>
    </div>
  );
}

// ── Main Onboarding Component ─────────────────────────────────────────────────

const TOTAL_STEPS = 5;

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const [data, setData] = useState({
    businessType: '',
    shopName: '',
    contact: '',
    openTime: '09:00',
    closeTime: '18:00',
    platforms: new Set(['LINE OA']),
    botName: '',
    botStyle: '',
    products: [],
    lineToken: '',
    lineSecret: '',
  });

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const finish = () => setDone(true);

  if (done) {
    return <CompletionScreen botName={data.botName} onboardingData={data} navigate={navigate} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col">
      {/* Header bar with progress */}
      <div className="w-full px-6 pt-6 pb-4 flex items-center justify-between max-w-2xl mx-auto w-full">
        {/* Logo / wordmark */}
        <span className="text-lg font-bold text-white tracking-tight">
          Meow<span className="text-orange-400">Chat</span>
        </span>
        <ProgressDots step={step} total={TOTAL_STEPS} />
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-white/[0.06]">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-500"
          style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-start justify-center px-6 py-10">
        <div className="w-full max-w-2xl">
          {step === 0 && <Step1 data={data} setData={setData} onNext={next} />}
          {step === 1 && <Step2 data={data} setData={setData} onNext={next} onBack={back} />}
          {step === 2 && <Step3 data={data} setData={setData} onNext={next} onBack={back} />}
          {step === 3 && <Step4 data={data} setData={setData} onNext={next} onBack={back} />}
          {step === 4 && <Step5 data={data} setData={setData} onFinish={finish} onBack={back} />}
        </div>
      </div>
    </div>
  );
}
