import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen hero-gradient">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter text-gradient">MeowChat</div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">ฟีเจอร์</a>
          <a href="#pricing" className="hover:text-white transition-colors">ราคา</a>
          <a href="#contact" className="hover:text-white transition-colors">ติดต่อเรา</a>
        </div>
        <a 
          href="https://line.me/ti/p/@960xboyt" 
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105"
        >
          ลองใช้งานฟรี
        </a>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 mt-10">
          ยกระดับธุรกิจไทยด้วย <br />
          <span className="text-gradient underline decoration-purple-500/30">AI Chatbot</span> อัจฉริยะ
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10">
          เปลี่ยนแชทให้เป็นเงิน MeowChat ช่วยธุรกิจตอบลูกค้า ปิดการขาย และรันงานโปรดักชั่นอัตโนมัติ 24/7 บน LINE และ Messenger
        </p>
        
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20 mb-20 border border-white/10">
          <Image 
            src="/hero.png" 
            alt="MeowChat AI" 
            fill 
            className="object-cover"
            priority
          />
        </div>

        {/* Pricing Section (Revenue Architect) */}
        <section id="pricing" className="w-full py-20 border-t border-white/5">
          <h2 className="text-3xl font-bold mb-12">ราคาแพ็กเกจ</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-2xl flex flex-col items-center">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <div className="text-4xl font-bold mb-4">฿0<span className="text-sm text-gray-500">/เดือน</span></div>
              <ul className="text-gray-400 text-sm space-y-3 mb-8 text-left w-full">
                <li>• รองรับ 1 ช่องทาง (LINE)</li>
                <li>• ตอบแชทอัตโนมัติ 100 ข้อความ</li>
                <li>• ระบบ AI วิเคราะห์ลูกค้าระดับต้น</li>
              </ul>
              <button className="w-full py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">เริ่มเลย</button>
            </div>
            
            <div className="glass p-8 rounded-2xl flex flex-col items-center border-purple-500/50 shadow-lg shadow-purple-500/10 scale-105 bg-purple-500/5">
              <div className="bg-purple-600 text-[10px] uppercase font-bold px-3 py-1 rounded-full mb-4">ยอดนิยม</div>
              <h3 className="text-xl font-bold mb-2">Business</h3>
              <div className="text-4xl font-bold mb-4">฿2,990<span className="text-sm text-gray-500">/เดือน</span></div>
              <ul className="text-gray-400 text-sm space-y-3 mb-8 text-left w-full">
                <li>• รองรับ LINE & Messenger</li>
                <li>• ตอบแชทไม่จำกัด</li>
                <li>• ปิดการขายด้วยระบบ AI SalesAgent</li>
                <li>• เชื่อมต่อ API หลังบ้านธุรกิจ</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 font-bold transition-colors">สมัครเลย</button>
            </div>

            <div className="glass p-8 rounded-2xl flex flex-col items-center">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <div className="text-gray-400 mb-4 font-bold">ราคาตามขนาดธุรกิจ</div>
              <ul className="text-gray-400 text-sm space-y-3 mb-8 text-left w-full">
                <li>• ทุกอย่างใน Business</li>
                <li>• Custom AI Persona ขั้นสูง</li>
                <li>• ตัวแทนดูแลบัญชีส่วนตัว</li>
                <li>• ติดตั้งบน Server ส่วนตัวได้</li>
              </ul>
              <button className="w-full py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors">ติดต่อฝ่ายขาย</button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="w-full pt-10 border-t border-white/5 text-gray-500 text-sm">
          <p>© 2026 MeowChat.store by Mawsom - All Rights Reserved.</p>
        </footer>
      </main>
    </div>
  );
}
