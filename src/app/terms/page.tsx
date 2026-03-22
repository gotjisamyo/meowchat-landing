import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ข้อกำหนดการใช้บริการ - MeowChat",
  description:
    "ข้อกำหนดและเงื่อนไขการใช้บริการ MeowChat AI Chatbot สำหรับธุรกิจไทย",
};

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold mb-2">ข้อกำหนดการใช้บริการ</h1>
          <p className="text-white/50 text-sm mb-10">
            มีผลบังคับใช้ตั้งแต่ 1 มกราคม 2567
          </p>

          <div className="space-y-8 text-white/80 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                1. การยอมรับเงื่อนไข
              </h2>
              <p>
                การเข้าใช้บริการ MeowChat ถือว่าท่านได้อ่าน เข้าใจ
                และยอมรับข้อกำหนดการใช้บริการฉบับนี้ทุกประการ
                หากท่านไม่ยอมรับเงื่อนไขใดเงื่อนไขหนึ่ง
                กรุณายุติการใช้บริการ
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                2. บริการที่ให้
              </h2>
              <p>MeowChat ให้บริการ:</p>
              <ul className="list-disc list-inside mt-3 space-y-1 pl-2">
                <li>AI Chatbot อัตโนมัติบนแพลตฟอร์ม LINE Official Account</li>
                <li>AI Chatbot อัตโนมัติบน Facebook Messenger</li>
                <li>ระบบจัดการสนทนาและการตอบคำถามอัตโนมัติ 24/7</li>
                <li>
                  แดชบอร์ดสำหรับติดตามสถิติและบริหารจัดการ chatbot
                  ของธุรกิจท่าน
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                3. ข้อห้ามการใช้งาน
              </h2>
              <p>ผู้ใช้บริการห้ามใช้ MeowChat เพื่อ:</p>
              <ul className="list-disc list-inside mt-3 space-y-1 pl-2">
                <li>ส่ง spam หรือข้อความที่ไม่ได้รับความยินยอม</li>
                <li>
                  เผยแพร่ข้อมูลเท็จ ข้อมูลหลอกลวง
                  หรือเนื้อหาที่ทำให้ผู้อื่นเสียหาย
                </li>
                <li>ละเมิดลิขสิทธิ์หรือทรัพย์สินทางปัญญาของผู้อื่น</li>
                <li>
                  กระทำการใดที่ผิดกฎหมาย หรือขัดต่อศีลธรรมอันดีของสังคม
                </li>
                <li>พยายามเจาะระบบ ทดสอบช่องโหว่ หรือโจมตีโครงสร้างพื้นฐาน</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                4. การชำระเงินและการยกเลิก
              </h2>
              <p>
                บริการ MeowChat มีแผนการใช้งานหลายระดับ
                รายละเอียดราคาและเงื่อนไขแสดงบนหน้าแผนการใช้งาน
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 pl-2">
                <li>
                  การชำระเงินเป็นรายเดือนหรือรายปีตามแผนที่เลือก
                  ไม่มีการคืนเงินสำหรับระยะเวลาที่ใช้งานไปแล้ว
                </li>
                <li>
                  ท่านสามารถยกเลิกบริการได้ตลอดเวลา
                  การยกเลิกมีผลในรอบบิลถัดไป
                </li>
                <li>
                  MeowChat
                  ขอสงวนสิทธิ์ในการปรับราคาโดยแจ้งล่วงหน้าอย่างน้อย 30 วัน
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                5. ข้อจำกัดความรับผิดชอบ
              </h2>
              <p>
                MeowChat ให้บริการ &ldquo;ตามสภาพที่เป็น&rdquo; (as-is)
                โดยไม่รับประกันว่าบริการจะไม่มีข้อผิดพลาดหรือทำงานได้อย่างต่อเนื่อง
                MeowChat ไม่รับผิดชอบต่อความเสียหายทางตรง ทางอ้อม
                หรือผลที่ตามมาจากการใช้หรือไม่สามารถใช้บริการได้
                ไม่ว่าในกรณีใดก็ตาม
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                6. กฎหมายที่บังคับใช้
              </h2>
              <p>
                ข้อกำหนดการใช้บริการฉบับนี้อยู่ภายใต้บังคับและตีความตามกฎหมายไทย
                ข้อพิพาทใดที่เกิดขึ้นจากหรือเกี่ยวข้องกับข้อกำหนดนี้
                ให้อยู่ในเขตอำนาจของศาลไทย
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                7. ติดต่อเรา
              </h2>
              <p>
                หากมีคำถามเกี่ยวกับข้อกำหนดการใช้บริการ กรุณาติดต่อ:{" "}
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
