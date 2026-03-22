import { useState } from 'react';
import { Check, X, Zap, Crown, Rocket, Loader2, Sparkles } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import OmiseCheckout from '../components/OmiseCheckout';
import { subscriptionPlans } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

// Annual pricing: 10 months price billed yearly (≈17% off)
const ANNUAL_PRICES = {
  pro: { monthly: 490, yearly: 5880, savings: 1180 },
  enterprise: { monthly: 1658, yearly: 19900, savings: 3980 },
};

export default function Pricing({ setSidebarOpen }) {
  const { user, updateSubscription } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [checkoutPlan, setCheckoutPlan] = useState(null); // plan object for modal
  const [billing, setBilling] = useState('monthly'); // 'monthly' | 'annual'

  const handleSelectPlan = (planId) => {
    if (!user) return;
    if (planId === user.subscription?.plan) return;
    const plan = subscriptionPlans.find(p => p.id === planId);
    if (!plan || plan.price === 0) return; // Free plan needs no payment
    setCheckoutPlan(plan);
  };

  const handlePaymentSuccess = (plan) => {
    updateSubscription(plan.id);
    setCheckoutPlan(null);
  };

  const getDisplayPrice = (plan) => {
    if (plan.price === 0 || !ANNUAL_PRICES[plan.id]) return { price: plan.price, original: null, savings: null, yearlyTotal: null };
    if (billing === 'annual') {
      const a = ANNUAL_PRICES[plan.id];
      return { price: a.monthly, original: plan.price, savings: a.savings, yearlyTotal: a.yearly };
    }
    return { price: plan.price, original: null, savings: null, yearlyTotal: null };
  };

  const getPlanIcon = (color) => {
    switch (color) {
      case 'orange': return Zap;
      case 'purple': return Crown;
      default: return Rocket;
    }
  };

  const getPlanGradient = (color) => {
    switch (color) {
      case 'orange': return 'from-orange-500 to-orange-400';
      case 'purple': return 'from-purple-500 to-violet-400';
      default: return 'from-zinc-600 to-zinc-500';
    }
  };

  const getCurrentPlanBadge = (planId) => {
    if (user?.subscription?.plan === planId) {
      return (
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          Current Plan
        </span>
      );
    }
    return null;
  };

  return (
    <>
    {checkoutPlan && (
      <OmiseCheckout
        plan={checkoutPlan}
        onClose={() => setCheckoutPlan(null)}
        onSuccess={handlePaymentSuccess}
      />
    )}
    <PageLayout
      title="Pricing"
      subtitle="เลือกแผนที่เหมาะกับธุรกิจของคุณ"
      setSidebarOpen={setSidebarOpen}
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Simple, Transparent Pricing</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          เลือกแผนที่ใช่สำหรับคุณ
        </h2>
        <p className="text-zinc-400 text-lg">
          เริ่มต้นฟรี และอัพเกรดเมื่อพร้อม ไม่มีค่าใช้จ่ายซ่อนเร้น
        </p>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                billing === 'monthly'
                  ? 'bg-white/[0.1] text-white shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              รายเดือน
            </button>
            <button
              onClick={() => setBilling('annual')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                billing === 'annual'
                  ? 'bg-white/[0.1] text-white shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              รายปี (ประหยัด 2 เดือน)
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ประหยัด 17%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {subscriptionPlans.map((plan, idx) => {
          const Icon = getPlanIcon(plan.color);
          const isCurrentPlan = user?.subscription?.plan === plan.id;
          const isLoading = loadingPlan === plan.id;
          const isFree = plan.price === 0;
          
          return (
            <div 
              key={plan.id}
              className={`
                relative rounded-3xl p-1 transition-all duration-300
                ${plan.popular 
                  ? 'bg-gradient-to-b from-orange-500/50 to-purple-500/50 scale-105 shadow-2xl shadow-orange-500/20' 
                  : 'bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.12]'
                }
              `}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white text-xs font-bold shadow-lg">
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  ยอดนิยม
                </div>
              )}
              
              <div className={`
                rounded-[22px] h-full p-6 lg:p-8
                ${plan.popular ? 'bg-[#0A0A0F]' : 'bg-[#0A0A0F]/80'}
              `}>
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className={`
                    inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4
                    bg-gradient-to-br ${getPlanGradient(plan.color)}
                    ${plan.popular ? 'shadow-lg shadow-orange-500/30' : ''}
                  `}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-zinc-500 mb-4">{plan.description}</p>
                  
                  {(() => {
                    const dp = getDisplayPrice(plan);
                    return (
                      <div className="flex flex-col items-center gap-1">
                        {dp.original && (
                          <span className="text-zinc-500 line-through text-sm">฿{dp.original}/เดือน</span>
                        )}
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-bold text-white transition-all duration-300">฿{dp.price}</span>
                          {plan.price > 0 && <span className="text-zinc-500">/เดือน</span>}
                        </div>
                        {dp.yearlyTotal && (
                          <span className="text-xs text-zinc-500">จ่าย ฿{dp.yearlyTotal.toLocaleString()}/ปี</span>
                        )}
                        {dp.savings && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            ประหยัด ฿{dp.savings.toLocaleString()}
                          </span>
                        )}
                      </div>
                    );
                  })()}
                  
                  {getCurrentPlanBadge(plan.id)}
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded?.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 opacity-50">
                      <div className="w-5 h-5 rounded-full bg-zinc-700/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-3 h-3 text-zinc-500" />
                      </div>
                      <span className="text-sm text-zinc-500">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isCurrentPlan || isLoading || !user}
                  className={`
                    w-full py-4 rounded-xl font-semibold transition-all duration-200
                    ${isCurrentPlan 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                      : plan.popular
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-lg hover:shadow-orange-500/30'
                        : 'bg-white/[0.06] text-white hover:bg-white/[0.1] border border-white/[0.06]'
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      กำลังอัพเกรด...
                    </span>
                  ) : isCurrentPlan ? (
                    'แผนปัจจุบัน'
                  ) : !user ? (
                    'เข้าสู่ระบบเพื่อเลือก'
                  ) : (
                    plan.cta
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-16">
        <h3 className="text-2xl font-bold text-white text-center mb-8">คำถามที่พบบ่อย</h3>
        <div className="grid gap-4">
          <FaqItem 
            question="สามารถยกเลิกแผนได้ตลอดเวลาหรือไม่?"
            answer="ใช่ค่ะ สามารถยกเลิกได้ตลอดเวลา และจะไม่ถูกเรียกเก็บเงินเพิ่มหลังจากหมดรอบเดือน"
          />
          <FaqItem 
            question="มีการทดลองใช้ฟรีหรือไม่?"
            answer="แผน Free สามารถใช้งานได้ตลอดไปโดยไม่มีค่าใช้จ่าย ส่วน Pro และ Enterprise สามารถทดลองใช้ได้ 14 วัน"
          />
          <FaqItem 
            question="รับประกันเงินคืนหรือไม่?"
            answer="เรามีนโยบายเงินคืนภายใน 30 วันหากไม่พอใจในบริการ"
          />
        </div>
      </div>
      {/* Roadmap */}
      <div className="max-w-3xl mx-auto mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
        <h3 className="text-lg font-bold text-white mb-4 text-center">🗺️ Roadmap — กำลังพัฒนา</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <RoadmapItem icon="📘" title="Facebook Messenger" label="Q2 2026" />
          <RoadmapItem icon="📸" title="Instagram DM" label="Q2 2026" />
          <RoadmapItem icon="📅" title="ระบบจองนัดในแชท" label="Q3 2026" />
        </div>
      </div>
    </PageLayout>
    </>
  );
}

function RoadmapItem({ icon, title, label }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-orange-400">{label}</p>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-semibold text-white">{question}</span>
        <div className={`w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="px-5 pb-5">
          <p className="text-zinc-400 text-sm">{answer}</p>
        </div>
      )}
    </div>
  );
}
