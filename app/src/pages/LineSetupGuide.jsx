// LineSetupGuide.jsx — LINE OA Setup Guide
// เพิ่มเมื่อ 2026-03-23 สำหรับลูกค้าที่ติดขัดตรง "เชื่อม LINE OA ยังไง"

export default function LineSetupGuide() {
  const webhookUrl = 'https://api.meowchat.store/api/line/webhook';

  const copyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl);
  };

  const steps = [
    {
      title: 'เข้า LINE Developers Console',
      desc: 'ไปที่ developers.line.biz แล้วล็อกอินด้วยบัญชี LINE ของคุณ',
      action: (
        <a
          href="https://developers.line.biz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-green-400 hover:text-green-300 transition border border-green-500/30 rounded-lg px-3 py-1.5 hover:bg-green-500/10"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          เปิด LINE Developers
        </a>
      ),
      screenshot: 'LINE Developers Console — หน้า Login',
    },
    {
      title: 'สร้าง / เลือก Provider → สร้าง Messaging API Channel',
      desc: 'ถ้ายังไม่มี Provider กด "Create a new provider" ตั้งชื่อร้านค้าของคุณ จากนั้นกด "Create a Messaging API channel"',
      screenshot: 'Provider List → Create Messaging API Channel',
    },
    {
      title: 'เปิด Messaging API tab → Copy Channel Secret',
      desc: 'ใน Channel ที่สร้าง ไปที่แถบ "Basic settings" เลื่อนลงมาหา "Channel secret" คัดลอกค่านี้ไว้',
      screenshot: 'Basic Settings → Channel Secret',
    },
    {
      title: 'ออก Channel Access Token',
      desc: 'ไปที่แถบ "Messaging API" เลื่อนลงมาหา "Channel access token (long-lived)" กด "Issue" แล้วคัดลอกค่า token',
      screenshot: 'Messaging API Tab → Channel Access Token → Issue',
    },
    {
      title: 'ใส่ใน MeowChat — Onboarding Step 5',
      desc: 'กลับมาที่ MeowChat app.meowchat.store/onboarding วาง Channel Access Token และ Channel Secret ที่ช่องที่กำหนด',
      action: (
        <a
          href="/onboarding"
          className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 transition border border-orange-500/30 rounded-lg px-3 py-1.5 hover:bg-orange-500/10"
        >
          ไปที่ Onboarding Step 5 →
        </a>
      ),
      screenshot: 'MeowChat Onboarding — เชื่อมต่อ LINE OA',
    },
    {
      title: 'ตั้ง Webhook URL',
      desc: 'กลับไปที่ LINE Developers Console → แถบ "Messaging API" หา "Webhook URL" วาง URL ด้านล่างนี้:',
      action: (
        <div className="flex items-center gap-2 mt-2">
          <code className="flex-1 bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2 text-xs text-green-300 font-mono break-all">
            {webhookUrl}
          </code>
          <button
            onClick={copyWebhook}
            className="flex-shrink-0 flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition border border-white/10 rounded-lg px-3 py-2 hover:bg-white/10"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </button>
        </div>
      ),
      screenshot: 'Messaging API Tab → Webhook URL',
    },
    {
      title: 'เปิด "Use webhook" และ Verify',
      desc: 'Toggle "Use webhook" ให้เป็น On จากนั้นกด "Verify" — ถ้าขึ้น "Success" แสดงว่าเชื่อมต่อสำเร็จแล้ว!',
      screenshot: 'Use webhook = ON → Verify → Success',
    },
  ];

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
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 text-sm text-green-400 font-medium mb-4">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
            </svg>
            LINE OA Setup Guide
          </div>
          <h1 className="text-3xl font-bold mb-3">วิธีเชื่อม LINE OA กับ MeowChat</h1>
          <p className="text-zinc-400">
            ทำตาม 7 ขั้นตอนนี้เพื่อให้บอท MeowChat ตอบข้อความใน LINE OA ของคุณโดยอัตโนมัติ
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-zinc-500 text-sm">
              <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ใช้เวลาประมาณ 10 นาที
            </div>
            <div className="flex items-center gap-1.5 text-zinc-500 text-sm">
              <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ไม่ต้องมีความรู้ด้าน technical
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              {/* Step number + line */}
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-400 font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-white/10 mt-3 mb-0 min-h-[24px]" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <h3 className="font-semibold text-white mb-1.5">{step.title}</h3>
                <p className="text-zinc-400 text-sm mb-3">{step.desc}</p>

                {/* Action (link/button/code) */}
                {step.action && <div className="mb-3">{step.action}</div>}

                {/* Screenshot placeholder */}
                <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
                  <div className="h-36 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mx-auto mb-2">
                        <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-zinc-600 text-xs">{step.screenshot}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Banner */}
        <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="font-semibold text-white mb-1">เชื่อมต่อสำเร็จ!</p>
              <p className="text-zinc-400 text-sm">
                บอท MeowChat จะเริ่มตอบข้อความอัตโนมัติใน LINE OA ของคุณทันที
                ลองส่งข้อความทดสอบดูได้เลย
              </p>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-white/[0.03] border border-white/10 rounded-2xl p-5">
          <p className="font-medium text-white mb-2">ติดปัญหา?</p>
          <p className="text-zinc-400 text-sm mb-3">
            ถ้า Verify ไม่ผ่าน หรือบอทไม่ตอบ ลองตรวจสอบสิ่งเหล่านี้ก่อน:
          </p>
          <ul className="space-y-1.5 text-zinc-400 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">•</span>
              ตรวจสอบว่า Channel Access Token และ Channel Secret ถูกต้อง (ไม่มี space หน้าหลัง)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">•</span>
              ตรวจสอบว่า Webhook URL ถูกต้องและเปิด "Use webhook" แล้ว
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">•</span>
              ปิด Auto-reply ของ LINE OA เพื่อไม่ให้ซ้อนทับกับบอท
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-zinc-500 text-sm">
              ยังติดปัญหาอยู่?{' '}
              <a href="mailto:support@meowchat.store" className="text-orange-400 hover:text-orange-300 transition">
                ติดต่อ support@meowchat.store
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 mt-10 pt-8 text-center">
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
