import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Constants ────────────────────────────────────────────────────────────────

const AVATAR_OPTIONS = ['🐱', '🐶', '🐰', '🦊', '👩', '👨', '🤖', '🌸'];

const PRONOUN_OPTIONS = [
  { value: 'หนู', label: 'หนู' },
  { value: 'ผม', label: 'ผม' },
  { value: 'เขา', label: 'เขา' },
  { value: 'หนูน้อง', label: 'หนูน้อง' },
];

const TRAITS = [
  { key: 'friendly',     label: 'ความเป็นมิตร',      emoji: '😊', labelEn: 'Friendly' },
  { key: 'professional', label: 'ความเป็นทางการ',     emoji: '👔', labelEn: 'Professional' },
  { key: 'cute',         label: 'ความน่ารัก',          emoji: '🌸', labelEn: 'Cute / Kawaii' },
  { key: 'energetic',    label: 'ความกระตือรือร้น',   emoji: '⚡', labelEn: 'Energetic' },
  { key: 'warmth',       label: 'ความอบอุ่น',          emoji: '🤗', labelEn: 'Warmth' },
];

const TONES = [
  {
    value: 'cute',
    emoji: '🌸',
    label: 'น่ารัก',
    desc: 'ใช้คำว่า "นะคะ", "ค่ะ", emoji เยอะ',
    sample: (name, pronoun) =>
      `สวัสดีค่ะ! ${pronoun}${name}ยินดีให้บริการเลยนะคะ 🐱✨ มีอะไรให้ช่วยบ้างคะ? 💕`,
  },
  {
    value: 'professional',
    emoji: '💼',
    label: 'มืออาชีพ',
    desc: 'สุภาพ ตรงไปตรงมา ไม่มี emoji มาก',
    sample: (name, pronoun) =>
      `สวัสดีครับ/ค่ะ ยินดีให้บริการ ${pronoun}${name}พร้อมช่วยเหลือคุณ กรุณาแจ้งความต้องการได้เลย`,
  },
  {
    value: 'casual',
    emoji: '😎',
    label: 'เป็นกันเอง',
    desc: 'ใช้ "นะ", "เลย", พูดเหมือนเพื่อน',
    sample: (name, pronoun) =>
      `หวัดดีนะ! ${pronoun}${name}นี่เอง มีอะไรให้ช่วยเปล่า? บอกมาได้เลย 😄`,
  },
  {
    value: 'expert',
    emoji: '🤓',
    label: 'ผู้เชี่ยวชาญ',
    desc: 'ให้ข้อมูลละเอียด อธิบายครบ',
    sample: (name, pronoun) =>
      `สวัสดีครับ/ค่ะ ${pronoun}${name}ยินดีให้คำแนะนำและข้อมูลเชิงลึกแก่คุณ กรุณาระบุคำถามหรือข้อสงสัย เพื่อที่จะสามารถให้คำตอบที่ครบถ้วนและถูกต้องที่สุด`,
  },
];

const DEFAULT_PERSONALITY = {
  name: 'น้องมีม',
  avatar: '🐱',
  pronoun: 'หนู',
  tone: 'cute',
  traits: { friendly: 5, professional: 2, cute: 5, energetic: 4, warmth: 5 },
  greeting: 'สวัสดีค่ะ! หนูน้องมีมยินดีช่วยเหลือนะคะ 🐱✨',
  goodbye: 'ขอบคุณที่ใช้บริการนะคะ แวะมาใหม่ได้เสมอเลยค่ะ 💕',
  fallback: 'ขอโทษนะคะ หนูยังไม่เข้าใจ ลองถามใหม่อีกครั้งได้เลยค่ะ 🙏',
  upsell: 'มีสินค้าใหม่เข้ามาด้วยนะคะ อยากดูไหมคะ? 🛍️',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionCard({ title, subtitle, children }) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 space-y-5">
      <div>
        <h3 className="text-white font-bold text-base">{title}</h3>
        {subtitle && <p className="text-zinc-500 text-sm mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function TraitSlider({ trait, value, onChange }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-300 flex items-center gap-2">
          <span>{trait.emoji}</span>
          <span>{trait.label}</span>
          <span className="text-zinc-600 text-xs hidden sm:inline">({trait.labelEn})</span>
        </span>
        {/* Filled-circle indicator */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => onChange(n)}
              className={`w-5 h-5 rounded-full border-2 transition-all duration-150 ${
                n <= value
                  ? 'bg-orange-500 border-orange-500 shadow-sm shadow-orange-500/40'
                  : 'bg-transparent border-zinc-600 hover:border-orange-400'
              }`}
              aria-label={`${trait.label} ${n}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ avatar, name, message, isBot = true }) {
  return (
    <div className={`flex items-end gap-2 ${isBot ? '' : 'flex-row-reverse'}`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center text-base flex-shrink-0 shadow-md shadow-orange-500/30">
          {avatar}
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isBot
            ? 'bg-white/[0.06] border border-white/[0.08] text-zinc-200 rounded-bl-sm'
            : 'bg-gradient-to-br from-orange-500 to-orange-400 text-white rounded-br-sm'
        }`}
      >
        {message}
      </div>
    </div>
  );
}

function Toast({ show, message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white font-semibold text-sm px-6 py-3 rounded-2xl shadow-xl shadow-emerald-900/40 flex items-center gap-2"
        >
          <span>✅</span>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PersonalityEditor({ initialPersonality }) {
  const [personality, setPersonality] = useState(
    initialPersonality ?? DEFAULT_PERSONALITY
  );
  const [showToast, setShowToast] = useState(false);

  // Helper to update a single top-level field
  const set = (field, value) =>
    setPersonality((prev) => ({ ...prev, [field]: value }));

  // Helper to update a trait score
  const setTrait = (key, value) =>
    setPersonality((prev) => ({
      ...prev,
      traits: { ...prev.traits, [key]: value },
    }));

  // Derive live preview message from current tone / name / pronoun
  const activeTone = TONES.find((t) => t.value === personality.tone) ?? TONES[0];
  const previewGreeting = activeTone.sample(personality.name || 'บอท', personality.pronoun);

  function handleSave() {
    // In a real app this would POST to an API. For now we persist to localStorage.
    localStorage.setItem('meowchat_personality', JSON.stringify(personality));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }

  return (
    <div className="content-area py-6 space-y-6">

      {/* ── Section A: Identity ─────────────────────────────────────────── */}
      <SectionCard title="ก. ตัวตน" subtitle="Identity — ชื่อ รูปและสรรพนามของบอท">

        {/* Bot name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-300">ชื่อบอท</label>
          <input
            type="text"
            value={personality.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="เช่น น้องมีม, ผู้ช่วยร้านแม่หนูมี"
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors text-sm"
          />
        </div>

        {/* Avatar picker */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-300">อวาตาร์</label>
          <div className="flex flex-wrap gap-3">
            {AVATAR_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => set('avatar', emoji)}
                className={`w-12 h-12 rounded-full text-2xl flex items-center justify-center transition-all duration-150 border-2 ${
                  personality.avatar === emoji
                    ? 'border-orange-500 bg-orange-500/20 shadow-md shadow-orange-500/30 scale-110'
                    : 'border-white/[0.08] bg-white/[0.03] hover:border-orange-400/50 hover:scale-105'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Pronoun selector */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-300">สรรพนาม (บอทเรียกตัวเองว่า)</label>
          <div className="flex flex-wrap gap-2">
            {PRONOUN_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => set('pronoun', opt.value)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 border ${
                  personality.pronoun === opt.value
                    ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/30'
                    : 'bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:border-orange-400/40 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* ── Section B: Personality Traits ───────────────────────────────── */}
      <SectionCard title="ข. บุคลิก" subtitle="Personality Traits — ปรับระดับบุคลิกแต่ละด้าน (1–5)">
        <div className="space-y-4">
          {TRAITS.map((trait) => (
            <TraitSlider
              key={trait.key}
              trait={trait}
              value={personality.traits[trait.key] ?? 3}
              onChange={(v) => setTrait(trait.key, v)}
            />
          ))}
        </div>
      </SectionCard>

      {/* ── Section C: Speaking Style ────────────────────────────────────── */}
      <SectionCard title="ค. สไตล์การพูด" subtitle="Speaking Style — เลือกโทนที่บอทจะใช้">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TONES.map((tone) => (
            <button
              key={tone.value}
              onClick={() => set('tone', tone.value)}
              className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-150 ${
                personality.tone === tone.value
                  ? 'border-orange-500/60 bg-orange-500/10 shadow-md shadow-orange-500/10'
                  : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]'
              }`}
            >
              <span className="text-2xl flex-shrink-0">{tone.emoji}</span>
              <div>
                <div className={`font-bold text-sm ${personality.tone === tone.value ? 'text-orange-400' : 'text-white'}`}>
                  {tone.label}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{tone.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Sample preview */}
        <div className="mt-4 space-y-2">
          <label className="text-sm font-semibold text-zinc-400">ตัวอย่างการทักทายในสไตล์นี้</label>
          <textarea
            readOnly
            value={previewGreeting}
            rows={3}
            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-zinc-300 text-sm resize-none focus:outline-none leading-relaxed"
          />
        </div>
      </SectionCard>

      {/* ── Section D: Signature Phrases ─────────────────────────────────── */}
      <SectionCard title="ง. ประโยคเด็ด" subtitle="Signature Phrases — ประโยคสำคัญที่บอทจะใช้">
        <div className="space-y-4">
          {/* Greeting */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-zinc-300">
              👋 ทักทาย <span className="text-zinc-600 font-normal">(เริ่มต้นการสนทนา)</span>
            </label>
            <textarea
              value={personality.greeting}
              onChange={(e) => set('greeting', e.target.value)}
              rows={2}
              placeholder="เช่น สวัสดีค่ะ! หนูน้องมีมยินดีช่วยเหลือนะคะ 🐱✨"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors text-sm resize-none leading-relaxed"
            />
          </div>

          {/* Goodbye */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-zinc-300">
              👋 ลาก่อน <span className="text-zinc-600 font-normal">(จบการสนทนา)</span>
            </label>
            <textarea
              value={personality.goodbye}
              onChange={(e) => set('goodbye', e.target.value)}
              rows={2}
              placeholder="เช่น ขอบคุณที่ใช้บริการนะคะ แวะมาใหม่ได้เสมอเลยค่ะ 💕"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors text-sm resize-none leading-relaxed"
            />
          </div>

          {/* Fallback */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-zinc-300">
              🤷 ไม่เข้าใจ <span className="text-zinc-600 font-normal">(fallback เมื่อบอทไม่รู้คำตอบ)</span>
            </label>
            <textarea
              value={personality.fallback}
              onChange={(e) => set('fallback', e.target.value)}
              rows={2}
              placeholder="เช่น ขอโทษนะคะ หนูยังไม่เข้าใจ ลองถามใหม่อีกครั้งได้เลยค่ะ 🙏"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors text-sm resize-none leading-relaxed"
            />
          </div>

          {/* Upsell */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-zinc-300">
              🛍️ ชวนซื้อ <span className="text-zinc-600 font-normal">(upsell phrase)</span>
            </label>
            <textarea
              value={personality.upsell}
              onChange={(e) => set('upsell', e.target.value)}
              rows={2}
              placeholder="เช่น มีสินค้าใหม่เข้ามาด้วยนะคะ อยากดูไหมคะ? 🛍️"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors text-sm resize-none leading-relaxed"
            />
          </div>
        </div>
      </SectionCard>

      {/* ── Section E: Live Preview ──────────────────────────────────────── */}
      <SectionCard title="จ. ตัวอย่างการสนทนา" subtitle="Live Preview — อัพเดตตามการตั้งค่าของคุณ">
        <div className="bg-[#0A0A0F] rounded-xl border border-white/[0.06] p-4 space-y-3 min-h-[140px]">
          {/* Bot greeting bubble */}
          <ChatBubble
            avatar={personality.avatar}
            name={personality.name}
            message={personality.greeting || previewGreeting}
            isBot
          />
          {/* Mock customer message */}
          <ChatBubble
            message="ขอดูเมนูอาหารได้ไหมคะ?"
            isBot={false}
          />
          {/* Bot response */}
          <ChatBubble
            avatar={personality.avatar}
            name={personality.name}
            message={previewGreeting}
            isBot
          />
        </div>
        <p className="text-xs text-zinc-600 mt-2">
          * ตัวอย่างนี้ใช้ข้อความทักทายและสไตล์ที่คุณเลือกด้านบน
        </p>
      </SectionCard>

      {/* ── Section F: Save ──────────────────────────────────────────────── */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-8 py-3.5 rounded-2xl font-bold text-white text-sm shadow-lg shadow-orange-500/30 transition-all duration-200 hover:scale-105 active:scale-100"
          style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C55 50%, #FF6B35 100%)' }}
        >
          💾 บันทึกบุคลิก
        </button>
      </div>

      <Toast
        show={showToast}
        message="บันทึกแล้ว! บอทของคุณจะพูดในสไตล์นี้ทันที"
      />
    </div>
  );
}
