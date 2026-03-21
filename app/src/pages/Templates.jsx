import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Sparkles, CheckCircle } from 'lucide-react';
import PageLayout from '../components/PageLayout';

// ─── Category badge colors ────────────────────────────────────────────────────
const badgeColor = {
  'ต้อนรับ':      'bg-blue-500/15 text-blue-400 border-blue-500/20',
  'สอบถาม':       'bg-purple-500/15 text-purple-400 border-purple-500/20',
  'ปิดการขาย':    'bg-green-500/15 text-green-400 border-green-500/20',
  'หลังการขาย':   'bg-orange-500/15 text-orange-400 border-orange-500/20',
};

// ─── Template data by business type ──────────────────────────────────────────
const templateData = {
  food: {
    label: '🍱 ร้านอาหาร',
    templates: [
      {
        name: 'ทักทายและแนะนำร้าน',
        category: 'ต้อนรับ',
        text: 'สวัสดีครับ! 🍱 ยินดีต้อนรับสู่ [ชื่อร้าน] วันนี้มีเมนูอะไรอยากลองครับ? กด \'เมนูวันนี้\' เลยครับ',
      },
      {
        name: 'แนะนำเมนูวันนี้',
        category: 'สอบถาม',
        text: 'เมนูวันนี้ครับ 🍱\n• [เมนู 1] ฿[ราคา]\n• [เมนู 2] ฿[ราคา]\n• [เมนู 3] ฿[ราคา]\nรับออเดอร์ถึง [เวลา] นะครับ 📲',
      },
      {
        name: 'ยืนยันออเดอร์',
        category: 'ปิดการขาย',
        text: 'ยืนยันออเดอร์ครับ ✅\n[รายการ] x[จำนวน] = ฿[ราคา]\nที่อยู่จัดส่ง: [ที่อยู่]\nคาดว่าจะถึงใน [เวลา] ครับ 🚚',
      },
      {
        name: 'แจ้งสถานะจัดส่ง',
        category: 'หลังการขาย',
        text: 'จัดส่งแล้วครับ! 🚚\nเลขพัสดุ: [tracking]\nตรวจสอบได้ที่ [ลิงก์] ครับ',
      },
      {
        name: 'ขอบคุณและขอรีวิว',
        category: 'หลังการขาย',
        text: 'ขอบคุณมากครับ! 🙏 รีวิวได้ที่ [ลิงก์] นะครับ หวังว่าจะได้ต้อนรับอีกครั้งครับ 😊',
      },
    ],
  },
  fashion: {
    label: '👗 แฟชั่น',
    templates: [
      {
        name: 'ต้อนรับร้านแฟชั่น',
        category: 'ต้อนรับ',
        text: 'สวัสดีค่า! 👗 ยินดีต้อนรับสู่ [ชื่อร้าน] วันนี้มีคอลเลกชั่นใหม่เพิ่งเข้าค่า กดดูได้เลยนะคะ ✨',
      },
      {
        name: 'สอบถามไซส์',
        category: 'สอบถาม',
        text: 'ขอทราบรูปร่างเพื่อแนะนำไซส์ที่ใช่ให้ค่า 😊\n• ส่วนสูง: [ซม.]\n• น้ำหนัก: [กก.]\n• รอบอก/เอว/สะโพก: [ซม.]\nจะแนะนำไซส์ให้เลยค่า!',
      },
      {
        name: 'แนะนำสินค้าและราคา',
        category: 'สอบถาม',
        text: '[ชื่อสินค้า] ค่า 💕\n• ราคา: ฿[ราคา]\n• ไซส์ที่มี: [ไซส์]\n• วัสดุ: [วัสดุ]\nสั่งได้เลยนะคะ หรือดูรูปเพิ่มได้ที่ [ลิงก์] ค่า',
      },
      {
        name: 'ปิดการขายและยืนยัน',
        category: 'ปิดการขาย',
        text: 'ยืนยันออเดอร์ค่า ✅\n[สินค้า] ไซส์ [ไซส์] สี [สี] = ฿[ราคา]\nจัดส่งภายใน [วัน] วันทำการค่า 📦',
      },
      {
        name: 'ติดตามสินค้าและรีวิว',
        category: 'หลังการขาย',
        text: 'พัสดุส่งแล้วค่า! 🎀\nเลขพัสดุ: [tracking]\nได้รับแล้วอย่าลืมรีวิวให้ด้วยนะคะ [ลิงก์] 💕',
      },
    ],
  },
  spa: {
    label: '💆 บริการ/สปา',
    templates: [
      {
        name: 'ต้อนรับและแนะนำบริการ',
        category: 'ต้อนรับ',
        text: 'สวัสดีค่า 🌸 ยินดีต้อนรับสู่ [ชื่อสปา] วันนี้อยากดูแลตัวเองด้วยบริการไหนดีคะ? ดูโปรแกรมทั้งหมดได้เลยค่า ✨',
      },
      {
        name: 'สอบถามโปรแกรมและราคา',
        category: 'สอบถาม',
        text: 'โปรแกรมแนะนำค่า 💆\n• [โปรแกรม 1] [เวลา] นาที ฿[ราคา]\n• [โปรแกรม 2] [เวลา] นาที ฿[ราคา]\n• [โปรแกรม 3] [เวลา] นาที ฿[ราคา]\nสนใจโปรแกรมไหนแจ้งได้เลยนะคะ',
      },
      {
        name: 'จองคิวนัดหมาย',
        category: 'ปิดการขาย',
        text: 'จองคิวค่า ✅\nโปรแกรม: [โปรแกรม]\nวันที่: [วันที่]\nเวลา: [เวลา]\nชื่อ: [ชื่อลูกค้า]\nเราจะยืนยันอีกครั้งทาง LINE นะคะ 📲',
      },
      {
        name: 'แจ้งเตือนนัดล่วงหน้า',
        category: 'หลังการขาย',
        text: 'เตือนนัดวันพรุ่งนี้ค่า 🔔\n[โปรแกรม] เวลา [เวลา]\nที่ [ที่อยู่สปา]\nหากต้องการเลื่อนนัดแจ้งล่วงหน้า 3 ชม. นะคะ 🙏',
      },
    ],
  },
  ecom: {
    label: '📦 ขายออนไลน์',
    templates: [
      {
        name: 'ต้อนรับร้านค้าออนไลน์',
        category: 'ต้อนรับ',
        text: 'สวัสดีครับ! 📦 ยินดีต้อนรับสู่ [ชื่อร้าน] มีสินค้ากว่า [จำนวน] รายการให้เลือก กด "ดูสินค้า" เพื่อเริ่มช้อปได้เลยครับ 🛒',
      },
      {
        name: 'สอบถามสินค้าและสต็อก',
        category: 'สอบถาม',
        text: '[ชื่อสินค้า] ครับ 📦\n• ราคา: ฿[ราคา]\n• สถานะ: [มีสินค้า/สินค้าหมด]\n• จัดส่ง: [วัน] วันทำการ\nสั่งได้เลยครับ หรือสอบถามเพิ่มเติมได้นะครับ',
      },
      {
        name: 'ยืนยันคำสั่งซื้อ',
        category: 'ปิดการขาย',
        text: 'ยืนยันออเดอร์ครับ ✅\nเลขที่: [order ID]\n[สินค้า] x[จำนวน] = ฿[ราคา]\nค่าจัดส่ง: ฿[ค่าส่ง]\nรวม: ฿[ยอดรวม]\nชำระผ่าน [ช่องทาง] ได้เลยครับ',
      },
      {
        name: 'แจ้งจัดส่งพัสดุ',
        category: 'หลังการขาย',
        text: 'จัดส่งแล้วครับ! 🚚\nเลขพัสดุ: [tracking]\nขนส่ง: [บริษัทขนส่ง]\nตรวจสอบสถานะได้ที่ [ลิงก์] ครับ\nคาดว่าจะถึงใน [วัน] ครับ',
      },
      {
        name: 'ติดตามความพึงพอใจ',
        category: 'หลังการขาย',
        text: 'ได้รับสินค้าแล้วหรือยังครับ? 📬\nหากมีปัญหาหรือต้องการเคลมแจ้งได้เลยนะครับ\nรีวิวสั้น ๆ ได้ที่ [ลิงก์] ขอบคุณมากครับ 🙏',
      },
    ],
  },
  realestate: {
    label: '🏠 อสังหา',
    templates: [
      {
        name: 'ต้อนรับและสอบถามความต้องการ',
        category: 'ต้อนรับ',
        text: 'สวัสดีครับ! 🏠 ยินดีต้อนรับ กำลังมองหาที่อยู่อาศัยหรือการลงทุนอยู่ครับ? ช่วยแจ้งความต้องการเบื้องต้นได้เลยนะครับ',
      },
      {
        name: 'แนะนำโครงการ',
        category: 'สอบถาม',
        text: 'แนะนำโครงการ [ชื่อโครงการ] ครับ 🏡\n• ราคาเริ่มต้น: ฿[ราคา]\n• พื้นที่: [ขนาด] ตร.ม.\n• ทำเล: [ย่าน]\n• ใกล้: [BTS/MRT สถานี]\nดูรายละเอียดครบที่ [ลิงก์] ครับ',
      },
      {
        name: 'นัดชมโครงการ',
        category: 'ปิดการขาย',
        text: 'ยืนยันนัดชมโครงการครับ ✅\nโครงการ: [ชื่อโครงการ]\nวันที่: [วันที่]\nเวลา: [เวลา]\nติดต่อเซลส์: [ชื่อ] [เบอร์โทร]\nทีมงานจะรอต้อนรับครับ 🏠',
      },
      {
        name: 'ติดตามหลังนัดชม',
        category: 'หลังการขาย',
        text: 'ขอบคุณที่มาชมโครงการ [ชื่อโครงการ] ครับ 🙏\nมีคำถามหรือต้องการข้อมูลเพิ่มเติมยินดีช่วยเหลือเสมอครับ\nติดต่อ [ชื่อเซลส์] โดยตรง: [เบอร์] ครับ',
      },
    ],
  },
  course: {
    label: '🎓 คอร์ส',
    templates: [
      {
        name: 'ต้อนรับและแนะนำหลักสูตร',
        category: 'ต้อนรับ',
        text: 'สวัสดีค่า! 🎓 ยินดีต้อนรับสู่ [ชื่อสถาบัน] มีหลักสูตรกว่า [จำนวน] หลักสูตรพร้อมพัฒนาทักษะค่า ดูคอร์สทั้งหมดได้เลยนะคะ ✨',
      },
      {
        name: 'แนะนำคอร์สที่เหมาะสม',
        category: 'สอบถาม',
        text: 'แนะนำ [ชื่อคอร์ส] ค่า 📚\n• ระยะเวลา: [เวลา]\n• รูปแบบ: [ออนไลน์/ออฟไลน์]\n• ราคา: ฿[ราคา]\n• เริ่มเรียน: [วันที่]\nดูรายละเอียดเพิ่มที่ [ลิงก์] ค่า',
      },
      {
        name: 'ยืนยันการลงทะเบียน',
        category: 'ปิดการขาย',
        text: 'ลงทะเบียนเรียบร้อยค่า ✅\nคอร์ส: [ชื่อคอร์ส]\nเริ่มเรียน: [วันที่]\nลิงก์เข้าเรียน: [ลิงก์]\nชำระผ่าน [ช่องทาง] ค่า 🎓',
      },
      {
        name: 'ติดตามหลังเรียนจบ',
        category: 'หลังการขาย',
        text: 'ยินดีด้วยนะคะ! 🎉 เรียนจบ [ชื่อคอร์ส] แล้วค่า\nดาวน์โหลดใบเกียรติบัตรได้ที่ [ลิงก์]\nมีคอร์สต่อยอด [ชื่อคอร์สถัดไป] แนะนำค่า ✨',
      },
    ],
  },
};

const BUSINESS_TABS = [
  { id: 'food',        label: '🍱 ร้านอาหาร' },
  { id: 'fashion',     label: '👗 แฟชั่น' },
  { id: 'spa',         label: '💆 บริการ/สปา' },
  { id: 'ecom',        label: '📦 ขายออนไลน์' },
  { id: 'realestate',  label: '🏠 อสังหา' },
  { id: 'course',      label: '🎓 คอร์ส' },
];

// Render [placeholder] tokens in orange
function TemplateText({ text }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-zinc-400">
      {parts.map((part, i) =>
        /^\[.*\]$/.test(part)
          ? <span key={i} className="text-orange-400 font-semibold">{part}</span>
          : part
      )}
    </pre>
  );
}

function TemplateCard({ tpl }) {
  const [copied, setCopied] = useState(false);
  const [added, setAdded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tpl.text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 gap-3 hover:border-orange-500/20 transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-white font-semibold text-sm leading-snug">{tpl.name}</h3>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border flex-shrink-0 ${badgeColor[tpl.category] ?? 'bg-zinc-500/15 text-zinc-400 border-zinc-500/20'}`}>
          {tpl.category}
        </span>
      </div>

      <div className="bg-black/30 rounded-xl p-3 border border-white/[0.05]">
        <TemplateText text={tpl.text} />
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all border ${
            copied
              ? 'bg-green-500/15 border-green-500/20 text-green-400'
              : 'bg-white/[0.05] border-white/[0.08] text-zinc-300 hover:text-white hover:border-white/20'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'คัดลอกแล้ว ✅' : 'คัดลอก'}
        </button>
        <button
          onClick={handleAdd}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all border ${
            added
              ? 'bg-orange-500/15 border-orange-500/20 text-orange-400'
              : 'bg-orange-500/10 border-orange-500/20 text-orange-400 hover:bg-orange-500/20'
          }`}
        >
          {added ? <CheckCircle className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
          {added ? 'เพิ่มใน Knowledge Base แล้ว ✅' : 'ใช้เทมเพลตนี้'}
        </button>
      </div>
    </motion.div>
  );
}

export default function Templates({ setSidebarOpen }) {
  const [activeType, setActiveType] = useState('food');
  const current = templateData[activeType];

  return (
    <PageLayout
      title="เทมเพลตสำเร็จรูป"
      subtitle="สคริปต์สนทนา AI คัดสรรตามประเภทธุรกิจ — คัดลอกไปใช้ได้เลย"
      setSidebarOpen={setSidebarOpen}
    >
      <div className="content-area pb-10">
        {/* Header banner */}
        <div className="rounded-2xl bg-gradient-to-r from-orange-500/10 via-orange-400/5 to-transparent border border-orange-500/20 px-6 py-4 mb-6 flex items-center gap-3">
          <span className="text-2xl">📚</span>
          <div>
            <p className="text-white font-bold text-sm">เทมเพลตสำเร็จรูป — คัดลอกไปใช้ได้เลย</p>
            <p className="text-zinc-500 text-xs">เลือกประเภทธุรกิจแล้วนำเทมเพลตไปปรับให้เข้ากับร้านของคุณ</p>
          </div>
        </div>

        {/* Business type tabs — scrollable on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {BUSINESS_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveType(tab.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeType === tab.id
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Template grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeType}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {current.templates.map((tpl, i) => (
              <TemplateCard key={i} tpl={tpl} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageLayout>
  );
}
