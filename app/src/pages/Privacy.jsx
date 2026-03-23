// Privacy.jsx — PDPA Compliance Page
// เพิ่มเมื่อ 2026-03-23 สำหรับลูกค้าถาม: ข้อมูลเก็บที่ไหน, PDPA ผ่านไหม, ลบข้อมูลได้ไหม

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <span className="text-2xl">🐱</span>
          <span className="text-lg font-bold text-orange-400">MeowChat</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 text-sm text-orange-400 font-medium mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            PDPA Compliant
          </div>
          <h1 className="text-3xl font-bold mb-3">นโยบายความเป็นส่วนตัว</h1>
          <p className="text-zinc-400">
            MeowChat ให้ความสำคัญกับความเป็นส่วนตัวของข้อมูลของคุณ
            เราปฏิบัติตาม <strong className="text-white">พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)</strong>
          </p>
          <p className="text-zinc-500 text-sm mt-2">อัปเดตล่าสุด: 23 มีนาคม 2026</p>
        </div>

        {/* Section 1: ข้อมูลที่เก็บ */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 text-sm font-bold flex items-center justify-center">1</span>
            ข้อมูลที่เราเก็บรวบรวม
          </h2>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-4">
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-white">ข้อมูลบัญชี</p>
                <p className="text-zinc-400 text-sm">ชื่อร้านค้า, อีเมล, เบอร์โทรศัพท์, ประเภทธุรกิจ — ใช้สำหรับสร้างบัญชีและติดต่อกลับ</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-white">Conversation Logs</p>
                <p className="text-zinc-400 text-sm">ข้อความสนทนาระหว่างบอทและลูกค้าของคุณ — ใช้เพื่อ AI เรียนรู้และตอบได้ดีขึ้น</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-white">ข้อมูล LINE OA</p>
                <p className="text-zinc-400 text-sm">Channel Access Token, Channel Secret — ใช้เชื่อมต่อ LINE Official Account ของคุณ (เข้ารหัสก่อนจัดเก็บ)</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-white">Knowledge Base</p>
                <p className="text-zinc-400 text-sm">ข้อมูลสินค้า, คำถามที่พบบ่อย, นโยบายร้านค้า ที่คุณอัปโหลดเข้าระบบ</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-white">ข้อมูลการใช้งาน</p>
                <p className="text-zinc-400 text-sm">จำนวนข้อความ, Analytics — ใช้แสดง Dashboard และปรับปรุงบริการ</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: เก็บที่ไหน */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 text-sm font-bold flex items-center justify-center">2</span>
            เก็บข้อมูลที่ไหน
          </h2>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-white">Railway Cloud (Singapore Region)</p>
                <p className="text-zinc-400 text-sm">Server ตั้งอยู่ที่ Singapore — ใกล้ประเทศไทย latency ต่ำ ข้อมูลไม่ออกนอกภูมิภาค APAC</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582 4 8 4m0 0c4.418 0 8-1.79 8-4" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-white">PostgreSQL Database</p>
                <p className="text-zinc-400 text-sm">ฐานข้อมูลเข้ารหัส at-rest, ทำ automated backup ทุกวัน, ข้อมูลสำรองเก็บ 7 วัน</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-white">การรักษาความปลอดภัย</p>
                <p className="text-zinc-400 text-sm">HTTPS/TLS สำหรับข้อมูลขณะส่ง, Token และ Secret เข้ารหัสก่อนจัดเก็บ, JWT Authentication</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: PDPA Compliance */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 text-sm font-bold flex items-center justify-center">3</span>
            สิทธิ์ของคุณตาม PDPA
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                icon: '👁️',
                title: 'สิทธิ์ขอดูข้อมูล',
                desc: 'คุณสามารถขอดูข้อมูลทั้งหมดที่เราเก็บเกี่ยวกับคุณได้ทุกเมื่อ',
              },
              {
                icon: '✏️',
                title: 'สิทธิ์แก้ไขข้อมูล',
                desc: 'คุณสามารถแก้ไขข้อมูลที่ไม่ถูกต้องผ่าน Settings ในแอปได้เลย',
              },
              {
                icon: '🗑️',
                title: 'สิทธิ์ลบข้อมูล',
                desc: 'คุณสามารถขอลบบัญชีและข้อมูลทั้งหมดได้ภายใน 30 วันทำการ',
              },
              {
                icon: '📦',
                title: 'สิทธิ์ขอรับข้อมูล',
                desc: 'คุณสามารถขอรับข้อมูลของคุณในรูปแบบ JSON/CSV ได้',
              },
              {
                icon: '🚫',
                title: 'สิทธิ์คัดค้าน',
                desc: 'คุณสามารถคัดค้านการประมวลผลข้อมูลเพื่อการตลาดได้',
              },
              {
                icon: '⏸️',
                title: 'สิทธิ์ระงับการใช้',
                desc: 'คุณสามารถขอระงับการใช้ข้อมูลชั่วคราวระหว่างการตรวจสอบได้',
              },
            ].map((right, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                <div className="text-2xl mb-2">{right.icon}</div>
                <p className="font-medium text-white text-sm mb-1">{right.title}</p>
                <p className="text-zinc-400 text-xs">{right.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Data Retention */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 text-sm font-bold flex items-center justify-center">4</span>
            ระยะเวลาเก็บข้อมูล
          </h2>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-zinc-300 text-sm">ข้อมูลบัญชีและร้านค้า</span>
              <span className="text-orange-400 text-sm font-medium">ตลอดอายุสมาชิก</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-zinc-300 text-sm">Conversation Logs</span>
              <span className="text-orange-400 text-sm font-medium">90 วัน (rolling)</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-zinc-300 text-sm">Analytics Data</span>
              <span className="text-orange-400 text-sm font-medium">12 เดือน</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-zinc-300 text-sm">ข้อมูลหลังยกเลิก Subscription</span>
              <span className="text-orange-400 text-sm font-medium">90 วัน แล้วลบถาวร</span>
            </div>
          </div>
          <p className="text-zinc-500 text-xs mt-3">
            * หลังจากยกเลิก subscription ข้อมูลทั้งหมดจะถูกลบออกจากระบบอย่างถาวรภายใน 90 วัน
            คุณสามารถ export ข้อมูลก่อนยกเลิกได้
          </p>
        </section>

        {/* Section 5: ติดต่อ */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 text-sm font-bold flex items-center justify-center">5</span>
            ติดต่อเรื่องข้อมูลส่วนบุคคล
          </h2>
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-5">
            <p className="text-zinc-300 text-sm mb-4">
              หากคุณต้องการใช้สิทธิ์ตาม PDPA หรือมีคำถามเกี่ยวกับข้อมูลส่วนบุคคล
              กรุณาติดต่อเราได้ที่:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:support@meowchat.store" className="text-orange-400 hover:text-orange-300 transition text-sm font-medium">
                  support@meowchat.store
                </a>
              </div>
              <p className="text-zinc-500 text-xs pl-7">เราจะตอบกลับภายใน 3 วันทำการ</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-zinc-500 text-sm">
            © 2026 MeowChat. All rights reserved.
            &nbsp;·&nbsp;
            <a href="/privacy" className="hover:text-zinc-300 transition-colors">นโยบายความเป็นส่วนตัว</a>
            &nbsp;·&nbsp;
            <a href="https://meowchat.store/terms.html" className="hover:text-zinc-300 transition-colors">ข้อกำหนดการใช้บริการ</a>
          </p>
        </div>
      </div>
    </div>
  );
}
