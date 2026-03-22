"use client";
import { useState } from "react";

interface PricingPlan {
  name: string;
  monthly: number | null;
  annual: number | null;
  badge: string | null;
  features: string[];
  cta: string;
  highlight: boolean;
  subNote?: string;
  freeNote?: string;
}

export default function PricingSection({ plans }: { plans: PricingPlan[] }) {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      {/* Billing toggle */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center gap-3 glass rounded-full px-4 py-2">
          <span className={`text-sm font-medium ${!annual ? "text-white" : "text-gray-400"}`}>รายเดือน</span>
          <button
            role="switch"
            aria-checked={annual}
            aria-label="สลับระหว่างราคารายเดือนและรายปี"
            onClick={() => setAnnual(!annual)}
            className={`relative w-12 h-6 rounded-full transition-colors ${annual ? "bg-purple-600" : "bg-white/20"}`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${annual ? "translate-x-6" : "translate-x-0.5"}`}
            />
          </button>
          <span className={`text-sm font-medium ${annual ? "text-white" : "text-gray-400"}`}>
            รายปี <span className="text-green-400 text-xs font-bold">เหมือนได้ฟรี 2 เดือน</span>
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`glass p-8 rounded-2xl flex flex-col ${
              plan.highlight
                ? "border-purple-500/50 shadow-lg shadow-purple-500/10 md:scale-105 bg-purple-500/5"
                : ""
            }`}
          >
            {plan.badge && (
              <div className="bg-purple-600 text-[10px] uppercase font-bold px-3 py-1 rounded-full mb-4 self-start">
                {plan.badge}
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            {plan.monthly !== null ? (
              <div className="text-4xl font-bold mb-1">
                ฿{annual && plan.annual !== null ? plan.annual.toLocaleString() : plan.monthly.toLocaleString()}
                <span className="text-sm text-gray-500">/เดือน</span>
              </div>
            ) : (
              <div className="text-gray-400 mb-1 font-bold text-xl">ราคาตามขนาดธุรกิจ</div>
            )}
            {annual && plan.monthly !== null && plan.monthly > 0 && (
              <div className="text-green-400 text-xs mb-2">
                ประหยัด ฿{((plan.monthly - (plan.annual ?? 0)) * 12).toLocaleString()}/ปี
              </div>
            )}
            {plan.subNote && (
              <p className="text-gray-500 text-xs mb-2">{plan.subNote}</p>
            )}
            {plan.freeNote && plan.monthly === 0 && (
              <p className="text-gray-500 text-xs mb-2">{plan.freeNote}</p>
            )}
            <ul className="text-gray-400 text-sm space-y-3 mb-8 flex-1 mt-4">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="https://line.me/ti/p/@960xboyt"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-3 rounded-xl text-center font-bold transition-colors ${
                plan.highlight
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "border border-white/10 hover:bg-white/5"
              }`}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
