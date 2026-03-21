import { useState } from 'react';

export default function SlipVerifier({ orderId, expectedAmount, onVerified }) {
  const [status, setStatus] = useState('waiting'); // waiting | analyzing | verified | rejected

  const handleFileChange = () => {
    setStatus('analyzing');
    setTimeout(() => setStatus('verified'), 2000);
  };

  return (
    <div className="border-2 border-dashed border-white/[0.1] rounded-2xl p-6 text-center">
      {status === 'waiting' && (
        <>
          <div className="text-4xl mb-3">📎</div>
          <p className="text-white font-semibold">อัพโหลดสลิปโอนเงิน</p>
          <p className="text-zinc-500 text-sm mt-1">ลากวางหรือคลิกเพื่อเลือกไฟล์</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id={`slip-${orderId}`}
          />
          <label
            htmlFor={`slip-${orderId}`}
            className="mt-4 inline-block px-4 py-2 bg-orange-500 text-white rounded-xl text-sm cursor-pointer"
          >
            เลือกไฟล์
          </label>
        </>
      )}

      {status === 'analyzing' && (
        <div className="py-4">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-zinc-400 text-sm">กำลังตรวจสอบสลิป...</p>
        </div>
      )}

      {status === 'verified' && (
        <div className="py-4">
          <div className="text-4xl mb-2">✅</div>
          <p className="text-emerald-400 font-semibold">ยืนยันการชำระเงินแล้ว</p>
          <p className="text-zinc-400 text-sm mt-1">
            ฿{expectedAmount} — ออเดอร์ #{orderId}
          </p>
          <button
            onClick={() => onVerified?.()}
            className="mt-3 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-xl text-sm border border-emerald-500/30"
          >
            อัพเดทสถานะออเดอร์ →
          </button>
        </div>
      )}

      {status === 'rejected' && (
        <div className="py-4">
          <div className="text-4xl mb-2">❌</div>
          <p className="text-red-400 font-semibold">ตรวจสอบไม่ผ่าน</p>
          <p className="text-zinc-400 text-sm mt-1">กรุณาอัพโหลดสลิปใหม่อีกครั้ง</p>
          <button
            onClick={() => setStatus('waiting')}
            className="mt-3 px-4 py-2 bg-white/[0.06] text-zinc-300 rounded-xl text-sm border border-white/[0.08]"
          >
            ลองใหม่
          </button>
        </div>
      )}
    </div>
  );
}
