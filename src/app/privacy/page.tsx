import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว - MeowChat",
  description: "นโยบายความเป็นส่วนตัวของ MeowChat AI Chatbot สำหรับธุรกิจไทย",
};

export default function PrivacyPage() {
  return (
    <div className="hero-gradient min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-10"
        >
          ← กลับหน้าหลัก
        </Link>

        <div className="glass rounded-2xl p-8 md:p-12">
          <h1 className="text-3xl font-bold mb-2">นโยบายความเป็นส่วนตัว</h1>
          <p className="text-white/50 text-sm mb-10">
            มีผลบังคับใช้ตั้งแต่ 1 มกราคม 2567
          </p>

          <div className="space-y-8 text-white/80 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                1. ข้อมูลที่เก็บรวบรวม
              </h2>
              <p>
                MeowChat เก็บรวบรวมข้อมูลที่จำเป็นสำหรับการให้บริการ ได้แก่:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 pl-2">
                <li>LINE User ID หรือ Messenger User ID</li>
                <li>ข้อความและเนื้อหาการสนทนาที่ส่งผ่านระบบ chatbot</li>
                <li>
                  Metadata การใช้งาน เช่น เวลาที่ส่งข้อความ ประเภทข้อความ
                  และสถิติการใช้งาน
                </li>
                <li>ข้อมูลบัญชีผู้ใช้ที่ลงทะเบียนใช้บริการ</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                2. วัตถุประสงค์การใช้ข้อมูล
              </h2>
              <p>เราใช้ข้อมูลที่เก็บรวบรวมเพื่อ:</p>
              <ul className="list-disc list-inside mt-3 space-y-1 pl-2">
                <li>ให้บริการ AI Chatbot ตอบสนองต่อข้อความของผู้ใช้</li>
                <li>ปรับปรุงคุณภาพและประสิทธิภาพของระบบ</li>
                <li>วิเคราะห์สถิติการใช้งานเพื่อพัฒนาผลิตภัณฑ์</li>
                <li>ติดต่อสื่อสารเกี่ยวกับบริการ การอัปเดต และการสนับสนุน</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                3. การแชร์ข้อมูล
              </h2>
              <p>
                MeowChat
                ไม่แชร์ข้อมูลส่วนบุคคลของท่านกับบุคคลที่สามเพื่อวัตถุประสงค์ทางการตลาดหรือเชิงพาณิชย์
                เราอาจเปิดเผยข้อมูลเฉพาะในกรณีต่อไปนี้:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 pl-2">
                <li>เมื่อกฎหมายหรือหน่วยงานภาครัฐมีคำสั่งให้เปิดเผย</li>
                <li>
                  กับผู้ให้บริการโครงสร้างพื้นฐาน (เช่น cloud provider)
                  ที่ผูกพันตามสัญญาการรักษาความลับ
                </li>
                <li>
                  เพื่อปกป้องสิทธิ์ ทรัพย์สิน หรือความปลอดภัยของ MeowChat
                  และผู้ใช้
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                4. สิทธิ์ของเจ้าของข้อมูลตาม PDPA 2562
              </h2>
              <p>
                ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
                ท่านมีสิทธิ์:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 pl-2">
                <li>สิทธิ์เข้าถึงและรับสำเนาข้อมูลส่วนบุคคลของท่าน</li>
                <li>สิทธิ์แก้ไขข้อมูลที่ไม่ถูกต้องหรือไม่สมบูรณ์</li>
                <li>สิทธิ์ขอลบหรือทำลายข้อมูลส่วนบุคคล</li>
                <li>สิทธิ์คัดค้านการประมวลผลข้อมูลส่วนบุคคล</li>
                <li>สิทธิ์ขอให้ระงับการใช้ข้อมูลส่วนบุคคล</li>
                <li>สิทธิ์ในการโอนย้ายข้อมูลส่วนบุคคล</li>
              </ul>
              <p className="mt-3">
                หากต้องการใช้สิทธิ์ดังกล่าว กรุณาติดต่อเราที่{" "}
                <a
                  href="mailto:support@meowchat.store"
                  className="text-white underline hover:text-white/80"
                >
                  support@meowchat.store
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                5. ช่องทางติดต่อ
              </h2>
              <p>
                หากมีคำถามหรือข้อสงสัยเกี่ยวกับนโยบายความเป็นส่วนตัว
                กรุณาติดต่อ:
              </p>
              <p className="mt-2">
                อีเมล:{" "}
                <a
                  href="mailto:support@meowchat.store"
                  className="text-white underline hover:text-white/80"
                >
                  support@meowchat.store
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
