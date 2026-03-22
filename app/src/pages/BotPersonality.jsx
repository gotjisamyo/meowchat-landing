import { useState } from 'react';
import PageLayout from '../components/PageLayout';
import PersonalityEditor from '../components/PersonalityEditor';

// Preset personality templates for quick-select
const PRESETS = [
  {
    id: 'kawaii',
    icon: '🐱',
    label: 'น้องแมว',
    desc: 'ใจดี เป็นกันเอง น่ารัก',
    personality: {
      name: 'น้องมีม',
      avatar: '🐱',
      pronoun: 'หนู',
      tone: 'cute',
      traits: { friendly: 5, professional: 2, cute: 5, energetic: 4, warmth: 5 },
      greeting: 'สวัสดีค่ะ! หนูน้องมีมยินดีช่วยเหลือนะคะ 🐱✨',
      goodbye: 'ขอบคุณที่ใช้บริการนะคะ แวะมาใหม่ได้เสมอเลยค่ะ 💕',
      fallback: 'ขอโทษนะคะ หนูยังไม่เข้าใจ ลองถามใหม่อีกครั้งได้เลยค่ะ 🙏',
      upsell: 'มีสินค้าใหม่เข้ามาด้วยนะคะ อยากดูไหมคะ? 🛍️',
    },
  },
  {
    id: 'professional',
    icon: '🎩',
    label: 'มืออาชีพ',
    desc: 'สุภาพ มีระเบียบ ให้ข้อมูลครบ',
    personality: {
      name: 'ผู้ช่วย',
      avatar: '👨',
      pronoun: 'ผม',
      tone: 'professional',
      traits: { friendly: 3, professional: 5, cute: 1, energetic: 3, warmth: 3 },
      greeting: 'สวัสดีครับ ยินดีให้บริการ กรุณาแจ้งความต้องการได้เลยครับ',
      goodbye: 'ขอบคุณที่ใช้บริการครับ หากมีคำถามเพิ่มเติม ติดต่อได้ตลอดเวลา',
      fallback: 'ขออภัยครับ ขณะนี้ไม่สามารถตอบคำถามนี้ได้ กรุณาติดต่อเจ้าหน้าที่',
      upsell: 'ทางร้านมีสินค้าและบริการเพิ่มเติมที่อาจเป็นประโยชน์กับคุณครับ',
    },
  },
  {
    id: 'energetic',
    icon: '🔥',
    label: 'ตื่นเต้น',
    desc: 'กระตือรือร้น มีพลัง กระชับ',
    personality: {
      name: 'น้องไฟ',
      avatar: '🤖',
      pronoun: 'เขา',
      tone: 'casual',
      traits: { friendly: 5, professional: 2, cute: 3, energetic: 5, warmth: 4 },
      greeting: 'หวัดดี!! พร้อมช่วยแล้ว บอกมาเลย! 🔥🚀',
      goodbye: 'เยี่ยมมาก! แวะมาใหม่ได้เลยนะ! 💪',
      fallback: 'อ๋อ! ยังไม่ได้เรื่องนี้ แต่เดี๋ยวให้คนมาช่วยเลย!',
      upsell: 'โปรเด็ดอยู่นี่!! รีบดูก่อนหมด! 🎉',
    },
  },
];

export default function BotPersonality({ setSidebarOpen }) {
  const [selectedPreset, setSelectedPreset] = useState('kawaii');
  const [appliedPersonality, setAppliedPersonality] = useState(PRESETS[0].personality);

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset.id);
    setAppliedPersonality(preset.personality);
  };

  return (
    <PageLayout
      title="บุคลิกของบอท"
      subtitle="ตั้งค่าตัวตนและสไตล์การพูดของผู้ช่วย AI"
      setSidebarOpen={setSidebarOpen}
    >
      {/* Preset quick-select buttons */}
      <div className="mb-6">
        <p className="text-sm text-zinc-400 mb-3 font-medium">เลือก Template สำเร็จรูป</p>
        <div className="flex flex-wrap gap-3">
          {PRESETS.map((preset) => {
            const isActive = selectedPreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-orange-500/15 border-orange-500/50 shadow-lg shadow-orange-500/10'
                    : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05]'
                }`}
              >
                <span className="text-2xl">{preset.icon}</span>
                <div>
                  <p className={`text-sm font-bold leading-tight ${isActive ? 'text-orange-300' : 'text-white'}`}>
                    {preset.label}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">{preset.desc}</p>
                </div>
                {isActive && (
                  <span className="ml-1 w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <PersonalityEditor key={selectedPreset} initialPersonality={appliedPersonality} />
    </PageLayout>
  );
}
