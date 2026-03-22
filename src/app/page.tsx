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
      "ตอบแชทอัตโนมัติ 100 ข้อความ/เดือน",
      "AI วิเคราะห์ลูกค้าระดับต้น",
      "แดชบอร์ดพื้นฐาน",
    ],
    cta: "เริ่มฟรีเลย",
    highlight: false,
    freeNote: "ฟรีตลอดชีพ ไม่มีวันหมดอายุ",
  },
  {
    name: "Business",
    monthly: 2990,
    annual: 2490,
    badge: "ยอดนิยม · 8 ใน 10 เลือก",
    features: [
      "LINE + Messenger ไม่จำกัด",
      "ตอบแชทอัตโนมัติไม่จำกัด",
      "AI SalesAgent ปิดการขาย",
      "เชื่อมต่อ API หลังบ้าน",
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
  },
];

const FEATURES = [
  {
    icon: "🤖",
    title: "ตอบแทนแอดมิน 24/7 ไม่มีวันลา",
    desc: "เรียนรู้สไตล์แบรนด์คุณ ตอบได้ทั้งไทยและอังกฤษ พร้อมส่งต่อให้แอดมินอัตโนมัติเมื่อจำเป็น",
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
  },
  {
    name: "ดร.พรชัย ลิมปิชัย",
    biz: "คลินิกทันตกรรม Smile Clinic",
    text: "ระบบจองนัดอัตโนมัติลด no-show จาก 25% เหลือ 8% ลูกค้าได้รับ reminder ทาง LINE ทุกคน ประทับใจมาก",
    stars: 5,
  },
  {
    name: "Mr. James Thornton",
    biz: "Phuket Boat Charter Co.",
    text: "MeowChat handles both Thai and English inquiries perfectly. Our booking rate increased 60% after integration. Best investment for our tourism business.",
    stars: 5,
  },
  {
    name: "คุณอนันต์ ศรีสุวรรณ",
    biz: "โรงเรียนสอนภาษา LinguaMax",
    text: "จัดการสมัครเรียน จองคลาส และชำระเงินผ่าน LINE ได้ครบ ลดภาระแอดมิน 60% และนักเรียนใหม่เพิ่ม 35%",
    stars: 5,
  },
];

const FAQS = [
  {
    q: "ต้องมีความรู้เทคนิคไหมในการติดตั้ง?",
    a: "ไม่ต้องเลย! ระบบออกแบบมาให้ใช้งานง่าย ด้วย wizard ขั้นตอนเดียว เชื่อม LINE OA ได้ใน 5 นาที ไม่ต้องเขียน code แม้แต่บรรทัดเดียว",
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
    a: "แผน Business รองรับ LINE OA สูงสุด 3 บัญชี แผน Enterprise ไม่จำกัด สามารถจัดการหลายแบรนด์หรือหลายสาขาในแดชบอร์ดเดียว",
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
    desc: "รับออเดอร์ จองโต๊ะ แจ้งคิวรอ และส่งเมนูแนะนำตามประวัติลูกค้า",
  },
  {
    icon: "🏗️",
    title: "B2B & ทีมขาย",
    desc: "Qualify lead อัตโนมัติ กระจาย lead ให้เซลส์ที่ว่าง และติดตาม pipeline แบบ real-time",
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
              href="#how-it-works"
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
        </section>

        {/* B2B Use Cases */}
        <section id="use-cases" className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">MeowChat เหมาะกับธุรกิจอะไร?</h2>
            <p className="text-gray-400 max-w-xl mx-auto">ใช้ได้กับทุกอุตสาหกรรม ตั้งแต่ SME ไปจนถึงองค์กรขนาดใหญ่</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* FAQ */}
        <section id="faq" className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">คำถามที่พบบ่อย</h2>
            <p className="text-gray-400">ไม่เจอคำตอบที่ต้องการ? ทักหา MeowChat ได้เลย</p>
          </div>
          <FAQSection faqs={FAQS} />
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
