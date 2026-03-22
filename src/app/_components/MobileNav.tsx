"use client";
import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="text-gray-300 hover:text-white p-2 transition-colors"
      >
        {open ? (
          /* Close icon */
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          /* Hamburger icon */
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 glass border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {[
            { href: "#features", label: "ฟีเจอร์" },
            { href: "#how-it-works", label: "วิธีใช้" },
            { href: "#booking", label: "การจอง" },
            { href: "#use-cases", label: "ใช้กับธุรกิจอะไร" },
            { href: "#pricing", label: "ราคา" },
            { href: "#faq", label: "FAQ" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium py-1"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
