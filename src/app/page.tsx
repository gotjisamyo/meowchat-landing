import Image from "next/image";
import MobileNav from "./_components/MobileNav";
import PricingSection from "./_components/PricingSection";
import FAQSection from "./_components/FAQSection";

const PRICING = [
  {
    name: "Starter",
    monthly: 0,
    annual: 0,
    badge: null,
    features: [
      "รองรับ LINE 1 ช่องทาง",
      "Bot ตอบอัตโนมัติ 300 ครั้ง/เดือน",
      "AI วิเคราะห์ลูกค้าระดับต้น",
      "แดชบอร์ดพื้นฐาน",
    ],
    cta: "เริ่มฟรีเลย",
    highlight: false,
    freeNote: "ฟรีตลอดชีพ ไม่มีวันหมดอายุ",
  },
  {
    name: "Mini",
    monthly: 299,
    annual: 249,
    badge: null,
    features: [
      "รองรับ LINE 1 ช่องทาง",
      "Bot ตอบอัตโนมัติ 1,000 ครั้ง/เดือน",
      "AI ตอบคำถาม & ส่งราคาสินค้า",
      "ระบบจองนัดพื้นฐาน",
      "แดชบอร์ดพื้นฐาน",
    ],
    cta: "เริ่มใช้ Mini",
    highlight: false,
    subNote: "เหมาะสำหรับ solopreneur และธุรกิจเพิ่งเริ่ม",
  },
  {
    name: "Pro",
    monthly: 999,
    annual: 799,
    badge: null,
    features: [
      "รองรับ LINE + Messenger",
      "ตอบแชทอัตโนมัติ 3,000 ข้อความ/เดือน",
      "AI ตอบคำถาม & ปิดออเดอร์",
      "ระบบจองนัดหมายอัตโนมัติ",
      "รายงานพื้นฐาน",
    ],
    cta: "เริ่มใช้ Pro",
    highlight: false,
    subNote: "เหมาะสำหรับ SME ที่เพิ่งเริ่ม",
  },
  {
    name: "Business",
    monthly: 2990,
    annual: 2490,
    badge: "ยอดนิยม · 8 ใน 10 เลือก",
    features: [
      "LINE 3 OA + Messenger ไม่จำกัด",
      "ตอบแชทอัตโนมัติไม่จำกัด",
      "AI SalesAgent ปิดการขาย",
      "เชื่อมต่อ API / Webhook หลังบ้าน",
      "รายงาน MRR / Conversion",
      "ตั้งค่า Persona Bot ได้",
    ],
    cta: "สมัครเลย",
    highlight: true,
    subNote: "คุ้มกว่าจ้างแอดมิน 1 คน ถึง 5 เท่า",
  },
  {
    name: "Enterprise",
    monthly: null,
    annual: null,
    badge: null,
    features: [
      "ทุกอย่างใน Business",
      "Custom AI Persona ขั้นสูง",
      "ติดตั้งบน Private Server ได้",
      "ผู้จัดการบัญชีส่วนตัว",
      "SLA + Priority Support",
      "รองรับทุกช่องทาง (Zalo, WhatsApp ฯลฯ)",
    ],
    cta: "ติดต่อฝ่ายขาย",
    highlight: false,
    startingNote: "จาก ฿5,990/เดือน",
  },
];

const FEATURES = [
  {
    icon: "🤖",
    title: "ตอบแทนแอดมิน 24/7 ไม่มีวันลา",
    desc: "เรียนรู้สไตล์แบรนด์คุณ ตอบได้ทั้งไทยและอังกฤษ ส่งรูป ไฟล์ PDF และลิงก์ได้ พร้อมส่งต่อแอดมินอัตโนมัติ",
  },
  {
    icon: "📊",
    title: "วิเคราะห์ยอดขายแบบ Real-time",
    desc: "ติดตาม MRR Conversion Rate และ Customer Lifetime Value ในแดชบอร์ดเดียว",
  },
  {
    icon: "🛒",
    title: "ปิดการขายใน Chat",
    desc: "SalesAgent ดู catalog สินค้า เสนอราคา และรับออเดอร์ได้โดยไม่ออกจาก LINE",
  },
  {
    icon: "📅",
    title: "จองนัดหมายอัตโนมัติ",
    desc: "ระบบจองคิว / คลาส / นัดหมอ พร้อม reminders ทาง LINE ลดลูกค้าเบี้ยวนัด",
  },
  {
    icon: "🌐",
    title: "รองรับหลายช่องทาง",
    desc: "LINE, Messenger, WhatsApp, Zalo — จัดการทุก inbox ในที่เดียว",
  },
  {
    icon: "🔔",
    title: "แจ้งเตือนอัจฉริยะ",
    desc: "Push notification เมื่อลูกค้าถามราคา, ทิ้ง cart หรือรอตอบนานเกิน threshold",
  },
  {
    icon: "🏢",
    title: "รองรับ B2B & ทีมขาย",
    desc: "แจก lead ให้เซลส์โดยอัตโนมัติ ติดตามไปป์ไลน์ และ quota แต่ละทีม",
  },
  {
    icon: "🔒",
    title: "ปลอดภัย & PDPA Compliant",
    desc: "ข้อมูลลูกค้าเข้ารหัส AES-256 และได้รับรองตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล 2562",
  },
  {
    icon: "📦",
    title: "ติดตามสถานะงาน/ออเดอร์",
    desc: "ลูกค้าถามสถานะซ่อม พัสดุ หรือออเดอร์ผ่าน LINE ได้เลย bot ตอบด้วยเลขงานและสถานะล่าสุดอัตโนมัติ",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "เชื่อมต่อ LINE OA ของคุณ",
    desc: "ใช้เวลาไม่ถึง 5 นาที เชื่อม LINE Official Account เข้ากับ MeowChat ได้เลย ไม่ต้องมีความรู้เทคนิค",
  },
  {
    step: "02",
    title: "อัปโหลด Knowledge Base",
    desc: "ใส่ข้อมูลสินค้า ราคา FAQ และนโยบายธุรกิจ AI จะเรียนรู้และตอบลูกค้าในสไตล์แบรนด์คุณ",
  },
  {
    step: "03",
    title: "ตั้งค่า Sales Flow",
    desc: "กำหนด trigger, ข้อเสนอพิเศษ และเงื่อนไขส่งต่อแอดมิน แบบ drag-and-drop ไม่ต้องเขียน code",
  },
  {
    step: "04",
    title: "เปิดใช้งานและดูผล",
    desc: "Bot ทำงานทันที! ติดตาม conversion, revenue และ customer satisfaction ใน dashboard แบบ real-time",
  },
];

const TESTIMONIALS = [
  {
    name: "คุณสมหญิง วงศ์ไพบูลย์",
    biz: "ร้านขายเสื้อผ้าออนไลน์ @fashionbkk",
    text: "ก่อนใช้ MeowChat แอดมินต้องตอบแชท 300-400 ข้อความต่อวัน ตอนนี้ bot จัดการได้ 80% ยอดขายเพิ่ม 40% ใน 2 เดือน",
    stars: 5,
    date: "ธันวาคม 2567",
    lineOA: "@fashionbkk",
  },
  {
    name: "ดร.พรชัย ลิมปิชัย",
    biz: "คลินิกทันตกรรม Smile Clinic",
    text: "ระบบจองนัดอัตโนมัติลด no-show จาก 25% เหลือ 8% ลูกค้าได้รับ reminder ทาง LINE ทุกคน ประทับใจมาก",
    stars: 5,
    date: "มกราคม 2568",
    lineOA: "@smileclinic_th",
  },
  {
    name: "Mr. James Thornton",
    biz: "Phuket Boat Charter Co.",
    text: "MeowChat handles both Thai and English inquiries perfectly. Our booking rate increased 60% after integration. Best investment for our tourism business.",
    stars: 5,
    date: "กุมภาพันธ์ 2568",
    lineOA: "@phuketboatcharter",
  },
  {
    name: "คุณอนันต์ ศรีสุวรรณ",
    biz: "โรงเรียนสอนภาษา LinguaMax",
    text: "จัดการสมัครเรียน จองคลาส และชำระเงินผ่าน LINE ได้ครบ ลดภาระแอดมิน 60% และนักเรียนใหม่เพิ่ม 35%",
    stars: 5,
    date: "มีนาคม 2568",
    lineOA: "@linguamax",
  },
];

const FAQS = [
  {
    q: "ต้องมีความรู้เทคนิคไหมในการติดตั้ง?",
    a: "ไม่ต้องเลย! ระบบออกแบบมาให้ใช้งานง่าย ด้วย wizard ขั้นตอนเดียว เชื่อม LINE OA ได้ใน 5 นาที ไม่ต้องเขียน code แม้แต่บรรทัดเดียว",
  },
  {
    q: "เริ่มใช้งานได้เลยไหม ต้องรอทีมติดต่อกลับไหม?",
    a: "แผน Starter เริ่มได้ฟรีทันที ไม่ต้องรอ! แผน Mini และ Pro สมัครและชำระเงินออนไลน์ได้เลย เริ่มใช้งานภายใน 24 ชั่วโมง สำหรับ Business และ Enterprise ทีมงานจะติดต่อกลับภายใน 2 ชั่วโมงเพื่อ onboarding ส่วนตัว",
  },
  {
    q: "MeowChat รองรับภาษาอังกฤษได้ไหม?",
    a: "รองรับเต็มรูปแบบ! AI ตอบได้ทั้งไทยและอังกฤษ และตรวจจับภาษาของลูกค้าโดยอัตโนมัติ เหมาะสำหรับธุรกิจท่องเที่ยวและ B2B ระหว่างประเทศ",
  },
  {
    q: "ข้อมูลลูกค้าปลอดภัยไหม? เป็นไปตาม PDPA หรือเปล่า?",
    a: "ปลอดภัย 100% ข้อมูลเข้ารหัส AES-256 เซิร์ฟเวอร์อยู่ในไทย และระบบออกแบบให้เป็นไปตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ.2562 ครบถ้วน",
  },
  {
    q: "ถ้า bot ตอบผิดหรือลูกค้าต้องการคุยกับคน จะทำยังไง?",
    a: "มีระบบ Human Handoff อัตโนมัติ เมื่อ bot ตรวจพบว่าลูกค้าต้องการความช่วยเหลือพิเศษ หรือแอดมินจะ override bot ได้ตลอดเวลา",
  },
  {
    q: "สามารถใช้กับ LINE OA กี่บัญชีได้?",
    a: "แผน Business รองรับ LINE OA สูงสุด 3 บัญชี และสามารถเพิ่มได้ ฿500/OA/เดือน แผน Enterprise ไม่จำกัด สามารถจัดการหลายแบรนด์หรือหลายสาขาในแดชบอร์ดเดียว",
  },
  {
    q: "หากต้องการยกเลิกแผน ทำได้ไหม?",
    a: "ยกเลิกได้ทุกเมื่อ ไม่มีสัญญาผูกมัด สำหรับแผนรายเดือน ยกเลิกก่อนรอบบิลถัดไปได้เลย ไม่มีค่าธรรมเนียมยกเลิก",
  },
  {
    q: "ราคา ฿2,990 รวม VAT ไหม? มีใบกำกับภาษีได้ไหม?",
    a: "ราคาที่แสดงยังไม่รวม VAT 7% สำหรับผู้ประกอบการที่ต้องการใบกำกับภาษี กรุณาติดต่อทีมงานผ่าน LINE เพื่อขอใบกำกับภาษีได้ทันที",
  },
  {
    q: "MeowChat ต่างจาก LINE OA Manager ธรรมดาอย่างไร?",
    a: "LINE OA Manager ตอบได้เฉพาะ keyword ที่ตั้งไว้ล่วงหน้า แต่ MeowChat ใช้ AI จริง ที่เข้าใจประโยคธรรมชาติ จำบริบทการสนทนา วิเคราะห์ความต้องการ และปิดการขายได้โดยอัตโนมัติ ไม่ต้องตั้งค่าทุก keyword",
  },
  {
    q: "ชำระเงินด้วยอะไรได้บ้าง?",
    a: "รองรับการชำระด้วยบัตรเครดิต/เดบิต, QR พร้อมเพย์, และโอนธนาคาร (กสิกร, SCB, กรุงเทพ) โดยไม่มีค่าธรรมเนียมเพิ่มเติม",
  },
  {
    q: "มี API หรือ Webhook ให้นักพัฒนาใช้งานไหม?",
    a: "แผน Business และ Enterprise รองรับ REST API และ Webhook สำหรับเชื่อมต่อกับระบบภายใน เช่น ERP, CRM, สต็อก, POS ติดต่อทีมงานผ่าน LINE เพื่อรับ API documentation และ sandbox environment",
  },
];

const B2B_USE_CASES = [
  {
    icon: "🏬",
    title: "ค้าปลีก & E-commerce",
    desc: "Bot ดูสต็อก เสนอสินค้า ปิดออเดอร์ และส่ง tracking ทาง LINE โดยอัตโนมัติ",
  },
  {
    icon: "🏥",
    title: "คลินิก & สุขภาพ",
    desc: "จองนัด ส่ง reminder วิเคราะห์อาการเบื้องต้น และนัด followup หลังรักษา",
  },
  {
    icon: "🎓",
    title: "การศึกษา & คลาสเรียน",
    desc: "สมัครเรียน จองคลาส ชำระเงิน และติดตาม attendance ผ่าน chat ได้เลย",
  },
  {
    icon: "✈️",
    title: "ท่องเที่ยว & โรงแรม",
    desc: "ตอบทั้งไทยและอังกฤษ จองทัวร์ ส่งใบยืนยัน และ upsell แพ็กเกจเพิ่มเติม",
  },
  {
    icon: "🍜",
    title: "ร้านอาหาร & F&B",
    desc: "รับออเดอร์ จองโต๊ะ แจ้งคิวรอ ส่งเมนูแนะนำ และจัดการ Loyalty stamp / reward points สำหรับลูกค้าประจำ",
  },
  {
    icon: "🏗️",
    title: "B2B & ทีมขาย",
    desc: "Qualify lead อัตโนมัติ กระจาย lead ให้เซลส์ที่ว่าง และติดตาม pipeline แบบ real-time",
  },
  {
    icon: "💪",
    title: "ฟิตเนส & Wellness",
    desc: "จองคลาส Yoga/Pilates ซ้ำรายสัปดาห์ จัดการ capacity ของแต่ละคลาส และส่ง reminder อัตโนมัติ",
  },
  {
    icon: "🚚",
    title: "Logistics & ขนส่ง",
    desc: "แจ้งสถานะพัสดุ real-time รับ inquiry B2B และเชื่อมต่อ API tracking ภายในผ่าน webhook",
  },
  {
    icon: "🐾",
    title: "สัตวแพทย์ & Pet Shop",
    desc: "จองนัดหมอ ส่ง vaccine reminder ดูประวัติสัตว์เลี้ยง และรับออเดอร์อาหาร/อุปกรณ์",
  },
  {
    icon: "🔧",
    title: "ช่าง & อู่ซ่อมบำรุง",
    desc: "จองนัดซ่อม แจ้งสถานะรถเสร็จ ส่ง reminder บำรุงรักษา และรับ pre-approve ค่าใช้จ่ายผ่าน LINE",
  },
  {
    icon: "💒",
    title: "งานแต่งงาน & Event",
    desc: "จัดการ inquiry ลูกค้า, นัดดู venue, ส่ง timeline และประสานงาน vendor ผ่าน LINE ได้ครบ",
  },
  {
    icon: "✂️",
    title: "ร้านตัดผม & เสริมสวย",
    desc: "จองช่างที่ต้องการ จัดการ walk-in + appointment พร้อม Reminder และ no-show tracking",
  },
  {
    icon: "🏢",
    title: "นิติบุคคล & Property",
    desc: "รับแจ้งซ่อม track ticket สถานะ แจ้งค่าส่วนกลาง และ broadcast ข่าวสารถึงลูกบ้านทุกคน",
  },
  {
    icon: "🚗",
    title: "เช่ารถ & Fleet",
    desc: "เช็คความพร้อมรถ จองออนไลน์ รับมัดจำ และส่ง reminder คืนรถอัตโนมัติผ่าน LINE",
  },
  {
    icon: "🏛️",
    title: "Agency & Reseller",
    desc: "จัดการ LINE OA หลายแบรนด์ในแดชบอร์ดเดียว รองรับ White-label และ reseller program สำหรับ digital agency (ติดต่อทีมงาน)",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-yellow-400 text-sm">★</span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen hero-gradient">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-lg z-[100]"
      >
        ข้ามไปยังเนื้อหาหลัก
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center relative">
        <div className="text-2xl font-bold tracking-tighter text-gradient">MeowChat</div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">ฟีเจอร์</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">วิธีใช้</a>
          <a href="#booking" className="hover:text-white transition-colors">การจอง</a>
          <a href="#use-cases" className="hover:text-white transition-colors">ใช้กับธุรกิจอะไร</a>
          <a href="#pricing" className="hover:text-white transition-colors">ราคา</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://line.me/ti/p/@960xboyt"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105"
          >
            ลองใช้งานฟรี
          </a>
          <MobileNav />
        </div>
      </nav>

      <main id="main-content" className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Hero */}
        <section className="flex flex-col items-center text-center mb-24">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1.5 text-xs font-medium text-purple-300 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            ใช้งานโดยธุรกิจไทยกว่า 500+ ราย
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            ขายได้ 24 ชั่วโมง แม้ไม่มีแอดมิน <br />
            <span className="text-gradient">AI ทำแทนคุณบน LINE</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-4">
            แอดมินหมดแรงตอบแชทซ้ำๆ ทุกวัน? MeowChat จัดการให้ — ตอบคำถาม ส่งราคา ปิดออเดอร์ และจองนัดอัตโนมัติ บน LINE และ Messenger
          </p>
          <p className="text-gray-500 text-sm mb-10">
            Also available in English · ตอบได้ทั้งไทยและอังกฤษ · Bilingual AI
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a
              href="https://line.me/ti/p/@960xboyt"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 text-lg"
            >
              🚀 ทดลองฟรี 14 วัน — ตั้งค่าได้ใน 5 นาที
            </a>
            <a
              href="#demo-video"
              className="border border-white/20 hover:border-white/40 text-white px-8 py-3.5 rounded-full font-medium transition-all text-lg"
            >
              ดูตัวอย่างจริง 2 นาที →
            </a>
          </div>

          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-white/10">
            <Image
              src="/hero.png"
              alt="MeowChat AI Chatbot Dashboard"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Social proof bar */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-center">
            {[
              { num: "500+", label: "ธุรกิจไทยที่ไว้วางใจ" },
              { num: "2M+", label: "ข้อความต่อเดือน" },
              { num: "40%", label: "ยอดขายเพิ่ม (เฉลี่ยใน 60 วัน)" },
              { num: "80%", label: "ลดภาระแอดมิน" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-gradient">{s.num}</div>
                <div className="text-gray-400 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Demo Video */}
        <section id="demo-video" className="mb-24">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">ดูการทำงานจริงใน 2 นาที</h2>
            <p className="text-gray-400">เห็นว่าลูกค้าจริงใช้ MeowChat ทำงานอย่างไร</p>
          </div>
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 flex items-center justify-center">
            {/* Video placeholder — replace src with real YouTube/Loom embed URL when available */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-purple-600/80 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-purple-600 transition-colors">
                <span className="text-white text-3xl ml-1">▶</span>
              </div>
              <p className="text-gray-400 text-sm">วิดีโอสาธิต: การตั้งค่า LINE OA + บอทตอบลูกค้าจริง</p>
              <a
                href="https://line.me/ti/p/@960xboyt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-purple-400 hover:text-purple-300 text-sm underline"
              >
                หรือทดลองคุยกับบอทตัวจริงได้เลย →
              </a>
            </div>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">* วิดีโอเต็มจะพร้อมเร็วๆ นี้ — ทดลองบอทจริงได้ทันทีผ่าน LINE</p>
        </section>

        {/* Features */}
        <section id="features" className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">ทำงานแทนแอดมินได้ทุกอย่าง — ตลอด 24 ชั่วโมง</h2>
            <p className="text-gray-400 max-w-xl mx-auto">ทุกเครื่องมือที่คุณต้องการเพื่อเปลี่ยนแชทให้เป็นรายได้</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="glass p-6 rounded-2xl hover:border-purple-500/30 transition-colors">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">เริ่มต้นได้ใน 4 ขั้นตอน</h2>
            <p className="text-gray-400 max-w-xl mx-auto">ไม่ต้องเขียน code ไม่ต้องมีทีม IT — ตั้งค่าเองได้ใน 1 วัน</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="glass p-6 rounded-2xl relative">
                <div className="text-5xl font-extrabold text-purple-500/20 mb-3">{step.step}</div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 glass rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 border-green-500/20 bg-green-500/5">
            <div className="text-4xl flex-shrink-0">🙋</div>
            <div>
              <h3 className="font-bold mb-1">ไม่ถนัด tech ก็ใช้ได้</h3>
              <p className="text-gray-400 text-sm">ไม่ต้องรู้จัก &quot;Knowledge Base&quot;, &quot;API&quot; หรือ &quot;Webhook&quot; — เพียงแค่บอกว่าธุรกิจคุณทำอะไร ทีมงานเราช่วยตั้งค่าให้ทั้งหมดฟรี (แผน Pro ขึ้นไป) พร้อม LINE support ภาษาไทยตลอดเวลา</p>
            </div>
            <a
              href="https://line.me/ti/p/@960xboyt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap"
            >
              ให้เราช่วยตั้งค่า
            </a>
          </div>
        </section>

        {/* Booking System Details */}
        <section id="booking" className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">ระบบจองนัดหมายครบทุกความต้องการ</h2>
            <p className="text-gray-400 max-w-xl mx-auto">ไม่ใช่แค่จองคิว — รองรับทุก workflow ของธุรกิจคุณ</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🔄",
                title: "จองซ้ำอัตโนมัติ",
                desc: "ตั้งตารางคงที่รายสัปดาห์/รายเดือน เช่น นักเรียน A มาทุกวันเสาร์ 10:00 ระบบจัดการ recurring booking ให้อัตโนมัติ",
              },
              {
                icon: "👥",
                title: "หลายหมอ/ครู/ช่าง",
                desc: "บริหาร calendar ของ staff หลายคนพร้อมกัน ลูกค้าเลือกผู้ให้บริการที่ต้องการได้ หรือให้ระบบจัดให้อัตโนมัติ (รองรับตั้งแต่แผน Pro ขึ้นไป)",
              },
              {
                icon: "🎯",
                title: "จัดการ Capacity",
                desc: "กำหนดจำนวนสูงสุดต่อคลาส/slot เมื่อเต็มระบบปิดอัตโนมัติ รองรับ waitlist และแจ้งเตือนเมื่อมีที่ว่าง (รองรับตั้งแต่แผน Mini ขึ้นไป)",
              },
              {
                icon: "💳",
                title: "รับมัดจำและชำระเงิน",
                desc: "เก็บมัดจำผ่าน QR PromptPay หรือบัตรเครดิตตอนจอง ลดการเบี้ยวนัดได้มากกว่า 60% (รองรับตั้งแต่แผน Mini ขึ้นไป)",
              },
              {
                icon: "📲",
                title: "Reminder อัตโนมัติ",
                desc: "ส่ง reminder ทาง LINE 24 ชม. และ 2 ชม. ก่อนนัด พร้อมลิงก์ reschedule หรือยืนยัน 1 คลิก",
              },
              {
                icon: "📈",
                title: "รายงาน Booking",
                desc: "วิเคราะห์ no-show rate, popular time slots, revenue per staff และ customer retention ในแดชบอร์ดเดียว",
              },
            ].map((card) => (
              <div key={card.title} className="glass p-6 rounded-2xl hover:border-purple-500/30 transition-colors">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="font-bold mb-2">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* B2B Use Cases */}
        <section id="use-cases" className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">MeowChat เหมาะกับธุรกิจอะไร?</h2>
            <p className="text-gray-400 max-w-xl mx-auto">ใช้ได้กับทุกอุตสาหกรรม เชื่อมต่อกับ POS, ERP, delivery platforms และระบบเดิมของคุณผ่าน API</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {B2B_USE_CASES.map((uc) => (
              <div key={uc.title} className="glass p-6 rounded-2xl flex gap-4 hover:border-purple-500/30 transition-colors">
                <div className="text-3xl flex-shrink-0">{uc.icon}</div>
                <div>
                  <h3 className="font-bold mb-1">{uc.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{uc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Security / Data */}
        <section className="mb-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">ข้อมูลของคุณปลอดภัย 100%</h2>
            <p className="text-gray-400 max-w-xl mx-auto">ออกแบบมาสำหรับธุรกิจที่จัดการข้อมูลสำคัญ — คลินิก, กฎหมาย, การเงิน</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: "🔐",
                title: "เข้ารหัส AES-256",
                desc: "ข้อมูลทุกชิ้นถูกเข้ารหัสทั้งขณะส่งและขณะจัดเก็บ ไม่มีใครอ่านข้อมูลคุณได้นอกจากระบบของคุณเอง",
              },
              {
                icon: "🇹🇭",
                title: "เซิร์ฟเวอร์ในไทย",
                desc: "ข้อมูลไม่ออกนอกประเทศ จัดเก็บในประเทศไทยตามข้อกำหนด พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ.2562",
              },
              {
                icon: "🏢",
                title: "Private Server (Enterprise)",
                desc: "ติดตั้งบน Server ส่วนตัวของคุณได้ ข้อมูลอยู่ใน infrastructure ของธุรกิจคุณโดยสมบูรณ์",
              },
              {
                icon: "📋",
                title: "DPA & Compliance",
                desc: "มี Data Processing Agreement ให้ลงนาม รองรับ PDPA 2562 และ audit trail สำหรับการตรวจสอบ",
              },
            ].map((card) => (
              <div key={card.title} className="glass p-6 rounded-2xl hover:border-purple-500/30 transition-colors">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="font-bold mb-2">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-xs mb-4 max-w-lg mx-auto">สำหรับธุรกิจที่ต้องการเอกสาร DPA, รายงาน Security Audit หรือ SLA ติดต่อเราผ่าน LINE ได้ทันที</p>
            <a href="/privacy" className="text-purple-400 hover:text-purple-300 text-sm underline mr-6">อ่านนโยบายความเป็นส่วนตัว →</a>
            <a href="https://line.me/ti/p/@960xboyt" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 text-sm underline">ดาวน์โหลด / ขอ DPA สำหรับองค์กร →</a>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">ลูกค้าพูดถึงเราอย่างไร?</h2>
            <p className="text-gray-400">ผลลัพธ์จริง จากธุรกิจจริงที่ใช้ MeowChat</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="glass p-6 rounded-2xl">
                <StarRating count={t.stars} />
                <p className="text-gray-300 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.biz}</div>
                  <div className="text-gray-600 text-xs">{t.date}</div>
                  <div className="text-green-500 text-xs mt-1">LINE: {t.lineOA}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mb-24">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">เลือกแพ็กเกจที่ใช่ — เริ่มฟรีได้เลยวันนี้</h2>
            <p className="text-gray-400">เริ่มต้นฟรี ไม่มีสัญญาผูกมัด</p>
          </div>
          <PricingSection plans={PRICING} />
        </section>

        {/* Payment Methods */}
        <section className="mb-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">ชำระเงินสะดวก หลากหลายช่องทาง</h2>
            <p className="text-gray-400 text-sm">ไม่มีค่าธรรมเนียมเพิ่มเติม · ออกใบกำกับภาษีได้</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { icon: "📱", label: "QR พร้อมเพย์" },
              { icon: "💳", label: "บัตรเครดิต/เดบิต" },
              { icon: "🏦", label: "โอนธนาคาร" },
              { icon: "💰", label: "LINE Pay" },
            ].map((method) => (
              <div key={method.label} className="glass rounded-2xl p-6 flex flex-col items-center justify-center gap-2 text-center">
                <div className="text-4xl">{method.icon}</div>
                <div className="text-sm font-medium text-gray-300">{method.label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-xs mt-6">
            ราคาที่แสดงยังไม่รวม VAT 7% · สำหรับใบกำกับภาษีติดต่อ support@meowchat.store
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">คำถามที่พบบ่อย</h2>
            <p className="text-gray-400">ไม่เจอคำตอบที่ต้องการ? ทักหา MeowChat ได้เลย</p>
          </div>
          <FAQSection faqs={FAQS} />
        </section>

        {/* Live Demo */}
        <section className="mb-24">
          <div className="glass rounded-3xl p-8 md:p-12 border-purple-500/20">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">ทดลองคุยกับ MeowBot ได้เลย</h2>
              <p className="text-gray-400">ไม่ต้องสมัคร ทดสอบได้ทันที — เพียงแสกน QR หรือคลิกลิงก์</p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="text-center">
                <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-gray-400 text-sm text-center p-4">
                    <div className="text-6xl mb-2">📱</div>
                    QR Code<br/>LINE @960xboyt
                  </div>
                </div>
                <p className="text-gray-400 text-sm">แสกน QR ด้วยกล้อง LINE</p>
              </div>
              <div className="text-gray-500 font-bold text-xl">หรือ</div>
              <div className="text-center space-y-4">
                <p className="text-gray-300 font-medium">ลองถามบอทว่า:</p>
                <div className="space-y-2">
                  {["💬 \"ราคาเท่าไหร่?\"", "💬 \"มีแผนฟรีไหม?\"", "💬 \"ช่วยอะไรได้บ้าง?\"", "💬 \"How much does it cost?\""].map(q => (
                    <div key={q} className="glass px-4 py-2 rounded-lg text-sm text-gray-300">{q}</div>
                  ))}
                </div>
                <a
                  href="https://line.me/ti/p/@960xboyt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105"
                >
                  เปิด LINE แชทเลย →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mb-24">
          <div className="glass rounded-3xl p-12 text-center bg-gradient-to-br from-purple-500/10 to-cyan-500/5 border-purple-500/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">พร้อมเปลี่ยนแชทให้เป็นเงินแล้วใช่ไหม?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              เริ่มต้นฟรี ไม่ต้องใส่บัตรเครดิต ทีม onboarding พร้อมช่วยทุกขั้นตอน
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://line.me/ti/p/@960xboyt"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105"
              >
                🚀 เริ่มต้นฟรีเลย
              </a>
              <a
                href="https://line.me/ti/p/@960xboyt"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 hover:border-white/40 text-white px-10 py-4 rounded-full font-medium text-lg transition-all"
              >
                📞 นัดสาธิต 30 นาที
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="border-t border-white/5 pt-12 pb-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold text-gradient mb-3">MeowChat</div>
              <p className="text-gray-500 text-sm leading-relaxed">
                AI Chatbot สำหรับธุรกิจไทย ตอบแชทอัตโนมัติ ปิดการขาย และวิเคราะห์ลูกค้า 24/7
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs bg-green-500/10 border border-green-500/20 text-green-400 px-2 py-0.5 rounded-full">PDPA Compliant</span>
              </div>
            </div>
            <div>
              <div className="font-bold text-sm mb-3 text-gray-300">ผลิตภัณฑ์</div>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">ฟีเจอร์</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">ราคา</a></li>
                <li><a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-sm mb-3 text-gray-300">ช่องทางติดต่อ</div>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li>
                  <a href="https://line.me/ti/p/@960xboyt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                    <span className="text-green-400">LINE</span> @960xboyt
                  </a>
                </li>
                <li className="text-gray-600">support@meowchat.store</li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-sm mb-3 text-gray-300">ภาษา / Language</div>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li className="text-white font-medium">🇹🇭 ภาษาไทย</li>
                <li className="text-gray-400">🇬🇧 English (AI supported)</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-xs">
            <p>© 2026 MeowChat.store by Mawsom — All Rights Reserved.</p>
            <div className="flex gap-4">
              <a href="/privacy" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</a>
              <a href="/terms" className="hover:text-white transition-colors">เงื่อนไขการใช้งาน</a>
              <span className="text-green-500">🔒 PDPA 2562</span>
            </div>
          </div>
        </footer>
      </main>

      {/* JSON-LD FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQS.map((faq) => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": { "@type": "Answer", "text": faq.a },
            })),
          }),
        }}
      />
    </div>
  );
}
