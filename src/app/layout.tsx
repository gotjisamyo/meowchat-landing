import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Next.js 14: Geist is not yet in next/font/google; use Inter + JetBrains Mono as equivalents.
// Upgrade to next/font/google Geist when upgrading to Next.js 15+.
const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MeowChat - AI Chatbot สำหรับธุรกิจไทย",
  description:
    "เปลี่ยนแชทให้เป็นเงิน ด้วย AI Chatbot อัจฉริยะบน LINE และ Messenger ตอบลูกค้าอัตโนมัติ 24/7",
  metadataBase: new URL("https://meowchat.store"),
  keywords:
    "AI chatbot ไทย, LINE chatbot, ระบบตอบแชทอัตโนมัติ, chatbot ธุรกิจไทย, MeowChat",
  themeColor: "#0a0a0b",
  alternates: {
    canonical: "https://meowchat.store",
  },
  openGraph: {
    title: "MeowChat - AI Chatbot สำหรับธุรกิจไทย",
    description:
      "เปลี่ยนแชทให้เป็นเงิน ด้วย AI Chatbot อัจฉริยะบน LINE และ Messenger ตอบลูกค้าอัตโนมัติ 24/7",
    url: "https://meowchat.store",
    siteName: "MeowChat",
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MeowChat - AI Chatbot สำหรับธุรกิจไทย",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MeowChat - AI Chatbot สำหรับธุรกิจไทย",
    description:
      "เปลี่ยนแชทให้เป็นเงิน ด้วย AI Chatbot อัจฉริยะบน LINE และ Messenger ตอบลูกค้าอัตโนมัติ 24/7",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MeowChat",
  url: "https://meowchat.store",
  description: "AI Chatbot สำหรับธุรกิจไทย",
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@meowchat.store",
    contactType: "customer service",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
