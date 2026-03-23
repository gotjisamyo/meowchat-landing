import { useState, useEffect } from 'react';
import { X, CreditCard, Lock, Loader2, CheckCircle } from 'lucide-react';

// Omise.js is loaded via script tag in index.html
// window.Omise must be available before this component mounts

export default function OmiseCheckout({ plan, billing = 'monthly', onClose, onSuccess }) {
  const [step, setStep] = useState('form'); // form | processing | success
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    number: '',
    expMonth: '',
    expYear: '',
    cvc: '',
  });

  // Load Omise.js dynamically if not already loaded
  useEffect(() => {
    if (window.Omise) return;
    const script = document.createElement('script');
    script.src = 'https://cdn.omise.co/omise.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const handleChange = (e) => {
    let val = e.target.value;
    if (e.target.name === 'number') val = val.replace(/\D/g, '').slice(0, 16);
    if (e.target.name === 'cvc') val = val.replace(/\D/g, '').slice(0, 4);
    if (e.target.name === 'expMonth') val = val.replace(/\D/g, '').slice(0, 2);
    if (e.target.name === 'expYear') val = val.replace(/\D/g, '').slice(0, 4);
    setForm(prev => ({ ...prev, [e.target.name]: val }));
  };

  const formatCardNumber = (num) =>
    num.replace(/(.{4})/g, '$1 ').trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStep('processing');

    if (!window.Omise) {
      setError('Omise.js ยังโหลดไม่เสร็จ กรุณาลองใหม่');
      setStep('form');
      return;
    }

    window.Omise.setPublicKey(import.meta.env.VITE_OMISE_PUBLIC_KEY);

    window.Omise.createToken('card', {
      name: form.name,
      number: form.number,
      expiration_month: parseInt(form.expMonth),
      expiration_year: parseInt(form.expYear),
      security_code: form.cvc,
    }, async (statusCode, response) => {
      if (statusCode !== 200) {
        setError(response.message || 'บัตรไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง');
        setStep('form');
        return;
      }

      // Send token + plan to backend
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:8888'}/api/payment/charge`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              token: response.id,
              planId: plan.id,
              // Annual = price * 12 months * 0.83 (17% off), Monthly = price as-is
              // Omise uses satang (smallest unit, multiply by 100)
              amount: billing === 'annual'
                ? Math.round(plan.price * 12 * 0.83) * 100
                : plan.price * 100,
              billing,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'การชำระเงินล้มเหลว');

        setStep('success');
        setTimeout(() => {
          onSuccess?.(plan);
          onClose();
        }, 2000);
      } catch (err) {
        setError(err.message);
        setStep('form');
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#12121A] border border-white/[0.08] rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
          <div>
            <h2 className="text-lg font-bold text-white">ชำระเงิน</h2>
            <p className="text-sm text-zinc-500">
              แผน {plan.name} —{' '}
              {billing === 'annual'
                ? `฿${Math.round(plan.price * 12 * 0.83).toLocaleString()}/ปี (ประหยัด 17%)`
                : `฿${plan.price}/เดือน`}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/[0.06] rounded-xl text-zinc-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {step === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">ชำระเงินสำเร็จ!</h3>
              <p className="text-zinc-400">อัปเกรดเป็น {plan.name} เรียบร้อยแล้ว</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="text-xs text-zinc-500 font-medium mb-1.5 block">ชื่อบนบัตร</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="JOHN DOE"
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/50"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-500 font-medium mb-1.5 block">หมายเลขบัตร</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    name="number"
                    value={formatCardNumber(form.number)}
                    onChange={handleChange}
                    placeholder="0000 0000 0000 0000"
                    required
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-zinc-500 font-medium mb-1.5 block">เดือน</label>
                  <input
                    name="expMonth"
                    value={form.expMonth}
                    onChange={handleChange}
                    placeholder="MM"
                    required
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 font-medium mb-1.5 block">ปี</label>
                  <input
                    name="expYear"
                    value={form.expYear}
                    onChange={handleChange}
                    placeholder="YYYY"
                    required
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 font-medium mb-1.5 block">CVV</label>
                  <input
                    name="cvc"
                    value={form.cvc}
                    onChange={handleChange}
                    placeholder="•••"
                    required
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={step === 'processing'}
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50"
              >
                {step === 'processing' ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    กำลังประมวลผล...
                  </span>
                ) : (
                  billing === 'annual'
                    ? `ชำระ ฿${Math.round(plan.price * 12 * 0.83).toLocaleString()}`
                    : `ชำระ ฿${plan.price}`
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-zinc-600">
                <Lock className="w-3 h-3" />
                <span>ปลอดภัยด้วย Omise — PCI DSS Level 1</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
