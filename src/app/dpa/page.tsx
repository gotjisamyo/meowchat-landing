import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ข้อตกลงการประมวลผลข้อมูล (DPA) - MeowChat",
  description:
    "Data Processing Agreement (DPA) ของ MeowChat — สัญญาการประมวลผลข้อมูลส่วนบุคคลที่เป็นไปตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ.2562 (PDPA)",
};

export default function DpaPage() {
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
          <h1 className="text-3xl font-bold mb-2">
            ข้อตกลงการประมวลผลข้อมูล
          </h1>
          <p className="text-white/50 text-sm mb-1">
            Data Processing Agreement (DPA)
          </p>
          <p className="text-white/50 text-sm mb-10">
            มีผลบังคับใช้ตั้งแต่ 1 มกราคม 2567 · เป็นไปตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ.2562
          </p>

          {/* PDF Download Banner */}
          <div className="mb-10 p-5 rounded-xl border border-purple-500/30 bg-purple-500/10">
            <p className="text-white/80 text-sm mb-3">
              ต้องการ DPA ฉบับลงนาม (PDF) สำหรับองค์กรของท่าน? ติดต่อทีมงานได้ทันที
            </p>
            <a
              href="https://line.me/ti/p/@960xboyt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              ขอ DPA เป็น PDF ฉบับลงนาม →
            </a>
          </div>

          <div className="space-y-8 text-white/80 leading-relaxed">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                1. คู่สัญญา (Parties)
              </h2>
              <p>
                ข้อตกลงการประมวลผลข้อมูลฉบับนี้ทำขึ้นระหว่าง:
              </p>
              <div className="mt-4 space-y-4">
                <div className="p-4 rounded-lg border border-white/10 bg-white/5">
                  <p className="text-white font-medium mb-1">ผู้ควบคุมข้อมูลส่วนบุคคล (Data Controller)</p>
                  <p>
                    บุคคลหรือนิติบุคคลที่ลงทะเบียนใช้บริการ MeowChat ในฐานะลูกค้า
                    ซึ่งเป็นผู้กำหนดวัตถุประสงค์และวิธีการประมวลผลข้อมูลส่วนบุคคลของลูกค้าปลายทาง
                    (เรียกว่า &ldquo;ผู้ควบคุมข้อมูล&rdquo; หรือ &ldquo;ลูกค้า&rdquo;)
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-white/10 bg-white/5">
                  <p className="text-white font-medium mb-1">ผู้ประมวลผลข้อมูลส่วนบุคคล (Data Processor)</p>
                  <p>
                    บริษัทผู้ให้บริการ MeowChat ซึ่งเป็นผู้ดำเนินการประมวลผลข้อมูลส่วนบุคคล
                    ตามคำสั่งและในนามของผู้ควบคุมข้อมูล
                    (เรียกว่า &ldquo;MeowChat&rdquo; หรือ &ldquo;ผู้ประมวลผลข้อมูล&rdquo;)
                  </p>
                </div>
              </div>
              <p className="mt-4">
                ข้อตกลงฉบับนี้เป็นส่วนหนึ่งของข้อกำหนดการใช้บริการ MeowChat
                และมีผลบังคับใช้ตลอดระยะเวลาที่ลูกค้าใช้บริการ
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                2. ขอบเขตและวัตถุประสงค์การประมวลผล
              </h2>
              <p>
                MeowChat ประมวลผลข้อมูลส่วนบุคคลเพื่อวัตถุประสงค์ต่อไปนี้เท่านั้น:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 pl-2">
                <li>การให้บริการ AI Chatbot อัตโนมัติบน LINE Official Account และ Facebook Messenger ตามที่ลูกค้ากำหนดค่า</li>
                <li>การจัดเก็บและประมวลผลข้อความสนทนาเพื่อตอบสนองต่อผู้ใช้ปลายทาง</li>
                <li>การวิเคราะห์สถิติการใช้งานเพื่อแสดงผลในแดชบอร์ดของลูกค้า</li>
                <li>การปรับปรุงและรักษาคุณภาพการให้บริการภายใต้คำสั่งของผู้ควบคุมข้อมูล</li>
              </ul>
              <p className="mt-3">
                MeowChat จะไม่ประมวลผลข้อมูลส่วนบุคคลเพื่อวัตถุประสงค์อื่นนอกเหนือจากที่ระบุข้างต้น
                เว้นแต่ได้รับคำสั่งเป็นลายลักษณ์อักษรจากผู้ควบคุมข้อมูล
                หรือตามที่กฎหมายกำหนด
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                3. ประเภทข้อมูลส่วนบุคคลที่ประมวลผล
              </h2>
              <p>ข้อมูลส่วนบุคคลที่ MeowChat ประมวลผลในฐานะผู้ประมวลผลข้อมูล ได้แก่:</p>
              <ul className="list-disc list-inside mt-3 space-y-1 pl-2">
                <li>LINE User ID, Facebook Page-scoped User ID หรือตัวระบุผู้ใช้บนแพลตฟอร์มที่รองรับ</li>
                <li>ชื่อแสดงผล (Display Name) ของผู้ใช้บนแพลตฟอร์ม (ถ้ามี)</li>
                <li>เนื้อหาข้อความสนทนา รูปภาพ หรือไฟล์ที่ส่งผ่านระบบ chatbot</li>
                <li>Metadata การใช้งาน เช่น วันเวลา ประเภทข้อความ และสถิติการโต้ตอบ</li>
                <li>ข้อมูลที่ผู้ควบคุมข้อมูลกำหนดให้ chatbot เก็บรวบรวมตามกระบวนการทางธุรกิจ</li>
              </ul>
              <p className="mt-3">
                MeowChat ไม่เก็บรวบรวมข้อมูลส่วนบุคคลที่มีความอ่อนไหว (Sensitive Personal Data)
                ตามมาตรา 26 แห่ง พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ.2562
                เว้นแต่ผู้ควบคุมข้อมูลได้แจ้งและได้รับความยินยอมอย่างชัดแจ้งจากเจ้าของข้อมูลแล้ว
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                4. หน้าที่ของผู้ประมวลผลข้อมูล (MeowChat)
              </h2>
              <p>MeowChat มีพันธะและหน้าที่ดังต่อไปนี้:</p>
              <ul className="list-disc list-inside mt-3 space-y-2 pl-2">
                <li>
                  ประมวลผลข้อมูลส่วนบุคคลตามคำสั่งที่ได้รับจากผู้ควบคุมข้อมูลเท่านั้น
                  เว้นแต่มีข้อกำหนดทางกฎหมายให้กระทำเป็นอย่างอื่น
                </li>
                <li>
                  รักษาความลับของข้อมูลส่วนบุคคล และกำหนดให้บุคลากรที่เกี่ยวข้อง
                  ทุกคนอยู่ภายใต้ข้อตกลงรักษาความลับ
                </li>
                <li>
                  จัดให้มีมาตรการรักษาความปลอดภัยที่เหมาะสมตามมาตรา 37 แห่ง พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ.2562
                </li>
                <li>
                  ให้ความช่วยเหลือแก่ผู้ควบคุมข้อมูลในการตอบสนองต่อการใช้สิทธิของเจ้าของข้อมูล
                  ภายในระยะเวลาที่กฎหมายกำหนด
                </li>
                <li>
                  แจ้งเหตุละเมิดข้อมูลส่วนบุคคลแก่ผู้ควบคุมข้อมูลโดยไม่ชักช้าเมื่อรับทราบเหตุการณ์
                </li>
                <li>
                  ลบหรือส่งคืนข้อมูลส่วนบุคคลทั้งหมดเมื่อสัญญาสิ้นสุด
                  ตามที่ผู้ควบคุมข้อมูลร้องขอ
                </li>
                <li>
                  ให้ข้อมูลที่จำเป็นทั้งหมดแก่ผู้ควบคุมข้อมูลเพื่อแสดงให้เห็นว่า MeowChat
                  ปฏิบัติตามข้อตกลงนี้และกฎหมายที่บังคับใช้
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                5. มาตรการรักษาความปลอดภัย
              </h2>
              <p>
                MeowChat ใช้มาตรการทางเทคนิคและทางองค์กรที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคล
                ได้แก่:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 pl-2">
                <li>การเข้ารหัสข้อมูลด้วยมาตรฐาน AES-256 ทั้งในขณะจัดเก็บและขณะส่งผ่าน</li>
                <li>เซิร์ฟเวอร์และฐานข้อมูลตั้งอยู่ในประเทศไทย</li>
                <li>การใช้ HTTPS/TLS สำหรับการรับส่งข้อมูลทุกช่องทาง</li>
                <li>การควบคุมการเข้าถึงตามหลักการ Least Privilege (เข้าถึงได้เฉพาะสิ่งที่จำเป็น)</li>
                <li>การบันทึก Audit Log สำหรับการเข้าถึงข้อมูลสำคัญ</li>
                <li>การสำรองข้อมูล (Backup) อย่างสม่ำเสมอและการทดสอบการกู้คืนข้อมูล</li>
                <li>การอบรมพนักงานเกี่ยวกับการรักษาความปลอดภัยของข้อมูลและ PDPA</li>
                <li>การตรวจสอบและทดสอบความมั่นคงปลอดภัยของระบบอย่างสม่ำเสมอ</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                6. การใช้ผู้ประมวลผลข้อมูลช่วง (Sub-processors)
              </h2>
              <p>
                MeowChat อาจใช้ผู้ให้บริการภายนอก (Sub-processors)
                ในการดำเนินกิจกรรมประมวลผลข้อมูลบางส่วน
                โดยผู้ให้บริการเหล่านี้ได้แก่:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 pl-2">
                <li>ผู้ให้บริการโครงสร้างพื้นฐานคลาวด์ (Cloud Infrastructure) ในประเทศไทย</li>
                <li>ผู้ให้บริการโมเดล AI สำหรับการประมวลผลภาษาธรรมชาติ</li>
                <li>ผู้ให้บริการระบบส่งข้อความและการแจ้งเตือน</li>
              </ul>
              <p className="mt-3">
                MeowChat ผูกพัน Sub-processors ทุกรายด้วยสัญญาการรักษาความลับ
                และข้อกำหนดด้านการคุ้มครองข้อมูลที่เทียบเท่าหรือเข้มงวดกว่าข้อตกลงฉบับนี้
                ผู้ควบคุมข้อมูลสามารถขอรายชื่อ Sub-processors ฉบับปัจจุบันได้ที่{" "}
                <a
                  href="mailto:support@meowchat.store"
                  className="text-white underline hover:text-white/80"
                >
                  support@meowchat.store
                </a>
              </p>
              <p className="mt-3">
                MeowChat จะแจ้งให้ผู้ควบคุมข้อมูลทราบล่วงหน้าอย่างน้อย 14 วัน
                ก่อนเพิ่มหรือเปลี่ยน Sub-processors
                โดยผู้ควบคุมข้อมูลมีสิทธิ์คัดค้านการเปลี่ยนแปลงดังกล่าวได้
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                7. สิทธิของเจ้าของข้อมูล
              </h2>
              <p>
                MeowChat ให้ความช่วยเหลือผู้ควบคุมข้อมูลในการตอบสนองต่อการใช้สิทธิของเจ้าของข้อมูล
                ตามมาตรา 30–36 แห่ง พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ.2562 ได้แก่:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 pl-2">
                <li>สิทธิในการเข้าถึงและรับสำเนาข้อมูลส่วนบุคคล (Right of Access)</li>
                <li>สิทธิในการแก้ไขข้อมูลที่ไม่ถูกต้อง (Right to Rectification)</li>
                <li>สิทธิในการลบหรือทำลายข้อมูล (Right to Erasure)</li>
                <li>สิทธิในการคัดค้านการประมวลผล (Right to Object)</li>
                <li>สิทธิในการขอให้ระงับการใช้ข้อมูล (Right to Restriction)</li>
                <li>สิทธิในการโอนย้ายข้อมูล (Right to Data Portability)</li>
              </ul>
              <p className="mt-3">
                เมื่อผู้ควบคุมข้อมูลได้รับคำร้องจากเจ้าของข้อมูลและส่งต่อมายัง MeowChat
                MeowChat จะดำเนินการให้แล้วเสร็จภายใน 30 วันนับแต่วันที่ได้รับคำร้อง
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                8. ระยะเวลาเก็บรักษาข้อมูล (Data Retention)
              </h2>
              <p>
                MeowChat จะเก็บรักษาข้อมูลส่วนบุคคลตามระยะเวลาดังนี้:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 pl-2">
                <li>
                  <span className="text-white">ระหว่างสัญญา:</span>{" "}
                  เก็บข้อมูลตลอดระยะเวลาที่ลูกค้าใช้บริการ MeowChat
                </li>
                <li>
                  <span className="text-white">หลังสิ้นสุดสัญญา:</span>{" "}
                  เก็บรักษาข้อมูลไม่เกิน <strong>24 เดือน</strong> นับแต่วันที่บัญชีถูกปิด
                  หรือสัญญาสิ้นสุด เพื่อวัตถุประสงค์ทางกฎหมายและการตรวจสอบ
                </li>
                <li>
                  <span className="text-white">การลบข้อมูลก่อนกำหนด:</span>{" "}
                  ผู้ควบคุมข้อมูลสามารถร้องขอให้ลบข้อมูลก่อนครบ 24 เดือนได้
                  โดยแจ้งที่ support@meowchat.store
                </li>
              </ul>
              <p className="mt-3">
                เมื่อครบกำหนดระยะเวลาเก็บรักษา MeowChat จะลบหรือทำลายข้อมูลส่วนบุคคล
                อย่างถาวรและปลอดภัย ด้วยวิธีที่ไม่สามารถกู้คืนได้
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                9. การแจ้งเหตุละเมิดข้อมูล (Data Breach Notification)
              </h2>
              <p>
                หาก MeowChat ตรวจพบหรือได้รับแจ้งเหตุการณ์ที่อาจเป็นการละเมิดข้อมูลส่วนบุคคล
                MeowChat จะดำเนินการดังนี้:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 pl-2">
                <li>
                  แจ้งผู้ควบคุมข้อมูลภายใน <strong>72 ชั่วโมง</strong> นับแต่รับทราบเหตุการณ์
                  ผ่านช่องทางอีเมลที่ลงทะเบียนไว้
                </li>
                <li>
                  ให้ข้อมูลเบื้องต้นเกี่ยวกับลักษณะของเหตุการณ์
                  ข้อมูลที่อาจได้รับผลกระทบ และมาตรการที่ดำเนินการไปแล้ว
                </li>
                <li>
                  ให้ความช่วยเหลือผู้ควบคุมข้อมูลในการแจ้งสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (สคส.)
                  และเจ้าของข้อมูลตามที่กฎหมายกำหนด
                </li>
                <li>
                  ดำเนินมาตรการแก้ไขและป้องกันการเกิดซ้ำโดยเร็วที่สุด
                </li>
              </ul>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                10. การส่งข้อมูลไปต่างประเทศ
              </h2>
              <p>
                MeowChat จัดเก็บและประมวลผลข้อมูลส่วนบุคคลบนเซิร์ฟเวอร์ที่ตั้งอยู่ใน
                <strong> ประเทศไทย</strong> เป็นหลัก
              </p>
              <p className="mt-3">
                ในกรณีที่จำเป็นต้องถ่ายโอนข้อมูลไปยังต่างประเทศ (เช่น เพื่อใช้บริการโมเดล AI)
                MeowChat จะดำเนินการตามมาตรา 28 แห่ง พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ.2562
                โดย:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 pl-2">
                <li>ส่งข้อมูลไปยังประเทศที่มีมาตรฐานการคุ้มครองข้อมูลเพียงพอเท่านั้น</li>
                <li>ใช้สัญญามาตรฐานหรือกลไกทางกฎหมายที่เหมาะสมในการถ่ายโอนข้อมูล</li>
                <li>แจ้งให้ผู้ควบคุมข้อมูลทราบและขอความยินยอมก่อนการถ่ายโอน หากจำเป็น</li>
              </ul>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                11. การยุติสัญญาและการลบข้อมูล
              </h2>
              <p>
                เมื่อสัญญาการใช้บริการสิ้นสุดลงไม่ว่าด้วยเหตุใดก็ตาม:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 pl-2">
                <li>
                  MeowChat จะหยุดประมวลผลข้อมูลส่วนบุคคลในนามของผู้ควบคุมข้อมูลทันที
                </li>
                <li>
                  ผู้ควบคุมข้อมูลสามารถส่งออก (Export) ข้อมูลของตนออกจากระบบ
                  ผ่านแดชบอร์ดหรือโดยแจ้ง support@meowchat.store ภายใน 30 วันหลังสิ้นสุดสัญญา
                </li>
                <li>
                  หลังครบ 30 วัน MeowChat จะระงับการเข้าถึงข้อมูล
                  และข้อมูลจะถูกลบอย่างถาวรเมื่อครบกำหนด 24 เดือน ตามข้อ 8
                </li>
                <li>
                  MeowChat จะออกหนังสือรับรองการลบข้อมูล (Certificate of Deletion)
                  ให้แก่ผู้ควบคุมข้อมูลเมื่อร้องขอ
                </li>
              </ul>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                12. กฎหมายที่ใช้บังคับและการระงับข้อพิพาท
              </h2>
              <p>
                ข้อตกลงการประมวลผลข้อมูลฉบับนี้อยู่ภายใต้บังคับและตีความตามกฎหมายไทย
                โดยเฉพาะ พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ.2562 และกฎหมายที่เกี่ยวข้อง
              </p>
              <p className="mt-3">
                ข้อพิพาทใดที่เกิดขึ้นจากหรือเกี่ยวข้องกับข้อตกลงฉบับนี้
                คู่สัญญาจะพยายามระงับด้วยการเจรจาโดยสุจริตก่อน
                หากไม่สามารถตกลงกันได้ภายใน 30 วัน
                ให้นำข้อพิพาทเสนอต่อศาลที่มีเขตอำนาจในประเทศไทย
              </p>
            </section>

            {/* Section 13 — Contact */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                13. ช่องทางติดต่อ
              </h2>
              <p>
                สำหรับคำถาม การใช้สิทธิ หรือการขอสำเนา DPA ฉบับลงนาม กรุณาติดต่อ:
              </p>
              <ul className="mt-3 space-y-2 pl-2">
                <li>
                  <span className="text-white">อีเมล:</span>{" "}
                  <a
                    href="mailto:support@meowchat.store"
                    className="text-white underline hover:text-white/80"
                  >
                    support@meowchat.store
                  </a>
                </li>
                <li>
                  <span className="text-white">LINE Official Account:</span>{" "}
                  <a
                    href="https://line.me/ti/p/@960xboyt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline hover:text-white/80"
                  >
                    @MeowChat
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                MeowChat ตอบรับคำร้องภายใน 3 วันทำการ
                และจะดำเนินการให้แล้วเสร็จภายในระยะเวลาที่กฎหมายกำหนด
              </p>
            </section>
          </div>

          {/* Bottom PDF CTA */}
          <div className="mt-10 pt-8 border-t border-white/10 text-center">
            <p className="text-white/60 text-sm mb-4">
              ต้องการ DPA ฉบับลงนามสำหรับองค์กรของท่าน?
            </p>
            <a
              href="https://line.me/ti/p/@960xboyt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors"
            >
              ขอ DPA เป็น PDF ฉบับลงนาม →
            </a>
            <p className="text-white/40 text-xs mt-3">
              ติดต่อผ่าน LINE ได้ทันที · ตอบรับภายใน 1 วันทำการ
            </p>
          </div>
        </div>

        {/* Back link bottom */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm text-white/50">
          <Link href="/privacy" className="hover:text-white transition-colors">
            นโยบายความเป็นส่วนตัว
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            ข้อกำหนดการใช้บริการ
          </Link>
        </div>
      </div>
    </div>
  );
}
