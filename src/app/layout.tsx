import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MeowChat - AI Chatbot for Thai Business",
  description: "เปลี่ยนแชทให้เป็นเงิน ด้วย AI Chatbot อัจฉริยะ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
