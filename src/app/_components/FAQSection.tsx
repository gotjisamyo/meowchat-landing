"use client";
import { useState } from "react";

interface FAQEntry {
  q: string;
  a: string;
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-xl overflow-hidden">
      <button
        className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-white/5 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-${index}`}
      >
        <span className="font-medium text-sm md:text-base">{q}</span>
        <span className="text-purple-400 text-xl ml-4 flex-shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div
          id={`faq-${index}`}
          role="region"
          className="px-6 pb-4 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-3"
        >
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQSection({ faqs }: { faqs: FAQEntry[] }) {
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, i) => (
        <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
      ))}
    </div>
  );
}
