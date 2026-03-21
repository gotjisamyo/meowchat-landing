export default function PromptPayQR({ amount, orderId, phoneNumber = '0891234567' }) {
  return (
    <div className="bg-white rounded-2xl p-6 text-center max-w-xs mx-auto">
      {/* PromptPay label */}
      <div className="text-sm text-gray-500 mb-2">PromptPay / พร้อมเพย์</div>

      {/* QR Code placeholder — CSS grid pattern seeded by amount + orderId */}
      <div className="w-48 h-48 mx-auto mb-4 bg-white border-2 border-gray-200 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-10 gap-px p-2">
          {Array.from({ length: 100 }).map((_, i) => {
            const seed = (amount * 7 + (orderId?.charCodeAt(0) ?? 0) + i * 13) % 17;
            return (
              <div
                key={i}
                className={`${seed > 8 ? 'bg-black' : 'bg-white'} rounded-sm`}
              />
            );
          })}
        </div>

        {/* Corner finder patterns */}
        <div className="absolute top-2 left-2 w-8 h-8 border-4 border-black rounded-sm bg-white">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-sm" />
          </div>
        </div>
        <div className="absolute top-2 right-2 w-8 h-8 border-4 border-black rounded-sm bg-white">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-sm" />
          </div>
        </div>
        <div className="absolute bottom-2 left-2 w-8 h-8 border-4 border-black rounded-sm bg-white">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-sm" />
          </div>
        </div>
      </div>

      <div className="text-2xl font-bold text-gray-800 mb-1">฿{amount.toLocaleString()}</div>
      <div className="text-sm text-gray-500">ออเดอร์ #{orderId}</div>
      <div className="text-xs text-gray-400 mt-2">{phoneNumber}</div>
      <div className="mt-4 text-xs text-gray-400 bg-gray-50 rounded-lg p-2">
        สแกนด้วย Mobile Banking หรือ PromptPay App
      </div>
    </div>
  );
}
